import React, { useState } from 'react';
import { ClientProject, ProjectStatus } from '../types';
import { Search, Plus, CheckCircle2, Clock, Phone, AlertCircle, FileText, X } from 'lucide-react';

interface ProjectTrackerProps {
  projects: ClientProject[];
  onAddProject: (project: ClientProject) => void;
  onUpdateMilestone: (projectId: string, milestoneId: string, newStatus: 'Pending' | 'In Progress' | 'Completed') => void;
}

export const ProjectTracker: React.FC<ProjectTrackerProps> = ({
  projects,
  onAddProject,
  onUpdateMilestone,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [clientCodeInput, setClientCodeInput] = useState('');
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState<ClientProject | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New project form state
  const [newClientName, setNewClientName] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newNeighborhood, setNewNeighborhood] = useState<'Shelter Afrique' | 'Ewet Housing' | 'Osongama' | 'Ring Road III' | 'Other Uyo'>('Shelter Afrique');
  const [newBudget, setNewBudget] = useState('12000000');
  const [newSupervisor, setNewSupervisor] = useState('Victor Ephraim');

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.portalCode.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesNeighborhood = selectedNeighborhood === 'All' || p.neighborhood === selectedNeighborhood;
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;

    return matchesSearch && matchesNeighborhood && matchesStatus;
  });

  const handleLookupClientCode = (e: React.FormEvent) => {
    e.preventDefault();
    const found = projects.find(p => p.portalCode.trim().toUpperCase() === clientCodeInput.trim().toUpperCase());
    if (found) {
      setSelectedProjectForDetail(found);
    } else {
      alert(`No project found with portal code "${clientCodeInput}". Try sample code: VEPH-2026-SA01 or VEPH-2026-OS02`);
    }
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newTitle || !newLocation) return;

    const randomNum = Math.floor(10 + Math.random() * 90);
    const codePrefix = newNeighborhood.slice(0, 2).toUpperCase();
    const portalCode = `VEPH-2026-${codePrefix}${randomNum}`;

    const newProject: ClientProject = {
      id: `cp-${Date.now()}`,
      portalCode,
      clientName: newClientName,
      title: newTitle,
      location: newLocation,
      neighborhood: newNeighborhood,
      status: 'Civil & POP Framing',
      progressPercent: 25,
      budgetNaira: parseInt(newBudget, 10) || 10000000,
      spentNaira: 2500000,
      startDate: new Date().toISOString().split('T')[0],
      targetHandover: '2026-05-15',
      siteSupervisor: newSupervisor,
      supervisorPhone: '+234 812 916 0273',
      recentUpdate: 'Project commissioned; initial site measurement & POP framing started.',
      milestones: [
        { id: 'm1', name: 'Site Laser Survey & Concept Approval', status: 'Completed', targetDate: '2026-03-01', notes: 'Design sign-off completed' },
        { id: 'm2', name: 'Structural POP Ceiling & Conduit Grid', status: 'In Progress', targetDate: '2026-03-20', notes: 'Artisans on site' },
        { id: 'm3', name: 'Millwork Fabrication & Flooring', status: 'Pending', targetDate: '2026-04-10', notes: 'Timber workshop preparation' },
        { id: 'm4', name: 'Lighting, Soft Furnishing & Snagging', status: 'Pending', targetDate: '2026-05-01', notes: 'Curtains & accessories' },
        { id: 'm5', name: 'Final Handover to Client', status: 'Pending', targetDate: '2026-05-15', notes: 'Keys handover' }
      ]
    };

    onAddProject(newProject);
    setShowAddModal(false);
    setNewClientName('');
    setNewTitle('');
    setNewLocation('');
  };

  return (
    <section id="tracker" className="py-16 border-b border-neutral-200 dark:border-neutral-800 bg-[#FBFBF9] dark:bg-[#0F1115] transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200/80 dark:border-neutral-800/80 pb-6">
          <div className="space-y-2">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#C5A880]">
              Studio Operations & Client Portal
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Active Client Project Tracker
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Real-time milestone accountability for residential and commercial fit-outs in Uyo. Track site progress, financial allocation, and artisan schedules.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-neutral-900 hover:bg-[#C5A880] dark:bg-white dark:text-neutral-900 dark:hover:bg-[#C5A880] dark:hover:text-white rounded-lg transition-colors whitespace-nowrap shadow-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Log New Project</span>
            </button>
          </div>
        </div>

        {/* Client Access Code Banner */}
        <div className="rounded-xl border border-[#C5A880]/30 bg-[#C5A880]/5 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#C5A880]" />
              <span>Have a Client Portal Access Code?</span>
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Enter your unique project reference (e.g., <code className="font-mono-tabular bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded">VEPH-2026-SA01</code>) to view private site updates.
            </p>
          </div>

          <form onSubmit={handleLookupClientCode} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="e.g. VEPH-2026-SA01"
              value={clientCodeInput}
              onChange={(e) => setClientCodeInput(e.target.value)}
              className="px-3 py-2 text-xs font-mono uppercase bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#C5A880] w-full sm:w-48"
            />
            <button
              type="submit"
              className="px-4 py-2 text-xs font-medium text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-lg transition-colors whitespace-nowrap"
            >
              Verify Code
            </button>
          </form>
        </div>

        {/* Search & Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by client, title, or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          <select
            value={selectedNeighborhood}
            onChange={(e) => setSelectedNeighborhood(e.target.value)}
            className="px-3 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-800 dark:text-neutral-200 focus:outline-none"
          >
            <option value="All">All Uyo Locations</option>
            <option value="Shelter Afrique">Shelter Afrique Estate</option>
            <option value="Ewet Housing">Ewet Housing Estate</option>
            <option value="Osongama">Osongama Estate</option>
            <option value="Ring Road III">Ring Road III Corridor</option>
            <option value="Other Uyo">Other Uyo Metro</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-800 dark:text-neutral-200 focus:outline-none"
          >
            <option value="All">All Project Phases</option>
            <option value="Concept & 3D">Concept & 3D</option>
            <option value="Civil & POP Framing">Civil & POP Framing</option>
            <option value="Joinery & Electrical">Joinery & Electrical</option>
            <option value="Finishing & Decor">Finishing & Decor</option>
            <option value="Handover Ready">Handover Ready</option>
          </select>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm hover:border-neutral-300 dark:hover:border-neutral-700 transition-all space-y-5"
            >
              {/* Header with Title and Code */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="font-mono-tabular font-medium text-[#C5A880]">{project.portalCode}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.neighborhood}</span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                    Client: <span className="font-medium text-neutral-800 dark:text-neutral-200">{project.clientName}</span> · {project.location}
                  </p>
                </div>

                <div className="text-right">
                  <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700">
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-500">Progress to Handover</span>
                  <span className="font-mono-tabular font-bold text-neutral-900 dark:text-neutral-100">
                    {project.progressPercent}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                  <div
                    className="h-full bg-[#C5A880] rounded-full transition-all duration-500"
                    style={{ width: `${project.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Financial & Timeline Metrics (Tabular Numbers) */}
              <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800 text-xs">
                <div>
                  <p className="text-neutral-500">Budget (BOQ)</p>
                  <p className="font-mono-tabular font-semibold text-neutral-900 dark:text-neutral-100 mt-0.5">
                    ₦{(project.budgetNaira / 1000000).toFixed(1)}M
                  </p>
                </div>
                <div>
                  <p className="text-neutral-500">Disbursed</p>
                  <p className="font-mono-tabular font-semibold text-neutral-900 dark:text-neutral-100 mt-0.5">
                    ₦{(project.spentNaira / 1000000).toFixed(1)}M
                  </p>
                </div>
                <div>
                  <p className="text-neutral-500">Target Handover</p>
                  <p className="font-mono-tabular font-semibold text-neutral-900 dark:text-neutral-100 mt-0.5">
                    {project.targetHandover}
                  </p>
                </div>
              </div>

              {/* Recent Site Update */}
              <div className="text-xs text-neutral-600 dark:text-neutral-400 p-3 rounded-lg bg-neutral-50/50 dark:bg-neutral-800/20 border border-neutral-100 dark:border-neutral-800">
                <span className="font-semibold text-neutral-900 dark:text-neutral-200">Site Log: </span>
                {project.recentUpdate}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <Phone className="h-3.5 w-3.5 text-[#C5A880]" />
                  <span>Supervisor: {project.siteSupervisor}</span>
                </div>

                <button
                  onClick={() => setSelectedProjectForDetail(project)}
                  className="px-3.5 py-1.5 text-xs font-medium text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                >
                  Inspect Milestones ({project.milestones.length})
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Milestone Detail Modal */}
        {selectedProjectForDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 space-y-6">
              
              <div className="flex items-start justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <span className="font-mono-tabular font-bold text-[#C5A880]">{selectedProjectForDetail.portalCode}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedProjectForDetail.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                    {selectedProjectForDetail.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                    Client: {selectedProjectForDetail.clientName} · Lead: {selectedProjectForDetail.siteSupervisor} ({selectedProjectForDetail.supervisorPhone})
                  </p>
                </div>

                <button
                  onClick={() => setSelectedProjectForDetail(null)}
                  className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Milestones Flow */}
              <div className="space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Site Milestones & Execution Stages
                </h4>

                <div className="space-y-3">
                  {selectedProjectForDetail.milestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 flex items-start justify-between gap-4 text-xs"
                    >
                      <div className="flex items-start gap-3">
                        {milestone.status === 'Completed' ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        ) : milestone.status === 'In Progress' ? (
                          <Clock className="h-4 w-4 text-[#C5A880] shrink-0 mt-0.5 animate-pulse" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border border-neutral-300 dark:border-neutral-600 shrink-0 mt-0.5" />
                        )}

                        <div className="space-y-1">
                          <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                            {milestone.name}
                          </p>
                          <p className="text-neutral-600 dark:text-neutral-400">
                            {milestone.notes}
                          </p>
                          <p className="text-neutral-500 font-mono-tabular">
                            Target: {milestone.targetDate}
                          </p>
                        </div>
                      </div>

                      {/* Interactive toggle status for supervisor */}
                      <select
                        value={milestone.status}
                        onChange={(e) => onUpdateMilestone(selectedProjectForDetail.id, milestone.id, e.target.value as any)}
                        className="p-1.5 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded text-neutral-800 dark:text-neutral-200"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct WhatsApp Contact for Client */}
              <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 flex items-center justify-between">
                <span className="text-xs text-neutral-500">Direct site query?</span>
                <a
                  href={`https://wa.me/2348129160273?text=Hello%20Victor,%20inquiring%20about%20project%20${selectedProjectForDetail.portalCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-[#C5A880] dark:bg-white dark:text-neutral-900 dark:hover:bg-[#C5A880] dark:hover:text-white rounded-lg transition-colors"
                >
                  Chat with Victor on WhatsApp
                </a>
              </div>

            </div>
          </div>
        )}

        {/* Add Project Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                  Register New Client Project
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Barr. Clement Inyang"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Project Title & Scope
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 4-Bedroom Duplex POP & Joinery"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Uyo Neighborhood
                    </label>
                    <select
                      value={newNeighborhood}
                      onChange={(e) => setNewNeighborhood(e.target.value as any)}
                      className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                    >
                      <option value="Shelter Afrique">Shelter Afrique</option>
                      <option value="Ewet Housing">Ewet Housing</option>
                      <option value="Osongama">Osongama</option>
                      <option value="Ring Road III">Ring Road III</option>
                      <option value="Other Uyo">Other Uyo Metro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Initial Budget (₦)
                    </label>
                    <input
                      type="number"
                      required
                      value={newBudget}
                      onChange={(e) => setNewBudget(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 font-mono-tabular"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Site Street Address
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Plot 18, 4th Avenue, Shelter Afrique"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                  />
                </div>

                <div>
                  <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Site Lead / Supervisor
                  </label>
                  <input
                    type="text"
                    value={newSupervisor}
                    onChange={(e) => setNewSupervisor(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 font-medium text-white bg-neutral-900 hover:bg-[#C5A880] dark:bg-white dark:text-neutral-900 dark:hover:bg-[#C5A880] dark:hover:text-white rounded-lg transition-colors"
                  >
                    Generate Portal & Create Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
