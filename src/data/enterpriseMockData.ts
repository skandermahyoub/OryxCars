import {
  InvestorCarRecord,
  DynamicPricingRule,
  TrafficFineIncident,
  B2BMonthlyInvoice,
  ScratchZone
} from '../types';

export const DEFAULT_SCRATCH_ZONES: ScratchZone[] = [
  { zoneId: 'front_bumper', label: 'الصدام والشبك الأمامي', status: 'intact', estimatedCostYer: 0 },
  { zoneId: 'hood_windshield', label: 'الكبوت والزجاج الأمامي', status: 'intact', estimatedCostYer: 0 },
  { zoneId: 'right_doors', label: 'الأبواب والرفرف الأيمن', status: 'intact', estimatedCostYer: 0 },
  { zoneId: 'left_doors', label: 'الأبواب والرفرف الأيسر', status: 'intact', estimatedCostYer: 0 },
  { zoneId: 'roof_sunroof', label: 'السقف وفتحة البانوراما', status: 'intact', estimatedCostYer: 0 },
  { zoneId: 'rear_trunk_bumper', label: 'الشنطة والصدام الخلفي', status: 'intact', estimatedCostYer: 0 },
  { zoneId: 'tires_rims', label: 'الإطارات والجنوط الأربعة', status: 'intact', estimatedCostYer: 0 },
  { zoneId: 'cabin_interior', label: 'المقصورة والشاشات الداخلية', status: 'intact', estimatedCostYer: 0 }
];

export const INITIAL_INVESTOR_CARS: InvestorCarRecord[] = [
  {
    id: 'INV-2025-101',
    carId: 'car-1',
    carName: 'تويوتا لاندكروزر 300 VXR 2024',
    plateNumber: 'صنعاء 14-88902',
    investorName: 'الشيخ / عبدالقادر محمد السنحاني',
    investorPhone: '+967 771 220 990',
    investorNationalId: '01010044219',
    contractStartDate: '2025-01-01',
    contractEndDate: '2025-12-31',
    investorSharePct: 75,
    companyCommissionPct: 25,
    totalGrossRevenueYer: 2850000,
    maintenanceDeductedYer: 95000,
    netInvestorPayoutYer: 2042500,
    payoutStatus: 'pending_payout',
    preferredWallet: 'kuraimi',
    notes: 'عقد تشغيل استثماري سنوي — تسوية الأرباح نهاية كل شهر عبر بنك الكريمي.'
  },
  {
    id: 'INV-2025-102',
    carId: 'car-4',
    carName: 'تويوتا برادو TXL V6 2024 (ميداني وعائلي)',
    plateNumber: 'صنعاء 18-44219',
    investorName: 'م. نبيل عبدالوهاب الكبسي',
    investorPhone: '+967 777 518 300',
    investorNationalId: '01010077312',
    contractStartDate: '2025-02-15',
    contractEndDate: '2026-02-15',
    investorSharePct: 80,
    companyCommissionPct: 20,
    totalGrossRevenueYer: 1950000,
    maintenanceDeductedYer: 60000,
    netInvestorPayoutYer: 1500000,
    payoutStatus: 'settled',
    preferredWallet: 'floosak',
    notes: 'مؤجرة حالياً بعقد تشغيلي مع منظمة دولية — تم تحويل حصة الشهر الماضي بالكامل.'
  },
  {
    id: 'INV-2025-103',
    carId: 'car-5',
    carName: 'تويوتا راف فور (RAV4 Hybrid 2024)',
    plateNumber: 'صنعاء 15-61209',
    investorName: 'د. سامي يحيى العريقي',
    investorPhone: '+967 773 884 110',
    investorNationalId: '01010091204',
    contractStartDate: '2025-03-01',
    contractEndDate: '2025-12-31',
    investorSharePct: 75,
    companyCommissionPct: 25,
    totalGrossRevenueYer: 1120000,
    maintenanceDeductedYer: 35000,
    netInvestorPayoutYer: 805000,
    payoutStatus: 'pending_payout',
    preferredWallet: 'jawali',
    notes: 'سيارة اقتصادية عالية الطلب — معدل إشغال 88% خلال الشهر.'
  }
];

export const INITIAL_DYNAMIC_PRICING_RULES: DynamicPricingRule[] = [
  {
    id: 'PRC-101',
    title: 'خصم عقود المنظمات والشركات الشهرية (LTA)',
    seasonOrTrigger: 'monthly_ngo_lta',
    adjustmentType: 'discount_pct',
    percentage: 18,
    applicableCategories: ['luxury_suv', 'vip_armored', 'field_4x4'],
    minDays: 30,
    active: true,
    validFrom: '2025-01-01',
    validTo: '2025-12-31',
    notes: 'يطبق تلقائياً على العقود الشهرية للمنظمات الدولية والشركات المعتمدة.'
  },
  {
    id: 'PRC-102',
    title: 'تسعيرة ذروة المواسم والأعياد والمناسبات الرسمية',
    seasonOrTrigger: 'high_season_eid',
    adjustmentType: 'increase_pct',
    percentage: 20,
    applicableCategories: ['luxury_suv', 'economy_sedan', 'prestige_van'],
    minDays: 1,
    active: true,
    validFrom: '2025-03-25',
    validTo: '2025-04-15',
    notes: 'زيادة موسمية خلال فترات الذروة والأعياد لارتفاع الطلب على السيارات الفاخرة والعائلية.'
  },
  {
    id: 'PRC-103',
    title: 'خصم الإيجار الأسبوعي للأفراد والمغتربين',
    seasonOrTrigger: 'weekly_discount',
    adjustmentType: 'discount_pct',
    percentage: 12,
    applicableCategories: ['economy_sedan', 'field_4x4', 'executive_sedan'],
    minDays: 7,
    active: true,
    validFrom: '2025-01-01',
    validTo: '2025-12-31',
    notes: 'تشجيع الحجوزات الأسبوعية الكاملة بدلاً من التأجير ليوم واحد.'
  },
  {
    id: 'PRC-104',
    title: 'تسعيرة الذروة الذكية (عند تجاوز إشغال الأسطول 85%)',
    seasonOrTrigger: 'high_occupancy_surge',
    adjustmentType: 'increase_pct',
    percentage: 15,
    applicableCategories: ['luxury_suv', 'vip_armored'],
    minDays: 1,
    active: false,
    validFrom: '2025-01-01',
    validTo: '2025-12-31',
    notes: 'تُفعّل آلياً عندما يقل عدد السيارات المتاحة في الفرع عن سيارتين.'
  }
];

export const INITIAL_FINES_INCIDENTS: TrafficFineIncident[] = [
  {
    id: 'INC-901',
    bookingId: 'UNT-7801',
    carId: 'car-1',
    carName: 'تويوتا لاندكروزر 300 VXR 2024',
    plateNumber: 'صنعاء 14-88902',
    customerName: 'م. هشام عبدالرحمن المتوكل',
    recordType: 'traffic_fine',
    title: 'مخالفة سرعة زائدة وتجاوز إشارة — خط المطار السريع',
    location: 'صنعاء — تقاطع جولة الجمنة خط المطار',
    incidentDate: '2025-05-08',
    amountYer: 15000,
    amountUsd: 28,
    liability: 'customer',
    settlementStatus: 'deducted_from_deposit',
    officialReportNo: 'TRF-SAN-88412',
    notes: 'وقعت المخالفة أثناء فترة سريان العقد #UNT-7801 وتم خصمها من مبلغ التأمين عند إخلاء الطرف.'
  },
  {
    id: 'INC-902',
    bookingId: 'UNT-7804',
    carId: 'car-4',
    carName: 'تويوتا برادو TXL V6 2024 (ميداني وعائلي)',
    plateNumber: 'صنعاء 18-44219',
    customerName: 'أكرم علي الشيباني',
    recordType: 'road_accident',
    title: 'احتكاك سطحي بالصدام الخلفي في موقف تجاري',
    location: 'صنعاء — شارع حدة جوار المركز الليبي',
    incidentDate: '2025-05-10',
    amountYer: 35000,
    amountUsd: 65,
    liability: 'customer',
    settlementStatus: 'unpaid',
    officialReportNo: 'ACC-SAN-2049',
    notes: 'بانتظار عودة المركبة وتحصيل قيمة الإصلاح أو خصمها من التأمين المحتجز.'
  },
  {
    id: 'INC-903',
    bookingId: 'UNT-7802',
    carId: 'car-3',
    carName: 'تويوتا لاندكروزر مصفحة B6 VR7',
    plateNumber: 'صنعاء 22-30041',
    customerName: 'بعثة منظمة أطباء بلا حدود (MSF)',
    driverName: 'الكابتن / مراد عبدالله الحميري',
    recordType: 'insurance_claim',
    title: 'استبدال زجاج جانبي مزدوج عبر التأمين الشامل',
    location: 'خط صنعاء — إب (نقيل يسلح)',
    incidentDate: '2025-05-03',
    amountYer: 185000,
    amountUsd: 345,
    liability: 'insurance_covered',
    settlementStatus: 'insurance_pending',
    officialReportNo: 'CLM-INS-5510',
    notes: 'مغطى بالكامل ضمن بوليصة التأمين الشامل لعقود المنظمات الدولية دون تحميل العميل.'
  }
];

export const INITIAL_B2B_INVOICES: B2BMonthlyInvoice[] = [
  {
    id: 'INV-B2B-2025-01',
    lpoNumber: 'LPO-UNOPS-YE-9921',
    organizationName: 'مكتب الأمم المتحدة لخدمات المشاريع (UNOPS)',
    orgType: 'un_ngo',
    billingMonth: 'مايو 2025',
    vehiclesCount: 4,
    totalDaysBilled: 120,
    subtotalUsd: 16800,
    taxOrCustomsUsd: 0,
    totalAmountUsd: 16800,
    totalAmountYer: 8988000,
    status: 'paid',
    dueDate: '2025-05-30',
    contactPerson: 'Mr. David Miller — Fleet Procurement',
    notes: 'إيجار 4 مركبات (2 لاندكروزر مصفحة B6 + 2 برادو ميداني) مع سائقين شامل الصيانة والوقود.'
  },
  {
    id: 'INV-B2B-2025-02',
    lpoNumber: 'LPO-HSA-CORP-4410',
    organizationName: 'مجموعة هائل سعيد أنعم وشركاه — الإدارة الإقليمية',
    orgType: 'corporate',
    billingMonth: 'مايو 2025',
    vehiclesCount: 3,
    totalDaysBilled: 90,
    subtotalUsd: 9400,
    taxOrCustomsUsd: 470,
    totalAmountUsd: 9870,
    totalAmountYer: 5280450,
    status: 'issued_pending',
    dueDate: '2025-06-05',
    contactPerson: 'أ. فيصل العبسي — مدير الحركة والمشتريات',
    notes: 'فاتورة ضريبية شهرية مجمعة لـ 3 مركبات تنفيذية وميدانية لفرق المهندسين والمدراء.'
  },
  {
    id: 'INV-B2B-2025-03',
    lpoNumber: 'LPO-ICRC-SAN-7712',
    organizationName: 'اللجنة الدولية للصليب الأحمر (ICRC) — بعثة صنعاء',
    orgType: 'un_ngo',
    billingMonth: 'أبريل 2025',
    vehiclesCount: 5,
    totalDaysBilled: 150,
    subtotalUsd: 19500,
    taxOrCustomsUsd: 0,
    totalAmountUsd: 19500,
    totalAmountYer: 10432500,
    status: 'paid',
    dueDate: '2025-05-05',
    contactPerson: 'م. سارة المتوكل — قسم الإمداد اللوجستي',
    notes: 'تم السداد بحوالة مصرفية دولية معتمدة وإصدار سند قبض رسمي.'
  }
];
