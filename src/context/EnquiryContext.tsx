import React, { createContext, useContext, useState, useEffect } from 'react';
import { Division, Product } from '../types';

export interface BasketItem {
  id: string;
  productId: string;
  productName: string;
  division?: Division;
  subCategory?: string;
  quantity: number;
  unit: string;
  specifications?: string;
}

interface EnquiryContextType {
  isModalOpen: boolean;
  selectedProduct: Product | null;
  selectedDivision: Division | null;
  selectedSubCategory: string | null;
  enquiryIntent: 'buyer' | 'supplier';
  openEnquiryModal: (
    product?: Product,
    division?: Division,
    intent?: 'buyer' | 'supplier',
    subCategory?: string
  ) => void;
  closeEnquiryModal: () => void;

  // WhatsApp Notice
  isWhatsAppNoticeOpen: boolean;
  openWhatsAppNotice: (productName?: string) => void;
  closeWhatsAppNotice: () => void;
  whatsAppProductName: string | null;

  // Multi-Product RFQ Basket State
  basket: BasketItem[];
  addToBasket: (item: Omit<BasketItem, 'id'>) => void;
  removeFromBasket: (id: string) => void;
  updateBasketItemQuantity: (id: string, quantity: number) => void;
  clearBasket: () => void;
  isBasketDrawerOpen: boolean;
  setIsBasketDrawerOpen: (open: boolean) => void;
}

const EnquiryContext = createContext<EnquiryContextType | null>(null);

const BASKET_STORAGE_KEY = 'nexaris_rfq_basket_v1';

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedDivision, setSelectedDivision] = useState<Division | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [enquiryIntent, setEnquiryIntent] = useState<'buyer' | 'supplier'>('buyer');

  const [isWhatsAppNoticeOpen, setIsWhatsAppNoticeOpen] = useState(false);
  const [whatsAppProductName, setWhatsAppProductName] = useState<string | null>(null);

  // Basket State & LocalStorage Persistence
  const [basket, setBasket] = useState<BasketItem[]>(() => {
    try {
      const saved = localStorage.getItem(BASKET_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isBasketDrawerOpen, setIsBasketDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(basket));
    } catch (err) {
      console.error('Failed to save basket to storage', err);
    }
  }, [basket]);

  const addToBasket = (item: Omit<BasketItem, 'id'>) => {
    const id = `${item.productId}_${item.subCategory || 'default'}_${Date.now()}`;
    const newItem: BasketItem = { ...item, id };
    
    setBasket((prev) => {
      // Check if exact product & subcategory exists
      const existingIndex = prev.findIndex(
        (b) => b.productId === item.productId && b.subCategory === item.subCategory
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      }
      return [...prev, newItem];
    });

    setIsBasketDrawerOpen(true);
  };

  const removeFromBasket = (id: string) => {
    setBasket((prev) => prev.filter((item) => item.id !== id));
  };

  const updateBasketItemQuantity = (id: string, quantity: number) => {
    setBasket((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
    );
  };

  const clearBasket = () => {
    setBasket([]);
  };

  const openEnquiryModal = (
    product?: Product,
    division?: Division,
    intent?: 'buyer' | 'supplier',
    subCategory?: string
  ) => {
    setSelectedProduct(product || null);
    setSelectedDivision(division || product?.division || null);
    setSelectedSubCategory(subCategory || null);
    setEnquiryIntent(intent || 'buyer');
    setIsModalOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsModalOpen(false);
  };

  const openWhatsAppNotice = (productName?: string) => {
    setWhatsAppProductName(productName || null);
    setIsWhatsAppNoticeOpen(true);
  };

  const closeWhatsAppNotice = () => {
    setIsWhatsAppNoticeOpen(false);
    setWhatsAppProductName(null);
  };

  return (
    <EnquiryContext.Provider
      value={{
        isModalOpen,
        selectedProduct,
        selectedDivision,
        selectedSubCategory,
        enquiryIntent,
        openEnquiryModal,
        closeEnquiryModal,
        isWhatsAppNoticeOpen,
        openWhatsAppNotice,
        closeWhatsAppNotice,
        whatsAppProductName,
        basket,
        addToBasket,
        removeFromBasket,
        updateBasketItemQuantity,
        clearBasket,
        isBasketDrawerOpen,
        setIsBasketDrawerOpen,
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error('useEnquiry must be used within an EnquiryProvider');
  }
  return context;
}
