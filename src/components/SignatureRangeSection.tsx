import React from 'react';
import { ArrowRight, ShoppingBag, MessageSquare } from 'lucide-react';
import { Link } from '../context/RouterContext';
import { useEnquiry } from '../context/EnquiryContext';
import { MASTER_SHELF_IMAGE } from '../data/arikaProducts';

interface SignatureItem {
  number: string;
  name: string;
  categoryKicker: string;
  weightSubtitle: string;
  bgColor: string;
  textColor: string;
  accentBorder: string;
  spritePosition: string;
  spriteSize: string;
  categoryLink: string;
}

const SIGNATURE_ITEMS: SignatureItem[] = [
  {
    number: 'N° 01',
    name: 'Kashmiri',
    categoryKicker: 'POWDER SPICES',
    weightSubtitle: 'Premium Chilly Powder · 200g',
    bgColor: 'bg-[#FDF2F2]',
    textColor: 'text-[#991B1B]',
    accentBorder: 'border-red-100 hover:border-red-300',
    spritePosition: '16.66% 0%',
    spriteSize: '700% 300%',
    categoryLink: '/products?division=spices',
  },
  {
    number: 'N° 02',
    name: 'Haldi',
    categoryKicker: 'POWDER SPICES',
    weightSubtitle: 'Premium Turmeric Powder · 200g',
    bgColor: 'bg-[#FEF9C3]',
    textColor: 'text-[#854D0E]',
    accentBorder: 'border-amber-100 hover:border-amber-300',
    spritePosition: '0% 0%',
    spriteSize: '700% 300%',
    categoryLink: '/products?division=spices',
  },
  {
    number: 'N° 03',
    name: 'Garam Masala',
    categoryKicker: 'BLENDED SPICES',
    weightSubtitle: 'Royal Whole Spice Blend · 100g',
    bgColor: 'bg-[#FAF5F0]',
    textColor: 'text-[#581C87]',
    accentBorder: 'border-purple-100 hover:border-purple-300',
    spritePosition: '100% 0%',
    spriteSize: '700% 300%',
    categoryLink: '/products?division=spices',
  },
  {
    number: 'N° 04',
    name: 'Cumin (Jeera)',
    categoryKicker: 'WHOLE SPICES',
    weightSubtitle: 'Sortex-Cleaned Cumin Seeds · 200g',
    bgColor: 'bg-[#FEF3C7]',
    textColor: 'text-[#78350F]',
    accentBorder: 'border-amber-200 hover:border-amber-400',
    spritePosition: '50% 0%',
    spriteSize: '700% 300%',
    categoryLink: '/products?division=spices',
  },
  {
    number: 'N° 05',
    name: 'Toor Dal',
    categoryKicker: 'UNPOLISHED PULSES',
    weightSubtitle: 'Unpolished Yellow Arhar Dal · 1 kg',
    bgColor: 'bg-[#FFFBEB]',
    textColor: 'text-[#B45309]',
    accentBorder: 'border-amber-100 hover:border-amber-300',
    spritePosition: '0% 50%',
    spriteSize: '700% 300%',
    categoryLink: '/products?division=pulses',
  },
  {
    number: 'N° 06',
    name: 'California Almonds',
    categoryKicker: 'PREMIUM DRY FRUITS',
    weightSubtitle: 'Handpicked Crunchy Almonds · 200g',
    bgColor: 'bg-[#F7F3EE]',
    textColor: 'text-[#5C3D2E]',
    accentBorder: 'border-stone-200 hover:border-stone-400',
    spritePosition: '0% 100%',
    spriteSize: '900% 300%',
    categoryLink: '/products?division=dry-fruits',
  },
];

export function SignatureRangeSection() {
  const { openEnquiryModal } = useEnquiry();

  return (
    <section id="signature-range" className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header matching video 00:00 - 00:04 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#0A192F] tracking-tight">
              The Signature range
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
              The products NEXARIS kitchen is known for, from each corner of the range. Tap one to see its whole category, or order straight from our catalog.
            </p>
          </div>
        </div>

        {/* 6 Signature Cards in 3x2 Grid matching reference video */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SIGNATURE_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-2xl ${item.bgColor} border ${item.accentBorder} p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl group relative overflow-hidden`}
            >
              {/* Number Badge Top-Left */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-semibold tracking-wider text-slate-500 bg-white/70 px-2 py-0.5 rounded-full border border-slate-200/50 shadow-2xs">
                  {item.number}
                </span>

                <Link
                  href={item.categoryLink}
                  className="text-slate-400 group-hover:text-[#0A192F] transition-colors"
                  title="View category"
                >
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Centered Floating Pouch Pack Image */}
              <div className="relative py-4 flex items-center justify-center my-2">
                <div
                  className="w-48 sm:w-52 aspect-[3/4] transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${MASTER_SHELF_IMAGE})`,
                    backgroundSize: item.spriteSize,
                    backgroundPosition: item.spritePosition,
                    backgroundRepeat: 'no-repeat',
                    filter: 'drop-shadow(0 15px 20px rgba(0,0,0,0.15))',
                  }}
                  role="img"
                  aria-label={`${item.name} Signature Pack`}
                />
              </div>

              {/* Text Info Bottom matching Video */}
              <div className="text-center pt-4 border-t border-black/5 mt-auto">
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-slate-500 font-semibold block mb-1">
                  {item.categoryKicker}
                </span>

                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#0A192F] tracking-tight mb-1">
                  {item.name}
                </h3>

                <p className="text-xs text-slate-600 font-sans font-light">
                  {item.weightSubtitle}
                </p>

                {/* Quick Order Button on Card */}
                <div className="mt-4 pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      openEnquiryModal(
                        undefined,
                        'spices',
                        'buyer',
                        `Signature Pack Order: ${item.name} (${item.weightSubtitle})`
                      )
                    }
                    className="w-full py-2 px-3 bg-white hover:bg-[#0A192F] text-slate-800 hover:text-white text-xs font-semibold uppercase tracking-wider rounded-lg border border-slate-200 transition-colors shadow-2xs"
                  >
                    Order / Sample
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Action Strip matching reference video */}
        <div className="mt-14 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <button
              type="button"
              onClick={() => openEnquiryModal(undefined, 'spices', 'buyer', 'NEXARIS Signature Range Order')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#15803D] hover:bg-[#166534] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order now</span>
            </button>

            <Link
              href="/products"
              className="text-xs sm:text-sm font-semibold text-[#0A192F] hover:text-[#D4AF37] underline underline-offset-4 transition-colors"
            >
              See the full range →
            </Link>
          </div>

          <div className="text-xs sm:text-sm text-slate-600">
            Looking to stock NEXARIS in your retail store or supermarket?{' '}
            <button
              type="button"
              onClick={() => openEnquiryModal(undefined, 'spices', 'buyer', 'Retail Store & Supermarket Distribution')}
              className="font-bold text-[#991B1B] hover:underline"
            >
              Contact retail desk.
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
