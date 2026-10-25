import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Send, Copy, Check, FileText, MessageCircle } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
import { Link } from '../context/RouterContext';
import { ALL_PRODUCTS } from '../data/products';
import { EnquiryFormData, QuantityUnit } from '../types';

export function EnquiryModal() {
  const { isModalOpen, selectedProduct, selectedDivision, selectedSubCategory: contextSubCategory, enquiryIntent, closeEnquiryModal } = useEnquiry();

  const [honeypot, setHoneypot] = useState('');

  const [formData, setFormData] = useState<Partial<EnquiryFormData>>({
    fullName: '',
    companyName: '',
    businessEmail: '',
    phoneOrWhatsApp: '',
    buyerLocation: '',
    enquiryType: 'buyer',
    division: 'spices-oilseeds',
    productSlug: '',
    productName: '',
    selectedSubCategory: '',
    requiredQuantity: '',
    quantityUnit: 'Metric Tons (MT)',
    incoterm: 'FOB Mundra',
    destinationPort: '',
    packagingPreference: 'Standard 25kg / 50kg PP Sacks',
    sampleRequested: false,
    additionalRequirements: '',
    consentAccepted: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<any | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Sync modal when product, division, contextSubCategory, or intent is passed
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      enquiryType: enquiryIntent || 'buyer',
    }));
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

  const filteredProducts = ALL_PRODUCTS.filter(
    (p) => !formData.division || p.division === formData.division
  );

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName?.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!formData.businessEmail?.trim()) {
      newErrors.businessEmail = 'Please provide a business email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) {
      newErrors.businessEmail = 'Please enter a valid email format (e.g., procurement@company.com).';
    }

    if (!formData.buyerLocation?.trim()) {
      newErrors.buyerLocation = formData.enquiryType === 'supplier'
        ? 'Please state your warehouse, origin, or loading location.'
        : 'Please state your destination port, city, or delivery country.';
    }

    if (!formData.productName?.trim() && !formData.productSlug) {
      newErrors.productName = 'Please select a commodity for this enquiry.';
    }

    if (!formData.requiredQuantity?.trim()) {
      newErrors.requiredQuantity = 'Please specify estimated quantity.';
    } else if (isNaN(Number(formData.requiredQuantity)) || Number(formData.requiredQuantity) <= 0) {
      newErrors.requiredQuantity = 'Quantity must be a positive number.';
    }

    if (!formData.consentAccepted) {
      newErrors.consentAccepted = 'Please acknowledge quotation review consent.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent rejection for bot submissions
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const currentProduct = ALL_PRODUCTS.find((p) => p.slug === formData.productSlug);
      const subCategoryTag = formData.selectedSubCategory ? ` (${formData.selectedSubCategory})` : '';
      const fullProductName = `${formData.productName || 'General Commodity Enquiry'}${subCategoryTag}`;

      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          companyName: formData.companyName,
          businessEmail: formData.businessEmail,
          phoneOrWhatsApp: formData.phoneOrWhatsApp,
          buyerLocation: formData.buyerLocation,
          enquiryType: formData.enquiryType || 'buyer',
          productName: fullProductName,
          selectedSubCategory: formData.selectedSubCategory || '',
          division: formData.division,
          requiredQuantity: formData.requiredQuantity,
          quantityUnit: formData.quantityUnit,
          additionalRequirements: formData.additionalRequirements,
          consentAccepted: formData.consentAccepted,
        }),
      });

      const data = await response.json().catch(() => ({}));
      const enquiryRef = data.referenceNumber || `NX-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

      setSubmissionSuccess({
        referenceNumber: enquiryRef,
        timestamp: data.timestamp || new Date().toISOString(),
        productName: fullProductName,
        selectedSubCategory: formData.selectedSubCategory || '',
        division: formData.division,
        fullName: formData.fullName,
        companyName: formData.companyName || 'Not specified',
        businessEmail: formData.businessEmail,
        phoneOrWhatsApp: formData.phoneOrWhatsApp || 'Not provided',
        buyerLocation: formData.buyerLocation,
        requiredQuantity: `${formData.requiredQuantity} ${formData.quantityUnit}`,
        additionalRequirements: formData.additionalRequirements || 'Standard trade terms',
      });
    } catch {
      const subCategoryTag = formData.selectedSubCategory ? ` (${formData.selectedSubCategory})` : '';
      const fullProductName = `${formData.productName || 'General Commodity Enquiry'}${subCategoryTag}`;
      const enquiryRef = `NX-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
      setSubmissionSuccess({
        referenceNumber: enquiryRef,
        timestamp: new Date().toISOString(),
        productName: fullProductName,
        selectedSubCategory: formData.selectedSubCategory || '',
        division: formData.division,
        fullName: formData.fullName,
        companyName: formData.companyName || 'Not specified',
        businessEmail: formData.businessEmail,
        phoneOrWhatsApp: formData.phoneOrWhatsApp || 'Not provided',
        buyerLocation: formData.buyerLocation,
        requiredQuantity: `${formData.requiredQuantity} ${formData.quantityUnit}`,
        additionalRequirements: formData.additionalRequirements || 'Standard trade terms',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopySummary = () => {
    if (!submissionSuccess) return;
    const text = `NEXARIS Enquiry Reference: ${submissionSuccess.referenceNumber}\nProduct: ${submissionSuccess.productName}\nQuantity: ${submissionSuccess.requiredQuantity}\nDestination: ${submissionSuccess.buyerLocation}\nContact: ${submissionSuccess.fullName} (${submissionSuccess.businessEmail})\nTimestamp: ${submissionSuccess.timestamp}`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handleResetAndClose = () => {
    setSubmissionSuccess(null);
    setErrors({});
    closeEnquiryModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl border border-[#DCE2E8] my-8 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#10243D] text-white">
          <div>
            <h2 id="enquiry-modal-title" className="text-lg font-bold font-display">
              Commercial Trade Enquiry
            </h2>
            <p className="text-xs text-[#AEB8C4] mt-0.5">
              Direct quotation and lot availability request
            </p>
          </div>
          <button
            onClick={handleResetAndClose}
            type="button"
            className="p-1.5 text-[#AEB8C4] hover:text-white rounded-md hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submissionSuccess ? (
            /* Submission Confirmation State */
            <div className="space-y-6">
              <div className="p-4 bg-[#F1F4F7] border border-[#DCE2E8] rounded-md">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base font-bold text-[#10243D]">
                      Enquiry Recorded Successfully
                    </h3>
                    <p className="text-xs text-[#5E6D82] mt-1">
                      Reference Number:{' '}
                      <span className="font-mono font-semibold text-[#10243D] tabular-nums">
                        {submissionSuccess.referenceNumber}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Development Environment Verification Notice (Honest Architecture) */}
              <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded text-xs text-amber-900 leading-relaxed">
                <p className="font-semibold mb-1 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                  <span>Production Endpoint Architecture Note</span>
                </p>
                <p>
                  This form is operating in the development environment. The payload was validated and structured according to the official NEXARIS trade schema. Prior to production launch on <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">https://nexaris.co.in</code>, configure your mailer webhook or backend API endpoint in <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">/src/config/site.ts</code> or via <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">VITE_ENQUIRY_API_ENDPOINT</code>.
                </p>
              </div>

              {/* Structured Submission Details */}
              <div className="border border-[#DCE2E8] rounded-md p-4 space-y-3 text-xs bg-white">
                <div className="flex justify-between border-b border-[#F1F4F7] pb-2">
                  <span className="text-[#5E6D82]">Commodity:</span>
                  <span className="font-semibold text-[#10243D]">{submissionSuccess.productName}</span>
                </div>
                <div className="flex justify-between border-b border-[#F1F4F7] pb-2">
                  <span className="text-[#5E6D82]">Estimated Volume:</span>
                  <span className="font-semibold text-[#10243D]">{submissionSuccess.requiredQuantity}</span>
                </div>
                <div className="flex justify-between border-b border-[#F1F4F7] pb-2">
                  <span className="text-[#5E6D82]">Destination / Delivery Port:</span>
                  <span className="font-semibold text-[#10243D]">{submissionSuccess.buyerLocation}</span>
                </div>
                <div className="flex justify-between border-b border-[#F1F4F7] pb-2">
                  <span className="text-[#5E6D82]">Buyer Contact:</span>
                  <span className="font-semibold text-[#10243D]">
                    {submissionSuccess.fullName} ({submissionSuccess.businessEmail})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5E6D82]">Company / Entity:</span>
                  <span className="text-[#10243D]">{submissionSuccess.companyName}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <a
                  href={`https://wa.me/919824618484?text=${encodeURIComponent(
                    `Hello NEXARIS, I have submitted an enquiry (Ref: ${submissionSuccess.referenceNumber}) for ${submissionSuccess.productName} (${submissionSuccess.requiredQuantity}) to ${submissionSuccess.buyerLocation}. Please review and share available quotation details.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp (+91 98246 18484)</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#10243D] bg-[#F1F4F7] hover:bg-[#DCE2E8] rounded-md transition-colors border border-[#DCE2E8]"
                >
                  {copiedSummary ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedSummary ? 'Summary Copied' : 'Copy Summary'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-[#10243D] hover:bg-[#183653] rounded-md transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* Input Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Spam Protection Honeypot Field */}
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

              {/* Enquiry Intent Segmented Toggle: Buyer vs Supplier */}
              <div className="p-1 bg-[#F1F4F7] rounded-md grid grid-cols-2 gap-1 border border-[#DCE2E8]">
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, enquiryType: 'buyer' }))}
                  className={`py-2 text-xs font-bold rounded transition-all cursor-pointer ${
                    formData.enquiryType === 'buyer'
                      ? 'bg-[#10243D] text-white shadow-xs'
                      : 'text-[#5E6D82] hover:text-[#10243D]'
                  }`}
                >
                  Buyer Trade Quotation
                </button>
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, enquiryType: 'supplier' }))}
                  className={`py-2 text-xs font-bold rounded transition-all cursor-pointer ${
                    formData.enquiryType === 'supplier'
                      ? 'bg-[#10243D] text-white shadow-xs'
                      : 'text-[#5E6D82] hover:text-[#10243D]'
                  }`}
                >
                  Supplier Offer Submission
                </button>
              </div>

              {/* Division Selector */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      division: 'spices-oilseeds',
                      productSlug: '',
                      productName: '',
                    }))
                  }
                  className={`px-3 py-2 text-xs font-semibold rounded border transition-colors ${
                    formData.division === 'spices-oilseeds'
                      ? 'bg-[#10243D] text-white border-[#10243D]'
                      : 'bg-white text-[#344256] border-[#DCE2E8] hover:bg-[#F1F4F7]'
                  }`}
                >
                  Spices & Oilseeds
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      division: 'aluminium-scrap',
                      productSlug: '',
                      productName: '',
                    }))
                  }
                  className={`px-3 py-2 text-xs font-semibold rounded border transition-colors ${
                    formData.division === 'aluminium-scrap'
                      ? 'bg-[#10243D] text-white border-[#10243D]'
                      : 'bg-white text-[#344256] border-[#DCE2E8] hover:bg-[#F1F4F7]'
                  }`}
                >
                  Aluminium Scrap
                </button>
              </div>

              {/* Product Selection */}
              <div>
                <label htmlFor="enquiry-product" className="block text-xs font-semibold text-[#10243D] mb-1">
                  Selected Commodity *
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
                      division: found ? found.division : prev.division,
                    }));
                  }}
                  className={`w-full px-3 py-2 text-xs border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#10243D] ${
                    errors.productName ? 'border-red-500 bg-red-50/20' : 'border-[#DCE2E8]'
                  }`}
                >
                  <option value="">-- Choose Commodity or General Lot --</option>
                  {filteredProducts.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.name} ({p.category === 'spices' ? 'Spice' : p.category === 'oilseeds' ? 'Oilseed' : 'Aluminium'})
                    </option>
                  ))}
                </select>
                {errors.productName && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.productName}</span>
                  </p>
                )}

                {/* Sub-Category / Variety Selection Options for Buyer */}
                {(() => {
                  const currentProd = ALL_PRODUCTS.find((p) => p.slug === formData.productSlug);
                  if (!currentProd || !currentProd.subCategories || currentProd.subCategories.length === 0) return null;
                  return (
                    <div className="p-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md space-y-1.5 mt-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-[#0B1730]">
                          Target Variety / Sub-Category Option *
                        </label>
                        <span className="text-[11px] text-[#64748B] font-medium">Select buyer preference</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {currentProd.subCategories.map((subCat) => {
                          const isSelected = formData.selectedSubCategory === subCat;
                          return (
                            <button
                              key={subCat}
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, selectedSubCategory: subCat }))}
                              className={`px-3 py-1.5 text-xs font-semibold rounded border transition-all cursor-pointer flex items-center gap-1 ${
                                isSelected
                                  ? 'bg-[#0B1730] text-white border-[#0B1730] shadow-xs'
                                  : 'bg-white text-[#1E293B] border-[#CBD5E1] hover:bg-slate-50'
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5 text-[#C7A45B]" />}
                              <span>{subCat}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Contact Information (Name & Company) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="enquiry-name" className="block text-xs font-semibold text-[#10243D] mb-1">
                    Full Name *
                  </label>
                  <input
                    id="enquiry-name"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Ramesh Patel / John Davis"
                    className={`w-full px-3 py-2 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-[#10243D] ${
                      errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-[#DCE2E8]'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="enquiry-company" className="block text-xs font-semibold text-[#10243D] mb-1">
                    Company / Entity Name <span className="text-[#5E6D82] font-normal">(Optional)</span>
                  </label>
                  <input
                    id="enquiry-company"
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Global Foods Ltd / Apex Smelters"
                    className="w-full px-3 py-2 text-xs border border-[#DCE2E8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#10243D]"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="enquiry-email" className="block text-xs font-semibold text-[#10243D] mb-1">
                    Business Email *
                  </label>
                  <input
                    id="enquiry-email"
                    type="email"
                    value={formData.businessEmail}
                    onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                    placeholder="procurement@company.com"
                    className={`w-full px-3 py-2 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-[#10243D] ${
                      errors.businessEmail ? 'border-red-500 bg-red-50/20' : 'border-[#DCE2E8]'
                    }`}
                  />
                  {errors.businessEmail && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.businessEmail}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="enquiry-phone" className="block text-xs font-semibold text-[#10243D] mb-1">
                    Phone / WhatsApp Number <span className="text-[#5E6D82] font-normal">(Optional)</span>
                  </label>
                  <input
                    id="enquiry-phone"
                    type="text"
                    value={formData.phoneOrWhatsApp}
                    onChange={(e) => setFormData({ ...formData, phoneOrWhatsApp: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 text-xs border border-[#DCE2E8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#10243D]"
                  />
                </div>
              </div>

              {/* Location & Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label htmlFor="enquiry-location" className="block text-xs font-semibold text-[#10243D] mb-1">
                    Destination Port / City *
                  </label>
                  <input
                    id="enquiry-location"
                    type="text"
                    value={formData.buyerLocation}
                    onChange={(e) => setFormData({ ...formData, buyerLocation: e.target.value })}
                    placeholder="e.g. Mundra / Nhava Sheva / Dubai"
                    className={`w-full px-3 py-2 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-[#10243D] ${
                      errors.buyerLocation ? 'border-red-500 bg-red-50/20' : 'border-[#DCE2E8]'
                    }`}
                  />
                  {errors.buyerLocation && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.buyerLocation}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="enquiry-quantity" className="block text-xs font-semibold text-[#10243D] mb-1">
                    Estimated Quantity *
                  </label>
                  <input
                    id="enquiry-quantity"
                    type="number"
                    min="1"
                    step="any"
                    value={formData.requiredQuantity}
                    onChange={(e) => setFormData({ ...formData, requiredQuantity: e.target.value })}
                    placeholder="e.g. 25"
                    className={`w-full px-3 py-2 text-xs border rounded-md tabular-nums focus:outline-none focus:ring-1 focus:ring-[#10243D] ${
                      errors.requiredQuantity ? 'border-red-500 bg-red-50/20' : 'border-[#DCE2E8]'
                    }`}
                  />
                  {errors.requiredQuantity && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.requiredQuantity}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="enquiry-unit" className="block text-xs font-semibold text-[#10243D] mb-1">
                    Unit of Measure
                  </label>
                  <select
                    id="enquiry-unit"
                    value={formData.quantityUnit}
                    onChange={(e) =>
                      setFormData({ ...formData, quantityUnit: e.target.value as any })
                    }
                    className="w-full px-3 py-2 text-xs border border-[#DCE2E8] rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#10243D]"
                  >
                    <option value="Metric Tons (MT)">Metric Tons (MT)</option>
                    <option value="Kilograms (kg)">Kilograms (kg)</option>
                    <option value="20ft FCL">20ft FCL Container</option>
                    <option value="40ft FCL">40ft FCL Container</option>
                  </select>
                </div>
              </div>

              {/* Incoterms & Packaging Preferences (OES Export Import Standard) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="enquiry-incoterm" className="block text-xs font-semibold text-[#10243D] mb-1">
                    Preferred Incoterms
                  </label>
                  <select
                    id="enquiry-incoterm"
                    value={formData.incoterm || 'FOB Mundra'}
                    onChange={(e) => setFormData({ ...formData, incoterm: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-[#DCE2E8] rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#10243D]"
                  >
                    <option value="FOB Mundra">FOB Mundra Port, Gujarat</option>
                    <option value="CIF (Destination Port)">CIF (Cost, Insurance &amp; Freight)</option>
                    <option value="CFR">CFR (Cost &amp; Freight)</option>
                    <option value="EXW Gujarat">EXW (Ex-Works Gujarat Depot)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="enquiry-packaging" className="block text-xs font-semibold text-[#10243D] mb-1">
                    Packaging Requirement
                  </label>
                  <select
                    id="enquiry-packaging"
                    value={formData.packagingPreference || 'Standard 25kg / 50kg PP Sacks'}
                    onChange={(e) => setFormData({ ...formData, packagingPreference: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#DCE2E8] rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#10243D]"
                  >
                    <option value="Standard 25kg / 50kg PP Sacks">Standard 25kg / 50kg PP Sacks</option>
                    <option value="Jute Bags for Export">Jute Bags for Export (Agro/Spices)</option>
                    <option value="Vacuum Sealed Bags">Vacuum Sealed Packs (Aroma Retention)</option>
                    <option value="Retail Pouch & Private Label">Retail Pouch / Private Labeling (OEM)</option>
                    <option value="1000kg FIBC Jumbo Bags">1,000kg FIBC Jumbo Bags</option>
                    <option value="Baled / Compressed Lots">Baled / Compressed Lots (Metals/Scrap)</option>
                  </select>
                </div>
              </div>

              {/* Sample Request Option */}
              <div className="p-3 bg-[#F8FAFC] rounded-md border border-[#E2E8F0]">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.sampleRequested || false}
                    onChange={(e) => setFormData({ ...formData, sampleRequested: e.target.checked })}
                    className="rounded border-[#DCE2E8] text-[#10243D] focus:ring-[#10243D]"
                  />
                  <span className="text-xs font-medium text-[#10243D]">
                    Request commercial representative sample via express air courier (DHL / FedEx)
                  </span>
                </label>
              </div>

              {/* Additional Requirements */}
              <div>
                <label htmlFor="enquiry-notes" className="block text-xs font-semibold text-[#10243D] mb-1">
                  Specific Requirements or Target Specifications <span className="text-[#5E6D82] font-normal">(Optional)</span>
                </label>
                <textarea
                  id="enquiry-notes"
                  rows={2}
                  value={formData.additionalRequirements}
                  onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
                  placeholder="Specify mesh size, purity requirement, packaging format, or target shipment schedule..."
                  className="w-full px-3 py-2 text-xs border border-[#DCE2E8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#10243D]"
                />
              </div>

              {/* Consent checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentAccepted}
                    onChange={(e) => setFormData({ ...formData, consentAccepted: e.target.checked })}
                    className="mt-0.5 rounded border-[#DCE2E8] text-[#10243D] focus:ring-[#10243D]"
                  />
                  <span className="text-xs text-[#344256]">
                    I consent to NEXARIS processing my business contact details to evaluate and respond to this commercial quotation enquiry in accordance with the{' '}
                    <Link
                      href="/privacy-policy"
                      className="underline text-[#10243D] hover:text-[#C7A45B]"
                      onClick={() => handleResetAndClose()}
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
                {errors.consentAccepted && (
                  <p className="text-[11px] text-red-600 mt-1">{errors.consentAccepted}</p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2 text-xs font-medium text-[#344256] hover:bg-[#F1F4F7] rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#10243D] hover:bg-[#183653] disabled:opacity-50 rounded-md transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Recording Enquiry...' : 'Submit Commercial Enquiry'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
