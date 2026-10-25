import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';
import { Link, useRouter } from '../context/RouterContext';
import { useEnquiry } from '../context/EnquiryContext';
import { SITE_CONFIG, getWhatsAppUrl } from '../config/site';

export function Header() {
  const { path } = useRouter();
  const { openEnquiryModal } = useEnquiry();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const { contact } = SITE_CONFIG;

  // Close mobile drawer on route change or ESC key press
  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
  }, [path]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setProductsDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/#products', label: 'Commodities', hasDropdown: true },
    { href: '/#export-services', label: 'Export Services' },
    { href: '/#certifications', label: 'Certifications' },
    { href: '/#founders', label: 'Leadership' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      if (window.location.pathname === '/' || path === '/') {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-[#E2E8F0] shadow-2xs">
      {/* ========================================================
          MAIN NAVIGATION BAR
          ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 md:gap-8 h-14">
          
          {/* Brand Wordmark Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0 focus-visible:ring-2 focus-visible:ring-[#0B1730] rounded-sm transition-opacity hover:opacity-90"
            aria-label="NEXARIS Home"
          >
            <img
              src="/assets/aistudio/NEXARIS_Gold_Chevron_Wordmark_81d52302.png"
              alt="NEXARIS — One Partner. Many Possibilities."
              className="h-4 sm:h-5 max-h-5 w-auto object-contain mix-blend-multiply filter contrast-105"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#64748B]" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = path === link.href || (link.href === '/' && path === '/');

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setProductsDropdownOpen(true)}
                    onMouseLeave={() => setProductsDropdownOpen(false)}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavClick(link.href, e)}
                      className={`inline-flex items-center gap-1 whitespace-nowrap shrink-0 transition-colors py-1 ${
                        isActive ? 'text-[#0B1730] font-semibold' : 'hover:text-[#0B1730]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
                    </Link>

                    {/* Products Quick Dropdown */}
                    {productsDropdownOpen && (
                      <div className="absolute top-full left-0 w-64 pt-2 z-50">
                        <div className="bg-white rounded-lg shadow-xl border border-[#E2E8F0] p-2 space-y-1">
                          <Link
                            href="/spices-oilseeds?category=spices"
                            className="block px-3 py-2 rounded text-xs font-semibold text-[#0B1730] hover:bg-[#F5F7FA] transition-colors"
                          >
                            <span className="block font-bold">Wholesale Spices (15 Varieties)</span>
                            <span className="text-[11px] text-[#64748B] font-normal">Chilli, Cumin, Turmeric, Cardamom, Clove</span>
                          </Link>
                          <Link
                            href="/spices-oilseeds?category=oilseeds"
                            className="block px-3 py-2 rounded text-xs font-semibold text-[#0B1730] hover:bg-[#F5F7FA] transition-colors"
                          >
                            <span className="block font-bold">Graded Oilseeds &amp; Grains</span>
                            <span className="text-[11px] text-[#64748B] font-normal">Sesame, Mustard, Groundnut, Basmati Rice</span>
                          </Link>
                          <Link
                            href="/aluminium-scrap"
                            className="block px-3 py-2 rounded text-xs font-semibold text-[#0B1730] hover:bg-[#F5F7FA] transition-colors"
                          >
                            <span className="block font-bold">Aluminium &amp; Non-Ferrous Scrap</span>
                            <span className="text-[11px] text-[#64748B] font-normal">Taint Tabor, Wire Scrap, Extrusions, Copper</span>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(link.href, e)}
                  className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                    isActive
                      ? 'text-[#0B1730] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0B1730]'
                      : 'hover:text-[#0B1730]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center shrink-0 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 text-[#0B1730] hover:bg-[#F5F7FA] rounded-md transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Backdrop and Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col">
          <div
            className="fixed inset-0 bg-[#070F20]/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div className="relative z-10 bg-white border-b border-[#E2E8F0] shadow-2xl px-5 pt-4 pb-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
              <img
                src="/assets/aistudio/NEXARIS_Gold_Chevron_Wordmark_81d52302.png"
                alt="NEXARIS"
                className="h-4 max-h-4 w-auto object-contain mix-blend-multiply"
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 text-[#64748B] hover:text-[#0B1730] min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="py-4 space-y-1">
              <Link
                href="/"
                onClick={(e) => handleNavClick('/', e)}
                className="block px-3 py-2.5 text-sm font-semibold text-[#0B1730] hover:bg-[#F5F7FA] rounded-md"
              >
                Home
              </Link>
              <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#C7A45B]">
                Product Catalogues
              </div>
              <Link
                href="/spices-oilseeds"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-xs text-[#475569] hover:bg-[#F5F7FA] rounded-md"
              >
                → Spices &amp; Oilseeds (Wholesale)
              </Link>
              <Link
                href="/aluminium-scrap"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-xs text-[#475569] hover:bg-[#F5F7FA] rounded-md"
              >
                → Aluminium &amp; Non-Ferrous Scrap
              </Link>

              <div className="pt-2 border-t border-[#F1F5F9]" />

              <Link
                href="/#export-services"
                onClick={(e) => handleNavClick('/#export-services', e)}
                className="block px-3 py-2.5 text-sm font-semibold text-[#0B1730] hover:bg-[#F5F7FA] rounded-md"
              >
                Export Services &amp; Sourcing
              </Link>
              <Link
                href="/#certifications"
                onClick={(e) => handleNavClick('/#certifications', e)}
                className="block px-3 py-2.5 text-sm font-semibold text-[#0B1730] hover:bg-[#F5F7FA] rounded-md"
              >
                Certifications &amp; Compliance
              </Link>
              <Link
                href="/#founders"
                onClick={(e) => handleNavClick('/#founders', e)}
                className="block px-3 py-2.5 text-sm font-semibold text-[#0B1730] hover:bg-[#F5F7FA] rounded-md"
              >
                Leadership
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-sm font-semibold text-[#0B1730] hover:bg-[#F5F7FA] rounded-md"
              >
                Contact Trade Desk
              </Link>
            </nav>

            {/* Mobile Contact & Quote Button */}
            <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openEnquiryModal();
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#0B1730] bg-[#C7A45B] hover:bg-[#B89347] rounded-md shadow-xs cursor-pointer"
              >
                <span>Request Lot Quotation</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="p-3 bg-[#F8FAFC] rounded-md text-xs text-[#64748B] space-y-1">
                <div className="font-bold text-[#0B1730]">Gujarat Export Desk</div>
                <div>Phone: {contact.phone}</div>
                <div>Email: {contact.email}</div>
              </div>
            </div>

          </div>
        </div>
      )}

    </header>
  );
}
