import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ChevronDown, ShoppingBag, Download } from 'lucide-react';
import { Link, useRouter } from '../context/RouterContext';
import { useEnquiry } from '../context/EnquiryContext';
import { SITE_CONFIG } from '../config/site';
import { BasketDrawer } from './BasketDrawer';

export function Header() {
  const { path } = useRouter();
  const { openEnquiryModal, basket, setIsBasketDrawerOpen } = useEnquiry();
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
    { href: '/jaggery', label: 'Jaggery Catalogue', hasDropdown: true },
    { href: '/buyers', label: 'For Buyers' },
    { href: '/suppliers', label: 'For Suppliers' },
    { href: '/knowledge', label: 'Knowledge Centre' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-[#E2E8F0] shadow-2xs">
      {/* ========================================================
          MAIN NAVIGATION BAR
          ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 md:gap-6 h-16">
          
          {/* Brand Wordmark Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0 focus-visible:ring-2 focus-visible:ring-[#0B1730] rounded-sm transition-opacity hover:opacity-90"
            aria-label="NEXARIS Home"
          >
            <img
              src="/assets/aistudio/NEXARIS_Gold_Chevron_Wordmark_81d52302.png"
              alt="NEXARIS — One Partner. Many Possibilities."
              className="h-[16px] sm:h-[18px] max-h-[19px] w-auto object-contain mix-blend-multiply filter contrast-105"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5 text-xs font-semibold text-[#64748B]" aria-label="Main Navigation">
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
                      className={`inline-flex items-center gap-1 whitespace-nowrap shrink-0 transition-colors py-1 ${
                        isActive ? 'text-[#0B1730] font-extrabold' : 'hover:text-[#0B1730]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
                    </Link>

                    {/* Products Quick Dropdown */}
                    {productsDropdownOpen && (
                      <div className="absolute top-full left-0 w-72 pt-2 z-50">
                        <div className="bg-white rounded-lg shadow-xl border border-[#E2E8F0] p-2 space-y-1">
                          <Link
                            href="/jaggery#organic-jaggery-powder"
                            className="block px-3 py-2 rounded text-xs font-semibold text-[#0B1730] hover:bg-[#F5F7FA] transition-colors"
                          >
                            <span className="block font-bold">Organic Jaggery Powder</span>
                            <span className="text-[11px] text-[#64748B] font-normal">HS: 17011420 · Free-flowing, ≤2.0% moisture</span>
                          </Link>
                          <Link
                            href="/jaggery#premium-jaggery-cubes"
                            className="block px-3 py-2 rounded text-xs font-semibold text-[#0B1730] hover:bg-[#F5F7FA] transition-colors"
                          >
                            <span className="block font-bold">Premium Jaggery Cubes</span>
                            <span className="text-[11px] text-[#64748B] font-normal">HS: 17011410 · 15mm/20mm HORECA cubes</span>
                          </Link>
                          <Link
                            href="/jaggery#traditional-jaggery-blocks"
                            className="block px-3 py-2 rounded text-xs font-semibold text-[#0B1730] hover:bg-[#F5F7FA] transition-colors"
                          >
                            <span className="block font-bold">Traditional Jaggery Blocks</span>
                            <span className="text-[11px] text-[#64748B] font-normal">HS: 17011410 · 1kg/5kg/10kg solid blocks</span>
                          </Link>
                          <Link
                            href="/jaggery#liquid-jaggery-syrup"
                            className="block px-3 py-2 rounded text-xs font-semibold text-[#0B1730] hover:bg-[#F5F7FA] transition-colors"
                          >
                            <span className="block font-bold">Liquid Jaggery / Cane Syrup</span>
                            <span className="text-[11px] text-[#64748B] font-normal">HS: 17029090 · Brix 75°–80° pure cane syrup</span>
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
                  className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                    isActive
                      ? 'text-[#0B1730] font-extrabold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0B1730]'
                      : 'hover:text-[#0B1730]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Zone: PDF Catalogue, Primary CTA & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={SITE_CONFIG.cataloguePdfUrl}
              download="NEXARIS_Jaggery_Export_Catalogue.pdf"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#0A192F] hover:text-[#C5A059] border border-stone-200 hover:border-[#C5A059] rounded-lg transition-colors whitespace-nowrap bg-white shadow-2xs"
              title="Download official 5-page Jaggery Export Catalogue (PDF)"
            >
              <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>PDF Catalogue</span>
            </a>

            <button
              onClick={() => openEnquiryModal(undefined, undefined, 'buyer')}
              type="button"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#0A192F] bg-[#D4AF37] hover:bg-[#C5A059] rounded-lg transition-all shadow-xs cursor-pointer whitespace-nowrap"
            >
              Request RFQ
            </button>

            {/* Mobile Navigation Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 text-[#0A192F] hover:bg-stone-100 rounded-md transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer xl:hidden"
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
        <div className="xl:hidden fixed inset-0 z-50 flex flex-col">
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
                className="h-7 w-auto object-contain mix-blend-multiply"
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
            <nav className="py-4 space-y-1 text-xs">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 font-bold text-[#0B1730] hover:bg-[#F5F7FA] rounded-md"
              >
                Home
              </Link>
              <Link
                href="/jaggery"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 font-bold text-[#0B1730] hover:bg-[#F5F7FA] rounded-md"
              >
                Jaggery Catalogue (HS Ch. 17)
              </Link>

              <div className="pt-2 border-t border-[#F1F5F9]" />

              <Link
                href="/buyers"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 font-bold text-[#0B1730] hover:bg-[#F5F7FA] rounded-md"
              >
                For Buyers
              </Link>
              <Link
                href="/suppliers"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 font-bold text-[#0B1730] hover:bg-[#F5F7FA] rounded-md"
              >
                For Suppliers
              </Link>
              <Link
                href="/knowledge"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 font-bold text-[#0B1730] hover:bg-[#F5F7FA] rounded-md"
              >
                Knowledge Centre
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 font-bold text-[#0B1730] hover:bg-[#F5F7FA] rounded-md"
              >
                About NEXARIS
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 font-bold text-[#0B1730] hover:bg-[#F5F7FA] rounded-md"
              >
                Contact Trade Desk
              </Link>
            </nav>

            {/* Mobile Contact & Quote Button */}
            <div className="pt-4 border-t border-[#E2E8F0] space-y-2">
              <a
                href={SITE_CONFIG.cataloguePdfUrl}
                download="NEXARIS_Jaggery_Export_Catalogue.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-[#0A192F] border border-stone-300 hover:border-[#D4AF37] rounded-md shadow-2xs cursor-pointer min-h-[44px] bg-stone-50"
              >
                <Download className="w-4 h-4 text-[#D4AF37]" />
                <span>Download PDF Catalogue (5-Page)</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openEnquiryModal();
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0B1730] bg-[#C7A45B] hover:bg-[#B89347] rounded-md shadow-xs cursor-pointer min-h-[44px]"
              >
                <span>Request a Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Global Basket Drawer */}
      <BasketDrawer />
    </header>
  );
}
