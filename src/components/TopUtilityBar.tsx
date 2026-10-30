import React from 'react';
import { Phone, Mail, Globe, MapPin } from 'lucide-react';
import { SITE_CONFIG, getTelLink, getMailtoLink } from '../config/site';

export function TopUtilityBar() {
  const { contact } = SITE_CONFIG;

  return (
    <div className="bg-[#0A192F] text-[#E2E8F0] text-xs py-2 px-4 border-b border-[#1E293B]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Origin & Certification badges */}
        <div className="flex items-center gap-4 text-slate-300">
          <div className="flex items-center gap-1.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Gandhinagar, Gujarat, India</span>
          </div>
          <span className="hidden md:inline text-slate-600">|</span>
          <div className="hidden md:flex items-center gap-1.5 text-slate-400">
            <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>FSSAI · APEDA · Spices Board · US FDA · Halal Certified</span>
          </div>
        </div>

        {/* Right: Phone & Email */}
        <div className="flex items-center gap-4">
          <a
            href={getTelLink()}
            className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors"
            title="Call NEXARIS Commercial Desk"
          >
            <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-semibold tracking-wide">{contact.phone}</span>
          </a>
          <span className="text-slate-600">|</span>
          <a
            href={getMailtoLink('Trade Enquiry — NEXARIS Products')}
            className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors"
            title="Email NEXARIS Trade Desk"
          >
            <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{contact.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
