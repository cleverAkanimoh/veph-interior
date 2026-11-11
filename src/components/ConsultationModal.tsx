import React, { useState } from 'react';
import { X, Calendar, MapPin, Phone, CheckCircle2, MessageSquare } from 'lucide-react';
import { BRAND_CONTACT } from '../data/mockData';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Shelter Afrique, Uyo');
  const [projectType, setProjectType] = useState('Full Interior Fit-Out & POP');
  const [targetDate, setTargetDate] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Construct WhatsApp message URL
    const message = `Hello Victor Ephraim & Veph Interiors,\n\nI would like to book an on-site consultation:\n- Name: ${fullName}\n- Phone: ${phone}\n- Location: ${location}\n- Project Type: ${projectType}\n- Preferred Date: ${targetDate || 'As soon as possible'}\n- Details: ${notes || 'Standard site inspection'}`;
    const url = `https://wa.me/2348129160273?text=${encodeURIComponent(message)}`;
    
    setTimeout(() => {
      window.open(url, '_blank');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#C5A880] font-semibold">
              Veph Design Studio · Uyo HQ
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
              Book On-Site Consultation
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Direct meeting with lead designer & project manager Victor Ephraim.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Consultation Request Dispatched!
              </h4>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                Opening direct WhatsApp chat with Victor Ephraim at +234 812 916 0273.
              </p>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 rounded-lg"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Barr. Clement Inyang"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Phone / WhatsApp Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+234 800 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none font-mono-tabular"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Site Location / Estate
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                >
                  <option value="Shelter Afrique, Uyo">Shelter Afrique, Uyo</option>
                  <option value="Ewet Housing, Uyo">Ewet Housing, Uyo</option>
                  <option value="Osongama Estate, Uyo">Osongama Estate, Uyo</option>
                  <option value="Ring Road III / Tropicana">Ring Road III / Tropicana</option>
                  <option value="Ikot Ekpene Road, Uyo">Ikot Ekpene Road, Uyo</option>
                  <option value="Other Akwa Ibom Town">Other Akwa Ibom Town</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Project Scope
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                >
                  <option value="Full Interior Fit-Out & POP">Full Interior Fit-Out & POP</option>
                  <option value="Master Bedroom Suite">Master Bedroom Suite</option>
                  <option value="Living & Dining Renovation">Living & Dining Renovation</option>
                  <option value="Exterior Architectural Facade">Exterior Architectural Facade</option>
                  <option value="Commercial Lounge / Office">Commercial Lounge / Office</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Preferred Inspection Date
                </label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 font-mono-tabular"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Project Specifics or Current State
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Bare blockwork building nearing lintel level, or existing duplex needing complete interior revamp..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-neutral-400">
                Direct WhatsApp Hotline: {BRAND_CONTACT.phone}
              </span>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 font-bold uppercase tracking-wider text-white bg-neutral-900 hover:bg-[#C5A880] dark:bg-white dark:text-neutral-900 dark:hover:bg-[#C5A880] dark:hover:text-white rounded-xl transition-all shadow-md"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Submit & Chat on WhatsApp</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
