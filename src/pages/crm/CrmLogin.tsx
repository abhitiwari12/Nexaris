import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';

interface CrmLoginProps {
  onLoginSuccess: (user: any) => void;
}

export function CrmLogin({ onLoginSuccess }: CrmLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/crm/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || 'Authentication failed. Please verify your credentials.');
        setIsLoading(false);
        return;
      }

      onLoginSuccess(data.user);
    } catch (err) {
      setErrorMessage('Unable to connect to authentication server. Please check your network connection.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-xl border border-[#DCE2E8] shadow-lg">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0B1730] text-[#C7A45B] shadow-inner mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0B1730] font-display">
            NEXARIS Trade Console
          </h1>
          <p className="text-xs text-[#64748B] font-medium tracking-wide uppercase">
            Owner-Only Commercial Management
          </p>
        </div>

        {/* Security Notice */}
        <div className="flex items-start gap-2.5 p-3.5 bg-[#F5F7FA] rounded-md border border-[#DCE2E8] text-xs text-[#64748B]">
          <ShieldCheck className="w-4 h-4 text-[#C7A45B] shrink-0 mt-0.5" />
          <p>
            This portal is restricted to authorized NEXARIS management. All access attempts are cryptographically verified and rate-limited.
          </p>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="flex items-start gap-2.5 p-3.5 bg-red-50 rounded-md border border-red-200 text-xs text-red-700 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-[#0B1730] mb-1.5">
              Authorized Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#64748B]">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@nexaris.co.in"
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-[#DCE2E8] rounded-md text-[#0B1730] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0B1730] focus:border-transparent transition-all"
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0B1730] mb-1.5">
              Console Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#64748B]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-10 py-2.5 text-sm bg-white border border-[#DCE2E8] rounded-md text-[#0B1730] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0B1730] focus:border-transparent transition-all"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#64748B] hover:text-[#0B1730]"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer select-none text-[#64748B]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-[#DCE2E8] text-[#0B1730] focus:ring-[#0B1730]"
              />
              <span>Remember this session</span>
            </label>
            <span className="text-[#64748B] italic">Encrypted Session</span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-[#0B1730] hover:bg-[#183653] text-[#FFFFFF] rounded-md font-semibold text-sm shadow transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <span>Access Management Console</span>
                <ArrowRight className="w-4 h-4 text-[#C7A45B]" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-[#F1F4F7] text-center">
          <p className="text-[11px] text-[#94A3B8]">
            NEXARIS Commodity Trading · Gandhinagar, Gujarat, India
          </p>
        </div>
      </div>
    </div>
  );
}
