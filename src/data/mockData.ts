import { PortfolioProject, ClientProject, MaterialItem, Artisan } from '../types';

export const INITIAL_PORTFOLIO: PortfolioProject[] = [
  {
    id: 'proj-1',
    title: 'Shelter Afrique Grand Master Villa',
    category: 'Residential',
    client: 'Barr. & Mrs. E. Udoh',
    location: 'Shelter Afrique Estate, Uyo',
    year: '2025',
    scope: 'Complete Interior Architecture, Sculptural POP Ceilings, Bespoke Woodwork',
    description: 'A 650 sqm residential transformation featuring curvilinear acoustic POP ceilings, Italian honed travertine flooring, hidden 3000K ambient cove profiles, and custom fluted oak cabinetry curated for tropical cross-ventilation.',
    image: '/src/assets/images/hero_interior_uyo_1794399891616.jpg',
    beforeImage: '/src/assets/images/before_after_renovation_1794399893307.jpg',
    keyMaterials: ['Gypsum Plaster of Paris', '18mm Marine Plywood', 'Honed Roman Travertine', '24V COB LED Strips'],
    squareMeters: 650,
    highlightKpi: 'Handover Completed in 7 Weeks'
  },
  {
    id: 'proj-2',
    title: 'Emerald Luxury Suite at Shelter Afrique',
    category: 'Residential',
    client: 'Dr. Akanimo Bassey',
    location: 'Shelter Afrique Extension, Uyo',
    year: '2025',
    scope: 'Master Bedroom Suite, Acoustic Fluted Wall Panels, Brass Bedside Pendants',
    description: 'Deep forest emerald velvet upholstery anchored with vertical fluted timber slats, brushed brass inlays, recessed cove perimeter illumination, and climate-resistant engineered hardwood.',
    image: '/src/assets/images/portfolio_shelter_afrique_1794399893564.jpg',
    keyMaterials: ['Moisture-Resistant MDF Slats', 'Deep Emerald Velvet', 'Brushed Brass Pendants', 'Acoustic Backing'],
    squareMeters: 85,
    highlightKpi: '100% Custom Joinery'
  },
  {
    id: 'proj-3',
    title: 'Osongama Minimalist Dining Sanctuary',
    category: 'Residential',
    client: 'Engr. & Dr. K. Okon',
    location: 'Osongama Estate, Uyo',
    year: '2026',
    scope: 'Coffered Geometric Ceiling, Calacatta Marble Dining, Sheer Floor Drapery',
    description: 'Curated architectural dining pavilion featuring a 10-seater natural Calacatta marble slab, custom step-down coffered tray with anti-glare downlights, and warm brass sculptural pendant.',
    image: '/src/assets/images/portfolio_osongama_dining_1794399892087.jpg',
    keyMaterials: ['Calacatta Marble Slab', 'Cast POP Coffers', 'Warm Brass Sputnik Chandelier', 'Belgian Sheer Linen'],
    squareMeters: 55,
    highlightKpi: 'Zero Joint Marble Finishing'
  },
  {
    id: 'proj-4',
    title: 'Ring Road III Architectural Residence Facade',
    category: 'Exterior',
    client: 'Chief M. Akpabio',
    location: 'Ring Road III Corridor, Uyo',
    year: '2025',
    scope: 'Modern Tropical Facade, Exterior Accent Lighting, Cantilever Louvers',
    description: 'Striking exterior modernism blending thermo-treated composite wood panels, rain-screen porcelain cladding, and integrated exterior architectural sconces framing native palm landscaping.',
    image: '/src/assets/images/portfolio_exterior_facade_1794399893843.jpg',
    keyMaterials: ['Thermo-treated Wood Composite', 'Weather-Guard Textured Stucco', 'IP65 Brass Sconces', 'Tempered Balustrade'],
    squareMeters: 420,
    highlightKpi: 'Weatherproof UV Guarantee'
  },
  {
    id: 'proj-5',
    title: 'Ewet Housing Executive Boardroom & Lounge',
    category: 'Commercial',
    client: 'Apex Petroleum & Logistics Ltd',
    location: 'Ewet Housing Estate, Uyo',
    year: '2025',
    scope: 'Acoustic Wall Panelling, Executive Leather Banquettes, Minimalist Lighting',
    description: 'An executive boardroom that doubles as an evening hospitality suite, featuring bespoke sound-absorbing slatted wall baffles, cognac leather seating, and recessed warm brass linear fixtures.',
    image: '/src/assets/images/before_after_renovation_1794399893307.jpg',
    keyMaterials: ['Acoustic Oak Slats', 'Full-Grain Cognac Leather', 'Minimalist Linear LED Track', 'Smoked Bronze Glass'],
    squareMeters: 120,
    highlightKpi: 'Sound Transmission Class 48'
  }
];

export const INITIAL_CLIENT_PROJECTS: ClientProject[] = [
  {
    id: 'cp-01',
    portalCode: 'VEPH-2026-SA01',
    clientName: 'Barr. E. Udoh',
    title: 'Shelter Afrique Villa Penthouse Redesign',
    location: 'Plot 42, Shelter Afrique, Uyo',
    neighborhood: 'Shelter Afrique',
    status: 'Joinery & Electrical',
    progressPercent: 68,
    budgetNaira: 18500000,
    spentNaira: 12850000,
    startDate: '2026-01-10',
    targetHandover: '2026-03-25',
    siteSupervisor: 'Victor Ephraim',
    supervisorPhone: '+234 812 916 0273',
    recentUpdate: 'Bespoke walnut TV wall framing installed; POP cove light strips tested and commissioned.',
    milestones: [
      { id: 'm1', name: 'Site Laser Measurement & 3D Approval', status: 'Completed', targetDate: '2026-01-18', notes: 'Client signed off render v2' },
      { id: 'm2', name: 'Civil Dismantling & POP Ceiling Framing', status: 'Completed', targetDate: '2026-02-05', notes: 'Curved tray cast with moisture-proof plaster' },
      { id: 'm3', name: 'Electrical 1st Fix & Conduit Routing', status: 'Completed', targetDate: '2026-02-14', notes: 'Low-voltage 24V bus lines pulled' },
      { id: 'm4', name: 'Cabinetry Fabrication & Wall Panelling', status: 'In Progress', targetDate: '2026-03-05', notes: 'Assembly on site underway' },
      { id: 'm5', name: 'Final Paint, Drapery & Client Walkthrough', status: 'Pending', targetDate: '2026-03-25', notes: 'Deep cleaning and styling' }
    ]
  },
  {
    id: 'cp-02',
    portalCode: 'VEPH-2026-OS02',
    clientName: 'Dr. Akanimo Bassey',
    title: 'Osongama Duplex Master Suite & Walk-in Wardrobe',
    location: 'Close 3, Osongama Estate, Uyo',
    neighborhood: 'Osongama',
    status: 'Finishing & Decor',
    progressPercent: 88,
    budgetNaira: 9800000,
    spentNaira: 8400000,
    startDate: '2026-01-22',
    targetHandover: '2026-03-12',
    siteSupervisor: 'Edet Sunday (Lead Joiner)',
    supervisorPhone: '+234 803 456 7812',
    recentUpdate: 'Custom emerald headboard and bronze glass wardrobe doors installed. Final paint touchup underway.',
    milestones: [
      { id: 'm1', name: 'Design Moodboard & Material Approval', status: 'Completed', targetDate: '2026-01-26', notes: 'Selected emerald velvet and smoked glass' },
      { id: 'm2', name: 'Ceiling Dropping & Lighting Rails', status: 'Completed', targetDate: '2026-02-10', notes: 'Magnetic track installed' },
      { id: 'm3', name: 'Wardrobe Joinery & Headboard Build', status: 'Completed', targetDate: '2026-02-28', notes: 'All drawers soft-close aligned' },
      { id: 'm4', name: 'Final Upholstery, Mattress & Styling', status: 'In Progress', targetDate: '2026-03-12', notes: 'Drapery steam pressed' }
    ]
  },
  {
    id: 'cp-03',
    portalCode: 'VEPH-2026-EW03',
    clientName: 'Engr. K. Okon',
    title: 'Ewet Housing Boutique Living & Dining Fit-Out',
    location: 'Akpabio Way, Ewet Housing, Uyo',
    neighborhood: 'Ewet Housing',
    status: 'Civil & POP Framing',
    progressPercent: 35,
    budgetNaira: 14200000,
    spentNaira: 4950000,
    startDate: '2026-02-15',
    targetHandover: '2026-04-18',
    siteSupervisor: 'Victor Ephraim',
    supervisorPhone: '+234 812 916 0273',
    recentUpdate: 'POP casting ongoing; acoustic ceiling grid hung; electrical conduit channeling completed.',
    milestones: [
      { id: 'm1', name: '3D Walkthrough & BOQ Acceptance', status: 'Completed', targetDate: '2026-02-20', notes: 'Initial deposit confirmed' },
      { id: 'm2', name: 'Wall Scraping & POP Ceiling Casting', status: 'In Progress', targetDate: '2026-03-10', notes: 'POP team on site' },
      { id: 'm3', name: 'Porcelain Tile Laying (1200x600mm)', status: 'Pending', targetDate: '2026-03-24', notes: 'Tiles arrived from Port Harcourt' },
      { id: 'm4', name: 'Millwork Installation & Lighting Fix', status: 'Pending', targetDate: '2026-04-10', notes: 'Pre-fabrication in Uyo workshop' },
      { id: 'm5', name: 'Final Handover', status: 'Pending', targetDate: '2026-04-18', notes: 'Snag list resolution' }
    ]
  },
  {
    id: 'cp-04',
    portalCode: 'VEPH-2026-RR04',
    clientName: 'Apex Logistics & Energy',
    title: 'Ring Road Commercial Executive Lounge',
    location: 'Ring Road III Commercial Strip, Uyo',
    neighborhood: 'Ring Road III',
    status: 'Concept & 3D',
    progressPercent: 15,
    budgetNaira: 26000000,
    spentNaira: 3900000,
    startDate: '2026-02-28',
    targetHandover: '2026-05-30',
    siteSupervisor: 'Victor Ephraim',
    supervisorPhone: '+234 812 916 0273',
    recentUpdate: 'Architectural survey complete; initial 3D visualization presented to board of directors.',
    milestones: [
      { id: 'm1', name: 'Space Audit & Acoustic Assessment', status: 'Completed', targetDate: '2026-03-02', notes: 'Evaluated street noise damping requirements' },
      { id: 'm2', name: '3D Render & Material Spec Presentation', status: 'In Progress', targetDate: '2026-03-15', notes: 'Reviewing fluted acoustic wall finishes' },
      { id: 'm3', name: 'Demolition & Partitioning', status: 'Pending', targetDate: '2026-04-01', notes: 'Awaiting site possession' },
      { id: 'm4', name: 'Full Fit-Out & Furnishing', status: 'Pending', targetDate: '2026-05-15', notes: 'Custom executive desks & lounge' }
    ]
  }
];

export const INITIAL_MATERIALS: MaterialItem[] = [
  {
    id: 'mat-01',
    itemName: 'Gypsum Plaster of Paris (High-Purity 50kg)',
    category: 'Gypsum & POP',
    quantity: 140,
    unit: 'Bags',
    unitCostNaira: 8500,
    supplier: 'Uyo POP Central Depot',
    locationSourced: 'Abak Road, Uyo',
    stockStatus: 'In Stock',
    allocatedToProject: 'Shelter Afrique Villa',
    lastUpdated: '2026-03-01'
  },
  {
    id: 'mat-02',
    itemName: '18mm Marine Hardwood Plywood (Boiling Water Proof)',
    category: 'Timber & Boards',
    quantity: 65,
    unit: 'Sheets',
    unitCostNaira: 28500,
    supplier: 'Timber Market Merchants Ltd',
    locationSourced: 'Timber Market, Uyo',
    stockStatus: 'In Stock',
    allocatedToProject: 'Osongama Suite',
    lastUpdated: '2026-03-02'
  },
  {
    id: 'mat-03',
    itemName: 'Acoustic Charcoal Fluted Wall Panels (2.8m x 16cm)',
    category: 'Timber & Boards',
    quantity: 80,
    unit: 'Planks',
    unitCostNaira: 14500,
    supplier: 'DecorPrime Lagos Import',
    locationSourced: 'Direct Wharf / Lagos',
    stockStatus: 'Allocated to Site',
    allocatedToProject: 'Shelter Afrique Villa',
    lastUpdated: '2026-02-28'
  },
  {
    id: 'mat-04',
    itemName: 'Calacatta Gold Honed Porcelain (1200mm x 600mm)',
    category: 'Tiles & Marble',
    quantity: 110,
    unit: 'Cartons (2.16 sqm)',
    unitCostNaira: 36000,
    supplier: 'E-Ceramics Port Harcourt Hub',
    locationSourced: 'Port Harcourt Depot',
    stockStatus: 'Allocated to Site',
    allocatedToProject: 'Ewet Housing Fit-Out',
    lastUpdated: '2026-03-03'
  },
  {
    id: 'mat-05',
    itemName: '24V Warm 3000K COB Dotless LED Strip (50m reel)',
    category: 'Lighting & Electrical',
    quantity: 12,
    unit: 'Reels',
    unitCostNaira: 42000,
    supplier: 'LumenTech West Africa',
    locationSourced: 'Alaba International / Express Cargo',
    stockStatus: 'In Stock',
    allocatedToProject: 'Shelter Afrique Villa',
    lastUpdated: '2026-02-25'
  },
  {
    id: 'mat-06',
    itemName: 'Magnetic Track Rail System (Surface & Recessed 2m)',
    category: 'Lighting & Electrical',
    quantity: 24,
    unit: 'Tracks',
    unitCostNaira: 32000,
    supplier: 'LumenTech West Africa',
    locationSourced: 'Alaba International',
    stockStatus: 'Low Stock',
    allocatedToProject: 'Osongama Suite',
    lastUpdated: '2026-03-02'
  },
  {
    id: 'mat-07',
    itemName: 'Jotun Fenomastic Stucco Antico & Pure Silk (20L)',
    category: 'Paints & Finishes',
    quantity: 18,
    unit: 'Buckets',
    unitCostNaira: 78000,
    supplier: 'ColorZone Uyo Center',
    locationSourced: 'Ikot Ekpene Road, Uyo',
    stockStatus: 'In Stock',
    allocatedToProject: 'Ewet Housing Fit-Out',
    lastUpdated: '2026-03-01'
  },
  {
    id: 'mat-08',
    itemName: 'Heavy Linen Sheer & Blackout Dual Fabric (50m)',
    category: 'Textiles & Decor',
    quantity: 8,
    unit: 'Rolls',
    unitCostNaira: 125000,
    supplier: 'LuxeTextiles Victoria Island',
    locationSourced: 'Lagos Direct Dispatch',
    stockStatus: 'Order Placed',
    allocatedToProject: 'Shelter Afrique Villa',
    lastUpdated: '2026-03-04'
  }
];

export const INITIAL_ARTISANS: Artisan[] = [
  {
    id: 'art-01',
    fullName: 'Aniekan Akpan',
    trade: 'Master POP Plasterer',
    phone: '+234 802 311 9044',
    dailyRateNaira: 16000,
    currentProject: 'Ewet Housing Fit-Out',
    rating: 4.9,
    status: 'On Site',
    yearsWithVeph: 4
  },
  {
    id: 'art-02',
    fullName: 'Edet Sunday',
    trade: 'Bespoke Joiner & Cabinetmaker',
    phone: '+234 803 456 7812',
    dailyRateNaira: 18000,
    currentProject: 'Osongama Suite',
    rating: 5.0,
    status: 'On Site',
    yearsWithVeph: 5
  },
  {
    id: 'art-03',
    fullName: 'Udeme Effiong',
    trade: 'Electrical Technician',
    phone: '+234 814 990 1283',
    dailyRateNaira: 15000,
    currentProject: 'Shelter Afrique Villa',
    rating: 4.8,
    status: 'On Site',
    yearsWithVeph: 3
  },
  {
    id: 'art-04',
    fullName: 'Iniobong Ekanem',
    trade: 'Master Tiler',
    phone: '+234 808 672 3491',
    dailyRateNaira: 16500,
    currentProject: 'Ewet Housing Fit-Out',
    rating: 4.9,
    status: 'Scheduled',
    yearsWithVeph: 4
  },
  {
    id: 'art-05',
    fullName: 'Nsikan Bassey',
    trade: 'Architectural Painter',
    phone: '+234 816 554 2209',
    dailyRateNaira: 14000,
    currentProject: 'Shelter Afrique Villa',
    rating: 4.7,
    status: 'Available',
    yearsWithVeph: 2
  },
  {
    id: 'art-06',
    fullName: 'Ekpenyong Okon',
    trade: 'Ironmonger & Welder',
    phone: '+234 802 994 8812',
    dailyRateNaira: 17000,
    currentProject: 'Ring Road III Residence',
    rating: 4.9,
    status: 'On Site',
    yearsWithVeph: 3
  }
];

export const BRAND_CONTACT = {
  name: 'Veph Interiors & Exterior',
  principal: 'Victor Ephraim',
  title: 'Principal Designer & Project Manager',
  address: 'Idongesit Ntem Isua Avenue, Uyo 520101, Akwa Ibom State, Nigeria',
  phone: '+234 812 916 0273',
  whatsappDirect: 'https://wa.me/2348129160273?text=Hello%20Veph%20Interiors,%20I%20would%20like%20to%20discuss%20a%20design%20project%20in%20Akwa%20Ibom',
  email: 'vephinteriors@gmail.com',
  workingHours: 'Mon – Sat: 8:00 AM – 6:30 PM WAT'
};
