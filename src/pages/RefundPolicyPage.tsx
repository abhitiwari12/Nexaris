import React from 'react';
import { RefreshCw, FileText, CheckCircle2, AlertTriangle, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { SITE_CONFIG, getTelLink, getMailtoLink } from '../config/site';

export function RefundPolicyPage() {
  const { contact } = SITE_CONFIG;

  return (
    <div className="bg-[#F5F7FA] py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 border-b border-[#E2E8F0] pb-8">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#C7A45B]">
            COMMERCIAL POLICIES
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1730] font-display">
            Refund & Cancellation Policy
          </h1>
          <p className="text-xs text-[#64748B]">
            Effective Date: October 2024 · B2B Wholesale Commodity Trading Clarification.
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 sm:p-10 space-y-8 text-sm text-[#334155] leading-relaxed shadow-sm">
          
          {/* Important B2B Context Notice */}
          <div className="p-4 bg-[#F5F7FA] rounded-md border-l-4 border-[#C7A45B] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B1730]">
              <AlertTriangle className="w-4 h-4 text-[#C7A45B]" aria-hidden="true" />
              <span>Important Commercial Trading Notice</span>
            </div>
            <p className="text-xs text-[#475569] leading-relaxed">
              NEXARIS is an institutional B2B commodity trading house dealing in bulk agricultural commodities (Spices &amp; Oilseeds) and natural sugarcane sweeteners (Jaggery). We do <strong>not</strong> sell retail consumer goods or operate an automated consumer shopping cart. Consequently, consumer return rights (such as retail "change of mind" returns) do not apply. Commercial trades are governed by bilateral Sales Purchase Contracts (SPCs) and the Indian Sale of Goods Act, 1930.
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1730] font-display flex items-center gap-2">
              <span className="text-[#C7A45B] font-mono text-sm">01.</span>
              Pre-Contractual Quotations & Order Inception
            </h2>
            <p>
              Inquiries submitted via our website form, email, or WhatsApp are non-binding requests for quotations (RFQs). No financial liability or contract arises until both parties formally sign a definitive Sales Purchase Contract (SPC) or countersign an official Proforma Invoice detailing:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[#475569]">
              <li>Precise commodity technical grade and tolerance limits.</li>
              <li>Agreed metric tonnage and packaging type.</li>
              <li>Delivery terms under standard Incoterms 2020 (e.g. Ex-Works, FOB, CIF).</li>
              <li>Payment structure (e.g. 100% Irrevocable LC at sight, Advance TT with balance against B/L).</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1730] font-display flex items-center gap-2">
              <span className="text-[#C7A45B] font-mono text-sm">02.</span>
              Order Cancellation Terms
            </h2>
            <p>
              Because wholesale physical commodities are procured, milled, cleaned, sorted, or packaged specifically to fulfill contracted buyer specifications:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#475569]">
              <li>
                <strong>Prior to Contract Execution:</strong> Either party may withdraw from discussions at any point without penalty or fee.
              </li>
              <li>
                <strong>Post-Execution / Advance Remittance:</strong> Once a purchase contract is formally executed and procurement/milling has commenced, cancellation requests must be made in writing and are subject to mutual commercial settlement covering direct procurement costs, spot price market differentials, and transport commitments incurred.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1730] font-display flex items-center gap-2">
              <span className="text-[#C7A45B] font-mono text-sm">03.</span>
              Quality Assurance & Pre-Shipment Inspection
            </h2>
            <p>
              To protect both buyer and seller against post-delivery disputes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#475569]">
              <li>
                <strong>Independent Pre-Shipment Inspection:</strong> Contracts routinely provide for inspection by internationally recognized independent surveyor agencies (such as SGS, Geo-Chem, or mutually agreed equivalent) at origin warehouse or loading port at buyer's or seller's expense as stipulated in the contract.
              </li>
              <li>
                <strong>Surveyor Certificates:</strong> The surveyor's certificate of weight, quality, and condition issued at loading port serves as conclusive evidence of contractual compliance.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1730] font-display flex items-center gap-2">
              <span className="text-[#C7A45B] font-mono text-sm">04.</span>
              Dispute Resolution & Adjustments
            </h2>
            <p>
              In the rare event that an unloaded shipment is alleged to deviate from contracted tolerances despite pre-shipment clearance:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#475569]">
              <li>The buyer must provide written notice accompanied by accredited surveyor joint-inspection findings within the contractual notification window (typically 7 to 14 business days from discharge).</li>
              <li>Remedies are determined pursuant to the governing contract and may include pro-rata weight/grade price adjustments, lot replacement, or credit notes.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 pt-4 border-t border-[#E2E8F0]">
            <h2 className="text-lg font-bold text-[#0B1730] font-display flex items-center gap-2">
              <span className="text-[#C7A45B] font-mono text-sm">05.</span>
              Commercial Enquiries
            </h2>
            <p>For questions regarding trade terms, contractual documentation, or lot inspections, contact our commercial desk:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
              <div>
                <span className="text-[#64748B] block">Trading House:</span>
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
