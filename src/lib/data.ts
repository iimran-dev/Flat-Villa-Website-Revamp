// ===== MOCK DATA FOR LUXURY PLATFORM =====

export interface Property {
  id: string;
  name: string;
  developer: string;
  developerLogo?: string;
  price: number;
  priceLabel: string;
  expectedROI: number;
  aiMatch: number;
  investmentScore: number;
  rentalYield: number;
  completionDate: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  areaUnit: string;
  location: string;
  city: string;
  image: string;
  images: string[];
  badge?: string;
  type: string;
  description: string;
  amenities: string[];
  nearbyPlaces: { name: string; distance: string; type: string }[];
  developerRating: number;
  downPayment: number;
  monthlyEMI: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  appreciation: number;
  demandIndex: number;
  verified: boolean;
}

export interface Location {
  id: string;
  city: string;
  country: string;
  image: string;
  projectsCount: number;
  averageROI: number;
  appreciationForecast: number;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  verified: boolean;
  investment?: string;
}

export const NAV_LINKS = [
  { label: 'Investments', href: '#investments' },
  { label: 'Locations', href: '#locations' },
  { label: 'AI Advisor', href: '#advisor' },
  { label: 'Calculator', href: '#calculator' },
  { label: 'About', href: '#about' },
];

export const SEARCH_CHIPS = [
  'Sea View',
  'Ready to Move',
  'Luxury Villa',
  'Rental Income',
  'Best ROI',
  'Family Living',
];

export const STATISTICS = [
  { label: 'Projects', value: 2000, suffix: '+' },
  { label: 'Developers', value: 150, suffix: '+' },
  { label: 'Cities', value: 18, suffix: '' },
  { label: 'Happy Investors', value: 10000, suffix: '+', format: true },
];

export const PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    name: 'The Riviera Residence',
    developer: 'Ora Developers',
    price: 850000,
    priceLabel: '$850,000',
    expectedROI: 12.5,
    aiMatch: 96,
    investmentScore: 92,
    rentalYield: 8.2,
    completionDate: 'Q4 2027',
    bedrooms: 4,
    bathrooms: 5,
    area: 320,
    areaUnit: 'sqm',
    location: 'North Coast, Egypt',
    city: 'North Coast',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    ],
    badge: 'Exclusive',
    type: 'Villa',
    description: 'An exclusive beachfront villa offering unparalleled luxury living with panoramic Mediterranean views. Featuring smart home technology, infinity pool, and private beach access.',
    amenities: ['Infinity Pool', 'Smart Home', 'Private Beach', 'Spa', 'Gym', 'Concierge', 'EV Charging', 'Sky Garden'],
    nearbyPlaces: [
      { name: 'Airport', distance: '45 min', type: 'transport' },
      { name: 'Marina', distance: '5 min', type: 'lifestyle' },
      { name: 'Golf Course', distance: '10 min', type: 'lifestyle' },
      { name: 'Hospital', distance: '20 min', type: 'health' },
    ],
    developerRating: 4.8,
    downPayment: 10,
    monthlyEMI: 4200,
    riskLevel: 'Low',
    appreciation: 15,
    demandIndex: 94,
    verified: true,
  },
  {
    id: 'prop-2',
    name: 'Cairo Heights Penthouse',
    developer: 'Mountain View',
    price: 620000,
    priceLabel: '$620,000',
    expectedROI: 14.2,
    aiMatch: 93,
    investmentScore: 89,
    rentalYield: 9.1,
    completionDate: 'Q2 2027',
    bedrooms: 3,
    bathrooms: 4,
    area: 245,
    areaUnit: 'sqm',
    location: 'New Cairo, Egypt',
    city: 'Cairo',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
    ],
    badge: 'Best ROI',
    type: 'Penthouse',
    description: 'A stunning penthouse in the heart of New Cairo with breathtaking city views. Premium finishes, smart home integration, and world-class amenities define this exceptional residence.',
    amenities: ['Smart Home', 'Gym', 'Clubhouse', 'Kids Area', 'Business Lounge', 'Jogging Track', 'Retail', 'EV Charging'],
    nearbyPlaces: [
      { name: 'Cairo Airport', distance: '25 min', type: 'transport' },
      { name: 'Metro Station', distance: '8 min', type: 'transport' },
      { name: 'Mall', distance: '5 min', type: 'lifestyle' },
      { name: 'International School', distance: '3 min', type: 'education' },
    ],
    developerRating: 4.6,
    downPayment: 15,
    monthlyEMI: 3100,
    riskLevel: 'Low',
    appreciation: 18,
    demandIndex: 91,
    verified: true,
  },
  {
    id: 'prop-3',
    name: 'Sokhna Bay Estate',
    developer: 'Talaat Moustafa Group',
    price: 1200000,
    priceLabel: '$1,200,000',
    expectedROI: 11.8,
    aiMatch: 91,
    investmentScore: 88,
    rentalYield: 7.5,
    completionDate: 'Q1 2028',
    bedrooms: 5,
    bathrooms: 6,
    area: 450,
    areaUnit: 'sqm',
    location: 'Ain Sokhna, Egypt',
    city: 'Ain Sokhna',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
    ],
    badge: 'New Launch',
    type: 'Villa',
    description: 'A magnificent estate nestled along the Red Sea coast. This property offers an exclusive lifestyle with private beach, marina access, and resort-level amenities.',
    amenities: ['Private Beach', 'Infinity Pool', 'Marina', 'Spa', 'Smart Home', 'Gym', 'Kids Area', 'Business Lounge'],
    nearbyPlaces: [
      { name: 'Cairo', distance: '90 min', type: 'city' },
      { name: 'Marina', distance: '2 min', type: 'lifestyle' },
      { name: 'Golf Course', distance: '15 min', type: 'lifestyle' },
      { name: 'Hospital', distance: '25 min', type: 'health' },
    ],
    developerRating: 4.5,
    downPayment: 10,
    monthlyEMI: 5900,
    riskLevel: 'Medium',
    appreciation: 14,
    demandIndex: 87,
    verified: true,
  },
  {
    id: 'prop-4',
    name: 'The Capital Gate',
    developer: 'Emaar Misr',
    price: 480000,
    priceLabel: '$480,000',
    expectedROI: 15.1,
    aiMatch: 94,
    investmentScore: 95,
    rentalYield: 10.3,
    completionDate: 'Q3 2026',
    bedrooms: 2,
    bathrooms: 3,
    area: 180,
    areaUnit: 'sqm',
    location: 'New Administrative Capital, Egypt',
    city: 'New Capital',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    ],
    badge: 'Hot Deal',
    type: 'Apartment',
    description: 'A premium apartment in Egypt\'s New Administrative Capital featuring cutting-edge architecture, smart home systems, and exceptional investment potential in a rapidly developing area.',
    amenities: ['Smart Home', 'Gym', 'Clubhouse', 'Retail', 'EV Charging', 'Sky Garden', 'Kids Area', 'Business Lounge'],
    nearbyPlaces: [
      { name: 'New Capital Airport', distance: '15 min', type: 'transport' },
      { name: 'Government District', distance: '5 min', type: 'business' },
      { name: 'Mall', distance: '8 min', type: 'lifestyle' },
      { name: 'Hospital', distance: '10 min', type: 'health' },
    ],
    developerRating: 4.9,
    downPayment: 5,
    monthlyEMI: 2400,
    riskLevel: 'Low',
    appreciation: 22,
    demandIndex: 96,
    verified: true,
  },
  {
    id: 'prop-5',
    name: 'Marassi Lagoon Villa',
    developer: 'Emaar Misr',
    price: 975000,
    priceLabel: '$975,000',
    expectedROI: 13.4,
    aiMatch: 95,
    investmentScore: 91,
    rentalYield: 8.8,
    completionDate: 'Q2 2027',
    bedrooms: 4,
    bathrooms: 5,
    area: 380,
    areaUnit: 'sqm',
    location: 'North Coast, Egypt',
    city: 'North Coast',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    ],
    badge: 'Exclusive',
    type: 'Villa',
    description: 'An exquisite lagoon-front villa in the prestigious Marassi community. Features a private pool, lagoon access, and world-class resort amenities.',
    amenities: ['Private Pool', 'Lagoon Access', 'Smart Home', 'Gym', 'Spa', 'Clubhouse', 'Kids Area', 'EV Charging'],
    nearbyPlaces: [
      { name: 'Airport', distance: '50 min', type: 'transport' },
      { name: 'Beach', distance: '2 min', type: 'lifestyle' },
      { name: 'Golf Course', distance: '8 min', type: 'lifestyle' },
      { name: 'Marina', distance: '10 min', type: 'lifestyle' },
    ],
    developerRating: 4.9,
    downPayment: 10,
    monthlyEMI: 4800,
    riskLevel: 'Low',
    appreciation: 16,
    demandIndex: 93,
    verified: true,
  },
  {
    id: 'prop-6',
    name: 'GPX Tower Residence',
    developer: 'Gulf Contracting',
    price: 390000,
    priceLabel: '$390,000',
    expectedROI: 16.3,
    aiMatch: 90,
    investmentScore: 87,
    rentalYield: 11.2,
    completionDate: 'Q4 2026',
    bedrooms: 2,
    bathrooms: 2,
    area: 155,
    areaUnit: 'sqm',
    location: 'New Cairo, Egypt',
    city: 'Cairo',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
    ],
    type: 'Apartment',
    description: 'A sleek, modern apartment in one of New Cairo\'s most sought-after towers. Features panoramic views, premium finishes, and exceptional rental potential.',
    amenities: ['Smart Home', 'Gym', 'Rooftop Lounge', 'EV Charging', 'Retail', 'Kids Area', 'Business Lounge', 'Jogging Track'],
    nearbyPlaces: [
      { name: 'Cairo Airport', distance: '20 min', type: 'transport' },
      { name: 'Metro', distance: '10 min', type: 'transport' },
      { name: 'Mall', distance: '3 min', type: 'lifestyle' },
      { name: 'University', distance: '8 min', type: 'education' },
    ],
    developerRating: 4.4,
    downPayment: 10,
    monthlyEMI: 1950,
    riskLevel: 'Medium',
    appreciation: 19,
    demandIndex: 88,
    verified: true,
  },
];

export const LOCATIONS: Location[] = [
  {
    id: 'loc-1',
    city: 'North Coast',
    country: 'Egypt',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    projectsCount: 340,
    averageROI: 12.8,
    appreciationForecast: 15,
    description: 'Egypt\'s premier Mediterranean coastline with world-class resort developments.',
  },
  {
    id: 'loc-2',
    city: 'New Cairo',
    country: 'Egypt',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80',
    projectsCount: 520,
    averageROI: 14.1,
    appreciationForecast: 18,
    description: 'The capital\'s most prestigious residential and commercial district.',
  },
  {
    id: 'loc-3',
    city: 'New Capital',
    country: 'Egypt',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
    projectsCount: 280,
    averageROI: 15.5,
    appreciationForecast: 22,
    description: 'Egypt\'s futuristic administrative capital with explosive growth potential.',
  },
  {
    id: 'loc-4',
    city: 'Ain Sokhna',
    country: 'Egypt',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    projectsCount: 180,
    averageROI: 11.5,
    appreciationForecast: 14,
    description: 'Red Sea paradise with stunning mountain and sea views.',
  },
  {
    id: 'loc-5',
    city: 'Sharm El Sheikh',
    country: 'Egypt',
    image: 'https://images.unsplash.com/photo-1530538095376-a4936b35b5f0?w=800&q=80',
    projectsCount: 150,
    averageROI: 10.8,
    appreciationForecast: 12,
    description: 'World-renowned resort destination with exceptional tourism returns.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Ahmed Al-Rashid',
    role: 'Real Estate Investor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    rating: 5,
    text: 'AURUM completely transformed how I approach real estate investment. The AI recommendations are incredibly accurate, and my portfolio has grown 23% in just 18 months. The platform\'s intelligence is unmatched.',
    verified: true,
    investment: '$2.4M invested across 4 properties',
  },
  {
    id: 'test-2',
    name: 'Sarah Mitchell',
    role: 'Portfolio Manager, GCC Region',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    rating: 5,
    text: 'As a professional managing multiple client portfolios, AURUM\'s AI scoring and comparison tools have saved me hundreds of hours. The investment insights are data-driven and remarkably precise.',
    verified: true,
    investment: '$8.1M managed for 12 clients',
  },
  {
    id: 'test-3',
    name: 'Omar Hassan',
    role: 'First-time Investor',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    rating: 5,
    text: 'I was nervous about my first investment, but the AI advisor guided me through every step. The property I purchased has already appreciated 18% and generates excellent rental income. Truly a game-changer.',
    verified: true,
    investment: '$450K first investment',
  },
];

export const AMENITIES = [
  { name: 'Infinity Pool', icon: 'waves' as const },
  { name: 'Smart Home', icon: 'cpu' as const },
  { name: 'Gym', icon: 'dumbbell' as const },
  { name: 'Clubhouse', icon: 'building-2' as const },
  { name: 'Kids Area', icon: 'baby' as const },
  { name: 'Business Lounge', icon: 'briefcase' as const },
  { name: 'EV Charging', icon: 'zap' as const },
  { name: 'Sky Garden', icon: 'flower-2' as const },
  { name: 'Spa', icon: 'sparkles' as const },
  { name: 'Jogging Track', icon: 'activity' as const },
  { name: 'Retail', icon: 'shopping-bag' as const },
  { name: 'Private Beach', icon: 'palmtree' as const },
];

export const WHY_INVEST_POINTS = [
  {
    year: '2020',
    title: 'Economic Reform',
    description: 'Egypt\'s ambitious economic reform program launched, stabilizing the currency and attracting foreign investment.',
  },
  {
    year: '2022',
    title: 'New Capital Rising',
    description: 'The New Administrative Capital begins taking shape with $58B in government infrastructure investment.',
  },
  {
    year: '2024',
    title: 'Tourism Boom',
    description: 'Record 15M+ tourists drive unprecedented demand for premium hospitality and residential properties.',
  },
  {
    year: '2026',
    title: 'Smart City Era',
    description: 'Smart city infrastructure, green building mandates, and AI-powered urban planning redefine Egyptian real estate.',
  },
];
