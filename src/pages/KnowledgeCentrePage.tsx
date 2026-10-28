import React, { useState } from 'react';
import { BookOpen, Search, ArrowRight, Clock, Tag, Share2, FileText, ChevronRight } from 'lucide-react';
import { Link, useRouter } from '../context/RouterContext';
import { useEnquiry } from '../context/EnquiryContext';

export interface Article {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  excerpt: string;
  content: string[];
  tableOfContents: string[];
}

export const KNOWLEDGE_ARTICLES: Article[] = [
  {
    slug: 'jaggery-export-standards-hs-code-17-organic-sweeteners',
    title: 'Indian Jaggery Export Standards: HS Code Chapter 17, Moisture Thresholds & Zero-Chemical Processing',
    category: 'Jaggery Specifications & Compliance',
    readTime: '6 min read',
    date: 'October 2026',
    author: 'NEXARIS Agro Division',
    excerpt: 'Comprehensive B2B guide to export specifications for organic jaggery powder, portioned cubes, traditional blocks, and liquid syrup under HS Code Chapter 17.',
    tableOfContents: [
      'Understanding HS Codes: 17011410, 17011420 & 17029090',
      'Moisture Control (≤ 2.0% for Powder) & Microbial Stability',
      'Zero-Chemical Clarification vs. Sodium Hydrosulphite Bleaching',
      'Packaging Standards for Ocean Container Shipments',
    ],
    content: [
      'Exporting Indian jaggery (cane gur) demands strict adherence to moisture thresholds to ensure shelf stability during long ocean voyages. For Organic Jaggery Powder (HS Code 17011420), a moisture level at or below 2.0% prevents clumping and microbiological degradation, making it suitable for international retail shelves and industrial bakery formulations.',
      'Unlike conventional domestic jaggery bleached using sodium hydrosulphite (hydrose), export-grade jaggery from NEXARIS is 100% sulphur-free, relying exclusively on organic clarification agents such as herbal extracts to achieve a natural golden hue without toxic chemical residues.',
      'For portioned Jaggery Cubes (HS Code 17011410) and Traditional Blocks, moisture is maintained below 5.0% and 7.0% respectively, with Brix values exceeding 85°. In liquid jaggery syrup (Kakvi, HS Code 17029090), high concentration (Brix 75°–80°) ensures natural osmotic preservation without synthetic preservatives.',
    ],
  },
  {
    slug: 'fob-mundra-vs-cif-destination-shipping-terms',
    title: 'Export Shipping Logistics: FOB Mundra Port vs. CIF Destination Freight Protocols',
    category: 'International Trade Logistics',
    readTime: '5 min read',
    date: 'October 2026',
    author: 'NEXARIS Logistics & Trade Desk',
    excerpt: 'Comparing Incoterms 2020 for B2B natural sweetener container shipments departing Western Indian gateways: Container stuffing, customs clearance, and BL dispatch.',
    tableOfContents: [
      'Mundra Port & Kandla Port Gateway Advantages',
      'FOB Mundra/Kandla Responsibilities & Documentation',
      'CIF Destination Port Quotes & Freight Booking',
      'Container Allocation & FCL Transit Schedules',
    ],
    content: [
      'Mundra Port in Kutch, Gujarat, stands as India’s premier commercial container port, offering mechanized container handling, food-grade storage facilities, and direct mainline vessel connectivity to Europe, the Middle East, Southeast Asia, and the Americas.',
      'Under FOB (Free On Board) Mundra terms, NEXARIS coordinates harvest aggregation, secondary screening, moisture-barrier packaging, stuffing into 20ft or 40ft FCL containers, Indian customs clearance, and loading onto the ocean vessel. The buyer handles ocean freight booking and marine insurance.',
      'Under CIF (Cost, Insurance & Freight) terms, NEXARIS manages ocean transport booking, marine insurance coverage, and provides guaranteed bill of lading (BL) tracking directly to your designated port of discharge.',
    ],
  },
  {
    slug: 'jaggery-powder-vs-refined-sugar-industrial-applications',
    title: 'Technical Comparison: Free-Flowing Jaggery Powder vs. Refined White Sugar in Commercial Food Processing',
    category: 'Food Processing Applications',
    readTime: '7 min read',
    date: 'October 2026',
    author: 'NEXARIS Technical Sourcing Desk',
    excerpt: 'Nutritional profile, mineral retention (Iron, Magnesium, Potassium), caramelization properties, and moisture considerations when replacing refined sugar with unrefined cane powder.',
    tableOfContents: [
      'Nutritional & Mineral Retention vs White Sugar',
      'Baking & Confectionery Caramelization Temperatures',
      'Solubility & Granulometry (40/60/80 Mesh)',
      'Clean-Label Regulatory Positioning',
    ],
    content: [
      'Unlike refined white sugar (which undergoes extensive chemical bleaching and bone char/chemical crystallization leaving 99.9% pure sucrose with zero micronutrients), unrefined organic jaggery powder retains naturally occurring sugarcane minerals including iron (10-15 mg/100g), magnesium (70-90 mg/100g), potassium (1000+ mg/100g), and trace calcium.',
      'In commercial baking, jaggery powder caramelizes at slightly lower temperatures than sucrose due to trace reducing sugars, providing a rich golden crust and deep molasses-toffee aroma. Our 40/60/80 mesh grading ensures rapid dissolution in continuous industrial dough mixing and beverage preparation.',
      'For global clean-label food brands, export-grade sulphur-free jaggery qualifies as a minimally processed, non-centrifugal whole cane sweetener, meeting clean-label ingredient standards in Europe, North America, and the GCC.',
    ],
  },
];

export function KnowledgeCentrePage() {
  const { path } = useRouter();
  const { openEnquiryModal } = useEnquiry();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const cleanPath = path.split('?')[0].replace(/\/+$/, '') || '/';
  const articleSlug = cleanPath.startsWith('/knowledge/') ? cleanPath.replace('/knowledge/', '') : null;
  const currentArticle = articleSlug ? KNOWLEDGE_ARTICLES.find((a) => a.slug === articleSlug) : null;

  const categories = ['All', 'Jaggery Specifications & Compliance', 'International Trade Logistics', 'Food Processing Applications'];

  const filteredArticles = KNOWLEDGE_ARTICLES.filter((art) => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Render Article Detail Page
  if (currentArticle) {
    return (
      <div className="bg-[#F8FAFC] text-[#0B1730] py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <Link
            href="/knowledge"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1730] hover:text-[#C7A45B]"
          >
            <span>← Back to Knowledge Centre</span>
          </Link>

          <div className="space-y-4 bg-white p-6 sm:p-10 rounded-xl border border-[#E2E8F0] shadow-xs">
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748B]">
              <span className="font-bold text-[#C7A45B] uppercase">{currentArticle.category}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {currentArticle.readTime}</span>
              <span>·</span>
              <span>{currentArticle.date}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight">
              {currentArticle.title}
            </h1>

            <p className="text-xs text-[#64748B] font-mono border-l-2 border-[#C7A45B] pl-3 py-0.5">
              Authored by {currentArticle.author}
            </p>

            {/* Table of Contents */}
            <div className="p-4 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] space-y-2 text-xs">
              <div className="font-bold text-[#0B1730] uppercase text-[11px] tracking-wider">
                Table of Contents
              </div>
              <ul className="space-y-1 text-[#64748B]">
                {currentArticle.tableOfContents.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-[#C7A45B]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Content Paragraphs */}
            <div className="space-y-4 text-sm text-[#334155] leading-relaxed pt-4 border-t border-[#E2E8F0]">
              {currentArticle.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Trade CTA Box */}
            <div className="mt-8 p-6 rounded-xl bg-[#070F20] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-base font-bold font-display text-white">
                  Have Specific Quality or Container Allocation Questions?
                </h3>
                <p className="text-xs text-[#94A3B8]">
                  Connect with NEXARIS trade desk for FOB/CIF pricing and lab testing reports.
                </p>
              </div>
              <button
                type="button"
                onClick={() => openEnquiryModal()}
                className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#070F20] bg-[#C7A45B] hover:bg-[#B89347] rounded transition-colors shrink-0 cursor-pointer"
              >
                Request Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Knowledge Centre Listing
  return (
    <div className="bg-[#F8FAFC] text-[#0B1730]">
      {/* Header */}
      <section className="bg-[#070F20] text-white py-16 lg:py-20 border-b border-[#162444]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs font-bold uppercase tracking-widest text-[#C7A45B]">
            INTERNATIONAL COMMODITY TRADE &amp; SPECIFICATIONS
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight">
            NEXARIS Trade Knowledge Centre
          </h1>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl leading-relaxed">
            Technical guides, quality specifications, FSSAI/APEDA standards, and export shipping protocols for international B2B buyers and suppliers.
          </p>
        </div>
      </section>

      {/* Main Directory & Filter Bar */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-xs">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0B1730] text-white'
                    : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search trade guides..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-[#CBD5E1] rounded focus:outline-none focus:ring-1 focus:ring-[#C7A45B]"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <div
              key={art.slug}
              className="bg-white rounded-xl border border-[#E2E8F0] p-6 hover:border-[#C7A45B] transition-colors flex flex-col justify-between space-y-4 shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                  <span className="font-bold text-[#C7A45B] uppercase">{art.category}</span>
                  <span>{art.readTime}</span>
                </div>

                <h2 className="text-lg font-bold font-display text-[#0B1730] leading-snug">
                  {art.title}
                </h2>

                <p className="text-xs text-[#64748B] leading-relaxed line-clamp-3">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs">
                <span className="text-[#94A3B8]">{art.date}</span>
                <Link
                  href={`/knowledge/${art.slug}`}
                  className="font-bold text-[#0B1730] hover:text-[#C7A45B] inline-flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
