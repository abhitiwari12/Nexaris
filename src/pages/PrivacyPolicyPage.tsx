import React from 'react';
import { Shield, Lock, FileText, Mail, Phone, MapPin, Globe, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from '../context/RouterContext';
import { SITE_CONFIG, getTelLink, getMailtoLink } from '../config/site';

export function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-xs text-[#64748B]">
            Effective Date: October 2024 · Last Reviewed: October 2024 · Governed under applicable laws of India, including the Digital Personal Data Protection Act, 2023 (DPDP Act) and the Information Technology Act, 2000.
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 sm:p-10 space-y-8 text-sm text-[#334155] leading-relaxed shadow-sm">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1730] font-display flex items-center gap-2">
              <span className="text-[#C7A45B] font-mono text-sm">01.</span>
              Introduction & Scope
            </h2>
            <p>
              This Privacy Policy describes how <strong>NEXARIS</strong> (“we”, “us”, or “our”), operating from Gandhinagar, Gujarat, India, collects, processes, and protects personal data obtained from visitors, commercial buyers, and prospective trade partners accessing our website at{' '}
              <a href="https://nexaris.co.in" className="text-[#0B1730] font-medium underline">
                https://nexaris.co.in
              </a>
              .
            </p>
            <p>
              NEXARIS is a B2B commodity trading house operating across Spices, Oilseeds, and Natural Jaggery Sweeteners. Our services are directed strictly towards corporate entities, wholesale distributors, food processors, and adult commercial representatives. We practice strict data minimization.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1730] font-display flex items-center gap-2">
              <span className="text-[#C7A45B] font-mono text-sm">02.</span>
              Information We Collect
            </h2>
            <p>
              We collect only the information reasonably necessary to evaluate, process, and respond to your commercial trade and commodity quotation requests:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#475569]">
              <li>
                <strong>Contact Coordinates:</strong> Full name, business email address, company or trading firm name, and telephone / WhatsApp number.
              </li>
              <li>
                <strong>Commercial Trade Specifications:</strong> Target commodity division (Spices, Oilseeds, or Natural Jaggery Sweeteners), required quantities, packaging specifications, delivery terms (e.g. FOB / CIF), and destination port or city.
              </li>
              <li>
                <strong>Technical & Navigation Metadata:</strong> Basic HTTP header information, anonymized IP addresses, and essential session identifiers required for clean page routing and security monitoring.
              </li>
            </ul>
            <div className="p-3.5 bg-[#F5F7FA] rounded border border-[#E2E8F0] text-xs text-[#64748B]">
              <strong>Note:</strong> We do not collect credit card details, government identification numbers, biometrics, or sensitive personal data through this website. Financial settlement is performed strictly via regulated banking channels (e.g. LC, TT) under bilateral purchase agreements.
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1730] font-display flex items-center gap-2">
              <span className="text-[#C7A45B] font-mono text-sm">03.</span>
              Purpose & Legal Basis of Processing
            </h2>
            <p>We process submitted information strictly for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#475569]">
              <li>Formulating and delivering bespoke commodity price quotations and lot availability updates.</li>
              <li>Direct 1-on-1 commercial communication via email or telephone/WhatsApp regarding your specific trade enquiry.</li>
              <li>Fulfilling legal, statutory, and tax compliance obligations under the commercial laws of India.</li>
              <li>Maintaining cybersecurity, preventing automated abuse, and ensuring website uptime.</li>
            </ul>
            <p className="text-xs text-[#64748B]">
              <strong>Legal Basis:</strong> Processing is based on the performance of pre-contractual commercial discussions initiated at your request, your explicit consent provided upon submitting quotation forms, and our legitimate interest in conducting lawful B2B trade.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1730] font-display flex items-center gap-2">
              <span className="text-[#C7A45B] font-mono text-sm">04.</span>
              Third-Party Services & Data Sharing
            </h2>
            <p>
              NEXARIS does <strong>not sell, rent, trade, or monetize</strong> your commercial contact information to advertising networks, data brokers, or third-party marketing firms. Data is accessed solely by authorized NEXARIS personnel and trusted technical infrastructure providers:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#475569]">
              <li>
                <strong>Cloud Hosting & Infrastructure:</strong> Google Cloud Platform (Cloud Run / CDN) for reliable web serving and encrypted HTTPS delivery.
              </li>
              <li>
                <strong>Direct Communication Channels:</strong> WhatsApp Business / Meta Platforms (only when you explicitly choose to launch WhatsApp click-to-chat links) and standard RFC-compliant SMTP email conduits.
              </li>
              <li>
                <strong>Statutory Disclosures:</strong> We may disclose information only if required by a court of competent jurisdiction, regulatory authority, or law enforcement agency in India.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1730] font-display flex items-center gap-2">
              <span className="text-[#C7A45B] font-mono text-sm">05.</span>
              Data Retention Schedule
            </h2>
            <p>
              We retain commercial enquiry records for the duration of the commercial relationship or active trading negotiations. If an enquiry does not result in an executed contract, we retain records for up to 24 months for reference against future seasonal sugarcane harvest and jaggery production cycles, after which they are systematically purged, unless longer retention is mandated by Indian tax or trade record-keeping statutes.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1730] font-display flex items-center gap-2">
              <span className="text-[#C7A45B] font-mono text-sm">06.</span>
              Your Rights (Data Principal Rights)
            </h2>
            <p>
              In accordance with applicable data protection laws, including the Digital Personal Data Protection Act, 2023, you have the following rights regarding your personal data:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
              <div className="p-3 bg-[#F5F7FA] rounded border border-[#E2E8F0]">
                <strong className="text-[#0B1730] block">Right to Access:</strong>
                Request confirmation and a summary of your personal data processed by NEXARIS.
              </div>
              <div className="p-3 bg-[#F5F7FA] rounded border border-[#E2E8F0]">
                <strong className="text-[#0B1730] block">Right to Correction:</strong>
                Request correction, updating, or completion of inaccurate commercial coordinates.
              </div>
              <div className="p-3 bg-[#F5F7FA] rounded border border-[#E2E8F0]">
                <strong className="text-[#0B1730] block">Right to Erasure (Deletion):</strong>
                Request the deletion of your personal data when it is no longer required for its original purpose.
              </div>
              <div className="p-3 bg-[#F5F7FA] rounded border border-[#E2E8F0]">
                <strong className="text-[#0B1730] block">Right to Grievance Redressal:</strong>
                Access a readily available grievance redressal mechanism regarding privacy concerns.
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1730] font-display flex items-center gap-2">
              <span className="text-[#C7A45B] font-mono text-sm">07.</span>
              How to Submit a Data Access or Deletion Request
            </h2>
            <p>
              To exercise any of your data rights or request the permanent deletion of your contact records, send a written request to our designated privacy desk:
            </p>
            <div className="p-4 bg-[#F5F7FA] rounded border border-[#E2E8F0] space-y-2 text-xs">
              <div>
                <strong>Email:</strong>{' '}
                <a href="mailto:contact@nexaris.co.in?subject=Data%20Access%20or%20Deletion%20Request" className="text-[#0B1730] underline font-mono">
                  contact@nexaris.co.in
                </a>
              </div>
              <div>
                <strong>Subject Line:</strong> “Data Privacy / Deletion Request — [Your Company Name]”
              </div>
              <div>
                <strong>Verification Procedure:</strong> To protect commercial confidentiality, we verify the requester’s identity by confirming the domain and email associated with the original trade enquiry.
              </div>
              <div>
                <strong>SLA:</strong> We acknowledge requests within 48 business hours and process deletions within 30 calendar days, subject to statutory retention obligations.
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1730] font-display flex items-center gap-2">
              <span className="text-[#C7A45B] font-mono text-sm">08.</span>
              Children’s Privacy
            </h2>
            <p>
              Our website and trading desks operate solely in the commercial B2B sphere. We do not knowingly solicit, collect, or process personal data from individuals under 18 years of age. If you believe a minor has submitted personal information, please notify us immediately for prompt deletion.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1730] font-display flex items-center gap-2">
              <span className="text-[#C7A45B] font-mono text-sm">09.</span>
              Security Measures
            </h2>
            <p>
              We implement industry-standard administrative, physical, and technical controls to safeguard information against unauthorized access, loss, or alteration. All web communications are encrypted in transit via Transport Layer Security (TLS/HTTPS).
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-3 pt-4 border-t border-[#E2E8F0]">
            <h2 className="text-lg font-bold text-[#0B1730] font-display flex items-center gap-2">
              <span className="text-[#C7A45B] font-mono text-sm">10.</span>
              Contact & Grievance Redressal
            </h2>
            <p>For any questions or compliance notices regarding this policy, reach us at:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <div>
                <span className="text-[#64748B] block">Business Name:</span>
                <span className="font-semibold text-[#0B1730]">{contact.businessName}</span>
              </div>
              <div>
                <span className="text-[#64748B] block">Operating Location:</span>
                <span className="font-semibold text-[#0B1730]">{contact.location}</span>
              </div>
              <div>
                <span className="text-[#64748B] block">Official Email:</span>
                <a href={getMailtoLink()} className="font-mono text-[#0B1730] hover:text-[#C7A45B]">
                  {contact.email}
                </a>
              </div>
              <div>
                <span className="text-[#64748B] block">Commercial Phone / WhatsApp:</span>
                <a href={getTelLink()} className="text-[#0B1730] hover:text-[#C7A45B]">
                  {contact.phone}
                </a>
              </div>
            </div>
            <p className="text-[11px] text-[#64748B] mt-2">
              Corporate Registration / CIN: <em>[Pending formal corporate filing disclosure]</em> · GSTIN: <em>[Disclosed upon bilateral contracting]</em>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
