export interface CarColor {
  id: string;
  name: string;
  hex: string;
  metalness: number;
  roughness: number;
  clearcoat: number;
  clearcoatRoughness?: number;
  description: string;
}

export interface WheelFinish {
  id: string;
  name: string;
  hex: string;
  metalness: number;
  roughness: number;
  description: string;
}

export interface CaliperColor {
  id: string;
  name: string;
  hex: string;
}

export const PAINT_COLORS: CarColor[] = [
  {
    id: 'silver',
    name: 'Racing Silver',
    hex: '#d5dae2',
    metalness: 0.82,
    roughness: 0.22,
    clearcoat: 0.95,
    clearcoatRoughness: 0.08,
    description: 'Liquid metallic silver with multi-layer deep luster.',
  },
  {
    id: 'black',
    name: 'Midnight Black',
    hex: '#16171a',
    metalness: 0.88,
    roughness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    description: 'Ultra-deep obsidian black with subtle metallic flake.',
  },
  {
    id: 'red',
    name: 'Guards Red',
    hex: '#c41818',
    metalness: 0.55,
    roughness: 0.26,
    clearcoat: 0.92,
    clearcoatRoughness: 0.08,
    description: 'Iconic motorsport red engineered for high visual velocity.',
  },
  {
    id: 'white',
    name: 'Arctic White',
    hex: '#edf1f5',
    metalness: 0.45,
    roughness: 0.28,
    clearcoat: 0.9,
    clearcoatRoughness: 0.1,
    description: 'Crisp, high-luminance alpine finish with satin pearlescence.',
  },
  {
    id: 'blue',
    name: 'Gentian Blue Metallic',
    hex: '#0f2b52',
    metalness: 0.85,
    roughness: 0.22,
    clearcoat: 0.95,
    clearcoatRoughness: 0.08,
    description: 'Deep royal metallic blue inspired by twilight endurance circuits.',
  },
  {
    id: 'green',
    name: 'Oak Green Metallic',
    hex: '#162e22',
    metalness: 0.82,
    roughness: 0.24,
    clearcoat: 0.95,
    clearcoatRoughness: 0.08,
    description: 'Heritage racing green infused with subtle gold-flake undercurrents.',
  },
];

export const WHEEL_FINISHES: WheelFinish[] = [
  {
    id: 'titanium',
    name: 'Satin Titanium',
    hex: '#8c929d',
    metalness: 0.95,
    roughness: 0.35,
    description: 'Lightweight forged finish with matte-satin sheen.',
  },
  {
    id: 'black',
    name: 'Gloss Obsidian Black',
    hex: '#18191c',
    metalness: 0.9,
    roughness: 0.18,
    description: 'High-gloss dark alloy matching carbon aerodynamic elements.',
  },
  {
    id: 'neodyme',
    name: 'Satin Neodyme Gold',
    hex: '#a38758',
    metalness: 0.92,
    roughness: 0.3,
    description: 'Refined champagne gold inspired by competition GT prototypes.',
  },
  {
    id: 'silver',
    name: 'Brushed Diamond Silver',
    hex: '#e2e6eb',
    metalness: 0.98,
    roughness: 0.2,
    description: 'Precision CNC-machined bright finish.',
  },
];

export const CALIPER_COLORS: CaliperColor[] = [
  { id: 'yellow', name: 'Acid Racing Yellow (PCCB)', hex: '#facc15' },
  { id: 'red', name: 'Guards Red', hex: '#dc2626' },
  { id: 'black', name: 'High-Gloss Black', hex: '#1e232a' },
];

export interface VehicleSpec {
  category: string;
  value: string;
  unit?: string;
  label: string;
  detail: string;
}

export const CORE_METRICS = [
  { value: '518', unit: 'HP', label: 'Max Output', subtext: 'at 8,500 RPM' },
  { value: '3.2', unit: 'SEC', label: '0 – 100 KM/H', subtext: 'Launch Control Active' },
  { value: '296', unit: 'KM/H', label: 'Top Track Speed', subtext: 'Tested at Nürburgring' },
  { value: '9,000', unit: 'RPM', label: 'Engine Redline', subtext: 'Naturally Aspirated' },
  { value: '860', unit: 'KG', label: 'Peak Downforce', subtext: 'at 285 km/h' },
  { value: '1,450', unit: 'KG', label: 'Curb Weight', subtext: 'Lightweight Carbon Spec' },
];

export const TECHNICAL_SPECS: VehicleSpec[] = [
  {
    category: 'Powertrain',
    label: 'Engine Architecture',
    value: '4.0L Naturally Aspirated Flat-Six Boxer',
    detail: 'High-revving motorsport powerplant with rigid valve drive, individual throttle bodies, and dry-sump lubrication.',
  },
  {
    category: 'Powertrain',
    label: 'Max Power & Torque',
    value: '518 HP (386 kW) / 465 Nm @ 6,300 RPM',
    detail: 'Specific power output of 129.5 HP per litre without artificial turbo lag.',
  },
  {
    category: 'Transmission',
    label: 'Gearbox',
    value: '7-Speed Dual-Clutch (PDK)',
    detail: 'Lightning-fast gear shifts in milliseconds without interrupting tractive torque.',
  },
  {
    category: 'Aerodynamics',
    label: 'Active Aero (DRS)',
    value: 'Hydraulic Rear Wing with DRS Flap',
    detail: 'Continuously adjusts downforce balance between front and rear axle based on steering angle and longitudinal acceleration.',
  },
  {
    category: 'Chassis & Brakes',
    label: 'Braking System',
    value: 'PCCB Ceramic Composite (410mm / 390mm)',
    detail: 'Internally vented and cross-drilled ceramic discs with 6-piston monobloc fixed calipers front, 4-piston rear.',
  },
  {
    category: 'Suspension',
    label: 'Axle Kinematics',
    value: 'Double-Wishbone Front & Active Rear Steering',
    detail: 'Teardrop-shaped wishbones provide up to 40 kg aerodynamic downforce directly onto the front axle.',
  },
];

export const PERFORMANCE_CHAPTERS = [
  {
    id: 'powertrain',
    title: 'THE 4.0L BOXER HEART',
    subtitle: 'NATURALLY ASPIRATED PURITY',
    description:
      'Operating up to an exhilarating 9,000 RPM, the four-litre six-cylinder boxer engine represents the pinnacle of atmospheric combustion. Individual throttle butterflies per cylinder ensure instantaneous throttle response, sending power through titanium connecting rods directly to the rear wheels.',
    stat1: { value: '9,000', label: 'RPM Limit' },
    stat2: { value: '518', label: 'Horsepower' },
    stat3: { value: '386', label: 'kW Output' },
    features: [
      'Individual throttle bodies for razor-sharp response',
      'Dry sump lubrication with external oil tank',
      'Forged titanium connecting rods',
      'Lightweight stainless steel sports exhaust',
    ],
  },
  {
    id: 'aerodynamics',
    title: 'ACTIVE DRS DOWNDRAFT',
    subtitle: 'CARVING THROUGH THE AIR',
    description:
      'For the first time on a production vehicle, active Drag Reduction System (DRS) technology integrates seamlessly into the swan-neck rear wing. At the touch of a button or automatically under heavy braking, the aerodynamic profile transforms to generate 860 kg of downforce.',
    stat1: { value: '860', label: 'KG Downforce' },
    stat2: { value: '0.39', label: 'Drag Coeff' },
    stat3: { value: '2-Stage', label: 'Active Aero' },
    features: [
      'Swan-neck top-mounted rear wing',
      'Hydraulically controlled continuously variable main wing blade',
      'Front underbody active aero diffusers',
      'Wheel arch louver ventilation for brake cooling',
    ],
  },
  {
    id: 'chassis',
    title: 'DOUBLE-WISHBONE PRECISION',
    subtitle: 'RACE-BRED KINEMATICS',
    description:
      'The motorsport-derived double-wishbone front axle ensures camber stiffness under severe lateral G-forces. Active rear-axle steering provides high-speed stability and low-speed agility, while ball joints on all suspension links deliver unfiltered tactile road feedback.',
    stat1: { value: '1.45', label: 'Max Lateral G' },
    stat2: { value: '410', label: 'MM Front Rotors' },
    stat3: { value: '4-Way', label: 'Adjustable Dampers' },
    features: [
      'Double-wishbone front suspension with aero-profile links',
      'Porsche Active Suspension Management (PASM)',
      'Rear-axle steering with sports tuning',
      'Ball joints on all chassis suspension mountings',
    ],
  },
];
