import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import { SITE_CONFIG, getTelLink, getMailtoLink } from '../config/site';

export function ConnectedSection() {
  const { contact } = SITE_CONFIG;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: 'Spices & Whole Seeds Enquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-20 lg:py-24 bg-[#FAF8F5] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Information matching Screenshot 3 & 6 & 9 */}
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold block mb-2 font-mono">
              LET'S GET
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0A192F] tracking-tight mb-4">
              CONNECT<span className="text-[#D4AF37]">ED</span>
            </h2>

            <p className="font-serif font-bold text-lg text-[#0A192F] mb-8">
              {contact.businessName}
            </p>

            <div className="space-y-6 text-sm">
              {/* Call Us */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-[#0A192F] text-[#D4AF37] flex items-center justify-center shrink-0 shadow-xs">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Call Us
                  </span>
                  <a
                    href={getTelLink()}
                    className="font-mono text-base font-bold text-[#0A192F] hover:text-[#D4AF37] transition-colors"
                  >
                    {contact.phone}
                  </a>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Alt: {contact.altPhone}
                  </div>
                </div>
              </div>

              {/* Email Us */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-[#0A192F] text-[#D4AF37] flex items-center justify-center shrink-0 shadow-xs">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Email Us
                  </span>
                  <a
                    href={getMailtoLink('Trade Enquiry')}
                    className="font-medium text-base text-[#0A192F] hover:text-[#D4AF37] transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>

              {/* Corporate Office (City, State, Country Only as explicitly requested) */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0A192F] text-[#D4AF37] flex items-center justify-center shrink-0 shadow-xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Corporate Office
                  </span>
                  <span className="font-serif font-semibold text-base text-[#0A192F]">
                    {contact.city}, {contact.state}, {contact.country}
                  </span>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Registered Agro Processing & Export HQ
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours Note */}
            <div className="mt-10 p-4 bg-white rounded border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Commercial Desk operates Mon–Sat 09:00 to 19:00 IST. Response within 4 hours.</span>
            </div>
          </div>

          {/* Right Column: Contact & Enquiry Form matching Screenshot 3 & 6 & 9 */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-sm border border-slate-200 shadow-md">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-[#0A192F]">
                    Enquiry Dispatched Successfully
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you for contacting NEXARIS Commercial Desk. Our trade representative will review your commodity specifications and reach out promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        mobile: '',
                        subject: 'Spices & Whole Seeds Enquiry',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 bg-[#0A192F] text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#1E293B]"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Full Name or Company Representative"
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-slate-200 rounded-sm text-sm text-[#0A192F] placeholder-slate-400 focus:bg-white focus:border-[#0A192F] focus:outline-none transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="business.email@company.com"
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-slate-200 rounded-sm text-sm text-[#0A192F] placeholder-slate-400 focus:bg-white focus:border-[#0A192F] focus:outline-none transition-all"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="+91 / Country Code + Mobile or WhatsApp"
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-slate-200 rounded-sm text-sm text-[#0A192F] placeholder-slate-400 focus:bg-white focus:border-[#0A192F] focus:outline-none transition-all"
                    />
                  </div>

                  {/* Commodity / Subject */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Subject / Commodity of Interest
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-slate-200 rounded-sm text-sm text-[#0A192F] focus:bg-white focus:border-[#0A192F] focus:outline-none transition-all"
                    >
                      <option value="Spices & Whole Seeds (Cumin, Fennel, Coriander, Turmeric)">
                        Spices & Whole Seeds (Cumin, Fennel, Coriander, Turmeric)
                      </option>
                      <option value="Dal & Pulses (Toor Dal, Chana Dal, Moong, Kabuli Chana)">
                        Dal & Pulses (Toor Dal, Chana Dal, Moong, Kabuli Chana)
                      </option>
                      <option value="Dry Fruits & Nuts (Almonds, Cashews, Pistachios, Raisins)">
                        Dry Fruits & Nuts (Almonds, Cashews, Pistachios, Raisins)
                      </option>
                      <option value="Consumer Retail Pouches Distribution (Supermarkets)">
                        Consumer Retail Pouches Distribution (Supermarkets)
                      </option>
                      <option value="Bulk Export Container (FOB Mundra / CIF Global)">
                        Bulk Export Container (FOB Mundra / CIF Global)
                      </option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify required pack sizes, estimated volume, delivery city or discharge port..."
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-slate-200 rounded-sm text-sm text-[#0A192F] placeholder-slate-400 focus:bg-white focus:border-[#0A192F] focus:outline-none transition-all"
                    />
                  </div>

                  {/* Send Button matching Screenshot 3 & 6 & 9 */}
                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#0A192F] hover:bg-[#1E293B] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    >
                      {loading ? 'Transmitting...' : 'Send Enquiry'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
