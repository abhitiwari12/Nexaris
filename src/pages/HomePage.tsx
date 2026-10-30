import React from 'react';
import { HeroBanner } from '../components/HeroBanner';
import { KeyProcessSection } from '../components/KeyProcessSection';
import { WelcomeSplitSection } from '../components/WelcomeSplitSection';
import { GlobalPresenceSection } from '../components/GlobalPresenceSection';
import { LogisticsSplitSection } from '../components/LogisticsSplitSection';
import { NumbersLedgerSection } from '../components/NumbersLedgerSection';
import { RetailBrandsShowcase } from '../components/RetailBrandsShowcase';
import { FacilityUpdatesSection } from '../components/FacilityUpdatesSection';
import { CertificateGridSection } from '../components/CertificateGridSection';
import { QuoteBannerSection } from '../components/QuoteBannerSection';
import { ConnectedSection } from '../components/ConnectedSection';

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Key Process: 5 Circular Outline Icons */}
      <KeyProcessSection />

      {/* 3. Welcome to NEXARIS Group (Split Story & Spice Bowls) */}
      <WelcomeSplitSection />

      {/* 4. About Us (Split World Reach & Indian Heritage) */}
      <GlobalPresenceSection />

      {/* 5. From Heritage to Container Seaports (Split Handshake & Logistics) */}
      <LogisticsSplitSection />

      {/* 6. Numbers at NEXARIS (4 Metric Columns) */}
      <NumbersLedgerSection />

      {/* 7. Our Brands / Retail Range (Pouch Showcase Grid) */}
      <RetailBrandsShowcase />

      {/* 8. Media & Facility Updates (3-Column Processing Mill Photos) */}
      <FacilityUpdatesSection />

      {/* 9. Our Certificates (8 Statutory Badges) */}
      <CertificateGridSection />

      {/* 10. Quote Banner ("Good quality creates a loyal customer...") */}
      <QuoteBannerSection />

      {/* 11. Let's Get Connected (Contact Info & Quick RFQ Form) */}
      <ConnectedSection />
    </div>
  );
}
