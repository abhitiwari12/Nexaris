import React, { useState } from 'react';
import { ArrowLeft, ArrowUpRight, MessageCircle, MessageSquare, Package, Check, Layers, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { ALL_PRODUCTS, SPICES_AND_OILSEEDS_PRODUCTS, JAGGERY_PRODUCTS } from '../data/products';
import { Link, useRouter } from '../context/RouterContext';
import { useEnquiry } from '../context/EnquiryContext';
import { SITE_CONFIG, getWhatsAppUrl } from '../config/site';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  product: Product;
}

export function ProductDetailPage({ product }: ProductDetailPageProps) {
  const { navigate } = useRouter();
  const { openEnquiryModal, openWhatsAppNotice } = useEnquiry();
  const [imageError, setImageError] = useState(false);

  // Active buyer option selection
  const [selectedSubCat, setSelectedSubCat] = useState<string>(
    product.subCategories && product.subCategories.length > 0 ? product.subCategories[0] : ''
  );
  const [selectedForm, setSelectedForm] = useState<string>(
    product.forms && product.forms.length > 0 ? product.forms[0] : ''
  );

  const divisionPath =
    product.division === 'spices-oilseeds' ? '/spices-oilseeds' : '/jaggery';
  const divisionName =
    product.division === 'spices-oilseeds' ? 'Spices & Oilseeds' : 'Jaggery & Natural Sweeteners';

  const categoryLabel =
    product.category === 'spices'
      ? 'Spices'
      : product.category === 'oilseeds'
      ? 'Oilseeds'
      : 'Natural Sweetener';

  // WhatsApp click handler
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    if (!SITE_CONFIG.contact.whatsappNumber) {
      e.preventDefault();
      openWhatsAppNotice(`${product.name}${selectedSubCat ? ` (${selectedSubCat})` : ''}`);
    }
  };

  const whatsappUrl = getWhatsAppUrl(
    `${product.name}${selectedSubCat ? ` - Variety: ${selectedSubCat}` : ''}`
  );

  // Related products from same division (excluding current)
  const relatedProducts = (
    product.division === 'spices-oilseeds' ? SPICES_AND_OILSEEDS_PRODUCTS : JAGGERY_PRODUCTS
  )
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="pb-24 space-y-16">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-[#DCE2E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-2 text-xs text-[#5E6D82]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#10243D] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#AEB8C4]" />
            <Link href={divisionPath} className="hover:text-[#10243D] transition-colors">
              {divisionName}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#AEB8C4]" />
            <span className="font-semibold text-[#10243D] truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Showcase Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-4/3 rounded-lg overflow-hidden border border-[#DCE2E8] bg-[#F1F4F7] relative shadow-sm">
              {!imageError ? (
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-slate-100">
                  <Layers className="w-12 h-12 text-[#183653]/40 mb-3" />
                  <span className="text-base font-bold text-[#10243D]">{product.name}</span>
                  <span className="text-xs text-[#5E6D82] mt-1">{categoryLabel}</span>
                </div>
              )}
            </div>

            <div className="p-4 bg-white rounded-lg border border-[#DCE2E8] text-xs text-[#5E6D82] flex items-center justify-between">
              <span>Trade Lot Specification Reference</span>
              <span className="font-mono text-[#10243D]">SKU: {product.id.toUpperCase()}</span>
            </div>
          </div>

          {/* Right Column: Specifications & Commercial Action */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              {/* Unboxed Metadata (Zero-Pill Discipline) */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#5E6D82] uppercase tracking-wider mb-2">
                <span>{divisionName}</span>
                <span aria-hidden="true">·</span>
                <span>{categoryLabel}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#10243D] font-display">
                {product.name}
              </h1>

              <p className="mt-3 text-base sm:text-lg text-[#344256] leading-relaxed font-medium">
                {product.shortDescription}
              </p>
            </div>

            {/* Buyer Sub-Category / Variety Selector */}
            {product.subCategories && product.subCategories.length > 0 && (
              <div className="p-4 bg-[#F8FAFC] rounded-lg border border-[#CBD5E1] space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B1730]">
                    Select Buyer Variety / Sub-Category Options:
                  </h3>
                  <span className="text-[11px] text-[#64748B] font-medium">
                    {product.subCategories.length} options available
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {product.subCategories.map((subCat) => {
                    const isSelected = selectedSubCat === subCat;
                    return (
                      <button
                        key={subCat}
                        type="button"
                        onClick={() => setSelectedSubCat(subCat)}
                        className={`px-3 py-2 text-xs font-semibold rounded-md border transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#0B1730] text-white border-[#0B1730] shadow-xs'
                            : 'bg-white text-[#1E293B] border-[#CBD5E1] hover:border-[#0B1730] hover:bg-slate-50'
                        }`}
                      >
                        <Check className={`w-3.5 h-3.5 ${isSelected ? 'opacity-100 text-[#C7A45B]' : 'opacity-0'}`} />
                        <span>{subCat}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Processing Forms Selector */}
            {product.forms && product.forms.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5E6D82]">
                  Available Processing Forms:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.forms.map((form) => {
                    const isSelected = selectedForm === form;
                    return (
                      <button
                        key={form}
                        type="button"
                        onClick={() => setSelectedForm(form)}
                        className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#1E293B] text-white border-[#1E293B]'
                            : 'bg-white text-[#334155] border-[#DCE2E8] hover:bg-[#F8FAFC]'
                        }`}
                      >
                        {form}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* In-depth Overview */}
            {product.overview && (
              <div className="text-sm text-[#344256] leading-relaxed pt-2">
                {product.overview}
              </div>
            )}

            {/* Specifications Matrix */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="border border-[#DCE2E8] rounded-lg overflow-hidden bg-white">
                <div className="px-4 py-2.5 bg-[#F1F4F7] border-b border-[#DCE2E8] text-xs font-semibold text-[#10243D]">
                  Commodity Trade Specifications
                </div>
                <div className="divide-y divide-[#F1F4F7] text-xs">
                  {product.specifications.map((spec) => (
                    <div key={spec.label} className="grid grid-cols-3 px-4 py-2.5">
                      <span className="text-[#5E6D82] font-medium">{spec.label}</span>
                      <span className="col-span-2 text-[#10243D] font-semibold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Commercial Packaging Options */}
            {product.standardPackaging && product.standardPackaging.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5E6D82]">
                  Standard Commercial Packaging
                </h3>
                <div className="flex flex-wrap gap-2 text-xs text-[#10243D]">
                  {product.standardPackaging.map((pkg) => (
                    <span
                      key={pkg}
                      className="px-3 py-1.5 bg-white border border-[#DCE2E8] rounded text-xs"
                    >
                      {pkg}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Commercial Applications */}
            {product.commercialApplications && product.commercialApplications.length > 0 && (
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5E6D82]">
                  Typical Industry Applications
                </h3>
                <ul className="space-y-1.5 text-xs text-[#344256]">
                  {product.commercialApplications.map((app) => (
                    <li key={app} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action CTAs */}
            <div className="pt-6 border-t border-[#DCE2E8] flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() =>
                  openEnquiryModal(product, product.division, 'buyer', selectedSubCat)
                }
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#10243D] hover:bg-[#183653] rounded-md transition-colors cursor-pointer shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>
                  Request Quote {selectedSubCat ? `for ${selectedSubCat}` : `for ${product.name}`}
                </span>
              </button>

              <a
                href={whatsappUrl || '#whatsapp-inquiry'}
                onClick={handleWhatsAppClick}
                target={whatsappUrl ? '_blank' : '_self'}
                rel={whatsappUrl ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold text-[#10243D] bg-white border border-[#DCE2E8] hover:bg-[#F1F4F7] rounded-md transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>

            <p className="text-[11px] text-[#5E6D82] leading-normal">
              Commercial quotations provide FOB/CIF pricing estimates, minimum dispatch volumes, and packing specifications based on your destination port.
            </p>
          </div>

        </div>
      </section>

      {/* Related Products from same division */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#DCE2E8]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#10243D] font-display">
              Related {divisionName} Commodities
            </h2>
            <Link
              href={divisionPath}
              className="text-xs font-semibold text-[#10243D] hover:text-[#183653] inline-flex items-center gap-1"
            >
              <span>View Full {divisionName} Catalogue</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
