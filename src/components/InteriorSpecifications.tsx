import React, { useState } from 'react';
import { InteriorSpecification } from '../types';
import { Layers, Search, Check, Copy, Printer, Shield, Sparkles, MapPin, Clock, MessageSquare, ArrowUpRight } from 'lucide-react';

interface InteriorSpecificationsProps {
  specifications: InteriorSpecification[];
  onOpenConsultation: () => void;
}

export const InteriorSpecifications: React.FC<InteriorSpecificationsProps> = ({
  specifications,
  onOpenConsultation,
}) => {
  const [selectedTrade, setSelectedTrade] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedSpecModal, setSelectedSpecModal] = useState<InteriorSpecification | null>(null);

  const filteredSpecs = specifications.filter((spec) => {
    const matchesTrade = selectedTrade === 'All' || spec.tradeCategory === selectedTrade;
    const matchesSearch =
      spec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spec.specCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spec.substrateMaterial.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spec.recommendedLocation.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTrade && matchesSearch;
  });

  const handleCopySpec = (spec: InteriorSpecification) => {
    const text = `VEPH INTERIORS TECHNICAL SPECIFICATION\nCode: ${spec.specCode}\nItem: ${spec.title}\nTrade: ${spec.tradeCategory}\nSubstrate: ${spec.substrateMaterial}\nFinish: ${spec.finishSheen}\nTolerances & Fixing: ${spec.tolerancesAndFixing}\nClimate Resistance: ${spec.climateResistance}\nFire Rating: ${spec.fireRating}\nLocation: ${spec.recommendedLocation}\nStudio: Veph Interiors & Exterior, Uyo, Akwa Ibom`;
    navigator.clipboard.writeText(text);
    setCopiedCode(spec.specCode);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handlePrintSchedule = () => {
    window.print();
  };

  return (
    <section id="specifications" className="py-16 border-b border-neutral-200 dark:border-neutral-800 bg-[#FBFBF9] dark:bg-[#0F1115] transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200/80 dark:border-neutral-800/80 pb-6">
          <div className="space-y-2">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#C5A880] flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" />
              <span>Architectural Finishes Schedule</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Interior Specifications & Material Standards
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Precision engineering and material tolerances calibrated for Akwa Ibom coastal humidity, ambient temperatures, and luxury craftsmanship in Uyo.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrintSchedule}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors shadow-sm"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print Spec Sheet</span>
            </button>
            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-[#C5A880] dark:bg-white dark:text-neutral-900 dark:hover:bg-[#C5A880] dark:hover:text-white rounded-lg transition-colors shadow-sm"
            >
              <span>Request Custom Spec</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-2 sm:pb-0 text-xs">
            {['All', 'Joinery & Millwork', 'Ceilings & POP Plaster', 'Flooring & Slabs', 'Lighting & Electrical', 'Fenestration & Textiles'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedTrade(cat)}
                className={`px-3 py-1.5 rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                  selectedTrade === cat
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white font-semibold'
                    : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[260px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search specifications by code or material..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-4 py-1.5 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#C5A880]"
            />
          </div>
        </div>

        {/* Specification Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpecs.map((spec) => (
            <div
              key={spec.id}
              className="group rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm hover:border-[#C5A880]/60 transition-all flex flex-col justify-between"
            >
              {/* Macro Image Preview */}
              <div className="relative h-48 overflow-hidden bg-neutral-950">
                <img
                  src={spec.image}
                  alt={spec.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                
                {/* Spec Code Badge */}
                <div className="absolute top-3 left-3 z-10 px-2.5 py-1 text-xs font-mono font-bold text-white bg-black/75 rounded backdrop-blur-sm border border-white/20">
                  {spec.specCode}
                </div>

                <div className="absolute top-3 right-3 z-10">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#C5A880] text-black">
                    {spec.leadTimeWeeks}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] text-[#C5A880] font-medium block">
                    {spec.tradeCategory}
                  </span>
                  <h3 className="text-base font-bold tracking-tight text-white leading-snug">
                    {spec.title}
                  </h3>
                </div>
              </div>

              {/* Technical Parameters */}
              <div className="p-5 space-y-3.5 text-xs flex-1 flex flex-col justify-between">
                <div className="space-y-2.5 text-neutral-600 dark:text-neutral-300">
                  <div>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100 block text-[11px] uppercase tracking-wider text-neutral-500">
                      Substrate & Material Core:
                    </span>
                    <p className="line-clamp-2 mt-0.5 leading-relaxed">
                      {spec.substrateMaterial}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100 block text-[11px] uppercase tracking-wider text-neutral-500">
                      Finish & Sheen:
                    </span>
                    <p className="line-clamp-1 mt-0.5">
                      {spec.finishSheen}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold text-neutral-900 dark:text-neutral-100 text-[11px]">
                      <Shield className="h-3 w-3 text-[#C5A880]" />
                      <span>Akwa Ibom Climate Standard:</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
                      {spec.climateResistance}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-[#C5A880]" />
                      <span>{spec.recommendedLocation.split(',')[0]}</span>
                    </span>
                    <span className="font-mono-tabular font-medium text-neutral-700 dark:text-neutral-300">
                      {spec.fireRating}
                    </span>
                  </div>
                </div>

                {/* Card Action Row */}
                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleCopySpec(spec)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                  >
                    {copiedCode === spec.specCode ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-medium">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Spec</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`https://wa.me/2348129160273?text=Hello%20Victor,%20I%20would%20like%20to%20specify%20'${spec.specCode}%20-%20${encodeURIComponent(spec.title)}'%20for%20my%20project%20in%20Uyo.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-neutral-100 hover:bg-[#C5A880] text-neutral-900 hover:text-white dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-[#C5A880] rounded-md transition-colors"
                  >
                    <MessageSquare className="h-3 w-3" />
                    <span>Inquire Spec</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Studio Technical Guarantee Banner */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1.5 max-w-2xl">
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#C5A880]" />
              <span>Architectural Specifications for Contractors & Builders</span>
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Are you an architect, quantity surveyor, or homeowner building in Shelter Afrique, Ewet Housing, or Osongama? Veph Interiors & Exterior provides complete, vetted finishes schedules, joinery shop drawings, and on-site tolerance supervision.
            </p>
          </div>

          <a
            href="https://wa.me/2348129160273?text=Hello%20Victor%20Ephraim,%20I%20am%20an%20architect/builder%20requesting%20full%20interior%20specification%20drawings%20for%20an%20Akwa%20Ibom%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-[#C5A880] dark:bg-white dark:text-neutral-900 dark:hover:bg-[#C5A880] dark:hover:text-white rounded-xl transition-all whitespace-nowrap shadow-sm"
          >
            <span>Request Full Spec Schedule (PDF)</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
