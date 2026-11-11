import React from 'react';
import { ArrowRight, Compass, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onExplorePortfolio: () => void;
  onOpenTracker: () => void;
  onOpenConsultation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplorePortfolio,
  onOpenTracker,
  onOpenConsultation,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-neutral-200 dark:border-neutral-800 bg-[#FBFBF9] dark:bg-[#0F1115] transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Split Hero: Left Column Typography, Right Column Visual Anchor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* Left Column (lg:col-span-6) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Quiet unboxed kicker */}
              <div className="flex items-center gap-2 text-xs uppercase font-semibold tracking-widest text-[#C5A880]">
                <span>Interior & Exterior Architecture</span>
                <span aria-hidden="true">·</span>
                <span>Uyo, Akwa Ibom</span>
              </div>

              {/* Display Headline with balanced wrapping */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 leading-[1.15]" style={{ textWrap: 'balance' }}>
                Sculpting Bespoke Elegance & Precision Fit-Outs Across Akwa Ibom.
              </h1>

              {/* Editorial Narrative */}
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl">
                Founded by Victor Ephraim, <strong className="font-semibold text-neutral-900 dark:text-neutral-100">Veph Interiors & Exterior</strong> combines architectural POP plasterwork, bespoke artisan millwork, and climate-resilient finishes to deliver spaces of timeless serenity in Shelter Afrique, Ewet Housing, and Osongama.
              </p>
            </div>

            {/* Studio Action Row */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExplorePortfolio}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-neutral-900 hover:bg-[#C5A880] dark:bg-white dark:text-neutral-900 dark:hover:bg-[#C5A880] dark:hover:text-white rounded-lg transition-colors shadow-sm"
              >
                <span>View Selected Works</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onOpenTracker}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700/80 rounded-lg border border-neutral-200 dark:border-neutral-700 transition-colors"
              >
                <Compass className="h-4 w-4 text-[#C5A880]" />
                <span>Live Project Tracker</span>
              </button>
            </div>

            {/* Studio Location & Director Badge */}
            <div className="border-t border-neutral-200/70 dark:border-neutral-800/70 pt-4 flex flex-wrap items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 gap-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">Studio HQ:</span>
                <span>Idongesit Ntem Isua Ave, Uyo</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-[#C5A880]" />
                <span>Direct Site Oversight by Victor Ephraim</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Anchor */}
          <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-full rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 group shadow-lg">
            <img
              src="/src/assets/images/hero_interior_uyo_1794399891616.jpg"
              alt="Veph Interiors living room design in Uyo with sculptural POP ceiling and travertine floor"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Measured Scrim for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            
            <div className="absolute bottom-5 left-5 right-5 text-white flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#C5A880] font-medium">Flagship Residence</p>
                <h3 className="text-lg font-semibold tracking-tight">The Grand Villa at Shelter Afrique</h3>
                <p className="text-xs text-neutral-300 mt-0.5">Curvilinear POP Plasterwork · Italian Travertine · 3000K Ambient Cove</p>
              </div>
              <button
                onClick={onOpenConsultation}
                className="hidden sm:inline-flex px-3.5 py-1.5 text-xs font-medium text-black bg-[#C5A880] rounded hover:bg-[#d6b991] transition-colors whitespace-nowrap shrink-0"
              >
                Inquire Space
              </button>
            </div>
          </div>

        </div>

        {/* Full-width 4-Column Proof Row below Hero Split */}
        <div className="mt-12 pt-8 border-t border-neutral-200/80 dark:border-neutral-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-1">
            <p className="font-mono-tabular text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
              ₦240M+
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Total Project Value Executed in Akwa Ibom</p>
          </div>

          <div className="space-y-1">
            <p className="font-mono-tabular text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
              52+
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Completed Fit-Outs & Exterior Renovations</p>
          </div>

          <div className="space-y-1">
            <p className="font-mono-tabular text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
              98.4%
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">On-Time Client Handover Rate</p>
          </div>

          <div className="space-y-1">
            <p className="font-mono-tabular text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
              100%
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Direct Supervised Craftsmanship in Uyo</p>
          </div>
        </div>

      </div>
    </section>
  );
};
