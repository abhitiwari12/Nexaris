import React from 'react';
import { FileText, Shield, Scale, MapPin, Mail, Phone, AlertCircle } from 'lucide-react';
import { SITE_CONFIG, getTelLink, getMailtoLink } from '../config/site';

export function TermsOfServicePage() {
  const { contact } = SITE_CONFIG;

  return (
    <div className="bg-[#F5F7FA] py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 border-b border-[#E2E8F0] pb-8">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#C7A45B]">
            COMPLIANCE & LEGAL
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1730] font-display">
            Terms of Service
          </h1>
          <p className="text-xs text-[#64748B]">
            Effective Date: October 2024 · Last Reviewed: October 2024 · Applicable to all commercial visitors and trading counterparties of NEXARIS.
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 sm:p-10 space-y-8 text-sm text-[#334155] leading-relaxed shadow-sm">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1730] font-display flex items-center gap-2">
              <span className="text-[#C7A45B] font-mono text-sm">01.</span>
              Platform Nature & Commercial Scope
            </h2>
            <p>
              These Terms of Service govern your access to and use of the website located at{' '}
              <a href="https://nexaris.co.in" className="text-[#0B1730] font-medium underline">
                https://nexaris.co.in
              </a>{' '}
              operated by <strong>NEXARIS</strong>, based in Gandhinagar, Gujarat, India.
            </p>
            <p>
              This website serves as an informational B2B catalogue, commercial showcase, and quotation enquiry channel across our two core commodity sectors: (1) Spices & Oilseeds, and (2) Aluminium Scrap. It does <strong>not</strong> operate as a consumer retail marketplace, nor does it process automatic point-of-sale consumer checkouts.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1730] font-display flex items-center gap-2">
              <span className="text-[#C7A45B] font-mono text-sm">02.</span>
              Quotations, Pricing & Market Volatility Disclosures
            </h2>
            <p>
              In adherence to ethical and transparent trading standards:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#475569]">
              <li>
                <strong>Indicative Information:</strong> Commodity descriptions, grade specifications, and indicative price guidelines displayed on this website or in preliminary communications are provided for guidance only.
              </li>
              <li>
                <strong>Market Volatility:</strong> Agricultural commodities and non-ferrous metals are subject to daily price fluctuations driven by physical commodity spot mandis, international exchange benchmarks (including LME for aluminium scrap), exchange rates, freight tariffs, and seasonal crop yields.
              </li>
              <li>
                <strong>Firm Commitments:</strong> A binding commercial commitment arises solely upon the execution of a written Sales Purchase Contract (SPC) or Proforma Invoice signed by an authorized partner of NEXARIS, accompanied by mutually agreed payment securities (such as Irrevocable Letters of Credit or agreed Advance Telegraphic Transfer).
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1730] font-display flex items-center gap-2">
              <span className="text-[#C7A45B] font-mono text-sm">03.</span>
              Product Specifications & Quality Standards
            </h2>
            <p>
              NEXARIS strives for accuracy in all listed technical parameters (e.g. moisture content, purity, foreign matter, ash, recovery rates, and alloy classifications). However:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#475569]">
              <li>Lot-specific certificates of analysis (COA), phytosanitary certificates, FSSAI compliance declarations, or independent assay reports (e.g., SGS, Geo-Chem, or equivalent) must be formally specified within the bilateral contract.</li>
              <li>Visual representations and imagery on the website illustrate typical product appearance and packaging standards; actual lot appearance may vary naturally within agreed contractual tolerances.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1730] font-display flex items-center gap-2">
              <span className="text-[#C7A45B] font-mono text-sm">04.</span>
              Use of the Website & Conduct
            </h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#475569]">
              <li>Transmit fictitious, fraudulent, or unsolicited commercial enquiries.</li>
              <li>Use automated data extraction systems (scraping, crawling) without prior written permission.</li>
              <li>Attempt to circumvent security measures or disrupt web server availability.</li>
              <li>Misrepresent your authority to contract on behalf of any commercial entity.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1730] font-display flex items-center gap-2">
              <span className="text-[#C7A45B] font-mono text-sm">05.</span>
              Intellectual Property
            </h2>
            <p>
              The NEXARIS name, wordmark, website layout, curated descriptions, and associated brand elements are proprietary to NEXARIS. All trademarks, logos, and service marks displayed are the property of their respective owners. No license is granted without explicit written authorization.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1730] font-display flex items-center gap-2">
              <span className="text-[#C7A45B] font-mono text-sm">06.</span>
              Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable Indian law, NEXARIS, its partners, and representatives shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access to or inability to access this website, or reliance on any preliminary information presented herein.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1730] font-display flex items-center gap-2">
              <span className="text-[#C7A45B] font-mono text-sm">07.</span>
              Governing Law & Dispute Resolution
            </h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the substantive laws of India. Any dispute, controversy, or claim arising out of or relating to website usage shall be subject to the exclusive jurisdiction of the competent courts in Gandhinagar / Ahmedabad, Gujarat, India.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3 pt-4 border-t border-[#E2E8F0]">
            <h2 className="text-lg font-bold text-[#0B1730] font-display flex items-center gap-2">
              <span className="text-[#C7A45B] font-mono text-sm">08.</span>
              Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
              <div>
                <span className="text-[#64748B] block">Commercial Entity:</span>
                <span className="font-semibold text-[#0B1730]">{contact.businessName}</span>
              </div>
              <div>
                <span className="text-[#64748B] block">Location:</span>
                <span className="font-semibold text-[#0B1730]">{contact.location}</span>
              </div>
              <div>
                <span className="text-[#64748B] block">Email:</span>
                <a href={getMailtoLink()} className="font-mono text-[#0B1730] hover:text-[#C7A45B]">
                  {contact.email}
                </a>
              </div>
              <div>
                <span className="text-[#64748B] block">Phone / WhatsApp:</span>
                <a href={getTelLink()} className="text-[#0B1730] hover:text-[#C7A45B]">
                  {contact.phone}
                </a>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
