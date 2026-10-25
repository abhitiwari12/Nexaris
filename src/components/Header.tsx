import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ChevronDown, ShoppingBag } from 'lucide-react';
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
    { href: '/spices-oilseeds', label: 'Commodities', hasDropdown: true },
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
                      <div className="absolute top-full left-0 w-64 pt-2 z-50">
                        <div className="bg-white rounded-lg shadow-xl border border-[#E2E8F0] p-2 space-y-1">
                          <Link
                            href="/spices-oilseeds?category=spices"
                            className="block px-3 py-2 rounded text-xs font-semibold text-[#0B1730] hover:bg-[#F5F7FA] transition-colors"
                          >
                            <span className="block font-bold">Wholesale Spices</span>
                            <span className="text-[11px] text-[#64748B] font-normal">Chilli, Cumin, Turmeric, Pepper, Cloves</span>
                          </Link>
                          <Link
                            href="/spices-oilseeds?category=oilseeds"
                            className="block px-3 py-2 rounded text-xs font-semibold text-[#0B1730] hover:bg-[#F5F7FA] transition-colors"
                          >
                            <span className="block font-bold">Graded Oilseeds</span>
                            <span className="text-[11px] text-[#64748B] font-normal">Groundnut, Sesame, Mustard</span>
                          </Link>
                          <Link
                            href="/aluminium-scrap"
                            className="block px-3 py-2 rounded text-xs font-semibold text-[#0B1730] hover:bg-[#F5F7FA] transition-colors"
                          >
                            <span className="block font-bold">Aluminium Scrap</span>
                            <span className="text-[11px] text-[#64748B] font-normal">ISRI Barley Wire, Taint Tabor, Extrusions</span>
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

          {/* Action Buttons: Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Navigation Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 text-[#0B1730] hover:bg-[#F5F7FA] rounded-md transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer xl:hidden"
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
                href="/spices-oilseeds"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 font-bold text-[#0B1730] hover:bg-[#F5F7FA] rounded-md"
              >
                Spices &amp; Oilseeds
              </Link>
              <Link
                href="/aluminium-scrap"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 font-bold text-[#0B1730] hover:bg-[#F5F7FA] rounded-md"
              >
                Aluminium Scrap
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
            <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
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
