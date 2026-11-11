import React from 'react';
import { Moon, Sun, ArrowUpRight } from 'lucide-react';

interface TopBarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenConsultation: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeSection,
  onNavigate,
  onOpenConsultation,
  isDark,
  onToggleTheme,
}) => {
  const navLinks = [
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'specifications', label: 'Interior Specs' },
    { id: 'tracker', label: 'Project Tracker' },
    { id: 'materials', label: 'Materials & BOQ' },
    { id: 'estimator', label: 'Cost Estimator' },
    { id: 'ai-studio', label: 'AI Space Studio' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 bg-[#FBFBF9]/95 backdrop-blur-md dark:border-neutral-800/80 dark:bg-[#0F1115]/95 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 sm:gap-4 lg:gap-8 px-3 sm:px-6 lg:px-8">
        
        {/* Zone 1: Single text element wordmark with responsive truncation */}
        <button
          onClick={() => onNavigate('portfolio')}
          className="group text-left text-sm sm:text-base lg:text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100 shrink min-w-0 hover:text-[#C5A880] transition-colors"
        >
          <span className="font-serif-editorial italic font-normal mr-1 text-xs sm:text-sm lg:text-base text-[#C5A880]">Studio</span>
          <span className="truncate inline-block align-bottom max-w-[140px] xs:max-w-[200px] sm:max-w-none">
            Veph Interiors<span className="hidden md:inline"> & Exterior</span>
          </span>
        </button>

        {/* Zone 2: Desktop clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-neutral-600 dark:text-neutral-400 shrink-0">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`relative py-1 transition-colors whitespace-nowrap shrink-0 text-sm ${
                  isActive
                    ? 'text-neutral-900 font-semibold dark:text-neutral-100'
                    : 'hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#C5A880] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action button + theme toggle (guaranteed to fit on mobile) */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle visual theme"
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors shrink-0"
          >
            {isDark ? <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <Moon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
          </button>

          <button
            onClick={onOpenConsultation}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-white bg-[#191C20] dark:bg-neutral-100 dark:text-neutral-900 rounded-lg hover:bg-[#C5A880] dark:hover:bg-[#C5A880] dark:hover:text-white transition-all whitespace-nowrap shrink-0 shadow-sm"
          >
            <span>Book<span className="hidden sm:inline"> Consultation</span></span>
            <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile sub-navigation bar with touch momentum */}
      <div className="flex lg:hidden overflow-x-auto scrollbar-none border-t border-neutral-200/60 dark:border-neutral-800/60 px-3 sm:px-4 py-2 gap-2 sm:gap-4 text-xs font-medium text-neutral-600 dark:text-neutral-400 touch-pan-x">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => onNavigate(link.id)}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md transition-colors shrink-0 ${
              activeSection === link.id
                ? 'bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100 font-semibold'
                : 'hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </header>
  );
};
