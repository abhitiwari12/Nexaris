import React from 'react';
import { HeroBanner } from '../components/HeroBanner';
import { KeyProcessSection } from '../components/KeyProcessSection';
import { RetailBrandsShowcase } from '../components/RetailBrandsShowcase';
import { NumbersLedgerSection } from '../components/NumbersLedgerSection';
import { CertificateGridSection } from '../components/CertificateGridSection';
import { ConnectedSection } from '../components/ConnectedSection';

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Key Process (5 Clean Icons) */}
      <KeyProcessSection />

      {/* 3. ARIKA by NEXARIS — 23 Product Retail Collection */}
      <RetailBrandsShowcase />

      {/* 4. Numbers at NEXARIS (4 Metric Pillars) */}
      <NumbersLedgerSection />

      {/* 5. Statutory Quality Certificates (8 Badges) */}
      <CertificateGridSection />

      {/* 6. Contact & Quick RFQ Form */}
      <ConnectedSection />
    </div>
  );
}
