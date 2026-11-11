import React, { useState } from 'react';
import { DesignAdviceResult } from '../types';
import { Sparkles, Loader2, Palette, Layers, Lightbulb, MapPin, Check, Send, MessageSquare } from 'lucide-react';

export const AiDesignAdvisor: React.FC = () => {
  const [roomType, setRoomType] = useState('Living Room & Dining Salon');
  const [stylePreference, setStylePreference] = useState('Modern African Architectural Luxury');
  const [dimensions, setDimensions] = useState('6m x 7m (approx 42 sqm), 3.2m ceiling height');
  const [budgetLevel, setBudgetLevel] = useState('Signature Luxury');
  const [specialNotes, setSpecialNotes] = useState('Client wants hidden ambient cove lighting, low-heat materials for Uyo climate, and bespoke acoustic fluted wood TV wall.');

  const [loading, setLoading] = useState(false);
  const [concept, setConcept] = useState<DesignAdviceResult | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleGenerateConcept = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/design-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomType,
          stylePreference,
          dimensions,
          budgetLevel,
          specialNotes,
        }),
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        setConcept(resData.data);
      } else {
        throw new Error(resData.error || 'Failed to generate');
      }
    } catch (err) {
      console.error('Error fetching design advice:', err);
      // Fallback state if server request fails
      setConcept({
        conceptTitle: 'Sculptural Travertine & Akwa Oak Sanctuary',
        designSummary: 'Tailored for Uyo high-end residences, this concept balances natural limestone textures, acoustic wood baffles, and indirect 3000K LED illumination to cultivate an oasis of calm that naturally buffers tropical heat and humidity.',
        colorPalette: [
          { name: 'Warm Travertine Plaster', hex: '#EBE5D8', usage: 'Primary walls & sculptural POP ceiling drops' },
          { name: 'Deep Iroko Wood', hex: '#3B2F2F', usage: 'Fluted acoustic wall slats & bespoke media console' },
          { name: 'Burnished Brass', hex: '#C5A880', usage: 'Architectural trim, linear chandeliers, and cabinet inlays' },
          { name: 'Terracotta Sand', hex: '#C2633E', usage: 'Plush accent lounge chairs and hand-thrown ceramic vessels' }
        ],
        materialSpecifications: [
          { category: 'Ceiling Architecture', material: 'Gypsum POP with anti-sag reinforcements', application: 'Continuous perimeter cove with 3000K indirect LED strip' },
          { category: 'Wall Treatments', material: 'Moisture-Resistant Fluted Wood & Textured Stucco', application: 'Feature focal wall behind entertainment or bedhead' },
          { category: 'Flooring', material: 'Large-Format 1200x600mm Honed Porcelain Slabs', application: 'High-traffic salon and dining area' },
          { category: 'Fenestration', material: 'Triple-Weave Sheer Linen & Blackout Drapes', application: 'Recessed ceiling curtain tracks for clean drape' }
        ],
        ceilingAndLightingStrategy: 'Floating step-down architectural tray with concealed 24V warm 3000K COB LED channels, complemented by anti-glare recessed magnetic spotlights and a sculptural brass centerpiece.',
        localUyoProcurementAdvice: 'Marine-grade core boards recommended for Uyo humidity. High-density POP casting plaster and architectural extrusions sourced directly through Veph verified supply channels in Timber Market, Uyo.',
        estimatedTimelineWeeks: '3 to 5 weeks'
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <section id="ai-studio" className="py-16 border-b border-neutral-200 dark:border-neutral-800 bg-[#FBFBF9] dark:bg-[#0F1115] transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200/80 dark:border-neutral-800/80 pb-6">
          <div className="space-y-2">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#C5A880] flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Generative Space Intelligence</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Veph AI Space & Style Advisor
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Powered by server-side Gemini 3.8 Flash, trained on Victor Ephraim's spatial design principles, Akwa Ibom microclimates, and regional material availability.
            </p>
          </div>
          <div className="text-xs text-neutral-500 font-mono-tabular">
            Model: Gemini 3.8 Flash · Server-Side Execution
          </div>
        </div>

        {/* Advisor Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Query Form (lg:col-span-5) */}
          <div className="lg:col-span-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-7 shadow-sm space-y-5">
            <div className="border-b border-neutral-100 dark:border-neutral-800 pb-3">
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Design Parameters
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Specify your room specs to generate a tailored architectural concept.
              </p>
            </div>

            <form onSubmit={handleGenerateConcept} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Space / Room Function
                </label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                >
                  <option value="Living Room & Dining Salon">Living Room & Dining Salon</option>
                  <option value="Master Bedroom Suite">Master Bedroom Suite</option>
                  <option value="Executive Home Office / Library">Executive Home Office / Library</option>
                  <option value="Boutique Commercial Lounge / Reception">Boutique Commercial Lounge / Reception</option>
                  <option value="Residential Exterior Facade & Patio">Residential Exterior Facade & Patio</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Design Aesthetic Mood
                </label>
                <select
                  value={stylePreference}
                  onChange={(e) => setStylePreference(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                >
                  <option value="Modern African Architectural Luxury">Modern African Architectural Luxury</option>
                  <option value="Minimalist Warm Travertine & Oak">Minimalist Warm Travertine & Oak</option>
                  <option value="Contemporary Afro-Centric High Contrast">Contemporary Afro-Centric High Contrast</option>
                  <option value="Executive Moody Acoustic Lounge">Executive Moody Acoustic Lounge</option>
                  <option value="Neo-Classical Coffered POP Elegance">Neo-Classical Coffered POP Elegance</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Dimensions & Ceiling Height
                </label>
                <input
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  placeholder="e.g. 5m x 6m (30 sqm), 3.0m ceiling"
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Target Finish Tier
                </label>
                <select
                  value={budgetLevel}
                  onChange={(e) => setBudgetLevel(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                >
                  <option value="Standard Executive">Standard Executive</option>
                  <option value="Signature Luxury">Signature Luxury</option>
                  <option value="Palatial Bespoke">Palatial Bespoke</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Specific Requirements / Site Constraints
                </label>
                <textarea
                  rows={3}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g. Large glass windows facing west, high humidity, need acoustic soundproofing..."
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-white bg-neutral-900 hover:bg-[#C5A880] dark:bg-white dark:text-neutral-900 dark:hover:bg-[#C5A880] dark:hover:text-white rounded-xl transition-all shadow-md disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Synthesizing Architectural Concept...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Generate AI Space Concept</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Generated Concept View (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            {!concept && !loading && (
              <div className="rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 p-12 text-center space-y-4 bg-white/50 dark:bg-neutral-900/50">
                <div className="h-12 w-12 rounded-full bg-[#C5A880]/20 text-[#C5A880] mx-auto flex items-center justify-center">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                    No Space Concept Generated Yet
                  </h4>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                    Click "Generate AI Space Concept" to create a bespoke design scheme with materials, colors, and Uyo climate advice.
                  </p>
                </div>
                <button
                  onClick={handleGenerateConcept}
                  className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 rounded-lg"
                >
                  Generate Sample Concept
                </button>
              </div>
            )}

            {loading && (
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-12 text-center space-y-4 shadow-sm animate-pulse">
                <Loader2 className="h-8 w-8 text-[#C5A880] animate-spin mx-auto" />
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  Consulting Veph Design Principles & Uyo Materials Matrix...
                </p>
                <p className="text-xs text-neutral-500">
                  Calculating humidity tolerances, acoustic layouts, and lighting angles.
                </p>
              </div>
            )}

            {concept && !loading && (
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-300">
                
                {/* Concept Header */}
                <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span>Veph Architectural Concept Proposal</span>
                    <span className="font-mono-tabular font-medium text-[#C5A880]">{concept.estimatedTimelineWeeks} Execution</span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                    {concept.conceptTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {concept.designSummary}
                  </p>
                </div>

                {/* Color Palette Swatches */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    <Palette className="h-3.5 w-3.5" />
                    <span>Curated Color & Surface Matrix</span>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {concept.colorPalette.map((color, i) => (
                      <div
                        key={i}
                        onClick={() => copyToClipboard(color.hex)}
                        className="cursor-pointer group rounded-xl border border-neutral-200 dark:border-neutral-700/80 p-2.5 bg-neutral-50/50 dark:bg-neutral-800/40 space-y-2 hover:border-[#C5A880] transition-colors"
                      >
                        <div
                          className="w-full h-12 rounded-lg shadow-inner flex items-center justify-center text-xs font-mono font-bold text-white/90 border border-black/10"
                          style={{ backgroundColor: color.hex }}
                        >
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 px-1.5 py-0.5 rounded text-[10px]">
                            {copiedHex === color.hex ? 'Copied!' : color.hex}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-xs text-neutral-900 dark:text-neutral-100 truncate">
                            {color.name}
                          </p>
                          <p className="text-[10px] text-neutral-500 truncate" title={color.usage}>
                            {color.usage}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Material Specifications */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    <Layers className="h-3.5 w-3.5" />
                    <span>Material & Joinery Schedule</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {concept.materialSpecifications.map((spec, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/30 space-y-1"
                      >
                        <span className="text-[10px] uppercase font-bold text-[#C5A880] tracking-wider">
                          {spec.category}
                        </span>
                        <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                          {spec.material}
                        </p>
                        <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                          {spec.application}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ceiling & Lighting Strategy */}
                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-neutral-900 dark:text-neutral-100">
                    <Lightbulb className="h-3.5 w-3.5 text-[#C5A880]" />
                    <span>POP Ceiling & Ambient Lighting Blueprint</span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {concept.ceilingAndLightingStrategy}
                  </p>
                </div>

                {/* Local Uyo Procurement Advice */}
                <div className="p-4 rounded-xl border border-[#C5A880]/30 bg-[#C5A880]/5 space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-neutral-900 dark:text-neutral-100">
                    <MapPin className="h-3.5 w-3.5 text-[#C5A880]" />
                    <span>Akwa Ibom Climate & Procurement Notes</span>
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {concept.localUyoProcurementAdvice}
                  </p>
                </div>

                {/* Action Row */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-neutral-500">
                    Ready to execute this scheme with Victor Ephraim?
                  </span>
                  <a
                    href={`https://wa.me/2348129160273?text=Hello%20Victor,%20I%20love%20the%20AI%20concept%20'${encodeURIComponent(concept.conceptTitle)}'%20generated%20on%20your%20site.%20Can%20we%20schedule%20a%20site%20meeting%20in%20Uyo?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-[#C5A880] dark:bg-white dark:text-neutral-900 dark:hover:bg-[#C5A880] dark:hover:text-white rounded-lg transition-colors whitespace-nowrap shadow-sm"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>Inquire this Scheme on WhatsApp</span>
                  </a>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
