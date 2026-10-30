import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ChevronDown, Sparkles } from 'lucide-react';
import { Link, useRouter } from '../context/RouterContext';
import { useEnquiry } from '../context/EnquiryContext';
import { SITE_CONFIG } from '../config/site';
import { TopUtilityBar } from './TopUtilityBar';

export function Header() {
  const { path } = useRouter();
  const { openEnquiryModal } = useEnquiry();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);

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

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT US' },
    { href: '/products', label: 'PRODUCTS', hasDropdown: true },
    { href: '/export', label: 'EXPORT & LOGISTICS' },
    { href: '/contact', label: 'CONTACT US' },
  ];

  return (
    <>
      <TopUtilityBar />
      <header className="sticky top-0 z-40 bg-[#0A192F] text-white border-b border-[#1E293B] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#D4AF37] rounded-sm py-1">
              <div className="w-11 h-11 rounded bg-gradient-to-br from-[#1E293B] to-[#0A192F] border border-[#D4AF37]/50 flex items-center justify-center shadow-inner group-hover:border-[#D4AF37] transition-colors">
                <span className="font-serif font-black text-xl text-[#D4AF37] tracking-wider">N</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg md:text-xl text-white tracking-widest uppercase">
                  NEXARIS
                </span>
                <span className="text-[10px] tracking-wider text-[#D4AF37] font-medium uppercase">
                  Foods & Agri Export
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = path === link.href || (link.href !== '/' && path.startsWith(link.href));

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
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider transition-colors py-2 ${
                          isActive ? 'text-[#D4AF37]' : 'text-slate-200 hover:text-[#D4AF37]'
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                      </Link>

                      {/* Dropdown Menu */}
                      {productsDropdownOpen && (
                        <div className="absolute top-full left-0 w-64 bg-[#0F172A] border border-[#1E293B] rounded-sm shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                          <Link
                            href="/products?division=spices"
                            className="block px-4 py-2.5 text-xs font-medium text-slate-200 hover:bg-[#1E293B] hover:text-[#D4AF37] transition-colors"
                          >
                            <div className="font-semibold text-white">Spices & Whole Seeds</div>
                            <div className="text-[11px] text-slate-400">Cumin, Fennel, Coriander, Turmeric</div>
                          </Link>
                          <Link
                            href="/products?division=pulses"
                            className="block px-4 py-2.5 text-xs font-medium text-slate-200 hover:bg-[#1E293B] hover:text-[#D4AF37] transition-colors"
                          >
                            <div className="font-semibold text-white">Dal & Pulses</div>
                            <div className="text-[11px] text-slate-400">Toor Dal, Chana Dal, Moong, Kabuli Chana</div>
                          </Link>
                          <Link
                            href="/products?division=dry-fruits"
                            className="block px-4 py-2.5 text-xs font-medium text-slate-200 hover:bg-[#1E293B] hover:text-[#D4AF37] transition-colors"
                          >
                            <div className="font-semibold text-white">Dry Fruits & Nuts</div>
                            <div className="text-[11px] text-slate-400">Almonds, Cashews, Pistachios, Raisins</div>
                          </Link>
                          <div className="my-1 border-t border-[#1E293B]"></div>
                          <Link
                            href="/products"
                            className="block px-4 py-2 text-xs font-semibold text-[#D4AF37] hover:bg-[#1E293B] transition-colors"
                          >
                            View Complete Catalogue →
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-xs font-semibold tracking-wider transition-colors py-2 relative ${
                      isActive ? 'text-[#D4AF37]' : 'text-slate-200 hover:text-[#D4AF37]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Quick RFQ CTA Button */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                type="button"
                onClick={() => openEnquiryModal(undefined, 'spices')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0A192F] bg-[#D4AF37] hover:bg-[#C5A059] rounded-sm transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-[#0A192F]"
              >
                <span>Enquire Now</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center lg:hidden gap-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-300 hover:text-white rounded focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#1E293B] bg-[#0A192F] px-4 pt-3 pb-6 space-y-3">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className="block py-2 text-sm font-semibold text-slate-200 hover:text-[#D4AF37] transition-colors"
                >
                  {link.label}
                </Link>
                {link.hasDropdown && (
                  <div className="pl-4 py-1 space-y-2 border-l border-[#1E293B] my-1">
                    <Link
                      href="/products?division=spices"
                      className="block text-xs text-slate-300 hover:text-[#D4AF37]"
                    >
                      • Spices & Whole Seeds
                    </Link>
                    <Link
                      href="/products?division=pulses"
                      className="block text-xs text-slate-300 hover:text-[#D4AF37]"
                    >
                      • Dal & Pulses
                    </Link>
                    <Link
                      href="/products?division=dry-fruits"
                      className="block text-xs text-slate-300 hover:text-[#D4AF37]"
                    >
                      • Dry Fruits & Nuts
                    </Link>
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-[#1E293B]">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openEnquiryModal(undefined, 'spices');
                }}
                className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider text-[#0A192F] bg-[#D4AF37] rounded-sm"
              >
                <span>Enquire Now / Quick RFQ</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
