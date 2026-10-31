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
import { ProductsPage } from './pages/ProductsPage';
import { ExportPage } from './pages/ExportPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ForSuppliersPage } from './pages/ForSuppliersPage';
import { KnowledgeCentrePage } from './pages/KnowledgeCentrePage';
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
      document.title = 'NEXARIS | Spices, Dal & Pulses, Dry Fruits';
    } else if (cleanPath === '/products' || cleanPath === '/spices' || cleanPath === '/pulses' || cleanPath === '/dry-fruits' || cleanPath === '/jaggery' || cleanPath === '/spices-oilseeds') {
      document.title = 'Retail & Export Catalogue | Spices, Pulses & Dry Fruits | NEXARIS';
    } else if (cleanPath === '/export' || cleanPath === '/buyers') {
      document.title = 'Global Export & Logistics Desk | FOB Mundra & Kandla | NEXARIS';
    } else if (cleanPath === '/suppliers') {
      document.title = 'Agro Procurement & Farmer Partners | NEXARIS Gujarat';
    } else if (cleanPath === '/knowledge' || cleanPath.startsWith('/knowledge/')) {
      document.title = 'Quality & Specifications Knowledge Desk | NEXARIS';
    } else if (cleanPath === '/about') {
      document.title = 'About NEXARIS';
    } else if (cleanPath === '/contact') {
      document.title = 'Contact & Trade RFQ | NEXARIS Gandhinagar';
    } else if (cleanPath === '/crm' || cleanPath === '/admin') {
      document.title = 'Trade Console | NEXARIS Commercial Desk';
    } else if (cleanPath === '/privacy-policy') {
      document.title = 'Privacy Policy | NEXARIS';
    } else if (cleanPath === '/terms-of-service') {
      document.title = 'Terms & Conditions | NEXARIS';
    } else if (cleanPath === '/refund-cancellation-policy') {
      document.title = 'Refund & Cancellation Policy | NEXARIS';
    } else if (cleanPath === '/cookie-policy') {
      document.title = 'Cookie Policy | NEXARIS';
    }
  }, [cleanPath]);

  // Route 1: Corporate Homepage
  if (cleanPath === '/') {
    return <HomePage />;
  }

  // Route 2: Products Catalogue (Spices, Dal & Pulses, Dry Fruits)
  if (
    cleanPath === '/products' ||
    cleanPath === '/spices' ||
    cleanPath === '/pulses' ||
    cleanPath === '/dry-fruits' ||
    cleanPath === '/jaggery' ||
    cleanPath === '/spices-oilseeds' ||
    cleanPath === '/aluminium-scrap'
  ) {
    return <ProductsPage />;
  }

  // Route 3: Global Export & Logistics Division
  if (cleanPath === '/export' || cleanPath === '/buyers') {
    return <ExportPage />;
  }

  // Route 4: For Suppliers / Procurement
  if (cleanPath === '/suppliers') {
    return <ForSuppliersPage />;
  }

  // Route 5: Knowledge Centre
  if (cleanPath === '/knowledge' || cleanPath.startsWith('/knowledge/')) {
    return <KnowledgeCentrePage />;
  }

  // Route 6: About Us
  if (cleanPath === '/about') {
    return <AboutPage />;
  }

  // Route 7: Contact Us
  if (cleanPath === '/contact') {
    return <ContactPage />;
  }

  // Route 8: Owner CRM Console
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
        <Layers className="w-12 h-12 text-[#0A192F] mx-auto opacity-40" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-[#0A192F] font-serif">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          The requested product catalogue or destination could not be located.
        </p>
        <div className="pt-4 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#0A192F] hover:bg-[#1E293B] rounded transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/products"
            className="px-4 py-2.5 text-xs font-semibold text-[#0A192F] bg-[#FAF8F5] hover:bg-slate-200 rounded transition-colors border border-slate-300"
          >
            <span>View All Products</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function App() {
  return (
    <RouterProvider>
      <EnquiryProvider>
        <div className="min-h-screen flex flex-col font-sans antialiased text-slate-800 bg-[#FAF8F5]">
          <Header />
          <main className="flex-1">
            <RouteRenderer />
          </main>
          <Footer />
          <EnquiryModal />
          <WhatsAppNoticeModal />
          <FloatingWhatsApp />
          <CookieConsentBanner />
        </div>
      </EnquiryProvider>
    </RouterProvider>
  );
}

export default App;
