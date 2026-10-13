import React, { useState } from 'react';
import { UserSession } from '../types';
import { Mail, Copy, Check, Lock, ShieldCheck, Heart } from 'lucide-react';
import { ADMIN_EMAIL } from '../utils/storage';

interface FooterProps {
  session: UserSession;
  onOpenAuth: (mode?: 'admin' | 'guest') => void;
  onOpenHire: () => void;
}

export const Footer: React.FC<FooterProps> = ({ session, onOpenAuth, onOpenHire }) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(ADMIN_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="bg-[#06080d] border-t border-[#161a27] py-16 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#151926]">
          {/* Brand & Editor Bio */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#5d2e8c] text-purple-200 font-bold flex items-center justify-center text-sm border border-purple-400/30">
                Pr
              </div>
              <span className="text-lg font-extrabold tracking-tight text-white">
                MUAWIYA
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              Professional video editor with 1 year of specialized, high-tempo experience cutting exclusively in 
              <strong className="text-white"> Adobe Premiere Pro</strong>. Available for YouTube, TikTok, Reels, gaming montages, and commercial projects.
            </p>

            <div className="pt-1 text-xs text-zinc-500 font-mono">
              Rates: $3 to $1000 · High-Retention Pacing · 4K Lumetri Grade
            </div>
          </div>

          {/* Direct Email Action */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Direct Contact & Mail
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Email your footage links, project deadlines, or raw scripts directly to Muawiya:
            </p>

            <div className="p-3 bg-[#0d101a] border border-[#1d2334] rounded-xl flex items-center justify-between gap-2">
              <a
                href={`mailto:${ADMIN_EMAIL}`}
                className="text-xs font-medium text-white hover:text-purple-300 transition-colors truncate"
              >
                {ADMIN_EMAIL}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="p-1.5 rounded-lg bg-[#161b2a] hover:bg-[#20273c] text-zinc-300 transition-colors shrink-0"
                title="Copy email to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div>
              <button
                type="button"
                onClick={onOpenHire}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
              >
                Book a Project ($3–$1000)
              </button>
            </div>
          </div>

          {/* Admin Access & Verification */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Studio Portal Access
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {session.isAuthenticatedAdmin
                ? 'Currently signed in with authorized administrator privileges as Muawiya.'
                : 'Admin access is restricted to Muawiya to upload desktop previews and receive hire messages.'}
            </p>

            {session.isAuthenticatedAdmin ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Studio Active</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => onOpenAuth('admin')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141824] hover:bg-[#1d2335] border border-[#232a3e] text-zinc-300 hover:text-white text-xs font-medium transition-colors"
              >
                <Lock className="w-3.5 h-3.5 text-purple-400" />
                <span>Admin Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div>
            © {new Date().getFullYear()} Muawiya. All edits crafted inside Adobe Premiere Pro.
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>Name: Muawiya</span>
            <span>·</span>
            <span>1 Year Experience</span>
            <span>·</span>
            <span>Premiere Pro Only</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
