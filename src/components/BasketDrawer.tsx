import React from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, Package } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';

export function BasketDrawer() {
  const {
    basket,
    removeFromBasket,
    updateBasketItemQuantity,
    clearBasket,
    isBasketDrawerOpen,
    setIsBasketDrawerOpen,
    openEnquiryModal,
  } = useEnquiry();

  if (!isBasketDrawerOpen) return null;

  const handleProceedToRfq = () => {
    setIsBasketDrawerOpen(false);
    openEnquiryModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#070F20]/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsBasketDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Body */}
      <div className="relative z-10 w-full max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-[#E2E8F0]">
        
        {/* Drawer Header */}
        <div className="px-5 py-4 bg-[#0B1730] text-white flex items-center justify-between border-b border-[#183653]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#C7A45B]" />
            <div>
              <h2 className="text-base font-bold font-display leading-tight">
                Trade Enquiry Basket
              </h2>
              <p className="text-[11px] text-[#94A3B8]">
                {basket.length} {basket.length === 1 ? 'Commodity' : 'Commodities'} Selected
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsBasketDrawerOpen(false)}
            className="p-1.5 text-[#94A3B8] hover:text-white hover:bg-white/10 rounded transition-colors"
            aria-label="Close basket"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Basket Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {basket.length === 0 ? (
            <div className="text-center py-16 space-y-3 text-[#64748B]">
              <Package className="w-12 h-12 mx-auto text-[#CBD5E1]" />
              <h3 className="text-sm font-bold text-[#0B1730]">Your RFQ Basket is Empty</h3>
              <p className="text-xs text-[#94A3B8] max-w-xs mx-auto">
                Browse our Spices, Oilseeds, or Natural Jaggery catalogues and click "Add to RFQ Basket" to request bulk lot quotes for multiple commodities at once.
              </p>
            </div>
          ) : (
            basket.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-3 relative group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-[#0B1730] font-display">
                      {item.productName}
                    </h4>
                    {item.subCategory && (
                      <span className="inline-block mt-0.5 text-[11px] font-semibold text-[#C7A45B] bg-[#C7A45B]/10 px-2 py-0.5 rounded border border-[#C7A45B]/20">
                        {item.subCategory}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromBasket(item.id)}
                    className="p-1 text-[#94A3B8] hover:text-red-600 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Quantity Controller */}
                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#E2E8F0]">
                  <span className="text-[#64748B]">Requested Volume:</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateBasketItemQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded bg-white border border-[#CBD5E1] text-[#0B1730] font-bold flex items-center justify-center hover:bg-[#F1F5F9]"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold text-[#0B1730]">
                      {item.quantity} {item.unit}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateBasketItemQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded bg-white border border-[#CBD5E1] text-[#0B1730] font-bold flex items-center justify-center hover:bg-[#F1F5F9]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer / Submit CTA */}
        {basket.length > 0 && (
          <div className="p-5 bg-white border-t border-[#E2E8F0] space-y-3">
            <div className="flex items-center justify-between text-xs text-[#64748B]">
              <span>Combined Items:</span>
              <span className="font-bold text-[#0B1730]">{basket.length} Commodities</span>
            </div>

            <button
              type="button"
              onClick={handleProceedToRfq}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-[#070F20] bg-[#C7A45B] hover:bg-[#B89347] rounded-md transition-colors cursor-pointer shadow-md min-h-[44px]"
            >
              <span>Submit Multi-Product RFQ</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={clearBasket}
              className="w-full text-center text-[11px] text-[#94A3B8] hover:text-[#64748B] transition-colors py-1"
            >
              Clear Basket
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
