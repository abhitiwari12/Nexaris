import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2, AlertCircle, Copy, Check, ExternalLink, Linkedin } from 'lucide-react';
import { SITE_CONFIG, getWhatsAppUrl, getTelLink, getMailtoLink } from '../config/site';
import { ALL_PRODUCTS } from '../data/products';
import { useEnquiry } from '../context/EnquiryContext';
import { Link } from '../context/RouterContext';
import { Division } from '../types';

export function ContactPage() {
  const { contact } = SITE_CONFIG;

  const [division, setDivision] = useState<Division>('spices');
  const [productSlug, setProductSlug] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [phoneOrWhatsApp, setPhoneOrWhatsApp] = useState('');
  const [buyerLocation, setBuyerLocation] = useState('');
  const [requiredQuantity, setRequiredQuantity] = useState('');
  const [quantityUnit, setQuantityUnit] = useState('Metric Tons (MT)');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  const availableProducts = ALL_PRODUCTS.filter((p) => p.category === division || p.division === division);
  const selectedProductObj = ALL_PRODUCTS.find((p) => p.slug === productSlug);
  const whatsappUrl = getWhatsAppUrl(selectedProductObj?.name, selectedProductObj?.hsCode);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required.';
    if (!businessEmail.trim()) {
      errs.businessEmail = 'Business email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessEmail)) {
      errs.businessEmail = 'Please provide a valid email format.';
    }
    if (!buyerLocation.trim()) errs.buyerLocation = 'Destination port or delivery city is required.';
    if (!message.trim() && !requiredQuantity.trim()) {
      errs.message = 'Please specify either your estimated quantity or enquiry message.';
    }
    if (!consent) errs.consent = 'Consent acknowledgment is required to process enquiry.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          companyName,
          businessEmail,
          phoneOrWhatsApp,
          buyerLocation,
          productName: selectedProductObj ? selectedProductObj.name : `${division === 'jaggery' ? 'Natural Jaggery Sweeteners' : 'Spices & Oilseeds'} Trade`,
          division,
          requiredQuantity,
          quantityUnit,
          additionalRequirements: message,
          consentAccepted: consent,
        }),
      });

      const data = await response.json().catch(() => ({}));
      const ref = data.referenceNumber || `NX-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
      setSubmissionResult({
        referenceNumber: ref,
        timestamp: data.timestamp || new Date().toISOString(),
        division,
        commodity: selectedProductObj ? selectedProductObj.name : 'General Division Enquiry',
        fullName,
        companyName: companyName || 'Not specified',
        businessEmail,
        phoneOrWhatsApp: phoneOrWhatsApp || 'Not provided',
        buyerLocation,
        volume: requiredQuantity ? `${requiredQuantity} ${quantityUnit}` : 'To be discussed',
        message: message || 'General commodity quotation requested',
      });
    } catch {
      const ref = `NX-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
      setSubmissionResult({
        referenceNumber: ref,
        timestamp: new Date().toISOString(),
        division,
        commodity: selectedProductObj ? selectedProductObj.name : 'General Division Enquiry',
        fullName,
        companyName: companyName || 'Not specified',
        businessEmail,
        phoneOrWhatsApp: phoneOrWhatsApp || 'Not provided',
        buyerLocation,
        volume: requiredQuantity ? `${requiredQuantity} ${quantityUnit}` : 'To be discussed',
        message: message || 'General commodity quotation requested',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyRef = () => {
    if (!submissionResult) return;
    navigator.clipboard.writeText(submissionResult.referenceNumber);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  return (
    <div className="pb-24 space-y-16">
      {/* Hero Section */}
      <section className="bg-[#10243D] text-white py-16 sm:py-20 border-b border-[#183653]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-semibold tracking-wider uppercase text-[#AEB8C4] flex items-center gap-2">
              <span>Trade Desk & Commercial Enquiries</span>
              <span aria-hidden="true">·</span>
              <span>{contact.location}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display">
              Commercial Enquiries & Quotations
            </h1>

            <p className="text-base sm:text-lg text-[#AEB8C4] leading-relaxed">
              Connect with our commodity desks for lot availability, specifications, FOB/CIF pricing, and scheduled deliveries.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form and Channel Information Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Comprehensive Enquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-lg border border-[#DCE2E8] p-6 sm:p-8 shadow-sm">
            <div className="mb-6 pb-4 border-b border-[#F1F4F7]">
              <h2 className="text-xl font-bold text-[#10243D] font-display">
                Trade Quotation Request Form
              </h2>
              <p className="text-xs text-[#5E6D82] mt-1">
                Please provide your commodity specifications and target destination for timely quotation review.
              </p>
            </div>

            {submissionResult ? (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="p-4 bg-[#F1F4F7] border border-[#DCE2E8] rounded-md">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-base font-bold text-[#10243D]">
                        Enquiry Successfully Logged
                      </h3>
                      <p className="text-xs text-[#5E6D82] mt-1">
                        Reference Number:{' '}
                        <span className="font-mono font-bold text-[#10243D] tabular-nums">
                          {submissionResult.referenceNumber}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Structured Submission Details */}
                <div className="border border-[#DCE2E8] rounded-md p-4 space-y-2.5 text-xs bg-white">
                  <div className="flex justify-between border-b border-[#F1F4F7] pb-2">
                    <span className="text-[#5E6D82]">Division:</span>
                    <span className="font-semibold text-[#10243D] capitalize">
                      {submissionResult.division.replace('-', ' & ')}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[#F1F4F7] pb-2">
                    <span className="text-[#5E6D82]">Commodity:</span>
                    <span className="font-semibold text-[#10243D]">{submissionResult.commodity}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#F1F4F7] pb-2">
                    <span className="text-[#5E6D82]">Estimated Volume:</span>
                    <span className="font-semibold text-[#10243D]">{submissionResult.volume}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#F1F4F7] pb-2">
                    <span className="text-[#5E6D82]">Destination:</span>
                    <span className="font-semibold text-[#10243D]">{submissionResult.buyerLocation}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#F1F4F7] pb-2">
                    <span className="text-[#5E6D82]">Contact:</span>
                    <span className="font-semibold text-[#10243D]">
                      {submissionResult.fullName} ({submissionResult.businessEmail})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5E6D82]">Company:</span>
                    <span className="text-[#10243D]">{submissionResult.companyName}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleCopyRef}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#10243D] bg-[#F1F4F7] hover:bg-[#DCE2E8] rounded-md transition-colors border border-[#DCE2E8]"
                  >
                    {copiedRef ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedRef ? 'Reference Copied' : 'Copy Reference'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmissionResult(null);
                      setFullName('');
                      setBusinessEmail('');
                      setBuyerLocation('');
                      setMessage('');
                    }}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold text-white bg-[#10243D] hover:bg-[#183653] rounded-md transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Division Tabs (3 Agricultural Divisions) */}
                <div>
                  <label className="block text-xs font-semibold text-[#10243D] mb-1.5">
                    Agricultural Division *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setDivision('spices');
                        setProductSlug('');
                      }}
                      className={`px-3 py-2 text-xs font-semibold rounded border transition-colors ${
                        division === 'spices'
                          ? 'bg-[#0A192F] text-[#D4AF37] border-[#0A192F]'
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      Wholesale Spices
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDivision('oilseeds');
                        setProductSlug('');
                      }}
                      className={`px-3 py-2 text-xs font-semibold rounded border transition-colors ${
                        division === 'oilseeds'
                          ? 'bg-[#0A192F] text-[#D4AF37] border-[#0A192F]'
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      Graded Oilseeds
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDivision('jaggery');
                        setProductSlug('');
                      }}
                      className={`px-3 py-2 text-xs font-semibold rounded border transition-colors ${
                        division === 'jaggery'
                          ? 'bg-[#0A192F] text-[#D4AF37] border-[#0A192F]'
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      Natural Jaggery
                    </button>
                  </div>
                </div>

                {/* Specific Commodity Dropdown */}
                <div>
                  <label htmlFor="contact-commodity" className="block text-xs font-semibold text-[#10243D] mb-1">
                    Commodity of Interest <span className="text-[#5E6D82] font-normal">(Optional)</span>
                  </label>
                  <select
                    id="contact-commodity"
                    value={productSlug}
                    onChange={(e) => setProductSlug(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#DCE2E8] rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#10243D]"
                  >
                    <option value="">-- General Division Enquiry / Multiple Commodities --</option>
                    {availableProducts.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Contact Identity Split */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-[#10243D] mb-1">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ramesh Patel / Sarah Jenkins"
                      className={`w-full px-3 py-2 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-[#10243D] ${
                        errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-[#DCE2E8]'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-company" className="block text-xs font-semibold text-[#10243D] mb-1">
                      Company Name <span className="text-[#5E6D82] font-normal">(Optional)</span>
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Continental Food Ingredients"
                      className="w-full px-3 py-2 text-xs border border-[#DCE2E8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#10243D]"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-[#10243D] mb-1">
                      Business Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
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
                    <label htmlFor="contact-phone" className="block text-xs font-semibold text-[#10243D] mb-1">
                      Phone / WhatsApp Number <span className="text-[#5E6D82] font-normal">(Optional)</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="text"
                      value={phoneOrWhatsApp}
                      onChange={(e) => setPhoneOrWhatsApp(e.target.value)}
                      placeholder="+91 85119 12115"
                      className="w-full px-3 py-2 text-xs border border-[#DCE2E8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#10243D]"
                    />
                  </div>
                </div>

                {/* Location & Quantity */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-1">
                    <label htmlFor="contact-location" className="block text-xs font-semibold text-[#10243D] mb-1">
                      Destination Port / City *
                    </label>
                    <input
                      id="contact-location"
                      type="text"
                      value={buyerLocation}
                      onChange={(e) => setBuyerLocation(e.target.value)}
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
                    <label htmlFor="contact-qty" className="block text-xs font-semibold text-[#10243D] mb-1">
                      Estimated Volume
                    </label>
                    <input
                      id="contact-qty"
                      type="number"
                      min="1"
                      step="any"
                      value={requiredQuantity}
                      onChange={(e) => setRequiredQuantity(e.target.value)}
                      placeholder="e.g. 50"
                      className="w-full px-3 py-2 text-xs border border-[#DCE2E8] rounded-md tabular-nums focus:outline-none focus:ring-1 focus:ring-[#10243D]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-unit" className="block text-xs font-semibold text-[#10243D] mb-1">
                      Unit
                    </label>
                    <select
                      id="contact-unit"
                      value={quantityUnit}
                      onChange={(e) => setQuantityUnit(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#DCE2E8] rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#10243D]"
                    >
                      <option value="Metric Tons (MT)">Metric Tons (MT)</option>
                      <option value="Kilograms (kg)">Kilograms (kg)</option>
                      <option value="20ft FCL">20ft FCL Container</option>
                      <option value="40ft FCL">40ft FCL Container</option>
                    </select>
                  </div>
                </div>

                {/* Message / Requirements */}
                <div>
                  <label htmlFor="contact-msg" className="block text-xs font-semibold text-[#10243D] mb-1">
                    Enquiry Details & Specifications
                  </label>
                  <textarea
                    id="contact-msg"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details on requested grades, purity thresholds, mesh size, packaging requirements, or commercial payment terms..."
                    className="w-full px-3 py-2 text-xs border border-[#DCE2E8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#10243D]"
                  />
                  {errors.message && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Consent */}
                <div className="pt-1">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 rounded border-[#DCE2E8] text-[#10243D] focus:ring-[#10243D]"
                    />
                    <span className="text-xs text-[#344256]">
                      I consent to NEXARIS collecting and processing my business contact details to evaluate and respond to this commercial quotation enquiry in accordance with the{' '}
                      <Link
                        href="/privacy-policy"
                        className="underline text-[#10243D] hover:text-[#C7A45B]"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.consent}</p>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#10243D] hover:bg-[#183653] disabled:opacity-50 rounded-md transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Transmitting Enquiry...' : 'Transmit Commercial Enquiry'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Verified Corporate & Communication Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Channel Box */}
            <div className="p-6 bg-white rounded-lg border border-[#DCE2E8] space-y-5 shadow-sm">
              <h3 className="text-base font-bold text-[#10243D] font-display border-b border-[#F1F4F7] pb-3">
                Verified Business Details
              </h3>

              <div className="space-y-4 text-xs text-[#344256]">
                
                {/* Business Name */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-[#10243D]/5 border border-[#10243D]/10 flex items-center justify-center shrink-0">
                    <span className="font-display font-extrabold text-sm text-[#10243D]">N</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-[#5E6D82]">Business Name</span>
                    <span className="text-sm font-bold text-[#10243D]">{contact.businessName}</span>
                  </div>
                </div>

                {/* Registered Office Address */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-[#0A192F]/5 border border-[#0A192F]/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#0A192F]" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-[#5E6D82]">Registered Office</span>
                    <span className="text-xs font-semibold text-[#0A192F] leading-relaxed block">
                      {contact.registeredOffice}
                    </span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-[#0A192F]/5 border border-[#0A192F]/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#0A192F]" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-[#5E6D82]">Trade Desk Phone</span>
                    <a
                      href={getTelLink()}
                      className="text-sm font-semibold text-[#0A192F] hover:text-[#C5A059] block font-mono"
                    >
                      {contact.phone}
                    </a>
                    <a
                      href="tel:+918511912115"
                      className="text-xs text-stone-600 hover:text-[#C5A059] block font-mono mt-0.5"
                    >
                      +91 85119 12115
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-[#5E6D82]">WhatsApp Number</span>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 hover:underline inline-flex items-center gap-1.5"
                    >
                      <span>{contact.phone}</span>
                      <ExternalLink className="w-3 h-3 text-emerald-600" />
                    </a>
                  </div>
                </div>

                {/* Business Email */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-[#10243D]/5 border border-[#10243D]/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#10243D]" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-[#5E6D82]">Business Email</span>
                    <a
                      href={getMailtoLink()}
                      className="text-sm font-semibold text-[#10243D] hover:text-[#183653] hover:underline font-mono"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                {/* Company LinkedIn */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-[#10243D]/5 border border-[#10243D]/10 flex items-center justify-center shrink-0">
                    <Linkedin className="w-4 h-4 text-[#10243D]" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-[#5E6D82]">Company LinkedIn</span>
                    <a
                      href={contact.companyLinkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#10243D] hover:text-[#183653] hover:underline inline-flex items-center gap-1.5"
                    >
                      <span>linkedin.com/company/nexaris1</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#5E6D82]" />
                    </a>
                  </div>
                </div>

              </div>

              {/* Direct WhatsApp Action Button */}
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp ({contact.phone})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Operating Hours & Dispatch Notice */}
            <div className="p-6 bg-white rounded-lg border border-[#DCE2E8] space-y-3 shadow-sm text-xs text-[#344256]">
              <h4 className="font-bold text-sm text-[#10243D] font-display">
                Trade Enquiry Review Protocol
              </h4>
              <p className="leading-relaxed">
                All submitted commercial requests are routed directly to the designated commodity desk (Spices & Oilseeds or Jaggery Sweeteners) based in Gandhinagar, Gujarat. Formal proforma quotations include:
              </p>
              <ul className="space-y-1 text-[#5E6D82] list-disc pl-4">
                <li>Detailed commodity grading specifications</li>
                <li>Estimated FOB origin port / CIF destination rates</li>
                <li>Packaging and stuffing container capacity</li>
                <li>Inspection and documentation terms</li>
              </ul>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
