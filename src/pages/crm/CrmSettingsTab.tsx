import React, { useState } from 'react';
import {
  ShieldCheck,
  Key,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Lock,
  Server,
  Database,
  Eye,
  EyeOff,
} from 'lucide-react';

interface CrmSettingsTabProps {
  currentUser: any;
}

export function CrmSettingsTab({ currentUser }: CrmSettingsTabProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [resultMsg, setResultMsg] = useState<{ success: boolean; message: string } | null>(null);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResultMsg(null);

    if (!currentPassword || !newPassword) {
      setResultMsg({ success: false, message: 'Please provide current and new passwords.' });
      return;
    }

    if (newPassword.length < 8) {
      setResultMsg({ success: false, message: 'New password must be at least 8 characters long.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setResultMsg({ success: false, message: 'New passwords do not match.' });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/crm/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update password.');
      }

      setResultMsg({ success: true, message: 'Password updated successfully! Keep your new password secure.' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setResultMsg({ success: false, message: err.message || 'Operation failed' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="pb-4 border-b border-[#DCE2E8]">
        <h2 className="text-xl font-bold text-[#0B1730] font-display">
          Owner Security & Console Settings
        </h2>
        <p className="text-xs text-[#64748B]">
          Manage authentication credentials, audit access parameters, and review system cryptographic configuration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Change Password Form */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#DCE2E8] p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-[#F1F4F7]">
            <Key className="w-4 h-4 text-[#0B1730]" />
            <h3 className="text-sm font-bold text-[#0B1730]">
              Update Owner Console Password
            </h3>
          </div>

          {resultMsg && (
            <div
              className={`p-3.5 rounded-md border text-xs flex items-start gap-2 ${
                resultMsg.success
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-red-50 text-red-700 border-red-200'
              }`}
            >
              {resultMsg.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              )}
              <p>{resultMsg.message}</p>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#0B1730] mb-1">Current Password *</label>
              <div className="relative">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter your current password"
                  className="w-full px-3 py-2 pr-10 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#64748B]"
                >
                  {showCurrent ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#0B1730] mb-1">New Password (min 8 characters) *</label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Choose a strong, unique password"
                  className="w-full px-3 py-2 pr-10 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#64748B]"
                >
                  {showNew ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#0B1730] mb-1">Confirm New Password *</label>
              <input
                type={showNew ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full px-3 py-2 border border-[#DCE2E8] rounded-md focus:ring-1 focus:ring-[#0B1730] focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-[#0B1730] hover:bg-[#183653] text-white rounded font-semibold transition-colors disabled:opacity-60"
              >
                {isLoading ? 'Updating Password...' : 'Save New Password'}
              </button>
            </div>
          </form>
        </div>

        {/* Right: Security Architecture Audit & Owner Info */}
        <div className="lg:col-span-5 space-y-6">
          {/* Owner Profile Card */}
          <div className="bg-white rounded-xl border border-[#DCE2E8] p-6 shadow-sm space-y-3 text-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-[#F1F4F7]">
              <UserCheck className="w-4 h-4 text-[#0B1730]" />
              <h3 className="text-sm font-bold text-[#0B1730]">
                Active Console Account
              </h3>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between py-1 border-b border-[#F1F4F7]">
                <span className="text-[#64748B]">Authenticated Identity:</span>
                <span className="font-bold text-[#0B1730]">{currentUser?.email || 'contact@nexaris.co.in'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F1F4F7]">
                <span className="text-[#64748B]">Assigned Role:</span>
                <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase text-[10px]">
                  {currentUser?.role || 'Owner'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F1F4F7]">
                <span className="text-[#64748B]">Access Level:</span>
                <span className="font-medium text-[#0B1730]">Full Commercial Read/Write</span>
              </div>
            </div>
          </div>

          {/* Security Architecture Card */}
          <div className="bg-white rounded-xl border border-[#DCE2E8] p-6 shadow-sm space-y-3 text-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-[#F1F4F7]">
              <ShieldCheck className="w-4 h-4 text-[#C7A45B]" />
              <h3 className="text-sm font-bold text-[#0B1730]">
                Security Audit Architecture
              </h3>
            </div>

            <div className="space-y-2.5 text-[#64748B]">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-[#0B1730]">scrypt Key Derivation:</strong> Passwords hashed with 64-byte scrypt keys and cryptographic per-user salts.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-[#0B1730]">HttpOnly Session Cookies:</strong> Tokens are stored in HttpOnly cookies inaccessible to browser JavaScript.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-[#0B1730]">Brute-Force Rate Limiting:</strong> Five failed login attempts triggers an automated 15-minute lock on the remote IP address.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-[#0B1730]">Zero Public Visibility:</strong> The <code>/owner-crm</code> route is hidden from public navigation, footers, robots.txt, and sitemaps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
