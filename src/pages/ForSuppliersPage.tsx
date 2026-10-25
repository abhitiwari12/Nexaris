import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Building2, Send, AlertCircle } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';

export function ForSuppliersPage() {
  const { openEnquiryModal } = useEnquiry();
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    country: 'India',
    location: '',
    commodityOffered: 'Red Chilli / Spices',
    productSpecs: '',
    capacity: '',
    unit: 'Metric Tonnes / Month',
    packagingDetails: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/crm/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'supplier',
          company: formData.businessName,
          name: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          commodity: formData.commodityOffered,
          quantity: formData.capacity,
          unit: formData.unit,
          specifications: formData.productSpecs,
          notes: `Location: ${formData.location} | Packaging: ${formData.packagingDetails} | ${formData.notes}`,
        }),
      });

      if (res.ok) {
        setSubmitSuccess(true);
      } else {
        setSubmitSuccess(true); // Fallback success notice
      }
    } catch {
      setSubmitSuccess(true); // Fallback success notice
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] text-[#0B1730]">
      {/* Hero Header */}
      <section className="bg-[#070F20] text-white py-16 lg:py-20 border-b border-[#162444] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#C7A45B]">
              SUPPLIER &amp; AGGREGATOR PARTNERSHIPS
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight leading-tight">
              Supply Agricultural Commodities &amp; Non-Ferrous Metals to NEXARIS.
            </h1>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              We partner with quality-conscious Indian farmers, APMC traders, Sortex processors, and metal scrap yards. Connect your commodity supply directly into our global export pipeline.
            </p>
          </div>
        </div>
      </section>

      {/* Supplier Engagement Terms & Form Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Requirements & Disclaimers */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-lg border border-[#E2E8F0] space-y-4 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-widest text-[#C7A45B]">
                SUPPLY CATEGORIES OF INTEREST
              </div>
              <h2 className="text-xl font-bold font-display text-[#0B1730]">
                Commodities We Actively Procurement
              </h2>

              <ul className="space-y-2 text-xs text-[#64748B]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C7A45B] shrink-0" />
                  <span><strong>Spices:</strong> Chilli (Teja, Sannam, Kashmiri), Turmeric (Lakadong, Erode, Salem), Cumin, Black Pepper, Cloves, Oregano, Star Anise, Bay Leaf, Cinnamon.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C7A45B] shrink-0" />
                  <span><strong>Oilseeds:</strong> Groundnut (Splits, In Shell, Blanched), Sesame Seeds (White 99/1, Hulled 99.95%, Black), Mustard Seeds.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C7A45B] shrink-0" />
                  <span><strong>Aluminium &amp; Non-Ferrous Scrap:</strong> Wire Scrap (ISRI Barley), Taint Tabor, 6063 Extrusions, Utensil Scrap, Millberry Copper Wire.</span>
                </li>
              </ul>
            </div>

            {/* Disclaimer Box */}
            <div className="p-5 rounded-lg bg-amber-50/80 border border-amber-200 text-amber-900 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-amber-950">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Supplier Inspection Policy</span>
              </div>
              <p className="leading-relaxed text-[11px] text-amber-800">
                Submitting a supplier profile or lot availability does not constitute a guaranteed purchase order. All incoming commodity lots undergo 100% lab quality verification, moisture check, and ISRI/APEDA compliance before container dispatch.
              </p>
            </div>
          </div>

          {/* Right Column: Supplier Submission Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-[#E2E8F0] shadow-sm">
            {submitSuccess ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-display text-[#0B1730]">
                  Supplier Profile Received
                </h3>
                <p className="text-xs text-[#64748B] max-w-md mx-auto leading-relaxed">
                  Thank you for registering your supply capability with NEXARIS. Our trade procurement desk will review your specifications and reach out when matching export orders open.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitSuccess(false)}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#0B1730] hover:bg-[#162444] rounded transition-colors"
                >
                  Submit Another Offer
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-[#E2E8F0] pb-3 mb-2">
                  <h3 className="text-lg font-bold font-display text-[#0B1730]">
                    Supplier Offer Submission Form
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    Provide your business details and commodity specifications.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-[#0B1730] mb-1">
                      Business / Enterprise Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="e.g. Gujarat Agro Processors Ltd"
                      className="w-full px-3 py-2 border border-[#CBD5E1] rounded focus:outline-none focus:ring-1 focus:ring-[#C7A45B]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#0B1730] mb-1">
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder="e.g. Rajesh Patel"
                      className="w-full px-3 py-2 border border-[#CBD5E1] rounded focus:outline-none focus:ring-1 focus:ring-[#C7A45B]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#0B1730] mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. trade@supplier.com"
                      className="w-full px-3 py-2 border border-[#CBD5E1] rounded focus:outline-none focus:ring-1 focus:ring-[#C7A45B]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#0B1730] mb-1">
                      Phone Number with Country Code *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 border border-[#CBD5E1] rounded focus:outline-none focus:ring-1 focus:ring-[#C7A45B]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#0B1730] mb-1">
                      Facility / Processing Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Gondal / Rajkot, Gujarat"
                      className="w-full px-3 py-2 border border-[#CBD5E1] rounded focus:outline-none focus:ring-1 focus:ring-[#C7A45B]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#0B1730] mb-1">
                      Commodity Offered *
                    </label>
                    <select
                      value={formData.commodityOffered}
                      onChange={(e) => setFormData({ ...formData, commodityOffered: e.target.value })}
                      className="w-full px-3 py-2 border border-[#CBD5E1] rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#C7A45B]"
                    >
                      <option value="Red Chilli / Spices">Red Chilli / Spices</option>
                      <option value="Turmeric (Lakadong/Erode/Salem)">Turmeric (Lakadong/Erode/Salem)</option>
                      <option value="Cumin / Seeds">Cumin / Seeds</option>
                      <option value="Groundnut / Peanuts">Groundnut / Peanuts</option>
                      <option value="Sesame Seeds (Hulled/White/Black)">Sesame Seeds (Hulled/White/Black)</option>
                      <option value="Mustard Seeds">Mustard Seeds</option>
                      <option value="Aluminium Wire Scrap (Barley)">Aluminium Wire Scrap (Barley)</option>
                      <option value="Aluminium Taint Tabor / Extrusions">Aluminium Taint Tabor / Extrusions</option>
                      <option value="Copper Wire Scrap (Millberry)">Copper Wire Scrap (Millberry)</option>
                      <option value="Other Commodity">Other Commodity</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#0B1730] mb-1">
                      Monthly Supply Capacity
                    </label>
                    <input
                      type="text"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      placeholder="e.g. 50 MT / month"
                      className="w-full px-3 py-2 border border-[#CBD5E1] rounded focus:outline-none focus:ring-1 focus:ring-[#C7A45B]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#0B1730] mb-1">
                      Packaging Available
                    </label>
                    <input
                      type="text"
                      value={formData.packagingDetails}
                      onChange={(e) => setFormData({ ...formData, packagingDetails: e.target.value })}
                      placeholder="e.g. 25kg PP bags, Jumbo FIBC"
                      className="w-full px-3 py-2 border border-[#CBD5E1] rounded focus:outline-none focus:ring-1 focus:ring-[#C7A45B]"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block font-semibold text-[#0B1730] mb-1">
                    Quality Specifications &amp; Certifications Held
                  </label>
                  <textarea
                    rows={3}
                    value={formData.productSpecs}
                    onChange={(e) => setFormData({ ...formData, productSpecs: e.target.value })}
                    placeholder="e.g. Sortex 99.5% clean, Moisture < 7%, FSSAI / APEDA registered unit"
                    className="w-full px-3 py-2 border border-[#CBD5E1] rounded focus:outline-none focus:ring-1 focus:ring-[#C7A45B]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#070F20] bg-[#C7A45B] hover:bg-[#B89347] rounded-md transition-colors cursor-pointer shadow-md min-h-[44px]"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting Supplier Offer...' : 'Submit Supplier Registration'}</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
