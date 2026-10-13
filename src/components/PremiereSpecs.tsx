import React from 'react';
import { Sliders, Volume2, Cpu, Sparkles, Layers, Zap } from 'lucide-react';

export const PremiereSpecs: React.FC = () => {
  return (
    <section id="experience" className="py-16 bg-[#0a0c13] border-y border-[#171b29]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-purple-400 mb-2">
            SPECIALIZED CRAFT & PIPELINE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why I Edit Exclusively in Adobe Premiere Pro
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 leading-relaxed">
            In my 1 year of professional editing, I made a deliberate choice: master one industry-standard tool to absolute perfection rather than spreading thin across five apps. Every cut, transition, and grade is engineered directly within Premiere Pro.
          </p>
        </div>

        {/* Bento Grid Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Visual Feature Card */}
          <div className="lg:col-span-7 bg-[#10131e] border border-[#22293d] rounded-2xl overflow-hidden flex flex-col justify-between">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-mono text-purple-300 mb-3">
                <Sliders className="w-4 h-4 text-purple-400" />
                <span>LUMETRI COLOR & SCOPES PIPELINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Cinematic Color Grading & Curve Control
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl">
                Every project undergoes rigorous waveform, parade, and vectorscope analysis. From moody teal & orange cinematic looks to clean commercial skin tones, your footage looks broadcast-ready.
              </p>
            </div>
            <div className="relative aspect-video w-full overflow-hidden border-t border-[#1e2436] bg-[#0c0e17]">
              <img
                src="/src/assets/images/premiere_timeline_scopes_1791926265587.jpg"
                alt="Adobe Premiere Pro Lumetri Color Scopes Interface"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10131e] via-transparent to-transparent opacity-80" />
            </div>
          </div>

          {/* Side Feature Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Audio ducking */}
            <div className="p-6 bg-[#10131e] border border-[#22293d] rounded-2xl flex-1 flex flex-col justify-center">
              <div className="w-9 h-9 rounded-lg bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
                <Volume2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">
                Sound Design & Auto-Ducking
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Clear dialogue leveling, ambient room tone removal, punchy bass risers, and impact sound effects timed frame-by-frame on your footage.
              </p>
              <div className="mt-3 pt-3 border-t border-[#1c2234] text-[11px] text-zinc-500 font-mono">
                Essential Sound Panel · High-Pass Filter · EQ Mastering
              </div>
            </div>

            {/* Pacing and speed ramping */}
            <div className="p-6 bg-[#10131e] border border-[#22293d] rounded-2xl flex-1 flex flex-col justify-center">
              <div className="w-9 h-9 rounded-lg bg-purple-950/50 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">
                High-Retention Pacing & Speed Curves
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Bezier speed ramping and rhythm-based cuts keep viewer drop-off under 15% in the first 5 seconds of TikTok, Reels, and YouTube shorts.
              </p>
              <div className="mt-3 pt-3 border-t border-[#1c2234] text-[11px] text-zinc-500 font-mono">
                Time Remapping · Optical Flow · Whip Zoom Presets
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
