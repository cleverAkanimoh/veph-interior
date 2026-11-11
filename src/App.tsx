import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { HeroSection } from './components/HeroSection';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { ProjectTracker } from './components/ProjectTracker';
import { MaterialLedger } from './components/MaterialLedger';
import { QuoteEstimator } from './components/QuoteEstimator';
import { AiDesignAdvisor } from './components/AiDesignAdvisor';
import { ConsultationModal } from './components/ConsultationModal';
import { Footer } from './components/Footer';

import {
  INITIAL_PORTFOLIO,
  INITIAL_CLIENT_PROJECTS,
  INITIAL_MATERIALS,
  INITIAL_ARTISANS,
} from './data/mockData';
import { ClientProject, MaterialItem, Artisan } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('portfolio');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('veph_theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Client projects state with localStorage persistence
  const [clientProjects, setClientProjects] = useState<ClientProject[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('veph_client_projects');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse stored projects', e);
        }
      }
    }
    return INITIAL_CLIENT_PROJECTS;
  });

  // Materials state with localStorage persistence
  const [materials, setMaterials] = useState<MaterialItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('veph_materials');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse stored materials', e);
        }
      }
    }
    return INITIAL_MATERIALS;
  });

  const [artisans] = useState<Artisan[]>(INITIAL_ARTISANS);

  // Sync theme changes with HTML document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('veph_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('veph_theme', 'light');
    }
  }, [isDark]);

  // Sync client projects to localStorage
  useEffect(() => {
    localStorage.setItem('veph_client_projects', JSON.stringify(clientProjects));
  }, [clientProjects]);

  // Sync materials to localStorage
  useEffect(() => {
    localStorage.setItem('veph_materials', JSON.stringify(materials));
  }, [materials]);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddProject = (newProject: ClientProject) => {
    setClientProjects(prev => [newProject, ...prev]);
  };

  const handleUpdateMilestone = (
    projectId: string,
    milestoneId: string,
    newStatus: 'Pending' | 'In Progress' | 'Completed'
  ) => {
    setClientProjects(prev =>
      prev.map(project => {
        if (project.id !== projectId) return project;
        const updatedMilestones = project.milestones.map(m =>
          m.id === milestoneId ? { ...m, status: newStatus } : m
        );
        const completedCount = updatedMilestones.filter(m => m.status === 'Completed').length;
        const progressPercent = Math.round((completedCount / updatedMilestones.length) * 100);
        return {
          ...project,
          milestones: updatedMilestones,
          progressPercent,
          recentUpdate: `Milestone updated to ${newStatus} on ${new Date().toLocaleDateString()}`
        };
      })
    );
  };

  const handleAddMaterial = (newItem: MaterialItem) => {
    setMaterials(prev => [newItem, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9] dark:bg-[#0F1115] text-[#191C20] dark:text-[#E2E4E9] transition-colors duration-200">
      {/* 3-Zone Strict Top Navigation Bar */}
      <TopBar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenConsultation={() => setIsConsultationOpen(true)}
        isDark={isDark}
        onToggleTheme={() => setIsDark(prev => !prev)}
      />

      <main className="flex-1">
        {/* Split Hero Section */}
        <HeroSection
          onExplorePortfolio={() => handleNavigate('portfolio')}
          onOpenTracker={() => handleNavigate('tracker')}
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        {/* Portfolio Showcase with Before/After Slider & Lightbox */}
        <PortfolioShowcase
          projects={INITIAL_PORTFOLIO}
        />

        {/* Live Client Project Tracker */}
        <ProjectTracker
          projects={clientProjects}
          onAddProject={handleAddProject}
          onUpdateMilestone={handleUpdateMilestone}
        />

        {/* Material & BOQ Ledger with Artisan Directory */}
        <MaterialLedger
          materials={materials}
          artisans={artisans}
          onAddMaterial={handleAddMaterial}
        />

        {/* Interactive Uyo Interior Cost Estimator */}
        <QuoteEstimator />

        {/* Veph AI Space & Style Advisor (Gemini 3.8 Flash) */}
        <AiDesignAdvisor />
      </main>

      {/* Direct Booking Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      {/* Editorial Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />
    </div>
  );
}
