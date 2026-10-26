import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Filter,
  DollarSign,
  MapPin,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Edit2,
  Trash2,
  X,
  FileText,
} from 'lucide-react';
import { ContactItem } from './CrmContactsTab';

export interface OpportunityItem {
  id: string;
  contact_id: string;
  title: string;
  commodity_division: string;
  product_name: string;
  quantity: string;
  quantity_unit: string;
  target_price: number | null;
  currency: string;
  incoterm: string;
  destination_port: string;
  stage: string;
  estimated_value: number | null;
  notes: string;
  created_at: string;
  updated_at: string;
  contact_name?: string;
  contact_company?: string;
}

const STAGES = [
  { key: 'inquiry', label: 'Inquiry Received', color: 'bg-slate-100 text-slate-700 border-slate-200' },
  { key: 'spec_review', label: 'Spec Review / Lab', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { key: 'quotation_sent', label: 'Quotation Sent', color: 'bg-amber-50 text-amber-800 border-amber-200' },
  { key: 'negotiation', label: 'Negotiation', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { key: 'contract_issued', label: 'Contract / Proforma', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { key: 'closed_won', label: 'Closed Won (Trade)', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  { key: 'closed_lost', label: 'Closed Lost', color: 'bg-red-50 text-red-700 border-red-200' },
];

interface CrmOpportunitiesTabProps {
  opportunities: OpportunityItem[];
  contacts: ContactItem[];
  isLoading: boolean;
  onRefresh: () => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
}

export function CrmOpportunitiesTab({
  opportunities,
  contacts,
  isLoading,
  onRefresh,
  isCreateModalOpen,
  setIsCreateModalOpen,
}: CrmOpportunitiesTabProps) {
  const [divisionFilter, setDivisionFilter] = useState('all');
  const [stageFilter, setStageFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'pipeline' | 'table'>('pipeline');

  const [editingOpp, setEditingOpp] = useState<OpportunityItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    contactId: '',
    title: '',
    commodityDivision: 'spices',
    productName: '',
    quantity: '',
    quantityUnit: 'MT',
    targetPrice: '',
    currency: 'USD',
    incoterm: 'FOB',
    destinationPort: '',
    stage: 'inquiry',
    estimatedValue: '',
    notes: '',
  });

  const resetForm = () => {
    setFormData({
      contactId: contacts[0]?.id || '',
      title: '',
      commodityDivision: 'spices',
      productName: '',
      quantity: '',
      quantityUnit: 'MT',
      targetPrice: '',
      currency: 'USD',
      incoterm: 'FOB',
      destinationPort: '',
      stage: 'inquiry',
      estimatedValue: '',
      notes: '',
    });
    setEditingOpp(null);
    setErrorMsg('');
  };

  const handleOpenEdit = (opp: OpportunityItem) => {
    setEditingOpp(opp);
    setFormData({
      contactId: opp.contact_id,
      title: opp.title,
      commodityDivision: opp.commodity_division,
      productName: opp.product_name,
      quantity: opp.quantity || '',
      quantityUnit: opp.quantity_unit || 'MT',
      targetPrice: opp.target_price !== null ? String(opp.target_price) : '',
      currency: opp.currency || 'USD',
      incoterm: opp.incoterm || 'FOB',
      destinationPort: opp.destination_port || '',
      stage: opp.stage,
      estimatedValue: opp.estimated_value !== null ? String(opp.estimated_value) : '',
      notes: opp.notes || '',
    });
    setIsCreateModalOpen(true);
  };

  const handleSaveOpp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.contactId) {
      setErrorMsg('Please select or register a counterparty.');
      return;
    }
    if (!formData.title.trim() || !formData.productName.trim()) {
      setErrorMsg('Deal title and commodity product name are required.');
      return;
    }

    setIsSubmitting(true);

    try {
      const url = editingOpp
        ? `/api/crm/opportunities/${editingOpp.id}`
        : '/api/crm/opportunities';
      const method = editingOpp ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save deal.');
      }

      setIsCreateModalOpen(false);
      resetForm();
      onRefresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickStageChange = async (oppId: string, newStage: string) => {
    try {
      const res = await fetch(`/api/crm/opportunities/${oppId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: newStage }),
      });
      if (!res.ok) throw new Error('Failed to update stage');
      onRefresh();
    } catch (err) {
      alert('Could not update deal stage.');
    }
  };

  const handleDeleteOpp = async (id: string, title: string) => {
    if (!window.confirm(`Delete opportunity "${title}"?`)) return;
    try {
      const res = await fetch(`/api/crm/opportunities/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete deal');
      onRefresh();
    } catch (err) {
      alert('Failed to delete deal');
    }
  };

  // Filter deals
  const filteredOpps = opportunities.filter((o) => {
    if (divisionFilter !== 'all' && o.commodity_division !== divisionFilter) return false;
    if (stageFilter !== 'all' && o.stage !== stageFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#DCE2E8]">
        <div>
          <h2 className="text-xl font-bold text-[#0B1730] font-display">
            Commodity Opportunities Pipeline
          </h2>
          <p className="text-xs text-[#64748B]">
            Track commercial deals from inquiry, specification review, and proforma contract to settlement.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="inline-flex rounded-md border border-[#DCE2E8] p-0.5 bg-white">
            <button
              onClick={() => setViewMode('pipeline')}
              className={`px-3 py-1.5 text-xs font-semibold rounded ${
                viewMode === 'pipeline' ? 'bg-[#0B1730] text-white' : 'text-[#64748B] hover:text-[#0B1730]'
              }`}
            >
              Stage Board
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 text-xs font-semibold rounded ${
                viewMode === 'table' ? 'bg-[#0B1730] text-white' : 'text-[#64748B] hover:text-[#0B1730]'
              }`}
            >
              Table View
            </button>
          </div>

          <button
            onClick={() => {
              resetForm();
              setIsCreateModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#0B1730] hover:bg-[#183653] text-white text-xs font-semibold rounded-md shadow transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-[#C7A45B]" />
            <span>Create Opportunity</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-[#DCE2E8] shadow-sm flex flex-wrap gap-3 items-center justify-between text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-[#0B1730] flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#C7A45B]" />
            <span>Commodity Division:</span>
          </span>
          <select
            value={divisionFilter}
            onChange={(e) => setDivisionFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-[#F5F7FA] border border-[#DCE2E8] rounded text-[#0B1730] focus:ring-1 focus:ring-[#0B1730] focus:outline-none"
          >
            <option value="all">All Divisions</option>
            <option value="spices">Spices Division</option>
            <option value="oilseeds">Oilseeds Division</option>
            <option value="jaggery">Jaggery Division</option>
            <option value="other">Other Commodities</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#0B1730]">Stage Filter:</span>
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-[#F5F7FA] border border-[#DCE2E8] rounded text-[#0B1730] focus:ring-1 focus:ring-[#0B1730] focus:outline-none"
          >
            <option value="all">All Stages ({opportunities.length})</option>
            {STAGES.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pipeline View (Board) */}
      {viewMode === 'pipeline' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
          {STAGES.filter((s) => stageFilter === 'all' || s.key === stageFilter).map((stage) => {
            const stageOpps = filteredOpps.filter((o) => o.stage === stage.key);

            return (
              <div
                key={stage.key}
                className="bg-[#F8FAFC] rounded-xl border border-[#DCE2E8] flex flex-col min-h-[400px] shadow-xs"
              >
                {/* Column Header */}
                <div className="p-3.5 border-b border-[#DCE2E8] bg-white rounded-t-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0B1730] font-display">
                    {stage.label}
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#F1F4F7] text-[#64748B] tabular-nums">
                    {stageOpps.length}
                  </span>
                </div>

                {/* Column Cards */}
                <div className="p-3 space-y-3 flex-1 overflow-y-auto max-h-[70vh]">
                  {stageOpps.length === 0 ? (
                    <div className="py-10 text-center text-[11px] text-[#94A3B8]">
                      No deals in this stage
                    </div>
                  ) : (
                    stageOpps.map((opp) => (
                      <div
                        key={opp.id}
                        className="bg-white p-3.5 rounded-lg border border-[#DCE2E8] shadow-xs hover:border-[#C7A45B] transition-all space-y-2 text-xs"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-bold text-[#0B1730] leading-snug">
                            {opp.title}
                          </span>
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase bg-[#F1F4F7] text-[#64748B] shrink-0">
                            {opp.commodity_division === 'jaggery' ? 'Jaggery' : opp.commodity_division === 'aluminium_scrap' ? 'Jaggery' : 'Agri'}
                          </span>
                        </div>

                        {opp.contact_name && (
                          <div className="text-[11px] text-[#64748B]">
                            Counterparty: <strong className="text-[#0B1730]">{opp.contact_name}</strong>
                            {opp.contact_company ? ` (${opp.contact_company})` : ''}
                          </div>
                        )}

                        <div className="pt-2 border-t border-[#F1F4F7] grid grid-cols-2 gap-1 text-[11px]">
                          <div>
                            <span className="text-[#64748B]">Volume: </span>
                            <span className="font-semibold text-[#0B1730]">
                              {opp.quantity ? `${opp.quantity} ${opp.quantity_unit}` : 'TBD'}
                            </span>
                          </div>
                          <div>
                            <span className="text-[#64748B]">Incoterm: </span>
                            <span className="font-semibold text-[#0B1730]">
                              {opp.incoterm || 'FOB'} {opp.destination_port ? `(${opp.destination_port})` : ''}
                            </span>
                          </div>
                        </div>

                        {opp.estimated_value && (
                          <div className="text-[11px] font-semibold text-[#C7A45B]">
                            Est. Value: {opp.currency} {opp.estimated_value.toLocaleString()}
                          </div>
                        )}

                        {/* Stage Mover Selector */}
                        <div className="pt-2 flex items-center justify-between gap-1 border-t border-[#F1F4F7]">
                          <select
                            value={opp.stage}
                            onChange={(e) => handleQuickStageChange(opp.id, e.target.value)}
                            className="text-[11px] py-1 px-1.5 bg-[#F5F7FA] border border-[#DCE2E8] rounded text-[#0B1730] focus:outline-none"
                          >
                            {STAGES.map((s) => (
                              <option key={s.key} value={s.key}>
                                Move: {s.label}
                              </option>
                            ))}
                          </select>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleOpenEdit(opp)}
                              className="p-1 text-[#64748B] hover:text-[#0B1730]"
                              title="Edit Opportunity"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleDeleteOpp(opp.id, opp.title)}
                              className="p-1 text-[#64748B] hover:text-red-600"
                              title="Delete Opportunity"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-xl border border-[#DCE2E8] shadow-sm overflow-hidden text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F5F7FA] border-b border-[#DCE2E8] text-[#64748B] font-semibold uppercase text-[11px]">
                  <th className="py-3 px-4">Deal Title & Commodity</th>
                  <th className="py-3 px-4">Counterparty</th>
                  <th className="py-3 px-4">Volume & Terms</th>
                  <th className="py-3 px-4">Current Stage</th>
                  <th className="py-3 px-4">Target / Value</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F4F7]">
                {filteredOpps.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#64748B]">
                      No opportunities match selected filters.
                    </td>
                  </tr>
                ) : (
                  filteredOpps.map((opp) => (
                    <tr key={opp.id} className="hover:bg-[#F9FAFB]">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#0B1730]">{opp.title}</div>
                        <div className="text-[11px] text-[#64748B]">
                          Product: <span className="font-semibold">{opp.product_name}</span> ({opp.commodity_division})
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-[#0B1730] font-semibold">{opp.contact_name || 'N/A'}</div>
                        <div className="text-[11px] text-[#64748B]">{opp.contact_company}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div>{opp.quantity ? `${opp.quantity} ${opp.quantity_unit}` : 'TBD'}</div>
                        <div className="text-[11px] text-[#64748B]">
                          {opp.incoterm || 'FOB'} {opp.destination_port ? `to ${opp.destination_port}` : ''}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={opp.stage}
                          onChange={(e) => handleQuickStageChange(opp.id, e.target.value)}
                          className="text-xs py-1 px-2 border border-[#DCE2E8] rounded bg-white font-medium text-[#0B1730]"
                        >
                          {STAGES.map((s) => (
                            <option key={s.key} value={s.key}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3.5 px-4">
                        {opp.estimated_value ? (
                          <div className="font-bold text-[#0B1730]">
                            {opp.currency} {opp.estimated_value.toLocaleString()}
                          </div>
                        ) : opp.target_price ? (
                          <div className="text-[#64748B]">
                            {opp.currency} {opp.target_price} / {opp.quantity_unit}
                          </div>
                        ) : (
                          <span className="text-[#94A3B8] italic">Unset</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => handleOpenEdit(opp)}
                            className="p-1.5 text-[#64748B] hover:text-[#0B1730] hover:bg-[#F1F4F7] rounded"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteOpp(opp.id, opp.title)}
                            className="p-1.5 text-[#64748B] hover:text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create / Edit Deal Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-xl border border-[#DCE2E8] shadow-2xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F4F7]">
              <h3 className="text-base font-bold text-[#0B1730] font-display">
                {editingOpp ? 'Edit Trade Opportunity' : 'Create Trade Opportunity'}
              </h3>
              <button
                onClick={() => {
                  setIsCreateModalOpen(false);
                  resetForm();
                }}
                className="p-1 text-[#64748B] hover:text-[#0B1730] rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSaveOpp} className="space-y-4">
              <div>
                <label className="block font-semibold text-[#0B1730] mb-1">Counterparty *</label>
                <select
                  required
                  value={formData.contactId}
                  onChange={(e) => setFormData({ ...formData, contactId: e.target.value })}
                  className="w-full px-3 py-2 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none bg-white"
                >
                  <option value="" disabled>Select a counterparty</option>
                  {contacts.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.full_name} {c.company_name ? `(${c.company_name})` : ''} - {c.country_or_location || 'No location'}
                    </option>
                  ))}
                </select>
                {contacts.length === 0 && (
                  <p className="text-[11px] text-amber-700 mt-1">
                    No counterparties registered yet. Please register a contact first.
                  </p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-[#0B1730] mb-1">Deal Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. 50MT Cumin Seeds CIF Dubai"
                  className="w-full px-3 py-2 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#0B1730] mb-1">Division</label>
                  <select
                    value={formData.commodityDivision}
                    onChange={(e) => setFormData({ ...formData, commodityDivision: e.target.value })}
                    className="w-full px-3 py-2 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none bg-white"
                  >
                    <option value="spices">Spices Division</option>
                    <option value="oilseeds">Oilseeds Division</option>
                    <option value="jaggery">Jaggery (Natural Sweeteners)</option>
                    <option value="other">Other Commodities</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#0B1730] mb-1">Specific Product / Commodity *</label>
                  <input
                    type="text"
                    required
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    placeholder="e.g. Cumin Seeds Machine Clean 99%"
                    className="w-full px-3 py-2 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#0B1730] mb-1">Quantity / Lot Volume</label>
                  <input
                    type="text"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="e.g. 50, 100, 2x40ft FCL"
                    className="w-full px-3 py-2 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#0B1730] mb-1">Unit</label>
                  <select
                    value={formData.quantityUnit}
                    onChange={(e) => setFormData({ ...formData, quantityUnit: e.target.value })}
                    className="w-full px-3 py-2 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none bg-white"
                  >
                    <option value="MT">Metric Tons (MT)</option>
                    <option value="Tons">Tons</option>
                    <option value="KG">Kilograms (KG)</option>
                    <option value="Containers">Containers (FCL)</option>
                    <option value="Lbs">Pounds (Lbs)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-[#0B1730] mb-1">Incoterm</label>
                  <select
                    value={formData.incoterm}
                    onChange={(e) => setFormData({ ...formData, incoterm: e.target.value })}
                    className="w-full px-3 py-2 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none bg-white"
                  >
                    <option value="FOB">FOB (Free On Board)</option>
                    <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                    <option value="CFR">CFR (Cost & Freight)</option>
                    <option value="EXW">EXW (Ex Works)</option>
                    <option value="DAP">DAP (Delivered at Place)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#0B1730] mb-1">Destination Port / Delivery Point</label>
                  <input
                    type="text"
                    value={formData.destinationPort}
                    onChange={(e) => setFormData({ ...formData, destinationPort: e.target.value })}
                    placeholder="e.g. Jebel Ali, UAE / Mundra, India"
                    className="w-full px-3 py-2 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-[#0B1730] mb-1">Currency</label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="w-full px-3 py-2 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none bg-white"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="INR">INR (₹)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="AED">AED (د.إ)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#0B1730] mb-1">Estimated Value</label>
                  <input
                    type="number"
                    value={formData.estimatedValue}
                    onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
                    placeholder="e.g. 75000"
                    className="w-full px-3 py-2 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#0B1730] mb-1">Stage</label>
                  <select
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                    className="w-full px-3 py-2 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none bg-white"
                  >
                    {STAGES.map((s) => (
                      <option key={s.key} value={s.key}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#0B1730] mb-1">Commercial Notes & Terms</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Packing requirements, moisture limits, purity certs, LC terms..."
                  className="w-full px-3 py-2 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-[#F1F4F7] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-[#DCE2E8] text-[#64748B] hover:bg-[#F5F7FA] rounded font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || contacts.length === 0}
                  className="px-4 py-2 bg-[#0B1730] hover:bg-[#183653] text-white rounded font-semibold transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? 'Saving...' : editingOpp ? 'Update Deal' : 'Save Opportunity'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
