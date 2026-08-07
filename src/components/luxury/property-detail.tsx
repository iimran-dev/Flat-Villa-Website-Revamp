'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Heart,
  Share2,
  Bot,
  Maximize2,
  MapPin,
  BedDouble,
  Bath,
  Calendar,
  Check,
  Plane,
  Wine,
  GraduationCap,
  Building2,
  Star,
  ShieldCheck,
  MessageSquare,
  Phone,
  PhoneCall,
  TrendingUp,
  Cpu,
  Dumbbell,
  Sparkles,
  Zap,
  Baby,
  Briefcase,
  ShoppingBag,
  Flower2,
  Activity,
  Waves,
  ChevronRight,
  ArrowUpRight,
  Clock,
  DollarSign,
  BarChart3,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts';
import { PROPERTIES } from '@/lib/data';
import { useAppStore } from '@/lib/store';

// ===== AMENITY ICON MAP =====
function getAmenityIcon(name: string) {
  const map: Record<string, React.ElementType> = {
    'Infinity Pool': Waves,
    'Smart Home': Cpu,
    'Private Beach': Waves,
    'Spa': Sparkles,
    'Gym': Dumbbell,
    'Concierge': Briefcase,
    'EV Charging': Zap,
    'Sky Garden': Flower2,
    'Clubhouse': Building2,
    'Kids Area': Baby,
    'Business Lounge': Briefcase,
    'Jogging Track': Activity,
    'Retail': ShoppingBag,
    'Private Pool': Waves,
    'Lagoon Access': Waves,
    'Marina': Waves,
    'Rooftop Lounge': Building2,
  };
  return map[name] || Check;
}

// ===== NEARBY PLACE ICON MAP =====
function getNearbyIcon(type: string) {
  const map: Record<string, React.ElementType> = {
    transport: Plane,
    lifestyle: Wine,
    health: Heart,
    education: GraduationCap,
    business: Building2,
    city: Building2,
  };
  return map[type] || MapPin;
}

// ===== RISK LEVEL COLORS =====
function getRiskColor(level: string) {
  switch (level) {
    case 'Low':
      return 'bg-emerald-100 text-emerald-700';
    case 'Medium':
      return 'bg-amber-100 text-amber-700';
    case 'High':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

// ===== SCORE GAUGE COMPONENT =====
function ScoreGauge({
  score,
  size = 120,
  strokeWidth = 8,
}: {
  score: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOffset(circumference * (1 - score / 100));
    }, 100);
    return () => clearTimeout(timer);
  }, [score, circumference]);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        {/* Score arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#D4AF37"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </svg>
      {/* Center score */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="font-[family-name:var(--font-jakarta)] font-bold text-navy"
          style={{ fontSize: size * 0.28 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {score}
        </motion.span>
        <span
          className="text-muted-foreground"
          style={{ fontSize: size * 0.1 }}
        >
          /100
        </span>
      </div>
    </div>
  );
}

// ===== MOCK REVIEW DATA =====
const MOCK_REVIEWS = [
  {
    id: 'r1',
    rating: 5,
    text: 'Outstanding investment opportunity. The AI analysis was spot-on with the ROI projections. Already seeing 12% appreciation within the first year. The developer has an excellent track record and the location is prime.',
    name: 'Ahmed Al-Rashid',
    date: '2 months ago',
  },
  {
    id: 'r2',
    rating: 5,
    text: 'The entire buying process was seamless. From AI recommendation to property visit, everything was handled professionally. The rental yield projections are conservative — I\'m actually getting higher returns than expected.',
    name: 'Sarah Mitchell',
    date: '1 month ago',
  },
];

// ===== PRICE PROJECTION DATA =====
function getPriceData(price: number) {
  return [
    { year: 'Year 1', value: Math.round(price) },
    { year: 'Year 2', value: Math.round(price * 1.12) },
    { year: 'Year 3', value: Math.round(price * 1.25) },
    { year: 'Year 4', value: Math.round(price * 1.40) },
    { year: 'Year 5', value: Math.round(price * 1.58) },
  ];
}

// ===== CUSTOM TOOLTIP =====
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="luxury-card px-4 py-3 rounded-xl shadow-lg">
        <p className="text-xs text-muted-foreground font-[family-name:var(--font-inter)]">{label}</p>
        <p className="text-sm font-bold text-navy font-[family-name:var(--font-jakarta)]">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
}

// ===== TAB TYPES =====
type TabKey = 'overview' | 'amenities' | 'investment' | 'location' | 'reviews';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'amenities', label: 'Amenities' },
  { key: 'investment', label: 'Investment' },
  { key: 'location', label: 'Location' },
  { key: 'reviews', label: 'Reviews' },
];

// ===== INNER DETAIL VIEW (keyed by property.id to reset state) =====
function PropertyDetailInner({
  property,
  onBack,
  onToggleAdvisor,
}: {
  property: NonNullable<ReturnType<typeof PROPERTIES['find']>>;
  onBack: () => void;
  onToggleAdvisor: () => void;
}) {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [galleryImages, setGalleryImages] = useState<string[]>(() => [...property.images]);
  const [liked, setLiked] = useState(false);

  const priceData = getPriceData(property.price);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleSwapImage = (index: number) => {
    if (index === 0) return;
    setGalleryImages((prev) => {
      const next = [...prev];
      [next[0], next[index]] = [next[index], next[0]];
      return next;
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-40 bg-white overflow-y-auto scrollbar-luxury"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ===== TOP BAR ===== */}
        <div className="fixed top-0 left-0 right-0 z-50 glass-navy h-16 flex items-center px-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-[#D4AF37] transition-colors duration-300 shrink-0"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-[family-name:var(--font-inter)] text-sm hidden sm:inline">Back</span>
          </button>

          <h1 className="flex-1 text-center font-[family-name:var(--font-jakarta)] text-white text-sm md:text-base font-semibold truncate px-4">
            {property.name}
          </h1>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setLiked(!liked)}
              className={`p-2 rounded-full transition-colors duration-300 ${
                liked ? 'text-red-400' : 'text-white/70 hover:text-[#D4AF37]'
              }`}
              aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`h-5 w-5 transition-transform duration-300 ${liked ? 'scale-110 fill-current' : ''}`} />
            </button>
            <button
              className="p-2 rounded-full text-white/70 hover:text-[#D4AF37] transition-colors duration-300"
              aria-label="Share property"
            >
              <Share2 className="h-5 w-5" />
            </button>
            <button
              onClick={onToggleAdvisor}
              className="p-2 rounded-full text-white/70 hover:text-[#D4AF37] transition-colors duration-300"
              aria-label="Open AI advisor"
            >
              <Bot className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* ===== MAIN LAYOUT ===== */}
        <div className="flex flex-col lg:flex-row pt-16">
          {/* ===== LEFT CONTENT ===== */}
          <div className="flex-1 px-6 md:px-12 lg:px-20 py-8 pb-24 lg:pb-8">
            {/* ----- Image Gallery ----- */}
            <motion.div
              className="grid grid-cols-4 grid-rows-2 gap-3 h-[400px] md:h-[500px] rounded-3xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {galleryImages.map((img, idx) => (
                <div
                  key={`${img}-${idx}`}
                  className={`relative cursor-pointer overflow-hidden group ${
                    idx === 0 ? 'col-span-2 row-span-2' : ''
                  }`}
                  onClick={() => handleSwapImage(idx)}
                >
                  <img
                    src={img}
                    alt={`${property.name} photo ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <Maximize2 className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </motion.div>

            {/* ----- Tabs ----- */}
            <motion.div
              className="mt-12 border-b border-border-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex gap-6 overflow-x-auto no-scrollbar">
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`relative font-[family-name:var(--font-inter)] text-sm whitespace-nowrap py-3 transition-colors duration-300 ${
                      activeTab === tab.key
                        ? 'text-navy font-semibold'
                        : 'text-muted-foreground hover:text-navy'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.key && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]"
                        layoutId="activeTab"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* ----- Tab Content ----- */}
            <div className="mt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'overview' && <OverviewTab property={property} />}
                  {activeTab === 'amenities' && <AmenitiesTab property={property} />}
                  {activeTab === 'investment' && <InvestmentTab property={property} priceData={priceData} />}
                  {activeTab === 'location' && <LocationTab property={property} />}
                  {activeTab === 'reviews' && <ReviewsTab />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ===== RIGHT SIDEBAR ===== */}
          <aside className="w-full lg:w-[400px] lg:min-w-[400px] border-l border-border-light px-6 py-8 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] overflow-y-auto scrollbar-luxury hidden lg:block">
            <SidebarContent property={property} toggleAdvisor={onToggleAdvisor} />
          </aside>
        </div>

        {/* ===== MOBILE BOTTOM BAR ===== */}
        <div className="fixed bottom-0 left-0 right-0 lg:hidden glass-navy h-16 flex items-center justify-between px-6 z-50">
          <div className="flex-1 min-w-0 mr-4">
            <p className="text-sm text-white truncate font-[family-name:var(--font-inter)]">
              {property.name}
            </p>
            <p className="text-[#D4AF37] font-semibold font-[family-name:var(--font-jakarta)]">
              {property.priceLabel}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors duration-300">
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
            <button className="flex items-center gap-1.5 bg-[#D4AF37] hover:bg-[#e0be4a] text-[#0F172A] text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors duration-300 btn-luxury">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Enquire</span>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ===== MAIN COMPONENT =====
export function PropertyDetail() {
  const selectedPropertyId = useAppStore((s) => s.selectedPropertyId);
  const selectProperty = useAppStore((s) => s.selectProperty);
  const toggleAdvisor = useAppStore((s) => s.toggleAdvisor);

  const property = useMemo(
    () => PROPERTIES.find((p) => p.id === selectedPropertyId) ?? null,
    [selectedPropertyId]
  );

  if (!selectedPropertyId || !property) return null;

  return (
    <PropertyDetailInner
      key={property.id}
      property={property}
      onBack={() => selectProperty(null)}
      onToggleAdvisor={toggleAdvisor}
    />
  );
}

// ===== OVERVIEW TAB =====
function OverviewTab({ property }: { property: NonNullable<ReturnType<typeof PROPERTIES['find']>> }) {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h2 className="text-3xl font-[family-name:var(--font-jakarta)] font-bold text-navy">
          {property.name}
        </h2>
        <div className="flex items-center gap-2 mt-3 text-muted-foreground">
          <MapPin className="h-4 w-4 text-[#D4AF37]" />
          <span className="font-[family-name:var(--font-inter)]">{property.location}</span>
        </div>
      </div>

      <p className="text-navy/70 leading-relaxed font-[family-name:var(--font-inter)] text-base">
        {property.description}
      </p>

      <div className="grid grid-cols-2 gap-4">
        {[
          { icon: BedDouble, label: 'Bedrooms', value: `${property.bedrooms} Bed${property.bedrooms > 1 ? 's' : ''}` },
          { icon: Bath, label: 'Bathrooms', value: `${property.bathrooms} Bath${property.bathrooms > 1 ? 's' : ''}` },
          { icon: Maximize2, label: 'Area', value: `${property.area} ${property.areaUnit}` },
          { icon: Calendar, label: 'Completion', value: property.completionDate },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="luxury-card rounded-2xl p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-3">
              <stat.icon className="h-5 w-5 text-[#D4AF37]" />
            </div>
            <p className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">{stat.label}</p>
            <p className="text-lg font-[family-name:var(--font-jakarta)] font-semibold text-navy mt-0.5">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ===== AMENITIES TAB =====
function AmenitiesTab({ property }: { property: NonNullable<ReturnType<typeof PROPERTIES['find']>> }) {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-[family-name:var(--font-jakarta)] font-bold text-navy">
        Premium Amenities
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {property.amenities.map((amenity, i) => {
          const IconComponent = getAmenityIcon(amenity);
          return (
            <motion.div
              key={amenity}
              className="luxury-card rounded-2xl p-4 flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                <IconComponent className="h-4.5 w-4.5 text-[#D4AF37]" />
              </div>
              <span className="text-sm font-medium text-navy font-[family-name:var(--font-inter)]">
                {amenity}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ===== INVESTMENT TAB =====
function InvestmentTab({
  property,
  priceData,
}: {
  property: NonNullable<ReturnType<typeof PROPERTIES['find']>>;
  priceData: Array<{ year: string; value: number }>;
}) {
  return (
    <motion.div
      className="space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Score & Risk Section */}
      <div className="flex flex-col sm:flex-row items-center gap-8">
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-[family-name:var(--font-jakarta)] font-bold text-navy mb-4">
            Investment Score
          </h3>
          <ScoreGauge score={property.investmentScore} size={140} strokeWidth={10} />
        </div>
        <div className="flex-1 space-y-4 w-full">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">Risk Level</span>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${getRiskColor(property.riskLevel)}`}>
              {property.riskLevel === 'Low' && <ShieldCheck className="h-3.5 w-3.5" />}
              {property.riskLevel === 'Medium' && <Clock className="h-3.5 w-3.5" />}
              {property.riskLevel === 'High' && <TrendingUp className="h-3.5 w-3.5" />}
              {property.riskLevel} Risk
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">Expected Appreciation</span>
            <span className="flex items-center gap-1 text-sm font-semibold text-emerald-600 font-[family-name:var(--font-jakarta)]">
              <ArrowUpRight className="h-4 w-4" />
              {property.appreciation}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">Demand Index</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 rounded-full bg-surface overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-[#D4AF37]"
                  initial={{ width: 0 }}
                  animate={{ width: `${property.demandIndex}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                />
              </div>
              <span className="text-sm font-semibold text-navy font-[family-name:var(--font-jakarta)]">
                {property.demandIndex}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Price Projection Chart */}
      <div>
        <h3 className="text-xl font-[family-name:var(--font-jakarta)] font-bold text-navy mb-6">
          5-Year Price Projection
        </h3>
        <div className="luxury-card rounded-2xl p-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 12,
                    fontFamily: 'var(--font-inter)',
                    fill: '#64748B',
                  }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                  tick={{
                    fontSize: 12,
                    fontFamily: 'var(--font-inter)',
                    fill: '#64748B',
                  }}
                  width={55}
                />
                <RechartsTooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#D4AF37"
                  strokeWidth={2.5}
                  dot={{
                    fill: '#D4AF37',
                    r: 4,
                    strokeWidth: 2,
                    stroke: '#fff',
                  }}
                  activeDot={{
                    fill: '#D4AF37',
                    r: 6,
                    strokeWidth: 2,
                    stroke: '#fff',
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Rental Yield', value: `${property.rentalYield}%`, icon: DollarSign, color: 'text-emerald-600' },
          { label: 'Expected ROI', value: `${property.expectedROI}%`, icon: TrendingUp, color: 'text-[#D4AF37]' },
          { label: 'Down Payment', value: `${property.downPayment}%`, icon: BarChart3, color: 'text-navy' },
        ].map((metric, i) => (
          <motion.div
            key={metric.label}
            className="luxury-card rounded-2xl p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl bg-surface flex items-center justify-center`}>
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
              </div>
              <span className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">{metric.label}</span>
            </div>
            <p className="text-2xl font-[family-name:var(--font-jakarta)] font-bold text-navy">
              {metric.value}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ===== LOCATION TAB =====
function LocationTab({ property }: { property: NonNullable<ReturnType<typeof PROPERTIES['find']>> }) {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#D4AF37]/10 mb-4">
          <MapPin className="h-7 w-7 text-[#D4AF37]" />
        </div>
        <h3 className="text-2xl font-[family-name:var(--font-jakarta)] font-bold text-navy">
          Prime Location
        </h3>
        <p className="text-muted-foreground mt-2 font-[family-name:var(--font-inter)]">
          {property.location}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {property.nearbyPlaces.map((place, i) => {
          const IconComponent = getNearbyIcon(place.type);
          return (
            <motion.div
              key={place.name}
              className="luxury-card rounded-2xl p-5 flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                <IconComponent className="h-6 w-6 text-[#D4AF37]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-[family-name:var(--font-jakarta)] font-semibold text-navy truncate">
                  {place.name}
                </p>
                <p className="text-sm text-muted-foreground font-[family-name:var(--font-inter)] capitalize">
                  {place.type}
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-1">
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-sm font-semibold text-[#D4AF37] font-[family-name:var(--font-jakarta)]">
                  {place.distance}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ===== REVIEWS TAB =====
function ReviewsTab() {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <h3 className="text-2xl font-[family-name:var(--font-jakarta)] font-bold text-navy">
          Investor Reviews
        </h3>
        <p className="text-muted-foreground mt-2 font-[family-name:var(--font-inter)]">
          What verified investors are saying
        </p>
      </div>

      <div className="space-y-4">
        {MOCK_REVIEWS.map((review, i) => (
          <motion.div
            key={review.id}
            className="luxury-card rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            {/* Stars */}
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star
                  key={s}
                  className="h-4 w-4 text-[#D4AF37] fill-[#D4AF37]"
                />
              ))}
            </div>
            <p className="text-navy/80 leading-relaxed font-[family-name:var(--font-inter)] text-sm">
              &ldquo;{review.text}&rdquo;
            </p>
            <div className="mt-4 pt-4 border-t border-border-light flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-[#D4AF37] font-[family-name:var(--font-jakarta)]">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy font-[family-name:var(--font-jakarta)]">
                    {review.name}
                  </p>
                  <p className="text-xs text-muted-foreground font-[family-name:var(--font-inter)]">
                    {review.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-emerald-600">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Verified</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ===== SIDEBAR CONTENT (desktop) =====
function SidebarContent({
  property,
  toggleAdvisor,
}: {
  property: NonNullable<ReturnType<typeof PROPERTIES['find']>>;
  toggleAdvisor: () => void;
}) {
  return (
    <div className="space-y-8">
      {/* Price */}
      <div>
        <p className="text-3xl font-[family-name:var(--font-jakarta)] font-bold text-navy">
          {property.priceLabel}
        </p>
        <p className="text-sm text-muted-foreground mt-1 font-[family-name:var(--font-inter)]">
          Starting from
        </p>
        {property.badge && (
          <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3 w-3" />
            {property.badge}
          </span>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-border-light" />

      {/* AI Investment Score */}
      <div className="flex flex-col items-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 font-[family-name:var(--font-inter)] font-medium">
          AI Investment Score
        </p>
        <ScoreGauge score={property.investmentScore} size={110} strokeWidth={8} />
        <p className="text-xs text-muted-foreground mt-3 font-[family-name:var(--font-inter)]">
          AI Score
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-border-light" />

      {/* Key Metrics */}
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-[family-name:var(--font-inter)] font-medium">
          Key Metrics
        </p>
        {[
          { label: 'Developer', value: property.developer },
          { label: 'Expected ROI', value: `${property.expectedROI}%`, gold: true },
          { label: 'Rental Yield', value: `${property.rentalYield}%` },
          { label: 'Risk Level', value: property.riskLevel, badge: true },
          { label: 'Completion', value: property.completionDate },
          { label: 'Down Payment', value: `${property.downPayment}%` },
          { label: 'Monthly EMI', value: `$${property.monthlyEMI.toLocaleString()}` },
          { label: 'AI Match', value: `${property.aiMatch}%`, gold: true },
        ].map((metric) => (
          <div key={metric.label} className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">
              {metric.label}
            </span>
            {metric.badge ? (
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getRiskColor(metric.value as string)}`}
              >
                {metric.value as string}
              </span>
            ) : (
              <span
                className={`font-[family-name:var(--font-jakarta)] font-semibold text-sm ${
                  (metric as { gold?: boolean }).gold ? 'text-[#D4AF37]' : 'text-navy'
                }`}
              >
                {metric.value}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-border-light" />

      {/* CTA Buttons */}
      <div className="space-y-3">
        <button className="btn-luxury w-full flex items-center justify-center gap-2 bg-[#D4AF37] text-[#0F172A] font-[family-name:var(--font-inter)] font-semibold text-sm rounded-2xl py-3.5 transition-all duration-300">
          <MessageSquare className="h-4 w-4" />
          Enquire Now
        </button>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-[family-name:var(--font-inter)] font-medium text-sm rounded-2xl py-3 transition-colors duration-300">
            <Phone className="h-4 w-4" />
            WhatsApp
          </button>
          <button className="flex items-center justify-center gap-2 bg-navy hover:bg-navy-deep text-white font-[family-name:var(--font-inter)] font-medium text-sm rounded-2xl py-3 transition-colors duration-300">
            <PhoneCall className="h-4 w-4" />
            Call
          </button>
        </div>
        <button className="w-full flex items-center justify-center gap-2 border border-navy text-navy font-[family-name:var(--font-inter)] font-medium text-sm rounded-2xl py-3 hover:bg-navy hover:text-white transition-all duration-300">
          <Calendar className="h-4 w-4" />
          Schedule Visit
        </button>
      </div>

      {/* Verified Badge */}
      {property.verified && (
        <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-50 border border-emerald-200">
          <ShieldCheck className="h-5 w-5 text-emerald-600" />
          <span className="text-sm font-semibold text-emerald-700 font-[family-name:var(--font-inter)]">
            Verified Property
          </span>
        </div>
      )}
    </div>
  );
}
