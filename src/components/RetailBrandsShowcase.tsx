import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from '../context/RouterContext';
import { MASTER_SHELF_IMAGE } from '../data/arikaProducts';

export function RetailBrandsShowcase() {
  const categories = [
    {
      id: 'spices',
      title: 'Spices & Whole Seeds',
      subtitle: 'Pure Ground & Whole Aromatics',
      count: '11 Products',
      description:
        'Aromatic ground spices, whole seeds, and chef-grade spice mixes with maximum essential oil retention and zero artificial colours.',
      items: [
        'Turmeric Powder (200g)',
        'Red Chilli Powder (200g)',
        'Coriander Powder (200g)',
        'Cumin Seeds / Jeera (200g)',
        'Mustard Seeds / Rai (200g)',
        'Whole Spices / Khada Masala (100g)',
        'Black Pepper (100g)',
        'Green Cardamom (50g)',
      ],
      href: '/products?division=spices',
      spriteStyle: {
        backgroundSize: '300% 300%',
        backgroundPosition: '10% 0%',
      },
    },
    {
      id: 'pulses',
      title: 'Dal & Pulses',
      subtitle: 'Unpolished Staple Lentils',
      count: '7 Products',
      description:
        '100% unpolished, machine-cleaned wholesome staple lentils and beans offering pure plant-based protein and authentic domestic taste.',
      items: [
        'Toor Dal / Arhar (1 kg)',
        'Moong Dal Whole (1 kg)',
        'Masoor Dal Red (1 kg)',
        'Chana Dal (1 kg)',
        'Urad Dal White (1 kg)',
        'Kashmiri Rajma (1 kg)',
        'Desi Brown Chana (1 kg)',
      ],
      href: '/products?division=pulses',
      spriteStyle: {
        backgroundSize: '300% 300%',
        backgroundPosition: '15% 50%',
      },
    },
    {
      id: 'dry-fruits',
      title: 'Dry Fruits & Nuts',
      subtitle: 'Hand-Selected Premium Nuts',
      count: '5 Products',
      description:
        'Crunchy California almonds, creamy whole cashews, natural golden raisins, and rich walnut kernels sealed for lasting freshness.',
      items: [
        'California Almonds (200g)',
        'Whole Cashews W240 (200g)',
        'Golden Raisins / Kishmish (200g)',
        'Walnut Kernels / Akhrot (200g)',
        'Roasted Pistachios (200g)',
      ],
      href: '/products?division=dry-fruits',
      spriteStyle: {
        backgroundSize: '300% 300%',
        backgroundPosition: '20% 100%',
      },
    },
  ];

  return (
    <section id="categories" className="py-20 lg:py-24 bg-[#FAF8F5] border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Section Header matching Reference Screenshot */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37] block mb-2">
            OUR PRODUCT CATEGORIES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0A192F] tracking-tight">
            OUR <span className="text-[#D4AF37]">PORTFOLIO</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Directly sourced, Sortex-cleaned, and packed in multi-layer aroma barrier pouches for retail supermarkets and discerning households.
          </p>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-4" />
        </div>

        {/* 3 Premium Category Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-lg border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Category Visual Header Crop */}
              <div className="relative h-60 bg-neutral-100 overflow-hidden border-b border-slate-100">
                <div
                  className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${MASTER_SHELF_IMAGE})`,
                    backgroundSize: cat.spriteStyle.backgroundSize,
                    backgroundPosition: cat.spriteStyle.backgroundPosition,
                    backgroundRepeat: 'no-repeat',
                  }}
                  role="img"
                  aria-label={`${cat.title} Collection`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <span className="absolute top-3 right-3 font-mono text-xs font-bold text-[#0A192F] bg-white/95 px-2.5 py-1 rounded shadow-xs border border-slate-200">
                  {cat.count}
                </span>

                <div className="absolute bottom-3 left-4 text-white">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4AF37] font-semibold block">
                    {cat.subtitle}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-white">
                    {cat.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {cat.description}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Popular Pack Varieties:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-700">
                      {cat.items.slice(0, 6).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 truncate">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Direct Action Link to Catalogue */}
                <div className="pt-4 border-t border-slate-100">
                  <Link
                    href={cat.href}
                    className="w-full py-3 px-4 bg-[#0A192F] hover:bg-[#1E293B] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-between shadow-xs group-hover:bg-[#D4AF37] group-hover:text-[#0A192F]"
                  >
                    <span>Explore {cat.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Action Bar */}
        <div className="mt-14 p-6 bg-white rounded-lg border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="text-center sm:text-left">
            <h4 className="font-serif font-bold text-base text-[#0A192F]">
              Looking for the full shelf-ready packaged collection?
            </h4>
            <p className="text-xs text-slate-600">
              Browse all 23 ARIKA by NEXARIS consumer stand-up pouches and unpolished pulses with complete nutrition information.
            </p>
          </div>

          <Link
            href="/products"
            className="px-6 py-3 bg-[#D4AF37] hover:bg-[#C5A059] text-[#0A192F] font-bold text-xs uppercase tracking-wider rounded transition-all shadow-sm shrink-0 flex items-center gap-2"
          >
            <span>View All 23 Products</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
