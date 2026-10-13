import React, { useState } from 'react';
import { UserSession } from '../types';
import { Mail, ArrowRight, Copy, Check, Upload, Sparkles, Play } from 'lucide-react';

interface HeroProps {
  session: UserSession;
  onOpenHire: () => void;
  onOpenUpload: () => void;
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  session,
  onOpenHire,
  onOpenUpload,
  onExploreWork,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const emailAddress = 'imranmuawiya15@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split-Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 mb-4">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span>PORTFOLIO & STUDIO SHOWCASE</span>
              <span aria-hidden="true">·</span>
              <span className="text-zinc-400">EST. 2025</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 text-balance">
              Precision Video Editing. <br />
              <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                Exclusively in Premiere Pro.
              </span>
            </h1>

            {/* Lead Copy */}
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl mb-8">
              I’m <strong className="text-white font-semibold">Muawiya</strong> — a dedicated video editor with 
              1 year of intensive, non-stop experience cutting exclusively inside <strong className="text-purple-300 font-semibold">Adobe Premiere Pro</strong>.
              Whether you need a <span className="text-emerald-400 font-semibold">$3</span> high-retention viral hook or a full <span className="text-emerald-400 font-semibold">$1,000</span> brand commercial master, I craft frame-accurate edits that keep viewers locked in.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                type="button"
                onClick={onOpenHire}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl shadow-lg shadow-purple-950/60 transition-all cursor-pointer"
              >
                <span>Hire Muawiya ($3–$1000)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onExploreWork}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-zinc-200 bg-[#141824] hover:bg-[#1c2233] border border-[#262e44] rounded-xl transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 text-purple-400 fill-purple-400" />
                <span>Watch Video Previews</span>
              </button>

              {session.isAuthenticatedAdmin && (
                <button
                  type="button"
                  onClick={onOpenUpload}
                  className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-purple-300 bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/40 rounded-xl transition-all cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-purple-400" />
                  <span>Upload Desktop Video</span>
                </button>
              )}
            </div>

            {/* Direct Me Mail Contact Box */}
            <div className="p-3.5 bg-[#10141f] border border-[#1e2538] rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs max-w-xl">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-purple-300">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-zinc-400 block text-[11px]">Direct Editor Inquiries:</span>
                  <a
                    href={`mailto:${emailAddress}`}
                    className="font-medium text-white hover:text-purple-300 transition-colors"
                  >
                    {emailAddress}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#191f30] hover:bg-[#222b42] text-zinc-300 text-xs transition-colors"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${emailAddress}?subject=Video%20Editing%20Inquiry%20for%20Muawiya`}
                  className="px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-200 text-xs font-medium transition-colors"
                >
                  Direct Mail
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Anchor */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden border border-[#252c42] bg-[#111420] shadow-2xl">
              {/* Muawiya portrait image */}
              <img
                src="/src/assets/images/muawiya_editor_portrait_1791926265537.jpg"
                alt="Muawiya - Professional Adobe Premiere Pro Video Editor"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />

              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090b12] via-[#090b12]/30 to-transparent" />

              {/* Overlay Badge for Premiere Pro Only Specialization */}
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#0d101a]/85 backdrop-blur-md border border-[#232a3d] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#5d2e8c] text-purple-200 font-bold flex items-center justify-center text-sm border border-purple-400/40">
                    Pr
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Muawiya</span>
                    <span className="text-[11px] text-zinc-400">100% Dedicated Premiere Pro Workflow</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-emerald-400 font-mono font-semibold block">$3 – $1,000</span>
                  <span className="text-[10px] text-zinc-400">Any Project Scope</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Metric/Trust Strip Below Split (Unboxed Metadata) */}
        <div className="mt-14 pt-8 border-t border-[#1a2030] grid grid-cols-2 sm:grid-cols-4 gap-6 text-center sm:text-left">
          <div>
            <div className="text-2xl font-bold font-mono text-white tracking-tight">1 Year</div>
            <div className="text-xs text-zinc-400 mt-1">Premiere Pro Specialization</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-emerald-400 tracking-tight">$3 to $1000</div>
            <div className="text-xs text-zinc-400 mt-1">Tiered Client Pricing</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-purple-300 tracking-tight">100%</div>
            <div className="text-xs text-zinc-400 mt-1">Adobe Premiere Pro Native</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-cyan-300 tracking-tight">&lt; 24h</div>
            <div className="text-xs text-zinc-400 mt-1">Fast Rush Delivery Ready</div>
          </div>
        </div>
      </div>
    </section>
  );
};
