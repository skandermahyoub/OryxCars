export type Language = 'ar' | 'en';
export type Currency = 'YER' | 'USD';
export type UserRole = 'customer' | 'driver' | 'admin';

export type CarCategory =
  | 'all'
  | 'luxury_suv'
  | 'vip_armored'
  | 'executive_sedan'
  | 'field_4x4'
  | 'economy_sedan'
  | 'prestige_van';

export type RentalType = 'self_drive' | 'with_chauffeur' | 'inter_governorate' | 'airport_vip';

export type PaymentWallet = 'kuraimi' | 'floosak' | 'jawali' | 'jeeb' | 'onecash' | 'shamel' | 'cash';

export type GuaranteeType =
  | 'commercial_guarantor' // كفالة تجارية معتمدة (سجل تجاري ساري)
  | 'cash_deposit'         // مبلغ تأمين نقدي مسترد عبر المحفظة أو نقداً
  | 'security_check'       // شيك مصرفي مصدق
  | 'government_id_escrow'; // خطاب رسمي من منظمة دولية / شركة أو كفالة جهة عمل

export type Governorate =
  | 'sanaa'
  | 'aden'
  | 'marib'
  | 'taiz'
  | 'ibb'
  | 'hodeidah'
  | 'hadhramaut_mukalla'
  | 'dhamar'
  | 'saada';

export interface CarSpecs {
  driveType: string;
  tankCapacity: string;
  luggageCapacity: string;
  safetyRating: string;
  insuranceType: string;
}

export interface Car {
  id: string;
  slug?: string;
  name: string;
  nameEn: string;
  category: CarCategory;
  modelYear: number;
  engine: string;
  seats: number;
  armoredLevel?: string;
  transmission: string;
  pricePerDayYer: number;
  pricePerDayUsd: number;
  pricePerWeekYer?: number;
  pricePerMonthYer?: number;
  pricePerMonthUsd?: number;
  pricePerKmInterCityYer: number;
  securityDepositYer: number;
  securityDepositUsd: number;
  freeKmPerDay?: number;
  extraKmFeeYer?: number;
  image: string;
  gallery?: string[];
  landingSubtitle?: string;
  landingDescription?: string;
  clientSuitability?: string[];
  specs?: CarSpecs;
  available: boolean;
  plateNumber: string;
  currentLocation: string;
  features: string[];
  featuresEn: string[];
  rating: number;
  tripsCount: number;
  fuelType: string;
}

export interface Checkpoint {
  id: string;
  name: string;
  nameEn: string;
  passed: boolean;
  timeEstimate: string;
  notes?: string;
}

export interface Booking {
  id: string;
  carId: string;
  carName: string;
  carImage: string;
  clientCategory?: 'individual' | 'corporate' | 'un_ngo';
  organizationName?: string;
  customerName: string;
  customerPhone: string;
  customerIdNumber: string;
  customerLicenseNumber?: string;
  guaranteeType: GuaranteeType;
  guaranteeStatus: 'approved' | 'under_review' | 'rejected';
  guaranteeDetails: string;
  // Attached KYC & Legal Documents
  idDocumentUrl?: string;
  licenseDocumentUrl?: string;
  guaranteeDocumentUrl?: string;
  paymentReceiptUrl?: string;
  // Digital Rental Agreement & Official Clauses
  contractAgreed?: boolean;
  contractSignedAt?: string;
  customerSignatureDataUrl?: string;
  contractClauses?: string[];
  contractSpecialTerms?: string;
  insuranceCoverage?: 'comprehensive' | 'third_party' | 'vip_shield';
  dailyKmAllowance?: number;
  extraKmRateYer?: number;
  fuelLevelOut?: 'full' | 'three_quarters' | 'half' | 'quarter';
  guarantorPhone?: string;
  idDocumentType?: 'national_id' | 'passport' | 'commercial_record';
  odometerStartKm?: number;
  // Trip & Delivery Details
  rentalType: RentalType;
  deliveryMode?: 'doorstep_delivery' | 'branch_pickup';
  pickupLocation: string;
  destination: string;
  governorate?: Governorate;
  startDate: string;
  endDate: string;
  days: number;
  withDriver: boolean;
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
  // Financial & E-Wallet Details
  totalAmountYer: number;
  totalAmountUsd: number;
  // Remote Price Negotiation & Pre-Pickup Clearance
  isNegotiated?: boolean;
  standardTotalYer?: number;
  proposedTotalYer?: number;
  counterOfferTotalYer?: number;
  negotiationNote?: string;
  negotiationStatus?: 'none' | 'pending_review' | 'approved' | 'counter_offered' | 'rejected';
  remotePickupCode?: string;
  paymentPlan?: 'full_100' | 'deposit_30' | 'with_escrow';
  paidAmountYer?: number;
  remainingAmountYer?: number;
  walletUsed: PaymentWallet;
  paymentStatus: 'paid' | 'pending' | 'partially_paid';
  transactionRef: string;
  bookingStatus:
    | 'pending_approval'
    | 'confirmed'
    | 'driver_en_route'
    | 'in_progress'
    | 'completed'
    | 'cancelled';
  tripProgressPct: number;
  currentCheckpointIndex: number;
  checkpoints: Checkpoint[];
  etaMinutes: number;
  currentSpeedKmh: number;
  rating?: number;
  // VIP Delivery & Airport Concierge
  pickupServiceType?: 'branch_pickup' | 'airport_vip' | 'hotel_delivery' | 'doorstep_delivery';
  flightNumber?: string;
  hotelRoomOrAddress?: string;
  airportPlacardName?: string;
  // Chauffeur & Executive VIP Service
  chauffeurOption?: {
    requested: boolean;
    language: 'ar' | 'en';
    uniformVip: boolean;
  };
  // VIP Add-ons
  selectedAddons?: {
    childSeat?: boolean;
    pocketWifi?: boolean;
    salikTag?: boolean;
    roadsideAssistance?: boolean;
    interGovernoratePermit?: boolean;
  };
  addonsTotalYer?: number;
  // Security Deposit Tracking & Release
  depositStatus?: 'held' | 'ready_for_release' | 'released' | 'partially_deducted';
  depositHeldAmountYer?: number;
  depositRefundRef?: string;
  depositDeductionsYer?: number;
  // One-Click Lease Extension
  extensionsCount?: number;
  lastExtendedAt?: string;
  reviewComment?: string;
  createdAt: string;
}

export interface Driver {
  id: string;
  name: string;
  nameEn: string;
  phone: string;
  avatar: string;
  licenseNumber: string;
  rating: number;
  tripsCount: number;
  interGovernorateCertified: boolean;
  status: 'available' | 'on_trip' | 'offline';
  assignedCarPlate?: string;
  assignedCarName?: string;
  currentLocation: string;
  earningsThisMonthYer: number;
  earningsThisMonthUsd: number;
  yearsExperience: number;
}

export interface WalletInfo {
  id: PaymentWallet;
  name: string;
  nameEn: string;
  bankName: string;
  bankNameEn: string;
  accountNumber: string;
  logoColor: string;
  badgeText: string;
  iconType: string;
}

export interface LoyaltyTier {
  id: 'silver' | 'gold' | 'platinum' | 'royal_vip';
  name: string;
  nameEn: string;
  minPoints: number;
  discountPct: number;
  perks: string[];
  perksEn: string[];
  badgeColor: string;
}

export interface InterCityRoute {
  id: string;
  origin: Governorate;
  destination: Governorate;
  titleAr: string;
  titleEn: string;
  distanceKm: number;
  estimatedHours: string;
  roadCondition: string;
  recommendedVehicle: string;
  securityStatus: 'stable' | 'normal' | 'caution';
  checkpoints: string[];
}

export interface FinancialTransaction {
  id: string;
  date: string;
  type: 'receipt' | 'refund' | 'driver_payout' | 'expense';
  bookingId?: string;
  partyName: string;
  amountYer: number;
  amountUsd: number;
  wallet: PaymentWallet;
  referenceNo: string;
  description: string;
  status: 'completed' | 'pending';
}

export interface RfqRequest {
  id: string;
  orgName: string;
  orgType: 'un_ngo' | 'corporate' | 'government' | 'embassy';
  contactPerson: string;
  phone: string;
  email: string;
  vehiclesCount: number;
  durationMonths: number;
  vehicleCategory: string;
  requirements: string;
  status: 'new' | 'quoted' | 'approved';
  createdAt: string;
}

export type ClientSegment = 'individual' | 'vip' | 'corporate' | 'un_ngo' | 'embassy';

export interface ClientProfile {
  id: string;
  clientType: ClientSegment;
  name: string;
  organizationName?: string;
  jobTitle?: string;
  phone: string;
  email: string;
  address: string;
  nationalIdOrPassport: string;
  licenseNumber?: string;
  licenseExpiry?: string;
  guarantorName: string;
  guarantorType: GuaranteeType;
  guarantorDocumentRef: string;
  guarantorPhone: string;
  verificationStatus: 'verified' | 'pending' | 'blacklisted';
  riskScore: 'low' | 'medium' | 'high';
  creditLimitUsd: number;
  totalBookingsCount: number;
  activeBookingsCount: number;
  totalSpentYer: number;
  totalSpentUsd: number;
  heldDepositYer: number;
  idDocumentUrl?: string;
  licenseDocumentUrl?: string;
  guaranteeDocumentUrl?: string;
  notes: string;
  createdAt: string;
}

export interface VehicleInspectionRecord {
  id: string;
  bookingId: string;
  carId: string;
  carName: string;
  plateNumber: string;
  customerName: string;
  inspectionType: 'check_out' | 'check_in';
  date: string;
  inspectorName: string;
  odometerOutKm: number;
  odometerInKm?: number;
  allowedKm: number;
  extraKm: number;
  extraKmFeeYer: number;
  fuelLevelOut: '100%' | '75%' | '50%' | '25%';
  fuelLevelIn?: '100%' | '75%' | '50%' | '25%';
  exteriorCondition: 'agency_intact' | 'minor_scratches' | 'damage_detected';
  interiorCondition: 'clean_intact' | 'needs_cleaning' | 'damage_detected';
  tiresAndSpareOk: boolean;
  safetyKitAndToolsOk: boolean;
  damageNotes: string;
  damageDeductionYer: number;
  securityDepositHeldYer: number;
  netDepositRefundYer: number;
  clearanceStatus: 'checked_out_active' | 'cleared_refunded' | 'deducted_settled';
  clearanceCertificateNo?: string;
}

export interface MaintenanceRecord {
  id: string;
  carId: string;
  carName: string;
  plateNumber: string;
  serviceType:
    | 'periodic_oil_filter'
    | 'comprehensive_insurance'
    | 'traffic_customs_permit'
    | 'tires_brakes'
    | 'armored_sop_check';
  title: string;
  workshopOrProvider: string;
  date: string;
  nextDueDate: string;
  odometerKm: number;
  nextDueOdometerKm: number;
  costYer: number;
  costUsd: number;
  status: 'completed' | 'in_service' | 'scheduled_soon';
  notes: string;
}

export interface ScratchZone {
  zoneId: string;
  label: string;
  status: 'intact' | 'scratch' | 'damage';
  estimatedCostYer: number;
}

export interface InvestorCarRecord {
  id: string;
  carId: string;
  carName: string;
  plateNumber: string;
  investorName: string;
  investorPhone: string;
  investorNationalId: string;
  contractStartDate: string;
  contractEndDate: string;
  investorSharePct: number; // e.g. 75% to owner, 25% to company
  companyCommissionPct: number;
  totalGrossRevenueYer: number;
  maintenanceDeductedYer: number;
  netInvestorPayoutYer: number;
  payoutStatus: 'settled' | 'pending_payout';
  preferredWallet: PaymentWallet;
  notes: string;
}

export interface DynamicPricingRule {
  id: string;
  title: string;
  seasonOrTrigger: 'high_season_eid' | 'vip_delegations' | 'weekly_discount' | 'monthly_ngo_lta' | 'high_occupancy_surge';
  adjustmentType: 'increase_pct' | 'discount_pct';
  percentage: number;
  applicableCategories: CarCategory[];
  minDays: number;
  active: boolean;
  validFrom: string;
  validTo: string;
  notes: string;
}

export interface TrafficFineIncident {
  id: string;
  bookingId: string;
  carId: string;
  carName: string;
  plateNumber: string;
  customerName: string;
  driverName?: string;
  recordType: 'traffic_fine' | 'road_accident' | 'insurance_claim';
  title: string;
  location: string;
  incidentDate: string;
  amountYer: number;
  amountUsd: number;
  liability: 'customer' | 'driver' | 'insurance_covered' | 'company';
  settlementStatus: 'unpaid' | 'deducted_from_deposit' | 'settled_cash' | 'insurance_pending';
  officialReportNo: string;
  notes: string;
}

export interface B2BMonthlyInvoice {
  id: string;
  lpoNumber: string;
  organizationName: string;
  orgType: 'un_ngo' | 'corporate' | 'embassy' | 'government';
  billingMonth: string;
  vehiclesCount: number;
  totalDaysBilled: number;
  subtotalUsd: number;
  taxOrCustomsUsd: number;
  totalAmountUsd: number;
  totalAmountYer: number;
  status: 'paid' | 'issued_pending' | 'overdue';
  dueDate: string;
  contactPerson: string;
  notes: string;
}

export type AdminAccessRole = 'general_manager' | 'reception_staff';

export type AdminCategoryId =
  | 'executive'
  | 'operations'
  | 'assets'
  | 'relations'
  | 'finance_cms';

export type AdminModuleId =
  | 'overview'
  | 'roi_analytics'
  | 'alerts_radar'
  | 'orders'
  | 'fleet_timeline'
  | 'handover'
  | 'dynamic_pricing'
  | 'fleet'
  | 'investors'
  | 'maintenance'
  | 'fines_incidents'
  | 'crm'
  | 'rfq'
  | 'drivers'
  | 'whatsapp_hub'
  | 'drivers_rfq'
  | 'accounting'
  | 'agency_identity'
  | 'cms';



