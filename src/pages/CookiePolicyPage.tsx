import React from 'react';
import { Cookie, Shield, SlidersHorizontal, Lock, CheckCircle2, Globe, Mail } from 'lucide-react';
import { SITE_CONFIG, getMailtoLink } from '../config/site';

export function CookiePolicyPage() {
  const { contact } = SITE_CONFIG;

  const handleOpenPreferences = () => {
    window.dispatchEvent(new CustomEvent('open-cookie-preferences'));
  };

  return (
    <div className="bg-[#F5F7FA] py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 border-b border-[#E2E8F0] pb-8">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#C7A45B]">
            COMPLIANCE & LEGAL
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1730] font-display">
            Cookie Policy
          </h1>
          <p className="text-xs text-[#64748B]">
            Effective Date: October 2024 · Plain-Language Transparency regarding cookies and local storage.
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 sm:p-10 space-y-8 text-sm text-[#334155] leading-relaxed shadow-sm">
          
          {/* Quick Action Preference Center Trigger */}
          <div className="p-5 bg-[#F5F7FA] rounded-lg border border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="font-bold text-[#0B1730] text-sm">
                Manage Your Cookie Preferences
              </div>
              <p className="text-xs text-[#64748B]">
                You can review or change your cookie choices for this device at any time.
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenPreferences}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0B1730] hover:bg-[#162444] rounded-md transition-colors cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-[#C7A45B] focus-visible:outline-none"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C7A45B]" aria-hidden="true" />
              <span>Open Cookie Settings</span>
            </button>
          </div>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1730] font-display flex items-center gap-2">
              <span className="text-[#C7A45B] font-mono text-sm">01.</span>
              What Are Cookies & Local Storage?
            </h2>
            <p>
              Cookies are small text files placed on your computer or mobile device when you visit websites. Local storage is a modern web browser mechanism that allows web applications to store key-value data locally within your browser without sending it back and forth to servers on every network request.
            </p>
            <p>
              NEXARIS uses these technologies responsibly with strict data minimization. We do <strong>not</strong> employ third-party advertising cookies, cross-site trackers, or commercial surveillance pixels.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1730] font-display flex items-center gap-2">
              <span className="text-[#C7A45B] font-mono text-sm">02.</span>
              Categories of Cookies We Use
            </h2>
            
            <div className="space-y-4 pt-1">
              {/* Essential */}
              <div className="p-4 rounded-md border border-[#E2E8F0] bg-[#F5F7FA] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#0B1730]" aria-hidden="true" />
                    <strong className="text-sm text-[#0B1730]">Strictly Necessary Cookies & Storage (Essential)</strong>
                  </div>
                  <span className="text-[11px] font-semibold text-[#0B1730] bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                    Always Active
                  </span>
                </div>
                <p className="text-xs text-[#64748B]">
                  These are technically necessary for our website to function securely and reliably. They remember your active page route, modal dialog states, and whether you have accepted or declined optional cookies (`nexaris_cookie_consent_v1`). Because the website cannot function properly without them, they cannot be switched off in our systems.
                </p>
                <div className="text-[11px] font-mono text-[#64748B] pt-1">
                  Typical Retention: Session or persistent up to 12 months for preference tokens.
                </div>
              </div>

              {/* Analytics */}
              <div className="p-4 rounded-md border border-[#E2E8F0] bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#C7A45B]" aria-hidden="true" />
                    <strong className="text-sm text-[#0B1730]">Performance & Anonymized Metrics (Optional)</strong>
                  </div>
                  <span className="text-[11px] font-semibold text-[#64748B] bg-[#F5F7FA] px-2 py-0.5 rounded border border-[#E2E8F0]">
                    Disabled by Default
                  </span>
                </div>
                <p className="text-xs text-[#64748B]">
                  These optional technologies allow us to understand aggregated traffic patterns, such as which commodity pages are most visited and whether pages load efficiently across different device viewports. No personal profiles or advertising IDs are generated. These operate only if you explicitly choose “Accept All” or enable them in Cookie Settings.
                </p>
                <div className="text-[11px] font-mono text-[#64748B] pt-1">
                  Typical Retention: Up to 12 months.
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1730] font-display flex items-center gap-2">
              <span className="text-[#C7A45B] font-mono text-sm">03.</span>
              Browser-Level Cookie Management
            </h2>
            <p>
              In addition to our on-site preference controls, you can manage or delete cookies directly through your browser settings:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[#475569]">
              <li><strong>Google Chrome:</strong> Settings &gt; Privacy and Security &gt; Cookies and other site data.</li>
              <li><strong>Mozilla Firefox:</strong> Settings &gt; Privacy &amp; Security &gt; Cookies and Site Data.</li>
              <li><strong>Apple Safari:</strong> Preferences &gt; Privacy &gt; Manage Website Data.</li>
              <li><strong>Microsoft Edge:</strong> Settings &gt; Cookies and Site Permissions &gt; Manage and delete cookies.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 pt-4 border-t border-[#E2E8F0]">
            <h2 className="text-lg font-bold text-[#0B1730] font-display flex items-center gap-2">
              <span className="text-[#C7A45B] font-mono text-sm">04.</span>
              Questions & Privacy Contact
            </h2>
            <p>
              If you have any questions about our use of cookies or our data privacy practices, please contact us at{' '}
              <a href={getMailtoLink()} className="font-mono text-[#0B1730] hover:text-[#C7A45B] underline">
                {contact.email}
              </a>
              .
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
