import React, { useState } from 'react';
import { ArrowUpRight, MessageSquare, Layers } from 'lucide-react';
import { Product } from '../types';
import { Link } from '../context/RouterContext';
import { useEnquiry } from '../context/EnquiryContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { openEnquiryModal } = useEnquiry();
  const [imageError, setImageError] = useState(false);

  const detailPath =
    product.division === 'spices-oilseeds'
      ? `/spices-oilseeds/${product.slug}`
      : `/aluminium-scrap/${product.slug}`;

  // Division clean label (unboxed metadata text)
  const categoryLabel =
    product.category === 'spices'
      ? 'Spices'
      : product.category === 'oilseeds'
      ? 'Oilseeds'
      : 'Aluminium Scrap';

  return (
    <article className="group bg-white rounded-lg border border-[#E2E8F0] hover:border-[#C7A45B] transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-xs">
      <div>
        {/* Product Image Slot with zero-broken-image fallback */}
        <Link href={detailPath} className="block relative aspect-4/3 overflow-hidden bg-[#F5F7FA]">
          {!imageError ? (
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300 ease-out"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0B1730]/5 to-[#0B1730]/15 p-6 text-center">
              <Layers className="w-10 h-10 text-[#0B1730]/40 mb-2" />
              <span className="text-xs font-semibold text-[#0B1730]">{product.name}</span>
              <span className="text-[11px] text-[#64748B] mt-0.5">{categoryLabel}</span>
            </div>
          )}
        </Link>

        {/* Card Body */}
        <div className="p-5">
          {/* Unboxed metadata with typographic dot separator (Strict Zero-Pill Rule) */}
          <div className="flex items-center gap-1.5 text-xs text-[#64748B] mb-2 font-medium">
            <span>{categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>B2B Wholesale</span>
          </div>

          <h3 className="text-base font-bold text-[#0B1730] font-display group-hover:text-[#162444] transition-colors leading-snug">
            <Link href={detailPath}>{product.name}</Link>
          </h3>

          <p className="mt-2 text-sm text-[#334155] leading-relaxed line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Sub-categories / Varieties Options for Buyer */}
          {product.subCategories && product.subCategories.length > 0 && (
            <div className="mt-3 pt-3 border-t border-[#F1F5F9]">
              <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block mb-1.5">
                Buyer Varieties &amp; Options:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.subCategories.map((subCat) => (
                  <button
                    key={subCat}
                    type="button"
                    onClick={() => openEnquiryModal(product, product.division, 'buyer', subCat)}
                    className="px-2 py-0.5 text-[11px] font-medium text-[#0B1730] bg-[#F8FAFC] border border-[#CBD5E1] hover:bg-[#0B1730] hover:text-white rounded transition-colors cursor-pointer text-left"
                    title={`Enquire for ${subCat}`}
                  >
                    + {subCat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-5 pb-5 pt-3 border-t border-[#F5F7FA] flex items-center justify-between gap-3">
        <Link
          href={detailPath}
          className="text-xs font-semibold text-[#0B1730] hover:text-[#C7A45B] inline-flex items-center gap-1 transition-colors min-h-[36px]"
        >
          <span>View Details</span>
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>

        <button
          onClick={() => openEnquiryModal(product)}
          type="button"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#0B1730] hover:bg-[#162444] rounded transition-colors cursor-pointer min-h-[38px]"
        >
          <MessageSquare className="w-3 h-3" aria-hidden="true" />
          <span>Enquire</span>
        </button>
      </div>
    </article>
  );
}
