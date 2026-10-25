import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Plus,
  AlertTriangle,
  Clock,
  Trash2,
  Edit2,
  X,
  Phone,
  Mail,
  MessageSquare,
  FileText,
} from 'lucide-react';
import { ContactItem } from './CrmContactsTab';
import { OpportunityItem } from './CrmOpportunitiesTab';

export interface ActivityItem {
  id: string;
  contact_id: string | null;
  opportunity_id: string | null;
  type: string; // 'call', 'whatsapp', 'email', 'quote', 'meeting', 'sample', 'note'
  title: string;
  due_date: string;
  priority: string; // 'high', 'medium', 'low'
  status: string; // 'pending', 'completed', 'cancelled'
  notes: string;
  completed_at: string | null;
  created_at: string;
  contact_name?: string;
  contact_company?: string;
  opportunity_title?: string;
}

interface CrmActivitiesTabProps {
  activities: ActivityItem[];
  contacts: ContactItem[];
  opportunities: OpportunityItem[];
  isLoading: boolean;
  onRefresh: () => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
}

export function CrmActivitiesTab({
  activities,
  contacts,
  opportunities,
  isLoading,
  onRefresh,
  isCreateModalOpen,
  setIsCreateModalOpen,
}: CrmActivitiesTabProps) {
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('pending');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const [editingActivity, setEditingActivity] = useState<ActivityItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    contactId: '',
    opportunityId: '',
    type: 'call',
    title: '',
    dueDate: todayStr,
    priority: 'medium',
    notes: '',
  });

  const resetForm = () => {
    setFormData({
      contactId: '',
      opportunityId: '',
      type: 'call',
      title: '',
      dueDate: todayStr,
      priority: 'medium',
      notes: '',
    });
    setEditingActivity(null);
    setErrorMsg('');
  };

  const handleOpenEdit = (act: ActivityItem) => {
    setEditingActivity(act);
    setFormData({
      contactId: act.contact_id || '',
      opportunityId: act.opportunity_id || '',
      type: act.type,
      title: act.title,
      dueDate: act.due_date,
      priority: act.priority,
      notes: act.notes || '',
    });
    setIsCreateModalOpen(true);
  };

  const handleToggleComplete = async (act: ActivityItem) => {
    const newStatus = act.status === 'completed' ? 'pending' : 'completed';
    try {
      const res = await fetch(`/api/crm/activities/${act.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update activity status');
      onRefresh();
    } catch (err) {
      alert('Could not update activity.');
    }
  };

  const handleDeleteActivity = async (id: string, title: string) => {
    if (!window.confirm(`Delete activity "${title}"?`)) return;
    try {
      const res = await fetch(`/api/crm/activities/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete activity');
      onRefresh();
    } catch (err) {
      alert('Failed to delete activity');
    }
  };

  const handleSaveActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.title.trim() || !formData.dueDate) {
      setErrorMsg('Task title and due date are required.');
      return;
    }

    setIsSubmitting(true);

    try {
      const url = editingActivity
        ? `/api/crm/activities/${editingActivity.id}`
        : '/api/crm/activities';
      const method = editingActivity ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save task.');
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

  const filteredActivities = activities.filter((a) => {
    if (statusFilter !== 'all' && a.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && a.priority !== priorityFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#DCE2E8]">
        <div>
          <h2 className="text-xl font-bold text-[#0B1730] font-display">
            Follow-Ups & Action Items
          </h2>
          <p className="text-xs text-[#64748B]">
            Maintain trade commitments, buyer calls, sample dispatches, and proforma follow-ups.
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
          <span>Schedule Task</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-3.5 rounded-xl border border-[#DCE2E8] shadow-sm flex flex-wrap gap-3 items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-3 py-1.5 rounded font-semibold transition-colors ${
              statusFilter === 'pending'
                ? 'bg-[#0B1730] text-white'
                : 'bg-[#F5F7FA] text-[#64748B] hover:text-[#0B1730]'
            }`}
          >
            Pending ({activities.filter((a) => a.status === 'pending').length})
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-3 py-1.5 rounded font-semibold transition-colors ${
              statusFilter === 'completed'
                ? 'bg-[#0B1730] text-white'
                : 'bg-[#F5F7FA] text-[#64748B] hover:text-[#0B1730]'
            }`}
          >
            Completed ({activities.filter((a) => a.status === 'completed').length})
          </button>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded font-semibold transition-colors ${
              statusFilter === 'all'
                ? 'bg-[#0B1730] text-white'
                : 'bg-[#F5F7FA] text-[#64748B] hover:text-[#0B1730]'
            }`}
          >
            All Items ({activities.length})
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#64748B] font-semibold">Priority:</span>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-[#F5F7FA] border border-[#DCE2E8] rounded text-[#0B1730] focus:outline-none"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Activities List */}
      <div className="bg-white rounded-xl border border-[#DCE2E8] shadow-sm overflow-hidden text-xs">
        {isLoading ? (
          <div className="py-16 text-center text-[#64748B]">Loading follow-ups...</div>
        ) : filteredActivities.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto opacity-70" />
            <p className="text-sm font-semibold text-[#0B1730]">No activities in this view</p>
            <p className="text-xs text-[#64748B]">All commercial commitments are up to date.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#F1F4F7]">
            {filteredActivities.map((act) => {
              const isOverdue = act.status === 'pending' && act.due_date < todayStr;
              const isToday = act.status === 'pending' && act.due_date === todayStr;

              return (
                <div
                  key={act.id}
                  className={`p-4 flex items-start justify-between gap-4 transition-colors ${
                    act.status === 'completed' ? 'bg-[#FAFBFD] opacity-75' : 'hover:bg-[#F9FAFB]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => handleToggleComplete(act)}
                      className="mt-0.5 text-[#64748B] hover:text-emerald-700 transition-colors"
                      title={act.status === 'completed' ? 'Mark Pending' : 'Mark Completed'}
                    >
                      {act.status === 'completed' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Circle className="w-4 h-4 text-[#94A3B8]" />
                      )}
                    </button>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-bold text-sm ${
                            act.status === 'completed' ? 'line-through text-[#64748B]' : 'text-[#0B1730]'
                          }`}
                        >
                          {act.title}
                        </span>

                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                            act.priority === 'high'
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : act.priority === 'medium'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-gray-100 text-gray-700 border border-gray-200'
                          }`}
                        >
                          {act.priority}
                        </span>

                        <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-[#F1F4F7] text-[#64748B]">
                          {act.type}
                        </span>
                      </div>

                      {(act.contact_name || act.opportunity_title) && (
                        <div className="text-[11px] text-[#64748B] flex items-center gap-2">
                          {act.contact_name && (
                            <span>
                              Counterparty: <strong className="text-[#0B1730]">{act.contact_name}</strong>
                              {act.contact_company ? ` (${act.contact_company})` : ''}
                            </span>
                          )}
                          {act.opportunity_title && (
                            <span>
                              · Deal: <strong className="text-[#0B1730]">{act.opportunity_title}</strong>
                            </span>
                          )}
                        </div>
                      )}

                      {act.notes && (
                        <p className="text-xs text-[#64748B] bg-[#F5F7FA] p-2 rounded max-w-xl">
                          {act.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span
                        className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded ${
                          isOverdue
                            ? 'bg-red-100 text-red-700'
                            : isToday
                            ? 'bg-amber-100 text-amber-800'
                            : 'text-[#64748B]'
                        }`}
                      >
                        {isOverdue ? `Overdue (${act.due_date})` : isToday ? 'Due Today' : `Due: ${act.due_date}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(act)}
                        className="p-1 text-[#64748B] hover:text-[#0B1730]"
                        title="Edit Task"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteActivity(act.id, act.title)}
                        className="p-1 text-[#64748B] hover:text-red-600"
                        title="Delete Task"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add / Edit Activity Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-xl border border-[#DCE2E8] shadow-2xl max-w-md w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F4F7]">
              <h3 className="text-base font-bold text-[#0B1730] font-display">
                {editingActivity ? 'Edit Follow-Up Task' : 'Schedule Follow-Up Task'}
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

            <form onSubmit={handleSaveActivity} className="space-y-4">
              <div>
                <label className="block font-semibold text-[#0B1730] mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Dispatch 50g cumin sample & lab report"
                  className="w-full px-3 py-2 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#0B1730] mb-1">Activity Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none bg-white"
                  >
                    <option value="call">Phone Call</option>
                    <option value="whatsapp">WhatsApp Follow-up</option>
                    <option value="email">Email</option>
                    <option value="quote">Quotation Review</option>
                    <option value="sample">Sample Dispatch</option>
                    <option value="meeting">Trade Meeting</option>
                    <option value="note">Internal Note</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#0B1730] mb-1">Due Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#0B1730] mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none bg-white"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#0B1730] mb-1">Link Counterparty</label>
                  <select
                    value={formData.contactId}
                    onChange={(e) => setFormData({ ...formData, contactId: e.target.value })}
                    className="w-full px-3 py-2 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none bg-white"
                  >
                    <option value="">(None / General Desk Task)</option>
                    {contacts.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.full_name} {c.company_name ? `(${c.company_name})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#0B1730] mb-1">Link Trade Deal (Optional)</label>
                <select
                  value={formData.opportunityId}
                  onChange={(e) => setFormData({ ...formData, opportunityId: e.target.value })}
                  className="w-full px-3 py-2 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none bg-white"
                >
                  <option value="">(None)</option>
                  {opportunities.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#0B1730] mb-1">Details & Remarks</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Specific follow-up notes or questions for counterparty..."
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
                  {isSubmitting ? 'Saving...' : editingActivity ? 'Update Task' : 'Save Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
