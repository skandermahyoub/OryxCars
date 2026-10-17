import React, { useState } from 'react';
import {
  Car,
  Booking,
  Driver,
  Currency,
  Language,
  FinancialTransaction,
  RfqRequest,
  PaymentWallet,
  CarCategory,
  ClientProfile,
  ClientSegment,
  VehicleInspectionRecord,
  MaintenanceRecord,
  AdminModuleId,
  GuaranteeType,
  InvestorCarRecord,
  DynamicPricingRule,
  TrafficFineIncident,
  B2BMonthlyInvoice,
  ScratchZone,
  AdminAccessRole
} from '../../types';
import { HomepageCmsConfig } from '../../types/cms';
import {
  YEMENI_WALLETS,
  CAR_CATEGORIES,
  SANAA_NEIGHBORHOODS,
  SAMPLE_ID_DOC_SVG,
  SAMPLE_LICENSE_DOC_SVG,
  SAMPLE_GUARANTEE_DOC_SVG,
  SAMPLE_RECEIPT_DOC_SVG,
  SAMPLE_SIGNATURE_SVG
} from '../../data/mockData';
import {
  DEFAULT_SCRATCH_ZONES,
  INITIAL_INVESTOR_CARS,
  INITIAL_DYNAMIC_PRICING_RULES,
  INITIAL_FINES_INCIDENTS,
  INITIAL_B2B_INVOICES
} from '../../data/enterpriseMockData';
import {
  ADMIN_NAVIGATION_CATEGORIES,
  findCategoryByModule,
  findModuleItem
} from '../../data/adminNavigation';
import {
  ContractQrCodeBadge,
  InteractiveScratchMap,
  RoiAnalyticsModule,
  AlertsRadarModule,
  FleetTimelineModule,
  DynamicPricingModule,
  InvestorsModule,
  FinesIncidentsModule,
  B2BInvoicesSubPanel,
  WhatsAppHubModule
} from './EnterpriseModulesSuite';
import { HomepageCmsManager } from '../cms/HomepageCmsManager';
import { AgencyBrandStudio, downloadExcelCsv } from './AgencyBrandStudio';
import { WhatsAppQuickConciergeModal } from '../common/WhatsAppQuickConciergeModal';
import { ElectronicLeaseContractModal } from '../common/ElectronicLeaseContractModal';
import {
  DEFAULT_OFFICIAL_CONTRACT_CLAUSES,
  DEFAULT_SPECIAL_TERMS
} from '../../data/contractTerms';
import {
  LayoutDashboard,
  FileCheck2,
  Users,
  ClipboardCheck,
  Car as CarIcon,
  Wrench,
  UserCheck,
  Wallet,
  Sliders,
  Search,
  Plus,
  Eye,
  Printer,
  Edit3,
  Trash2,
  X,
  Building2,
  ShieldAlert,
  Palette,
  FileSpreadsheet,
  MessageCircle,
  MessageSquare,
  Check
} from 'lucide-react';

interface AdminPortalProps {
  activeModule?: AdminModuleId;
  onChangeModule?: (mod: AdminModuleId) => void;
  cars: Car[];
  bookings: Booking[];
  drivers: Driver[];
  clients: ClientProfile[];
  onSaveClient: (client: ClientProfile) => void;
  onDeleteClient?: (clientId: string) => void;
  onUpdateClientStatus: (
    clientId: string,
    status: ClientProfile['verificationStatus']
  ) => void;
  inspections: VehicleInspectionRecord[];
  onAddInspection: (record: VehicleInspectionRecord) => void;
  onSaveInspection?: (record: VehicleInspectionRecord) => void;
  onDeleteInspection?: (id: string) => void;
  maintenanceRecords: MaintenanceRecord[];
  onSaveMaintenance: (record: MaintenanceRecord) => void;
  onDeleteMaintenance?: (id: string) => void;
  currency: Currency;
  language: Language;
  exchangeRate: number;
  onExchangeRateChange: (rate: number) => void;
  onUpdateBookingStatus: (
    bookingId: string,
    status: Booking['bookingStatus']
  ) => void;
  onVerifyGuarantee: (bookingId: string) => void;
  onAssignDriver: (bookingId: string, driverId: string) => void;
  onCreateDirectBooking?: (newBooking: Booking) => void;
  onSaveBooking?: (booking: Booking) => void;
  onDeleteBooking?: (bookingId: string) => void;
  onToggleCarAvailability: (carId: string) => void;
  onSaveCar: (car: Car) => void;
  onDeleteCar: (carId: string) => void;
  onPreviewCarLanding: (car: Car) => void;
  onSaveDriver?: (driver: Driver) => void;
  onDeleteDriver?: (driverId: string) => void;
  transactions: FinancialTransaction[];
  onAddTransaction: (tx: Omit<FinancialTransaction, 'id' | 'date'>) => void;
  onSaveTransaction?: (tx: FinancialTransaction) => void;
  onDeleteTransaction?: (txId: string) => void;
  rfqRequests: RfqRequest[];
  onUpdateRfqStatus: (id: string, status: RfqRequest['status']) => void;
  onSaveRfq?: (rfq: RfqRequest) => void;
  onDeleteRfq?: (id: string) => void;
  cmsConfig: HomepageCmsConfig;
  onUpdateCmsConfig: (updated: HomepageCmsConfig) => void;
  onResetCmsConfig: () => void;
  themeMode?: 'dark' | 'light';
  onToggleThemeMode?: (mode: 'dark' | 'light') => void;
  onPreviewLiveLanding?: () => void;
  adminAccessRole?: AdminAccessRole;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  activeModule: externalModule,
  onChangeModule,
  cars,
  bookings,
  drivers,
  clients,
  onSaveClient,
  onDeleteClient,
  onUpdateClientStatus,
  inspections,
  onAddInspection,
  onSaveInspection,
  onDeleteInspection,
  maintenanceRecords,
  onSaveMaintenance,
  onDeleteMaintenance,
  currency,
  language: lang,
  exchangeRate,
  onExchangeRateChange,
  onUpdateBookingStatus,
  onVerifyGuarantee,
  onAssignDriver,
  onCreateDirectBooking,
  onSaveBooking,
  onDeleteBooking,
  onToggleCarAvailability,
  onSaveCar,
  onDeleteCar,
  onPreviewCarLanding,
  onSaveDriver,
  onDeleteDriver,
  transactions,
  onAddTransaction,
  onSaveTransaction,
  onDeleteTransaction,
  rfqRequests,
  onUpdateRfqStatus,
  onSaveRfq,
  onDeleteRfq,
  cmsConfig,
  onUpdateCmsConfig,
  onResetCmsConfig,
  themeMode = 'dark',
  onToggleThemeMode,
  onPreviewLiveLanding
}) => {
  const [internalModule, setInternalModule] = useState<AdminModuleId>('overview');
  const rawTab = externalModule || internalModule;
  const activeTab: AdminModuleId =
    rawTab === 'drivers_rfq' ? 'drivers' : rawTab;

  const setActiveTab = (mod: AdminModuleId) => {
    setInternalModule(mod);
    if (onChangeModule) {
      onChangeModule(mod);
    }
  };

  // Universal Delete Confirmation Modal State (No window.confirm!)
  const [deleteTarget, setDeleteTarget] = useState<{
    title: string;
    onConfirm: () => void;
  } | null>(null);

  // =========================================================================
  // 1. ORDERS & CONTRACTS STATE
  // =========================================================================
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [viewingBooking, setViewingBooking] = useState<Booking | null>(null);
  const [printingContract, setPrintingContract] = useState<Booking | null>(null);
  const [adminConciergeBooking, setAdminConciergeBooking] = useState<Booking | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [editingBookingId, setEditingBookingId] = useState<string | null>(null);
  const [orderForm, setOrderForm] = useState({
    carId: cars[0]?.id || 'car-1',
    clientCategory: 'corporate' as 'individual' | 'corporate' | 'un_ngo',
    organizationName: '',
    customerName: '',
    customerPhone: '+967 77',
    customerIdNumber: '',
    customerLicenseNumber: '',
    guaranteeType: 'commercial_guarantor' as GuaranteeType,
    guaranteeDetails: '',
    guaranteeStatus: 'approved' as Booking['guaranteeStatus'],
    bookingStatus: 'confirmed' as Booking['bookingStatus'],
    pickupLocation: SANAA_NEIGHBORHOODS[0],
    destination: 'أمانة العاصمة صنعاء',
    days: 3,
    withDriver: false,
    walletUsed: 'kuraimi' as PaymentWallet,
    transactionRef: '',
    idDocumentType: 'national_id' as 'national_id' | 'passport' | 'commercial_record',
    insuranceCoverage: 'comprehensive' as 'comprehensive' | 'third_party' | 'vip_shield',
    dailyKmAllowance: 200,
    extraKmRateYer: 350,
    fuelLevelOut: 'full' as 'full' | 'three_quarters' | 'half' | 'quarter',
    guarantorPhone: '+967 77',
    depositHeldAmountYer: 100000,
    contractClauses: DEFAULT_OFFICIAL_CONTRACT_CLAUSES,
    contractSpecialTerms: DEFAULT_SPECIAL_TERMS
  });

  // =========================================================================
  // 2. ORGANIZATION TENDERS (RFQ) STATE (Independent Module!)
  // =========================================================================
  const [rfqSearch, setRfqSearch] = useState('');
  const [viewingRfq, setViewingRfq] = useState<RfqRequest | null>(null);
  const [isRfqModalOpen, setIsRfqModalOpen] = useState(false);
  const [editingRfqId, setEditingRfqId] = useState<string | null>(null);
  const [rfqForm, setRfqForm] = useState({
    orgName: '',
    orgType: 'un_ngo' as RfqRequest['orgType'],
    contactPerson: '',
    phone: '+967 77',
    email: '',
    vehiclesCount: 3,
    durationMonths: 6,
    vehicleCategory: 'لاندكروزر + برادو الميداني',
    requirements: '',
    status: 'new' as RfqRequest['status']
  });

  // =========================================================================
  // 3. CLIENTS CRM STATE
  // =========================================================================
  const [crmSearch, setCrmSearch] = useState('');
  const [crmSegmentFilter, setCrmSegmentFilter] = useState('all');
  const [viewingClient, setViewingClient] = useState<ClientProfile | null>(null);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [editingClientId, setEditingClientId] = useState<string | null>(null);
  const [clientForm, setClientForm] = useState({
    clientType: 'corporate' as ClientSegment,
    name: '',
    organizationName: '',
    jobTitle: '',
    phone: '+967 77',
    email: '',
    address: 'صنعاء — شارع حدة',
    nationalIdOrPassport: '',
    licenseNumber: '',
    licenseExpiry: '2029-12-31',
    guarantorName: '',
    guarantorType: 'commercial_guarantor' as GuaranteeType,
    guarantorDocumentRef: '',
    guarantorPhone: '+967 01 ',
    verificationStatus: 'verified' as ClientProfile['verificationStatus'],
    creditLimitUsd: 10000,
    heldDepositYer: 0,
    notes: ''
  });

  // =========================================================================
  // 4. FLEET & PRICING STATE
  // =========================================================================
  const [fleetSearch, setFleetSearch] = useState('');
  const [isCarModalOpen, setIsCarModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [carForm, setCarForm] = useState<Car>({
    id: '',
    slug: '',
    name: '',
    nameEn: '',
    category: 'luxury_suv',
    modelYear: 2024,
    engine: '3.5L V6 Twin Turbo',
    seats: 7,
    transmission: 'أوتوماتيك',
    pricePerDayYer: 95000,
    pricePerDayUsd: 180,
    pricePerWeekYer: 590000,
    pricePerMonthYer: 2250000,
    pricePerMonthUsd: 4200,
    pricePerKmInterCityYer: 280,
    securityDepositYer: 200000,
    securityDepositUsd: 375,
    freeKmPerDay: 250,
    extraKmFeeYer: 200,
    image: '/src/assets/images/car_lexus_lx600_1790624445559.jpg',
    landingSubtitle: 'فخامة تنفيذية وموثوقية عالية على كافة الطرق',
    landingDescription: 'مركبة مفحوصة ومؤمنة بالكامل جاهزة للتسليم الفوري في صنعاء.',
    available: true,
    plateNumber: 'صنعاء 1 - 9900',
    currentLocation: 'فرع حدة الرئيسي — صنعاء',
    features: ['تأمين شامل', 'GPS', 'تكييف مركزي'],
    featuresEn: ['Full Insurance', 'GPS', 'A/C'],
    rating: 5.0,
    tripsCount: 12,
    fuelType: 'بنزين أوكتان 95'
  });

  // =========================================================================
  // 5. DRIVERS / CHAUFFEURS STATE (Independent Module!)
  // =========================================================================
  const [driverSearch, setDriverSearch] = useState('');
  const [viewingDriver, setViewingDriver] = useState<Driver | null>(null);
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [editingDriverId, setEditingDriverId] = useState<string | null>(null);
  const [driverForm, setDriverForm] = useState({
    name: '',
    nameEn: '',
    phone: '+967 77',
    avatar: '/src/assets/images/chauffeur_vip_sanaa_1790624476123.jpg',
    licenseNumber: 'رخصة قيادة أولى — صنعاء',
    status: 'available' as Driver['status'],
    assignedCarName: cars[0]?.name || 'لكزس LX600 VIP',
    assignedCarPlate: cars[0]?.plateNumber || 'صنعاء 1 - 4410',
    currentLocation: 'فرع حدة الرئيسي — صنعاء',
    earningsThisMonthYer: 185000,
    earningsThisMonthUsd: 345,
    yearsExperience: 8,
    interGovernorateCertified: true
  });

  // =========================================================================
  // 6. HANDOVER & INSPECTION STATE
  // =========================================================================
  const [inspSearch, setInspSearch] = useState('');
  const [viewingInspection, setViewingInspection] =
    useState<VehicleInspectionRecord | null>(null);
  const [isInspModalOpen, setIsInspModalOpen] = useState(false);
  const [editingInspId, setEditingInspId] = useState<string | null>(null);
  const [inspForm, setInspForm] = useState({
    bookingId: bookings[0]?.id || 'UNT-7801',
    inspectionType: 'check_in' as 'check_out' | 'check_in',
    inspectorName: 'م. ريدان الشامي',
    odometerOutKm: 18420,
    odometerInKm: 19120,
    allowedKm: 750,
    extraKmRateYer: 200,
    fuelLevelOut: '100%' as '100%' | '75%' | '50%' | '25%',
    fuelLevelIn: '100%' as '100%' | '75%' | '50%' | '25%',
    exteriorCondition: 'agency_intact' as
      | 'agency_intact'
      | 'minor_scratches'
      | 'damage_detected',
    interiorCondition: 'clean_intact' as
      | 'clean_intact'
      | 'needs_cleaning'
      | 'damage_detected',
    tiresAndSpareOk: true,
    safetyKitAndToolsOk: true,
    damageDeductionYer: 0,
    securityDepositHeldYer: 200000,
    damageNotes: 'المركبة سليمة ومطابقة لحالة الاستلام.'
  });

  // =========================================================================
  // 7. MAINTENANCE & INSURANCE STATE
  // =========================================================================
  const [maintSearch, setMaintSearch] = useState('');
  const [viewingMaint, setViewingMaint] = useState<MaintenanceRecord | null>(null);
  const [isMaintModalOpen, setIsMaintModalOpen] = useState(false);
  const [editingMaintId, setEditingMaintId] = useState<string | null>(null);
  const [maintForm, setMaintForm] = useState({
    carId: cars[0]?.id || 'car-1',
    serviceType: 'periodic_oil_filter' as MaintenanceRecord['serviceType'],
    title: '',
    workshopOrProvider: 'المركز الهندسي للأسطول — صنعاء',
    date: new Date().toISOString().split('T')[0],
    nextDueDate: '2025-09-01',
    odometerKm: 22000,
    nextDueOdometerKm: 27000,
    costYer: 45000,
    status: 'completed' as MaintenanceRecord['status'],
    notes: ''
  });

  // =========================================================================
  // 8. ACCOUNTING & TREASURY STATE
  // =========================================================================
  const [txSearch, setTxSearch] = useState('');
  const [txTypeFilter, setTxTypeFilter] = useState('all');
  const [viewingTx, setViewingTx] = useState<FinancialTransaction | null>(null);
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [editingTxId, setEditingTxId] = useState<string | null>(null);
  const [txForm, setTxForm] = useState({
    type: 'receipt' as FinancialTransaction['type'],
    partyName: '',
    amountYer: 95000,
    wallet: 'kuraimi' as PaymentWallet,
    referenceNo: '',
    description: ''
  });

  // =========================================================================
  // 9. ENTERPRISE 10-PROPOSALS SUITE STATE
  // =========================================================================
  const [investorCars, setInvestorCars] =
    useState<InvestorCarRecord[]>(INITIAL_INVESTOR_CARS);
  const [pricingRules, setPricingRules] = useState<DynamicPricingRule[]>(
    INITIAL_DYNAMIC_PRICING_RULES
  );
  const [finesIncidents, setFinesIncidents] = useState<TrafficFineIncident[]>(
    INITIAL_FINES_INCIDENTS
  );
  const [b2bInvoices, setB2bInvoices] =
    useState<B2BMonthlyInvoice[]>(INITIAL_B2B_INVOICES);
  const [scratchZones, setScratchZones] =
    useState<ScratchZone[]>(DEFAULT_SCRATCH_ZONES);

  const handleScratchZonesChange = (updated: ScratchZone[]) => {
    setScratchZones(updated);
    const totalDmg = updated.reduce((a, z) => a + z.estimatedCostYer, 0);
    const damagedLabels = updated
      .filter((z) => z.status !== 'intact')
      .map((z) => `${z.label} (${z.status === 'scratch' ? 'خدش' : 'ضرر'})`);
    setInspForm((prev) => ({
      ...prev,
      damageDeductionYer: totalDmg,
      exteriorCondition:
        totalDmg >= 45000
          ? 'damage_detected'
          : totalDmg > 0
          ? 'minor_scratches'
          : 'agency_intact',
      damageNotes:
        damagedLabels.length > 0
          ? `تقرير مخطط الهيكل: ${damagedLabels.join(' + ')}`
          : 'المركبة سليمة ومطابقة لحالة الاستلام (فحص 8 نقاط وكالة).'
    }));
  };

  const handleSaveInvestor = (rec: InvestorCarRecord) => {
    setInvestorCars((prev) => {
      const exists = prev.some((i) => i.id === rec.id);
      return exists ? prev.map((i) => (i.id === rec.id ? rec : i)) : [rec, ...prev];
    });
  };

  const handleDeleteInvestor = (id: string) => {
    setInvestorCars((prev) => prev.filter((i) => i.id !== id));
  };

  const handleSettleInvestorPayout = (rec: InvestorCarRecord) => {
    setInvestorCars((prev) =>
      prev.map((i) => (i.id === rec.id ? { ...i, payoutStatus: 'settled' } : i))
    );
    onAddTransaction({
      type: 'expense',
      partyName: rec.investorName,
      amountYer: rec.netInvestorPayoutYer,
      amountUsd: Math.round(rec.netInvestorPayoutYer / exchangeRate),
      wallet: rec.preferredWallet,
      referenceNo: `INV-PAY-${rec.id}`,
      description: `تصفية وصرف عائدات سيارة مستثمر (${rec.carName} — ${rec.plateNumber}) بنسبة ${rec.investorSharePct}%`,
      status: 'completed'
    });
  };

  const handleSavePricingRule = (rule: DynamicPricingRule) => {
    setPricingRules((prev) => {
      const exists = prev.some((r) => r.id === rule.id);
      return exists ? prev.map((r) => (r.id === rule.id ? rule : r)) : [rule, ...prev];
    });
  };

  const handleDeletePricingRule = (id: string) => {
    setPricingRules((prev) => prev.filter((r) => r.id !== id));
  };

  const handleTogglePricingRule = (id: string) => {
    setPricingRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
  };

  const handleSaveFine = (rec: TrafficFineIncident) => {
    setFinesIncidents((prev) => {
      const exists = prev.some((f) => f.id === rec.id);
      return exists ? prev.map((f) => (f.id === rec.id ? rec : f)) : [rec, ...prev];
    });
  };

  const handleDeleteFine = (id: string) => {
    setFinesIncidents((prev) => prev.filter((f) => f.id !== id));
  };

  const handleMarkB2BInvoicePaid = (inv: B2BMonthlyInvoice) => {
    setB2bInvoices((prev) =>
      prev.map((i) => (i.id === inv.id ? { ...i, status: 'paid' } : i))
    );
    onAddTransaction({
      type: 'receipt',
      partyName: inv.organizationName,
      amountYer: inv.totalAmountYer,
      amountUsd: inv.totalAmountUsd,
      wallet: 'kuraimi',
      referenceNo: inv.lpoNumber,
      description: `سند قبض فاتورة منظمة/شركة شهرية (${inv.billingMonth}) — أمر شراء ${inv.lpoNumber}`,
      status: 'completed'
    });
  };

  const handleExtendBookingDays = (bookingId: string, extraDays: number) => {
    const target = bookings.find((b) => b.id === bookingId);
    if (!target || !onSaveBooking) return;
    const car = cars.find((c) => c.id === target.carId) || cars[0];
    const newDays = target.days + extraDays;
    const newTotalYer = target.totalAmountYer + car.pricePerDayYer * extraDays;
    onSaveBooking({
      ...target,
      days: newDays,
      totalAmountYer: newTotalYer,
      totalAmountUsd: Math.round(newTotalYer / exchangeRate)
    });
  };

  // =========================================================================
  // HELPERS & METRICS
  // =========================================================================
  const formatMoney = (amountYer: number, amountUsd?: number) => {
    if (currency === 'USD') {
      const usd =
        amountUsd !== undefined ? amountUsd : Math.round(amountYer / exchangeRate);
      return `$${usd.toLocaleString()}`;
    }
    return `${amountYer.toLocaleString()} ر.ي`;
  };

  const totalReceiptsYer = transactions
    .filter((t) => t.type === 'receipt')
    .reduce((acc, t) => acc + t.amountYer, 0);
  const totalOutflowsYer = transactions
    .filter((t) => t.type !== 'receipt')
    .reduce((acc, t) => acc + t.amountYer, 0);
  const netTreasuryYer = totalReceiptsYer - totalOutflowsYer;

  const getSegmentLabel = (seg?: string) => {
    switch (seg) {
      case 'un_ngo':
        return 'منظمة دولية';
      case 'embassy':
        return 'بعثة دبلوماسية';
      case 'corporate':
        return 'شركة / أعمال';
      case 'vip':
        return 'كبار الشخصيات';
      default:
        return 'أفراد';
    }
  };

  const getBookingStatusLabel = (status: Booking['bookingStatus']) => {
    switch (status) {
      case 'pending_approval':
        return { text: 'بانتظار الاعتماد', cls: 'text-amber-400' };
      case 'confirmed':
        return { text: 'عقد معتمد', cls: 'text-sky-400' };
      case 'driver_en_route':
        return { text: 'جاري التوصيل', cls: 'text-indigo-400' };
      case 'in_progress':
        return { text: 'المركبة مع العميل', cls: 'text-emerald-400' };
      case 'completed':
        return { text: 'مكتمل ومخلى الطرف', cls: 'text-slate-400' };
      case 'cancelled':
        return { text: 'ملغي', cls: 'text-rose-400' };
    }
  };

  // =========================================================================
  // CRUD HANDLERS (ADD + EDIT)
  // =========================================================================

  // 1. Orders
  const openAddOrder = () => {
    setEditingBookingId(null);
    setOrderForm({
      carId: cars[0]?.id || 'car-1',
      clientCategory: 'corporate',
      organizationName: '',
      customerName: '',
      customerPhone: '+967 77',
      customerIdNumber: '',
      customerLicenseNumber: '',
      guaranteeType: 'commercial_guarantor',
      guaranteeDetails: '',
      guaranteeStatus: 'approved',
      bookingStatus: 'confirmed',
      pickupLocation: SANAA_NEIGHBORHOODS[0],
      destination: 'أمانة العاصمة صنعاء',
      days: 3,
      withDriver: false,
      walletUsed: 'kuraimi',
      transactionRef: '',
      idDocumentType: 'national_id',
      insuranceCoverage: 'comprehensive',
      dailyKmAllowance: 200,
      extraKmRateYer: 350,
      fuelLevelOut: 'full',
      guarantorPhone: '+967 77',
      depositHeldAmountYer: 100000,
      contractClauses: DEFAULT_OFFICIAL_CONTRACT_CLAUSES,
      contractSpecialTerms: DEFAULT_SPECIAL_TERMS
    });
    setIsOrderModalOpen(true);
  };

  const openEditOrder = (b: Booking) => {
    setEditingBookingId(b.id);
    setOrderForm({
      carId: b.carId,
      clientCategory: b.clientCategory || 'individual',
      organizationName: b.organizationName || '',
      customerName: b.customerName,
      customerPhone: b.customerPhone,
      customerIdNumber: b.customerIdNumber,
      customerLicenseNumber: b.customerLicenseNumber || '',
      guaranteeType: b.guaranteeType,
      guaranteeDetails: b.guaranteeDetails,
      guaranteeStatus: b.guaranteeStatus,
      bookingStatus: b.bookingStatus,
      pickupLocation: b.pickupLocation,
      destination: b.destination,
      days: b.days,
      withDriver: b.withDriver,
      walletUsed: b.walletUsed,
      transactionRef: b.transactionRef,
      idDocumentType: b.idDocumentType || 'national_id',
      insuranceCoverage: b.insuranceCoverage || 'comprehensive',
      dailyKmAllowance: b.dailyKmAllowance !== undefined ? b.dailyKmAllowance : 200,
      extraKmRateYer: b.extraKmRateYer || 350,
      fuelLevelOut: b.fuelLevelOut || 'full',
      guarantorPhone: b.guarantorPhone || '+967 77',
      depositHeldAmountYer: b.depositHeldAmountYer || 100000,
      contractClauses:
        b.contractClauses && b.contractClauses.length > 0
          ? b.contractClauses
          : DEFAULT_OFFICIAL_CONTRACT_CLAUSES,
      contractSpecialTerms: b.contractSpecialTerms || DEFAULT_SPECIAL_TERMS
    });
    setIsOrderModalOpen(true);
  };

  const handleSaveOrderForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderForm.customerName.trim()) return;
    const selectedCar = cars.find((c) => c.id === orderForm.carId) || cars[0];
    const driverDailyYer = orderForm.withDriver ? 18000 : 0;
    const totalYer =
      (selectedCar.pricePerDayYer + driverDailyYer) * Math.max(1, orderForm.days);
    const totalUsd = Math.round(totalYer / exchangeRate);

    if (editingBookingId) {
      const existing = bookings.find((b) => b.id === editingBookingId);
      if (existing && onSaveBooking) {
        onSaveBooking({
          ...existing,
          carId: selectedCar.id,
          carName: selectedCar.name,
          carImage: selectedCar.image,
          clientCategory: orderForm.clientCategory,
          organizationName: orderForm.organizationName || undefined,
          customerName: orderForm.customerName,
          customerPhone: orderForm.customerPhone,
          customerIdNumber: orderForm.customerIdNumber,
          customerLicenseNumber: orderForm.customerLicenseNumber,
          guaranteeType: orderForm.guaranteeType,
          guaranteeStatus: orderForm.guaranteeStatus,
          guaranteeDetails: orderForm.guaranteeDetails,
          bookingStatus: orderForm.bookingStatus,
          pickupLocation: orderForm.pickupLocation,
          destination: orderForm.destination,
          days: orderForm.days,
          withDriver: orderForm.withDriver,
          totalAmountYer: totalYer,
          totalAmountUsd: totalUsd,
          walletUsed: orderForm.walletUsed,
          transactionRef: orderForm.transactionRef,
          idDocumentType: orderForm.idDocumentType,
          insuranceCoverage: orderForm.insuranceCoverage,
          dailyKmAllowance: orderForm.dailyKmAllowance,
          extraKmRateYer: orderForm.extraKmRateYer,
          fuelLevelOut: orderForm.fuelLevelOut,
          guarantorPhone: orderForm.guarantorPhone,
          depositHeldAmountYer: orderForm.depositHeldAmountYer,
          contractClauses: orderForm.contractClauses,
          contractSpecialTerms: orderForm.contractSpecialTerms
        });
      }
    } else {
      const newBooking: Booking = {
        id: `UNT-${Math.floor(7820 + Math.random() * 1900)}`,
        carId: selectedCar.id,
        carName: selectedCar.name,
        carImage: selectedCar.image,
        clientCategory: orderForm.clientCategory,
        organizationName: orderForm.organizationName || undefined,
        customerName: orderForm.customerName,
        customerPhone: orderForm.customerPhone,
        customerIdNumber: orderForm.customerIdNumber || '01010099881',
        customerLicenseNumber: orderForm.customerLicenseNumber || 'SAN-2024-881',
        guaranteeType: orderForm.guaranteeType,
        guaranteeStatus: orderForm.guaranteeStatus,
        guaranteeDetails:
          orderForm.guaranteeDetails || 'ضمانة معتمدة لدى قسم العقود',
        idDocumentUrl: SAMPLE_ID_DOC_SVG,
        licenseDocumentUrl: SAMPLE_LICENSE_DOC_SVG,
        guaranteeDocumentUrl: SAMPLE_GUARANTEE_DOC_SVG,
        paymentReceiptUrl: SAMPLE_RECEIPT_DOC_SVG,
        contractAgreed: true,
        contractSignedAt: new Date().toLocaleString('ar-YE'),
        customerSignatureDataUrl: SAMPLE_SIGNATURE_SVG,
        rentalType: orderForm.withDriver ? 'with_chauffeur' : 'self_drive',
        deliveryMode: 'branch_pickup',
        pickupLocation: orderForm.pickupLocation,
        destination: orderForm.destination,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + orderForm.days * 86400000)
          .toISOString()
          .split('T')[0],
        days: orderForm.days,
        withDriver: orderForm.withDriver,
        totalAmountYer: totalYer,
        totalAmountUsd: totalUsd,
        paymentPlan: 'full_100',
        paidAmountYer: totalYer,
        remainingAmountYer: 0,
        walletUsed: orderForm.walletUsed,
        paymentStatus: 'paid',
        transactionRef:
          orderForm.transactionRef ||
          `KRM-${Math.floor(100000 + Math.random() * 899999)}`,
        bookingStatus: orderForm.bookingStatus,
        tripProgressPct: 20,
        currentCheckpointIndex: 0,
        checkpoints: [],
        etaMinutes: 25,
        currentSpeedKmh: 0,
        idDocumentType: orderForm.idDocumentType,
        insuranceCoverage: orderForm.insuranceCoverage,
        dailyKmAllowance: orderForm.dailyKmAllowance,
        extraKmRateYer: orderForm.extraKmRateYer,
        fuelLevelOut: orderForm.fuelLevelOut,
        guarantorPhone: orderForm.guarantorPhone,
        depositHeldAmountYer: orderForm.depositHeldAmountYer,
        contractClauses: orderForm.contractClauses,
        contractSpecialTerms: orderForm.contractSpecialTerms,
        createdAt: new Date().toISOString().split('T')[0]
      };
      if (onSaveBooking) onSaveBooking(newBooking);
      else if (onCreateDirectBooking) onCreateDirectBooking(newBooking);
    }
    setIsOrderModalOpen(false);
  };

  // 2. RFQs (Organization Tenders)
  const openAddRfq = () => {
    setEditingRfqId(null);
    setRfqForm({
      orgName: '',
      orgType: 'un_ngo',
      contactPerson: '',
      phone: '+967 77',
      email: '',
      vehiclesCount: 3,
      durationMonths: 6,
      vehicleCategory: 'تويوتا لاندكروزر + برادو الميداني',
      requirements: '',
      status: 'new'
    });
    setIsRfqModalOpen(true);
  };

  const openEditRfq = (rfq: RfqRequest) => {
    setEditingRfqId(rfq.id);
    setRfqForm({
      orgName: rfq.orgName,
      orgType: rfq.orgType,
      contactPerson: rfq.contactPerson,
      phone: rfq.phone,
      email: rfq.email,
      vehiclesCount: rfq.vehiclesCount,
      durationMonths: rfq.durationMonths,
      vehicleCategory: rfq.vehicleCategory,
      requirements: rfq.requirements,
      status: rfq.status
    });
    setIsRfqModalOpen(true);
  };

  const handleSaveRfqForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rfqForm.orgName.trim()) return;
    const saved: RfqRequest = {
      id: editingRfqId || `RFQ-${Math.floor(200 + Math.random() * 799)}`,
      orgName: rfqForm.orgName,
      orgType: rfqForm.orgType,
      contactPerson: rfqForm.contactPerson,
      phone: rfqForm.phone,
      email: rfqForm.email,
      vehiclesCount: Number(rfqForm.vehiclesCount) || 1,
      durationMonths: Number(rfqForm.durationMonths) || 1,
      vehicleCategory: rfqForm.vehicleCategory,
      requirements: rfqForm.requirements,
      status: rfqForm.status,
      createdAt: new Date().toISOString().split('T')[0]
    };
    if (onSaveRfq) onSaveRfq(saved);
    setIsRfqModalOpen(false);
  };

  // 3. Clients CRM
  const openAddClient = () => {
    setEditingClientId(null);
    setClientForm({
      clientType: 'corporate',
      name: '',
      organizationName: '',
      jobTitle: '',
      phone: '+967 77',
      email: '',
      address: 'صنعاء — شارع حدة',
      nationalIdOrPassport: '',
      licenseNumber: '',
      licenseExpiry: '2029-12-31',
      guarantorName: '',
      guarantorType: 'commercial_guarantor',
      guarantorDocumentRef: '',
      guarantorPhone: '+967 01 ',
      verificationStatus: 'verified',
      creditLimitUsd: 10000,
      heldDepositYer: 0,
      notes: ''
    });
    setIsClientModalOpen(true);
  };

  const openEditClient = (c: ClientProfile) => {
    setEditingClientId(c.id);
    setClientForm({
      clientType: c.clientType,
      name: c.name,
      organizationName: c.organizationName || '',
      jobTitle: c.jobTitle || '',
      phone: c.phone,
      email: c.email,
      address: c.address,
      nationalIdOrPassport: c.nationalIdOrPassport,
      licenseNumber: c.licenseNumber || '',
      licenseExpiry: c.licenseExpiry || '',
      guarantorName: c.guarantorName,
      guarantorType: c.guarantorType,
      guarantorDocumentRef: c.guarantorDocumentRef,
      guarantorPhone: c.guarantorPhone,
      verificationStatus: c.verificationStatus,
      creditLimitUsd: c.creditLimitUsd,
      heldDepositYer: c.heldDepositYer,
      notes: c.notes
    });
    setIsClientModalOpen(true);
  };

  const handleSaveClientForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientForm.name.trim()) return;
    const existing = editingClientId
      ? clients.find((c) => c.id === editingClientId)
      : undefined;

    const saved: ClientProfile = {
      id: editingClientId || `CRM-${Math.floor(1030 + Math.random() * 890)}`,
      clientType: clientForm.clientType,
      name: clientForm.name,
      organizationName: clientForm.organizationName || undefined,
      jobTitle: clientForm.jobTitle || undefined,
      phone: clientForm.phone,
      email: clientForm.email || 'client@sanaa-rental.ye',
      address: clientForm.address,
      nationalIdOrPassport: clientForm.nationalIdOrPassport || '01010088776',
      licenseNumber: clientForm.licenseNumber,
      licenseExpiry: clientForm.licenseExpiry,
      guarantorName: clientForm.guarantorName || 'ضمانة تجارية معتمدة',
      guarantorType: clientForm.guarantorType,
      guarantorDocumentRef: clientForm.guarantorDocumentRef || 'CR-SANAA-990',
      guarantorPhone: clientForm.guarantorPhone,
      verificationStatus: clientForm.verificationStatus,
      riskScore: clientForm.verificationStatus === 'blacklisted' ? 'high' : 'low',
      creditLimitUsd: Number(clientForm.creditLimitUsd) || 5000,
      totalBookingsCount: existing?.totalBookingsCount || 0,
      activeBookingsCount: existing?.activeBookingsCount || 0,
      totalSpentYer: existing?.totalSpentYer || 0,
      totalSpentUsd: existing?.totalSpentUsd || 0,
      heldDepositYer: Number(clientForm.heldDepositYer) || 0,
      idDocumentUrl: existing?.idDocumentUrl || SAMPLE_ID_DOC_SVG,
      licenseDocumentUrl: existing?.licenseDocumentUrl || SAMPLE_LICENSE_DOC_SVG,
      guaranteeDocumentUrl:
        existing?.guaranteeDocumentUrl || SAMPLE_GUARANTEE_DOC_SVG,
      notes: clientForm.notes || 'ملف عميل معتمد.',
      createdAt: existing?.createdAt || new Date().toISOString().split('T')[0]
    };
    onSaveClient(saved);
    setIsClientModalOpen(false);
  };

  // 4. Fleet
  const openAddCar = () => {
    setEditingCar(null);
    setCarForm({
      id: `car-${Date.now()}`,
      slug: `car-${Date.now()}`,
      name: '',
      nameEn: '',
      category: 'luxury_suv',
      modelYear: 2024,
      engine: '3.5L V6 Twin Turbo',
      seats: 7,
      transmission: 'أوتوماتيك',
      pricePerDayYer: 95000,
      pricePerDayUsd: 180,
      pricePerWeekYer: 590000,
      pricePerMonthYer: 2250000,
      pricePerMonthUsd: 4200,
      pricePerKmInterCityYer: 280,
      securityDepositYer: 200000,
      securityDepositUsd: 375,
      freeKmPerDay: 250,
      extraKmFeeYer: 200,
      image: '/src/assets/images/car_lexus_lx600_1790624445559.jpg',
      landingSubtitle: 'فخامة تنفيذية وموثوقية عالية',
      landingDescription: 'مركبة مفحوصة ومؤمنة بالكامل جاهزة للتسليم الفوري.',
      available: true,
      plateNumber: 'صنعاء 1 - ',
      currentLocation: 'فرع حدة الرئيسي — صنعاء',
      features: ['تأمين شامل', 'GPS', 'تكييف مركزي'],
      featuresEn: ['Full Insurance', 'GPS', 'A/C'],
      rating: 5.0,
      tripsCount: 0,
      fuelType: 'بنزين'
    });
    setIsCarModalOpen(true);
  };

  const openEditCar = (car: Car) => {
    setEditingCar(car);
    setCarForm({ ...car });
    setIsCarModalOpen(true);
  };

  const handleSaveCarForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!carForm.name.trim()) return;
    onSaveCar({
      ...carForm,
      pricePerDayUsd: Math.round(carForm.pricePerDayYer / exchangeRate),
      securityDepositUsd: Math.round(carForm.securityDepositYer / exchangeRate)
    });
    setIsCarModalOpen(false);
  };

  // 5. Drivers
  const openAddDriver = () => {
    setEditingDriverId(null);
    setDriverForm({
      name: '',
      nameEn: '',
      phone: '+967 77',
      avatar: '/src/assets/images/chauffeur_vip_sanaa_1790624476123.jpg',
      licenseNumber: 'رخصة قيادة درجة أولى — صنعاء',
      status: 'available',
      assignedCarName: cars[0]?.name || 'لكزس LX600 VIP',
      assignedCarPlate: cars[0]?.plateNumber || 'صنعاء 1 - 4410',
      currentLocation: 'فرع حدة الرئيسي — صنعاء',
      earningsThisMonthYer: 150000,
      earningsThisMonthUsd: 280,
      yearsExperience: 7,
      interGovernorateCertified: true
    });
    setIsDriverModalOpen(true);
  };

  const openEditDriver = (drv: Driver) => {
    setEditingDriverId(drv.id);
    setDriverForm({
      name: drv.name,
      nameEn: drv.nameEn,
      phone: drv.phone,
      avatar: drv.avatar,
      licenseNumber: drv.licenseNumber,
      status: drv.status,
      assignedCarName: drv.assignedCarName || '',
      assignedCarPlate: drv.assignedCarPlate || '',
      currentLocation: drv.currentLocation,
      earningsThisMonthYer: drv.earningsThisMonthYer,
      earningsThisMonthUsd: drv.earningsThisMonthUsd,
      yearsExperience: drv.yearsExperience,
      interGovernorateCertified: drv.interGovernorateCertified
    });
    setIsDriverModalOpen(true);
  };

  const handleSaveDriverForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!driverForm.name.trim()) return;
    const existing = editingDriverId
      ? drivers.find((d) => d.id === editingDriverId)
      : undefined;
    const saved: Driver = {
      id: editingDriverId || `drv-${Date.now()}`,
      name: driverForm.name,
      nameEn: driverForm.nameEn || driverForm.name,
      phone: driverForm.phone,
      avatar: driverForm.avatar,
      licenseNumber: driverForm.licenseNumber,
      rating: existing?.rating || 4.9,
      tripsCount: existing?.tripsCount || 45,
      interGovernorateCertified: driverForm.interGovernorateCertified,
      status: driverForm.status,
      assignedCarName: driverForm.assignedCarName,
      assignedCarPlate: driverForm.assignedCarPlate,
      currentLocation: driverForm.currentLocation,
      earningsThisMonthYer: Number(driverForm.earningsThisMonthYer) || 0,
      earningsThisMonthUsd: Math.round(
        (Number(driverForm.earningsThisMonthYer) || 0) / exchangeRate
      ),
      yearsExperience: Number(driverForm.yearsExperience) || 5
    };
    if (onSaveDriver) onSaveDriver(saved);
    setIsDriverModalOpen(false);
  };

  // 6. Inspections
  const openAddInspection = () => {
    setEditingInspId(null);
    setInspForm({
      bookingId: bookings[0]?.id || 'UNT-7801',
      inspectionType: 'check_in',
      inspectorName: 'م. ريدان الشامي',
      odometerOutKm: 18420,
      odometerInKm: 19120,
      allowedKm: 750,
      extraKmRateYer: 200,
      fuelLevelOut: '100%',
      fuelLevelIn: '100%',
      exteriorCondition: 'agency_intact',
      interiorCondition: 'clean_intact',
      tiresAndSpareOk: true,
      safetyKitAndToolsOk: true,
      damageDeductionYer: 0,
      securityDepositHeldYer: 200000,
      damageNotes: 'المركبة سليمة ومطابقة لحالة الاستلام.'
    });
    setIsInspModalOpen(true);
  };

  const openEditInspection = (rec: VehicleInspectionRecord) => {
    setEditingInspId(rec.id);
    setInspForm({
      bookingId: rec.bookingId,
      inspectionType: rec.inspectionType,
      inspectorName: rec.inspectorName,
      odometerOutKm: rec.odometerOutKm,
      odometerInKm: rec.odometerInKm || rec.odometerOutKm,
      allowedKm: rec.allowedKm,
      extraKmRateYer: 200,
      fuelLevelOut: rec.fuelLevelOut,
      fuelLevelIn: rec.fuelLevelIn || '100%',
      exteriorCondition: rec.exteriorCondition,
      interiorCondition: rec.interiorCondition,
      tiresAndSpareOk: rec.tiresAndSpareOk,
      safetyKitAndToolsOk: rec.safetyKitAndToolsOk,
      damageDeductionYer: rec.damageDeductionYer,
      securityDepositHeldYer: rec.securityDepositHeldYer,
      damageNotes: rec.damageNotes
    });
    setIsInspModalOpen(true);
  };

  const handleSaveInspectionForm = (e: React.FormEvent) => {
    e.preventDefault();
    const targetBooking =
      bookings.find((b) => b.id === inspForm.bookingId) || bookings[0];
    const targetCar =
      cars.find((c) => c.id === targetBooking?.carId) || cars[0];
    const distanceDriven =
      inspForm.inspectionType === 'check_in'
        ? Math.max(0, inspForm.odometerInKm - inspForm.odometerOutKm)
        : 0;
    const extraKm =
      inspForm.inspectionType === 'check_in'
        ? Math.max(0, distanceDriven - inspForm.allowedKm)
        : 0;
    const extraKmFeeYer = extraKm * inspForm.extraKmRateYer;
    const totalDeductions = extraKmFeeYer + Number(inspForm.damageDeductionYer);
    const netRefund = Math.max(
      0,
      Number(inspForm.securityDepositHeldYer) - totalDeductions
    );

    const record: VehicleInspectionRecord = {
      id: editingInspId || `INSP-${Math.floor(510 + Math.random() * 480)}`,
      bookingId: targetBooking?.id || 'UNT-7801',
      carId: targetCar?.id || 'car-1',
      carName: targetCar?.name || 'لكزس LX600 VIP',
      plateNumber: targetCar?.plateNumber || 'صنعاء 1 - 4410',
      customerName: targetBooking?.customerName || 'عميل معتمد',
      inspectionType: inspForm.inspectionType,
      date: new Date().toLocaleString('ar-YE'),
      inspectorName: inspForm.inspectorName,
      odometerOutKm: Number(inspForm.odometerOutKm),
      odometerInKm:
        inspForm.inspectionType === 'check_in'
          ? Number(inspForm.odometerInKm)
          : undefined,
      allowedKm: Number(inspForm.allowedKm),
      extraKm,
      extraKmFeeYer,
      fuelLevelOut: inspForm.fuelLevelOut,
      fuelLevelIn:
        inspForm.inspectionType === 'check_in'
          ? inspForm.fuelLevelIn
          : undefined,
      exteriorCondition: inspForm.exteriorCondition,
      interiorCondition: inspForm.interiorCondition,
      tiresAndSpareOk: inspForm.tiresAndSpareOk,
      safetyKitAndToolsOk: inspForm.safetyKitAndToolsOk,
      damageNotes: inspForm.damageNotes,
      damageDeductionYer: Number(inspForm.damageDeductionYer),
      securityDepositHeldYer: Number(inspForm.securityDepositHeldYer),
      netDepositRefundYer:
        inspForm.inspectionType === 'check_in'
          ? netRefund
          : Number(inspForm.securityDepositHeldYer),
      clearanceStatus:
        inspForm.inspectionType === 'check_out'
          ? 'checked_out_active'
          : totalDeductions > 0
          ? 'deducted_settled'
          : 'cleared_refunded',
      clearanceCertificateNo:
        inspForm.inspectionType === 'check_in'
          ? `CLR-2025-${Math.floor(900 + Math.random() * 99)}`
          : undefined
    };

    if (onSaveInspection) onSaveInspection(record);
    else onAddInspection(record);
    setIsInspModalOpen(false);
  };

  // 7. Maintenance
  const openAddMaint = () => {
    setEditingMaintId(null);
    setMaintForm({
      carId: cars[0]?.id || 'car-1',
      serviceType: 'periodic_oil_filter',
      title: '',
      workshopOrProvider: 'المركز الهندسي للأسطول — صنعاء',
      date: new Date().toISOString().split('T')[0],
      nextDueDate: '2025-09-01',
      odometerKm: 22000,
      nextDueOdometerKm: 27000,
      costYer: 45000,
      status: 'completed',
      notes: ''
    });
    setIsMaintModalOpen(true);
  };

  const openEditMaint = (m: MaintenanceRecord) => {
    setEditingMaintId(m.id);
    setMaintForm({
      carId: m.carId,
      serviceType: m.serviceType,
      title: m.title,
      workshopOrProvider: m.workshopOrProvider,
      date: m.date,
      nextDueDate: m.nextDueDate,
      odometerKm: m.odometerKm,
      nextDueOdometerKm: m.nextDueOdometerKm,
      costYer: m.costYer,
      status: m.status,
      notes: m.notes
    });
    setIsMaintModalOpen(true);
  };

  const handleSaveMaintForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!maintForm.title.trim()) return;
    const selectedCar = cars.find((c) => c.id === maintForm.carId) || cars[0];
    const record: MaintenanceRecord = {
      id: editingMaintId || `MNT-${Math.floor(310 + Math.random() * 680)}`,
      carId: selectedCar.id,
      carName: selectedCar.name,
      plateNumber: selectedCar.plateNumber,
      serviceType: maintForm.serviceType,
      title: maintForm.title,
      workshopOrProvider: maintForm.workshopOrProvider,
      date: maintForm.date,
      nextDueDate: maintForm.nextDueDate,
      odometerKm: Number(maintForm.odometerKm),
      nextDueOdometerKm: Number(maintForm.nextDueOdometerKm),
      costYer: Number(maintForm.costYer),
      costUsd: Math.round(Number(maintForm.costYer) / exchangeRate),
      status: maintForm.status,
      notes: maintForm.notes || 'تم التسجيل في سجل الصيانة.'
    };
    onSaveMaintenance(record);
    setIsMaintModalOpen(false);
  };

  // 8. Accounting Vouchers
  const openAddTx = () => {
    setEditingTxId(null);
    setTxForm({
      type: 'receipt',
      partyName: '',
      amountYer: 95000,
      wallet: 'kuraimi',
      referenceNo: '',
      description: ''
    });
    setIsTxModalOpen(true);
  };

  const openEditTx = (tx: FinancialTransaction) => {
    setEditingTxId(tx.id);
    setTxForm({
      type: tx.type,
      partyName: tx.partyName,
      amountYer: tx.amountYer,
      wallet: tx.wallet,
      referenceNo: tx.referenceNo,
      description: tx.description
    });
    setIsTxModalOpen(true);
  };

  const handleSaveTxForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txForm.partyName.trim()) return;
    if (editingTxId && onSaveTransaction) {
      const existing = transactions.find((t) => t.id === editingTxId);
      onSaveTransaction({
        id: editingTxId,
        date: existing?.date || new Date().toISOString().split('T')[0],
        type: txForm.type,
        partyName: txForm.partyName,
        amountYer: Number(txForm.amountYer),
        amountUsd: Math.round(Number(txForm.amountYer) / exchangeRate),
        wallet: txForm.wallet,
        referenceNo: txForm.referenceNo || 'REF-100',
        description: txForm.description,
        status: 'completed'
      });
    } else {
      onAddTransaction({
        type: txForm.type,
        partyName: txForm.partyName,
        amountYer: Number(txForm.amountYer),
        amountUsd: Math.round(Number(txForm.amountYer) / exchangeRate),
        wallet: txForm.wallet,
        referenceNo:
          txForm.referenceNo ||
          `REF-${Math.floor(100000 + Math.random() * 899999)}`,
        description: txForm.description || 'سند مالي معتمد',
        status: 'completed'
      });
    }
    setIsTxModalOpen(false);
  };

  // =========================================================================
  // FILTERED ARRAYS
  // =========================================================================
  const filteredBookings = bookings.filter((b) => {
    const matchStatus =
      orderStatusFilter === 'all' || b.bookingStatus === orderStatusFilter;
    const matchSearch =
      !orderSearch.trim() ||
      b.customerName.includes(orderSearch) ||
      b.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      b.carName.includes(orderSearch) ||
      (b.organizationName && b.organizationName.includes(orderSearch));
    return matchStatus && matchSearch;
  });

  const filteredRfqs = rfqRequests.filter(
    (r) =>
      !rfqSearch.trim() ||
      r.orgName.includes(rfqSearch) ||
      r.contactPerson.includes(rfqSearch) ||
      r.id.toLowerCase().includes(rfqSearch.toLowerCase())
  );

  const filteredClients = clients.filter((c) => {
    const matchSeg =
      crmSegmentFilter === 'all' || c.clientType === crmSegmentFilter;
    const matchSearch =
      !crmSearch.trim() ||
      c.name.includes(crmSearch) ||
      (c.organizationName && c.organizationName.includes(crmSearch)) ||
      c.phone.includes(crmSearch);
    return matchSeg && matchSearch;
  });

  const filteredCars = cars.filter(
    (c) =>
      !fleetSearch.trim() ||
      c.name.includes(fleetSearch) ||
      c.plateNumber.includes(fleetSearch)
  );

  const filteredDrivers = drivers.filter(
    (d) =>
      !driverSearch.trim() ||
      d.name.includes(driverSearch) ||
      d.phone.includes(driverSearch) ||
      (d.assignedCarName && d.assignedCarName.includes(driverSearch))
  );

  const filteredInspections = inspections.filter(
    (i) =>
      !inspSearch.trim() ||
      i.carName.includes(inspSearch) ||
      i.customerName.includes(inspSearch) ||
      i.bookingId.toLowerCase().includes(inspSearch.toLowerCase())
  );

  const filteredMaintenance = maintenanceRecords.filter(
    (m) =>
      !maintSearch.trim() ||
      m.title.includes(maintSearch) ||
      m.carName.includes(maintSearch) ||
      m.plateNumber.includes(maintSearch)
  );

  const filteredTransactions = transactions.filter((t) => {
    const matchType = txTypeFilter === 'all' || t.type === txTypeFilter;
    const matchSearch =
      !txSearch.trim() ||
      t.partyName.includes(txSearch) ||
      t.description.includes(txSearch) ||
      t.id.toLowerCase().includes(txSearch.toLowerCase());
    return matchType && matchSearch;
  });

  const currentCategory = findCategoryByModule(activeTab);
  const currentModuleItem = findModuleItem(activeTab);

  return (
    <div className="space-y-4 pb-24">
      {/* =====================================================================
          COMPACT CATEGORIZED CONTEXT BREADCRUMB (Synced with Header Menu)
         ===================================================================== */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/95 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-lg">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 font-black">
            {currentCategory.titleAr}
          </span>
          <span className="text-slate-600">←</span>
          <span className="font-black text-white text-sm">
            {currentModuleItem.labelAr}
          </span>
          {currentModuleItem.proposalNumber && (
            <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono text-[10px] font-bold">
              الميزة التطويرية #{currentModuleItem.proposalNumber}
            </span>
          )}
        </div>
        <div className="text-[11px] text-slate-400">
          {currentModuleItem.descAr}
        </div>
      </div>

      {/* =====================================================================
          1. OVERVIEW MODULE (Clean KPIs + Categorized System Directory)
         ===================================================================== */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Top Compact Exchange Rate & Status Bar */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-base sm:text-lg font-black text-white">
                لوحة التحكم المركزية والأنظمة العشرة المتكاملة
              </h1>
              <p className="text-xs text-slate-400">
                منظومة تشغيلية ومالية مصنّفة في 5 قطاعات رئيسية أعلى الهيدر للوصول الفوري لأي قسم
              </p>
            </div>
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs self-start sm:self-auto">
              <span className="text-slate-400">سعر الصرف (1$):</span>
              <input
                type="number"
                value={exchangeRate}
                onChange={(e) =>
                  onExchangeRateChange(Math.max(100, Number(e.target.value) || 535))
                }
                className="w-16 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-amber-400 font-mono font-bold text-center"
              />
              <span className="text-slate-400">ر.ي</span>
            </div>
          </div>

          {/* 4 Compact KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('accounting')}
              className="rounded-2xl border border-slate-800 bg-slate-900/95 p-4 text-right hover:border-amber-500/40 transition"
            >
              <div className="text-[11px] text-slate-400">صافي الخزينة والمحافظ</div>
              <div className="text-lg sm:text-xl font-black text-emerald-400 font-mono tabular-nums mt-1">
                {formatMoney(netTreasuryYer)}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {transactions.length} سند مالي معتمد
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              className="rounded-2xl border border-slate-800 bg-slate-900/95 p-4 text-right hover:border-amber-500/40 transition"
            >
              <div className="text-[11px] text-slate-400">العقود الذكية (QR)</div>
              <div className="text-lg sm:text-xl font-black text-white font-mono tabular-nums mt-1">
                {bookings.length} عقد
              </div>
              <div className="text-[11px] text-amber-400 mt-1">
                إدارة العقود والطلبات ←
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('investors')}
              className="rounded-2xl border border-slate-800 bg-slate-900/95 p-4 text-right hover:border-amber-500/40 transition"
            >
              <div className="text-[11px] text-slate-400">الأسطول والمستثمرون</div>
              <div className="text-lg sm:text-xl font-black text-white font-mono tabular-nums mt-1">
                {cars.length} مركبة · {investorCars.length} مستثمر
              </div>
              <div className="text-[11px] text-sky-400 mt-1">
                تقاسم الأرباح والأسطول ←
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('alerts_radar')}
              className="rounded-2xl border border-slate-800 bg-slate-900/95 p-4 text-right hover:border-amber-500/40 transition"
            >
              <div className="text-[11px] text-slate-400">رادار التنبيهات والمخالفات</div>
              <div className="text-lg sm:text-xl font-black text-amber-400 font-mono tabular-nums mt-1">
                {finesIncidents.length} مخالفة · {maintenanceRecords.length} صيانة
              </div>
              <div className="text-[11px] text-emerald-400 mt-1">
                فتح رادار التنبيهات ←
              </div>
            </button>
          </div>

          {/* CATEGORIZED DIRECTORY OF ALL 5 SECTORS & 10 NEW ENTERPRISE FEATURES */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h2 className="text-sm font-black text-white">
                خريطة أقسام لوحة التحكم المصنّفة (5 تصنيفات رئيسية شاملة الميزات الـ 10)
              </h2>
              <span className="text-[11px] text-amber-400">
                متاحة أيضاً دائماً من القائمة الرئيسية أعلى الهيدر
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {ADMIN_NAVIGATION_CATEGORIES.map((cat, idx) => (
                <div
                  key={cat.id}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 space-y-2.5"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="text-xs font-black text-amber-400">
                      {idx + 1}. {cat.titleAr}
                    </div>
                    <span className="text-[10px] text-slate-500">
                      {cat.items.length} أقسام
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {cat.items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveTab(item.id)}
                        className="w-full p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800/80 text-right transition flex items-center justify-between gap-2 text-xs"
                      >
                        <span className="font-bold text-slate-100 truncate">
                          {item.labelAr}
                        </span>
                        {item.proposalNumber ? (
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 font-mono text-[9px] font-bold shrink-0">
                            ميزة #{item.proposalNumber}
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-500 shrink-0">فتح ←</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders Compact List Preview */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black text-white">
                أحدث عقود وطلبات التأجير
              </h2>
              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className="text-xs font-bold text-amber-400 hover:underline"
              >
                عرض الكل ({bookings.length})
              </button>
            </div>
            <div className="space-y-2">
              {bookings.slice(0, 4).map((b) => {
                const st = getBookingStatusLabel(b.bookingStatus);
                return (
                  <div
                    key={b.id}
                    className="p-3 rounded-xl border border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div className="min-w-0">
                      <div className="font-bold text-white truncate">
                        <span className="font-mono text-amber-400">#{b.id}</span> ·{' '}
                        {b.customerName}
                        {b.organizationName ? ` (${b.organizationName})` : ''}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">
                        {b.carName} · {b.days} أيام ·{' '}
                        <span className="font-mono text-emerald-400">
                          {formatMoney(b.totalAmountYer, b.totalAmountUsd)}
                        </span>{' '}
                        · <span className={st.cls}>{st.text}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => setViewingBooking(b)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-400" />
                        <span>عرض</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => openEditOrder(b)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-sky-400" />
                        <span>تعديل</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          2. ORDERS & CONTRACTS MODULE (Compact List + Remote Negotiation + View/Edit/Delete)
         ===================================================================== */}
      {activeTab === 'orders' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-black text-white">
                الحجوزات عن بُعد، التفاوض السعري، وعقود الإيجار ({filteredBookings.length})
              </h2>
              <p className="text-xs text-slate-400">
                إدارة طلبات الحجز عن بُعد، البت في عروض التفاوض السعري من العملاء، واعتماد العقود وتصاريح الاستلام السريع
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() =>
                  downloadExcelCsv(
                    `سجل_الحجوزات_والعقود_${new Date().toISOString().split('T')[0]}.csv`,
                    ['رقم العقد', 'العميل', 'الهاتف', 'السيارة', 'الأيام', 'الإجمالي ر.ي', 'حالة التفاوض', 'حالة العقد'],
                    filteredBookings.map((b) => [
                      b.id,
                      b.customerName,
                      b.customerPhone,
                      b.carName,
                      b.days,
                      b.totalAmountYer,
                      b.negotiationStatus || 'قياسي',
                      b.bookingStatus
                    ])
                  )
                }
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-400 font-bold text-xs flex items-center gap-1.5"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>تصدير Excel</span>
              </button>
              <button
                type="button"
                onClick={openAddOrder}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>إصدار عقد جديد</span>
              </button>
            </div>
          </div>

          {/* Compact Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                placeholder="بحث برقم العقد، اسم العميل، المنظمة، أو السيارة..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-xs text-white"
              />
            </div>
            <select
              value={orderStatusFilter}
              onChange={(e) => setOrderStatusFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-400 font-bold"
            >
              <option value="all">جميع الحالات ({bookings.length})</option>
              <option value="pending_approval">بانتظار الاعتماد / التفاوض</option>
              <option value="confirmed">عقد معتمد وجاهز للاستلام</option>
              <option value="in_progress">المركبة مع العميل</option>
              <option value="completed">مكتمل</option>
              <option value="cancelled">ملغي</option>
            </select>
          </div>

          {/* Compact Rows List */}
          <div className="space-y-2">
            {filteredBookings.map((b) => {
              const st = getBookingStatusLabel(b.bookingStatus);
              return (
                <div
                  key={b.id}
                  className="p-3 rounded-xl border border-slate-800 bg-slate-950 hover:border-slate-700 transition space-y-2 text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-mono font-black text-amber-400">
                          #{b.id}
                        </span>
                        {b.remotePickupCode && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-mono text-[10px] font-bold">
                            {b.remotePickupCode}
                          </span>
                        )}
                        <span className="text-slate-600">·</span>
                        <span className="font-bold text-white">{b.customerName}</span>
                        {b.organizationName && (
                          <span className="text-slate-400">
                            ({b.organizationName})
                          </span>
                        )}
                        <span className="text-slate-600">·</span>
                        <span className={`font-bold ${st.cls}`}>{st.text}</span>
                        {b.isNegotiated && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[10px] font-bold">
                            🤝 تفاوض سعري عن بُعد
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {b.carName} · {b.days} أيام ({b.startDate}) ·{' '}
                        {b.withDriver ? 'مع سائق' : 'بدون سائق'} · الإجمالي:{' '}
                        <span className="font-mono font-bold text-emerald-400">
                          {formatMoney(b.totalAmountYer, b.totalAmountUsd)}
                        </span>
                        {b.standardTotalYer && b.standardTotalYer > b.totalAmountYer && (
                          <span className="mr-1.5 text-[10px] text-slate-500 line-through">
                            (القياسي: {b.standardTotalYer.toLocaleString()} ر.ي)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Unified Action Buttons: View | Print | Edit | Delete */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => setViewingBooking(b)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold flex items-center gap-1"
                        title="عرض التفاصيل والوثائق والتفاوض"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-400" />
                        <span>عرض</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPrintingContract(b)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                        title="طباعة العقد الرسمي"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setAdminConciergeBooking(b)}
                        className="p-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30"
                        title="كونسيرج وقوالب واتساب الذكية"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => openEditOrder(b)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold flex items-center gap-1"
                        title="تعديل الطلب"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-sky-400" />
                        <span>تعديل</span>
                      </button>
                      {onDeleteBooking && (
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteTarget({
                            title: `العقد #${b.id} (${b.customerName})`,
                            onConfirm: () => onDeleteBooking(b.id)
                          })
                        }
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white transition"
                        title="حذف الطلب"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      )}
                    </div>
                  </div>

                  {/* Inline Remote Price Negotiation Quick Approval Bar */}
                  {b.isNegotiated && b.negotiationStatus === 'pending_review' && (
                    <div className="pt-2 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-2 text-[11px] bg-amber-500/5 px-2.5 py-1.5 rounded-lg">
                      <div className="text-amber-200">
                        <span className="font-bold text-amber-400">عرض العميل عن بُعد: </span>
                        <span className="font-mono font-black text-emerald-400">
                          {(b.proposedTotalYer || b.totalAmountYer).toLocaleString()} ر.ي
                        </span>
                        {b.standardTotalYer && (
                          <span className="text-slate-400 mr-1.5">
                            (بدلاً من {b.standardTotalYer.toLocaleString()} ر.ي)
                          </span>
                        )}
                        {b.negotiationNote && (
                          <span className="text-slate-300 mr-2">· "{b.negotiationNote}"</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            onSaveBooking &&
                            onSaveBooking({
                              ...b,
                              negotiationStatus: 'approved',
                              totalAmountYer: b.proposedTotalYer || b.totalAmountYer,
                              totalAmountUsd: Math.round(
                                (b.proposedTotalYer || b.totalAmountYer) / exchangeRate
                              ),
                              bookingStatus: 'confirmed'
                            })
                          }
                          className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black transition"
                        >
                          ✓ قبول العرض وتثبيت العقد
                        </button>
                        <button
                          type="button"
                          onClick={() => setViewingBooking(b)}
                          className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold transition"
                        >
                          إرسال عرض مضاد
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =====================================================================
          3. ORGANIZATION TENDERS & RFQs MODULE (Separated from Drivers!)
         ===================================================================== */}
      {activeTab === 'rfq' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-black text-white">
                مناقصات وعروض أسعار المنظمات والشركات ({filteredRfqs.length})
              </h2>
              <p className="text-xs text-slate-400">
                قسم مستقل لإدارة طلبات التأجير التشغيلي طويل الأمد (LTA) للمنظمات الدولية والشركات
              </p>
            </div>
            <button
              type="button"
              onClick={openAddRfq}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة مناقصة / طلب عرض سعر</span>
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={rfqSearch}
              onChange={(e) => setRfqSearch(e.target.value)}
              placeholder="بحث باسم المنظمة، الشركة، أو المسؤول..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-xs text-white"
            />
          </div>

          <div className="space-y-2">
            {filteredRfqs.map((rfq) => (
              <div
                key={rfq.id}
                className="p-3 rounded-xl border border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-mono font-black text-amber-400">
                      #{rfq.id}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="font-bold text-white">{rfq.orgName}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-sky-400">
                      {getSegmentLabel(rfq.orgType)}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    المطلوب: {rfq.vehiclesCount} مركبات ({rfq.vehicleCategory}) لمدة{' '}
                    {rfq.durationMonths} أشهر · المسؤول: {rfq.contactPerson} ·{' '}
                    <span className="text-emerald-400 font-bold">
                      {rfq.status === 'new'
                        ? 'طلب جديد'
                        : rfq.status === 'quoted'
                        ? 'تم إرسال العرض المالي'
                        : 'تمت الترسية والتعاقد'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setViewingRfq(rfq)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>عرض</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openEditRfq(rfq)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-sky-400" />
                    <span>تعديل</span>
                  </button>
                  {onDeleteRfq && (
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteTarget({
                          title: `مناقصة ${rfq.orgName} (#${rfq.id})`,
                          onConfirm: () => onDeleteRfq(rfq.id)
                        })
                      }
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* PROPOSAL 7: B2B MONTHLY CONSOLIDATED INVOICING & UN/NGO LPOs */}
          <B2BInvoicesSubPanel
            invoices={b2bInvoices}
            formatMoney={formatMoney}
            onMarkPaid={handleMarkB2BInvoicePaid}
          />
        </div>
      )}

      {/* =====================================================================
          4. CLIENTS & GUARANTEES CRM MODULE (Compact List + View/Edit/Delete)
         ===================================================================== */}
      {activeTab === 'crm' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-black text-white">
                ملفات العملاء، المنظمات، والضمانات ({filteredClients.length})
              </h2>
              <p className="text-xs text-slate-400">
                قائمة مدمجة لملفات العملاء والكفالات التجارية مع إمكانية العرض والتعديل والحذف
              </p>
            </div>
            <button
              type="button"
              onClick={openAddClient}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة ملف عميل</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={crmSearch}
                onChange={(e) => setCrmSearch(e.target.value)}
                placeholder="بحث باسم العميل، المنظمة، أو رقم الهاتف..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-xs text-white"
              />
            </div>
            <select
              value={crmSegmentFilter}
              onChange={(e) => setCrmSegmentFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-400 font-bold"
            >
              <option value="all">كل الفئات ({clients.length})</option>
              <option value="un_ngo">منظمات دولية</option>
              <option value="corporate">شركات ومؤسسات</option>
              <option value="vip">كبار الشخصيات VIP</option>
              <option value="individual">أفراد</option>
            </select>
          </div>

          <div className="space-y-2">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="p-3 rounded-xl border border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-mono font-black text-amber-400">
                      #{client.id}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="font-bold text-white">{client.name}</span>
                    {client.organizationName && (
                      <span className="text-slate-400">
                        ({client.organizationName})
                      </span>
                    )}
                    <span className="text-slate-600">·</span>
                    <span
                      className={
                        client.verificationStatus === 'verified'
                          ? 'text-emerald-400 font-bold'
                          : client.verificationStatus === 'blacklisted'
                          ? 'text-rose-400 font-bold'
                          : 'text-amber-400 font-bold'
                      }
                    >
                      {client.verificationStatus === 'verified'
                        ? 'موثق (ائتمان A+)'
                        : client.verificationStatus === 'blacklisted'
                        ? 'مدرج في القائمة السوداء'
                        : 'قيد الفحص الائتماني'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {getSegmentLabel(client.clientType)} · هاتف:{' '}
                    <span className="font-mono">{client.phone}</span> · الضامن:{' '}
                    {client.guarantorName} · سقف الائتمان:{' '}
                    <span className="font-mono text-amber-400">
                      ${client.creditLimitUsd.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateClientStatus(
                        client.id,
                        client.verificationStatus === 'blacklisted'
                          ? 'verified'
                          : 'blacklisted'
                      )
                    }
                    className={`px-2 py-1.5 rounded-lg text-[10px] font-bold transition ${
                      client.verificationStatus === 'blacklisted'
                        ? 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950'
                        : 'bg-rose-500/10 text-rose-400 hover:bg-rose-600 hover:text-white'
                    }`}
                    title="تبديل حالة القائمة السوداء"
                  >
                    {client.verificationStatus === 'blacklisted'
                      ? 'رفع الحظر'
                      : 'حظر'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewingClient(client)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>عرض</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openEditClient(client)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-sky-400" />
                    <span>تعديل</span>
                  </button>
                  {onDeleteClient && (
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteTarget({
                          title: `ملف العميل ${client.name}`,
                          onConfirm: () => onDeleteClient(client.id)
                        })
                      }
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          5. FLEET & PRICING MODULE (Compact List + View/Edit/Delete)
         ===================================================================== */}
      {activeTab === 'fleet' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-black text-white">
                قائمة أسطول السيارات والتسعير ({filteredCars.length})
              </h2>
              <p className="text-xs text-slate-400">
                إدارة المركبات، الأسعار اليومية والشهرية، حالة التوفر، وصفحة الهبوط الخاصة بكل سيارة
              </p>
            </div>
            <button
              type="button"
              onClick={openAddCar}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة سيارة جديدة</span>
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={fleetSearch}
              onChange={(e) => setFleetSearch(e.target.value)}
              placeholder="بحث باسم السيارة أو رقم اللوحة..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-xs text-white"
            />
          </div>

          <div className="space-y-2">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className="p-3 rounded-xl border border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={car.image}
                    alt={car.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-10 rounded-lg object-cover border border-slate-800 shrink-0"
                  />
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-bold text-white truncate">
                        {car.name}
                      </span>
                      <span className="text-slate-600">·</span>
                      <span className="font-mono text-amber-400">
                        {car.plateNumber}
                      </span>
                      <span className="text-slate-600">·</span>
                      <button
                        type="button"
                        onClick={() => onToggleCarAvailability(car.id)}
                        className={`font-bold underline ${
                          car.available ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {car.available ? 'متاحة للحجز' : 'مؤجرة / صيانة'}
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      موديل {car.modelYear} · اليومي:{' '}
                      <span className="font-mono font-bold text-amber-400">
                        {formatMoney(car.pricePerDayYer, car.pricePerDayUsd)}
                      </span>{' '}
                      · الشهري:{' '}
                      <span className="font-mono text-slate-200">
                        {formatMoney(
                          car.pricePerMonthYer || car.pricePerDayYer * 24,
                          car.pricePerMonthUsd
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => onPreviewCarLanding(car)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>عرض</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openEditCar(car)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-sky-400" />
                    <span>تعديل</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setDeleteTarget({
                        title: `المركبة ${car.name} (${car.plateNumber})`,
                        onConfirm: () => onDeleteCar(car.id)
                      })
                    }
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          6. DRIVERS & CHAUFFEURS MODULE (Dedicated Independent Module!)
         ===================================================================== */}
      {activeTab === 'drivers' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-black text-white">
                قائمة السائقين والكباتن المعتمدين ({filteredDrivers.length})
              </h2>
              <p className="text-xs text-slate-400">
                قسم مستقل لإدارة بيانات السائقين، رخص القيادة، المركبات المعهودة إليهم، وحالة التوفر
              </p>
            </div>
            <button
              type="button"
              onClick={openAddDriver}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة سائق / كابتن</span>
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={driverSearch}
              onChange={(e) => setDriverSearch(e.target.value)}
              placeholder="بحث باسم الكابتن، رقم الهاتف، أو المركبة المخصصة..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-xs text-white"
            />
          </div>

          <div className="space-y-2">
            {filteredDrivers.map((drv) => (
              <div
                key={drv.id}
                className="p-3 rounded-xl border border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={drv.avatar}
                    alt={drv.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-xl object-cover border border-slate-800 shrink-0"
                  />
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-bold text-white">{drv.name}</span>
                      <span className="text-slate-600">·</span>
                      <span className="font-mono text-amber-400">{drv.phone}</span>
                      <span className="text-slate-600">·</span>
                      <span
                        className={`font-bold ${
                          drv.status === 'available'
                            ? 'text-emerald-400'
                            : drv.status === 'on_trip'
                            ? 'text-sky-400'
                            : 'text-slate-400'
                        }`}
                      >
                        {drv.status === 'available'
                          ? 'متاح'
                          : drv.status === 'on_trip'
                          ? 'في مهمة'
                          : 'خارج الدوام'}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      المركبة: {drv.assignedCarName || 'غير محدد'} (
                      {drv.assignedCarPlate || '-'}) · مستحقات الشهر:{' '}
                      <span className="font-mono text-emerald-400 font-bold">
                        {formatMoney(
                          drv.earningsThisMonthYer,
                          drv.earningsThisMonthUsd
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setViewingDriver(drv)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>عرض</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openEditDriver(drv)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-sky-400" />
                    <span>تعديل</span>
                  </button>
                  {onDeleteDriver && (
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteTarget({
                          title: `الكابتن ${drv.name}`,
                          onConfirm: () => onDeleteDriver(drv.id)
                        })
                      }
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          7. VEHICLE HANDOVER, INSPECTION & CLEARANCE MODULE (Compact List)
         ===================================================================== */}
      {activeTab === 'handover' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-black text-white">
                محاضر فحص المركبات وشهادات إخلاء الطرف ({filteredInspections.length})
              </h2>
              <p className="text-xs text-slate-400">
                قائمة مدمجة لمحاضر التسليم والاستلام وتصفية مبالغ التأمين والعداد
              </p>
            </div>
            <button
              type="button"
              onClick={openAddInspection}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>إصدار محضر فحص جديد</span>
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={inspSearch}
              onChange={(e) => setInspSearch(e.target.value)}
              placeholder="بحث برقم العقد، اسم العميل، أو المركبة..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-xs text-white"
            />
          </div>

          <div className="space-y-2">
            {filteredInspections.map((rec) => (
              <div
                key={rec.id}
                className="p-3 rounded-xl border border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-mono font-black text-amber-400">
                      #{rec.id}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="font-bold text-white">{rec.carName}</span>
                    <span className="text-slate-400">({rec.plateNumber})</span>
                    <span className="text-slate-600">·</span>
                    <span
                      className={
                        rec.inspectionType === 'check_in'
                          ? 'text-emerald-400 font-bold'
                          : 'text-sky-400 font-bold'
                      }
                    >
                      {rec.inspectionType === 'check_in'
                        ? 'فحص عودة وإخلاء طرف'
                        : 'تسليم خروج'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    العميل: {rec.customerName} (عقد #{rec.bookingId}) · عداد:{' '}
                    <span className="font-mono">{rec.odometerOutKm}</span>
                    {rec.odometerInKm ? ` ← ${rec.odometerInKm} كم` : ' كم'} · صافي
                    التأمين المسترد:{' '}
                    <span className="font-mono font-bold text-emerald-400">
                      {formatMoney(rec.netDepositRefundYer)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setViewingInspection(rec)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>عرض / طباعة</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openEditInspection(rec)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-sky-400" />
                    <span>تعديل</span>
                  </button>
                  {onDeleteInspection && (
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteTarget({
                          title: `محضر الفحص #${rec.id} (${rec.carName})`,
                          onConfirm: () => onDeleteInspection(rec.id)
                        })
                      }
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          8. MAINTENANCE, INSURANCE & PERMITS MODULE (Compact List)
         ===================================================================== */}
      {activeTab === 'maintenance' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-black text-white">
                سجل الصيانة الدورية والتأمين الشامل ({filteredMaintenance.length})
              </h2>
              <p className="text-xs text-slate-400">
                متابعة الزيوت، الإطارات، وثائق التأمين، وتراخيص المرور للمركبات
              </p>
            </div>
            <button
              type="button"
              onClick={openAddMaint}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة سجل صيانة</span>
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={maintSearch}
              onChange={(e) => setMaintSearch(e.target.value)}
              placeholder="بحث باسم المركبة، رقم اللوحة، أو نوع الصيانة..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-xs text-white"
            />
          </div>

          <div className="space-y-2">
            {filteredMaintenance.map((m) => (
              <div
                key={m.id}
                className="p-3 rounded-xl border border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-mono font-black text-amber-400">
                      #{m.id}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="font-bold text-white">{m.title}</span>
                    <span className="text-slate-600">·</span>
                    <span
                      className={
                        m.status === 'completed'
                          ? 'text-emerald-400 font-bold'
                          : m.status === 'in_service'
                          ? 'text-rose-400 font-bold'
                          : 'text-amber-400 font-bold'
                      }
                    >
                      {m.status === 'completed'
                        ? 'مكتملة'
                        : m.status === 'in_service'
                        ? 'في الورشة'
                        : 'مجدولة'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {m.carName} ({m.plateNumber}) · {m.workshopOrProvider} · التكلفة:{' '}
                    <span className="font-mono font-bold text-rose-400">
                      {formatMoney(m.costYer, m.costUsd)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setViewingMaint(m)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>عرض</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openEditMaint(m)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-sky-400" />
                    <span>تعديل</span>
                  </button>
                  {onDeleteMaintenance && (
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteTarget({
                          title: `سجل الصيانة #${m.id} (${m.title})`,
                          onConfirm: () => onDeleteMaintenance(m.id)
                        })
                      }
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          9. ACCOUNTING & YEMENI E-WALLETS MODULE (Compact List)
         ===================================================================== */}
      {activeTab === 'accounting' && (
        <div className="space-y-4">
          {/* Compact Horizontal Scrollable Wallets Strip */}
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
            {YEMENI_WALLETS.map((w) => {
              const bal = transactions
                .filter((t) => t.wallet === w.id)
                .reduce(
                  (acc, t) =>
                    t.type === 'receipt' ? acc + t.amountYer : acc - t.amountYer,
                  0
                );
              return (
                <div
                  key={w.id}
                  className="p-3 rounded-2xl border border-slate-800 bg-slate-900/95 min-w-[180px] shrink-0"
                >
                  <div className="text-xs font-bold text-white truncate">
                    {w.name}
                  </div>
                  <div className="text-sm font-black text-emerald-400 font-mono tabular-nums mt-1">
                    {formatMoney(bal)}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-4 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-black text-white">
                  حركة السندات المالية والخزينة ({filteredTransactions.length})
                </h2>
                <p className="text-xs text-slate-400">
                  سندات القبض، رد التأمين، صرف مستحقات الكباتن، ومصروفات الصيانة
                </p>
              </div>
              <button
                type="button"
                onClick={openAddTx}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>إصدار سند مالي</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={txSearch}
                  onChange={(e) => setTxSearch(e.target.value)}
                  placeholder="بحث برقم السند، اسم الجهة، أو البيان..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-xs text-white"
                />
              </div>
              <select
                value={txTypeFilter}
                onChange={(e) => setTxTypeFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-400 font-bold"
              >
                <option value="all">كل القيود ({transactions.length})</option>
                <option value="receipt">سندات القبض</option>
                <option value="refund">رد التأمين</option>
                <option value="driver_payout">مستحقات الكباتن</option>
                <option value="expense">مصروفات الصيانة</option>
              </select>
            </div>

            <div className="space-y-2">
              {filteredTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="p-3 rounded-xl border border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-mono font-black text-amber-400">
                        #{tx.id}
                      </span>
                      <span className="text-slate-600">·</span>
                      <span className="font-bold text-white">{tx.partyName}</span>
                      <span className="text-slate-600">·</span>
                      <span
                        className={`font-bold ${
                          tx.type === 'receipt'
                            ? 'text-emerald-400'
                            : 'text-rose-400'
                        }`}
                      >
                        {tx.type === 'receipt' ? '+' : '-'}
                        {formatMoney(tx.amountYer, tx.amountUsd)}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {tx.description} · {tx.wallet.toUpperCase()} (
                      {tx.referenceNo}) · {tx.date}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setViewingTx(tx)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>عرض</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditTx(tx)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-sky-400" />
                      <span>تعديل</span>
                    </button>
                    {onDeleteTransaction && (
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteTarget({
                            title: `السند المالي #${tx.id} (${tx.partyName})`,
                            onConfirm: () => onDeleteTransaction(tx.id)
                          })
                        }
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          10A. UNIFIED AGENCY BRAND & WHITE-LABEL STUDIO (Single-Screen Identity)
         ===================================================================== */}
      {activeTab === 'agency_identity' && (
        <AgencyBrandStudio
          cms={cmsConfig}
          onUpdateCms={onUpdateCmsConfig}
          onResetDefaultCms={onResetCmsConfig}
          themeMode={themeMode}
          onToggleThemeMode={(m) => onToggleThemeMode && onToggleThemeMode(m)}
          onPreviewLiveLanding={() => onPreviewLiveLanding && onPreviewLiveLanding()}
          cars={cars}
          bookings={bookings}
          transactions={transactions}
          investors={investorCars}
        />
      )}

      {/* =====================================================================
          10B. CMS STUDIO MODULE
         ===================================================================== */}
      {activeTab === 'cms' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-black text-amber-400 flex items-center gap-1.5">
                <Palette className="w-4 h-4" />
                <span>تبحث عن التخصيص السريع لهوية المكتب في شاشة واحدة؟</span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                يمكنك تعديل الشعار، الاسم، السلوجون، الاستايل اللوني، الهاتف، والواتساب في لوحة واحدة مجمّعة.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('agency_identity')}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shrink-0 transition"
            >
              فتح لوحة هوية المكتب الموحدة
            </button>
          </div>
          <HomepageCmsManager
            cms={cmsConfig}
            onUpdateCms={onUpdateCmsConfig}
            onResetDefaultCms={onResetCmsConfig}
            onPreviewLive={() => onPreviewLiveLanding && onPreviewLiveLanding()}
          />
        </div>
      )}

      {/* =====================================================================
          11. NEW ENTERPRISE MODULES (Proposals 3, 4, 5, 6, 9, 10)
         ===================================================================== */}
      {activeTab === 'roi_analytics' && (
        <RoiAnalyticsModule
          cars={cars}
          bookings={bookings}
          maintenanceRecords={maintenanceRecords}
          fines={finesIncidents}
          formatMoney={formatMoney}
          onSelectCarEdit={(car) => {
            openEditCar(car);
          }}
        />
      )}

      {activeTab === 'alerts_radar' && (
        <AlertsRadarModule
          cars={cars}
          bookings={bookings}
          maintenanceRecords={maintenanceRecords}
          clients={clients}
          onNavigateModule={(mod) => setActiveTab(mod)}
        />
      )}

      {activeTab === 'fleet_timeline' && (
        <FleetTimelineModule
          cars={cars}
          bookings={bookings}
          onExtendBookingDays={handleExtendBookingDays}
          onQuickBookCar={(car) => {
            setEditingBookingId(null);
            setOrderForm((prev) => ({ ...prev, carId: car.id }));
            setIsOrderModalOpen(true);
          }}
        />
      )}

      {activeTab === 'dynamic_pricing' && (
        <DynamicPricingModule
          rules={pricingRules}
          onSaveRule={handleSavePricingRule}
          onDeleteRule={handleDeletePricingRule}
          onToggleRule={handleTogglePricingRule}
        />
      )}

      {activeTab === 'investors' && (
        <InvestorsModule
          investors={investorCars}
          cars={cars}
          formatMoney={formatMoney}
          onSaveInvestor={handleSaveInvestor}
          onDeleteInvestor={handleDeleteInvestor}
          onSettleInvestorPayout={handleSettleInvestorPayout}
        />
      )}

      {activeTab === 'fines_incidents' && (
        <FinesIncidentsModule
          fines={finesIncidents}
          cars={cars}
          bookings={bookings}
          exchangeRate={exchangeRate}
          formatMoney={formatMoney}
          onSaveFine={handleSaveFine}
          onDeleteFine={handleDeleteFine}
        />
      )}

      {activeTab === 'whatsapp_hub' && (
        <WhatsAppHubModule
          bookings={bookings}
          drivers={drivers}
          formatMoney={formatMoney}
        />
      )}

      {/* =====================================================================
          MODALS FOR VIEW, EDIT, ADD, PRINT & DELETE CONFIRMATION
         ===================================================================== */}

      {/* UNIVERSAL DELETE CONFIRMATION MODAL */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-5 space-y-4 text-center shadow-2xl"
          >
            <div className="w-11 h-11 rounded-full bg-rose-500/15 text-rose-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-black text-white">تأكيد الحذف</h3>
              <p className="text-xs text-slate-400">
                هل أنت متأكد من حذف: <strong className="text-white">{deleteTarget.title}</strong>؟
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  deleteTarget.onConfirm();
                  setDeleteTarget(null);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs"
              >
                نعم، احذف الآن
              </button>
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW BOOKING & KYC MODAL */}
      {viewingBooking && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setViewingBooking(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="font-mono text-amber-400 font-bold">
                  عقد إيجار #{viewingBooking.id}
                </span>
                <h3 className="text-base font-black text-white mt-0.5">
                  {viewingBooking.customerName} — {viewingBooking.carName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setViewingBooking(null)}
                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div>الهاتف: {viewingBooking.customerPhone}</div>
              <div>الهوية / الجواز: {viewingBooking.customerIdNumber}</div>
              <div>نقطة التسليم: {viewingBooking.pickupLocation}</div>
              <div>الوجهة: {viewingBooking.destination}</div>
              <div>المدة: {viewingBooking.days} أيام</div>
              <div>
                الإجمالي:{' '}
                <strong className="text-emerald-400 font-mono">
                  {formatMoney(
                    viewingBooking.totalAmountYer,
                    viewingBooking.totalAmountUsd
                  )}
                </strong>
              </div>
              <div className="sm:col-span-2">
                الضمانة: {viewingBooking.guaranteeDetails}
              </div>
            </div>

            {/* Quick Status & Chauffeur Controls inside View Modal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">تحديث حالة العقد:</label>
                <select
                  value={viewingBooking.bookingStatus}
                  onChange={(e) => {
                    const st = e.target.value as Booking['bookingStatus'];
                    onUpdateBookingStatus(viewingBooking.id, st);
                    setViewingBooking({ ...viewingBooking, bookingStatus: st });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-amber-400 font-bold"
                >
                  <option value="pending_approval">بانتظار الاعتماد</option>
                  <option value="confirmed">عقد معتمد</option>
                  <option value="driver_en_route">جاري توصيل المركبة</option>
                  <option value="in_progress">المركبة مع العميل</option>
                  <option value="completed">مكتمل ومخلى الطرف</option>
                  <option value="cancelled">ملغي</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">تعيين كابتن للرحلة:</label>
                <select
                  value={viewingBooking.driverId || ''}
                  onChange={(e) => {
                    onAssignDriver(viewingBooking.id, e.target.value);
                    setViewingBooking({
                      ...viewingBooking,
                      driverId: e.target.value
                    });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                >
                  <option value="">بدون سائق (قيادة ذاتية)</option>
                  {drivers.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.phone})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* KYC Documents Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-[10px] text-slate-400 mb-1">الهوية</div>
                <img
                  src={viewingBooking.idDocumentUrl || SAMPLE_ID_DOC_SVG}
                  alt="ID"
                  className="w-full h-24 object-contain rounded bg-slate-900"
                />
              </div>
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-[10px] text-slate-400 mb-1">الرخصة</div>
                <img
                  src={viewingBooking.licenseDocumentUrl || SAMPLE_LICENSE_DOC_SVG}
                  alt="License"
                  className="w-full h-24 object-contain rounded bg-slate-900"
                />
              </div>
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-[10px] text-slate-400 mb-1">وثيقة الضمان</div>
                <img
                  src={
                    viewingBooking.guaranteeDocumentUrl || SAMPLE_GUARANTEE_DOC_SVG
                  }
                  alt="Guarantee"
                  className="w-full h-24 object-contain rounded bg-slate-900"
                />
              </div>
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-[10px] text-slate-400 mb-1">إشعار السداد</div>
                <img
                  src={viewingBooking.paymentReceiptUrl || SAMPLE_RECEIPT_DOC_SVG}
                  alt="Receipt"
                  className="w-full h-24 object-contain rounded bg-slate-900"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
              <div className="flex items-center gap-2">
                {viewingBooking.guaranteeStatus !== 'approved' && (
                  <button
                    type="button"
                    onClick={() => {
                      onVerifyGuarantee(viewingBooking.id);
                      setViewingBooking({
                        ...viewingBooking,
                        guaranteeStatus: 'approved',
                        bookingStatus: 'confirmed'
                      });
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-black"
                  >
                    اعتماد الضمان وتأكيد العقد
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    const target = viewingBooking;
                    setViewingBooking(null);
                    setPrintingContract(target);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>معاينة وطباعة العقد A4</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => setViewingBooking(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT ORDER MODAL */}
      {isOrderModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsOrderModalOpen(false)}
        >
          <form
            onSubmit={handleSaveOrderForm}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white">
                {editingBookingId
                  ? `تعديل بيانات العقد #${editingBookingId}`
                  : 'إصدار عقد إيجار جديد'}
              </h3>
              <button
                type="button"
                onClick={() => setIsOrderModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 max-h-[75vh] overflow-y-auto px-1">
              {/* Tab 1: Customer & Legal Guarantee */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs font-black text-amber-400 flex items-center gap-1.5 border-b border-slate-800 pb-2">
                  <UserCheck className="w-4 h-4" />
                  <span>1. بيانات المستأجر وإثبات الهوية والكفالة القانونية:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-slate-400 mb-1">فئة العميل:</label>
                    <select
                      value={orderForm.clientCategory}
                      onChange={(e) =>
                        setOrderForm({
                          ...orderForm,
                          clientCategory: e.target.value as
                            | 'individual'
                            | 'corporate'
                            | 'un_ngo'
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-amber-400 font-bold"
                    >
                      <option value="corporate">شركة / قطاع أعمال</option>
                      <option value="un_ngo">منظمة دولية (UN / INGO)</option>
                      <option value="individual">أفراد</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">اسم المستأجر الكامل:</label>
                    <input
                      type="text"
                      required
                      value={orderForm.customerName}
                      onChange={(e) =>
                        setOrderForm({ ...orderForm, customerName: e.target.value })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white"
                      placeholder="مثال: المهندس / هشام المتوكل"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">الجهة / المنظمة (اختياري):</label>
                    <input
                      type="text"
                      value={orderForm.organizationName}
                      onChange={(e) =>
                        setOrderForm({
                          ...orderForm,
                          organizationName: e.target.value
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white"
                      placeholder="مثال: برنامج الغذاء العالمي / بنك اليمن"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">رقم هاتف المستأجر:</label>
                    <input
                      type="text"
                      required
                      value={orderForm.customerPhone}
                      onChange={(e) =>
                        setOrderForm({ ...orderForm, customerPhone: e.target.value })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white font-mono"
                      placeholder="+967 77..."
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">نوع إثبات الهوية:</label>
                    <select
                      value={orderForm.idDocumentType}
                      onChange={(e) =>
                        setOrderForm({
                          ...orderForm,
                          idDocumentType: e.target.value as
                            | 'national_id'
                            | 'passport'
                            | 'commercial_record'
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white"
                    >
                      <option value="national_id">بطاقة شخصية ذكية</option>
                      <option value="passport">جواز سفر رسمي ساري</option>
                      <option value="commercial_record">سجل تجاري / كفالة مؤسسية</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">رقم الهوية / الجواز:</label>
                    <input
                      type="text"
                      value={orderForm.customerIdNumber}
                      onChange={(e) =>
                        setOrderForm({
                          ...orderForm,
                          customerIdNumber: e.target.value
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white font-mono"
                      placeholder="01010099881"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">رقم رخصة القيادة:</label>
                    <input
                      type="text"
                      value={orderForm.customerLicenseNumber}
                      onChange={(e) =>
                        setOrderForm({
                          ...orderForm,
                          customerLicenseNumber: e.target.value
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white font-mono"
                      placeholder="SAN-2024-881"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">الضمانة والكفيل التجاري:</label>
                    <input
                      type="text"
                      value={orderForm.guaranteeDetails}
                      onChange={(e) =>
                        setOrderForm({
                          ...orderForm,
                          guaranteeDetails: e.target.value
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white"
                      placeholder="كفالة تجارية معتمدة / شركة المتوكل"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">هاتف الكفيل / الضامن:</label>
                    <input
                      type="text"
                      value={orderForm.guarantorPhone}
                      onChange={(e) =>
                        setOrderForm({
                          ...orderForm,
                          guarantorPhone: e.target.value
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white font-mono"
                      placeholder="+967 77..."
                    />
                  </div>
                </div>
              </div>

              {/* Tab 2: Vehicle & Operational Specs */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs font-black text-sky-400 flex items-center gap-1.5 border-b border-slate-800 pb-2">
                  <CarIcon className="w-4 h-4" />
                  <span>2. بيانات المركبة وشروط التشغيل والوقود والتأمين:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-slate-400 mb-1">المركبة المطلوبة:</label>
                    <select
                      value={orderForm.carId}
                      onChange={(e) =>
                        setOrderForm({ ...orderForm, carId: e.target.value })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white font-bold"
                    >
                      {cars.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.plateNumber}) — {formatMoney(c.pricePerDayYer)}/يوم
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">عدد أيام الإيجار:</label>
                    <input
                      type="number"
                      min={1}
                      value={orderForm.days}
                      onChange={(e) =>
                        setOrderForm({
                          ...orderForm,
                          days: Math.max(1, Number(e.target.value) || 1)
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-amber-400 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">نوع التغطية التأمينية:</label>
                    <select
                      value={orderForm.insuranceCoverage}
                      onChange={(e) =>
                        setOrderForm({
                          ...orderForm,
                          insuranceCoverage: e.target.value as
                            | 'comprehensive'
                            | 'third_party'
                            | 'vip_shield'
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-emerald-400 font-bold"
                    >
                      <option value="comprehensive">تأمين شامل ضد الحوادث</option>
                      <option value="vip_shield">درع VIP شامل مع مركبة بديلة</option>
                      <option value="third_party">تأمين ضد الغير وإلزام المرور</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">الكيلومترات اليومية المسموحة:</label>
                    <select
                      value={orderForm.dailyKmAllowance}
                      onChange={(e) =>
                        setOrderForm({
                          ...orderForm,
                          dailyKmAllowance: Number(e.target.value)
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white font-mono"
                    >
                      <option value={200}>200 كم/يوم (معتاد)</option>
                      <option value={300}>300 كم/يوم (سفر)</option>
                      <option value={0}>مفتوح غير محدود</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">مستوى الوقود عند التسليم:</label>
                    <select
                      value={orderForm.fuelLevelOut}
                      onChange={(e) =>
                        setOrderForm({
                          ...orderForm,
                          fuelLevelOut: e.target.value as
                            | 'full'
                            | 'three_quarters'
                            | 'half'
                            | 'quarter'
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white"
                    >
                      <option value="full">فل كامل (8/8)</option>
                      <option value="three_quarters">ثلاثة أرباع الخزان (3/4)</option>
                      <option value="half">نصف الخزان (1/2)</option>
                      <option value="quarter">ربع الخزان (1/4)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">نظام القيادة والسائق:</label>
                    <label className="flex items-center gap-2 p-2 bg-slate-900 border border-slate-800 rounded-xl cursor-pointer">
                      <input
                        type="checkbox"
                        checked={orderForm.withDriver}
                        onChange={(e) =>
                          setOrderForm({ ...orderForm, withDriver: e.target.checked })
                        }
                        className="w-4 h-4 accent-amber-500 rounded"
                      />
                      <span className="text-white font-bold">تخصيص سائق معتمد (+18,000 ر.ي/يوم)</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">نقطة ومكان التسليم:</label>
                    <input
                      type="text"
                      value={orderForm.pickupLocation}
                      onChange={(e) =>
                        setOrderForm({ ...orderForm, pickupLocation: e.target.value })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white"
                      placeholder="فرع حدة / صالة المطار / فندق..."
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">نطاق السير والمحافظة:</label>
                    <input
                      type="text"
                      value={orderForm.destination}
                      onChange={(e) =>
                        setOrderForm({ ...orderForm, destination: e.target.value })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white"
                      placeholder="صنعاء / عدن / مأرب..."
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">حالة العقد بالنظام:</label>
                    <select
                      value={orderForm.bookingStatus}
                      onChange={(e) =>
                        setOrderForm({
                          ...orderForm,
                          bookingStatus: e.target.value as Booking['bookingStatus']
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-emerald-400 font-bold"
                    >
                      <option value="confirmed">عقد معتمد وموثق</option>
                      <option value="in_progress">المركبة مع العميل حالياً</option>
                      <option value="pending_approval">بانتظار الاعتماد</option>
                      <option value="completed">مكتمل ومخلى الطرف</option>
                      <option value="cancelled">ملغي</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Tab 3: Financial Settlement & Deposit */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs font-black text-emerald-400 flex items-center gap-1.5 border-b border-slate-800 pb-2">
                  <Wallet className="w-4 h-4" />
                  <span>3. المقابل المالي والوديعة النقدية والمحفظة الإلكترونية:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-slate-400 mb-1">مبلغ التأمين / الوديعة المحتجزة (ر.ي):</label>
                    <input
                      type="number"
                      value={orderForm.depositHeldAmountYer}
                      onChange={(e) =>
                        setOrderForm({
                          ...orderForm,
                          depositHeldAmountYer: Number(e.target.value) || 0
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-amber-400 font-mono font-bold"
                      placeholder="100000"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">المحفظة المستخدمة للسداد:</label>
                    <select
                      value={orderForm.walletUsed}
                      onChange={(e) =>
                        setOrderForm({
                          ...orderForm,
                          walletUsed: e.target.value as PaymentWallet
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white font-bold"
                    >
                      {YEMENI_WALLETS.map((w) => (
                        <option key={w.id} value={w.id}>
                          {w.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">رقم مرجع السداد / الحوالة:</label>
                    <input
                      type="text"
                      value={orderForm.transactionRef}
                      onChange={(e) =>
                        setOrderForm({
                          ...orderForm,
                          transactionRef: e.target.value
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white font-mono"
                      placeholder="KRM-882190"
                    />
                  </div>
                </div>
              </div>

              {/* Tab 4: Official Contract Clauses (Editable & Freezable) */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="text-xs font-black text-amber-400 flex items-center gap-1.5">
                    <FileCheck2 className="w-4 h-4" />
                    <span>4. بنود وشروط العقد القانونية المعتمدة (قابلة للتحرير والتثبيت):</span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setOrderForm({
                        ...orderForm,
                        contractClauses: DEFAULT_OFFICIAL_CONTRACT_CLAUSES
                      })
                    }
                    className="text-[10px] text-slate-400 hover:text-amber-400 flex items-center gap-1"
                  >
                    <span>استعادة البنود النموذجية</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {orderForm.contractClauses.map((c, i) => (
                    <div key={i} className="flex items-start gap-2 bg-slate-900/90 p-2 rounded-xl border border-slate-800">
                      <span className="font-mono text-amber-500 font-bold text-xs mt-1 shrink-0">
                        #{i + 1}
                      </span>
                      <textarea
                        rows={2}
                        value={c}
                        onChange={(e) => {
                          const updated = [...orderForm.contractClauses];
                          updated[i] = e.target.value;
                          setOrderForm({ ...orderForm, contractClauses: updated });
                        }}
                        className="w-full text-xs text-white bg-slate-950 border border-slate-800 rounded-lg p-1.5 focus:border-amber-500 leading-relaxed"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = orderForm.contractClauses.filter((_, idx) => idx !== i);
                          setOrderForm({ ...orderForm, contractClauses: updated });
                        }}
                        className="p-1 text-rose-400 hover:bg-rose-500/10 rounded shrink-0 mt-1"
                        title="حذف هذا البند"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 text-[11px]">
                    ملاحظات وشروط خاصة إضافية (تطبع أسفل البنود في العقد A4):
                  </label>
                  <input
                    type="text"
                    value={orderForm.contractSpecialTerms}
                    onChange={(e) =>
                      setOrderForm({
                        ...orderForm,
                        contractSpecialTerms: e.target.value
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white text-xs"
                    placeholder="شروط خاصة إضافية..."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg transition"
              >
                {editingBookingId ? 'حفظ وتثبيت تعديلات العقد' : 'إصدار واعتماد العقد رسمياً'}
              </button>
              <button
                type="button"
                onClick={() => setIsOrderModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* OFFICIAL ELECTRONIC LEase CONTRACT MODAL (A4, QR, CLAUSES, LOGO, FOOTER) */}
      {printingContract && (
        <ElectronicLeaseContractModal
          isOpen={!!printingContract}
          booking={printingContract}
          car={cars.find((c) => c.id === printingContract.carId)}
          currency={currency}
          lang={lang}
          companyName={cmsConfig.header.companyName}
          companyLogoUrl={cmsConfig.header.logoUrl}
          slogan={cmsConfig.header.slogan}
          address={cmsConfig.footer.mainGeoAddress || 'صنعاء — شارع حدة الرئيسي'}
          phone={cmsConfig.header.directPhone || cmsConfig.footer.phone}
          crNumber={cmsConfig.brandIdentity?.crNumber || 'س.ت 10492'}
          whatsappNumber={
            cmsConfig.brandIdentity?.whatsappNumber ||
            cmsConfig.header.whatsappNumber ||
            cmsConfig.footer.phone
          }
          onClose={() => setPrintingContract(null)}
          onUpdateBookingClauses={(bId, updatedClauses, updatedSpecial) => {
            if (onSaveBooking) {
              const target = bookings.find((b) => b.id === bId);
              if (target) {
                const updated = {
                  ...target,
                  contractClauses: updatedClauses,
                  contractSpecialTerms: updatedSpecial
                };
                onSaveBooking(updated);
                setPrintingContract(updated);
              }
            }
          }}
        />
      )}

      {/* VIEW RFQ MODAL */}
      {viewingRfq && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setViewingRfq(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-4 text-xs shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white">
                تفاصيل مناقصة المنظمة #{viewingRfq.id}
              </h3>
              <button
                type="button"
                onClick={() => setViewingRfq(null)}
                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div>الجهة: {viewingRfq.orgName}</div>
              <div>المسؤول: {viewingRfq.contactPerson}</div>
              <div>الهاتف: {viewingRfq.phone}</div>
              <div>البريد: {viewingRfq.email}</div>
              <div>
                المطلوب: {viewingRfq.vehiclesCount} مركبات ({viewingRfq.vehicleCategory}) لمدة{' '}
                {viewingRfq.durationMonths} أشهر
              </div>
              <div>المتطلبات: {viewingRfq.requirements}</div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <select
                value={viewingRfq.status}
                onChange={(e) => {
                  const st = e.target.value as RfqRequest['status'];
                  onUpdateRfqStatus(viewingRfq.id, st);
                  setViewingRfq({ ...viewingRfq, status: st });
                }}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-amber-400 font-bold"
              >
                <option value="new">طلب جديد</option>
                <option value="quoted">تم إرسال العرض المالي</option>
                <option value="approved">تمت الترسية والتعاقد</option>
              </select>
              <button
                type="button"
                onClick={() => setViewingRfq(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT RFQ MODAL */}
      {isRfqModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsRfqModalOpen(false)}
        >
          <form
            onSubmit={handleSaveRfqForm}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-4 text-xs shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white">
                {editingRfqId ? 'تعديل المناقصة' : 'إضافة مناقصة / عرض سعر جديد'}
              </h3>
              <button
                type="button"
                onClick={() => setIsRfqModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-slate-400 mb-1">اسم المنظمة / الشركة:</label>
                <input
                  type="text"
                  required
                  value={rfqForm.orgName}
                  onChange={(e) =>
                    setRfqForm({ ...rfqForm, orgName: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">المسؤول:</label>
                <input
                  type="text"
                  required
                  value={rfqForm.contactPerson}
                  onChange={(e) =>
                    setRfqForm({ ...rfqForm, contactPerson: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">رقم الهاتف:</label>
                <input
                  type="text"
                  value={rfqForm.phone}
                  onChange={(e) =>
                    setRfqForm({ ...rfqForm, phone: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">عدد المركبات:</label>
                <input
                  type="number"
                  min={1}
                  value={rfqForm.vehiclesCount}
                  onChange={(e) =>
                    setRfqForm({
                      ...rfqForm,
                      vehiclesCount: Number(e.target.value) || 1
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-amber-400 font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">المدة (أشهر):</label>
                <input
                  type="number"
                  min={1}
                  value={rfqForm.durationMonths}
                  onChange={(e) =>
                    setRfqForm({
                      ...rfqForm,
                      durationMonths: Number(e.target.value) || 1
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-amber-400 font-mono"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-slate-400 mb-1">فئة المركبات المطلوبة:</label>
                <input
                  type="text"
                  value={rfqForm.vehicleCategory}
                  onChange={(e) =>
                    setRfqForm({ ...rfqForm, vehicleCategory: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-slate-400 mb-1">المتطلبات والشروط:</label>
                <textarea
                  rows={2}
                  value={rfqForm.requirements}
                  onChange={(e) =>
                    setRfqForm({ ...rfqForm, requirements: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black"
              >
                حفظ المناقصة
              </button>
              <button
                type="button"
                onClick={() => setIsRfqModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* VIEW CLIENT DOSSIER MODAL */}
      {viewingClient && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setViewingClient(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 space-y-4 text-xs shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="font-mono text-amber-400 font-bold">
                  #{viewingClient.id}
                </span>
                <h3 className="text-base font-black text-white">
                  {viewingClient.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setViewingClient(null)}
                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div>الجهة: {viewingClient.organizationName || 'أفراد'}</div>
              <div>الهاتف: {viewingClient.phone}</div>
              <div>العنوان: {viewingClient.address}</div>
              <div>الهوية / الجواز: {viewingClient.nationalIdOrPassport}</div>
              <div>الضامن: {viewingClient.guarantorName}</div>
              <div>مرجع الضمان: {viewingClient.guarantorDocumentRef}</div>
              <div>
                الحد الائتماني: ${viewingClient.creditLimitUsd.toLocaleString()}
              </div>
              <div>
                التأمين المحتجز: {formatMoney(viewingClient.heldDepositYer)}
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onUpdateClientStatus(viewingClient.id, 'verified');
                    setViewingClient({
                      ...viewingClient,
                      verificationStatus: 'verified'
                    });
                  }}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-black"
                >
                  اعتماد الملف
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const target = viewingClient;
                    setViewingClient(null);
                    openEditClient(target);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 font-black"
                >
                  تعديل البيانات
                </button>
              </div>
              <button
                type="button"
                onClick={() => setViewingClient(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT CLIENT MODAL */}
      {isClientModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsClientModalOpen(false)}
        >
          <form
            onSubmit={handleSaveClientForm}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto text-xs shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white">
                {editingClientId ? 'تعديل ملف العميل' : 'إضافة ملف عميل جديد'}
              </h3>
              <button
                type="button"
                onClick={() => setIsClientModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">الاسم الكامل:</label>
                <input
                  type="text"
                  required
                  value={clientForm.name}
                  onChange={(e) =>
                    setClientForm({ ...clientForm, name: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">المنظمة / الشركة:</label>
                <input
                  type="text"
                  value={clientForm.organizationName}
                  onChange={(e) =>
                    setClientForm({
                      ...clientForm,
                      organizationName: e.target.value
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">رقم الهاتف:</label>
                <input
                  type="text"
                  required
                  value={clientForm.phone}
                  onChange={(e) =>
                    setClientForm({ ...clientForm, phone: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">رقم الهوية / الجواز:</label>
                <input
                  type="text"
                  value={clientForm.nationalIdOrPassport}
                  onChange={(e) =>
                    setClientForm({
                      ...clientForm,
                      nationalIdOrPassport: e.target.value
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">اسم الضامن / الكفيل:</label>
                <input
                  type="text"
                  value={clientForm.guarantorName}
                  onChange={(e) =>
                    setClientForm({
                      ...clientForm,
                      guarantorName: e.target.value
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">حالة التوثيق:</label>
                <select
                  value={clientForm.verificationStatus}
                  onChange={(e) =>
                    setClientForm({
                      ...clientForm,
                      verificationStatus: e.target
                        .value as ClientProfile['verificationStatus']
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-amber-400 font-bold"
                >
                  <option value="verified">موثق ومعتمد</option>
                  <option value="pending">قيد المراجعة</option>
                  <option value="blacklisted">قائمة الحظر</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black"
              >
                حفظ ملف العميل
              </button>
              <button
                type="button"
                onClick={() => setIsClientModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ADD / EDIT CAR MODAL */}
      {isCarModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsCarModalOpen(false)}
        >
          <form
            onSubmit={handleSaveCarForm}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto text-xs shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white">
                {editingCar ? `تعديل المركبة: ${editingCar.name}` : 'إضافة مركبة جديدة'}
              </h3>
              <button
                type="button"
                onClick={() => setIsCarModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">اسم المركبة:</label>
                <input
                  type="text"
                  required
                  value={carForm.name}
                  onChange={(e) =>
                    setCarForm({ ...carForm, name: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">رقم اللوحة:</label>
                <input
                  type="text"
                  required
                  value={carForm.plateNumber}
                  onChange={(e) =>
                    setCarForm({ ...carForm, plateNumber: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-amber-400 font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">الفئة:</label>
                <select
                  value={carForm.category}
                  onChange={(e) =>
                    setCarForm({
                      ...carForm,
                      category: e.target.value as CarCategory
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                >
                  {CAR_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.labelAr}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">سنة الصنع:</label>
                <input
                  type="number"
                  value={carForm.modelYear}
                  onChange={(e) =>
                    setCarForm({
                      ...carForm,
                      modelYear: Number(e.target.value) || 2024
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">السعر اليومي (ر.ي):</label>
                <input
                  type="number"
                  value={carForm.pricePerDayYer}
                  onChange={(e) =>
                    setCarForm({
                      ...carForm,
                      pricePerDayYer: Number(e.target.value) || 0
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-amber-400 font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">التأمين المسترد (ر.ي):</label>
                <input
                  type="number"
                  value={carForm.securityDepositYer}
                  onChange={(e) =>
                    setCarForm({
                      ...carForm,
                      securityDepositYer: Number(e.target.value) || 0
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-emerald-400 font-mono"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-slate-400 mb-1">رابط صورة المركبة:</label>
                <input
                  type="text"
                  value={carForm.image}
                  onChange={(e) =>
                    setCarForm({ ...carForm, image: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-300 font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black"
              >
                حفظ بيانات المركبة
              </button>
              <button
                type="button"
                onClick={() => setIsCarModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* VIEW DRIVER MODAL */}
      {viewingDriver && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setViewingDriver(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 text-xs shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <img
                  src={viewingDriver.avatar}
                  alt={viewingDriver.name}
                  className="w-12 h-12 rounded-xl object-cover border border-amber-500/40"
                />
                <div>
                  <h3 className="text-base font-black text-white">
                    {viewingDriver.name}
                  </h3>
                  <div className="font-mono text-amber-400">
                    {viewingDriver.phone}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingDriver(null)}
                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div>الرخصة: {viewingDriver.licenseNumber}</div>
              <div>
                المركبة المخصصة: {viewingDriver.assignedCarName} (
                {viewingDriver.assignedCarPlate})
              </div>
              <div>سنوات الخبرة: {viewingDriver.yearsExperience} سنوات</div>
              <div>
                مستحقات الشهر:{' '}
                <strong className="text-emerald-400 font-mono">
                  {formatMoney(
                    viewingDriver.earningsThisMonthYer,
                    viewingDriver.earningsThisMonthUsd
                  )}
                </strong>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  onAddTransaction({
                    type: 'driver_payout',
                    partyName: viewingDriver.name,
                    amountYer: 75000,
                    amountUsd: Math.round(75000 / exchangeRate),
                    wallet: 'kuraimi',
                    referenceNo: `DRV-${Math.floor(1000 + Math.random() * 8999)}`,
                    description: `صرف بدل مهمة ومستحقات كابتن (${viewingDriver.name})`,
                    status: 'completed'
                  });
                  setViewingDriver(null);
                  setActiveTab('accounting');
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-black"
              >
                صرف مستحقات مالية
              </button>
              <button
                type="button"
                onClick={() => setViewingDriver(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT DRIVER MODAL */}
      {isDriverModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsDriverModalOpen(false)}
        >
          <form
            onSubmit={handleSaveDriverForm}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-4 text-xs shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white">
                {editingDriverId ? 'تعديل بيانات الكابتن' : 'إضافة سائق / كابتن جديد'}
              </h3>
              <button
                type="button"
                onClick={() => setIsDriverModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">اسم الكابتن:</label>
                <input
                  type="text"
                  required
                  value={driverForm.name}
                  onChange={(e) =>
                    setDriverForm({ ...driverForm, name: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">رقم الهاتف:</label>
                <input
                  type="text"
                  required
                  value={driverForm.phone}
                  onChange={(e) =>
                    setDriverForm({ ...driverForm, phone: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">رقم/بيان الرخصة:</label>
                <input
                  type="text"
                  value={driverForm.licenseNumber}
                  onChange={(e) =>
                    setDriverForm({
                      ...driverForm,
                      licenseNumber: e.target.value
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">الحالة:</label>
                <select
                  value={driverForm.status}
                  onChange={(e) =>
                    setDriverForm({
                      ...driverForm,
                      status: e.target.value as Driver['status']
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-amber-400 font-bold"
                >
                  <option value="available">متاح</option>
                  <option value="on_trip">في مهمة</option>
                  <option value="offline">خارج الدوام</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">المركبة المخصصة:</label>
                <input
                  type="text"
                  value={driverForm.assignedCarName}
                  onChange={(e) =>
                    setDriverForm({
                      ...driverForm,
                      assignedCarName: e.target.value
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">لوحة المركبة:</label>
                <input
                  type="text"
                  value={driverForm.assignedCarPlate}
                  onChange={(e) =>
                    setDriverForm({
                      ...driverForm,
                      assignedCarPlate: e.target.value
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-amber-400 font-mono"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black"
              >
                حفظ بيانات الكابتن
              </button>
              <button
                type="button"
                onClick={() => setIsDriverModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* VIEW / PRINT INSPECTION MODAL */}
      {viewingInspection && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setViewingInspection(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-slate-950 rounded-3xl max-w-xl w-full p-6 space-y-4 text-xs shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-300 pb-3">
              <div>
                <h3 className="text-base font-black">
                  محضر فحص وإخلاء طرف #{viewingInspection.id}
                </h3>
                <p className="text-slate-600">{viewingInspection.carName}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 text-amber-400 font-black flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>طباعة</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewingInspection(null)}
                  className="p-1.5 rounded-xl bg-slate-200 text-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 bg-slate-100 p-4 rounded-xl border border-slate-300">
              <div>العميل: {viewingInspection.customerName}</div>
              <div>رقم العقد: #{viewingInspection.bookingId}</div>
              <div>عداد الخروج: {viewingInspection.odometerOutKm} كم</div>
              <div>
                عداد العودة: {viewingInspection.odometerInKm || '-'} كم
              </div>
              <div>
                التأمين المحتجز: {formatMoney(viewingInspection.securityDepositHeldYer)}
              </div>
              <div className="font-black text-emerald-700">
                صافي المسترد: {formatMoney(viewingInspection.netDepositRefundYer)}
              </div>
              <div className="col-span-2">
                ملاحظات الفحص: {viewingInspection.damageNotes}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT INSPECTION MODAL */}
      {isInspModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsInspModalOpen(false)}
        >
          <form
            onSubmit={handleSaveInspectionForm}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-4 text-xs shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white">
                {editingInspId ? 'تعديل محضر الفحص' : 'إصدار محضر فحص جديد'}
              </h3>
              <button
                type="button"
                onClick={() => setIsInspModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">العقد المرتبط:</label>
                <select
                  value={inspForm.bookingId}
                  onChange={(e) =>
                    setInspForm({ ...inspForm, bookingId: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                >
                  {bookings.map((b) => (
                    <option key={b.id} value={b.id}>
                      #{b.id} — {b.customerName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">نوع المحضر:</label>
                <select
                  value={inspForm.inspectionType}
                  onChange={(e) =>
                    setInspForm({
                      ...inspForm,
                      inspectionType: e.target.value as 'check_out' | 'check_in'
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-amber-400 font-bold"
                >
                  <option value="check_in">فحص عودة وإخلاء طرف</option>
                  <option value="check_out">محضر تسليم خروج</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">عداد الخروج (كم):</label>
                <input
                  type="number"
                  value={inspForm.odometerOutKm}
                  onChange={(e) =>
                    setInspForm({
                      ...inspForm,
                      odometerOutKm: Number(e.target.value) || 0
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">عداد العودة (كم):</label>
                <input
                  type="number"
                  value={inspForm.odometerInKm}
                  onChange={(e) =>
                    setInspForm({
                      ...inspForm,
                      odometerInKm: Number(e.target.value) || 0
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">خصم أضرار (ر.ي):</label>
                <input
                  type="number"
                  value={inspForm.damageDeductionYer}
                  onChange={(e) =>
                    setInspForm({
                      ...inspForm,
                      damageDeductionYer: Number(e.target.value) || 0
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-rose-400 font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">التأمين المحتجز (ر.ي):</label>
                <input
                  type="number"
                  value={inspForm.securityDepositHeldYer}
                  onChange={(e) =>
                    setInspForm({
                      ...inspForm,
                      securityDepositHeldYer: Number(e.target.value) || 0
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-emerald-400 font-mono"
                />
              </div>
              <div className="sm:col-span-2">
                <InteractiveScratchMap
                  zones={scratchZones}
                  onChangeZones={handleScratchZonesChange}
                  formatMoney={(yer) => formatMoney(yer)}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-slate-400 mb-1">ملاحظات الفحص الفني:</label>
                <input
                  type="text"
                  value={inspForm.damageNotes}
                  onChange={(e) =>
                    setInspForm({ ...inspForm, damageNotes: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black"
              >
                حفظ المحضر
              </button>
              <button
                type="button"
                onClick={() => setIsInspModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* VIEW MAINTENANCE MODAL */}
      {viewingMaint && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setViewingMaint(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 text-xs shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white">
                سجل الصيانة #{viewingMaint.id}
              </h3>
              <button
                type="button"
                onClick={() => setViewingMaint(null)}
                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="font-bold text-amber-400">{viewingMaint.title}</div>
              <div>
                المركبة: {viewingMaint.carName} ({viewingMaint.plateNumber})
              </div>
              <div>الجهة المنفذة: {viewingMaint.workshopOrProvider}</div>
              <div>التاريخ: {viewingMaint.date}</div>
              <div>الاستحقاق القادم: {viewingMaint.nextDueDate}</div>
              <div>
                التكلفة:{' '}
                <strong className="text-rose-400 font-mono">
                  {formatMoney(viewingMaint.costYer, viewingMaint.costUsd)}
                </strong>
              </div>
              <div>ملاحظات: {viewingMaint.notes}</div>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT MAINTENANCE MODAL */}
      {isMaintModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsMaintModalOpen(false)}
        >
          <form
            onSubmit={handleSaveMaintForm}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-4 text-xs shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white">
                {editingMaintId ? 'تعديل سجل الصيانة' : 'إضافة سجل صيانة جديد'}
              </h3>
              <button
                type="button"
                onClick={() => setIsMaintModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">المركبة:</label>
                <select
                  value={maintForm.carId}
                  onChange={(e) =>
                    setMaintForm({ ...maintForm, carId: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                >
                  {cars.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.plateNumber})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">الحالة:</label>
                <select
                  value={maintForm.status}
                  onChange={(e) =>
                    setMaintForm({
                      ...maintForm,
                      status: e.target.value as MaintenanceRecord['status']
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-amber-400 font-bold"
                >
                  <option value="completed">مكتملة</option>
                  <option value="in_service">في الورشة</option>
                  <option value="scheduled_soon">مجدولة قريباً</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-slate-400 mb-1">بيان الصيانة / التأمين:</label>
                <input
                  type="text"
                  required
                  value={maintForm.title}
                  onChange={(e) =>
                    setMaintForm({ ...maintForm, title: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">الورشة / الجهة:</label>
                <input
                  type="text"
                  value={maintForm.workshopOrProvider}
                  onChange={(e) =>
                    setMaintForm({
                      ...maintForm,
                      workshopOrProvider: e.target.value
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">التكلفة (ر.ي):</label>
                <input
                  type="number"
                  value={maintForm.costYer}
                  onChange={(e) =>
                    setMaintForm({
                      ...maintForm,
                      costYer: Number(e.target.value) || 0
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-rose-400 font-mono font-bold"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black"
              >
                حفظ السجل
              </button>
              <button
                type="button"
                onClick={() => setIsMaintModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* VIEW / PRINT FINANCIAL VOUCHER MODAL */}
      {viewingTx && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setViewingTx(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-slate-950 rounded-3xl max-w-md w-full p-6 space-y-4 text-xs shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-300 pb-3">
              <div>
                <h3 className="text-base font-black">سند مالي #{viewingTx.id}</h3>
                <p className="text-slate-600">{viewingTx.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 text-amber-400 font-black flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>طباعة</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewingTx(null)}
                  className="p-1.5 rounded-xl bg-slate-200 text-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-2 bg-slate-100 p-4 rounded-xl border border-slate-300">
              <div>العميل / الجهة: {viewingTx.partyName}</div>
              <div>البيان: {viewingTx.description}</div>
              <div>
                المحفظة / الحساب: {viewingTx.wallet.toUpperCase()} (
                {viewingTx.referenceNo})
              </div>
              <div className="text-sm font-black pt-1">
                المبلغ: {formatMoney(viewingTx.amountYer, viewingTx.amountUsd)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT FINANCIAL VOUCHER MODAL */}
      {isTxModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsTxModalOpen(false)}
        >
          <form
            onSubmit={handleSaveTxForm}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 text-xs shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white">
                {editingTxId ? 'تعديل السند المالي' : 'إصدار سند مالي جديد'}
              </h3>
              <button
                type="button"
                onClick={() => setIsTxModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-slate-400 mb-1">نوع السند:</label>
                <select
                  value={txForm.type}
                  onChange={(e) =>
                    setTxForm({
                      ...txForm,
                      type: e.target.value as FinancialTransaction['type']
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-amber-400 font-bold"
                >
                  <option value="receipt">سند قبض إيجاري</option>
                  <option value="refund">سند رد تأمين</option>
                  <option value="driver_payout">صرف مستحقات كابتن</option>
                  <option value="expense">مصروف صيانة وتشغيل</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">العميل / الجهة:</label>
                <input
                  type="text"
                  required
                  value={txForm.partyName}
                  onChange={(e) =>
                    setTxForm({ ...txForm, partyName: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">المبلغ (ر.ي):</label>
                  <input
                    type="number"
                    required
                    value={txForm.amountYer}
                    onChange={(e) =>
                      setTxForm({
                        ...txForm,
                        amountYer: Number(e.target.value) || 0
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-emerald-400 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">المحفظة:</label>
                  <select
                    value={txForm.wallet}
                    onChange={(e) =>
                      setTxForm({
                        ...txForm,
                        wallet: e.target.value as PaymentWallet
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  >
                    {YEMENI_WALLETS.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">البيان المحاسبي:</label>
                <input
                  type="text"
                  required
                  value={txForm.description}
                  onChange={(e) =>
                    setTxForm({ ...txForm, description: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black"
              >
                حفظ السند
              </button>
              <button
                type="button"
                onClick={() => setIsTxModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Instant WhatsApp Quick Concierge Modal for Admin */}
      {adminConciergeBooking && (
        <WhatsAppQuickConciergeModal
          isOpen={!!adminConciergeBooking}
          booking={adminConciergeBooking}
          companyName={cmsConfig.header.companyName}
          agencyPhone={cmsConfig.header.whatsappNumber || '967771234567'}
          onClose={() => setAdminConciergeBooking(null)}
        />
      )}
    </div>
  );
};
