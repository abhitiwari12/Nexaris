import crypto from 'node:crypto';
import { Request, Response, NextFunction } from 'express';
import { db } from './db.js';

export const SESSION_COOKIE_NAME = 'nexaris_crm_session';
export const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// Helper: Hash password with scrypt
export function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const generatedSalt = salt || crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, generatedSalt, 64);
  return {
    hash: derivedKey.toString('hex'),
    salt: generatedSalt,
  };
}

// Helper: Verify password
export function verifyPassword(password: string, hash: string, salt: string): boolean {
  try {
    const derivedKey = crypto.scryptSync(password, salt, 64);
    const storedBuffer = Buffer.from(hash, 'hex');
    return crypto.timingSafeEqual(derivedKey, storedBuffer);
  } catch (err) {
    return false;
  }
}

// Check and record failed login attempt (rate limiting: 5 attempts per 15 mins)
export function isRateLimited(ip: string): boolean {
  const fifteenMinutesAgo = Date.now() - 15 * 60 * 1000;
  // Clean old attempts
  db.prepare('DELETE FROM crm_login_attempts WHERE attempt_time < ?').run(fifteenMinutesAgo);

  const stmt = db.prepare('SELECT COUNT(*) as count FROM crm_login_attempts WHERE ip = ? AND attempt_time >= ?');
  const result = stmt.get(ip, fifteenMinutesAgo) as { count: number };
  return (result?.count || 0) >= 5;
}

export function recordFailedAttempt(ip: string): void {
  db.prepare('INSERT INTO crm_login_attempts (ip, attempt_time) VALUES (?, ?)').run(ip, Date.now());
}

export function clearFailedAttempts(ip: string): void {
  db.prepare('DELETE FROM crm_login_attempts WHERE ip = ?').run(ip);
}

// Ensure default owner account exists if no owner registered
export function ensureOwnerAccount(): void {
  const stmt = db.prepare('SELECT COUNT(*) as count FROM crm_users');
  const res = stmt.get() as { count: number };
  
  const defaultEmail = process.env.CRM_OWNER_EMAIL || 'tiwariabhi1211@gmail.com';
  const initialPassword = process.env.CRM_INITIAL_PASSWORD || '@bhiNT1211';

  if (res.count === 0) {
    const { hash, salt } = hashPassword(initialPassword);
    const userId = 'usr_' + crypto.randomUUID().slice(0, 12);
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO crm_users (id, email, password_hash, salt, full_name, role, created_at)
      VALUES (?, ?, ?, ?, ?, 'owner', ?)
    `).run(userId, defaultEmail, hash, salt, 'NEXARIS Trade Owner', now);

    console.log(`[CRM] Initial Owner account established for: ${defaultEmail}`);
  } else {
    // Optional: If the old default user exists, update it to the new one
    const oldDefaultEmail = 'contact@nexaris.co.in';
    const checkOld = db.prepare('SELECT id FROM crm_users WHERE email = ?');
    const oldUser = checkOld.get(oldDefaultEmail) as { id: string } | undefined;

    if (oldUser) {
      const { hash, salt } = hashPassword(initialPassword);
      db.prepare('UPDATE crm_users SET email = ?, password_hash = ?, salt = ? WHERE id = ?')
        .run(defaultEmail, hash, salt, oldUser.id);
      console.log(`[CRM] Default Owner account updated to: ${defaultEmail}`);
    }
  }
}

// Create session
export function createSession(userId: string, req: Request): string {
  const token = crypto.randomBytes(32).toString('hex');
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_DURATION_MS).toISOString();
  const userAgent = req.headers['user-agent'] || 'Unknown';
  const ip = req.ip || req.socket.remoteAddress || 'Unknown';

  db.prepare(`
    INSERT INTO crm_sessions (token, user_id, created_at, expires_at, user_agent, ip_address)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(token, userId, now.toISOString(), expiresAt, userAgent, ip);

  return token;
}

// Invalidate session
export function invalidateSession(token: string): void {
  db.prepare('DELETE FROM crm_sessions WHERE token = ?').run(token);
}

// Clean expired sessions
export function cleanExpiredSessions(): void {
  db.prepare('DELETE FROM crm_sessions WHERE expires_at < ?').run(new Date().toISOString());
}

// Express Auth Middleware
export interface AuthenticatedRequest extends Request {
  crmUser?: {
    id: string;
    email: string;
    fullName: string;
    role: string;
  };
  sessionToken?: string;
}

export function requireOwnerAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  cleanExpiredSessions();

  // Check cookie or Bearer header
  let token = req.cookies?.[SESSION_COOKIE_NAME];
  if (!token && req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.slice(7).trim();
  }

  if (!token) {
    res.status(401).json({ error: 'Unauthenticated. Owner login required.' });
    return;
  }

  const sessionStmt = db.prepare(`
    SELECT s.token, s.expires_at, u.id, u.email, u.full_name as fullName, u.role
    FROM crm_sessions s
    JOIN crm_users u ON s.user_id = u.id
    WHERE s.token = ?
  `);
  const session = sessionStmt.get(token) as {
    token: string;
    expires_at: string;
    id: string;
    email: string;
    fullName: string;
    role: string;
  } | undefined;

  if (!session || new Date(session.expires_at) < new Date()) {
    if (token) invalidateSession(token);
    res.status(401).json({ error: 'Session expired or invalid. Please log in again.' });
    return;
  }

  req.crmUser = {
    id: session.id,
    email: session.email,
    fullName: session.fullName,
    role: session.role,
  };
  req.sessionToken = token;

  next();
}
