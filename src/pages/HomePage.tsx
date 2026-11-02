import React from 'react';
import { DynamicHeroBanner } from '../components/DynamicHeroBanner';
import { SignatureRangeSection } from '../components/SignatureRangeSection';
import { KitchenRangeSection } from '../components/KitchenRangeSection';
import { CertificateGridSection } from '../components/CertificateGridSection';
import { ConnectedSection } from '../components/ConnectedSection';

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      {/* 1. Dynamic Interactive Hero Banner (Matching Reference Video & Screenshots) */}
      <DynamicHeroBanner />

      {/* 2. The Signature Range (6 Pastel Numbered Cards matching Video 00:00 - 00:04) */}
      <SignatureRangeSection />

      {/* 3. The NEXARIS Range for Your Kitchen (Category Filter Shelf matching Video 00:05 - 00:08) */}
      <KitchenRangeSection />

      {/* 4. Statutory Quality Certificates ("OUR CERTIFICATE" 8 Badges matching Screenshot) */}
      <CertificateGridSection />

      {/* 5. Contact & Retail Trade Desk */}
      <ConnectedSection />
    </div>
  );
}
