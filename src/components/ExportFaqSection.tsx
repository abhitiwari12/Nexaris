import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { getWhatsAppUrl } from '../config/site';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'Trade & Quotations',
    question: 'Which Incoterms do you support for international shipments?',
    answer:
      'We routinely execute orders under FOB (Free on Board) from Mundra Port or Hazira Port, Gujarat, as well as CIF (Cost, Insurance, and Freight) and CFR (Cost and Freight) to any major global discharge port designated by the buyer. EXW terms from our Gujarat warehouse facilities are also available upon request.',
  },
  {
    category: 'Trade & Quotations',
    question: 'What is your Minimum Order Quantity (MOQ)?',
    answer:
      'For agricultural commodities, spices, and oilseeds, standard commercial orders are 1x20ft FCL (Full Container Load, approx. 14–19 MT depending on commodity density) or 1x40ft FCL. For high-value whole spices (like Cardamom and Cloves) or trial shipments, LCL palletized consignments are evaluated on a case-by-case basis. For aluminium and metal scrap, our standard lot size is 1x20ft or 1x40ft FCL (approx. 20–25 MT).',
  },
  {
    category: 'Quality & Testing',
    question: 'Can buyers nominate third-party inspection agencies like SGS or Geo-Chem?',
    answer:
      'Yes, absolutely. We welcome and facilitate pre-shipment inspections by internationally accredited surveying agencies including SGS, Geo-Chem, Bureau Veritas, and Intertek. Inspection parameters, sampling methods, and surveyor fees can be detailed directly in the sales contract.',
  },
  {
    category: 'Quality & Testing',
    question: 'How do you handle sample requests prior to commercial orders?',
    answer:
      'We supply authentic representative product samples accompanied by preliminary lab test parameters. Samples are dispatched globally via priority air courier (DHL, FedEx). Genuine corporate buyers are asked to provide their courier account number or settle nominal express courier charges, which are fully credited against the subsequent commercial contract.',
  },
  {
    category: 'Logistics & Ports',
    question: 'What are your primary ports of loading in India?',
    answer:
      'Our primary maritime gateway is Mundra Port (Gujarat), India’s largest private commercial port offering direct mainline vessel connectivity to the Middle East, Europe, the Americas, and Asia. We also execute loading from Hazira Port and Kandla Port depending on shipping line schedules and ocean freight competitiveness.',
  },
  {
    category: 'Packaging & Private Labeling',
    question: 'Do you offer private labeling (OEM) and custom consumer packaging?',
    answer:
      'Yes. We offer complete private label packaging services for supermarkets, distributors, and brand owners. Options include printed stand-up zip pouches, vacuum-sealed bags, nitrogen-flushed packages, and customized master cartons with buyer barcodes, artwork, and regulatory nutrition labelling.',
  },
  {
    category: 'Payments & Banking',
    question: 'What payment terms are accepted for international trade?',
    answer:
      'Our standard international trade payment terms include Irrevocable Letter of Credit (L/C at sight) from first-class international banks, Telegraphic Transfer (T/T advance with balance against scanned Bill of Lading copy), and CAD (Cash Against Documents). Terms are mutually agreed upon during formal proforma finalization.',
  },
];

export function ExportFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const whatsappUrl = getWhatsAppUrl();

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1730]/5 text-[#0B1730] text-xs font-semibold uppercase tracking-wider border border-[#0B1730]/10">
            <HelpCircle className="w-3.5 h-3.5 text-[#C7A45B]" />
            <span>Buyer Guidance &amp; Trade FAQs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1730] font-display tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#64748B] leading-relaxed">
            Essential information regarding commercial terms, container logistics, sampling procedures, and quality certifications for international trade partners.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-[#E2E8F0] rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 bg-white hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-[#0B1730] font-display">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#0B1730]/5 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#0B1730] text-white' : 'text-[#0B1730]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 bg-[#F8FAFC]/50 border-t border-[#F1F5F9] text-xs sm:text-sm text-[#475569] leading-relaxed animate-in fade-in-50 duration-150">
                    <p>{item.answer}</p>
                    <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-[#C7A45B] uppercase tracking-wider">
                      <span>Category: {item.category}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Help Strip */}
        <div className="mt-10 p-5 rounded-xl bg-[#F1F4F7] border border-[#DCE2E8] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#0B1730] text-[#C7A45B] flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-[#0B1730]">Have a specific commodity or tender specification?</div>
              <div className="text-[#64748B]">Our Gandhinagar trade desk responds with formal proforma quotes within 24 hours.</div>
            </div>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold rounded-md transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            WhatsApp Trade Desk
          </a>
        </div>

      </div>
    </section>
  );
}
