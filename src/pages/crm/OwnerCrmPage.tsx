import React, { useEffect, useState, useCallback } from 'react';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CalendarCheck,
  Inbox,
  Database,
  Settings,
  LogOut,
  ShieldCheck,
  Layers,
  ExternalLink,
} from 'lucide-react';

import { CrmLogin } from './CrmLogin';
import { CrmDashboardTab } from './CrmDashboardTab';
import { CrmContactsTab, ContactItem } from './CrmContactsTab';
import { CrmOpportunitiesTab, OpportunityItem } from './CrmOpportunitiesTab';
import { CrmActivitiesTab, ActivityItem } from './CrmActivitiesTab';
import { CrmEnquiriesTab, EnquiryItem } from './CrmEnquiriesTab';
import { CrmDataBackupsTab } from './CrmDataBackupsTab';
import { CrmSettingsTab } from './CrmSettingsTab';
import { Link } from '../../context/RouterContext';

export function OwnerCrmPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // CRM Data states
  const [metrics, setMetrics] = useState<any>(null);
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [opportunities, setOpportunities] = useState<OpportunityItem[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);

  const [isLoadingContacts, setIsLoadingContacts] = useState(false);
  const [isLoadingOpps, setIsLoadingOpps] = useState(false);
  const [isLoadingActivities, setIsLoadingActivities] = useState(false);
  const [isLoadingEnquiries, setIsLoadingEnquiries] = useState(false);

  // Modal triggers
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isOpportunityModalOpen, setIsOpportunityModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  // Check auth session
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/crm/auth/me');
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
      } else {
        setCurrentUser(null);
      }
    } catch {
      setCurrentUser(null);
    } finally {
      setIsCheckingAuth(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Data fetching functions
  const fetchMetrics = useCallback(async () => {
    try {
      const res = await fetch('/api/crm/metrics');
      if (res.ok) {
        const data = await res.json();
        setMetrics(data);
      }
    } catch (err) {
      console.error('Failed to fetch metrics:', err);
    }
  }, []);

  const fetchContacts = useCallback(async () => {
    setIsLoadingContacts(true);
    try {
      const res = await fetch('/api/crm/contacts');
      if (res.ok) {
        const data = await res.json();
        setContacts(data.contacts || []);
      }
    } catch (err) {
      console.error('Failed to fetch contacts:', err);
    } finally {
      setIsLoadingContacts(false);
    }
  }, []);

  const fetchOpportunities = useCallback(async () => {
    setIsLoadingOpps(true);
    try {
      const res = await fetch('/api/crm/opportunities');
      if (res.ok) {
        const data = await res.json();
        setOpportunities(data.opportunities || []);
      }
    } catch (err) {
      console.error('Failed to fetch opportunities:', err);
    } finally {
      setIsLoadingOpps(false);
    }
  }, []);

  const fetchActivities = useCallback(async () => {
    setIsLoadingActivities(true);
    try {
      const res = await fetch('/api/crm/activities');
      if (res.ok) {
        const data = await res.json();
        setActivities(data.activities || []);
      }
    } catch (err) {
      console.error('Failed to fetch activities:', err);
    } finally {
      setIsLoadingActivities(false);
    }
  }, []);

  const fetchEnquiries = useCallback(async () => {
    setIsLoadingEnquiries(true);
    try {
      const res = await fetch('/api/crm/enquiries');
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data.enquiries || []);
      }
    } catch (err) {
      console.error('Failed to fetch enquiries:', err);
    } finally {
      setIsLoadingEnquiries(false);
    }
  }, []);

  const fetchAllData = useCallback(() => {
    if (!currentUser) return;
    fetchMetrics();
    fetchContacts();
    fetchOpportunities();
    fetchActivities();
    fetchEnquiries();
  }, [currentUser, fetchMetrics, fetchContacts, fetchOpportunities, fetchActivities, fetchEnquiries]);

  useEffect(() => {
    if (currentUser) {
      fetchAllData();
    }
  }, [currentUser, fetchAllData]);

  const handleLogout = async () => {
    try {
      await fetch('/api/crm/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout error:', err);
    }
    setCurrentUser(null);
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 border-3 border-[#0B1730] border-t-[#C7A45B] rounded-full animate-spin" />
        <p className="text-xs text-[#64748B]">Verifying encrypted session...</p>
      </div>
    );
  }

  // Unauthenticated: Show Owner Login Form
  if (!currentUser) {
    return <CrmLogin onLoginSuccess={(user) => setCurrentUser(user)} />;
  }

  const unreadEnquiriesCount = enquiries.filter((e) => e.status === 'unread').length;
  const pendingTasksCount = activities.filter((a) => a.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#344256] pb-16">
      {/* Top Banner & Header Bar */}
      <header className="bg-[#0B1730] text-white border-b border-[#183653] sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#10243D] border border-[#C7A45B]/40 flex items-center justify-center text-[#C7A45B] font-bold text-sm shadow-inner font-display">
              N
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-wider text-white font-display">
                  NEXARIS
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#C7A45B]/20 text-[#C7A45B] tracking-wider uppercase">
                  OWNER CRM
                </span>
              </div>
              <p className="text-[11px] text-[#AEB8C4]">
                Private Commodity Trading & Pipeline Desk
              </p>
            </div>
          </div>

          {/* Right Session & Actions */}
          <div className="flex items-center gap-4 text-xs">
            <div className="hidden md:flex items-center gap-2 text-[#AEB8C4]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Signed in as <strong className="text-white">{currentUser.email}</strong></span>
            </div>

            <div className="h-4 w-px bg-white/20 hidden md:block" />

            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1 text-[#AEB8C4] hover:text-white transition-colors"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#183653] hover:bg-red-950/50 hover:text-red-200 text-white rounded font-medium transition-colors border border-white/10"
              title="Sign out of Owner Console"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Navigation Sidebar (3 cols) */}
          <aside className="lg:col-span-3 bg-white rounded-xl border border-[#DCE2E8] p-3 shadow-xs sticky top-22">
            <nav className="space-y-1 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-[#0B1730] text-white shadow-xs'
                    : 'text-[#64748B] hover:bg-[#F5F7FA] hover:text-[#0B1730]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className={`w-4 h-4 ${activeTab === 'dashboard' ? 'text-[#C7A45B]' : ''}`} />
                  <span>Overview Dashboard</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('contacts')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg transition-colors ${
                  activeTab === 'contacts'
                    ? 'bg-[#0B1730] text-white shadow-xs'
                    : 'text-[#64748B] hover:bg-[#F5F7FA] hover:text-[#0B1730]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className={`w-4 h-4 ${activeTab === 'contacts' ? 'text-[#C7A45B]' : ''}`} />
                  <span>Contacts & Counterparties</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                  activeTab === 'contacts' ? 'bg-white/20 text-white' : 'bg-[#F1F4F7] text-[#64748B]'
                }`}>
                  {contacts.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('opportunities')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg transition-colors ${
                  activeTab === 'opportunities'
                    ? 'bg-[#0B1730] text-white shadow-xs'
                    : 'text-[#64748B] hover:bg-[#F5F7FA] hover:text-[#0B1730]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className={`w-4 h-4 ${activeTab === 'opportunities' ? 'text-[#C7A45B]' : ''}`} />
                  <span>Commodity Pipeline</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                  activeTab === 'opportunities' ? 'bg-white/20 text-white' : 'bg-[#F1F4F7] text-[#64748B]'
                }`}>
                  {opportunities.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('activities')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg transition-colors ${
                  activeTab === 'activities'
                    ? 'bg-[#0B1730] text-white shadow-xs'
                    : 'text-[#64748B] hover:bg-[#F5F7FA] hover:text-[#0B1730]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <CalendarCheck className={`w-4 h-4 ${activeTab === 'activities' ? 'text-[#C7A45B]' : ''}`} />
                  <span>Follow-Ups & Tasks</span>
                </div>
                {pendingTasksCount > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    activeTab === 'activities' ? 'bg-[#C7A45B] text-[#0B1730]' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {pendingTasksCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('enquiries')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg transition-colors ${
                  activeTab === 'enquiries'
                    ? 'bg-[#0B1730] text-white shadow-xs'
                    : 'text-[#64748B] hover:bg-[#F5F7FA] hover:text-[#0B1730]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Inbox className={`w-4 h-4 ${activeTab === 'enquiries' ? 'text-[#C7A45B]' : ''}`} />
                  <span>Website Quotation Feed</span>
                </div>
                {unreadEnquiriesCount > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-bold bg-[#C7A45B] text-[#0B1730] animate-pulse">
                    {unreadEnquiriesCount} NEW
                  </span>
                )}
              </button>

              <div className="pt-2 my-2 border-t border-[#F1F4F7]" />

              <button
                onClick={() => setActiveTab('data')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg transition-colors ${
                  activeTab === 'data'
                    ? 'bg-[#0B1730] text-white shadow-xs'
                    : 'text-[#64748B] hover:bg-[#F5F7FA] hover:text-[#0B1730]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Database className={`w-4 h-4 ${activeTab === 'data' ? 'text-[#C7A45B]' : ''}`} />
                  <span>Data Backups & CSV</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-[#0B1730] text-white shadow-xs'
                    : 'text-[#64748B] hover:bg-[#F5F7FA] hover:text-[#0B1730]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Settings className={`w-4 h-4 ${activeTab === 'settings' ? 'text-[#C7A45B]' : ''}`} />
                  <span>Security & Passwords</span>
                </div>
              </button>
            </nav>

            <div className="mt-6 pt-4 border-t border-[#F1F4F7] px-2 text-[11px] text-[#94A3B8] space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Isolated Trade Storage</span>
              </div>
              <p>NEXARIS Engine v2.0</p>
            </div>
          </aside>

          {/* Main Content Area (9 cols) */}
          <main className="lg:col-span-9">
            {activeTab === 'dashboard' && (
              <CrmDashboardTab
                metrics={metrics}
                onNavigateTab={(tab) => setActiveTab(tab)}
                onOpenNewContact={() => setIsContactModalOpen(true)}
                onOpenNewOpportunity={() => setIsOpportunityModalOpen(true)}
                onOpenNewActivity={() => setIsActivityModalOpen(true)}
              />
            )}

            {activeTab === 'contacts' && (
              <CrmContactsTab
                contacts={contacts}
                isLoading={isLoadingContacts}
                onRefresh={fetchContacts}
                isCreateModalOpen={isContactModalOpen}
                setIsCreateModalOpen={setIsContactModalOpen}
              />
            )}

            {activeTab === 'opportunities' && (
              <CrmOpportunitiesTab
                opportunities={opportunities}
                contacts={contacts}
                isLoading={isLoadingOpps}
                onRefresh={fetchOpportunities}
                isCreateModalOpen={isOpportunityModalOpen}
                setIsCreateModalOpen={setIsOpportunityModalOpen}
              />
            )}

            {activeTab === 'activities' && (
              <CrmActivitiesTab
                activities={activities}
                contacts={contacts}
                opportunities={opportunities}
                isLoading={isLoadingActivities}
                onRefresh={fetchActivities}
                isCreateModalOpen={isActivityModalOpen}
                setIsCreateModalOpen={setIsActivityModalOpen}
              />
            )}

            {activeTab === 'enquiries' && (
              <CrmEnquiriesTab
                enquiries={enquiries}
                isLoading={isLoadingEnquiries}
                onRefresh={fetchEnquiries}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            )}

            {activeTab === 'data' && (
              <CrmDataBackupsTab onRefreshAll={fetchAllData} />
            )}

            {activeTab === 'settings' && (
              <CrmSettingsTab currentUser={currentUser} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
