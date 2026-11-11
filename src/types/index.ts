export interface PortfolioProject {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Exterior';
  client: string;
  location: string;
  year: string;
  scope: string;
  description: string;
  image: string;
  beforeImage?: string;
  keyMaterials: string[];
  squareMeters: number;
  highlightKpi?: string;
}

export type ProjectStatus = 
  | 'Concept & 3D' 
  | 'Civil & POP Framing' 
  | 'Joinery & Electrical' 
  | 'Finishing & Decor' 
  | 'Handover Ready' 
  | 'Completed';

export interface Milestone {
  id: string;
  name: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  targetDate: string;
  notes: string;
}

export interface ClientProject {
  id: string;
  portalCode: string;
  clientName: string;
  title: string;
  location: string;
  neighborhood: 'Shelter Afrique' | 'Ewet Housing' | 'Osongama' | 'Ring Road III' | 'Other Uyo';
  status: ProjectStatus;
  progressPercent: number;
  budgetNaira: number;
  spentNaira: number;
  startDate: string;
  targetHandover: string;
  siteSupervisor: string;
  supervisorPhone: string;
  milestones: Milestone[];
  recentUpdate: string;
}

export interface MaterialItem {
  id: string;
  itemName: string;
  category: 'Gypsum & POP' | 'Timber & Boards' | 'Tiles & Marble' | 'Lighting & Electrical' | 'Paints & Finishes' | 'Textiles & Decor';
  quantity: number;
  unit: string;
  unitCostNaira: number;
  supplier: string;
  locationSourced: string;
  stockStatus: 'In Stock' | 'Allocated to Site' | 'Low Stock' | 'Order Placed';
  allocatedToProject?: string;
  lastUpdated: string;
}

export interface Artisan {
  id: string;
  fullName: string;
  trade: 'Master POP Plasterer' | 'Bespoke Joiner & Cabinetmaker' | 'Electrical Technician' | 'Master Tiler' | 'Architectural Painter' | 'Ironmonger & Welder';
  phone: string;
  dailyRateNaira: number;
  currentProject: string;
  rating: number;
  status: 'On Site' | 'Available' | 'Scheduled';
  yearsWithVeph: number;
}

export interface DesignColor {
  name: string;
  hex: string;
  usage: string;
}

export interface MaterialSpec {
  category: string;
  material: string;
  application: string;
}

export interface DesignAdviceResult {
  conceptTitle: string;
  designSummary: string;
  colorPalette: DesignColor[];
  materialSpecifications: MaterialSpec[];
  ceilingAndLightingStrategy: string;
  localUyoProcurementAdvice: string;
  estimatedTimelineWeeks: string;
}
