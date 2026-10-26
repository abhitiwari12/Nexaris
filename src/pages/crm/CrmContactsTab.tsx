import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Building,
  Edit2,
  Trash2,
  X,
  ExternalLink,
  Filter,
} from 'lucide-react';

export interface ContactItem {
  id: string;
  full_name: string;
  company_name: string;
  email: string;
  phone: string;
  whatsapp: string;
  country_or_location: string;
  type: string;
  source: string;
  status: string;
  commodity_interest: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

interface CrmContactsTabProps {
  contacts: ContactItem[];
  isLoading: boolean;
  onRefresh: () => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
}

export function CrmContactsTab({
  contacts,
  isLoading,
  onRefresh,
  isCreateModalOpen,
  setIsCreateModalOpen,
}: CrmContactsTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const [editingContact, setEditingContact] = useState<ContactItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    whatsapp: '',
    countryOrLocation: '',
    type: 'buyer',
    source: 'direct',
    status: 'new',
    commodityInterest: '',
    notes: '',
  });

  const resetForm = () => {
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      whatsapp: '',
      countryOrLocation: '',
      type: 'buyer',
      source: 'direct',
      status: 'new',
      commodityInterest: '',
      notes: '',
    });
    setEditingContact(null);
    setErrorMsg('');
  };

  const handleOpenEdit = (contact: ContactItem) => {
    setEditingContact(contact);
    setFormData({
      fullName: contact.full_name,
      companyName: contact.company_name || '',
      email: contact.email || '',
      phone: contact.phone || '',
      whatsapp: contact.whatsapp || '',
      countryOrLocation: contact.country_or_location || '',
      type: contact.type || 'buyer',
      source: contact.source || 'direct',
      status: contact.status || 'new',
      commodityInterest: contact.commodity_interest || '',
      notes: contact.notes || '',
    });
    setIsCreateModalOpen(true);
  };

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim()) {
      setErrorMsg('Full name is required.');
      return;
    }

    setIsSubmitting(true);

    try {
      const url = editingContact
        ? `/api/crm/contacts/${editingContact.id}`
        : '/api/crm/contacts';
      const method = editingContact ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save contact.');
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

  const handleDeleteContact = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete contact "${name}"? Associated opportunities will also be removed.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/crm/contacts/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete contact.');
      onRefresh();
    } catch (err: any) {
      alert(err.message || 'Failed to delete contact');
    }
  };

  // Filtered contacts
  const filteredContacts = contacts.filter((c) => {
    if (typeFilter !== 'all' && c.type !== typeFilter) return false;
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = c.full_name?.toLowerCase().includes(q);
      const matchComp = c.company_name?.toLowerCase().includes(q);
      const matchEmail = c.email?.toLowerCase().includes(q);
      const matchLoc = c.country_or_location?.toLowerCase().includes(q);
      const matchNotes = c.notes?.toLowerCase().includes(q);
      if (!matchName && !matchComp && !matchEmail && !matchLoc && !matchNotes) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#DCE2E8]">
        <div>
          <h2 className="text-xl font-bold text-[#0B1730] font-display">
            Counterparty & Leads Directory
          </h2>
          <p className="text-xs text-[#64748B]">
            Manage buyers, international suppliers, brokers, and trade desk contacts.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setIsCreateModalOpen(true);
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#0B1730] hover:bg-[#183653] text-white text-xs font-semibold rounded-md shadow transition-colors shrink-0"
        >
          <Plus className="w-3.5 h-3.5 text-[#C7A45B]" />
          <span>Add New Contact</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#DCE2E8] shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by contact name, company, email, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#F5F7FA] border border-[#DCE2E8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0B1730] focus:bg-white text-[#0B1730]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-white border border-[#DCE2E8] rounded-md text-[#0B1730] focus:outline-none focus:ring-1 focus:ring-[#0B1730]"
          >
            <option value="all">All Counterparty Types</option>
            <option value="buyer">Buyers</option>
            <option value="supplier">Suppliers</option>
            <option value="broker">Brokers / Agents</option>
            <option value="other">Other Partners</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-white border border-[#DCE2E8] rounded-md text-[#0B1730] focus:outline-none focus:ring-1 focus:ring-[#0B1730]"
          >
            <option value="all">All Statuses</option>
            <option value="new">New Lead</option>
            <option value="contacted">Contacted</option>
            <option value="qualifying">Qualifying</option>
            <option value="active">Active Trading</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Contacts Table / Grid */}
      <div className="bg-white rounded-xl border border-[#DCE2E8] shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="py-16 text-center text-xs text-[#64748B]">
            Loading directory contacts...
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <Users className="w-8 h-8 text-[#64748B] mx-auto opacity-50" />
            <p className="text-sm font-semibold text-[#0B1730]">No contacts found</p>
            <p className="text-xs text-[#64748B] max-w-sm mx-auto">
              {searchQuery || typeFilter !== 'all' || statusFilter !== 'all'
                ? 'Try adjusting your search criteria or clear the filters.'
                : 'Click "Add New Contact" or import your counterparties using the Data & Backups tab.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F5F7FA] border-b border-[#DCE2E8] text-[#64748B] font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Counterparty / Company</th>
                  <th className="py-3 px-4">Type & Status</th>
                  <th className="py-3 px-4">Contact Info</th>
                  <th className="py-3 px-4">Location & Interest</th>
                  <th className="py-3 px-4">Direct Actions</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F4F7]">
                {filteredContacts.map((contact) => {
                  const whatsappClean = (contact.whatsapp || contact.phone || '').replace(/[^0-9]/g, '');
                  const whatsappLink = whatsappClean
                    ? `https://wa.me/${whatsappClean}?text=${encodeURIComponent(
                        `Hello ${contact.full_name}, greetings from NEXARIS Trade Desk.`
                      )}`
                    : null;

                  return (
                    <tr key={contact.id} className="hover:bg-[#F9FAFB] transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#0B1730] text-sm">
                          {contact.full_name}
                        </div>
                        {contact.company_name && (
                          <div className="flex items-center gap-1 text-[#64748B] text-[11px] mt-0.5">
                            <Building className="w-3 h-3" />
                            <span>{contact.company_name}</span>
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <span
                            className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                              contact.type === 'buyer'
                                ? 'bg-blue-50 text-blue-700'
                                : contact.type === 'supplier'
                                ? 'bg-purple-50 text-purple-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {contact.type}
                          </span>
                          <div>
                            <span
                              className={`text-[10px] font-semibold ${
                                contact.status === 'active'
                                  ? 'text-emerald-700'
                                  : contact.status === 'new'
                                  ? 'text-[#C7A45B]'
                                  : 'text-[#64748B]'
                              }`}
                            >
                              ● {contact.status.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 space-y-1">
                        {contact.email && (
                          <div className="flex items-center gap-1 text-[#0B1730]">
                            <Mail className="w-3 h-3 text-[#64748B]" />
                            <a href={`mailto:${contact.email}`} className="hover:underline">
                              {contact.email}
                            </a>
                          </div>
                        )}
                        {(contact.phone || contact.whatsapp) && (
                          <div className="flex items-center gap-1 text-[#64748B]">
                            <Phone className="w-3 h-3" />
                            <span>{contact.phone || contact.whatsapp}</span>
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 space-y-1">
                        {contact.country_or_location && (
                          <div className="flex items-center gap-1 text-[#0B1730]">
                            <MapPin className="w-3 h-3 text-[#64748B]" />
                            <span>{contact.country_or_location}</span>
                          </div>
                        )}
                        {contact.commodity_interest && (
                          <div className="text-[11px] text-[#64748B]">
                            Interest: <span className="font-semibold text-[#0B1730]">{contact.commodity_interest}</span>
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        {whatsappLink ? (
                          <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded border border-emerald-200 transition-colors"
                          >
                            <MessageSquare className="w-3 h-3 text-emerald-600" />
                            <span>WhatsApp</span>
                          </a>
                        ) : (
                          <span className="text-[11px] text-[#94A3B8] italic">No phone</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => handleOpenEdit(contact)}
                            className="p-1.5 text-[#64748B] hover:text-[#0B1730] hover:bg-[#F1F4F7] rounded"
                            title="Edit Contact"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteContact(contact.id, contact.full_name)}
                            className="p-1.5 text-[#64748B] hover:text-red-600 hover:bg-red-50 rounded"
                            title="Delete Contact"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Contact Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-xl border border-[#DCE2E8] shadow-2xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F4F7]">
              <h3 className="text-base font-bold text-[#0B1730] font-display">
                {editingContact ? 'Edit Counterparty' : 'Register New Counterparty'}
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

            <form onSubmit={handleSaveContact} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#0B1730] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. John Doe / Sourcing Head"
                    className="w-full px-3 py-2 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#0B1730] mb-1">Company Name</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Al Khaleej General Trading LLC"
                    className="w-full px-3 py-2 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#0B1730] mb-1">Business Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="procurement@company.com"
                    className="w-full px-3 py-2 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#0B1730] mb-1">Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value, whatsapp: e.target.value })}
                    placeholder="+971 50 123 4567"
                    className="w-full px-3 py-2 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-[#0B1730] mb-1">Counterparty Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none bg-white"
                  >
                    <option value="buyer">Buyer / Importer</option>
                    <option value="supplier">Supplier / Exporter</option>
                    <option value="broker">Broker / Indenter</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#0B1730] mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none bg-white"
                  >
                    <option value="new">New Lead</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualifying">Qualifying</option>
                    <option value="active">Active Trading</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#0B1730] mb-1">Lead Source</label>
                  <select
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    className="w-full px-3 py-2 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none bg-white"
                  >
                    <option value="direct">Direct Contact</option>
                    <option value="website_enquiry">Website Enquiry</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="email">Email</option>
                    <option value="trade_fair">Trade Fair / Expo</option>
                    <option value="referral">Referral</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#0B1730] mb-1">Destination / Country</label>
                  <input
                    type="text"
                    value={formData.countryOrLocation}
                    onChange={(e) => setFormData({ ...formData, countryOrLocation: e.target.value })}
                    placeholder="e.g. Dubai, UAE / Mundra, India"
                    className="w-full px-3 py-2 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#0B1730] mb-1">Commodity Interest</label>
                  <input
                    type="text"
                    value={formData.commodityInterest}
                    onChange={(e) => setFormData({ ...formData, commodityInterest: e.target.value })}
                    placeholder="e.g. Cumin Seeds, Jaggery Powder, Sesame"
                    className="w-full px-3 py-2 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#0B1730] mb-1">Private Notes / Trade Details</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Payment preferences, lot specifications, required incoterms, etc."
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
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#0B1730] hover:bg-[#183653] text-white rounded font-semibold transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? 'Saving...' : editingContact ? 'Update Contact' : 'Register Contact'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
