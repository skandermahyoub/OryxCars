import React, { useState } from 'react';
import {
  Car,
  Booking,
  Driver,
  Currency,
  Language,
  CarCategory,
  RfqRequest,
  B2BMonthlyInvoice
} from '../../types';
import {
  INTER_CITY_ROUTES,
  CAR_CATEGORIES
} from '../../data/mockData';
import {
  Search,
  Shield,
  Star,
  MapPin,
  CheckCircle2,
  FileText,
  Car as CarIcon,
  Compass,
  Building2,
  Eye,
  FileCheck,
  Send,
  Sparkles,
  Plane,
  RefreshCw,
  MessageSquare,
  ShieldCheck,
  Printer,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { ElectronicLeaseContractModal } from '../common/ElectronicLeaseContractModal';
import { InteractiveInspectionModal } from '../common/InteractiveInspectionModal';
import { LeaseExtensionModal } from './LeaseExtensionModal';
import { WhatsAppQuickConciergeModal } from '../common/WhatsAppQuickConciergeModal';
import { B2BInvoiceModal } from '../common/B2BInvoiceModal';

interface CustomerPortalProps {
  cars: Car[];
  bookings: Booking[];
  drivers: Driver[];
  currency: Currency;
  language: Language;
  exchangeRate: number;
  companyName?: string;
  companyLogoUrl?: string;
  slogan?: string;
  address?: string;
  phone?: string;
  crNumber?: string;
  whatsappNumber?: string;
  onSelectCarForBooking: (car: Car) => void;
  onSelectCarForLanding?: (car: Car) => void;
  onCancelBooking: (bookingId: string) => void;
  onAcceptCounterOffer?: (bookingId: string) => void;
  onExtendBooking?: (bookingId: string, additionalDays: number, additionalAmountYer: number) => void;
  onReleaseDeposit?: (bookingId: string) => void;
  onSubmitRfq?: (rfq: Omit<RfqRequest, 'id' | 'createdAt' | 'status'>) => void;
  onUpdateBookingClauses?: (bookingId: string, clauses: string[], specialTerms?: string) => void;
}

export const CustomerPortal: React.FC<CustomerPortalProps> = ({
  cars,
  bookings,
  currency,
  language,
  companyName = 'الشركة المتحدة لتأجير السيارات — صنعاء',
  companyLogoUrl,
  slogan = 'خدمات تأجير السيارات المعتمدة للمنظمات الدولية وقطاع الأعمال والأفراد',
  address = 'أمانة العاصمة صنعاء — شارع حدة الرئيسي / السبعين',
  phone = '+967 771 234 567',
  crNumber = 'س.ت 10492 - أمانة العاصمة',
  whatsappNumber = '967771234567',
  onSelectCarForBooking,
  onSelectCarForLanding,
  onCancelBooking,
  onAcceptCounterOffer,
  onExtendBooking,
  onReleaseDeposit,
  onSubmitRfq,
  onUpdateBookingClauses
}) => {
  const isAr = language === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<CarCategory>('all');
  const [availableOnly, setAvailableOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState<'fleet' | 'intercity' | 'bookings' | 'b2b'>('fleet');
  const [selectedBookingReceipt, setSelectedBookingReceipt] = useState<Booking | null>(null);

  // 10 Strategic Features Modal States
  const [contractModalBooking, setContractModalBooking] = useState<Booking | null>(null);
  const [inspectionTarget, setInspectionTarget] = useState<{ car?: Car; booking?: Booking } | null>(null);
  const [extendingBooking, setExtendingBooking] = useState<Booking | null>(null);
  const [conciergeBooking, setConciergeBooking] = useState<Booking | null>(null);
  const [viewingB2BInvoice, setViewingB2BInvoice] = useState<B2BMonthlyInvoice | null>(null);

  const sampleB2BInvoices: B2BMonthlyInvoice[] = [
    {
      id: 'INV-2026-104',
      lpoNumber: 'LPO-UN-88412',
      organizationName: 'بعثة منظمة الإغاثة والتنمية الدولية (INGO)',
      orgType: 'un_ngo',
      billingMonth: 'أكتوبر 2026',
      vehiclesCount: 4,
      totalDaysBilled: 120,
      subtotalUsd: 14800,
      taxOrCustomsUsd: 740,
      totalAmountUsd: 15540,
      totalAmountYer: 8236200,
      status: 'paid',
      dueDate: '2026-10-31',
      contactPerson: 'أ. طارق عبدالجبار السامعي',
      notes: 'عقد توريد أسطول سيارات مصفحة B6 ولاندكروزر للميدان.'
    },
    {
      id: 'INV-2026-105',
      lpoNumber: 'LPO-CORP-5520',
      organizationName: 'مجموعة المتوكل للتجارة والاستيراد',
      orgType: 'corporate',
      billingMonth: 'سبتمبر 2026',
      vehiclesCount: 2,
      totalDaysBilled: 60,
      subtotalUsd: 5400,
      taxOrCustomsUsd: 270,
      totalAmountUsd: 5670,
      totalAmountYer: 3005100,
      status: 'paid',
      dueDate: '2026-09-30',
      contactPerson: 'المهندس / هشام عبدالرحمن المتوكل',
      notes: 'سيارات كبار الشخصيات والمدراء التنفيذيين.'
    }
  ];

  // B2B RFQ state
  const [rfqOrgName, setRfqOrgName] = useState('');
  const [rfqOrgType, setRfqOrgType] = useState<RfqRequest['orgType']>('un_ngo');
  const [rfqContactPerson, setRfqContactPerson] = useState('');
  const [rfqPhone, setRfqPhone] = useState('');
  const [rfqEmail, setRfqEmail] = useState('');
  const [rfqVehiclesCount, setRfqVehiclesCount] = useState(3);
  const [rfqDuration, setRfqDuration] = useState(12);
  const [rfqCategory, setRfqCategory] = useState('تويوتا لاندكروزر + برادو TXL ميداني');
  const [rfqNotes, setRfqNotes] = useState('');
  const [rfqSuccess, setRfqSuccess] = useState(false);

  const formatPrice = (usd: number, yer: number) => {
    if (currency === 'USD') {
      return `$${usd.toLocaleString()}`;
    }
    return `${yer.toLocaleString()} ${isAr ? 'ر.ي' : 'YER'}`;
  };

  const availableCarsCount = cars.filter((c) => c.available).length;

  const filteredCars = cars.filter((car) => {
    const matchesCategory = selectedCategory === 'all' || car.category === selectedCategory;
    const matchesAvailable = !availableOnly || car.available;
    const matchesSearch =
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesAvailable && matchesSearch;
  });

  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rfqOrgName || !rfqContactPerson || !rfqPhone) return;
    if (onSubmitRfq) {
      onSubmitRfq({
        orgName: rfqOrgName,
        orgType: rfqOrgType,
        contactPerson: rfqContactPerson,
        phone: rfqPhone,
        email: rfqEmail || 'procurement@organization.org',
        vehiclesCount: rfqVehiclesCount,
        durationMonths: rfqDuration,
        vehicleCategory: rfqCategory,
        requirements: rfqNotes
      });
    }
    setRfqSuccess(true);
    setTimeout(() => {
      setRfqSuccess(false);
      setRfqOrgName('');
      setRfqContactPerson('');
      setRfqPhone('');
      setRfqEmail('');
      setRfqNotes('');
    }, 4000);
  };

  const getStatusBadge = (status: Booking['bookingStatus']) => {
    const map: Record<Booking['bookingStatus'], { ar: string; en: string; cls: string }> = {
      pending_approval: {
        ar: 'بانتظار مراجعة الوثائق والضمان',
        en: 'Pending KYC & Guarantee Review',
        cls: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
      },
      confirmed: {
        ar: 'عقد موثق ومؤكد',
        en: 'Confirmed Contract',
        cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
      },
      driver_en_route: {
        ar: 'المركبة في طريقها للتسليم',
        en: 'Vehicle En Route for Delivery',
        cls: 'bg-[#D4AF37]/15 text-[#D4AF37] border-[#D4AF37]/40'
      },
      in_progress: {
        ar: 'مؤجرة حالياً للعميل',
        en: 'Active Rental',
        cls: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
      },
      completed: {
        ar: 'تم إخلاء الطرف وإغلاق العقد',
        en: 'Completed & Cleared',
        cls: 'bg-zinc-500/10 text-zinc-300 border-zinc-500/30'
      },
      cancelled: {
        ar: 'ملغي',
        en: 'Cancelled',
        cls: 'bg-red-500/10 text-red-400 border-red-500/30'
      }
    };
    const item = map[status] || map.pending_approval;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${item.cls}`}>
        {isAr ? item.ar : item.en}
      </span>
    );
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Corporate & Fleet Portal Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-xl">
        <div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold mb-3">
                <Shield className="w-3.5 h-3.5" />
                <span>
                  {isAr
                    ? 'الأسطول وخدمات التعاقد — صنعاء'
                    : 'Fleet & Contractual Booking — Sana’a'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                {isAr
                  ? 'أسطول متكامل للمنظمات الدولية، الشركات، والأفراد'
                  : 'Integrated Fleet for UN/NGOs, Corporations & Individuals'}
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
                {isAr
                  ? 'استعرض فئات الأسطول المتاحة، وتعرف على المواصفات الفنية وجداول الأسعار اليومية والأسبوعية والشهرية، مع إمكانية الحجز المباشر وخدمة تسليم المركبة في موقعك.'
                  : 'Explore our available fleet categories, technical specifications, and daily, weekly, or monthly rental rates with direct delivery in Sana’a.'}
              </p>
            </div>

            {/* Sub-Navigation Pills */}
            <div className="flex flex-wrap items-center gap-2 bg-[#171717] p-1.5 rounded-2xl border border-white/10 self-start">
              <button
                onClick={() => setActiveSection('fleet')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeSection === 'fleet'
                    ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <CarIcon className="w-4 h-4" />
                <span>{isAr ? 'الأسطول المتاح' : 'Available Fleet'}</span>
              </button>

              <button
                onClick={() => setActiveSection('bookings')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeSection === 'bookings'
                    ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <FileCheck className="w-4 h-4" />
                <span>{isAr ? 'عقودي وحجوزاتي' : 'My Contracts & Bookings'}</span>
                <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-black/20 font-extrabold">
                  {bookings.length}
                </span>
              </button>

              <button
                onClick={() => setActiveSection('b2b')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeSection === 'b2b'
                    ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>{isAr ? 'عقود المنظمات والشركات (B2B)' : 'UN/NGO & Corporate RFQs'}</span>
              </button>

              <button
                onClick={() => setActiveSection('intercity')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeSection === 'intercity'
                    ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>{isAr ? 'خطوط المحافظات والمطار' : 'Inter-Governorate Routes'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div>
        {/* SECTION 1: FLEET & VEHICLE LANDING PAGES */}
        {activeSection === 'fleet' && (
          <div className="space-y-8">
            {/* Search & Multi-Segment Filter Bar */}
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 sm:p-6 space-y-5">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                  <Search className="w-4 h-4 text-zinc-400 absolute top-1/2 -translate-y-1/2 right-3.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      isAr
                        ? 'ابحث باسم المركبة (لاندكروزر، برادو، كامري، إلنترا...)'
                        : 'Search vehicle (Land Cruiser, Prado, Camry, Elantra...)'
                    }
                    className="w-full bg-[#0D0D0D] border border-white/10 focus:border-[#D4AF37] rounded-xl pr-10 pl-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setAvailableOnly((prev) => !prev)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold border transition ${
                      availableOnly
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20'
                        : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>
                      {availableOnly
                        ? `عرض المتوفرة حالياً فقط (${availableCarsCount})`
                        : `السيارات المتوفرة حالياً (${availableCarsCount} جاهزة)`}
                    </span>
                  </button>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] font-semibold">
                    <FileText className="w-3.5 h-3.5" />
                    {isAr ? 'تفاوض على السعر + إتمام المعاملة عن بُعد قبل الاستلام' : 'Remote Price Negotiation & Pre-Pickup Clearance'}
                  </span>
                </div>
              </div>

              {/* Category Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {CAR_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                      selectedCategory === cat.id
                        ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                        : 'bg-[#0D0D0D] text-zinc-300 border-white/10 hover:border-[#D4AF37]/40'
                    }`}
                  >
                    {isAr ? cat.labelAr : cat.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Fleet Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <div
                  key={car.id}
                  className="bg-[#141414] border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 group shadow-xl"
                >
                  {/* Image Header - Clickable to open Vehicle Landing Page */}
                  <div
                    onClick={() => onSelectCarForLanding && onSelectCarForLanding(car)}
                    className="dark-media-card relative h-56 overflow-hidden cursor-pointer bg-slate-950"
                  >
                    <img
                      src={car.image}
                      alt={isAr ? car.name : car.nameEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/35" />

                    {/* Top Badges */}
                    <div className="absolute top-3 right-3 left-3 flex justify-between items-start gap-2">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-black/80 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/40">
                        {car.armoredLevel || `${car.modelYear}`}
                      </span>
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold backdrop-blur-md border ${
                          car.available
                            ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40'
                            : 'bg-red-950/90 text-red-300 border-red-500/40'
                        }`}
                      >
                        {car.available
                          ? isAr
                            ? 'متاحة للتسليم'
                            : 'Available Now'
                          : isAr
                          ? 'مؤجرة حالياً'
                          : 'Rented Out'}
                      </span>
                    </div>

                    {/* Hover Prompt for Landing Page */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-200 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span className="truncate max-w-[170px]">{car.currentLocation}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#D4AF37] text-black px-2.5 py-1 rounded-lg shadow">
                        <Eye className="w-3 h-3" />
                        {isAr ? 'التفاصيل والأسعار' : 'Vehicle Details'}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                        <span>
                          {car.modelYear} • {car.plateNumber}
                        </span>
                        <span className="flex items-center gap-1 text-[#D4AF37] font-bold">
                          <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                          {car.rating} ({car.tripsCount})
                        </span>
                      </div>

                      <h3
                        onClick={() => onSelectCarForLanding && onSelectCarForLanding(car)}
                        className="text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors cursor-pointer"
                      >
                        {isAr ? car.name : car.nameEn}
                      </h3>

                      {/* Client Suitability Chips */}
                      {car.clientSuitability && car.clientSuitability.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {car.clientSuitability.map((suit, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-zinc-300"
                            >
                              {suit}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Quick Technical Specs */}
                      <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10 text-[11px] text-zinc-400">
                        <div className="bg-[#0D0D0D] p-2 rounded-lg text-center border border-white/5">
                          <span className="block text-zinc-500">{isAr ? 'المقاعد' : 'Seats'}</span>
                          <span className="font-bold text-white">
                            {car.seats} {isAr ? 'ركاب' : 'Seats'}
                          </span>
                        </div>
                        <div className="bg-[#0D0D0D] p-2 rounded-lg text-center border border-white/5">
                          <span className="block text-zinc-500">{isAr ? 'الوقود' : 'Fuel'}</span>
                          <span className="font-bold text-white truncate block">{car.fuelType}</span>
                        </div>
                        <div className="bg-[#0D0D0D] p-2 rounded-lg text-center border border-white/5">
                          <span className="block text-zinc-500">{isAr ? 'التأمين' : 'Insurance'}</span>
                          <span className="font-bold text-emerald-400">
                            {isAr ? 'شامل 100%' : 'Full Cover'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Multi-Tier Pricing Box */}
                    <div className="bg-[#0D0D0D] rounded-xl p-3 border border-white/10 space-y-2">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-zinc-400">
                          {isAr ? 'الإيجار اليومي:' : 'Daily Rate:'}
                        </span>
                        <span className="text-lg font-extrabold text-[#D4AF37]">
                          {formatPrice(car.pricePerDayUsd, car.pricePerDayYer)}
                          <span className="text-[11px] text-zinc-400 font-normal">
                            /{isAr ? 'يوم' : 'day'}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1 border-t border-white/5">
                        <span>
                          {isAr ? 'عقد شهري للمنظمات/الشركات:' : 'Monthly Corporate Rate:'}
                        </span>
                        <span className="font-bold text-white">
                          {formatPrice(
                            car.pricePerMonthUsd || car.pricePerDayUsd * 24,
                            car.pricePerMonthYer || car.pricePerDayYer * 24
                          )}
                          /{isAr ? 'شهر' : 'mo'}
                        </span>
                      </div>
                    </div>

                    {/* Dual Action Buttons: Landing Page vs Direct Booking & Negotiation */}
                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      <button
                        onClick={() => onSelectCarForLanding && onSelectCarForLanding(car)}
                        className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{isAr ? 'المواصفات والأسعار' : 'Details & Pricing'}</span>
                      </button>
                      <button
                        disabled={!car.available}
                        onClick={() => onSelectCarForBooking(car)}
                        className="py-2.5 px-3 rounded-xl bg-[#D4AF37] hover:bg-[#e5c247] disabled:opacity-40 text-xs font-extrabold text-black flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-[#D4AF37]/20"
                      >
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>{isAr ? 'حجز وتفاوض عن بُعد' : 'Book & Negotiate'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: MY CONTRACTS & REMOTE PRE-PICKUP CLEARANCE */}
        {activeSection === 'bookings' && (
          <div className="space-y-6">
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-1">
                {isAr
                  ? 'متابعة المعاملات عن بُعد، التفاوض السعري، وتصاريح الاستلام السريع'
                  : 'Remote Pre-Pickup Clearance, Price Negotiation & Contracts'}
              </h2>
              <p className="text-xs text-zinc-400">
                {isAr
                  ? 'أكمل كافة إجراءاتك (التفاوض على السعر، رفع الوثائق والضمان، التوقيع الإلكتروني، والسداد) عن بُعد من جوالك، واستلم السيارة فوراً بدون انتظار.'
                  : 'Complete your price negotiation, KYC upload, digital contract signing, and payment remotely before picking up your car.'}
              </p>
            </div>

            {bookings.length === 0 ? (
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-12 text-center">
                <FileText className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                <p className="text-zinc-400">
                  {isAr ? 'لا توجد عقود أو حجوزات حالية.' : 'No active contracts or bookings.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((bk) => {
                  const isClearedForPickup =
                    bk.bookingStatus === 'confirmed' ||
                    bk.bookingStatus === 'driver_en_route' ||
                    bk.bookingStatus === 'in_progress';
                  return (
                    <div
                      key={bk.id}
                      className="bg-[#141414] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4"
                    >
                      <div className="flex flex-col lg:flex-row justify-between gap-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                          <img
                            src={bk.carImage}
                            alt={bk.carName}
                            className="w-full sm:w-44 h-32 object-cover rounded-xl border border-white/10"
                          />
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded-md border border-[#D4AF37]/30">
                                #{bk.id}
                              </span>
                              {getStatusBadge(bk.bookingStatus)}
                              {bk.remotePickupCode && (
                                <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
                                  كود الاستلام السريع: {bk.remotePickupCode}
                                </span>
                              )}
                            </div>

                            <h3 className="text-lg font-bold text-white">{bk.carName}</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-zinc-400">
                              <div>
                                {isAr ? 'العميل / الجهة:' : 'Client:'}{' '}
                                <span className="text-white font-semibold">{bk.customerName}</span>
                                {bk.organizationName && ` (${bk.organizationName})`}
                              </div>
                              <div>
                                {isAr ? 'فترة العقد:' : 'Period:'}{' '}
                                <span className="text-white font-semibold">
                                  {bk.startDate} → {bk.endDate} ({bk.days} {isAr ? 'أيام' : 'days'})
                                </span>
                              </div>
                              <div>
                                {isAr ? 'طريقة وموقع الاستلام:' : 'Delivery:'}{' '}
                                <span className="text-white font-semibold">{bk.pickupLocation}</span>
                              </div>
                              <div>
                                {isAr ? 'حالة الضمان والوثائق عن بُعد:' : 'Guarantee Status:'}{' '}
                                <span className="text-emerald-400 font-semibold">
                                  {bk.guaranteeStatus === 'approved'
                                    ? isAr
                                      ? '✓ موثق ومعتمد عن بُعد'
                                      : 'Approved Remotely'
                                    : isAr
                                    ? 'قيد المراجعة السريعة'
                                    : 'Under Review'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col justify-between items-start lg:items-end border-t lg:border-t-0 pt-4 lg:pt-0 border-white/10 gap-3">
                          <div className="text-right">
                            <div className="text-xs text-zinc-400">
                              {bk.isNegotiated
                                ? 'القيمة الإيجارية (بعد التفاوض عن بُعد)'
                                : isAr
                                ? 'إجمالي قيمة العقد'
                                : 'Total Contract Value'}
                            </div>
                            <div className="text-xl font-extrabold text-[#D4AF37]">
                              {formatPrice(bk.totalAmountUsd, bk.totalAmountYer)}
                            </div>
                            {bk.standardTotalYer && bk.standardTotalYer > bk.totalAmountYer && (
                              <div className="text-[11px] text-emerald-400 font-bold">
                                السعر السابق: <span className="line-through opacity-75">{bk.standardTotalYer.toLocaleString()} ر.ي</span> (وفرت {(bk.standardTotalYer - bk.totalAmountYer).toLocaleString()} ر.ي)
                              </div>
                            )}
                            <div className="text-[11px] text-zinc-400">
                              {isAr ? 'مرجع المحفظة:' : 'Wallet Ref:'} {bk.transactionRef}
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              onClick={() => setContractModalBooking(bk)}
                              className="px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-xs font-bold text-amber-300 flex items-center gap-1.5 transition"
                            >
                              <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                              <span>{isAr ? 'عقد الإيجار الإلكتروني المعتمد (A4/QR)' : 'Official Lease Contract'}</span>
                            </button>

                            <button
                              onClick={() => setInspectionTarget({ booking: bk, car: cars.find((c) => c.id === bk.carId) })}
                              className="px-3 py-2 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/40 text-xs font-bold text-sky-300 flex items-center gap-1.5 transition"
                            >
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>فحص 360° وسجل الخدوش</span>
                            </button>

                            <button
                              onClick={() => setExtendingBooking(bk)}
                              className="px-3 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/40 text-xs font-bold text-purple-300 flex items-center gap-1.5 transition"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>تمديد العقد بنقرة واحدة</span>
                            </button>

                            <button
                              onClick={() => setConciergeBooking(bk)}
                              className="px-3 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-xs font-bold text-emerald-300 flex items-center gap-1.5 transition"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>كونسيرج واتساب</span>
                            </button>

                            {bk.bookingStatus === 'pending_approval' && (
                              <button
                                onClick={() => onCancelBooking(bk.id)}
                                className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs font-bold text-red-400"
                              >
                                {isAr ? 'إلغاء الطلب' : 'Cancel'}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Digital Security Deposit & Escrow Release Status Bar */}
                      <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="text-zinc-300 font-bold">الوديعة ومبلغ التأمين المسترد:</span>
                          <span className="font-mono font-black text-amber-400">
                            {(bk.depositHeldAmountYer || 100000).toLocaleString()} ر.ي
                          </span>
                          <span className="text-zinc-500 hidden sm:inline">|</span>
                          <span className="text-zinc-400 hidden sm:inline">الخصومات (وقود/مخالفات/تلفيات): 0 ر.ي</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            bk.depositStatus === 'released'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : 'bg-sky-500/15 text-sky-300 border-sky-500/40'
                          }`}>
                            {bk.depositStatus === 'released'
                              ? '✓ تم استرداد الوديعة بنجاح للمحفظة'
                              : '✓ محجوزة بأمان وجاهزة للاسترداد الفوري عند الإرجاع'}
                          </span>
                        </div>
                      </div>

                      {/* Remote Negotiation Counter-Offer Alert if admin proposed a middle price */}
                      {bk.negotiationStatus === 'counter_offered' && bk.counterOfferTotalYer && (
                        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="text-xs">
                            <span className="font-black text-amber-400">💬 رد إدارة المكتب على طلب التفاوض السعري: </span>
                            <span className="text-zinc-200">
                              قدمت الإدارة سعراً تفاوضياً معتمداً بقيمة{' '}
                              <strong className="text-emerald-400 font-mono">
                                {bk.counterOfferTotalYer.toLocaleString()} ر.ي
                              </strong>{' '}
                              لإتمام المعاملة فوراً.
                            </span>
                          </div>
                          {onAcceptCounterOffer && (
                            <button
                              type="button"
                              onClick={() => onAcceptCounterOffer(bk.id)}
                              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shrink-0 transition"
                            >
                              ✓ موافقة واعتماد السعر النهائي
                            </button>
                          )}
                        </div>
                      )}

                      {/* 5-Stage Remote Pre-Pickup Completion Bar */}
                      <div className="pt-3 border-t border-white/10">
                        <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-2">
                          <span className="font-bold text-zinc-200">
                            مراحل إتمام المعاملة عن بُعد قبل استلام السيارة:
                          </span>
                          <span className={isClearedForPickup ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                            {isClearedForPickup
                              ? '✓ معاملتك مكتملة 100% عن بُعد — السيارة جاهزة للاستلام الفوري'
                              : '⏳ بانتظار الضغطة النهائية لاعتماد الإدارة'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px]">
                          {[
                            { label: '1. حجز السيارة المتوفرة', done: true },
                            {
                              label: '2. التفاوض واعتماد السعر',
                              done: bk.negotiationStatus !== 'pending_review' && bk.negotiationStatus !== 'counter_offered'
                            },
                            { label: '3. رفع الهوية والضمان', done: true },
                            { label: '4. توقيع العقد والسداد', done: true },
                            { label: '5. تصريح الاستلام الفوري', done: isClearedForPickup }
                          ].map((st, idx) => (
                            <div
                              key={idx}
                              className={`p-2 rounded-lg border text-center font-bold ${
                                st.done
                                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                                  : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                              }`}
                            >
                              {st.done ? '✓ ' : '• '}
                              {st.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* SECTION 3: B2B / UN / NGO / CORPORATE RFQ PORTAL */}
        {activeSection === 'b2b' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#141414] border border-[#D4AF37]/30 rounded-2xl p-6 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <Building2 className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  {isAr
                    ? 'قسم عقود المنظمات الدولية والشركات والبعثات الدبلوماسية'
                    : 'UN Agencies, International NGOs & Corporate Fleet Division'}
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {isAr
                    ? 'نوفر عقود تأجير السيارات طويلة الأمد للمنظمات والشركات في صنعاء وجميع المحافظات اليمنية وفق أعلى معايير الامتثال والسلامة (UNDSS Compliant):'
                    : 'We provide long-term corporate and NGO car rental contracts across Sana’a and all Yemeni governorates with full UNDSS safety compliance:'}
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-zinc-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>
                      {isAr
                        ? 'سيارات دفع رباعي مجهزة للعمل الميداني (لاندكروزر، برادو، شاص، هايلوكس) ومدرعات B6.'
                        : 'Field-ready 4x4s (Land Cruiser, Prado, Hilux) and B6 Armored vehicles.'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>
                      {isAr
                        ? 'فواتير ضريبية رسمية، عقود سنوية أو ربع سنوية، وتسهيلات ائتمانية بالدولار أو الريال.'
                        : 'Official tax invoices, quarterly/annual contracts, and credit terms in USD or YER.'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>
                      {isAr
                        ? 'مركبة بديلة فورية خلال ساعتين في حال الصيانة أو الطوارئ في أي محافظة.'
                        : 'Immediate replacement vehicle within 2 hours for maintenance or emergencies.'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form
                onSubmit={handleRfqSubmit}
                className="bg-[#141414] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5"
              >
                <h3 className="text-lg font-bold text-white border-b border-white/10 pb-3">
                  {isAr
                    ? 'طلب عرض سعر رسمي (RFQ) لتوريد أسطول مركبات'
                    : 'Request Official Fleet Quotation (RFQ)'}
                </h3>

                {rfqSuccess && (
                  <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>
                      {isAr
                        ? 'تم استلام طلب عرض السعر بنجاح لدى إدارة العقود والمبيعات المؤسسية، وسيتواصل معكم الفريق المختص قريباً.'
                        : 'RFQ submitted to our Contracts & Tenders division! Our team will contact you shortly.'}
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">
                      {isAr ? 'اسم المنظمة / الشركة / الجهة *' : 'Organization / Company Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={rfqOrgName}
                      onChange={(e) => setRfqOrgName(e.target.value)}
                      placeholder={
                        isAr ? 'مثال: منظمة أطباء بلا حدود / شركة...' : 'e.g. UN Agency / Corp...'
                      }
                      className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">
                      {isAr ? 'تصنيف الجهة' : 'Organization Type'}
                    </label>
                    <select
                      value={rfqOrgType}
                      onChange={(e) => setRfqOrgType(e.target.value as RfqRequest['orgType'])}
                      className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white"
                    >
                      <option value="un_ngo">
                        {isAr ? 'منظمة دولية / أممية (UN / INGO)' : 'UN Agency / International NGO'}
                      </option>
                      <option value="embassy">
                        {isAr ? 'بعثة دبلوماسية / سفارة' : 'Embassy / Diplomatic Mission'}
                      </option>
                      <option value="corporate">
                        {isAr ? 'شركة تجارية / بنك / اتصالات' : 'Private Corporation / Bank'}
                      </option>
                      <option value="government">
                        {isAr ? 'مؤسسة رسمية / مشروع تنموي' : 'Development Project / Institution'}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">
                      {isAr ? 'اسم مسؤول المشتريات / الحركة *' : 'Procurement / Fleet Officer *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={rfqContactPerson}
                      onChange={(e) => setRfqContactPerson(e.target.value)}
                      placeholder={isAr ? 'الاسم الكامل والمسمى الوظيفي' : 'Full Name & Title'}
                      className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">
                      {isAr ? 'رقم الهاتف / واتساب الرسمي *' : 'Official Phone / WhatsApp *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={rfqPhone}
                      onChange={(e) => setRfqPhone(e.target.value)}
                      placeholder="+967 77..."
                      className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">
                      {isAr ? 'عدد المركبات المطلوبة' : 'Number of Vehicles Required'}
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={rfqVehiclesCount}
                      onChange={(e) => setRfqVehiclesCount(Number(e.target.value))}
                      className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">
                      {isAr ? 'مدة العقد (بالأشهر)' : 'Duration (Months)'}
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={60}
                      value={rfqDuration}
                      onChange={(e) => setRfqDuration(Number(e.target.value))}
                      className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5">
                    {isAr ? 'أنواع المركبات والمواصفات المطلوبة' : 'Preferred Vehicle Categories'}
                  </label>
                  <input
                    type="text"
                    value={rfqCategory}
                    onChange={(e) => setRfqCategory(e.target.value)}
                    className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5">
                    {isAr
                      ? 'الشروط الفنية أو متطلبات المناقصة الإضافية'
                      : 'Additional Tender / Technical Notes'}
                  </label>
                  <textarea
                    rows={3}
                    value={rfqNotes}
                    onChange={(e) => setRfqNotes(e.target.value)}
                    placeholder={
                      isAr
                        ? 'اذكر متطلبات التأمين، أجهزة التتبع VHF/GPS، السائقين، أو مواعيد التسليم...'
                        : 'Specify insurance, GPS/VHF tracking, drivers, or delivery schedule...'
                    }
                    className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#e3be42] text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {isAr
                      ? 'إرسال طلب عرض السعر لإدارة العقود (RFQ)'
                      : 'Submit Official RFQ to Contracts Dept'}
                  </span>
                </button>
              </form>
            </div>

            {/* B2B Monthly Consolidated Tax Invoices Section */}
            <div className="lg:col-span-12 mt-4 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">
                    {isAr ? 'الفواتير الضريبية الشهرية المجمعة (B2B Tax Invoices)' : 'Consolidated Monthly Tax Invoices'}
                  </h3>
                </div>
                <span className="text-xs text-zinc-400">
                  فواتير رسمية متوافقة مع أنظمة المشتريات الدولية وأوامر الشراء (LPO)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sampleB2BInvoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="p-5 rounded-2xl bg-[#141414] border border-white/10 hover:border-amber-500/40 transition space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-amber-400 text-xs">#{inv.id}</span>
                        <span className="text-zinc-500">·</span>
                        <span className="text-xs font-bold text-white">{inv.organizationName}</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        {inv.status === 'paid' ? 'مسددة بالكامل ✓' : 'مستحقة'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400">
                      <div>شهر الفاتورة: <strong className="text-zinc-200">{inv.billingMonth}</strong></div>
                      <div>رقم أمر الشراء: <strong className="font-mono text-zinc-200">{inv.lpoNumber}</strong></div>
                      <div>عدد المركبات: <strong className="text-zinc-200">{inv.vehiclesCount} مركبات</strong></div>
                      <div>إجمالي الأيام: <strong className="text-zinc-200">{inv.totalDaysBilled} يوم</strong></div>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-zinc-400 block">إجمالي الفاتورة الضريبية:</span>
                        <span className="font-mono font-black text-amber-400 text-base">
                          ${inv.totalAmountUsd.toLocaleString()}
                        </span>
                        <span className="text-[11px] text-zinc-500 mr-1.5">
                          ({inv.totalAmountYer.toLocaleString()} ر.ي)
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setViewingB2BInvoice(inv)}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>عرض وطباعة الفاتورة A4</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: INTERCITY & AIRPORT ROUTES */}
        {activeSection === 'intercity' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INTER_CITY_ROUTES.map((route) => (
              <div
                key={route.id}
                className="bg-[#141414] border border-white/10 rounded-2xl p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 font-bold">
                      {route.distanceKm} كم • {route.estimatedHours}
                    </span>
                    <span className="text-xs font-bold text-emerald-400">
                      {route.recommendedVehicle}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {isAr ? route.titleAr : route.titleEn}
                  </h3>
                  <p className="text-xs text-zinc-400">{route.roadCondition}</p>
                </div>

                <button
                  onClick={() => onSelectCarForBooking(cars[0])}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-[#D4AF37] hover:text-black text-white font-bold text-xs border border-white/10 transition-all"
                >
                  {isAr
                    ? 'حجز مركبة مخصصة لهذا الخط مع تصريح مرور'
                    : 'Book Dedicated Vehicle for this Route'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal to View Contract Details & KYC Documents */}
      {selectedBookingReceipt && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#141414] border border-[#D4AF37]/40 rounded-2xl max-w-2xl w-full p-6 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {isAr ? 'ملف العقد الإلكتروني والمستندات المرفقة' : 'Digital Contract & KYC Dossier'}
                </h3>
                <p className="text-xs text-[#D4AF37] font-mono">#{selectedBookingReceipt.id}</p>
              </div>
              <button
                onClick={() => setSelectedBookingReceipt(null)}
                className="px-3 py-1.5 rounded-lg bg-white/10 text-xs text-white"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-[#0D0D0D] p-4 rounded-xl border border-white/10">
              <div>
                <span className="text-zinc-500 block">{isAr ? 'المستأجر:' : 'Lessee:'}</span>
                <span className="text-white font-bold">{selectedBookingReceipt.customerName}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">{isAr ? 'رقم الهوية:' : 'National ID:'}</span>
                <span className="text-white font-mono">
                  {selectedBookingReceipt.customerIdNumber}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block">{isAr ? 'الضمان المعتمد:' : 'Guarantee:'}</span>
                <span className="text-white font-bold">{selectedBookingReceipt.guaranteeDetails}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">
                  {isAr ? 'مرجع المحفظة المالية:' : 'Wallet Reference:'}
                </span>
                <span className="text-emerald-400 font-mono">
                  {selectedBookingReceipt.transactionRef}
                </span>
              </div>
            </div>

            {/* Uploaded KYC Documents Preview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {selectedBookingReceipt.idDocumentUrl && (
                <div className="bg-[#0D0D0D] border border-white/10 rounded-xl p-2 text-center">
                  <img
                    src={selectedBookingReceipt.idDocumentUrl}
                    alt="ID"
                    className="w-full h-16 object-cover rounded mb-1"
                  />
                  <span className="text-[10px] text-zinc-300">
                    {isAr ? 'وثيقة الهوية' : 'National ID'}
                  </span>
                </div>
              )}
              {selectedBookingReceipt.licenseDocumentUrl && (
                <div className="bg-[#0D0D0D] border border-white/10 rounded-xl p-2 text-center">
                  <img
                    src={selectedBookingReceipt.licenseDocumentUrl}
                    alt="License"
                    className="w-full h-16 object-cover rounded mb-1"
                  />
                  <span className="text-[10px] text-zinc-300">
                    {isAr ? 'رخصة القيادة' : 'Driver License'}
                  </span>
                </div>
              )}
              {selectedBookingReceipt.guaranteeDocumentUrl && (
                <div className="bg-[#0D0D0D] border border-white/10 rounded-xl p-2 text-center">
                  <img
                    src={selectedBookingReceipt.guaranteeDocumentUrl}
                    alt="Guarantee"
                    className="w-full h-16 object-cover rounded mb-1"
                  />
                  <span className="text-[10px] text-zinc-300">
                    {isAr ? 'وثيقة الضمان' : 'Guarantee Doc'}
                  </span>
                </div>
              )}
              {selectedBookingReceipt.paymentReceiptUrl && (
                <div className="bg-[#0D0D0D] border border-white/10 rounded-xl p-2 text-center">
                  <img
                    src={selectedBookingReceipt.paymentReceiptUrl}
                    alt="Receipt"
                    className="w-full h-16 object-cover rounded mb-1"
                  />
                  <span className="text-[10px] text-zinc-300">
                    {isAr ? 'إشعار المحفظة' : 'Wallet Receipt'}
                  </span>
                </div>
              )}
            </div>

            {/* Digital Signature */}
            {selectedBookingReceipt.customerSignatureDataUrl && (
              <div className="bg-[#0D0D0D] border border-white/10 rounded-xl p-3 flex items-center justify-between">
                <div className="text-xs">
                  <div className="font-bold text-emerald-400">
                    {isAr ? 'تم التوقيع الإلكتروني والموافقة على بنود العقد' : 'Digitally Signed & Accepted'}
                  </div>
                  <div className="text-zinc-500 text-[11px]">
                    {selectedBookingReceipt.contractSignedAt}
                  </div>
                </div>
                <img
                  src={selectedBookingReceipt.customerSignatureDataUrl}
                  alt="Signature"
                  className="h-12 bg-black/40 rounded border border-white/10 px-2"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* 1. Official Electronic Lease Contract Modal (Print/PDF View with QR Seal) */}
      {contractModalBooking && (
        <ElectronicLeaseContractModal
          isOpen={!!contractModalBooking}
          booking={contractModalBooking}
          car={cars.find((c) => c.id === contractModalBooking.carId)}
          currency={currency}
          lang={language}
          companyName={companyName}
          companyLogoUrl={companyLogoUrl}
          slogan={slogan}
          address={address}
          phone={phone}
          crNumber={crNumber}
          whatsappNumber={whatsappNumber}
          onClose={() => setContractModalBooking(null)}
          onUpdateBookingClauses={onUpdateBookingClauses}
        />
      )}

      {/* 2. Interactive 360° Visual Inspection & Damage Checklist Modal */}
      {inspectionTarget && (
        <InteractiveInspectionModal
          isOpen={!!inspectionTarget}
          booking={inspectionTarget.booking}
          car={inspectionTarget.car || cars.find((c) => c.id === inspectionTarget.booking?.carId)}
          onClose={() => setInspectionTarget(null)}
        />
      )}

      {/* 3. One-Click Lease Extension Modal */}
      {extendingBooking && (
        <LeaseExtensionModal
          isOpen={!!extendingBooking}
          booking={extendingBooking}
          currency={currency}
          onClose={() => setExtendingBooking(null)}
          onConfirmExtension={(bId, addDays, addFee) => {
            if (onExtendBooking) {
              onExtendBooking(bId, addDays, addFee);
            }
          }}
        />
      )}

      {/* 4. Instant WhatsApp Concierge Generator Modal */}
      {conciergeBooking && (
        <WhatsAppQuickConciergeModal
          isOpen={!!conciergeBooking}
          booking={conciergeBooking}
          companyName={companyName}
          agencyPhone={whatsappNumber}
          onClose={() => setConciergeBooking(null)}
        />
      )}

      {/* 5. B2B Consolidated Monthly Tax Invoice Modal */}
      {viewingB2BInvoice && (
        <B2BInvoiceModal
          isOpen={!!viewingB2BInvoice}
          invoice={viewingB2BInvoice}
          companyName={companyName}
          whatsappNumber={whatsappNumber}
          onClose={() => setViewingB2BInvoice(null)}
        />
      )}
    </div>
  );
};
