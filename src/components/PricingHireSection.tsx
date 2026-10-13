import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, Sliders, DollarSign, Clock, Shield } from 'lucide-react';

interface PricingHireSectionProps {
  onSelectBudget: (amount: number, packageName: string) => void;
}

export const PricingHireSection: React.FC<PricingHireSectionProps> = ({ onSelectBudget }) => {
  const [customBudget, setCustomBudget] = useState<number>(50);

  const getTierInfo = (budget: number) => {
    if (budget <= 15) {
      return {
        name: 'Micro-Hook / TikTok Polish',
        turnaround: '12 – 24 Hours',
        scope: 'Single short reel (up to 30s), hook speed curve, dynamic subtitle pop, audio hitpoints.',
        features: [
          'First 3-second viral hook pacing',
          'Sound effects and hit drops',
          'Auto-reframe to vertical 9:16',
          'Export in 1080p 60fps',
          '1 fast revision cycle',
        ],
      };
    } else if (budget <= 75) {
      return {
        name: 'YouTube Standard & Shorts Pack',
        turnaround: '24 – 48 Hours',
        scope: 'Up to 5 minutes YouTube cut or 3x high-retention Reels with Lumetri color correction.',
        features: [
          'Multi-take jump cut tightening',
          'Custom Premiere Pro text animations',
          'Essential Sound dialogue cleanup',
          'B-Roll placement and whip zooms',
          'Thumbnail frame export included',
          '2 revision rounds',
        ],
      };
    } else if (budget <= 250) {
      return {
        name: 'Cinematic Longform & Multi-Cam',
        turnaround: '2 – 3 Days',
        scope: 'Up to 15 minutes documentary / podcast / cinematic vlog with multi-cam sync.',
        features: [
          'Full Lumetri Color Grade (Teal/Orange or Custom LUT)',
          'Multi-mic spectral noise reduction',
          'Custom lower-thirds & motion titles',
          'Narrative pacing & chapter markers',
          'Social media promo cut included',
          'Unlimited revisions until sign-off',
        ],
      };
    } else if (budget <= 600) {
      return {
        name: 'Commercial & High-Impact Ad',
        turnaround: '3 – 5 Days',
        scope: 'Broadcast-quality 30-60s brand commercial, product launch ad, or dynamic music video cut.',
        features: [
          'Frame-by-frame rhythm sync & beat matching',
          'Advanced time-remapping & optical flow',
          'Full audio mastering & licensed SFX layers',
          'Delivered in 16:9, 9:16, and 1:1 aspect ratios',
          'Color matched to brand guidelines',
          'Dedicated priority communication',
        ],
      };
    } else {
      return {
        name: 'Master Brand Retainer Suite',
        turnaround: 'Priority Same-Day & Dedicated Queue',
        scope: 'Complete monthly video editing partnership or heavy documentary series master.',
        features: [
          'Up to 12 full videos or 30 high-impact shorts',
          'Direct Premiere Pro project files (.prproj) delivered',
          'Full master 4K ProRes 422 delivery',
          'Custom motion graphics templates (MOGRTs)',
          'VIP direct contact via WhatsApp & Email',
          'Unlimited revisions & instant turnaround',
        ],
      };
    }
  };

  const currentTier = getTierInfo(customBudget);

  const predefinedPackages = [
    {
      price: 3,
      title: 'Micro-Hook Test Cut',
      desc: 'Ideal for trying out pacing on 1 short video clip.',
      turnaround: '24 Hours',
      features: ['Up to 15s hook edit', 'Sound FX sync', 'Subtitle styling'],
    },
    {
      price: 25,
      title: 'Viral Short / Reel',
      desc: 'High-retention 60-second vertical video for TikTok & IG.',
      turnaround: '24 Hours',
      features: ['Full 60s reel', 'Lumetri Color pop', 'Sound design & zooms', '2 revisions'],
      isPopular: true,
    },
    {
      price: 150,
      title: 'Cinematic YouTube',
      desc: 'Polished 8–12 min YouTube video with narrative pacing.',
      turnaround: '48 Hours',
      features: ['Full 10-min pacing', 'Lumetri color grade', 'Dialogue cleanup', 'B-roll timing'],
    },
    {
      price: 1000,
      title: 'Master Enterprise',
      desc: 'Full-scale monthly retainer or commercial master suite.',
      turnaround: 'Priority Queue',
      features: ['Monthly content engine', 'Source .prproj files', '4K master delivery', 'VIP support'],
    },
  ];

  return (
    <section id="pricing" className="py-16 lg:py-24 bg-[#0a0c13] border-t border-[#181d2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-purple-400 mb-2">
            TRANSPARENT CLIENT PRICING
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Flexible Rates from $3 to $1,000
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 leading-relaxed">
            Whether you want a quick $3 test cut to evaluate my Premiere Pro editing style or a comprehensive $1,000 commercial brand retainer, you get the same frame-accurate dedication.
          </p>
        </div>

        {/* Dynamic Interactive Slider ($3 - $1000) */}
        <div className="p-6 sm:p-8 bg-[#101421] border border-[#21293e] rounded-2xl mb-14 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono text-purple-400 block mb-1">
                INTERACTIVE BUDGET ESTIMATOR
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Set Your Project Budget ($3 – $1,000)
              </h3>
            </div>
            <div className="px-5 py-3 rounded-xl bg-purple-950/60 border border-purple-500/40 text-center sm:text-right">
              <span className="text-xs text-zinc-400 block">Selected Budget:</span>
              <span className="text-3xl font-extrabold font-mono text-emerald-400">
                ${customBudget}
              </span>
            </div>
          </div>

          {/* Range Slider */}
          <div className="mb-6">
            <input
              type="range"
              min="3"
              max="1000"
              step="1"
              value={customBudget}
              onChange={(e) => setCustomBudget(parseInt(e.target.value, 10))}
              className="w-full accent-purple-500 h-2.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-zinc-400 mt-2">
              <span>$3 (Micro-Cut)</span>
              <span>$50</span>
              <span>$250</span>
              <span>$600</span>
              <span>$1,000 (Master Suite)</span>
            </div>
          </div>

          {/* Live Calculated Package Box */}
          <div className="p-5 bg-[#141928] border border-[#232c44] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-purple-300 bg-purple-900/50 px-2 py-0.5 rounded border border-purple-500/30">
                  {currentTier.name}
                </span>
                <span className="text-xs text-zinc-400">
                  Turnaround: <strong className="text-white">{currentTier.turnaround}</strong>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300">
                {currentTier.scope}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-2">
                {currentTier.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="shrink-0 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => onSelectBudget(customBudget, currentTier.name)}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-lg shadow-purple-900/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Hire at ${customBudget} Budget</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-[11px] text-zinc-400 text-center">
                Adobe Premiere Pro Exclusive
              </span>
            </div>
          </div>
        </div>

        {/* Curated Package Tiers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {predefinedPackages.map((pkg, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl flex flex-col justify-between transition-all ${
                pkg.isPopular
                  ? 'bg-[#131726] border-2 border-purple-500 shadow-xl shadow-purple-950/40 relative'
                  : 'bg-[#0f121d] border border-[#20273a] hover:border-[#2e3752]'
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-bold uppercase tracking-wider">
                  Most Requested
                </div>
              )}

              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="text-base font-bold text-white">{pkg.title}</h4>
                  <span className="text-2xl font-extrabold font-mono text-emerald-400">
                    ${pkg.price}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 mb-4 min-h-[32px]">
                  {pkg.desc}
                </p>

                <div className="text-[11px] font-mono text-purple-300 mb-4 pb-3 border-b border-[#1c2234]">
                  Turnaround: {pkg.turnaround}
                </div>

                <ul className="space-y-2 mb-6">
                  {pkg.features.map((item, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-xs text-zinc-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => onSelectBudget(pkg.price, pkg.title)}
                className={`w-full py-2.5 px-4 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  pkg.isPopular
                    ? 'bg-purple-600 hover:bg-purple-500 text-white'
                    : 'bg-[#181d2c] hover:bg-[#20273c] text-zinc-200'
                }`}
              >
                Book Package (${pkg.price})
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
