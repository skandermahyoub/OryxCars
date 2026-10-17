import { AdminCategoryId, AdminModuleId } from '../types';

export interface AdminNavModuleItem {
  id: AdminModuleId;
  labelAr: string;
  labelEn: string;
  descAr: string;
  proposalNumber?: number;
  managerOnly?: boolean;
  countKey?:
    | 'bookings'
    | 'rfqs'
    | 'clients'
    | 'cars'
    | 'drivers'
    | 'inspections'
    | 'maintenance'
    | 'transactions'
    | 'investors'
    | 'fines'
    | 'pricing'
    | 'alerts';
}

export interface AdminNavCategory {
  id: AdminCategoryId;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  accentColor: string;
  items: AdminNavModuleItem[];
}

export const ADMIN_NAVIGATION_CATEGORIES: AdminNavCategory[] = [
  {
    id: 'executive',
    titleAr: 'القيادة والتحليلات',
    titleEn: 'Executive & BI',
    subtitleAr: 'الملخص التنفيذي، عائد المركبات ROI، ورادار التنبيهات',
    accentColor: 'text-amber-400',
    items: [
      {
        id: 'overview',
        labelAr: 'الملخص التنفيذي العام',
        labelEn: 'Executive Overview',
        descAr: 'مؤشرات الأداء الفورية، سعر الصرف، وأحدث العمليات اليومية'
      },
      {
        id: 'roi_analytics',
        labelAr: 'ربحية المركبات والعائد (ROI)',
        labelEn: 'Vehicle ROI Analytics',
        descAr: 'تحليل صافي ربح كل سيارة، نسبة الإشغال، وتكلفة الكيلومتر',
        proposalNumber: 5,
        managerOnly: true,
        countKey: 'cars'
      },
      {
        id: 'alerts_radar',
        labelAr: 'رادار التنبيهات والوثائق الذكي',
        labelEn: 'Proactive Alerts Radar',
        descAr: 'تنبيهات استباقية لانتهاء التأمين، الجمارك، غيار الزيت، والعقود',
        proposalNumber: 9,
        countKey: 'alerts'
      }
    ]
  },
  {
    id: 'operations',
    titleAr: 'العقود والتشغيل',
    titleEn: 'Contracts & Ops',
    subtitleAr: 'الحجوزات عن بُعد، التفاوض السعري، تقويم الأسطول، والفحص',
    accentColor: 'text-emerald-400',
    items: [
      {
        id: 'orders',
        labelAr: 'الحجوزات عن بُعد والتفاوض والعقود (QR)',
        labelEn: 'Remote Bookings, Negotiation & Contracts',
        descAr: 'إدارة حجوزات العملاء عن بُعد، عروض التفاوض السعري، والعقود الموثقة',
        proposalNumber: 1,
        countKey: 'bookings'
      },
      {
        id: 'fleet_timeline',
        labelAr: 'تقويم توفر الأسطول ومنع التضارب',
        labelEn: 'Fleet Availability Timeline',
        descAr: 'مصفوفة زمنية تفاعلية لحجوزات المركبات وتمديد العقود الفوري',
        proposalNumber: 4,
        countKey: 'cars'
      },
      {
        id: 'handover',
        labelAr: 'مخطط الخدوش والتصفية الآلية',
        labelEn: '360° Inspection & Settlement',
        descAr: 'فحص هيكل السيارة التفاعلي وحساب صافي رد التأمين آلياً',
        proposalNumber: 2,
        countKey: 'inspections'
      },
      {
        id: 'dynamic_pricing',
        labelAr: 'محرك التسعير الديناميكي والمواسم',
        labelEn: 'Dynamic & Seasonal Pricing',
        descAr: 'قواعد أسعار المواسم، الأعياد، الوفود، وخصومات المدد الطويلة',
        proposalNumber: 5,
        managerOnly: true,
        countKey: 'pricing'
      }
    ]
  },
  {
    id: 'assets',
    titleAr: 'الأسطول والمستثمرون',
    titleEn: 'Fleet & Investors',
    subtitleAr: 'سجل السيارات، عقود المستثمرين، الصيانة، والمخالفات والحوادث',
    accentColor: 'text-sky-400',
    items: [
      {
        id: 'fleet',
        labelAr: 'سجل السيارات والتسعير الأساسي',
        labelEn: 'Fleet Registry & Rates',
        descAr: 'إدارة المركبات المتوفرة، المواصفات، الأسعار، وصفحات الهبوط',
        countKey: 'cars'
      },
      {
        id: 'investors',
        labelAr: 'سيارات المستثمرين وتقاسم الأرباح',
        labelEn: 'Investor Fleet & Revenue Split',
        descAr: 'إدارة المركبات الخارجية وحساب عمولة الشركة وصافي المالك آلياً',
        proposalNumber: 3,
        managerOnly: true,
        countKey: 'investors'
      },
      {
        id: 'maintenance',
        labelAr: 'الصيانة الدورية والتأمين الشامل',
        labelEn: 'Maintenance & Insurance',
        descAr: 'متابعة الزيوت، الفلاتر، وثائق التأمين، وتراخيص المرور',
        countKey: 'maintenance'
      },
      {
        id: 'fines_incidents',
        labelAr: 'المخالفات المرورية والحوادث',
        labelEn: 'Traffic Fines & Incidents',
        descAr: 'ربط المخالفات والحوادث بالعقد وتحديد المسؤولية المالية',
        proposalNumber: 6,
        countKey: 'fines'
      }
    ]
  },
  {
    id: 'relations',
    titleAr: 'العملاء والمنظمات',
    titleEn: 'CRM, B2B & Comms',
    subtitleAr: 'الضمانات والقائمة السوداء، فوترة المنظمات، الكباتن، وواتساب',
    accentColor: 'text-violet-400',
    items: [
      {
        id: 'crm',
        labelAr: 'ملفات العملاء، الضمانات والقائمة السوداء',
        labelEn: 'Client CRM, KYC & Blacklist',
        descAr: 'التقييم الائتماني، فحص الكفالات التجارية، وقائمة الحظر المشتركة',
        proposalNumber: 8,
        countKey: 'clients'
      },
      {
        id: 'rfq',
        labelAr: 'مناقصات وفوترة المنظمات الشهرية (B2B)',
        labelEn: 'UN/NGO Tenders & LPO Billing',
        descAr: 'عروض أسعار المنظمات وإصدار الفواتير الشهرية المجمعة وأوامر الشراء',
        proposalNumber: 7,
        countKey: 'rfqs'
      },
      {
        id: 'drivers',
        labelAr: 'السائقون والكباتن المعتمدون',
        labelEn: 'Certified Chauffeurs',
        descAr: 'بيانات الكباتن، الرخص، العهد الميدانية، وصرف المستحقات',
        countKey: 'drivers'
      },
      {
        id: 'whatsapp_hub',
        labelAr: 'مركز إشعارات وقوالب واتساب التلقائية',
        labelEn: 'Automated WhatsApp Hub',
        descAr: 'إرسال عقود التأجير، تذكير الانتهاء، وموقع الكابتن بضغطة زر',
        proposalNumber: 10
      }
    ]
  },
  {
    id: 'finance_cms',
    titleAr: 'الهوية والخزينة',
    titleEn: 'Identity & Treasury',
    subtitleAr: 'لوحة تخصيص هوية المكتب الموحدة، الخزينة، ومحرر الواجهة',
    accentColor: 'text-rose-400',
    items: [
      {
        id: 'agency_identity',
        labelAr: 'لوحة تخصيص هوية المكتب الشاملة (White-Label)',
        labelEn: 'Unified Agency Brand & Style Studio',
        descAr: 'تخصيص الشعار، الاسم، السلوجون، ألوان الهوية، الهاتف، والواتساب في شاشة واحدة',
        managerOnly: true
      },
      {
        id: 'accounting',
        labelAr: 'الخزينة والمحافظ الإلكترونية',
        labelEn: 'Treasury & E-Wallets',
        descAr: 'أرصدة الكريمي، فلوسك، جوالي، جيب، وسندات القبض والصرف',
        managerOnly: true,
        countKey: 'transactions'
      },
      {
        id: 'cms',
        labelAr: 'محرر أقسام الصفحة الرئيسية التفصيلي (CMS)',
        labelEn: 'Detailed Homepage Sections CMS',
        descAr: 'التحكم التفصيلي بشرائح العرض، الباقات، المقالات، وترتيب الأقسام',
        managerOnly: true
      }
    ]
  }
];

export function findCategoryByModule(moduleId: AdminModuleId): AdminNavCategory {
  const normalized = moduleId === 'drivers_rfq' ? 'drivers' : moduleId;
  for (const cat of ADMIN_NAVIGATION_CATEGORIES) {
    if (cat.items.some((item) => item.id === normalized)) {
      return cat;
    }
  }
  return ADMIN_NAVIGATION_CATEGORIES[0];
}

export function findModuleItem(moduleId: AdminModuleId): AdminNavModuleItem {
  const normalized = moduleId === 'drivers_rfq' ? 'drivers' : moduleId;
  for (const cat of ADMIN_NAVIGATION_CATEGORIES) {
    const found = cat.items.find((item) => item.id === normalized);
    if (found) return found;
  }
  return ADMIN_NAVIGATION_CATEGORIES[0].items[0];
}
