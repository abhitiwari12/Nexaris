import React, { useState } from 'react';
import { X, MessageCircle, AlertCircle, Copy, Check, ExternalLink } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
import { SITE_CONFIG, getWhatsAppUrl } from '../config/site';

export function WhatsAppNoticeModal() {
  const { isWhatsAppNoticeOpen, closeWhatsAppNotice, whatsAppProductName } = useEnquiry();
  const [copiedEnv, setCopiedEnv] = useState(false);

  if (!isWhatsAppNoticeOpen) return null;

  const directUrl = getWhatsAppUrl(whatsAppProductName || undefined);
  const isNumberConfigured = Boolean(SITE_CONFIG.contact.whatsappNumber);

  const prefilledSample = whatsAppProductName
    ? `Hello NEXARIS, I am interested in ${whatsAppProductName}. Please share the available details and quotation process.`
    : 'Hello NEXARIS, I would like to enquire about your commodity trading services and available lots.';

  const handleCopyEnv = () => {
    navigator.clipboard.writeText('VITE_WHATSAPP_NUMBER=919876543210');
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="whatsapp-notice-title"
    >
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl border border-[#DCE2E8] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#10243D] text-white">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-emerald-400" />
            <h3 id="whatsapp-notice-title" className="text-base font-bold font-display">
              WhatsApp Trade Channel
            </h3>
          </div>
          <button
            onClick={closeWhatsAppNotice}
            className="p-1 text-[#AEB8C4] hover:text-white rounded hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs text-[#344256]">
          {isNumberConfigured && directUrl ? (
            <div className="space-y-3">
              <p className="text-sm text-[#10243D]">
                Connecting you directly to the verified NEXARIS WhatsApp trade desk.
              </p>
              <div className="p-3 bg-[#F1F4F7] border border-[#DCE2E8] rounded font-mono text-[11px] text-[#10243D]">
                {prefilledSample}
              </div>
              <a
                href={directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors"
              >
                <span>Launch WhatsApp Chat</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-start gap-2.5 p-3 bg-amber-50 border border-amber-200 rounded text-amber-900">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs text-amber-900">
                    Awaiting Official WhatsApp Number
                  </h4>
                  <p className="mt-1 leading-relaxed text-[11px] text-amber-800">
                    To prevent misdirection to unverified personal devices, NEXARIS WhatsApp links are safely guarded until the client's official enterprise WhatsApp Business number is provided.
                  </p>
                </div>
              </div>

              <div>
                <span className="font-semibold text-[#10243D] block mb-1">
                  Prefilled Context Message Ready:
                </span>
                <div className="p-3 bg-[#F1F4F7] border border-[#DCE2E8] rounded italic text-[#10243D]">
                  "{prefilledSample}"
                </div>
              </div>

              <div>
                <span className="font-semibold text-[#10243D] block mb-1">
                  Production Activation Instructions:
                </span>
                <p className="text-[#5E6D82] leading-relaxed mb-2">
                  Add the verified international WhatsApp number (including country code, without symbols) to your environment variables:
                </p>
                <div className="flex items-center justify-between gap-2 p-2 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded">
                  <span>VITE_WHATSAPP_NUMBER=91XXXXXXXXXX</span>
                  <button
                    onClick={handleCopyEnv}
                    type="button"
                    className="p-1 hover:bg-white/10 rounded text-white transition-colors"
                    title="Copy env template"
                  >
                    {copiedEnv ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={closeWhatsAppNotice}
                  className="w-full py-2.5 text-xs font-semibold text-white bg-[#10243D] hover:bg-[#183653] rounded-md transition-colors"
                >
                  Understood
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
