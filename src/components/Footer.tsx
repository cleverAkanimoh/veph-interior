import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';
import { BRAND_CONTACT } from '../data/mockData';

interface FooterProps {
  onNavigate: (section: string) => void;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenConsultation,
}) => {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0B0D10] text-neutral-600 dark:text-neutral-400 text-xs transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Brand Column (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              <span className="font-serif-editorial italic font-normal text-base text-[#C5A880] mr-1.5">Studio</span>
              Veph Interiors & Exterior
            </h3>
            <p className="text-xs leading-relaxed max-w-sm text-neutral-600 dark:text-neutral-400">
              A premier spatial architecture, interior decoration, and exterior design consultancy headquartered on Idongesit Ntem Isua Avenue in Uyo, Akwa Ibom State. Transforming residential estates and executive spaces with bespoke millwork and master craftsmanship.
            </p>
            <div className="pt-1 flex items-center gap-3">
              <a
                href={BRAND_CONTACT.whatsappDirect}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-medium hover:bg-[#C5A880] hover:text-white transition-colors"
              >
                <span>WhatsApp Concierge</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium hover:border-neutral-400 transition-colors"
              >
                <span>Book Site Visit</span>
              </button>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider text-[11px]">
              Studio Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
                >
                  Architectural Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tracker')}
                  className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
                >
                  Live Client Project Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('materials')}
                  className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
                >
                  Materials & Artisan BOQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('estimator')}
                  className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
                >
                  Instant Cost Estimator (₦)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ai-studio')}
                  className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
                >
                  AI Space & Style Advisor
                </button>
              </li>
            </ul>
          </div>

          {/* Core Hubs Column */}
          <div className="space-y-3">
            <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider text-[11px]">
              Akwa Ibom Coverage
            </h4>
            <ul className="space-y-2 text-neutral-500 dark:text-neutral-400">
              <li>Shelter Afrique Estate & Ext.</li>
              <li>Ewet Housing Presidential Wing</li>
              <li>Osongama Estate Corridors</li>
              <li>Ring Road III Commercial Hubs</li>
              <li>Ibom Tropicana Hospitality Axis</li>
              <li>Eket & Ikot Ekpene Residential</li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-3">
            <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider text-[11px]">
              Uyo Studio Office
            </h4>
            <div className="space-y-2 text-neutral-600 dark:text-neutral-300">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>{BRAND_CONTACT.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#C5A880] shrink-0" />
                <span className="font-mono-tabular">{BRAND_CONTACT.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#C5A880] shrink-0" />
                <span>{BRAND_CONTACT.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>{BRAND_CONTACT.workingHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Quiet Bottom Strip */}
        <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between text-neutral-400 text-[11px] gap-3">
          <p>
            © {new Date().getFullYear()} Veph Interiors & Exterior. All rights reserved. Principal: Victor Ephraim.
          </p>
          <div className="flex items-center gap-4">
            <span>Uyo, Akwa Ibom State</span>
            <span aria-hidden="true">·</span>
            <span>Bespoke Interior & Exterior Architecture</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
