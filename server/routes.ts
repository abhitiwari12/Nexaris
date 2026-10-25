import express, { Request, Response } from 'express';
import crypto from 'node:crypto';
import { db } from './db.js';
import {
  requireOwnerAuth,
  verifyPassword,
  hashPassword,
  createSession,
  invalidateSession,
  isRateLimited,
  recordFailedAttempt,
  clearFailedAttempts,
  SESSION_COOKIE_NAME,
  SESSION_DURATION_MS,
  AuthenticatedRequest,
} from './auth.js';

export const router = express.Router();

// ==========================================
// 1. PUBLIC API: Inbound Website Enquiries
// ==========================================
router.post('/enquiries', (req: Request, res: Response) => {
  try {
    const {
      fullName,
      companyName,
      businessEmail,
      phoneOrWhatsApp,
      buyerLocation,
      enquiryType,
      productName,
      division,
      requiredQuantity,
      quantityUnit,
      additionalRequirements,
      consentAccepted,
    } = req.body;

    if (!fullName || !businessEmail || !buyerLocation || !productName) {
      res.status(400).json({ error: 'Missing required enquiry parameters.' });
      return;
    }

    if (!consentAccepted) {
      res.status(400).json({ error: 'Consent must be acknowledged to submit a trade enquiry.' });
      return;
    }

    const cleanEmail = String(businessEmail).trim().toLowerCase();
    const cleanName = String(fullName).trim();
    const cleanType = enquiryType === 'supplier' ? 'supplier' : 'buyer';
    const cleanCompany = companyName ? String(companyName).trim() : (cleanType === 'supplier' ? 'Independent Supplier' : 'Independent Buyer');
    const cleanPhone = phoneOrWhatsApp ? String(phoneOrWhatsApp).trim() : '';
    const cleanLocation = String(buyerLocation).trim();
    const cleanProduct = String(productName).trim();
    const cleanDivision = division === 'aluminium-scrap' ? 'aluminium_scrap' : 'spices';
    const cleanQty = requiredQuantity ? `${requiredQuantity} ${quantityUnit || 'MT'}` : 'Not specified';
    const cleanNotes = additionalRequirements ? String(additionalRequirements).trim() : 'Standard trade terms requested.';

    const now = new Date().toISOString();
    const refNum = `NX-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    // 1. Check if contact already exists or create new contact
    const existingContact = db
      .prepare('SELECT id FROM crm_contacts WHERE LOWER(email) = ?')
      .get(cleanEmail) as { id: string } | undefined;

    let contactId = existingContact?.id;

    if (!contactId) {
      contactId = 'cnt_' + crypto.randomUUID().slice(0, 12);
      db.prepare(`
        INSERT INTO crm_contacts (
          id, full_name, company_name, email, phone, whatsapp,
          country_or_location, type, source, status, commodity_interest, notes, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'website_enquiry', 'new', ?, ?, ?, ?)
      `).run(
        contactId,
        cleanName,
        cleanCompany,
        cleanEmail,
        cleanPhone,
        cleanPhone,
        cleanLocation,
        cleanType,
        cleanDivision === 'aluminium_scrap' ? 'Aluminium Scrap' : 'Spices & Oilseeds',
        `${cleanType === 'supplier' ? 'Supplier offering' : 'Buyer sourcing'} from ${cleanLocation}. Commodity: ${cleanProduct} (${cleanQty})`,
        now,
        now
      );
    }

    // 2. Create Opportunity
    const oppId = 'opp_' + crypto.randomUUID().slice(0, 12);
    const oppTitle = `${cleanProduct} - ${cleanCompany} (${cleanQty})`;
    db.prepare(`
      INSERT INTO crm_opportunities (
        id, contact_id, title, commodity_division, product_name,
        quantity, quantity_unit, destination_port, stage, notes, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'inquiry', ?, ?, ?)
    `).run(
      oppId,
      contactId,
      oppTitle,
      cleanDivision,
      cleanProduct,
      requiredQuantity ? String(requiredQuantity) : '1',
      quantityUnit || 'MT',
      cleanLocation,
      `Buyer inquiry note: ${cleanNotes}`,
      now,
      now
    );

    // 3. Create Enquiry record
    const enquiryId = 'enq_' + crypto.randomUUID().slice(0, 12);
    db.prepare(`
      INSERT INTO crm_enquiries (
        id, reference_number, full_name, company_name, business_email,
        phone_or_whatsapp, buyer_location, product_name, division,
        required_quantity, additional_requirements, status, contact_id, opportunity_id, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'unread', ?, ?, ?)
    `).run(
      enquiryId,
      refNum,
      cleanName,
      cleanCompany,
      cleanEmail,
      cleanPhone,
      cleanLocation,
      cleanProduct,
      cleanDivision,
      cleanQty,
      cleanNotes,
      contactId,
      oppId,
      now
    );

    // 4. Create Follow-up Activity for Owner
    const actId = 'act_' + crypto.randomUUID().slice(0, 12);
    const today = new Date().toISOString().split('T')[0];
    db.prepare(`
      INSERT INTO crm_activities (
        id, contact_id, opportunity_id, type, title, due_date, priority, status, notes, created_at
      ) VALUES (?, ?, ?, 'quote', ?, ?, 'high', 'pending', ?, ?)
    `).run(
      actId,
      contactId,
      oppId,
      `Review & Quote: ${cleanProduct} for ${cleanCompany}`,
      today,
      `Requested quantity: ${cleanQty}. Location: ${cleanLocation}. Email: ${cleanEmail}. Contact Phone: ${cleanPhone || 'N/A'}.`,
      now
    );

    // Safe public response
    res.status(200).json({
      success: true,
      referenceNumber: refNum,
      timestamp: now,
      message: 'Enquiry successfully registered at NEXARIS Trade Desk.',
    });
  } catch (err: any) {
    console.error('Enquiry submission error:', err);
    res.status(500).json({ error: 'Failed to process inquiry. Please try again or reach out on WhatsApp.' });
  }
});

// ==========================================
// 2. AUTHENTICATION (Owner-Only)
// ==========================================
router.post('/crm/auth/login', (req: Request, res: Response) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';

  if (isRateLimited(ip)) {
    res.status(429).json({
      error: 'Too many failed login attempts. Please wait 15 minutes before trying again.',
    });
    return;
  }

  const { email, password, rememberMe } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Please provide both email and password.' });
    return;
  }

  const user = db
    .prepare('SELECT id, email, password_hash, salt, full_name, role FROM crm_users WHERE LOWER(email) = ?')
    .get(String(email).trim().toLowerCase()) as {
    id: string;
    email: string;
    password_hash: string;
    salt: string;
    full_name: string;
    role: string;
  } | undefined;

  if (!user || !verifyPassword(password, user.password_hash, user.salt)) {
    recordFailedAttempt(ip);
    res.status(401).json({ error: 'Invalid email or password.' });
    return;
  }

  clearFailedAttempts(ip);

  // Update last login
  db.prepare('UPDATE crm_users SET last_login_at = ? WHERE id = ?').run(new Date().toISOString(), user.id);

  // Generate session
  const token = createSession(user.id, req);

  // Set HTTP-only secure cookie
  const maxAge = rememberMe ? 30 * 24 * 60 * 60 * 1000 : SESSION_DURATION_MS;
  res.cookie(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge,
    path: '/',
  });

  res.status(200).json({
    success: true,
    token, // Also return in body for optional Bearer usage
    user: {
      id: user.id,
      email: user.email,
      fullName: user.full_name,
      role: user.role,
    },
  });
});

router.post('/crm/auth/logout', (req: Request, res: Response) => {
  const token = req.cookies?.[SESSION_COOKIE_NAME] || req.headers.authorization?.slice(7);
  if (token) {
    invalidateSession(token);
  }
  res.clearCookie(SESSION_COOKIE_NAME, { path: '/' });
  res.status(200).json({ success: true, message: 'Logged out successfully.' });
});

router.get('/crm/auth/me', requireOwnerAuth, (req: AuthenticatedRequest, res: Response) => {
  res.status(200).json({
    user: req.crmUser,
  });
});

router.post('/crm/auth/change-password', requireOwnerAuth, (req: AuthenticatedRequest, res: Response) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    res.status(400).json({ error: 'Please provide current and new passwords.' });
    return;
  }

  if (newPassword.length < 8) {
    res.status(400).json({ error: 'New password must be at least 8 characters long.' });
    return;
  }

  const user = db
    .prepare('SELECT password_hash, salt FROM crm_users WHERE id = ?')
    .get(req.crmUser!.id) as { password_hash: string; salt: string };

  if (!verifyPassword(currentPassword, user.password_hash, user.salt)) {
    res.status(400).json({ error: 'Current password is incorrect.' });
    return;
  }

  const { hash, salt } = hashPassword(newPassword);
  db.prepare('UPDATE crm_users SET password_hash = ?, salt = ? WHERE id = ?').run(hash, salt, req.crmUser!.id);

  res.status(200).json({ success: true, message: 'Password updated successfully.' });
});

// ==========================================
// 3. CRM DASHBOARD & METRICS (Protected)
// ==========================================
router.get('/crm/metrics', requireOwnerAuth, (_req: AuthenticatedRequest, res: Response) => {
  try {
    const totalContacts = (db.prepare('SELECT COUNT(*) as c FROM crm_contacts').get() as { c: number }).c;
    const buyersCount = (db.prepare("SELECT COUNT(*) as c FROM crm_contacts WHERE type = 'buyer'").get() as { c: number }).c;
    const suppliersCount = (db.prepare("SELECT COUNT(*) as c FROM crm_contacts WHERE type = 'supplier'").get() as { c: number }).c;
    
    const totalOpportunities = (db.prepare('SELECT COUNT(*) as c FROM crm_opportunities').get() as { c: number }).c;
    const openOpportunities = (db.prepare("SELECT COUNT(*) as c FROM crm_opportunities WHERE stage NOT IN ('closed_won', 'closed_lost')").get() as { c: number }).c;
    const closedWonCount = (db.prepare("SELECT COUNT(*) as c FROM crm_opportunities WHERE stage = 'closed_won'").get() as { c: number }).c;

    const spicesOpps = (db.prepare("SELECT COUNT(*) as c FROM crm_opportunities WHERE commodity_division = 'spices' OR commodity_division = 'oilseeds'").get() as { c: number }).c;
    const aluminiumOpps = (db.prepare("SELECT COUNT(*) as c FROM crm_opportunities WHERE commodity_division = 'aluminium_scrap'").get() as { c: number }).c;

    const estPipelineValue = (db.prepare("SELECT SUM(estimated_value) as s FROM crm_opportunities WHERE stage NOT IN ('closed_lost')").get() as { s: number | null }).s || 0;

    const today = new Date().toISOString().split('T')[0];
    const pendingActivities = (db.prepare("SELECT COUNT(*) as c FROM crm_activities WHERE status = 'pending'").get() as { c: number }).c;
    const overdueActivities = (db.prepare("SELECT COUNT(*) as c FROM crm_activities WHERE status = 'pending' AND due_date < ?").get(today) as { c: number }).c;
    const dueTodayActivities = (db.prepare("SELECT COUNT(*) as c FROM crm_activities WHERE status = 'pending' AND due_date = ?").get(today) as { c: number }).c;

    const unreadEnquiries = (db.prepare("SELECT COUNT(*) as c FROM crm_enquiries WHERE status = 'unread'").get() as { c: number }).c;

    // Recent activity logs / feed
    const recentEnquiries = db.prepare(`
      SELECT id, reference_number, full_name, company_name, product_name, buyer_location, created_at, status
      FROM crm_enquiries
      ORDER BY created_at DESC
      LIMIT 5
    `).all();

    const upcomingActivities = db.prepare(`
      SELECT a.*, c.full_name as contact_name, c.company_name as contact_company
      FROM crm_activities a
      LEFT JOIN crm_contacts c ON a.contact_id = c.id
      WHERE a.status = 'pending'
      ORDER BY a.due_date ASC, a.priority DESC
      LIMIT 5
    `).all();

    res.status(200).json({
      contacts: {
        total: totalContacts,
        buyers: buyersCount,
        suppliers: suppliersCount,
      },
      opportunities: {
        total: totalOpportunities,
        open: openOpportunities,
        closedWon: closedWonCount,
        spicesAndOilseeds: spicesOpps,
        aluminiumScrap: aluminiumOpps,
        estimatedPipelineValue: estPipelineValue,
      },
      activities: {
        pending: pendingActivities,
        overdue: overdueActivities,
        dueToday: dueTodayActivities,
        upcomingList: upcomingActivities,
      },
      enquiries: {
        unread: unreadEnquiries,
        recentList: recentEnquiries,
      },
    });
  } catch (err: any) {
    console.error('Metrics calculation error:', err);
    res.status(500).json({ error: 'Failed to retrieve metrics.' });
  }
});

// ==========================================
// 4. CONTACTS / LEADS CRUD (Protected)
// ==========================================
router.get('/crm/contacts', requireOwnerAuth, (req: AuthenticatedRequest, res: Response) => {
  const { type, status, source, query } = req.query;

  let sql = 'SELECT * FROM crm_contacts WHERE 1=1';
  const params: any[] = [];

  if (type && type !== 'all') {
    sql += ' AND type = ?';
    params.push(type);
  }
  if (status && status !== 'all') {
    sql += ' AND status = ?';
    params.push(status);
  }
  if (source && source !== 'all') {
    sql += ' AND source = ?';
    params.push(source);
  }
  if (query) {
    sql += ' AND (full_name LIKE ? OR company_name LIKE ? OR email LIKE ? OR phone LIKE ? OR country_or_location LIKE ?)';
    const q = `%${query}%`;
    params.push(q, q, q, q, q);
  }

  sql += ' ORDER BY created_at DESC';

  const contacts = db.prepare(sql).all(...params);
  res.status(200).json({ contacts });
});

router.post('/crm/contacts', requireOwnerAuth, (req: AuthenticatedRequest, res: Response) => {
  const {
    fullName,
    companyName,
    email,
    phone,
    whatsapp,
    countryOrLocation,
    type,
    source,
    status,
    commodityInterest,
    notes,
  } = req.body;

  if (!fullName) {
    res.status(400).json({ error: 'Contact full name is required.' });
    return;
  }

  const id = 'cnt_' + crypto.randomUUID().slice(0, 12);
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO crm_contacts (
      id, full_name, company_name, email, phone, whatsapp,
      country_or_location, type, source, status, commodity_interest, notes, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    fullName.trim(),
    companyName?.trim() || '',
    email?.trim() || '',
    phone?.trim() || '',
    whatsapp?.trim() || phone?.trim() || '',
    countryOrLocation?.trim() || '',
    type || 'buyer',
    source || 'direct',
    status || 'new',
    commodityInterest || '',
    notes?.trim() || '',
    now,
    now
  );

  const newContact = db.prepare('SELECT * FROM crm_contacts WHERE id = ?').get(id);
  res.status(201).json({ success: true, contact: newContact });
});

router.put('/crm/contacts/:id', requireOwnerAuth, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const {
    fullName,
    companyName,
    email,
    phone,
    whatsapp,
    countryOrLocation,
    type,
    source,
    status,
    commodityInterest,
    notes,
  } = req.body;

  const now = new Date().toISOString();

  db.prepare(`
    UPDATE crm_contacts SET
      full_name = ?,
      company_name = ?,
      email = ?,
      phone = ?,
      whatsapp = ?,
      country_or_location = ?,
      type = ?,
      source = ?,
      status = ?,
      commodity_interest = ?,
      notes = ?,
      updated_at = ?
    WHERE id = ?
  `).run(
    fullName?.trim(),
    companyName?.trim() || '',
    email?.trim() || '',
    phone?.trim() || '',
    whatsapp?.trim() || '',
    countryOrLocation?.trim() || '',
    type || 'buyer',
    source || 'direct',
    status || 'new',
    commodityInterest || '',
    notes?.trim() || '',
    now,
    id
  );

  const updated = db.prepare('SELECT * FROM crm_contacts WHERE id = ?').get(id);
  res.status(200).json({ success: true, contact: updated });
});

router.delete('/crm/contacts/:id', requireOwnerAuth, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  db.prepare('DELETE FROM crm_contacts WHERE id = ?').run(id);
  res.status(200).json({ success: true, message: 'Contact and associated opportunities deleted.' });
});

// ==========================================
// 5. OPPORTUNITIES PIPELINE (Protected)
// ==========================================
router.get('/crm/opportunities', requireOwnerAuth, (req: AuthenticatedRequest, res: Response) => {
  const { division, stage } = req.query;

  let sql = `
    SELECT o.*, c.full_name as contact_name, c.company_name as contact_company,
           c.email as contact_email, c.phone as contact_phone, c.country_or_location as contact_country
    FROM crm_opportunities o
    JOIN crm_contacts c ON o.contact_id = c.id
    WHERE 1=1
  `;
  const params: any[] = [];

  if (division && division !== 'all') {
    sql += ' AND o.commodity_division = ?';
    params.push(division);
  }
  if (stage && stage !== 'all') {
    sql += ' AND o.stage = ?';
    params.push(stage);
  }

  sql += ' ORDER BY o.updated_at DESC';

  const opportunities = db.prepare(sql).all(...params);
  res.status(200).json({ opportunities });
});

router.post('/crm/opportunities', requireOwnerAuth, (req: AuthenticatedRequest, res: Response) => {
  const {
    contactId,
    title,
    commodityDivision,
    productName,
    quantity,
    quantityUnit,
    targetPrice,
    currency,
    incoterm,
    destinationPort,
    stage,
    estimatedValue,
    notes,
  } = req.body;

  if (!contactId || !title || !productName) {
    res.status(400).json({ error: 'Contact ID, deal title, and product name are required.' });
    return;
  }

  const id = 'opp_' + crypto.randomUUID().slice(0, 12);
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO crm_opportunities (
      id, contact_id, title, commodity_division, product_name,
      quantity, quantity_unit, target_price, currency, incoterm,
      destination_port, stage, estimated_value, notes, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    contactId,
    title.trim(),
    commodityDivision || 'spices',
    productName.trim(),
    quantity ? String(quantity) : '',
    quantityUnit || 'MT',
    targetPrice ? Number(targetPrice) : null,
    currency || 'USD',
    incoterm || 'FOB',
    destinationPort?.trim() || '',
    stage || 'inquiry',
    estimatedValue ? Number(estimatedValue) : null,
    notes?.trim() || '',
    now,
    now
  );

  const created = db.prepare(`
    SELECT o.*, c.full_name as contact_name, c.company_name as contact_company
    FROM crm_opportunities o
    JOIN crm_contacts c ON o.contact_id = c.id
    WHERE o.id = ?
  `).get(id);

  res.status(201).json({ success: true, opportunity: created });
});

router.put('/crm/opportunities/:id', requireOwnerAuth, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const {
    title,
    commodityDivision,
    productName,
    quantity,
    quantityUnit,
    targetPrice,
    currency,
    incoterm,
    destinationPort,
    stage,
    estimatedValue,
    notes,
  } = req.body;

  const now = new Date().toISOString();

  db.prepare(`
    UPDATE crm_opportunities SET
      title = COALESCE(?, title),
      commodity_division = COALESCE(?, commodity_division),
      product_name = COALESCE(?, product_name),
      quantity = COALESCE(?, quantity),
      quantity_unit = COALESCE(?, quantity_unit),
      target_price = COALESCE(?, target_price),
      currency = COALESCE(?, currency),
      incoterm = COALESCE(?, incoterm),
      destination_port = COALESCE(?, destination_port),
      stage = COALESCE(?, stage),
      estimated_value = COALESCE(?, estimated_value),
      notes = COALESCE(?, notes),
      updated_at = ?
    WHERE id = ?
  `).run(
    title?.trim(),
    commodityDivision,
    productName?.trim(),
    quantity,
    quantityUnit,
    targetPrice !== undefined ? Number(targetPrice) : null,
    currency,
    incoterm,
    destinationPort?.trim(),
    stage,
    estimatedValue !== undefined ? Number(estimatedValue) : null,
    notes?.trim(),
    now,
    id
  );

  const updated = db.prepare(`
    SELECT o.*, c.full_name as contact_name, c.company_name as contact_company
    FROM crm_opportunities o
    JOIN crm_contacts c ON o.contact_id = c.id
    WHERE o.id = ?
  `).get(id);

  res.status(200).json({ success: true, opportunity: updated });
});

router.delete('/crm/opportunities/:id', requireOwnerAuth, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  db.prepare('DELETE FROM crm_opportunities WHERE id = ?').run(id);
  res.status(200).json({ success: true, message: 'Opportunity deleted.' });
});

// ==========================================
// 6. ACTIVITIES & FOLLOW-UPS (Protected)
// ==========================================
router.get('/crm/activities', requireOwnerAuth, (req: AuthenticatedRequest, res: Response) => {
  const { status } = req.query;

  let sql = `
    SELECT a.*, c.full_name as contact_name, c.company_name as contact_company,
           o.title as opportunity_title
    FROM crm_activities a
    LEFT JOIN crm_contacts c ON a.contact_id = c.id
    LEFT JOIN crm_opportunities o ON a.opportunity_id = o.id
    WHERE 1=1
  `;
  const params: any[] = [];

  if (status && status !== 'all') {
    sql += ' AND a.status = ?';
    params.push(status);
  }

  sql += ' ORDER BY a.due_date ASC, a.priority DESC';

  const activities = db.prepare(sql).all(...params);
  res.status(200).json({ activities });
});

router.post('/crm/activities', requireOwnerAuth, (req: AuthenticatedRequest, res: Response) => {
  const { contactId, opportunityId, type, title, dueDate, priority, notes } = req.body;

  if (!title || !dueDate) {
    res.status(400).json({ error: 'Title and due date are required.' });
    return;
  }

  const id = 'act_' + crypto.randomUUID().slice(0, 12);
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO crm_activities (
      id, contact_id, opportunity_id, type, title, due_date, priority, status, notes, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)
  `).run(
    id,
    contactId || null,
    opportunityId || null,
    type || 'call',
    title.trim(),
    dueDate,
    priority || 'medium',
    notes?.trim() || '',
    now
  );

  const created = db.prepare('SELECT * FROM crm_activities WHERE id = ?').get(id);
  res.status(201).json({ success: true, activity: created });
});

router.put('/crm/activities/:id', requireOwnerAuth, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { status, dueDate, notes, title, priority } = req.body;

  const now = new Date().toISOString();
  const completedAt = status === 'completed' ? now : null;

  db.prepare(`
    UPDATE crm_activities SET
      status = COALESCE(?, status),
      due_date = COALESCE(?, due_date),
      notes = COALESCE(?, notes),
      title = COALESCE(?, title),
      priority = COALESCE(?, priority),
      completed_at = ?
    WHERE id = ?
  `).run(status, dueDate, notes, title, priority, completedAt, id);

  const updated = db.prepare('SELECT * FROM crm_activities WHERE id = ?').get(id);
  res.status(200).json({ success: true, activity: updated });
});

router.delete('/crm/activities/:id', requireOwnerAuth, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  db.prepare('DELETE FROM crm_activities WHERE id = ?').run(id);
  res.status(200).json({ success: true, message: 'Activity deleted.' });
});

// ==========================================
// 7. INBOUND WEBSITE ENQUIRIES (Protected)
// ==========================================
router.get('/crm/enquiries', requireOwnerAuth, (_req: AuthenticatedRequest, res: Response) => {
  const enquiries = db.prepare(`
    SELECT e.*, c.full_name as contact_name, o.title as deal_title
    FROM crm_enquiries e
    LEFT JOIN crm_contacts c ON e.contact_id = c.id
    LEFT JOIN crm_opportunities o ON e.opportunity_id = o.id
    ORDER BY e.created_at DESC
  `).all();

  res.status(200).json({ enquiries });
});

router.put('/crm/enquiries/:id/status', requireOwnerAuth, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  db.prepare('UPDATE crm_enquiries SET status = ? WHERE id = ?').run(status, id);
  res.status(200).json({ success: true });
});

// ==========================================
// 8. DATA BACKUP, CSV EXPORT & IMPORT (Protected)
// ==========================================
router.get('/crm/export/:type', requireOwnerAuth, (req: AuthenticatedRequest, res: Response) => {
  const { type } = req.params;

  if (type === 'backup') {
    // Full JSON snapshot
    const users = db.prepare('SELECT id, email, full_name, role, created_at, last_login_at FROM crm_users').all();
    const contacts = db.prepare('SELECT * FROM crm_contacts').all();
    const opportunities = db.prepare('SELECT * FROM crm_opportunities').all();
    const activities = db.prepare('SELECT * FROM crm_activities').all();
    const enquiries = db.prepare('SELECT * FROM crm_enquiries').all();

    const snapshot = {
      exportTime: new Date().toISOString(),
      version: '1.0',
      tables: { users, contacts, opportunities, activities, enquiries },
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="nexaris_crm_backup_${Date.now()}.json"`);
    res.send(JSON.stringify(snapshot, null, 2));
    return;
  }

  if (type === 'contacts') {
    const contacts = db.prepare('SELECT * FROM crm_contacts ORDER BY created_at DESC').all() as any[];
    const headers = ['id', 'full_name', 'company_name', 'email', 'phone', 'whatsapp', 'country_or_location', 'type', 'source', 'status', 'commodity_interest', 'notes', 'created_at'];
    
    let csv = headers.join(',') + '\n';
    for (const c of contacts) {
      const row = headers.map((h) => {
        const val = c[h] || '';
        return `"${String(val).replace(/"/g, '""')}"`;
      });
      csv += row.join(',') + '\n';
    }

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="nexaris_contacts_${Date.now()}.csv"`);
    res.send(csv);
    return;
  }

  if (type === 'opportunities') {
    const opps = db.prepare(`
      SELECT o.*, c.full_name as contact_name, c.company_name as contact_company
      FROM crm_opportunities o
      JOIN crm_contacts c ON o.contact_id = c.id
      ORDER BY o.created_at DESC
    `).all() as any[];

    const headers = ['id', 'title', 'contact_name', 'contact_company', 'commodity_division', 'product_name', 'quantity', 'quantity_unit', 'target_price', 'currency', 'incoterm', 'destination_port', 'stage', 'estimated_value', 'created_at'];
    let csv = headers.join(',') + '\n';
    for (const o of opps) {
      const row = headers.map((h) => {
        const val = o[h] || '';
        return `"${String(val).replace(/"/g, '""')}"`;
      });
      csv += row.join(',') + '\n';
    }

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="nexaris_opportunities_${Date.now()}.csv"`);
    res.send(csv);
    return;
  }

  res.status(400).json({ error: 'Invalid export type.' });
});

// CSV Import Contacts
router.post('/crm/import/contacts', requireOwnerAuth, (req: AuthenticatedRequest, res: Response) => {
  const { csvText } = req.body;

  if (!csvText || typeof csvText !== 'string') {
    res.status(400).json({ error: 'No CSV content provided.' });
    return;
  }

  try {
    const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (lines.length < 2) {
      res.status(400).json({ error: 'CSV file must have a header line and at least one data row.' });
      return;
    }

    // Helper: parse CSV line respecting quotes
    const parseCSVLine = (text: string) => {
      const result: string[] = [];
      let cur = '';
      let inQuotes = false;
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === '"') {
          if (inQuotes && text[i + 1] === '"') {
            cur += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === ',' && !inQuotes) {
          result.push(cur.trim());
          cur = '';
        } else {
          cur += char;
        }
      }
      result.push(cur.trim());
      return result;
    };

    const headers = parseCSVLine(lines[0]).map((h) => h.toLowerCase().replace(/[^a-z0-9_]/g, '_'));
    const nameIdx = headers.findIndex((h) => h.includes('name') || h === 'full_name');
    const compIdx = headers.findIndex((h) => h.includes('company'));
    const emailIdx = headers.findIndex((h) => h.includes('email'));
    const phoneIdx = headers.findIndex((h) => h.includes('phone') || h.includes('mobile'));
    const locIdx = headers.findIndex((h) => h.includes('location') || h.includes('country') || h.includes('city'));
    const typeIdx = headers.findIndex((h) => h.includes('type'));
    const notesIdx = headers.findIndex((h) => h.includes('note'));

    if (nameIdx === -1 && emailIdx === -1) {
      res.status(400).json({ error: 'CSV must contain at least a Name or Email column.' });
      return;
    }

    let importedCount = 0;
    const now = new Date().toISOString();

    for (let i = 1; i < lines.length; i++) {
      const cols = parseCSVLine(lines[i]);
      const name = nameIdx !== -1 ? cols[nameIdx] : 'Unknown';
      const email = emailIdx !== -1 ? cols[emailIdx] : '';
      const company = compIdx !== -1 ? cols[compIdx] : '';
      const phone = phoneIdx !== -1 ? cols[phoneIdx] : '';
      const location = locIdx !== -1 ? cols[locIdx] : '';
      const type = typeIdx !== -1 ? cols[typeIdx].toLowerCase() : 'buyer';
      const notes = notesIdx !== -1 ? cols[notesIdx] : 'Imported via CSV';

      if (!name && !email) continue;

      const id = 'cnt_' + crypto.randomUUID().slice(0, 12);
      db.prepare(`
        INSERT INTO crm_contacts (
          id, full_name, company_name, email, phone, whatsapp,
          country_or_location, type, source, status, commodity_interest, notes, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'direct', 'new', '', ?, ?, ?)
      `).run(
        id,
        name || email,
        company,
        email,
        phone,
        phone,
        location,
        ['buyer', 'supplier', 'broker'].includes(type) ? type : 'buyer',
        notes,
        now,
        now
      );

      importedCount++;
    }

    res.status(200).json({
      success: true,
      importedCount,
      message: `Successfully imported ${importedCount} contact(s).`,
    });
  } catch (err: any) {
    console.error('CSV import error:', err);
    res.status(500).json({ error: 'Failed to parse or import CSV data.' });
  }
});
