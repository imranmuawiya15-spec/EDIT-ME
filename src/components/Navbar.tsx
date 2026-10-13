import React from 'react';
import { UserSession } from '../types';
import { Lock, Unlock, Mail, PlusCircle, Inbox } from 'lucide-react';

interface NavbarProps {
  session: UserSession;
  onOpenAuth: (mode?: 'admin' | 'guest') => void;
  onLogout: () => void;
  onOpenUpload: () => void;
  onOpenInbox: () => void;
  onOpenHire: () => void;
  unreadCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  session,
  onOpenAuth,
  onLogout,
  onOpenUpload,
  onOpenInbox,
  onOpenHire,
  unreadCount = 0,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#080a0f]/90 backdrop-blur-md border-b border-[#1b2030]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a href="#" className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group">
          <div className="w-8 h-8 rounded-md bg-[#5d2e8c] text-purple-200 font-bold flex items-center justify-center text-sm border border-purple-400/40 shadow-sm group-hover:scale-105 transition-transform">
            Pr
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight text-white uppercase group-hover:text-purple-300 transition-colors">
              MUAWIYA
            </span>
          </div>
        </a>

        {/* Zone 2: Nav Links (Clean unboxed text links) */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-300">
          <a
            href="#galleries"
            className="hover:text-purple-400 transition-colors whitespace-nowrap shrink-0"
          >
            Video Galleries
          </a>
          <a
            href="#experience"
            className="hover:text-purple-400 transition-colors whitespace-nowrap shrink-0"
          >
            Premiere Pro Spec
          </a>
          <a
            href="#pricing"
            className="hover:text-purple-400 transition-colors whitespace-nowrap shrink-0"
          >
            Pricing ($3–$1000)
          </a>
          <a
            href="#contact"
            className="hover:text-purple-400 transition-colors whitespace-nowrap shrink-0"
          >
            Direct Mail
          </a>
        </nav>

        {/* Zone 3: Primary Action + Admin Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          {session.isAuthenticatedAdmin ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenUpload}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-purple-200 bg-purple-900/40 hover:bg-purple-900/70 border border-purple-500/40 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <PlusCircle className="w-3.5 h-3.5 text-purple-400" />
                <span>Upload Preview</span>
              </button>

              <button
                type="button"
                onClick={onOpenInbox}
                className="relative inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-200 bg-[#151926] hover:bg-[#1e2335] border border-[#272f44] rounded-lg transition-colors whitespace-nowrap shrink-0"
                title="Client Messages Inbox"
              >
                <Inbox className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">Client Inquiries</span>
                {unreadCount > 0 && (
                  <span className="w-4 h-4 bg-purple-600 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={onLogout}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-zinc-400 hover:text-rose-400 transition-colors whitespace-nowrap shrink-0"
                title="Sign out of Admin mode"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onOpenAuth('admin')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 bg-[#121520] hover:bg-[#181d2c] border border-[#23293c] rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Lock className="w-3 h-3 text-purple-400" />
              <span>Admin Login</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenHire}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg shadow-sm shadow-purple-950 transition-all whitespace-nowrap shrink-0"
          >
            Hire Muawiya
          </button>
        </div>
      </div>
    </header>
  );
};
