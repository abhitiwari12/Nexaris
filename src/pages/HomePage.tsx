import React from 'react';
import { DynamicHeroBanner } from '../components/DynamicHeroBanner';
import { SignatureRangeSection } from '../components/SignatureRangeSection';
import { OurStorySection } from '../components/OurStorySection';
import { KitchenRangeSection } from '../components/KitchenRangeSection';
import { CertificateGridSection } from '../components/CertificateGridSection';
import { ConnectedSection } from '../components/ConnectedSection';

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      {/* 1. Dynamic Interactive Hero Banner */}
      <DynamicHeroBanner />

      {/* 2. The Signature Range (6 Pastel Numbered Cards) */}
      <SignatureRangeSection />

      {/* 3. Our Story: The Retail Transition & Commitment to Kitchen Quality */}
      <OurStorySection />

      {/* 4. The NEXARIS Range for Your Kitchen (23 Pantry Staples Shelf) */}
      <KitchenRangeSection />

      {/* 5. Statutory Quality Certificates ("OUR CERTIFICATE" 8 Badges) */}
      <CertificateGridSection />

      {/* 6. Contact & Retail Trade Desk */}
      <ConnectedSection />
    </div>
  );
}
