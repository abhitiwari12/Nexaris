import React from 'react';
import {
  Users,
  Briefcase,
  Layers,
  Calendar,
  Inbox,
  AlertTriangle,
  ArrowUpRight,
  Plus,
  TrendingUp,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface MetricsData {
  contacts: { total: number; buyers: number; suppliers: number };
  opportunities: {
    total: number;
    open: number;
    closedWon: number;
    spicesAndOilseeds: number;
    jaggery?: number;
    aluminiumScrap?: number;
    estimatedPipelineValue: number;
  };
  activities: {
    pending: number;
    overdue: number;
    dueToday: number;
    upcomingList: any[];
  };
  enquiries: {
    unread: number;
    recentList: any[];
  };
}

interface CrmDashboardTabProps {
  metrics: MetricsData | null;
  onNavigateTab: (tab: string) => void;
  onOpenNewContact: () => void;
  onOpenNewOpportunity: () => void;
  onOpenNewActivity: () => void;
}

export function CrmDashboardTab({
  metrics,
  onNavigateTab,
  onOpenNewContact,
  onOpenNewOpportunity,
  onOpenNewActivity,
}: CrmDashboardTabProps) {
  if (!metrics) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 border-3 border-[#0B1730] border-t-[#C7A45B] rounded-full animate-spin" />
        <p className="text-xs text-[#64748B]">Loading commercial metrics...</p>
      </div>
    );
  }

  const { contacts, opportunities, activities, enquiries } = metrics;
  const isFresh = contacts.total === 0 && opportunities.total === 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Welcome & Quick Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#DCE2E8]">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1730] font-display">
            Commercial Trading Overview
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Real-time pipeline metrics, commodity opportunities, and trade desk tasks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenNewContact}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#0B1730] hover:bg-[#183653] text-white text-xs font-semibold rounded-md shadow transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-[#C7A45B]" />
            <span>New Lead</span>
          </button>
          <button
            onClick={onOpenNewOpportunity}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-[#F5F7FA] text-[#0B1730] border border-[#DCE2E8] text-xs font-semibold rounded-md shadow-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-[#0B1730]" />
            <span>New Deal</span>
          </button>
          <button
            onClick={onOpenNewActivity}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-[#F5F7FA] text-[#0B1730] border border-[#DCE2E8] text-xs font-semibold rounded-md shadow-sm transition-colors"
          >
            <Clock className="w-3.5 h-3.5 text-[#0B1730]" />
            <span>Log Task</span>
          </button>
        </div>
      </div>

      {/* Fresh Account Helper Banner */}
      {isFresh && (
        <div className="p-5 bg-[#F5F7FA] rounded-xl border border-[#DCE2E8] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C7A45B]" />
              <h3 className="text-sm font-bold text-[#0B1730]">
                Clean Database Ready for Commercial Records
              </h3>
            </div>
            <p className="text-xs text-[#64748B] max-w-2xl">
              Your NEXARIS CRM database is live and zero-seeded. Inbound enquiries submitted through the public website will appear here automatically. You can also import existing contacts via CSV or manually register new counterparties.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigateTab('data')}
              className="px-3.5 py-2 text-xs font-semibold text-[#0B1730] bg-white border border-[#DCE2E8] hover:bg-[#ECEFF3] rounded-md transition-colors"
            >
              Import CSV
            </button>
            <button
              onClick={onOpenNewContact}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-[#0B1730] hover:bg-[#183653] rounded-md transition-colors"
            >
              Add First Contact
            </button>
          </div>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Contacts */}
        <div
          onClick={() => onNavigateTab('contacts')}
          className="p-5 bg-white rounded-xl border border-[#DCE2E8] shadow-sm hover:border-[#C7A45B]/60 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
              Total Counterparties
            </span>
            <div className="p-2 bg-[#F5F7FA] rounded-lg group-hover:bg-[#0B1730] group-hover:text-white transition-colors">
              <Users className="w-4 h-4 text-[#0B1730] group-hover:text-[#C7A45B]" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#0B1730] tabular-nums font-display">
              {contacts.total}
            </span>
            <span className="text-xs text-[#64748B]">registered</span>
          </div>
          <div className="mt-3 pt-3 border-t border-[#F1F4F7] flex items-center justify-between text-xs text-[#64748B]">
            <span>{contacts.buyers} Buyers</span>
            <span>·</span>
            <span>{contacts.suppliers} Suppliers</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C7A45B] ml-auto group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Card 2: Active Opportunities */}
        <div
          onClick={() => onNavigateTab('opportunities')}
          className="p-5 bg-white rounded-xl border border-[#DCE2E8] shadow-sm hover:border-[#C7A45B]/60 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
              Active Opportunities
            </span>
            <div className="p-2 bg-[#F5F7FA] rounded-lg group-hover:bg-[#0B1730] group-hover:text-white transition-colors">
              <Briefcase className="w-4 h-4 text-[#0B1730] group-hover:text-[#C7A45B]" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#0B1730] tabular-nums font-display">
              {opportunities.open}
            </span>
            <span className="text-xs text-[#64748B]">of {opportunities.total} total</span>
          </div>
          <div className="mt-3 pt-3 border-t border-[#F1F4F7] flex items-center justify-between text-xs text-[#64748B]">
            <span>{opportunities.spicesAndOilseeds} Spices</span>
            <span>·</span>
            <span>{opportunities.jaggery ?? opportunities.aluminiumScrap ?? 0} Jaggery</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C7A45B] ml-auto group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Card 3: Pending Follow-Ups */}
        <div
          onClick={() => onNavigateTab('activities')}
          className="p-5 bg-white rounded-xl border border-[#DCE2E8] shadow-sm hover:border-[#C7A45B]/60 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
              Pending Follow-Ups
            </span>
            <div className="p-2 bg-[#F5F7FA] rounded-lg group-hover:bg-[#0B1730] group-hover:text-white transition-colors">
              <Calendar className="w-4 h-4 text-[#0B1730] group-hover:text-[#C7A45B]" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#0B1730] tabular-nums font-display">
              {activities.pending}
            </span>
            <span className="text-xs text-[#64748B]">actionable</span>
          </div>
          <div className="mt-3 pt-3 border-t border-[#F1F4F7] flex items-center gap-2 text-xs">
            {activities.overdue > 0 ? (
              <span className="font-semibold text-red-600 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {activities.overdue} Overdue
              </span>
            ) : (
              <span className="text-emerald-600 font-medium">0 Overdue</span>
            )}
            <span className="text-[#64748B]">·</span>
            <span className="text-[#0B1730] font-medium">{activities.dueToday} Due Today</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C7A45B] ml-auto group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Card 4: Inbound Website Enquiries */}
        <div
          onClick={() => onNavigateTab('enquiries')}
          className="p-5 bg-white rounded-xl border border-[#DCE2E8] shadow-sm hover:border-[#C7A45B]/60 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
              Website Enquiries
            </span>
            <div className="p-2 bg-[#F5F7FA] rounded-lg group-hover:bg-[#0B1730] group-hover:text-white transition-colors">
              <Inbox className="w-4 h-4 text-[#0B1730] group-hover:text-[#C7A45B]" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#0B1730] tabular-nums font-display">
              {enquiries.unread}
            </span>
            <span className="text-xs text-[#64748B]">unread</span>
          </div>
          <div className="mt-3 pt-3 border-t border-[#F1F4F7] flex items-center justify-between text-xs text-[#64748B]">
            <span>Live trade desk feed</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C7A45B] ml-auto group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* Two Column Layout: Inbound Feed & Upcoming Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recent Inbound Trade Enquiries (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#DCE2E8] p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[#F1F4F7]">
            <div className="flex items-center gap-2">
              <Inbox className="w-4 h-4 text-[#0B1730]" />
              <h3 className="text-sm font-bold text-[#0B1730]">
                Recent Inbound Quotation Requests
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('enquiries')}
              className="text-xs font-semibold text-[#0B1730] hover:text-[#C7A45B] flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="mt-4 divide-y divide-[#F1F4F7]">
            {enquiries.recentList.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#64748B]">
                No website enquiries received yet. Inbound form submissions will be listed here in real time.
              </div>
            ) : (
              enquiries.recentList.map((enq: any) => (
                <div key={enq.id} className="py-3.5 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#0B1730]">
                        {enq.reference_number}
                      </span>
                      {enq.status === 'unread' && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[#C7A45B]/15 text-[#927129] rounded">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-[#0B1730]">
                      {enq.full_name} · <span className="text-[#64748B] font-normal">{enq.company_name}</span>
                    </p>
                    <p className="text-xs text-[#64748B]">
                      Commodity: <strong className="text-[#0B1730]">{enq.product_name}</strong> ({enq.buyer_location})
                    </p>
                  </div>
                  <span className="text-[11px] text-[#64748B] shrink-0 tabular-nums">
                    {new Date(enq.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Upcoming Follow-Ups (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#DCE2E8] p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[#F1F4F7]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#0B1730]" />
              <h3 className="text-sm font-bold text-[#0B1730]">
                Urgent Follow-Ups
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('activities')}
              className="text-xs font-semibold text-[#0B1730] hover:text-[#C7A45B] flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="mt-4 divide-y divide-[#F1F4F7]">
            {activities.upcomingList.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#64748B]">
                No pending follow-ups. You're fully caught up!
              </div>
            ) : (
              activities.upcomingList.map((act: any) => {
                const today = new Date().toISOString().split('T')[0];
                const isOverdue = act.due_date < today;
                const isToday = act.due_date === today;

                return (
                  <div key={act.id} className="py-3.5 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[#0B1730] truncate">
                        {act.title}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase shrink-0 ${
                          isOverdue
                            ? 'bg-red-100 text-red-700'
                            : isToday
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-[#F1F4F7] text-[#64748B]'
                        }`}
                      >
                        {isOverdue ? 'Overdue' : isToday ? 'Due Today' : act.due_date}
                      </span>
                    </div>
                    {act.contact_name && (
                      <p className="text-xs text-[#64748B]">
                        Contact: {act.contact_name} {act.contact_company ? `(${act.contact_company})` : ''}
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
