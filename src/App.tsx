import React, { useEffect } from 'react';
import { RouterProvider, useRouter, Link } from './context/RouterContext';
import { EnquiryProvider } from './context/EnquiryContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { EnquiryModal } from './components/EnquiryModal';
import { WhatsAppNoticeModal } from './components/WhatsAppNoticeModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CookieConsentBanner } from './components/CookieConsentBanner';

import { HomePage } from './pages/HomePage';
import { SpicesOilseedsPage } from './pages/SpicesOilseedsPage';
import { JaggeryPage } from './pages/JaggeryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ContactPage } from './pages/ContactPage';
import { ForBuyersPage } from './pages/ForBuyersPage';
import { ForSuppliersPage } from './pages/ForSuppliersPage';
import { KnowledgeCentrePage } from './pages/KnowledgeCentrePage';
import { AboutPage } from './pages/AboutPage';
import { OwnerCrmPage } from './pages/crm/OwnerCrmPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { RefundPolicyPage } from './pages/RefundPolicyPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';

import { ALL_PRODUCTS } from './data/products';
import { Layers, ArrowLeft } from 'lucide-react';

function RouteRenderer() {
  const { path } = useRouter();

  // Normalize path without query params or hashes
  const cleanPath = (path.split('?')[0].split('#')[0] || '/').replace(/\/+$/, '') || '/';

  // Dynamic document title updater
  useEffect(() => {
    if (cleanPath === '/') {
      document.title = 'NEXARIS | One Partner. Many Possibilities. — Spices, Oilseeds & Natural Jaggery Sweeteners';
    } else if (cleanPath === '/spices-oilseeds') {
      document.title = 'Spices & Oilseeds Wholesale Catalogue | NEXARIS';
    } else if (cleanPath === '/jaggery' || cleanPath === '/aluminium-scrap') {
      document.title = 'Premium Jaggery & Natural Sweeteners Export Catalogue | NEXARIS';
    } else if (cleanPath === '/buyers') {
      document.title = 'For International Buyers | NEXARIS B2B Sourcing';
    } else if (cleanPath === '/suppliers') {
      document.title = 'For Suppliers & Aggregators | NEXARIS Procurement';
    } else if (cleanPath === '/knowledge' || cleanPath.startsWith('/knowledge/')) {
      document.title = 'Trade Knowledge Centre & Specifications | NEXARIS';
    } else if (cleanPath === '/about') {
      document.title = 'About NEXARIS | Corporate Profile & Leadership';
    } else if (cleanPath === '/contact') {
      document.title = 'Contact & Trade Quotations | NEXARIS';
    } else if (cleanPath === '/crm' || cleanPath === '/admin') {
      document.title = 'Owner CRM Console | NEXARIS Trade Desk';
    } else if (cleanPath === '/privacy-policy') {
      document.title = 'Privacy Policy | NEXARIS';
    } else if (cleanPath === '/terms-of-service') {
      document.title = 'Terms of Service | NEXARIS';
    } else if (cleanPath === '/refund-cancellation-policy') {
      document.title = 'Refund & Cancellation Policy | NEXARIS';
    } else if (cleanPath === '/cookie-policy') {
      document.title = 'Cookie Policy | NEXARIS';
    } else if (cleanPath.startsWith('/spices-oilseeds/')) {
      const slug = cleanPath.replace('/spices-oilseeds/', '');
      const product = ALL_PRODUCTS.find((p) => p.slug === slug && p.division === 'spices-oilseeds');
      if (product) {
        document.title = `${product.name} | Spices & Oilseeds | NEXARIS`;
      }
    } else if (cleanPath.startsWith('/jaggery/')) {
      const slug = cleanPath.replace('/jaggery/', '');
      const product = ALL_PRODUCTS.find((p) => p.slug === slug && p.division === 'jaggery');
      if (product) {
        document.title = `${product.name} | Natural Sweeteners | NEXARIS`;
      }
    } else if (cleanPath.startsWith('/aluminium-scrap/')) {
      const slug = cleanPath.replace('/aluminium-scrap/', '');
      const product = ALL_PRODUCTS.find((p) => p.slug === slug);
      if (product) {
        document.title = `${product.name} | Natural Sweeteners | NEXARIS`;
      }
    }
  }, [cleanPath]);

  // Route 1: Corporate Homepage
  if (cleanPath === '/') {
    return <HomePage />;
  }

  // Route 2: Spices & Oilseeds Division
  if (cleanPath === '/spices-oilseeds') {
    return <SpicesOilseedsPage />;
  }

  // Route 3: Spices & Oilseeds Product Detail (/spices-oilseeds/:slug)
  if (cleanPath.startsWith('/spices-oilseeds/')) {
    const slug = cleanPath.replace('/spices-oilseeds/', '');
    const product = ALL_PRODUCTS.find((p) => p.slug === slug && p.division === 'spices-oilseeds');
    if (product) {
      return <ProductDetailPage product={product} />;
    }
  }

  // Route 4: Jaggery Natural Sweeteners Division (/jaggery with alias for /aluminium-scrap)
  if (cleanPath === '/jaggery' || cleanPath === '/aluminium-scrap') {
    return <JaggeryPage />;
  }

  // Route 5: Jaggery Product Detail (/jaggery/:slug)
  if (cleanPath.startsWith('/jaggery/')) {
    const slug = cleanPath.replace('/jaggery/', '');
    const product = ALL_PRODUCTS.find((p) => p.slug === slug && p.division === 'jaggery');
    if (product) {
      return <ProductDetailPage product={product} />;
    }
  }

  // Route 5b: Legacy alias redirect (/aluminium-scrap/:slug)
  if (cleanPath.startsWith('/aluminium-scrap/')) {
    const slug = cleanPath.replace('/aluminium-scrap/', '');
    const product = ALL_PRODUCTS.find((p) => p.slug === slug || p.division === 'jaggery');
    if (product) {
      return <ProductDetailPage product={product} />;
    }
  }

  // Route 6: For Buyers Landing
  if (cleanPath === '/buyers') {
    return <ForBuyersPage />;
  }

  // Route 7: For Suppliers Landing
  if (cleanPath === '/suppliers') {
    return <ForSuppliersPage />;
  }

  // Route 8: Knowledge Centre & Article Detail
  if (cleanPath === '/knowledge' || cleanPath.startsWith('/knowledge/')) {
    return <KnowledgeCentrePage />;
  }

  // Route 9: About NEXARIS
  if (cleanPath === '/about') {
    return <AboutPage />;
  }

  // Route 10: Contact & Quotations
  if (cleanPath === '/contact') {
    return <ContactPage />;
  }

  // Route 11: Owner CRM Console
  if (cleanPath === '/crm' || cleanPath === '/admin') {
    return <OwnerCrmPage />;
  }

  // Compliance & Legal Routes
  if (cleanPath === '/privacy-policy') {
    return <PrivacyPolicyPage />;
  }

  if (cleanPath === '/terms-of-service') {
    return <TermsOfServicePage />;
  }

  if (cleanPath === '/refund-cancellation-policy') {
    return <RefundPolicyPage />;
  }

  if (cleanPath === '/cookie-policy') {
    return <CookiePolicyPage />;
  }

  // 404 Fallback
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <div className="p-8 bg-white rounded-lg border border-[#DCE2E8] shadow-sm space-y-4">
        <Layers className="w-12 h-12 text-[#183653] mx-auto opacity-40" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-[#10243D] font-display">
          Page Not Found
        </h1>
        <p className="text-sm text-[#5E6D82] max-w-md mx-auto">
          The requested commodity catalogue or destination does not exist or may have been repositioned.
        </p>
        <div className="pt-4 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#10243D] hover:bg-[#183653] rounded transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Return to Corporate Homepage</span>
          </Link>
          <Link
            href="/spices-oilseeds"
            className="px-4 py-2.5 text-xs font-semibold text-[#10243D] bg-[#F1F4F7] hover:bg-[#DCE2E8] rounded transition-colors border border-[#DCE2E8]"
          >
            Spices &amp; Oilseeds
          </Link>
          <Link
            href="/jaggery"
            className="px-4 py-2.5 text-xs font-semibold text-[#10243D] bg-[#F1F4F7] hover:bg-[#DCE2E8] rounded transition-colors border border-[#DCE2E8]"
          >
            Jaggery (Natural Sweeteners)
          </Link>
        </div>
      </div>
    </div>
  );
}

function MainLayout() {
  const { path } = useRouter();
  const cleanPath = (path.split('?')[0].split('#')[0] || '/').replace(/\/+$/, '') || '/';
  const isCrmRoute = cleanPath === '/crm' || cleanPath === '/admin';

  if (isCrmRoute) {
    return <RouteRenderer />;
  }

  // Public corporate website layout
  return (
    <div className="min-h-screen flex flex-col bg-[#F1F4F7] text-[#344256]">
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#0B1730] focus:text-white focus:border focus:border-[#C7A45B] focus:rounded shadow-lg font-semibold text-xs"
      >
        Skip to main content
      </a>

      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <RouteRenderer />
      </main>
      <Footer />

      {/* Interactive Modals and Consent */}
      <EnquiryModal />
      <WhatsAppNoticeModal />
      <FloatingWhatsApp />
      <CookieConsentBanner />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <EnquiryProvider>
        <MainLayout />
      </EnquiryProvider>
    </RouterProvider>
  );
}
