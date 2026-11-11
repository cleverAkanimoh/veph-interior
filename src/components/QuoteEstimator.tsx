import React, { useState } from 'react';
import { Calculator, Check, MessageSquare, ArrowRight, Sparkles, Building2 } from 'lucide-react';

export const QuoteEstimator: React.FC = () => {
  const [spaceType, setSpaceType] = useState<'Living Area' | 'Master Bedroom Suite' | 'Full Duplex' | 'Commercial Lounge'>('Living Area');
  const [sqm, setSqm] = useState<number>(45);
  const [finishTier, setFinishTier] = useState<'Standard' | 'Premium' | 'Ultra'>('Premium');
  
  // Custom scope toggles
  const [includePopCeiling, setIncludePopCeiling] = useState(true);
  const [includeWallPanelling, setIncludeWallPanelling] = useState(true);
  const [includeLighting, setIncludeLighting] = useState(true);
  const [includeFlooring, setIncludeFlooring] = useState(false);
  const [includeDrapery, setIncludeDrapery] = useState(true);

  // Rate calculations calibrated to Akwa Ibom market in Naira
  const baseRatesPerSqm = {
    Standard: 55000,
    Premium: 95000,
    Ultra: 165000,
  };

  const popRatePerSqm = { Standard: 18000, Premium: 28000, Ultra: 45000 }[finishTier];
  const panellingRatePerSqm = { Standard: 22000, Premium: 38000, Ultra: 65000 }[finishTier];
  const lightingRatePerSqm = { Standard: 12000, Premium: 22000, Ultra: 38000 }[finishTier];
  const flooringRatePerSqm = { Standard: 24000, Premium: 45000, Ultra: 85000 }[finishTier];
  const draperyRatePerSqm = { Standard: 10000, Premium: 18000, Ultra: 32000 }[finishTier];

  // Calculate items
  let materialTotal = sqm * (baseRatesPerSqm[finishTier] * 0.45);
  if (includePopCeiling) materialTotal += sqm * (popRatePerSqm * 0.6);
  if (includeWallPanelling) materialTotal += (sqm * 0.7) * (panellingRatePerSqm * 0.65);
  if (includeLighting) materialTotal += sqm * (lightingRatePerSqm * 0.7);
  if (includeFlooring) materialTotal += sqm * (flooringRatePerSqm * 0.7);
  if (includeDrapery) materialTotal += (sqm * 0.5) * (draperyRatePerSqm * 0.65);

  let laborTotal = materialTotal * 0.35;
  let logisticsUyo = 150000 + (sqm * 3500);
  let grandTotal = Math.round(materialTotal + laborTotal + logisticsUyo);

  const generateWhatsAppMessage = () => {
    const text = `Hello Victor Ephraim & Veph Interiors Team,\n\nI just generated an estimated project quote via your Uyo website:\n- Space: ${spaceType} (${sqm} sqm)\n- Finish Tier: ${finishTier} Luxury\n- Scope: ${includePopCeiling ? 'POP Ceilings, ' : ''}${includeWallPanelling ? 'Fluted Wall Panelling, ' : ''}${includeLighting ? 'Ambient Lighting, ' : ''}${includeFlooring ? 'Tile/Marble Flooring, ' : ''}${includeDrapery ? 'Bespoke Drapery' : ''}\n- Estimated Total: ₦${grandTotal.toLocaleString()}\n\nI would like to schedule a site inspection/consultation in Uyo.`;
    return encodeURIComponent(text);
  };

  return (
    <section id="estimator" className="py-16 border-b border-neutral-200 dark:border-neutral-800 bg-[#FBFBF9] dark:bg-[#0F1115] transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200/80 dark:border-neutral-800/80 pb-6">
          <div className="space-y-2">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#C5A880]">
              Instant Budget Planning
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Uyo Interior Decor Cost Estimator
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Transparent, real-time cost modeling based on prevailing Akwa Ibom artisan rates, timber prices, and imported architectural fixtures.
            </p>
          </div>
          <div className="text-xs text-neutral-500 font-mono-tabular">
            Currency: Nigerian Naira (₦) · Updated Q1 2026
          </div>
        </div>

        {/* Estimator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-sm">
            
            {/* 1. Space Type Selection */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                1. Select Room / Project Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(['Living Area', 'Master Bedroom Suite', 'Full Duplex', 'Commercial Lounge'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setSpaceType(type);
                      if (type === 'Master Bedroom Suite') setSqm(35);
                      if (type === 'Living Area') setSqm(45);
                      if (type === 'Full Duplex') setSqm(180);
                      if (type === 'Commercial Lounge') setSqm(95);
                    }}
                    className={`p-3 text-xs rounded-xl border text-center transition-all ${
                      spaceType === type
                        ? 'border-[#C5A880] bg-[#C5A880]/10 text-neutral-900 dark:text-neutral-100 font-semibold'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Area in Square Meters */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  2. Approximate Floor Area (sqm)
                </label>
                <span className="font-mono-tabular font-bold text-base text-neutral-900 dark:text-neutral-100">
                  {sqm} m²
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="300"
                step="5"
                value={sqm}
                onChange={(e) => setSqm(Number(e.target.value))}
                className="w-full accent-[#C5A880] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-400 font-mono-tabular">
                <span>15 sqm (Studio / Room)</span>
                <span>80 sqm (Standard Salon)</span>
                <span>300 sqm (Grand Villa)</span>
              </div>
            </div>

            {/* 3. Finish & Detailing Tier */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                3. Architectural Detailing Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'Standard', name: 'Executive Modern', desc: 'Precision flat POP ceiling, quality Jotun emulsion, recessed spots, custom media unit.' },
                  { id: 'Premium', name: 'Signature Luxury', desc: 'Curvilinear POP cove, fluted acoustic walnut slats, 24V magnetic lighting, luxury velvet drapes.' },
                  { id: 'Ultra', name: 'Palatial Bespoke', desc: 'Sculptural dropped trays, bookmatched Italian marble, automated curtains, custom brass hardware.' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setFinishTier(tier.id as any)}
                    className={`p-4 rounded-xl border text-left transition-all space-y-1.5 ${
                      finishTier === tier.id
                        ? 'border-[#C5A880] bg-[#C5A880]/10 text-neutral-900 dark:text-white ring-1 ring-[#C5A880]'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-neutral-900 dark:text-neutral-100">{tier.name}</span>
                      {finishTier === tier.id && <Check className="h-3.5 w-3.5 text-[#C5A880]" />}
                    </div>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
                      {tier.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Trade Scope Inclusions */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                4. Select Craft Trades to Include
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  { state: includePopCeiling, setter: setIncludePopCeiling, label: 'POP Ceiling Plasterwork & Coves' },
                  { state: includeWallPanelling, setter: setIncludeWallPanelling, label: 'Fluted Acoustic Wall Panelling' },
                  { state: includeLighting, setter: setIncludeLighting, label: 'Architectural Lighting & Magnetic Rails' },
                  { state: includeFlooring, setter: setIncludeFlooring, label: 'Porcelain or Travertine Flooring' },
                  { state: includeDrapery, setter: setIncludeDrapery, label: 'Custom Floor-to-Ceiling Drapery' },
                ].map((item, idx) => (
                  <label
                    key={idx}
                    className="flex items-center gap-2.5 p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/30 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={item.state}
                      onChange={(e) => item.setter(e.target.checked)}
                      className="rounded accent-[#C5A880] h-4 w-4"
                    />
                    <span className="text-neutral-800 dark:text-neutral-200 font-medium">
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Transparent Cost Breakdown Card (lg:col-span-5) */}
          <div className="lg:col-span-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-sm space-y-6 sticky top-24">
            <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div className="flex items-center gap-1.5 text-xs text-[#C5A880] font-semibold uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Preliminary Bill of Quantities (BOQ)</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                Estimated Project Investment
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                {spaceType} · {sqm} m² · {finishTier} Tier
              </p>
            </div>

            {/* Financial Ledger Breakdown */}
            <div className="space-y-3 text-xs text-neutral-600 dark:text-neutral-300">
              <div className="flex justify-between items-center py-1">
                <span>Material Procurement & Board Stocks</span>
                <span className="font-mono-tabular font-semibold text-neutral-900 dark:text-neutral-100">
                  ₦{Math.round(materialTotal).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span>Master Artisan Labor & Supervision</span>
                <span className="font-mono-tabular font-semibold text-neutral-900 dark:text-neutral-100">
                  ₦{Math.round(laborTotal).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span>Logistics & Site Freight in Uyo</span>
                <span className="font-mono-tabular font-semibold text-neutral-900 dark:text-neutral-100">
                  ₦{Math.round(logisticsUyo).toLocaleString()}
                </span>
              </div>

              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-baseline">
                <div>
                  <span className="text-xs text-neutral-500">Estimated Total Investment</span>
                  <p className="text-xs text-neutral-400">Includes Veph Quality Guarantee</p>
                </div>
                <div className="text-right">
                  <p className="font-mono-tabular text-2xl sm:text-3xl font-extrabold text-[#C5A880]">
                    ₦{grandTotal.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Value Guarantees */}
            <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500 space-y-1">
              <p className="font-semibold text-neutral-800 dark:text-neutral-200">Veph Interior Commitment:</p>
              <p>• Fixed-price contracts with zero hidden site variations.</p>
              <p>• Lead designer Victor Ephraim conducts weekly physical milestone audits.</p>
              <p>• Complete 12-month structural joinery & plaster warranty.</p>
            </div>

            {/* Primary Action Button: Direct WhatsApp Pre-fill */}
            <a
              href={`https://wa.me/2348129160273?text=${generateWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-neutral-900 hover:bg-[#C5A880] dark:bg-white dark:text-neutral-900 dark:hover:bg-[#C5A880] dark:hover:text-white rounded-xl transition-all shadow-md"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Send Estimate to Victor on WhatsApp</span>
            </a>

            <p className="text-[11px] text-center text-neutral-400">
              Direct line: +234 812 916 0273 · Studio at Idongesit Ntem Isua Ave, Uyo
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
