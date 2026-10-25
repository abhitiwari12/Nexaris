import React, { useState } from 'react';
import { Link } from '../context/RouterContext';
import { ArrowRight, Globe } from 'lucide-react';

interface DivisionItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  badge: string;
}

const DIVISIONS_GALLERY: DivisionItem[] = [
  {
    id: 'div-spices',
    title: 'Spices Commodities',
    category: 'Spices & Seasonings',
    description: 'Bulk wholesale spices including Red Chilli, Cumin, Turmeric, Clove, and Black Pepper sourced from Gujarat and Rajasthan farming belts.',
    image: '/images/commodities/spices_division_banner_1792832350716.jpg',
    link: '/spices-oilseeds?category=spices',
    badge: '13 Varieties',
  },
  {
    id: 'div-oilseeds',
    title: 'Graded Oilseeds',
    category: 'Oilseeds & Feedstock',
    description: 'Cleaned and sorted Sesame Seeds, Mustard Seeds, Black Mustard, and Groundnuts for oil pressing, roasting, and food processing.',
    image: '/images/commodities/sesame_seeds.png',
    link: '/spices-oilseeds?category=oilseeds',
    badge: '4 Categories',
  },
  {
    id: 'div-aluminium',
    title: 'Aluminium Scrap',
    category: 'Industrial Non-Ferrous',
    description: 'Secondary smelting feedstock including Taint Tabor, Wire scrap, 6061 and 6063 extrusions, and rod offcuts for industrial remelting.',
    image: '/images/commodities/aluminium_division_banner_1792832351480.jpg',
    link: '/aluminium-scrap',
    badge: '6 Grades',
  },
];

interface DivisionImageGalleryProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export function DivisionImageGallery({
  className = '',
  title = 'Commodity Categories & Sourcing Catalogues',
  subtitle = 'Explore our primary wholesale commodity categories with verified specifications, direct farmgate and scrap yard procurement, and Sortex cleaning.',
}: DivisionImageGalleryProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'spices' | 'oilseeds' | 'aluminium'>('all');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const filteredItems = DIVISIONS_GALLERY.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'spices' && item.id === 'div-spices') return true;
    if (activeTab === 'oilseeds' && item.id === 'div-oilseeds') return true;
    if (activeTab === 'aluminium' && item.id === 'div-aluminium') return true;
    return false;
  });

  return (
    <section id="products" className={`py-16 sm:py-20 bg-[#F5F7FA] ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#C7A45B] mb-2">
              Visual Product Gallery
            </div>
            <h2 className="text-3xl font-bold text-[#0B1730] font-display tracking-tight">
              {title}
            </h2>
            <p className="mt-2 text-sm text-[#64748B] leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg border border-[#E2E8F0] shadow-xs overflow-x-auto no-scrollbar shrink-0 max-w-full">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-2 text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap min-h-[38px] ${
                activeTab === 'all'
                  ? 'bg-[#0B1730] text-white'
                  : 'text-[#64748B] hover:text-[#0B1730]'
              }`}
            >
              All Commodities
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('spices')}
              className={`px-3.5 py-2 text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap min-h-[38px] ${
                activeTab === 'spices'
                  ? 'bg-[#0B1730] text-white'
                  : 'text-[#64748B] hover:text-[#0B1730]'
              }`}
            >
              Spices
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('oilseeds')}
              className={`px-3.5 py-2 text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap min-h-[38px] ${
                activeTab === 'oilseeds'
                  ? 'bg-[#0B1730] text-white'
                  : 'text-[#64748B] hover:text-[#0B1730]'
              }`}
            >
              Oilseeds
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('aluminium')}
              className={`px-3.5 py-2 text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap min-h-[38px] ${
                activeTab === 'aluminium'
                  ? 'bg-[#0B1730] text-white'
                  : 'text-[#64748B] hover:text-[#0B1730]'
              }`}
            >
              Aluminium Scrap
            </button>
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-between text-[11px] text-[#C7A45B] font-semibold mb-3 px-1">
          <span>Explore Divisions</span>
          <span>Swipe horizontally →</span>
        </div>

        {/* Mobile First Horizontal Touch Gallery Grid */}
        <div className="flex md:grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-[#E2E8F0] hover:border-[#C7A45B] transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-xs group min-w-[85vw] sm:min-w-[320px] md:min-w-0 snap-start"
            >
              <div>
                {/* Image Container with Fallback */}
                <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                  {!imageErrors[item.id] ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      onError={() => setImageErrors((prev) => ({ ...prev, [item.id]: true }))}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0B1730]/10 p-6 text-center">
                      <Globe className="w-8 h-8 text-[#0B1730]/40 mb-2" />
                      <span className="text-xs font-semibold text-[#0B1730]">{item.title}</span>
                    </div>
                  )}

                  {/* Badge */}
                  <div className="absolute top-3 left-3 bg-[#0B1730]/90 backdrop-blur-md px-2.5 py-1 text-[#C7A45B] text-xs font-semibold rounded border border-white/10">
                    {item.badge}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="text-xs text-[#64748B] font-medium mb-1.5">
                    {item.category}
                  </div>
                  <h3 className="text-lg font-bold text-[#0B1730] font-display group-hover:text-[#162444] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#64748B] leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="px-5 pb-5 pt-3 border-t border-[#F5F7FA]">
                <Link
                  href={item.link}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#0B1730] bg-[#F5F7FA] hover:bg-[#0B1730] hover:text-white rounded transition-colors min-h-[40px]"
                >
                  <span>Explore Division</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
