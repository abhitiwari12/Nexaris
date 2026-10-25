import React, { createContext, useContext, useState } from 'react';
import { Division, EnquiryFormData, Product } from '../types';

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
  isWhatsAppNoticeOpen: boolean;
  openWhatsAppNotice: (productName?: string) => void;
  closeWhatsAppNotice: () => void;
  whatsAppProductName: string | null;
}

const EnquiryContext = createContext<EnquiryContextType | null>(null);

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedDivision, setSelectedDivision] = useState<Division | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [enquiryIntent, setEnquiryIntent] = useState<'buyer' | 'supplier'>('buyer');

  const [isWhatsAppNoticeOpen, setIsWhatsAppNoticeOpen] = useState(false);
  const [whatsAppProductName, setWhatsAppProductName] = useState<string | null>(null);

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
