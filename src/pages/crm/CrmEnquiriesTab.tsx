import React, { useState } from 'react';
import {
  Inbox,
  CheckCircle2,
  Archive,
  MessageSquare,
  Mail,
  MapPin,
  Calendar,
  ExternalLink,
  Search,
  Building,
} from 'lucide-react';

export interface EnquiryItem {
  id: string;
  reference_number: string;
  full_name: string;
  company_name: string;
  business_email: string;
  phone_or_whatsapp: string;
  buyer_location: string;
  product_name: string;
  division: string;
  required_quantity: string;
  additional_requirements: string;
  status: string; // 'unread', 'converted', 'archived'
  contact_id: string | null;
  opportunity_id: string | null;
  created_at: string;
  contact_name?: string;
  deal_title?: string;
}

interface CrmEnquiriesTabProps {
  enquiries: EnquiryItem[];
  isLoading: boolean;
  onRefresh: () => void;
  onNavigateTab: (tab: string) => void;
}

export function CrmEnquiriesTab({
  enquiries,
  isLoading,
  onRefresh,
  onNavigateTab,
}: CrmEnquiriesTabProps) {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/crm/enquiries/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      onRefresh();
    } catch (err) {
      alert('Could not update enquiry status');
    }
  };

  const filteredEnquiries = enquiries.filter((enq) => {
    if (filterStatus !== 'all' && enq.status !== filterStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchRef = enq.reference_number.toLowerCase().includes(q);
      const matchName = enq.full_name.toLowerCase().includes(q);
      const matchCompany = enq.company_name?.toLowerCase().includes(q);
      const matchProduct = enq.product_name.toLowerCase().includes(q);
      const matchLocation = enq.buyer_location.toLowerCase().includes(q);
      if (!matchRef && !matchName && !matchCompany && !matchProduct && !matchLocation) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#DCE2E8]">
        <div>
          <h2 className="text-xl font-bold text-[#0B1730] font-display">
            Inbound Website Quotation Feed
          </h2>
          <p className="text-xs text-[#64748B]">
            Real-time feed of commercial enquiries submitted through the public NEXARIS catalogue and contact desk.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#C7A45B]/15 text-[#927129] border border-[#C7A45B]/30">
            {enquiries.filter((e) => e.status === 'unread').length} Unread Enquiries
          </span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-3.5 rounded-xl border border-[#DCE2E8] shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ref number, buyer, company, product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-[#F5F7FA] border border-[#DCE2E8] rounded text-[#0B1730] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded font-semibold transition-colors ${
              filterStatus === 'all'
                ? 'bg-[#0B1730] text-white'
                : 'bg-[#F5F7FA] text-[#64748B] hover:text-[#0B1730]'
            }`}
          >
            All ({enquiries.length})
          </button>
          <button
            onClick={() => setFilterStatus('unread')}
            className={`px-3 py-1.5 rounded font-semibold transition-colors ${
              filterStatus === 'unread'
                ? 'bg-[#0B1730] text-white'
                : 'bg-[#F5F7FA] text-[#64748B] hover:text-[#0B1730]'
            }`}
          >
            Unread ({enquiries.filter((e) => e.status === 'unread').length})
          </button>
          <button
            onClick={() => setFilterStatus('converted')}
            className={`px-3 py-1.5 rounded font-semibold transition-colors ${
              filterStatus === 'converted'
                ? 'bg-[#0B1730] text-white'
                : 'bg-[#F5F7FA] text-[#64748B] hover:text-[#0B1730]'
            }`}
          >
            Converted ({enquiries.filter((e) => e.status === 'converted').length})
          </button>
        </div>
      </div>

      {/* Enquiries Feed */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="py-16 text-center text-xs text-[#64748B] bg-white rounded-xl border border-[#DCE2E8]">
            Loading inbound feed...
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="py-16 text-center space-y-2 bg-white rounded-xl border border-[#DCE2E8]">
            <Inbox className="w-8 h-8 text-[#64748B] mx-auto opacity-50" />
            <p className="text-sm font-semibold text-[#0B1730]">No enquiries in this view</p>
            <p className="text-xs text-[#64748B]">
              When prospective buyers submit quotation forms on the website, they will appear here instantly.
            </p>
          </div>
        ) : (
          filteredEnquiries.map((enq) => {
            const rawPhone = (enq.phone_or_whatsapp || '').replace(/[^0-9]/g, '');
            const whatsappLink = rawPhone
              ? `https://wa.me/${rawPhone}?text=${encodeURIComponent(
                  `Hello ${enq.full_name}, thank you for your enquiry regarding ${enq.product_name} (Ref: ${enq.reference_number}) with NEXARIS.`
                )}`
              : null;

            return (
              <div
                key={enq.id}
                className={`p-5 bg-white rounded-xl border transition-all ${
                  enq.status === 'unread'
                    ? 'border-[#C7A45B]/60 shadow-sm'
                    : 'border-[#DCE2E8] opacity-90'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-3 border-b border-[#F1F4F7]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-[#0B1730]">
                        {enq.reference_number}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          enq.status === 'unread'
                            ? 'bg-[#C7A45B]/20 text-[#927129]'
                            : enq.status === 'converted'
                            ? 'bg-emerald-50 text-emerald-800'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {enq.status}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded uppercase bg-[#F1F4F7] text-[#64748B]">
                        {enq.division === 'jaggery'
                          ? 'Jaggery Sweeteners'
                          : enq.division === 'aluminium-scrap' || enq.division === 'aluminium_scrap'
                          ? 'Jaggery Sweeteners'
                          : 'Spices & Oilseeds'}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-[#0B1730] flex items-center gap-2">
                      <span>{enq.full_name}</span>
                      {enq.company_name && (
                        <>
                          <span className="text-[#64748B]">·</span>
                          <span className="text-[#64748B] font-normal flex items-center gap-1">
                            <Building className="w-3 h-3" />
                            {enq.company_name}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[11px] text-[#64748B] flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(enq.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Enquiry Details Grid */}
                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-[#F5F7FA] rounded-md space-y-1">
                    <span className="text-[11px] font-semibold text-[#64748B] uppercase">Commodity Requested</span>
                    <p className="font-bold text-[#0B1730]">{enq.product_name}</p>
                    <p className="text-[#64748B]">Estimated Volume: <strong className="text-[#0B1730]">{enq.required_quantity}</strong></p>
                  </div>

                  <div className="p-3 bg-[#F5F7FA] rounded-md space-y-1">
                    <span className="text-[11px] font-semibold text-[#64748B] uppercase">Destination / Port</span>
                    <p className="font-bold text-[#0B1730] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C7A45B]" />
                      {enq.buyer_location}
                    </p>
                    <p className="text-[#64748B]">Delivery terms requested</p>
                  </div>

                  <div className="p-3 bg-[#F5F7FA] rounded-md space-y-1">
                    <span className="text-[11px] font-semibold text-[#64748B] uppercase">Counterparty Channels</span>
                    <p className="text-[#0B1730] flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-[#64748B]" />
                      <a href={`mailto:${enq.business_email}`} className="hover:underline">
                        {enq.business_email}
                      </a>
                    </p>
                    {enq.phone_or_whatsapp && (
                      <p className="text-[#0B1730]">Tel: {enq.phone_or_whatsapp}</p>
                    )}
                  </div>
                </div>

                {/* Additional notes */}
                {enq.additional_requirements && (
                  <div className="mt-3 p-3 bg-white border border-[#DCE2E8] rounded-md text-xs text-[#0B1730]">
                    <span className="font-semibold text-[#64748B]">Buyer Specifications & Notes: </span>
                    {enq.additional_requirements}
                  </div>
                )}

                {/* Actions Bar */}
                <div className="mt-4 pt-3 border-t border-[#F1F4F7] flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    {whatsappLink && (
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded font-semibold transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Reply on WhatsApp</span>
                      </a>
                    )}
                    <a
                      href={`mailto:${enq.business_email}?subject=${encodeURIComponent(
                        `NEXARIS Quotation Request — Ref: ${enq.reference_number}`
                      )}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#F5F7FA] text-[#0B1730] border border-[#DCE2E8] rounded font-semibold transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#0B1730]" />
                      <span>Email Quotation</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    {enq.status === 'unread' && (
                      <button
                        onClick={() => handleUpdateStatus(enq.id, 'converted')}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#0B1730] hover:bg-[#183653] text-white rounded font-semibold transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A45B]" />
                        <span>Mark Converted / Reviewed</span>
                      </button>
                    )}
                    {enq.status !== 'archived' && (
                      <button
                        onClick={() => handleUpdateStatus(enq.id, 'archived')}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-[#64748B] hover:text-[#0B1730] hover:bg-[#F1F4F7] rounded transition-colors"
                      >
                        <Archive className="w-3.5 h-3.5" />
                        <span>Archive</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
