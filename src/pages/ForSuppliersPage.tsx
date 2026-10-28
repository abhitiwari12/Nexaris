import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Send, AlertCircle, MessageSquare, Mail, MapPin, Scale, FileCheck } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

export function ForSuppliersPage() {
  const [formData, setFormData] = useState({
    supplierName: '',
    locationDistrictState: '',
    commodityOffered: 'Organic Jaggery Powder (100% Sulphur-Free)',
    availableLotSizeMt: '',
    moistureLabReportAvailable: 'Yes — Lab COA Available',
    contactNumber: '',
    additionalNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const refId = `SUP-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    const submissionData = {
      referenceNumber: refId,
      timestamp: new Date().toISOString(),
      ...formData,
    };

    try {
      await fetch('/api/crm/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'supplier',
          company: formData.supplierName,
          name: formData.supplierName,
          phone: formData.contactNumber,
          commodity: formData.commodityOffered,
          quantity: formData.availableLotSizeMt,
          unit: 'MT',
          notes: `District/State: ${formData.locationDistrictState} | Lab Report: ${formData.moistureLabReportAvailable} | Notes: ${formData.additionalNotes}`,
        }),
      }).catch(() => null);
    } catch {
      // offline dev fallback
    } finally {
      setIsSubmitting(false);
      setSubmitSuccess(submissionData);
    }
  };

  const supplierWhatsAppMessage = submitSuccess
    ? `Hello NEXARIS Procurement Desk, I am registering as a supplier/FPO:\n- Name/FPO: ${submitSuccess.supplierName}\n- Location: ${submitSuccess.locationDistrictState}\n- Commodity: ${submitSuccess.commodityOffered}\n- Available Lot Size: ${submitSuccess.availableLotSizeMt} MT\n- Lab/Moisture Report: ${submitSuccess.moistureLabReportAvailable}\n- Contact: ${submitSuccess.contactNumber}\n- Ref: ${submitSuccess.referenceNumber}`
    : '';

  const whatsappDirectUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappClean}?text=${encodeURIComponent(supplierWhatsAppMessage)}`;
  const mailtoDirectUrl = `mailto:${SITE_CONFIG.contact.email}?subject=${encodeURIComponent(
    `Supplier Lot Registration: ${submitSuccess?.commodityOffered || 'Agricultural Commodity'} [${submitSuccess?.referenceNumber || ''}]`
  )}&body=${encodeURIComponent(supplierWhatsAppMessage)}`;

  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen">
      {/* Hero Header */}
      <section className="bg-[#0A192F] text-white py-14 sm:py-20 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#C5A059] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              FARMER &amp; FPO PROCUREMENT DESK · GANDHINAGAR
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white">
              Sell to NEXARIS
            </h1>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl">
              Connect your verified harvest lots directly into institutional export pipelines. We purchase directly from farmers, Farmer Producer Organizations (FPOs), and certified APMC processors across Gujarat and Western India.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Requirements & Protocol */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-stone-200 space-y-4 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
                PROCUREMENT CRITERIA
              </div>
              <h2 className="text-xl font-serif font-bold text-[#0A192F]">
                Active Commodity Sourcing Requirements
              </h2>

              <ul className="space-y-3 text-xs text-stone-600">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block">Organic Jaggery Powder:</strong>
                    <span>100% Sulphur-free (zero chemical bleaching), moisture ≤ 2.0%, free-flowing granulated texture, 40/60/80 mesh.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block">Premium Jaggery Cubes:</strong>
                    <span>Uniform 15mm x 15mm or 20mm x 20mm cubes, moisture ≤ 5.0%, sucrose ≥ 85%, solid non-crumbling consistency.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block">Traditional Jaggery Blocks:</strong>
                    <span>Solid cane blocks (1kg, 5kg, 10kg), moisture ≤ 7.0%, Brix value ≥ 85°, natural golden to dark brown color.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block">Liquid Jaggery / Cane Syrup (Kakvi):</strong>
                    <span>Brix 75°–80°, rich pourable viscous syrup, total sugars 60%–65%, zero synthetic additives.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Quality & Sampling Notice */}
            <div className="p-5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-amber-950">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Verification &amp; Payment Settlement</span>
              </div>
              <p className="leading-relaxed text-[11px] text-amber-900">
                All lots are subject to physical sampling and laboratory moisture testing prior to warehouse receipt at Gandhinagar or Mundra consolidation points. Prompt commercial settlement upon laboratory sign-off.
              </p>
            </div>
          </div>

          {/* Right Column: Supplier Registration Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-sm">
            {submitSuccess ? (
              <div className="text-center py-8 space-y-5">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#0A192F]">
                    Supplier Lot Registered
                  </h3>
                  <p className="text-xs text-stone-600 max-w-md mx-auto mt-1 leading-relaxed">
                    Reference Number:{' '}
                    <span className="font-mono font-bold text-[#0A192F] bg-stone-100 px-2 py-0.5 rounded border border-stone-300">
                      {submitSuccess.referenceNumber}
                    </span>
                  </p>
                  <p className="text-xs text-stone-500 mt-2">
                    Our procurement desk will review your lot parameters for {submitSuccess.commodityOffered} ({submitSuccess.availableLotSizeMt} MT) and get in touch directly.
                  </p>
                </div>

                {/* Direct Dispatch Options */}
                <div className="pt-2 max-w-md mx-auto space-y-2">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send Details to Trade Desk WhatsApp ({SITE_CONFIG.contact.phone})</span>
                  </a>
                  <a
                    href={mailtoDirectUrl}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-[#0A192F] bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors border border-stone-300"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email Offer to contact@nexaris.co.in</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setSubmitSuccess(null)}
                    className="px-5 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
                  >
                    Register Another Commodity Lot
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-stone-200 pb-3">
                  <h3 className="text-lg font-serif font-bold text-[#0A192F]">
                    Farmer / Supplier Offer Registration Form
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Submit your available crop lot size and location for direct procurement review.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* Supplier / FPO Name */}
                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">
                      Supplier / Farmer / FPO Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.supplierName}
                      onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                      placeholder="e.g. Saurashtra Farmers Producer Co / Rajesh Patel"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0A192F]"
                    />
                  </div>

                  {/* Location (District / State) */}
                  <div>
                    <label className="block font-semibold text-stone-800 mb-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                      Location (District / State) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.locationDistrictState}
                      onChange={(e) => setFormData({ ...formData, locationDistrictState: e.target.value })}
                      placeholder="e.g. Rajkot, Gujarat / Unjha, Mehsana"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0A192F]"
                    />
                  </div>

                  {/* Commodity Offered */}
                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">
                      Commodity Offered *
                    </label>
                    <select
                      value={formData.commodityOffered}
                      onChange={(e) => setFormData({ ...formData, commodityOffered: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#0A192F]"
                    >
                      <optgroup label="Natural Cane Sweeteners (HS Chapter 17)">
                        <option value="Organic Jaggery Powder (100% Sulphur-Free)">Organic Jaggery Powder (100% Sulphur-Free)</option>
                        <option value="Premium Jaggery Cubes (15mm / 20mm)">Premium Jaggery Cubes (15mm / 20mm)</option>
                        <option value="Traditional Jaggery Blocks (1kg / 5kg / 10kg)">Traditional Jaggery Blocks (1kg / 5kg / 10kg)</option>
                        <option value="Liquid Jaggery Syrup (Kakvi Brix 75°-80°)">Liquid Jaggery Syrup (Kakvi Brix 75°-80°)</option>
                      </optgroup>
                    </select>
                  </div>

                  {/* Available Lot Size (MT) */}
                  <div>
                    <label className="block font-semibold text-stone-800 mb-1 flex items-center gap-1">
                      <Scale className="w-3.5 h-3.5 text-[#C5A059]" />
                      Available Lot Size (in Metric Tons - MT) *
                    </label>
                    <input
                      type="number"
                      step="any"
                      min="1"
                      required
                      value={formData.availableLotSizeMt}
                      onChange={(e) => setFormData({ ...formData, availableLotSizeMt: e.target.value })}
                      placeholder="e.g. 15 MT / 50 MT"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-[#0A192F]"
                    />
                  </div>

                  {/* Moisture / Lab Report Availability */}
                  <div>
                    <label className="block font-semibold text-stone-800 mb-1 flex items-center gap-1">
                      <FileCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                      Moisture / Lab Report Status *
                    </label>
                    <select
                      value={formData.moistureLabReportAvailable}
                      onChange={(e) => setFormData({ ...formData, moistureLabReportAvailable: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#0A192F]"
                    >
                      <option value="Yes — Lab COA Available">Yes — Recent Lab COA Available</option>
                      <option value="Moisture Tested On-Site">Moisture Tested On-Site (Within Spec)</option>
                      <option value="Inspection Needed at Warehouse">Inspection / Testing Needed at Warehouse</option>
                    </select>
                  </div>

                  {/* Contact Number */}
                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">
                      Contact Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.contactNumber}
                      onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                      placeholder="+91 85119 12115"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0A192F]"
                    />
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="text-xs">
                  <label className="block font-semibold text-stone-800 mb-1">
                    Harvest Season, Variety Details or Packaging Format
                  </label>
                  <textarea
                    rows={2}
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    placeholder="Mention current bagging (e.g. 50kg Jute/PP), storage location, or variety specifics..."
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0A192F]"
                  />
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#0A192F] bg-[#D4AF37] hover:bg-[#C5A059] disabled:opacity-50 rounded-lg transition-all shadow-sm cursor-pointer min-h-[44px]"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Registering Supplier Offer...' : 'Submit Lot to NEXARIS Procurement'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
