import React, { useState } from 'react';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../utils/storage';
import { UserSession } from '../types';
import { Lock, Mail, Key, Film, ArrowRight, AlertCircle, CheckCircle2, ShieldCheck, User } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSessionChange: (session: UserSession) => void;
  currentSession: UserSession;
  initialMode?: 'admin' | 'guest';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSessionChange,
  currentSession,
  initialMode = 'admin',
}) => {
  const [mode, setMode] = useState<'admin' | 'guest'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (cleanEmail === ADMIN_EMAIL.toLowerCase() && cleanPass === ADMIN_PASSWORD) {
      setSuccessMsg('Authentication successful! Welcome Muawiya.');
      setTimeout(() => {
        const newSession: UserSession = {
          role: 'admin',
          email: ADMIN_EMAIL,
          isAuthenticatedAdmin: true,
        };
        onSessionChange(newSession);
        onClose();
      }, 500);
    } else {
      setErrorMsg('Incorrect email or password. Only admin access is permitted with the designated credentials.');
    }
  };

  const handleGuestEnter = () => {
    const guestSession: UserSession = {
      role: 'guest',
      isAuthenticatedAdmin: false,
    };
    onSessionChange(guestSession);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#0e111a] border border-[#23293d] rounded-2xl shadow-2xl shadow-purple-950/40 p-6 md:p-8 overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header with Premiere Pro Branding */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#5d2e8c] text-purple-200 font-bold flex items-center justify-center text-lg border border-purple-400/30 shadow-inner">
            Pr
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Muawiya Studio
            </h2>
            <p className="text-xs text-zinc-400">
              Adobe Premiere Pro Specialist · 1 Year Exp
            </p>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-2 p-1 bg-[#151926] rounded-xl border border-[#21273a] mb-6">
          <button
            type="button"
            onClick={() => {
              setMode('admin');
              setErrorMsg('');
            }}
            className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === 'admin'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            Admin Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('guest');
              setErrorMsg('');
            }}
            className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === 'guest'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Client / Visitor
          </button>
        </div>

        {mode === 'admin' ? (
          <div>
            <div className="mb-4">
              <div className="flex items-center gap-1.5 text-xs text-purple-400 font-medium mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Restricted Administrator Gate</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Sign in to upload video previews from your desktop and manage incoming client hire inquiries.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="imranmuawiya15@gmail.com"
                    required
                    className="w-full bg-[#141824] border border-[#262d42] rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Admin Password
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-[#141824] border border-[#262d42] rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-purple-900/40 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>Authorize & Unlock Admin Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-[#1c2233] text-center">
              <button
                type="button"
                onClick={handleGuestEnter}
                className="text-xs text-zinc-400 hover:text-purple-300 transition-colors"
              >
                Just browsing? Enter portfolio as Client or Guest →
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-5 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Film className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-white">
                Client & Visitor Access
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Explore video previews, watch full edits in 4K theater mode, calculate project estimates ($3–$1000), and leave client feedback.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="p-3 bg-[#131724] border border-[#20273c] rounded-xl flex items-center justify-between text-xs text-zinc-300">
                <span className="text-zinc-400">Direct Video Editor:</span>
                <span className="font-semibold text-white">Muawiya</span>
              </div>
              <div className="p-3 bg-[#131724] border border-[#20273c] rounded-xl flex items-center justify-between text-xs text-zinc-300">
                <span className="text-zinc-400">Software:</span>
                <span className="font-semibold text-purple-300">Adobe Premiere Pro Only</span>
              </div>
              <div className="p-3 bg-[#131724] border border-[#20273c] rounded-xl flex items-center justify-between text-xs text-zinc-300">
                <span className="text-zinc-400">Pricing Range:</span>
                <span className="font-semibold text-emerald-400">$3 to $1000</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGuestEnter}
              className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-purple-900/40 transition-all flex items-center justify-center gap-2"
            >
              <span>Enter Portfolio & Video Galleries</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
