import React, { useState } from 'react';
import { PortfolioProject } from '../types';
import { Eye, X, Layers, Maximize2, SplitSquareVertical } from 'lucide-react';

interface PortfolioShowcaseProps {
  projects: PortfolioProject[];
  onSelectProjectForEstimate?: (project: PortfolioProject) => void;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({
  projects,
}) => {
  const [filter, setFilter] = useState<'All' | 'Residential' | 'Commercial' | 'Exterior'>('All');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-16 border-b border-neutral-200 dark:border-neutral-800 bg-[#FBFBF9] dark:bg-[#0F1115] transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200/80 dark:border-neutral-800/80 pb-6">
          <div className="space-y-2">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#C5A880]">
              Design Portfolio & Case Studies
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Curated Architectural Commissions
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl">
              From landmark private residences in Shelter Afrique to executive hospitality and exterior transformations in Uyo.
            </p>
          </div>

          {/* Filter Bar (Functional Buttons) */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-200/70 dark:bg-neutral-900 rounded-lg border border-neutral-300/60 dark:border-neutral-800 self-start md:self-auto">
            {(['All', 'Residential', 'Commercial', 'Exterior'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  filter === cat
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Interactive Before/After Renovation Slider */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/80 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-3">
            <div className="flex items-center gap-2">
              <SplitSquareVertical className="h-4 w-4 text-[#C5A880]" />
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                Interactive Space Transformation: Before & After Fit-Out
              </h3>
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              Drag slider to view structural finish vs. pre-renovation shell
            </div>
          </div>

          {/* Slider Container */}
          <div className="relative w-full h-[360px] sm:h-[460px] rounded-xl overflow-hidden select-none bg-neutral-950">
            {/* After Image (Full width background) */}
            <img
              src="/src/assets/images/before_after_renovation_1794399893307.jpg"
              alt="After Veph Interiors executive suite fitout"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 z-10 px-3 py-1 text-xs font-semibold bg-neutral-900/80 text-white rounded backdrop-blur-sm border border-neutral-700">
              Finished: Bespoke Veph Executive Lounge
            </div>

            {/* Before Image (Clipped by slider position) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src="/src/assets/images/hero_interior_uyo_1794399891616.jpg"
                alt="Before spatial condition"
                className="absolute inset-0 w-full h-full object-cover filter contrast-125 sepia-[0.3]"
                style={{ width: '100%', minWidth: '100%' }}
              />
              <div className="absolute top-4 left-4 z-10 px-3 py-1 text-xs font-semibold bg-black/80 text-amber-300 rounded backdrop-blur-sm border border-neutral-700">
                Base Architectural Shell
              </div>
            </div>

            {/* Draggable Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 flex items-center justify-center shadow-2xl"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-white text-neutral-900 shadow-xl flex items-center justify-center text-xs font-bold -translate-x-0.5 border border-neutral-300">
                ↔
              </div>
            </div>

            {/* Invisible Range Input for natural touch & mouse dragging */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              aria-label="Drag to compare before and after transformation"
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 pt-1">
            <span>Ewet Housing Corporate Lounge · Acoustic Wood Wall & Linear Lighting</span>
            <span className="font-mono-tabular">Drag left/right to inspect detail</span>
          </div>
        </div>

        {/* Bento Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const isLarge = idx === 0;
            return (
              <div
                key={project.id}
                onClick={() => setActiveProject(project)}
                className={`group cursor-pointer rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-all hover:border-[#C5A880]/60 hover:shadow-lg flex flex-col justify-between ${
                  isLarge ? 'md:col-span-2' : ''
                }`}
              >
                {/* Image Container */}
                <div className={`relative overflow-hidden bg-neutral-100 dark:bg-neutral-950 ${isLarge ? 'h-72 sm:h-80' : 'h-64'}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                  
                  {/* Category Pill Tag Replacement -> Clean Unboxed Header */}
                  <div className="absolute top-4 left-4 z-10 px-2.5 py-1 text-xs font-medium text-white/90 bg-black/60 rounded backdrop-blur-sm">
                    {project.category}
                  </div>

                  <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-black/80 backdrop-blur-sm rounded-md border border-white/20">
                      <Maximize2 className="h-3.5 w-3.5" />
                      <span>Inspect Project</span>
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-16 text-white">
                    <div className="text-xs text-neutral-300 flex items-center gap-1.5">
                      <span>{project.location}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.year}</span>
                    </div>
                    <h3 className="text-lg font-bold tracking-tight text-white mt-1 group-hover:text-[#C5A880] transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Card Content & Metadata */}
                <div className="p-5 space-y-3">
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                    <span className="font-mono-tabular font-medium text-neutral-900 dark:text-neutral-200">
                      {project.squareMeters} m²
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{project.client}</span>
                    {project.highlightKpi && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#C5A880] font-medium">{project.highlightKpi}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Lightbox Modal */}
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 sm:p-8 space-y-6">
              
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                    <span>{activeProject.category} Architectural Fit-Out</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeProject.location}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-tabular">{activeProject.year}</span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
                    {activeProject.title}
                  </h3>
                </div>
                
                <button
                  onClick={() => setActiveProject(null)}
                  className="rounded-lg p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* High-Res Image View */}
              <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden bg-neutral-950">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Project Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="md:col-span-2 space-y-4">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
                    Design Brief & Architectural Narrative
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {activeProject.description}
                  </p>
                  
                  <div className="pt-2">
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                      Key Materials & Craft Specifications
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.keyMaterials.map((mat, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded border border-neutral-200 dark:border-neutral-700 font-mono-tabular"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 text-xs">
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                    Project Parameters
                  </h4>
                  <div className="space-y-2 text-neutral-600 dark:text-neutral-300">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Client:</span>
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">{activeProject.client}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Floor Area:</span>
                      <span className="font-mono-tabular font-medium text-neutral-900 dark:text-neutral-100">{activeProject.squareMeters} sqm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Execution Hub:</span>
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">Uyo, Akwa Ibom</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Supervision:</span>
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">Victor Ephraim Studio</span>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/2348129160273?text=Hello%20Veph%20Interiors,%20I%20am%20interested%20in%20a%20project%20like%20${encodeURIComponent(activeProject.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2.5 px-3 text-center text-xs font-semibold text-white bg-neutral-900 hover:bg-[#C5A880] dark:bg-white dark:text-neutral-900 dark:hover:bg-[#C5A880] dark:hover:text-white rounded-lg transition-colors mt-3"
                  >
                    Request Similar Fit-Out
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
