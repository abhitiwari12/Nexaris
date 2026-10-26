import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Send, Copy, Check, MessageSquare, Mail, ShieldCheck } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
import { Link } from '../context/RouterContext';
import { ALL_PRODUCTS } from '../data/products';
import { EnquiryFormData, Incoterm, QuantityUnit } from '../types';
import { SITE_CONFIG } from '../config/site';

export function EnquiryModal() {
  const { isModalOpen, selectedProduct, selectedDivision, selectedSubCategory: contextSubCategory, enquiryIntent, closeEnquiryModal } = useEnquiry();

  const [honeypot, setHoneypot] = useState('');

  const [formData, setFormData] = useState<Partial<EnquiryFormData>>({
    fullName: '',
    companyName: '',
    businessEmail: '',
    phoneOrWhatsApp: '',
    buyerLocation: '',
    destinationPort: '',
    enquiryType: 'buyer',
    division: 'spices',
    productSlug: '',
    productName: '',
    selectedSubCategory: '',
    requiredQuantity: '',
    quantityUnit: 'Metric Tons (MT)',
    incoterm: 'FOB Mundra',
    packagingPreference: 'Bulk 25kg / 50kg PP Bags with Liner',
    sampleRequested: false,
    additionalRequirements: '',
    consentAccepted: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<any | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Sync modal state on open
  useEffect(() => {
    if (selectedProduct) {
      const defaultSub = contextSubCategory || (selectedProduct.subCategories && selectedProduct.subCategories.length > 0 ? selectedProduct.subCategories[0] : '');
      setFormData((prev) => ({
        ...prev,
        division: selectedProduct.division,
        productSlug: selectedProduct.slug,
        productName: selectedProduct.name,
        selectedSubCategory: defaultSub,
        enquiryType: enquiryIntent || 'buyer',
      }));
    } else if (selectedDivision) {
      setFormData((prev) => ({
        ...prev,
        division: selectedDivision,
        productSlug: '',
        productName: '',
        selectedSubCategory: '',
        enquiryType: enquiryIntent || 'buyer',
      }));
    }
  }, [selectedProduct, selectedDivision, contextSubCategory, enquiryIntent, isModalOpen]);

  if (!isModalOpen) return null;

  // Active division filter for product dropdown
  const divisionProducts = ALL_PRODUCTS.filter((p) => {
    if (formData.division === 'spices') return p.category === 'spices';
    if (formData.division === 'oilseeds') return p.category === 'oilseeds';
    if (formData.division === 'jaggery') return p.category === 'jaggery';
    return true;
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName?.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!formData.businessEmail?.trim()) {
      newErrors.businessEmail = 'Please provide a business email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) {
      newErrors.businessEmail = 'Please enter a valid business email.';
    }

    if (!formData.buyerLocation?.trim()) {
      newErrors.buyerLocation = 'Please state your destination port or country.';
    }

    if (!formData.productName?.trim() && !formData.productSlug) {
      newErrors.productName = 'Please select a commodity.';
    }

    if (!formData.requiredQuantity?.trim()) {
      newErrors.requiredQuantity = 'Please specify volume.';
    } else if (isNaN(Number(formData.requiredQuantity)) || Number(formData.requiredQuantity) <= 0) {
      newErrors.requiredQuantity = 'Quantity must be greater than zero.';
    }

    if (!formData.consentAccepted) {
      newErrors.consentAccepted = 'Please acknowledge quotation review consent.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const currentProduct = ALL_PRODUCTS.find((p) => p.slug === formData.productSlug);
  const hsCodeDisplay = currentProduct?.hsCode ? ` (HS: ${currentProduct.hsCode})` : '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot guard
    if (!validate()) return;

    setIsSubmitting(true);

    const refNumber = `NX-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    const fullProductName = `${formData.productName || 'Agri Commodity'}${hsCodeDisplay}`;

    const submissionPayload = {
      referenceNumber: refNumber,
      timestamp: new Date().toISOString(),
      fullName: formData.fullName,
      companyName: formData.companyName || 'Unspecified',
      businessEmail: formData.businessEmail,
      phoneOrWhatsApp: formData.phoneOrWhatsApp || 'Not provided',
      buyerLocation: formData.buyerLocation,
      destinationPort: formData.destinationPort || formData.buyerLocation,
      productName: fullProductName,
      requiredQuantity: `${formData.requiredQuantity} ${formData.quantityUnit}`,
      incoterm: formData.incoterm || 'FOB Mundra',
      packagingPreference: formData.packagingPreference || 'Bulk PP Bags',
      additionalRequirements: formData.additionalRequirements || 'Standard export specifications',
    };

    try {
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionPayload),
      }).catch(() => null);
    } catch {
      // offline/dev fallback
    } finally {
      setIsSubmitting(false);
      setSubmissionSuccess(submissionPayload);
    }
  };

  const handleCopySummary = () => {
    if (!submissionSuccess) return;
    const text = `NEXARIS RFQ Ref: ${submissionSuccess.referenceNumber}\nCommodity: ${submissionSuccess.productName}\nVolume: ${submissionSuccess.requiredQuantity}\nIncoterms: ${submissionSuccess.incoterm}\nDestination: ${submissionSuccess.destinationPort}\nPackaging: ${submissionSuccess.packagingPreference}\nBuyer: ${submissionSuccess.fullName} (${submissionSuccess.businessEmail})\nPhone/WhatsApp: ${submissionSuccess.phoneOrWhatsApp}\nDate: ${submissionSuccess.timestamp}`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handleResetAndClose = () => {
    setSubmissionSuccess(null);
    setErrors({});
    closeEnquiryModal();
  };

  const whatsappMessage = submissionSuccess
    ? `Hello NEXARIS Commercial Desk, I have submitted an RFQ (${submissionSuccess.referenceNumber}):\n- Commodity: ${submissionSuccess.productName}\n- Quantity: ${submissionSuccess.requiredQuantity}\n- Incoterm: ${submissionSuccess.incoterm}\n- Destination Port: ${submissionSuccess.destinationPort}\n- Buyer: ${submissionSuccess.fullName} (${submissionSuccess.companyName})\n- Email: ${submissionSuccess.businessEmail}\n\nPlease share the formal proforma quotation and batch specifications.`
    : '';

  const whatsappDirectUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappClean}?text=${encodeURIComponent(whatsappMessage)}`;
  const mailtoDirectUrl = `mailto:${SITE_CONFIG.contact.email}?subject=${encodeURIComponent(
    `Formal RFQ - ${submissionSuccess?.productName || 'Commodity Quotation'} [Ref: ${submissionSuccess?.referenceNumber || ''}]`
  )}&body=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-stone-200 my-6 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0A192F] text-white border-b border-white/10">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              Commercial Trade Desk · Gandhinagar
            </div>
            <h2 id="enquiry-modal-title" className="text-lg font-serif font-bold text-white mt-0.5">
              Request Formal Quotation (RFQ)
            </h2>
          </div>
          <button
            onClick={handleResetAndClose}
            type="button"
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close RFQ Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submissionSuccess ? (
            /* Submission Confirmation State with Direct Dispatch */
            <div className="space-y-5">
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base font-bold text-stone-900 font-serif">
                      RFQ Logged Successfully
                    </h3>
                    <p className="text-xs text-stone-600 mt-1">
                      Official Reference Number:{' '}
                      <span className="font-mono font-bold text-[#0A192F] bg-white px-2 py-0.5 rounded border border-emerald-300">
                        {submissionSuccess.referenceNumber}
                      </span>
                    </p>
                    <p className="text-xs text-stone-500 mt-1.5">
                      Our trade desk at Gandhinagar will issue an indicative proforma sheet and lot COA to <strong>{submissionSuccess.businessEmail}</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Summary Box */}
              <div className="border border-stone-200 rounded-lg p-4 space-y-2 text-xs bg-[#FAF8F5]">
                <div className="flex justify-between border-b border-stone-200/60 pb-1.5">
                  <span className="text-stone-500">Commodity:</span>
                  <span className="font-semibold text-stone-900">{submissionSuccess.productName}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200/60 pb-1.5">
                  <span className="text-stone-500">Volume:</span>
                  <span className="font-semibold text-stone-900 font-mono">{submissionSuccess.requiredQuantity}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200/60 pb-1.5">
                  <span className="text-stone-500">Incoterms:</span>
                  <span className="font-semibold text-stone-900">{submissionSuccess.incoterm}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200/60 pb-1.5">
                  <span className="text-stone-500">Destination:</span>
                  <span className="font-semibold text-stone-900">{submissionSuccess.destinationPort}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Packaging:</span>
                  <span className="font-semibold text-stone-900">{submissionSuccess.packagingPreference}</span>
                </div>
              </div>

              {/* Direct Trade Desk Dispatch Actions */}
              <div className="space-y-2 pt-1">
                <div className="text-xs font-semibold text-stone-700">
                  Instant Connection to NEXARIS Trade Desk:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via WhatsApp (+91 98246 18484)</span>
                  </a>

                  <a
                    href={mailtoDirectUrl}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-[#0A192F] bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors border border-stone-300"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email to contact@nexaris.co.in</span>
                  </a>
                </div>
              </div>

              {/* Secondary Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSummary ? 'Summary Copied to Clipboard' : 'Copy RFQ Summary'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#0A192F] hover:bg-[#10243D] rounded-lg transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Input Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="websiteUrl"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden pointer-events-none opacity-0 absolute h-0 w-0"
                tabIndex={-1}
                aria-hidden="true"
                autoComplete="off"
              />

              {/* 3 Core Agricultural Divisions Filter */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  1. Agricultural Commodity Division *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        division: 'spices',
                        productSlug: '',
                        productName: '',
                        selectedSubCategory: '',
                      }));
                    }}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer text-center ${
                      formData.division === 'spices'
                        ? 'bg-[#0A192F] text-[#D4AF37] border-[#0A192F] shadow-xs'
                        : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    Wholesale Spices
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        division: 'oilseeds',
                        productSlug: '',
                        productName: '',
                        selectedSubCategory: '',
                      }));
                    }}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer text-center ${
                      formData.division === 'oilseeds'
                        ? 'bg-[#0A192F] text-[#D4AF37] border-[#0A192F] shadow-xs'
                        : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    Graded Oilseeds
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        division: 'jaggery',
                        productSlug: '',
                        productName: '',
                        selectedSubCategory: '',
                      }));
                    }}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer text-center ${
                      formData.division === 'jaggery'
                        ? 'bg-[#0A192F] text-[#D4AF37] border-[#0A192F] shadow-xs'
                        : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    Natural Jaggery
                  </button>
                </div>
              </div>

              {/* Product & Grade Dropdown */}
              <div>
                <label htmlFor="enquiry-product" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  2. Select Specific Commodity *
                </label>
                <select
                  id="enquiry-product"
                  value={formData.productSlug}
                  onChange={(e) => {
                    const found = ALL_PRODUCTS.find((p) => p.slug === e.target.value);
                    setFormData((prev) => ({
                      ...prev,
                      productSlug: e.target.value,
                      productName: found ? found.name : e.target.value,
                      division: found ? (found.division as any) : prev.division,
                    }));
                  }}
                  className={`w-full px-3 py-2.5 text-xs sm:text-sm border rounded-lg bg-stone-50 focus:bg-white text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#0A192F] font-medium ${
                    errors.productName ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                  }`}
                >
                  <option value="">-- Choose Commodity Grade (with HS Code) --</option>
                  {divisionProducts.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.name} {p.hsCode ? `[HS: ${p.hsCode}]` : ''}
                    </option>
                  ))}
                </select>
                {errors.productName && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.productName}</span>
                  </p>
                )}
              </div>

              {/* Contact Information (Full Name & Company) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="enquiry-name" className="block text-xs font-semibold text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    id="enquiry-name"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Ramesh Patel / Sarah Jenkins"
                    className={`w-full px-3 py-2 text-xs sm:text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0A192F] ${
                      errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                    }`}
                  />
                  {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label htmlFor="enquiry-company" className="block text-xs font-semibold text-stone-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    id="enquiry-company"
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Gulf Food Processing LLC"
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0A192F]"
                  />
                </div>
              </div>

              {/* Email & WhatsApp Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="enquiry-email" className="block text-xs font-semibold text-stone-700 mb-1">
                    Business Email *
                  </label>
                  <input
                    id="enquiry-email"
                    type="email"
                    required
                    value={formData.businessEmail}
                    onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                    placeholder="procurement@company.com"
                    className={`w-full px-3 py-2 text-xs sm:text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0A192F] ${
                      errors.businessEmail ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                    }`}
                  />
                  {errors.businessEmail && <p className="text-[11px] text-red-600 mt-1">{errors.businessEmail}</p>}
                </div>

                <div>
                  <label htmlFor="enquiry-phone" className="block text-xs font-semibold text-stone-700 mb-1">
                    WhatsApp / Direct Phone Number *
                  </label>
                  <input
                    id="enquiry-phone"
                    type="tel"
                    required
                    value={formData.phoneOrWhatsApp}
                    onChange={(e) => setFormData({ ...formData, phoneOrWhatsApp: e.target.value })}
                    placeholder="+971 50 123 4567 / +91..."
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0A192F]"
                  />
                </div>
              </div>

              {/* Volume & Incoterms */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label htmlFor="enquiry-quantity" className="block text-xs font-semibold text-stone-700 mb-1">
                    Required Volume *
                  </label>
                  <input
                    id="enquiry-quantity"
                    type="number"
                    min="1"
                    step="any"
                    required
                    value={formData.requiredQuantity}
                    onChange={(e) => setFormData({ ...formData, requiredQuantity: e.target.value })}
                    placeholder="e.g. 25"
                    className={`w-full px-3 py-2 text-xs sm:text-sm border rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-[#0A192F] ${
                      errors.requiredQuantity ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                    }`}
                  />
                </div>

                <div>
                  <label htmlFor="enquiry-unit" className="block text-xs font-semibold text-stone-700 mb-1">
                    Volume Unit
                  </label>
                  <select
                    id="enquiry-unit"
                    value={formData.quantityUnit}
                    onChange={(e) => setFormData({ ...formData, quantityUnit: e.target.value as QuantityUnit })}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#0A192F]"
                  >
                    <option value="Metric Tons (MT)">Metric Tons (MT)</option>
                    <option value="20ft FCL">20ft FCL Container</option>
                    <option value="40ft FCL">40ft FCL Container</option>
                    <option value="Kilograms (kg)">Kilograms (kg)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="enquiry-incoterm" className="block text-xs font-semibold text-stone-700 mb-1">
                    Preferred Incoterms
                  </label>
                  <select
                    id="enquiry-incoterm"
                    value={formData.incoterm || 'FOB Mundra'}
                    onChange={(e) => setFormData({ ...formData, incoterm: e.target.value as Incoterm })}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#0A192F]"
                  >
                    <option value="FOB Mundra">FOB Mundra Port, Gujarat</option>
                    <option value="FOB Kandla">FOB Kandla Port, Gujarat</option>
                    <option value="CIF (Destination Port)">CIF (Destination Port)</option>
                    <option value="CFR">CFR (Cost &amp; Freight)</option>
                    <option value="Ex-Works">Ex-Works (Gujarat Depot)</option>
                  </select>
                </div>
              </div>

              {/* Destination Port & Packaging Preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="enquiry-location" className="block text-xs font-semibold text-stone-700 mb-1">
                    Country &amp; Destination Discharge Port *
                  </label>
                  <input
                    id="enquiry-location"
                    type="text"
                    required
                    value={formData.buyerLocation}
                    onChange={(e) => setFormData({ ...formData, buyerLocation: e.target.value, destinationPort: e.target.value })}
                    placeholder="e.g. Jebel Ali, UAE / Rotterdam, Netherlands"
                    className={`w-full px-3 py-2 text-xs sm:text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0A192F] ${
                      errors.buyerLocation ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                    }`}
                  />
                  {errors.buyerLocation && <p className="text-[11px] text-red-600 mt-1">{errors.buyerLocation}</p>}
                </div>

                <div>
                  <label htmlFor="enquiry-packaging" className="block text-xs font-semibold text-stone-700 mb-1">
                    Packaging Preference
                  </label>
                  <select
                    id="enquiry-packaging"
                    value={formData.packagingPreference}
                    onChange={(e) => setFormData({ ...formData, packagingPreference: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#0A192F]"
                  >
                    <option value="Bulk 25kg / 50kg PP Bags with Liner">Bulk 25kg / 50kg PP Bags with Liner</option>
                    <option value="Export Breathable Jute Bags">Export Breathable Jute Bags</option>
                    <option value="500g / 1kg Stand-Up Zip Pouches (Private Label Retail)">500g / 1kg Stand-Up Zip Pouches (Private Label Retail)</option>
                    <option value="500g / 1kg Food Jars in Master Cartons">500g / 1kg Food Jars in Master Cartons</option>
                    <option value="Individual Shrink Wrap + Master Cartons">Individual Shrink Wrap + Master Cartons (Blocks)</option>
                    <option value="20kg HDPE Pails / 250kg Steel Drums">20kg HDPE Pails / 250kg Steel Drums (Liquid)</option>
                    <option value="1,000kg Jumbo Bulk FIBC Totes">1,000kg Jumbo Bulk FIBC Totes</option>
                  </select>
                </div>
              </div>

              {/* Additional Specifications / Target Schedule */}
              <div>
                <label htmlFor="enquiry-notes" className="block text-xs font-semibold text-stone-700 mb-1">
                  Specific Quality Thresholds or Private Label Notes <span className="text-stone-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  id="enquiry-notes"
                  rows={2}
                  value={formData.additionalRequirements}
                  onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
                  placeholder="Specify target moisture limit, curcumin percentage, mesh size, SGS inspection requirement, or delivery target..."
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0A192F]"
                />
              </div>

              {/* Consent checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentAccepted}
                    onChange={(e) => setFormData({ ...formData, consentAccepted: e.target.checked })}
                    className="mt-0.5 rounded border-stone-300 text-[#0A192F] focus:ring-[#0A192F]"
                  />
                  <span className="text-xs text-stone-600">
                    I confirm that this is a genuine B2B commercial enquiry and consent to NEXARIS processing this information in accordance with the{' '}
                    <Link
                      href="/privacy-policy"
                      className="underline text-[#0A192F] hover:text-[#C5A059]"
                      onClick={() => handleResetAndClose()}
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
                {errors.consentAccepted && <p className="text-[11px] text-red-600 mt-1">{errors.consentAccepted}</p>}
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0A192F] bg-[#D4AF37] hover:bg-[#C5A059] disabled:opacity-50 rounded-lg transition-all shadow-sm cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Generating RFQ Reference...' : 'Submit Commercial RFQ'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
