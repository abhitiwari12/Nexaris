import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';

// Ensure data directory exists
const DATA_DIR = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, 'nexaris_crm.sqlite');
export const db = new DatabaseSync(DB_PATH);

// Enable WAL mode for high concurrency and resilience
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS crm_users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'owner',
    created_at TEXT NOT NULL,
    last_login_at TEXT
  );

  CREATE TABLE IF NOT EXISTS crm_sessions (
    token TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    created_at TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    user_agent TEXT,
    ip_address TEXT,
    FOREIGN KEY(user_id) REFERENCES crm_users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS crm_contacts (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    company_name TEXT,
    email TEXT,
    phone TEXT,
    whatsapp TEXT,
    country_or_location TEXT,
    type TEXT NOT NULL DEFAULT 'buyer', -- 'buyer', 'supplier', 'broker', 'other'
    source TEXT NOT NULL DEFAULT 'direct', -- 'website_enquiry', 'whatsapp', 'email', 'trade_fair', 'referral', 'direct'
    status TEXT NOT NULL DEFAULT 'new', -- 'new', 'contacted', 'qualifying', 'active', 'inactive'
    commodity_interest TEXT, -- e.g. 'Spices', 'Aluminium Scrap', etc.
    notes TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS crm_opportunities (
    id TEXT PRIMARY KEY,
    contact_id TEXT NOT NULL,
    title TEXT NOT NULL,
    commodity_division TEXT NOT NULL, -- 'spices', 'oilseeds', 'aluminium_scrap', 'other'
    product_name TEXT NOT NULL,
    quantity TEXT,
    quantity_unit TEXT DEFAULT 'MT', -- 'MT', 'Tons', 'Containers', 'KG'
    target_price REAL,
    currency TEXT DEFAULT 'USD', -- 'USD', 'INR', 'EUR', 'AED'
    incoterm TEXT DEFAULT 'FOB', -- 'FOB', 'CIF', 'CFR', 'EXW'
    destination_port TEXT,
    stage TEXT NOT NULL DEFAULT 'inquiry', -- 'inquiry', 'spec_review', 'quotation_sent', 'negotiation', 'contract_issued', 'closed_won', 'closed_lost'
    estimated_value REAL,
    notes TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY(contact_id) REFERENCES crm_contacts(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS crm_activities (
    id TEXT PRIMARY KEY,
    contact_id TEXT,
    opportunity_id TEXT,
    type TEXT NOT NULL, -- 'call', 'whatsapp', 'email', 'quote', 'meeting', 'sample', 'note'
    title TEXT NOT NULL,
    due_date TEXT NOT NULL, -- YYYY-MM-DD
    priority TEXT NOT NULL DEFAULT 'medium', -- 'high', 'medium', 'low'
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'completed', 'cancelled'
    notes TEXT,
    completed_at TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY(contact_id) REFERENCES crm_contacts(id) ON DELETE SET NULL,
    FOREIGN KEY(opportunity_id) REFERENCES crm_opportunities(id) ON DELETE SET NULL
  );

  CREATE TABLE IF NOT EXISTS crm_enquiries (
    id TEXT PRIMARY KEY,
    reference_number TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    company_name TEXT,
    business_email TEXT NOT NULL,
    phone_or_whatsapp TEXT,
    buyer_location TEXT NOT NULL,
    product_name TEXT NOT NULL,
    division TEXT,
    required_quantity TEXT,
    additional_requirements TEXT,
    status TEXT NOT NULL DEFAULT 'unread', -- 'unread', 'converted', 'archived'
    contact_id TEXT,
    opportunity_id TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY(contact_id) REFERENCES crm_contacts(id) ON DELETE SET NULL,
    FOREIGN KEY(opportunity_id) REFERENCES crm_opportunities(id) ON DELETE SET NULL
  );

  CREATE TABLE IF NOT EXISTS crm_login_attempts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip TEXT NOT NULL,
    attempt_time INTEGER NOT NULL
  );
`);

console.log('NEXARIS CRM SQLite database initialized at:', DB_PATH);
