import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Ship, CheckCircle2, FileText, ChevronDown, ChevronUp, Package, HelpCircle } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
import { ALL_PRODUCTS } from '../data/products';
import { Link } from '../context/RouterContext';

export function ForBuyersPage() {
  const { openEnquiryModal, addToBasket } = useEnquiry();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const buyerFaqs = [
    {
      q: 'How does NEXARIS ensure quality and specifications match buyer requirements?',
      a: 'Every export lot undergoes 100% pre-shipment quality inspection. Agricultural commodities (spices & oilseeds) are Sortex-cleaned, moisture-tested, and certified for ASTA color, pungency (SHU), or curcumin percentage. Metals scrap lots are inspected for ISRI grade compliance and metallic yield recovery.',
    },
    {
      q: 'What shipping terms and ocean gateways do you support?',
      a: 'We primary export out of Mundra Port & Hazira Port in Gujarat, India. We offer standard international shipping terms including FOB Mundra/Hazira and CIF to destination ports worldwide.',
    },
    {
      q: 'Can I combine multiple spice varieties or oilseeds into a single container load (FCL)?',
      a: 'Yes! We support multi-commodity container loading and customized OEM private labeling, allowing buyers to consolidate different spice grades (e.g., Red Chilli Powder, Turmeric, Cumin) into a single 20ft or 40ft container.',
    },
    {
      q: 'What quality and regulatory export documentation is provided?',
      a: 'Depending on the product, we provide APEDA certificates, Spices Board CRES certificates, Phytosanitary certification, Certificate of Origin, Bill of Lading, SGS/Third-Party Inspection Reports, and FSSAI compliance documents.',
    },
  ];

  return (
    <div className="bg-[#F8FAFC] text-[#0B1730]">
      {/* Hero Banner */}
      <section className="bg-[#070F20] text-white py-16 lg:py-20 border-b border-[#162444] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#C7A45B]">
              FOR INTERNATIONAL COMMODITY BUYERS
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight leading-tight">
              Direct Sourcing from Western Indian Agricultural Belts &amp; Metal Aggregators.
            </h1>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              NEXARIS acts as your single B2B procurement partner for export-grade spices, graded oilseeds, and non-ferrous scrap. Dispatched directly through Mundra Port &amp; Hazira Port with complete quality assurance.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => openEnquiryModal(undefined, undefined, 'buyer')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#070F20] bg-[#C7A45B] hover:bg-[#B89347] rounded-md transition-colors shadow-md min-h-[44px]"
              >
                <span>Submit Buyer RFQ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/spices-oilseeds"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white border border-white/20 hover:bg-white/10 rounded-md transition-colors min-h-[44px]"
              >
                <span>Explore Catalogues</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing & Procurement Workflow */}
      <section className="py-16 lg:py-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-[#C7A45B]">
              TRANSPARENT PROCUREMENT
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-display">
              How the NEXARIS Buyer Process Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#0B1730] text-[#C7A45B] font-bold flex items-center justify-center text-sm font-mono">
                01
              </div>
              <h3 className="text-base font-bold font-display">Submit Trade Requirements</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Specify your target commodity, variety grade, required volume, packaging type, and destination port.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#0B1730] text-[#C7A45B] font-bold flex items-center justify-center text-sm font-mono">
                02
              </div>
              <h3 className="text-base font-bold font-display">Receive FOB / CIF Quote</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Our trade desk evaluates farmgate/smelter availability and provides a competitive commercial quotation within 24 hours.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#0B1730] text-[#C7A45B] font-bold flex items-center justify-center text-sm font-mono">
                03
              </div>
              <h3 className="text-base font-bold font-display">100% Lot Inspection</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Goods undergo Sortex cleaning, lab testing, and pre-loading inspection to ensure zero deviation from agreed specifications.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#0B1730] text-[#C7A45B] font-bold flex items-center justify-center text-sm font-mono">
                04
              </div>
              <h3 className="text-base font-bold font-display">Ocean Shipping &amp; Docs</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Container loading at Mundra/Hazira Port with full phytosanitary, origin, and BL documentation dispatched directly to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Buyer Commodities Grid */}
      <section className="py-16 lg:py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#C7A45B]">
                AVAILABLE COMMODITY LINES
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display mt-1">
                Select Commodities for Combined RFQ
              </h2>
            </div>
            <Link
              href="/spices-oilseeds"
              className="text-xs font-bold text-[#0B1730] hover:text-[#C7A45B] flex items-center gap-1"
            >
              <span>View Full Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_PRODUCTS.slice(0, 6).map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg border border-[#E2E8F0] overflow-hidden hover:border-[#C7A45B] transition-colors flex flex-col justify-between p-5 space-y-4"
              >
                <div className="space-y-2">
                  <div className="h-40 rounded-md overflow-hidden bg-[#09152B] relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold font-display text-[#0B1730]">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#64748B] line-clamp-2">
                    {product.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F1F5F9] flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      addToBasket({
                        productId: product.id,
                        productName: product.name,
                        division: product.division,
                        subCategory: product.subCategories?.[0],
                        quantity: 1,
                        unit: 'Containers (FCL)',
                      })
                    }
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-[#0B1730] bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded border border-[#CBD5E1] transition-colors"
                  >
                    <Package className="w-3.5 h-3.5 text-[#C7A45B]" />
                    <span>Add to RFQ Basket</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openEnquiryModal(product, undefined, 'buyer')}
                    className="px-3 py-2 text-xs font-bold text-white bg-[#0B1730] hover:bg-[#162444] rounded transition-colors"
                  >
                    Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buyer FAQs Accordion */}
      <section className="py-16 lg:py-20 bg-white border-t border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-[#C7A45B]">
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display">
              Information for International Procurement Officers
            </h2>
          </div>

          <div className="space-y-4">
            {buyerFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-lg border border-[#E2E8F0] overflow-hidden transition-colors bg-[#F8FAFC]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 font-bold text-sm text-[#0B1730] font-display flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#C7A45B] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#64748B] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs text-[#64748B] leading-relaxed border-t border-[#E2E8F0]/60 pt-3 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
