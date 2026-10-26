import React from 'react';
import { Link } from '../context/RouterContext';
import { SITE_CONFIG, getTelLink, getMailtoLink, getWhatsAppUrl } from '../config/site';
import { MapPin, Phone, Mail, MessageCircle, Linkedin, SlidersHorizontal, ExternalLink } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { contact } = SITE_CONFIG;
  const whatsappUrl = getWhatsAppUrl();

  const handleOpenCookiePreferences = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-cookie-preferences'));
  };

  return (
    <footer className="bg-[#0A192F] text-stone-300 border-t border-white/10" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand Column (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              href="/"
              className="inline-block bg-white px-4 py-2 rounded-lg shadow-xs hover:bg-stone-50 transition-colors focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              aria-label="NEXARIS Home"
            >
              <img
                src="/assets/aistudio/NEXARIS_Gold_Chevron_Wordmark_81d52302.png"
                alt="NEXARIS"
                className="h-8 w-auto object-contain mix-blend-multiply"
              />
            </Link>
            <p className="text-sm font-serif font-bold text-[#D4AF37]">
              {SITE_CONFIG.tagline}
            </p>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-sm">
              NEXARIS is a B2B Agricultural Commodity Trading &amp; Sourcing House based in Gandhinagar, Gujarat, India. Coordinating direct origin sourcing, custom packaging, and FOB Mundra / Kandla ocean container logistics.
            </p>
            
            {/* Company LinkedIn Official Badge */}
            <div className="pt-2">
              <a
                href={contact.companyLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-white hover:text-[#D4AF37] transition-colors bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                aria-label="Follow NEXARIS on LinkedIn (opens in a new tab)"
              >
                <Linkedin className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                <span>Follow NEXARIS on LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-stone-400" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* 3 Core Agricultural Divisions Column (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Agricultural Divisions
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="/spices-oilseeds?category=spices"
                  className="hover:text-white transition-colors block text-stone-300"
                >
                  Wholesale Spices (13 Items · Ch. 09)
                </Link>
              </li>
              <li>
                <Link
                  href="/spices-oilseeds?category=oilseeds"
                  className="hover:text-white transition-colors block text-stone-300"
                >
                  Graded Oilseeds (4 Items · Ch. 12)
                </Link>
              </li>
              <li>
                <Link
                  href="/jaggery"
                  className="hover:text-white transition-colors block text-stone-300"
                >
                  Natural Cane Sweeteners (4 Items · Ch. 17)
                </Link>
              </li>
              <li className="pt-2 border-t border-white/10">
                <Link
                  href="/for-suppliers"
                  className="text-xs font-semibold text-[#D4AF37] hover:underline block"
                >
                  Farmer &amp; FPO Portal (Sell to NEXARIS) →
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Legal Column (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Compliance &amp; Legal
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors block text-stone-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-white transition-colors block text-stone-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund-cancellation-policy" className="hover:text-white transition-colors block text-stone-300">
                  Refund &amp; Cancellation
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-white transition-colors block text-stone-300">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleOpenCookiePreferences}
                  className="text-left text-xs text-[#D4AF37] hover:underline transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <SlidersHorizontal className="w-3 h-3" aria-hidden="true" />
                  <span>Manage Cookies</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Registered Office & Verified Contact Column (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Registered Office &amp; Trade Desk
            </h3>
            <div className="text-xs space-y-3 text-stone-300">
              {/* Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="block text-[11px] text-stone-400">Registered Office</span>
                  <span className="text-white font-medium leading-relaxed">
                    {contact.registeredOffice}
                  </span>
                </div>
              </div>

              {/* Telephone */}
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="block text-[11px] text-stone-400">Trade Desk Phone</span>
                  <div className="font-mono text-white font-medium">
                    <a href={`tel:${contact.phoneTel}`} className="hover:text-[#D4AF37] block">
                      {contact.phone}
                    </a>
                    <a href="tel:+918511912115" className="hover:text-[#D4AF37] block text-[11px] text-stone-400">
                      +91 85119 12115
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="block text-[11px] text-stone-400">WhatsApp Instant Desk</span>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-emerald-300 font-mono font-medium transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="block text-[11px] text-stone-400">Commercial Email</span>
                  <a
                    href={getMailtoLink()}
                    className="text-white hover:text-[#D4AF37] font-medium transition-colors break-all"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Quick Legal Links */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {currentYear} NEXARIS. All rights reserved. B2B Agricultural Commodity Trading House · Gandhinagar, Gujarat.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px]">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20 hidden sm:inline" aria-hidden="true">|</span>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span className="text-white/20 hidden sm:inline" aria-hidden="true">|</span>
            <Link href="/refund-cancellation-policy" className="hover:text-white transition-colors">
              Refund &amp; Cancellation
            </Link>
            <span className="text-white/20 hidden sm:inline" aria-hidden="true">|</span>
            <Link href="/for-suppliers" className="text-[#D4AF37] hover:underline transition-colors">
              Sell to NEXARIS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
