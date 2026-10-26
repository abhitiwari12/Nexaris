import React from 'react';
import { Link } from '../context/RouterContext';
import { SITE_CONFIG, getTelLink, getMailtoLink, getWhatsAppUrl } from '../config/site';
import { MapPin, Phone, Mail, MessageCircle, Linkedin, ShieldCheck, SlidersHorizontal, ExternalLink } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { contact } = SITE_CONFIG;
  const whatsappUrl = getWhatsAppUrl();

  const handleOpenCookiePreferences = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-cookie-preferences'));
  };

  return (
    <footer className="bg-[#0B1730] text-[#94A3B8] border-t border-[#162444]" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand Column (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              href="/"
              className="inline-block bg-white px-4 py-2.5 rounded-md shadow-xs hover:bg-slate-50 transition-colors focus-visible:ring-2 focus-visible:ring-[#C7A45B]"
              aria-label="NEXARIS Home"
            >
              <img
                src="/assets/aistudio/NEXARIS_Gold_Chevron_Wordmark_81d52302.png"
                alt="NEXARIS"
                className="h-8 sm:h-9 w-auto object-contain mix-blend-multiply"
              />
            </Link>
            <p className="text-sm font-semibold text-[#C7A45B]">
              {SITE_CONFIG.tagline}
            </p>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-sm">
              NEXARIS is a B2B commodity trading and sourcing business based in Gandhinagar, Gujarat, India, connecting opportunities across spices, oilseeds and natural jaggery sweeteners.
            </p>
            
            {/* Company LinkedIn Official Badge */}
            <div className="pt-2">
              <a
                href={contact.companyLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-white hover:text-[#C7A45B] transition-colors bg-white/5 border border-white/10 px-3 py-1.5 rounded-md focus-visible:ring-2 focus-visible:ring-[#C7A45B] focus-visible:outline-none"
                aria-label="Follow NEXARIS on LinkedIn (opens in a new tab)"
              >
                <Linkedin className="w-4 h-4 text-[#C7A45B]" aria-hidden="true" />
                <span>Follow NEXARIS on LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-[#94A3B8]" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Business Divisions Column (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Business Divisions
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="/spices-oilseeds"
                  className="hover:text-white transition-colors block"
                >
                  Spices & Oilseeds
                </Link>
              </li>
              <li>
                <Link
                  href="/jaggery"
                  className="hover:text-white transition-colors block"
                >
                  Jaggery Sweeteners
                </Link>
              </li>
              <li>
                <Link
                  href="/spices-oilseeds?category=spices"
                  className="text-xs text-[#94A3B8]/80 hover:text-white transition-colors block pl-2 border-l border-white/20"
                >
                  Wholesale Spices (13)
                </Link>
              </li>
              <li>
                <Link
                  href="/spices-oilseeds?category=oilseeds"
                  className="text-xs text-[#94A3B8]/80 hover:text-white transition-colors block pl-2 border-l border-white/20"
                >
                  Graded Oilseeds (4)
                </Link>
              </li>
              <li>
                <Link
                  href="/jaggery"
                  className="text-xs text-[#94A3B8]/80 hover:text-white transition-colors block pl-2 border-l border-white/20"
                >
                  Export Jaggery (4)
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Export Solutions
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/#export-services" className="hover:text-white transition-colors block">
                  Export Sourcing
                </Link>
              </li>
              <li>
                <Link href="/#export-services" className="hover:text-white transition-colors block">
                  Private Labeling
                </Link>
              </li>
              <li>
                <Link href="/#founders" className="hover:text-white transition-colors block">
                  Leadership
                </Link>
              </li>
              <li>
                <Link href="/#certifications" className="hover:text-white transition-colors block">
                  Certifications
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors block">
                  Request Quotation
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Policies Column (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Compliance & Legal
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-white transition-colors block">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund-cancellation-policy" className="hover:text-white transition-colors block">
                  Refund & Cancellation
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-white transition-colors block">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleOpenCookiePreferences}
                  className="text-left text-xs text-[#C7A45B] hover:text-[#E2C785] transition-colors inline-flex items-center gap-1.5 cursor-pointer focus-visible:ring-1 focus-visible:ring-[#C7A45B] rounded"
                >
                  <SlidersHorizontal className="w-3 h-3" aria-hidden="true" />
                  <span>Manage Cookies</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Verified Contact Details Column (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Verified Contact
            </h3>
            <div className="text-xs space-y-3 text-[#94A3B8]">
              {/* Phone */}
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C7A45B] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="block text-[11px] text-[#94A3B8]/70">Phone</span>
                  <a
                    href={getTelLink()}
                    className="text-white hover:text-[#C7A45B] font-medium transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="block text-[11px] text-[#94A3B8]/70">WhatsApp</span>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-emerald-300 font-medium transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C7A45B] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="block text-[11px] text-[#94A3B8]/70">Email</span>
                  <a
                    href={getMailtoLink()}
                    className="text-white hover:text-[#C7A45B] font-medium transition-colors break-all"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-2.5 pt-1">
                <MapPin className="w-4 h-4 text-[#C7A45B] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="block text-[11px] text-[#94A3B8]/70">Location</span>
                  <span className="text-white font-medium">{contact.location}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Quick Legal Links */}
        <div className="mt-14 pt-8 border-t border-[#162444] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <p>© {currentYear} NEXARIS. All rights reserved. B2B Commodity Trading House.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px]">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-[#162444] hidden sm:inline" aria-hidden="true">|</span>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span className="text-[#162444] hidden sm:inline" aria-hidden="true">|</span>
            <Link href="/refund-cancellation-policy" className="hover:text-white transition-colors">
              Refund & Cancellation
            </Link>
            <span className="text-[#162444] hidden sm:inline" aria-hidden="true">|</span>
            <Link href="/cookie-policy" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
            <span className="text-[#162444] hidden sm:inline" aria-hidden="true">|</span>
            <button
              type="button"
              onClick={handleOpenCookiePreferences}
              className="text-[#C7A45B] hover:text-white transition-colors cursor-pointer"
            >
              Cookie Settings
            </button>
            <span className="text-[#162444] hidden sm:inline" aria-hidden="true">|</span>
            <a
              href={contact.companyLinkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors inline-flex items-center gap-1"
            >
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
