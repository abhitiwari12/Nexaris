import React from 'react';
import { Link } from '../context/RouterContext';
import { SITE_CONFIG } from '../config/site';
import { MapPin, Phone, Mail, Globe2 } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A192F] text-slate-300 border-t border-[#1E293B]">
      {/* Top Footer Division Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-[#1E293B]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-[#1E293B] to-[#0A192F] border border-[#D4AF37] flex items-center justify-center">
                <span className="font-serif font-black text-sm text-[#D4AF37]">N</span>
              </div>
              <span className="font-serif font-bold text-white text-base tracking-wider uppercase">
                NEXARIS
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed mb-4">
              Consumer Retail Brand and Global Agricultural Export House. Premium Spices, Sortex-cleaned Dal & Pulses, and handpicked Dry Fruits.
            </p>
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Gandhinagar, Gujarat, India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-3 font-mono">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Products & Catalogue
                </Link>
              </li>
              <li>
                <Link href="/export" className="hover:text-white transition-colors">
                  Export & Logistics Desk
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-3 font-mono">
              Product Range
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/products?division=spices" className="hover:text-white transition-colors">
                  Spices & Whole Seeds (Cumin, Fennel, Coriander)
                </Link>
              </li>
              <li>
                <Link href="/products?division=pulses" className="hover:text-white transition-colors">
                  Dal & Pulses (Toor, Chana, Moong, Kabuli)
                </Link>
              </li>
              <li>
                <Link href="/products?division=dry-fruits" className="hover:text-white transition-colors">
                  Dry Fruits & Nuts (Almonds, Cashews, Raisins)
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Consumer Stand-up Pouches (100g–1kg)
                </Link>
              </li>
              <li>
                <Link href="/export" className="hover:text-white transition-colors">
                  Bulk Container Loads (25kg–50kg PP Bags)
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Gateway */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-3 font-mono">
              Trade Desk
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p>
                <strong className="text-slate-200">Phone:</strong> {SITE_CONFIG.contact.phone}
              </p>
              <p>
                <strong className="text-slate-200">Email:</strong> {SITE_CONFIG.contact.email}
              </p>
              <p>
                <strong className="text-slate-200">Ports:</strong> FOB Mundra (INMUN) & Kandla (IXY)
              </p>
              <p>
                <strong className="text-slate-200">Certifications:</strong> FSSAI, APEDA, Halal, Spices Board
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Strip matching Screenshot 3 & 6 & 9 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <div>
            © Copyright {currentYear}, All rights reserved. NEXARIS Foods & Agri Export Pvt. Ltd.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/terms-of-service" className="hover:text-[#D4AF37] transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-slate-600">|</span>
            <Link href="/privacy-policy" className="hover:text-[#D4AF37] transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
