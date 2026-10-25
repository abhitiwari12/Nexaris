import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X, Check, SlidersHorizontal, Lock } from 'lucide-react';
import { Link } from '../context/RouterContext';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  timestamp: string;
}

const STORAGE_KEY = 'nexaris_cookie_consent_v1';

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(false);

  useEffect(() => {
    // Check if user has already made a selection
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      // Small timeout to prevent layout shift on initial paint
      const timer = setTimeout(() => setShowBanner(true), 600);
      return () => clearTimeout(timer);
    } else {
      try {
        const parsed: CookiePreferences = JSON.parse(saved);
        setAnalyticsConsent(parsed.analytics || false);
      } catch (e) {
        setShowBanner(true);
      }
    }
  }, []);

  // Listen for custom trigger to reopen preference modal (e.g., from footer link)
  useEffect(() => {
    const handleOpen = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed: CookiePreferences = JSON.parse(saved);
          setAnalyticsConsent(parsed.analytics || false);
        } catch (e) {
          setAnalyticsConsent(false);
        }
      }
      setShowPreferencesModal(true);
    };

    window.addEventListener('open-cookie-preferences', handleOpen);
    return () => window.removeEventListener('open-cookie-preferences', handleOpen);
  }, []);

  const savePreferences = (preferences: { essential: boolean; analytics: boolean }) => {
    const data: CookiePreferences = {
      essential: true, // Always required for basic functionality
      analytics: preferences.analytics,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setAnalyticsConsent(preferences.analytics);
    setShowBanner(false);
    setShowPreferencesModal(false);
  };

  const handleAcceptAll = () => {
    savePreferences({ essential: true, analytics: true });
  };

  const handleRejectNonEssential = () => {
    savePreferences({ essential: true, analytics: false });
  };

  const handleSaveCustom = () => {
    savePreferences({ essential: true, analytics: analyticsConsent });
  };

  return (
    <>
      {/* Primary Sticky Bottom Consent Banner */}
      {showBanner && !showPreferencesModal && (
        <aside
          role="region"
          aria-label="Cookie and Privacy Consent"
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-[#0B1730]/95 backdrop-blur-md text-white border-t border-[#162444] shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C7A45B]">
                <Cookie className="w-4 h-4" aria-hidden="true" />
                <span>Privacy & Cookie Preferences</span>
              </div>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                NEXARIS uses strictly necessary cookies and local storage tokens to ensure secure site routing, form processing, and preference retention. We do not use third-party advertising trackers. You can choose whether to permit optional anonymous analytics. Read our{' '}
                <Link
                  href="/cookie-policy"
                  className="text-white underline hover:text-[#C7A45B] focus-visible:ring-1 focus-visible:ring-[#C7A45B] rounded"
                >
                  Cookie Policy
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy-policy"
                  className="text-white underline hover:text-[#C7A45B] focus-visible:ring-1 focus-visible:ring-[#C7A45B] rounded"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-md transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#C7A45B] focus-visible:outline-none"
              >
                Reject Non-Essential
              </button>

              <button
                type="button"
                onClick={() => setShowPreferencesModal(true)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#94A3B8] hover:text-white bg-transparent border border-white/10 rounded-md transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#C7A45B] focus-visible:outline-none"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Manage</span>
              </button>

              <button
                type="button"
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0B1730] bg-[#C7A45B] hover:bg-[#B89347] rounded-md transition-colors cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                Accept All
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Preferences Management Modal */}
      {showPreferencesModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-lg border border-[#E2E8F0] shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 text-[#334155]">
            <div className="flex items-start justify-between pb-4 border-b border-[#E2E8F0]">
              <div className="space-y-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#C7A45B]">
                  Preferences Center
                </div>
                <h2 id="cookie-modal-title" className="text-xl font-bold text-[#0B1730] font-display">
                  Cookie & Privacy Settings
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowPreferencesModal(false)}
                className="p-1 text-[#64748B] hover:text-[#0B1730] rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-[#C7A45B] focus-visible:outline-none"
                aria-label="Close cookie preferences modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#64748B] leading-relaxed">
              When you browse our B2B commodity trading platform, we prioritize data minimization. We only collect information strictly required for operation or voluntarily submitted in commercial enquiries.
            </p>

            {/* Cookie Categories */}
            <div className="space-y-4">
              {/* Category 1: Strictly Necessary */}
              <div className="p-4 rounded-md border border-[#E2E8F0] bg-[#F5F7FA] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#0B1730]" aria-hidden="true" />
                    <span className="text-sm font-bold text-[#0B1730]">Strictly Necessary Cookies</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#0B1730] bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                    Always Active
                  </span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Essential for website navigation, security, routing between commodity divisions, and saving your privacy preferences. These cannot be disabled.
                </p>
              </div>

              {/* Category 2: Optional Analytics */}
              <div className="p-4 rounded-md border border-[#E2E8F0] bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#C7A45B]" aria-hidden="true" />
                    <span className="text-sm font-bold text-[#0B1730]">Performance & Anonymous Metrics</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analyticsConsent}
                      onChange={(e) => setAnalyticsConsent(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-[#CBD5E1] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#C7A45B] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0B1730]"></div>
                  </label>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Allows us to evaluate traffic patterns and page responsiveness in an aggregated, non-personally identifiable manner. No third-party ad profiling or behavioral tracking is used.
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-[#E2E8F0]">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-[#64748B] hover:text-[#0B1730] hover:bg-[#F5F7FA] rounded-md transition-colors"
              >
                Reject Non-Essential
              </button>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0B1730] hover:bg-[#162444] rounded-md transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-[#C7A45B] focus-visible:outline-none"
              >
                Save My Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
