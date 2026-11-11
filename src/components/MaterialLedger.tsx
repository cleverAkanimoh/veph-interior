import React, { useState } from 'react';
import { MaterialItem, Artisan } from '../types';
import { Package, Users, Plus, Filter, MapPin, AlertTriangle, CheckCircle2, Phone } from 'lucide-react';

interface MaterialLedgerProps {
  materials: MaterialItem[];
  artisans: Artisan[];
  onAddMaterial: (item: MaterialItem) => void;
}

export const MaterialLedger: React.FC<MaterialLedgerProps> = ({
  materials,
  artisans,
  onAddMaterial,
}) => {
  const [activeTab, setActiveTab] = useState<'materials' | 'artisans'>('materials');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New material form state
  const [newItemName, setNewItemName] = useState('');
  const [newCategory, setNewCategory] = useState<MaterialItem['category']>('Gypsum & POP');
  const [newQuantity, setNewQuantity] = useState('50');
  const [newUnit, setNewUnit] = useState('Bags');
  const [newUnitCost, setNewUnitCost] = useState('9500');
  const [newSupplier, setNewSupplier] = useState('Timber Market Merchants Ltd');
  const [newLocationSourced, setNewLocationSourced] = useState('Timber Market, Uyo');
  const [newAllocatedProject, setNewAllocatedProject] = useState('Shelter Afrique Villa');

  const filteredMaterials = categoryFilter === 'All'
    ? materials
    : materials.filter(m => m.category === categoryFilter);

  const totalInventoryValue = materials.reduce((acc, item) => acc + (item.quantity * item.unitCostNaira), 0);
  const lowStockCount = materials.filter(m => m.stockStatus === 'Low Stock' || m.stockStatus === 'Order Placed').length;

  const handleCreateMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName) return;

    const newMat: MaterialItem = {
      id: `mat-${Date.now()}`,
      itemName: newItemName,
      category: newCategory,
      quantity: parseFloat(newQuantity) || 1,
      unit: newUnit,
      unitCostNaira: parseInt(newUnitCost, 10) || 5000,
      supplier: newSupplier,
      locationSourced: newLocationSourced,
      stockStatus: 'In Stock',
      allocatedToProject: newAllocatedProject,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    onAddMaterial(newMat);
    setShowAddModal(false);
    setNewItemName('');
  };

  return (
    <section id="materials" className="py-16 border-b border-neutral-200 dark:border-neutral-800 bg-[#FBFBF9] dark:bg-[#0F1115] transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200/80 dark:border-neutral-800/80 pb-6">
          <div className="space-y-2">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#C5A880]">
              Procurement & Workshop Logistics
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Material BOQ & Artisan Ledger
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Strict accounting of physical joinery, gypsum plasterboards, ambient LED profiles, and local Akwa Ibom artisan wages in Nigerian Naira (₦).
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Switcher */}
            <div className="flex items-center gap-1 p-1 bg-neutral-200/70 dark:bg-neutral-900 rounded-lg border border-neutral-300/60 dark:border-neutral-800">
              <button
                onClick={() => setActiveTab('materials')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'materials'
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Package className="h-3.5 w-3.5" />
                <span>Materials ({materials.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('artisans')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'artisans'
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Users className="h-3.5 w-3.5" />
                <span>Uyo Artisans ({artisans.length})</span>
              </button>
            </div>

            {activeTab === 'materials' && (
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-neutral-900 hover:bg-[#C5A880] dark:bg-white dark:text-neutral-900 dark:hover:bg-[#C5A880] dark:hover:text-white rounded-lg transition-colors whitespace-nowrap shadow-sm"
              >
                <Plus className="h-4 w-4" />
                <span>Log Material</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab 1: Materials & Procurement */}
        {activeTab === 'materials' && (
          <div className="space-y-6">
            {/* Procurement KPI Summary Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
                <span className="text-xs text-neutral-500">Total Material Stock Value</span>
                <p className="font-mono-tabular text-xl lg:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                  ₦{totalInventoryValue.toLocaleString()}
                </p>
                <p className="text-xs text-neutral-400 mt-0.5">Across active Uyo store & sites</p>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
                <span className="text-xs text-neutral-500">Tracked SKU Categories</span>
                <p className="font-mono-tabular text-xl lg:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                  6 Core Trades
                </p>
                <p className="text-xs text-neutral-400 mt-0.5">POP, Timber, Tiles, Lights, Stucco, Fabric</p>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
                <span className="text-xs text-neutral-500">Allocated to Active Sites</span>
                <p className="font-mono-tabular text-xl lg:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                  {materials.filter(m => m.stockStatus === 'Allocated to Site').length} SKUs
                </p>
                <p className="text-xs text-neutral-400 mt-0.5">Shelter Afrique & Ewet Housing</p>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
                <span className="text-xs text-neutral-500">Procurement Attention</span>
                <p className="font-mono-tabular text-xl lg:text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                  {lowStockCount} Reorders
                </p>
                <p className="text-xs text-neutral-400 mt-0.5">Low stock / order placed</p>
              </div>
            </div>

            {/* Category Filter Pills (Functional Buttons) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
              <span className="text-neutral-500 flex items-center gap-1 shrink-0 mr-1">
                <Filter className="h-3 w-3" /> Filter:
              </span>
              {['All', 'Gypsum & POP', 'Timber & Boards', 'Tiles & Marble', 'Lighting & Electrical', 'Paints & Finishes', 'Textiles & Decor'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                    categoryFilter === cat
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white font-semibold'
                      : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* High-Density Data Grid */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-50 dark:bg-neutral-800/60 border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="py-3.5 px-4">Material Specification</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4 text-right">In Stock</th>
                      <th className="py-3.5 px-4 text-right">Unit Rate (₦)</th>
                      <th className="py-3.5 px-4 text-right">Total Est. (₦)</th>
                      <th className="py-3.5 px-4">Sourced Hub</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Allocated Project</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/80">
                    {filteredMaterials.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 transition-colors"
                      >
                        <td className="py-3.5 px-4 font-semibold text-neutral-900 dark:text-neutral-100 max-w-xs">
                          {item.itemName}
                        </td>
                        <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                          {item.category}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono-tabular font-bold text-neutral-900 dark:text-neutral-200">
                          {item.quantity} {item.unit}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono-tabular text-neutral-700 dark:text-neutral-300">
                          ₦{item.unitCostNaira.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono-tabular font-bold text-neutral-900 dark:text-neutral-100">
                          ₦{(item.quantity * item.unitCostNaira).toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-[#C5A880] shrink-0" />
                            <span>{item.locationSourced}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center gap-1 font-medium ${
                            item.stockStatus === 'In Stock'
                              ? 'text-emerald-700 dark:text-emerald-400'
                              : item.stockStatus === 'Allocated to Site'
                              ? 'text-blue-700 dark:text-blue-400'
                              : 'text-amber-700 dark:text-amber-400'
                          }`}>
                            {item.stockStatus === 'In Stock' ? (
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            ) : item.stockStatus === 'Allocated to Site' ? (
                              <Package className="h-3.5 w-3.5" />
                            ) : (
                              <AlertTriangle className="h-3.5 w-3.5" />
                            )}
                            <span>{item.stockStatus}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-neutral-500 font-mono-tabular">
                          {item.allocatedToProject || 'General Store'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Uyo Artisans Directory */}
        {activeTab === 'artisans' && (
          <div className="space-y-6">
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                  Veph Certified Master Craftsmen Network
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Pre-vetted guild of master plasterers, carpenters, and electricians in Akwa Ibom trained in luxury European detailing and precision tolerances.
                </p>
              </div>
              <div className="text-xs text-neutral-500 font-mono-tabular">
                Direct Guild Dispatch: +234 812 916 0273
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artisans.map((artisan) => (
                <div
                  key={artisan.id}
                  className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 space-y-4 hover:border-[#C5A880]/60 transition-all shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                        {artisan.fullName}
                      </h4>
                      <p className="text-xs font-semibold text-[#C5A880] mt-0.5">
                        {artisan.trade}
                      </p>
                    </div>
                    <span className={`px-2.5 py-0.5 text-xs rounded font-medium ${
                      artisan.status === 'On Site'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                    }`}>
                      {artisan.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs border-t border-b border-neutral-100 dark:border-neutral-800 py-3 text-neutral-600 dark:text-neutral-300">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Standard Daily Wage:</span>
                      <span className="font-mono-tabular font-bold text-neutral-900 dark:text-neutral-100">
                        ₦{artisan.dailyRateNaira.toLocaleString()} / day
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Active Site Assignment:</span>
                      <span className="font-medium text-neutral-900 dark:text-neutral-200">{artisan.currentProject}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Veph Studio Tenure:</span>
                      <span className="font-mono-tabular">{artisan.yearsWithVeph} Years Verified</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Execution Score:</span>
                      <span className="font-mono-tabular font-bold text-amber-600 dark:text-amber-400">★ {artisan.rating} / 5.0</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-neutral-500 font-mono-tabular">{artisan.phone}</span>
                    <a
                      href={`tel:${artisan.phone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 rounded-lg transition-colors"
                    >
                      <Phone className="h-3 w-3 text-[#C5A880]" />
                      <span>Contact Lead</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Log Material Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                  Log Material Shipment / BOQ Entry
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateMaterial} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Material Specification & Item Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 18mm Boiling Water Proof Marine Ply"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Trade Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                    >
                      <option value="Gypsum & POP">Gypsum & POP</option>
                      <option value="Timber & Boards">Timber & Boards</option>
                      <option value="Tiles & Marble">Tiles & Marble</option>
                      <option value="Lighting & Electrical">Lighting & Electrical</option>
                      <option value="Paints & Finishes">Paints & Finishes</option>
                      <option value="Textiles & Decor">Textiles & Decor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Quantity & Unit
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        required
                        value={newQuantity}
                        onChange={(e) => setNewQuantity(e.target.value)}
                        className="w-2/3 px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 font-mono-tabular"
                      />
                      <input
                        type="text"
                        value={newUnit}
                        onChange={(e) => setNewUnit(e.target.value)}
                        className="w-1/3 px-2 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Unit Rate in Naira (₦)
                    </label>
                    <input
                      type="number"
                      required
                      value={newUnitCost}
                      onChange={(e) => setNewUnitCost(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 font-mono-tabular"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Sourced Hub / Vendor
                    </label>
                    <input
                      type="text"
                      value={newLocationSourced}
                      onChange={(e) => setNewLocationSourced(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Allocated Project
                  </label>
                  <input
                    type="text"
                    value={newAllocatedProject}
                    onChange={(e) => setNewAllocatedProject(e.target.value)}
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
                    Log to Inventory
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
