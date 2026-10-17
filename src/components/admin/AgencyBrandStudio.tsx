import React, { useState } from 'react';
import { HomepageCmsConfig, ThemePalette, BrandCornerStyle } from '../../types/cms';
import { Car, Booking, FinancialTransaction, InvestorCarRecord } from '../../types';
import { DEFAULT_LOGO_IMAGE } from '../../data/defaultCmsData';
import {
  Palette,
  Upload,
  Phone,
  MessageCircle,
  Building2,
  Sparkles,
  Check,
  RotateCcw,
  Download,
  FileSpreadsheet,
  Globe,
  MapPin,
  Mail,
  Sun,
  Moon,
  Eye,
  Wand2,
  ShieldCheck,
  Copy
} from 'lucide-react';

export interface BrandPresetTemplate {
  id: string;
  badge: string;
  companyName: string;
  companyNameEn: string;
  logoText: string;
  slogan: string;
  sloganEn: string;
  welcomeTitle: string;
  directPhone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  cityAr: string;
  crNumber: string;
  themePalette: ThemePalette;
  primaryColorHex: string;
  secondaryColorHex: string;
  cornerStyle: BrandCornerStyle;
  defaultThemeMode: 'dark' | 'light';
}

export const AGENCY_DEMO_PRESETS: BrandPresetTemplate[] = [
  {
    id: 'united_gold',
    badge: 'الافتراضي — ذهبي ملكي',
    companyName: 'الشركة المتحدة لتأجير السيارات — صنعاء',
    companyNameEn: "United Car Rental - Sana'a",
    logoText: 'المتحدة',
    slogan: 'خدمات تأجير السيارات المعتمدة للمنظمات الدولية، قطاع الأعمال، والأفراد',
    sloganEn: 'Certified Car Rental Services for UN/NGOs, Corporations & Individuals',
    welcomeTitle: 'شريكك الموثوق لتأجير السيارات الحديثة والحجز عن بُعد في صنعاء والمحافظات',
    directPhone: '+967 771 234 567',
    whatsappNumber: '967771234567',
    email: 'booking@united-cars-ye.com',
    address: 'صنعاء — شارع حدة الرئيسي — جوار المركز التجاري',
    cityAr: 'صنعاء',
    crNumber: 'س.ت 109482 - أمانة العاصمة',
    themePalette: 'obsidian-gold',
    primaryColorHex: '#D4AF37',
    secondaryColorHex: '#F59E0B',
    cornerStyle: 'rounded_luxury',
    defaultThemeMode: 'dark'
  },
  {
    id: 'royal_horizon_emerald',
    badge: 'زمردي دبلوماسي',
    companyName: 'مؤسسة الأفق الملكي لتأجير السيارات الحديثة',
    companyNameEn: 'Royal Horizon Car Rental',
    logoText: 'الأفق الملكي',
    slogan: 'الحجز الفوري عن بُعد، التفاوض المرن، وتسليم السيارة إلى باب موقعك',
    sloganEn: 'Instant Remote Booking, Flexible Negotiation & Doorstep Delivery',
    welcomeTitle: 'اختر سيارتك المتوفرة الآن، تفاوض على السعر، وأتمم معاملتك عن بُعد قبل الاستلام',
    directPhone: '+967 777 889 900',
    whatsappNumber: '967777889900',
    email: 'info@royalhorizon-ye.com',
    address: 'صنعاء — الحي السياسي — تقاطع شارع الجزائر',
    cityAr: 'صنعاء',
    crNumber: 'س.ت 224910 - صنعاء',
    themePalette: 'royal-emerald',
    primaryColorHex: '#10B981',
    secondaryColorHex: '#059669',
    cornerStyle: 'rounded_luxury',
    defaultThemeMode: 'dark'
  },
  {
    id: 'elite_speed_crimson',
    badge: 'أحمر رياضي تنفيذي',
    companyName: 'النخبة السريعة لتأجير السيارات وخدمات الـ VIP',
    companyNameEn: 'Elite Speed VIP Car Rental',
    logoText: 'النخبة VIP',
    slogan: 'أسطول موديلات السنة بأسعار تنافسية وإجراءات تعاقد إلكترونية خلال دقائق',
    sloganEn: 'Latest Fleet Models with Competitive Rates & Fast Digital Contracts',
    welcomeTitle: 'أسطولنا جاهز للاستلام الفوري — استعرض السيارات المتوفرة وتفاوض مباشرة مع الإدارة',
    directPhone: '+967 733 445 566',
    whatsappNumber: '967733445566',
    email: 'vip@elitespeed-ye.com',
    address: 'عدن — خور مكسر — الخط البحري / فرع صنعاء ش. الستين',
    cityAr: 'عدن / صنعاء',
    crNumber: 'س.ت 88312 - عدن وصنعاء',
    themePalette: 'carbon-crimson',
    primaryColorHex: '#EF4444',
    secondaryColorHex: '#DC2626',
    cornerStyle: 'sharp_executive',
    defaultThemeMode: 'dark'
  },
  {
    id: 'sheba_sapphire_blue',
    badge: 'أزرق مؤسسي ملكي',
    companyName: 'شركة سبأ الدولية لتأجير السيارات والعقود',
    companyNameEn: 'Sheba International Car Rental',
    logoText: 'سبأ الدولية',
    slogan: 'شفافية الأسعار، سهولة الحجز عن بُعد، وخدمة عملاء على مدار الساعة 24/7',
    sloganEn: 'Transparent Pricing, Easy Remote Booking & 24/7 Customer Care',
    welcomeTitle: 'منظومة خدمة العملاء الذكية لمعرفة السيارات المتوفرة حالياً وإتمام الحجز عن بُعد',
    directPhone: '+967 711 223 344',
    whatsappNumber: '967711223344',
    email: 'care@shebacars.com',
    address: 'صنعاء — شارع الزبيري — برج الأعمال الطابق الأول',
    cityAr: 'صنعاء',
    crNumber: 'س.ت 55190 - الجمهورية اليمنية',
    themePalette: 'sapphire-blue',
    primaryColorHex: '#3B82F6',
    secondaryColorHex: '#2563EB',
    cornerStyle: 'rounded_luxury',
    defaultThemeMode: 'light'
  }
];

export const PALETTE_OPTIONS: {
  id: ThemePalette;
  nameAr: string;
  descAr: string;
  primaryHex: string;
  secondaryHex: string;
  previewBg: string;
}[] = [
  {
    id: 'obsidian-gold',
    nameAr: 'الذهبي الملكي الفاخر',
    descAr: 'هوية كلاسيكية فخمة لمكاتب الـ VIP والسيارات الحديثة',
    primaryHex: '#D4AF37',
    secondaryHex: '#F59E0B',
    previewBg: 'from-amber-500 to-yellow-600'
  },
  {
    id: 'royal-emerald',
    nameAr: 'الأخضر الزمردي الدبلوماسي',
    descAr: 'يعكس الثقة والأمان والاستقرار المؤسسي',
    primaryHex: '#10B981',
    secondaryHex: '#059669',
    previewBg: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'carbon-crimson',
    nameAr: 'الأحمر الرياضي التنفيذي',
    descAr: 'هوية عصرية جريئة لمكاتب التأجير السريع والرياضي',
    primaryHex: '#EF4444',
    secondaryHex: '#DC2626',
    previewBg: 'from-red-500 to-rose-700'
  },
  {
    id: 'sapphire-blue',
    nameAr: 'الأزرق المؤسسي الملكي',
    descAr: 'طابع شركات الطيران والخدمات اللوجستية المعتمدة',
    primaryHex: '#3B82F6',
    secondaryHex: '#2563EB',
    previewBg: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'desert-bronze',
    nameAr: 'البرونزي الصحراوي الأصيل',
    descAr: 'مناسب لأساطيل الدفع الرباعي 4x4 والرحلات',
    primaryHex: '#D97706',
    secondaryHex: '#B45309',
    previewBg: 'from-orange-500 to-amber-700'
  },
  {
    id: 'alabaster-amber',
    nameAr: 'النهاري العاجي الرسمي',
    descAr: 'خلفية بيضاء ناصعة عالية التباين للمكاتب الرسمية',
    primaryHex: '#B45309',
    secondaryHex: '#92400E',
    previewBg: 'from-amber-600 to-stone-700'
  }
];

/**
 * Generates a clean SVG Data URL emblem with the agency's short name and chosen brand color.
 */
export function generateMonogramLogoDataUrl(shortName: string, primaryHex: string): string {
  const cleanText = (shortName || 'مكتبنا').trim().slice(0, 14);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="240" height="240">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f172a"/>
        <stop offset="100%" stop-color="#020617"/>
      </linearGradient>
      <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${primaryHex}"/>
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0.85"/>
      </linearGradient>
    </defs>
    <rect width="240" height="240" rx="48" fill="url(#bgGrad)"/>
    <rect x="10" y="10" width="220" height="220" rx="40" fill="none" stroke="${primaryHex}" stroke-width="4" stroke-opacity="0.75"/>
    <rect x="20" y="20" width="200" height="200" rx="32" fill="none" stroke="${primaryHex}" stroke-width="1.5" stroke-dasharray="6 4" stroke-opacity="0.4"/>
    <path d="M70 92 L120 62 L170 92 L155 92 L120 72 L85 92 Z" fill="${primaryHex}"/>
    <circle cx="120" cy="52" r="5" fill="${primaryHex}"/>
    <text x="120" y="142" text-anchor="middle" fill="#ffffff" font-family="Cairo, Arial, sans-serif" font-weight="900" font-size="28">${cleanText}</text>
    <text x="120" y="176" text-anchor="middle" fill="${primaryHex}" font-family="Cairo, Arial, sans-serif" font-weight="700" font-size="13" letter-spacing="1.5">CAR RENTAL VIP</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Dynamic CSS Variable & Brand Palette Engine
 * Injects real-time CSS overrides so the chosen primary color and corner style apply globally!
 */
export const DynamicBrandStyleEngine: React.FC<{ cms: HomepageCmsConfig }> = ({ cms }) => {
  const palette = cms.themePalette;
  const brand = cms.brandIdentity;
  const primaryHex =
    brand?.primaryColorHex ||
    PALETTE_OPTIONS.find((p) => p.id === palette)?.primaryHex ||
    '#D4AF37';
  const secondaryHex =
    brand?.secondaryColorHex ||
    PALETTE_OPTIONS.find((p) => p.id === palette)?.secondaryHex ||
    '#F59E0B';
  const isSharp = brand?.cornerStyle === 'sharp_executive';

  // Only override default amber/gold classes when user picks a non-gold palette or custom color
  const shouldOverrideAccent =
    palette === 'royal-emerald' ||
    palette === 'sapphire-blue' ||
    palette === 'desert-bronze' ||
    palette === 'carbon-crimson' ||
    palette === 'custom-brand' ||
    (primaryHex.toUpperCase() !== '#D4AF37' && primaryHex.toUpperCase() !== '#F59E0B');

  return (
    <style>{`
      :root {
        --brand-primary: ${primaryHex};
        --brand-secondary: ${secondaryHex};
      }
      ${
        shouldOverrideAccent
          ? `
        .bg-amber-500, .bg-amber-400, .bg-\\[\\#D4AF37\\] {
          background-color: ${primaryHex} !important;
          color: #ffffff !important;
        }
        .hover\\:bg-amber-400:hover, .hover\\:bg-amber-500:hover, .hover\\:bg-\\[\\#e5c247\\]:hover {
          background-color: ${secondaryHex} !important;
          color: #ffffff !important;
        }
        .text-amber-400, .text-amber-300, .text-amber-500, .text-\\[\\#D4AF37\\] {
          color: ${primaryHex} !important;
        }
        .border-amber-500, .border-amber-400, .border-amber-500\\/40, .border-amber-500\\/30, .border-\\[\\#D4AF37\\], .border-\\[\\#D4AF37\\]\\/40 {
          border-color: ${primaryHex} !important;
        }
        .bg-amber-500\\/10, .bg-amber-500\\/15, .bg-amber-500\\/20, .bg-\\[\\#D4AF37\\]\\/10, .bg-\\[\\#D4AF37\\]\\/15 {
          background-color: color-mix(in srgb, ${primaryHex} 15%, transparent) !important;
        }
      `
          : ''
      }
      ${
        isSharp
          ? `
        .rounded-3xl, .rounded-2xl {
          border-radius: 0.5rem !important;
        }
        .rounded-xl {
          border-radius: 0.375rem !important;
        }
      `
          : ''
      }
    `}</style>
  );
};

/**
 * Helper to download UTF-8 BOM CSV for Microsoft Excel Arabic support
 */
export function downloadExcelCsv(filename: string, headers: string[], rows: (string | number)[][]) {
  const escapeCsvCell = (val: string | number) => {
    const str = String(val ?? '').replace(/"/g, '""');
    return `"${str}"`;
  };
  const csvContent =
    '\uFEFF' +
    [headers.map(escapeCsvCell).join(','), ...rows.map((r) => r.map(escapeCsvCell).join(','))].join(
      '\r\n'
    );
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

interface AgencyBrandStudioProps {
  cms: HomepageCmsConfig;
  onUpdateCms: (updated: HomepageCmsConfig) => void;
  onResetDefaultCms: () => void;
  themeMode: 'dark' | 'light';
  onToggleThemeMode: (mode: 'dark' | 'light') => void;
  onPreviewLiveLanding: () => void;
  cars: Car[];
  bookings: Booking[];
  transactions: FinancialTransaction[];
  investors?: InvestorCarRecord[];
}

export const AgencyBrandStudio: React.FC<AgencyBrandStudioProps> = ({
  cms,
  onUpdateCms,
  onResetDefaultCms,
  themeMode,
  onToggleThemeMode,
  onPreviewLiveLanding,
  cars,
  bookings,
  transactions,
  investors = []
}) => {
  // Unified Form State initialized from current CMS
  const [logoUrl, setLogoUrl] = useState<string>(cms.header.logoUrl || DEFAULT_LOGO_IMAGE);
  const [logoText, setLogoText] = useState<string>(cms.header.logoText || 'المتحدة');
  const [companyName, setCompanyName] = useState<string>(cms.header.companyName || '');
  const [companyNameEn, setCompanyNameEn] = useState<string>(cms.header.companyNameEn || '');
  const [slogan, setSlogan] = useState<string>(cms.header.slogan || '');
  const [sloganEn, setSloganEn] = useState<string>(cms.header.sloganEn || '');
  const [welcomeTitle, setWelcomeTitle] = useState<string>(cms.header.welcomeTitle || '');

  // Contact & WhatsApp
  const [directPhone, setDirectPhone] = useState<string>(
    cms.contact.directPhone || cms.footer.phone || '+967 771 234 567'
  );
  const [whatsappNumber, setWhatsappNumber] = useState<string>(
    cms.contact.whatsappNumber || '967771234567'
  );
  const [officialEmail, setOfficialEmail] = useState<string>(
    cms.contact.officialEmail || cms.footer.email || 'booking@sanaa-rental.ye'
  );
  const [mainAddress, setMainAddress] = useState<string>(
    cms.footer.mainGeoAddress || 'صنعاء — شارع حدة الرئيسي'
  );
  const [cityNameAr, setCityNameAr] = useState<string>(
    cms.brandIdentity?.cityNameAr || 'صنعاء'
  );
  const [crNumber, setCrNumber] = useState<string>(
    cms.brandIdentity?.crNumber || 'س.ت 109482 - أمانة العاصمة'
  );
  const [workingHoursAr, setWorkingHoursAr] = useState<string>(
    cms.brandIdentity?.workingHoursAr || 'يومياً من 8:00 صباحاً حتى 10:00 مساءً (طوارئ ومطار 24/7)'
  );

  // Style & Colors
  const [selectedPalette, setSelectedPalette] = useState<ThemePalette>(
    cms.themePalette || 'obsidian-gold'
  );
  const [primaryColorHex, setPrimaryColorHex] = useState<string>(
    cms.brandIdentity?.primaryColorHex ||
      PALETTE_OPTIONS.find((p) => p.id === cms.themePalette)?.primaryHex ||
      '#D4AF37'
  );
  const [secondaryColorHex, setSecondaryColorHex] = useState<string>(
    cms.brandIdentity?.secondaryColorHex ||
      PALETTE_OPTIONS.find((p) => p.id === cms.themePalette)?.secondaryHex ||
      '#F59E0B'
  );
  const [cornerStyle, setCornerStyle] = useState<BrandCornerStyle>(
    cms.brandIdentity?.cornerStyle || 'rounded_luxury'
  );

  const [savedNotice, setSavedNotice] = useState<string>('');

  // Upload Logo from device
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setLogoUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Auto-generate SVG monogram logo with current short name & primary color
  const handleGenerateAutoLogo = () => {
    const generated = generateMonogramLogoDataUrl(logoText || companyName.slice(0, 10), primaryColorHex);
    setLogoUrl(generated);
  };

  // Apply unified brand identity across ALL sections of CMS (Header, About, Contact, Footer, Ticker, Theme)
  const handleSaveAndApplyAll = () => {
    const cleanWa = whatsappNumber.replace(/[^0-9]/g, '');
    const updatedCms: HomepageCmsConfig = {
      ...cms,
      themePalette: selectedPalette,
      brandIdentity: {
        primaryColorHex,
        secondaryColorHex,
        cornerStyle,
        defaultThemeMode: themeMode,
        cityNameAr,
        cityNameEn: cityNameAr === 'عدن' ? 'Aden' : 'Sanaa',
        workingHoursAr,
        crNumber
      },
      header: {
        ...cms.header,
        logoUrl,
        logoText,
        companyName,
        companyNameEn,
        slogan,
        sloganEn,
        welcomeTitle
      },
      about: {
        ...cms.about,
        sectionTitle: `${companyName} — شريكك المعتمد في اليمن`
      },
      contact: {
        ...cms.contact,
        directPhone,
        whatsappNumber: cleanWa || whatsappNumber,
        officialEmail
      },
      footer: {
        ...cms.footer,
        logoText,
        companyName,
        slogan,
        phone: directPhone,
        email: officialEmail,
        mainGeoAddress: mainAddress,
        copyrightText: `© ${new Date().getFullYear()} ${companyName}. جميع الحقوق محفوظة.`
      }
    };

    onUpdateCms(updatedCms);
    setSavedNotice('تم تطبيق الهوية الجديدة (الشعار، الاسم، السلوجون، الألوان، الهاتف، والواتساب) على كامل التطبيق والعقود والواجهة فوراً!');
    setTimeout(() => setSavedNotice(''), 5000);
  };

  // Apply 1-click preset
  const handleApplyPreset = (preset: BrandPresetTemplate) => {
    const autoLogo =
      preset.id === 'united_gold'
        ? DEFAULT_LOGO_IMAGE
        : generateMonogramLogoDataUrl(preset.logoText, preset.primaryColorHex);

    setLogoUrl(autoLogo);
    setLogoText(preset.logoText);
    setCompanyName(preset.companyName);
    setCompanyNameEn(preset.companyNameEn);
    setSlogan(preset.slogan);
    setSloganEn(preset.sloganEn);
    setWelcomeTitle(preset.welcomeTitle);
    setDirectPhone(preset.directPhone);
    setWhatsappNumber(preset.whatsappNumber);
    setOfficialEmail(preset.email);
    setMainAddress(preset.address);
    setCityNameAr(preset.cityAr);
    setCrNumber(preset.crNumber);
    setSelectedPalette(preset.themePalette);
    setPrimaryColorHex(preset.primaryColorHex);
    setSecondaryColorHex(preset.secondaryColorHex);
    setCornerStyle(preset.cornerStyle);
    onToggleThemeMode(preset.defaultThemeMode);

    const updatedCms: HomepageCmsConfig = {
      ...cms,
      themePalette: preset.themePalette,
      brandIdentity: {
        primaryColorHex: preset.primaryColorHex,
        secondaryColorHex: preset.secondaryColorHex,
        cornerStyle: preset.cornerStyle,
        defaultThemeMode: preset.defaultThemeMode,
        cityNameAr: preset.cityAr,
        cityNameEn: 'Yemen',
        workingHoursAr,
        crNumber: preset.crNumber
      },
      header: {
        ...cms.header,
        logoUrl: autoLogo,
        logoText: preset.logoText,
        companyName: preset.companyName,
        companyNameEn: preset.companyNameEn,
        slogan: preset.slogan,
        sloganEn: preset.sloganEn,
        welcomeTitle: preset.welcomeTitle
      },
      about: {
        ...cms.about,
        sectionTitle: `${preset.companyName} — شريكك المعتمد`
      },
      contact: {
        ...cms.contact,
        directPhone: preset.directPhone,
        whatsappNumber: preset.whatsappNumber,
        officialEmail: preset.email
      },
      footer: {
        ...cms.footer,
        logoText: preset.logoText,
        companyName: preset.companyName,
        slogan: preset.slogan,
        phone: preset.directPhone,
        email: preset.email,
        mainGeoAddress: preset.address,
        copyrightText: `© ${new Date().getFullYear()} ${preset.companyName}. جميع الحقوق محفوظة.`
      }
    };
    onUpdateCms(updatedCms);
    setSavedNotice(`تم التبديل الفوري إلى هوية «${preset.companyName}» بنجاح!`);
    setTimeout(() => setSavedNotice(''), 4000);
  };

  // Clear fields for live client entry during a sales pitch
  const handleClearForNewClient = () => {
    setLogoText('اسم المكتب');
    setCompanyName('');
    setCompanyNameEn('');
    setSlogan('خدمات تأجير السيارات الحديثة والحجز عن بُعد بأسعار تنافسية');
    setSloganEn('Modern Car Rental & Remote Booking Services');
    setDirectPhone('+967 77');
    setWhatsappNumber('96777');
    setMainAddress('صنعاء — ');
    setSavedNotice('تم تجهيز الحقول لتعبئة بيانات مكتب العميل الجديد مباشرة!');
    setTimeout(() => setSavedNotice(''), 3500);
  };

  // Export Excel CSV handlers
  const handleExportBookingsCsv = () => {
    downloadExcelCsv(
      `حجوزات_وعقود_${logoText}_${new Date().toISOString().split('T')[0]}.csv`,
      [
        'رقم العقد',
        'اسم العميل',
        'رقم الهاتف',
        'المركبة',
        'تاريخ البدء',
        'تاريخ الانتهاء',
        'الأيام',
        'الإجمالي (ر.ي)',
        'الإجمالي ($)',
        'السعر التفاوضي المقترح',
        'حالة التفاوض',
        'حالة العقد',
        'المحفظة المالية'
      ],
      bookings.map((b) => [
        b.id,
        b.customerName,
        b.customerPhone,
        b.carName,
        b.startDate,
        b.endDate,
        b.days,
        b.totalAmountYer,
        b.totalAmountUsd,
        b.proposedTotalYer || b.totalAmountYer,
        b.negotiationStatus || 'قياسي',
        b.bookingStatus,
        b.walletUsed
      ])
    );
  };

  const handleExportFleetCsv = () => {
    downloadExcelCsv(
      `أسطول_السيارات_${logoText}_${new Date().toISOString().split('T')[0]}.csv`,
      [
        'كود المركبة',
        'اسم السيارة',
        'الموديل',
        'رقم اللوحة',
        'السعر اليومي (ر.ي)',
        'السعر اليومي ($)',
        'التأمين المسترد (ر.ي)',
        'الحالة الحالية',
        'الموقع'
      ],
      cars.map((c) => [
        c.id,
        c.name,
        c.modelYear,
        c.plateNumber,
        c.pricePerDayYer,
        c.pricePerDayUsd,
        c.securityDepositYer,
        c.available ? 'متوفرة الآن' : 'مؤجرة',
        c.currentLocation
      ])
    );
  };

  const handleExportTreasuryCsv = () => {
    downloadExcelCsv(
      `سندات_الخزينة_${logoText}_${new Date().toISOString().split('T')[0]}.csv`,
      ['رقم السند', 'التاريخ', 'النوع', 'الطرف/العميل', 'المبلغ (ر.ي)', 'المبلغ ($)', 'المحفظة/البنك', 'البيان'],
      transactions.map((t) => [
        t.id,
        t.date,
        t.type === 'receipt' ? 'سند قبض' : t.type === 'refund' ? 'رد تأمين' : 'سند صرف',
        t.partyName,
        t.amountYer,
        t.amountUsd,
        t.wallet,
        t.description
      ])
    );
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner & Instant Save Action */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-2">
              <Palette className="w-3.5 h-3.5" />
              <span>لوحة تخصيص هوية المكتب الموحدة (All-in-One White-Label Studio)</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-white">
              تخصيص الشعار، الاسم، السلوجون، الاستايل، الهاتف، والواتساب في شاشة واحدة
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              عبّئ بيانات أي مكتب تأجير سيارات هنا واضغط «تطبيق الهوية فوراً» ليتحول التطبيق بالكامل (الواجهة، الألوان، العقود، وأزرار الواتساب) إلى علامته التجارية.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleSaveAndApplyAll}
              style={{ backgroundColor: primaryColorHex }}
              className="px-5 py-3 rounded-xl text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg transition hover:opacity-95"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>حفظ وتطبيق الهوية على كامل النظام</span>
            </button>

            <button
              type="button"
              onClick={onPreviewLiveLanding}
              className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 font-bold text-xs flex items-center gap-1.5 transition"
            >
              <Eye className="w-4 h-4 text-amber-400" />
              <span>معاينة واجهة العملاء</span>
            </button>
          </div>
        </div>

        {savedNotice && (
          <div className="mt-4 p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{savedNotice}</span>
          </div>
        )}
      </div>

      {/* Quick Pre-Sales Demo Presets Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="text-xs font-black text-slate-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>قوالب جاهزة للعروض التسويقية الفورية أمام أصحاب المكاتب (بضغطة زر):</span>
          </div>
          <button
            type="button"
            onClick={handleClearForNewClient}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] font-bold border border-slate-700 transition"
          >
            + تفريغ الحقول لتعبئة مكتب عميل جديد
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {AGENCY_DEMO_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              className="p-3 rounded-xl bg-slate-950/90 hover:bg-slate-950 border border-slate-800 hover:border-slate-600 text-right transition flex items-start gap-3 group"
            >
              <span
                className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-white font-black text-xs shadow-md mt-0.5"
                style={{ backgroundColor: preset.primaryColorHex }}
              >
                {preset.logoText.slice(0, 2)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-bold text-slate-400">{preset.badge}</div>
                <div className="text-xs font-black text-slate-100 truncate mt-0.5">
                  {preset.companyName}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">{preset.directPhone}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* LIVE INTERACTIVE BRAND PREVIEW CARD */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <div className="text-[11px] font-bold text-slate-400 mb-3 flex items-center justify-between">
          <span>معاينة حية ومباشرة لهوية المكتب في الهيدر وواجهة العملاء:</span>
          <span className="font-mono text-[10px]" style={{ color: primaryColorHex }}>
            {primaryColorHex} • {cornerStyle === 'rounded_luxury' ? 'حواف دائرية فاخرة' : 'حواف هندسية رسمية'}
          </span>
        </div>

        <div
          className={`p-4 sm:p-5 bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
            cornerStyle === 'rounded_luxury' ? 'rounded-2xl' : 'rounded-md'
          }`}
          style={{ borderColor: `${primaryColorHex}55` }}
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <img
              src={logoUrl || DEFAULT_LOGO_IMAGE}
              alt={companyName}
              className={`w-14 h-14 object-cover border-2 shrink-0 shadow-lg ${
                cornerStyle === 'rounded_luxury' ? 'rounded-2xl' : 'rounded-md'
              }`}
              style={{ borderColor: primaryColorHex }}
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="px-2 py-0.5 text-[10px] font-black rounded text-slate-950"
                  style={{ backgroundColor: primaryColorHex }}
                >
                  {logoText || 'الشعار'}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">{crNumber}</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white truncate mt-1">
                {companyName || 'اسم مكتب تأجير السيارات'}
              </h3>
              <p className="text-xs text-slate-300 truncate mt-0.5">
                {slogan || 'السلوجون التعريفي للمكتب يظهر هنا تحت الاسم مباشرة'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center gap-1.5 text-slate-200 font-mono">
              <Phone className="w-3.5 h-3.5" style={{ color: primaryColorHex }} />
              <span>{directPhone}</span>
            </div>
            <a
              href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>واتساب الحجز والتفاوض</span>
            </a>
          </div>
        </div>
      </div>

      {/* UNIFIED 4-QUADRANT CUSTOMIZATION FORM (ALL IN ONE SCREEN) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* RIGHT COLUMN (7 Cols): 1. Logo + 2. Name & Slogan + 3. Phone & WhatsApp */}
        <div className="lg:col-span-7 space-y-6">
          {/* BOX 1: الشعار (Logo Customizer) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Upload className="w-4 h-4 text-amber-400" />
              <span>١. شعار المكتب (رفع صورة / توليد شعار تلقائي / رابط)</span>
            </h3>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img
                src={logoUrl || DEFAULT_LOGO_IMAGE}
                alt="Logo Preview"
                className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-700 bg-slate-950 shrink-0"
              />

              <div className="flex-1 space-y-2.5 w-full">
                <div className="flex flex-wrap gap-2">
                  <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs inline-flex items-center gap-1.5 transition">
                    <Upload className="w-3.5 h-3.5" />
                    <span>رفع صورة الشعار من الجهاز</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={handleGenerateAutoLogo}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 font-bold text-xs inline-flex items-center gap-1.5 transition"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>توليد شعار ملكي باسم المكتب ولون الهوية</span>
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    أو أدخل رابط الشعار المباشر (URL):
                  </label>
                  <input
                    type="text"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* BOX 2: الاسم والسلوجون (Name & Slogan) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>٢. اسم المكتب والسلوجون (العلامة التجارية والرسالة التسويقية)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  اسم مكتب / شركة تأجير السيارات (عربي):
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="مثال: شركة الأفق الملكي لتأجير السيارات"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  الاسم المختصر للشعار:
                </label>
                <input
                  type="text"
                  value={logoText}
                  onChange={(e) => setLogoText(e.target.value)}
                  placeholder="مثال: الأفق الملكي"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-bold text-amber-400 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                السلوجون / الشعار اللفظي للمكتب (Slogan بالعربية):
              </label>
              <input
                type="text"
                value={slogan}
                onChange={(e) => setSlogan(e.target.value)}
                placeholder="مثال: الحجز عن بُعد، التفاوض المرن، وتسليم السيارة إلى موقعك"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  اسم المكتب بالإنجليزية (English Name):
                </label>
                <input
                  type="text"
                  value={companyNameEn}
                  onChange={(e) => setCompanyNameEn(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  السلوجون بالإنجليزية (English Slogan):
                </label>
                <input
                  type="text"
                  value={sloganEn}
                  onChange={(e) => setSloganEn(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                العنوان الترحيبي الرئيسي للعملاء في أول الصفحة:
              </label>
              <input
                type="text"
                value={welcomeTitle}
                onChange={(e) => setWelcomeTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* BOX 3: الهاتف، الواتساب، والعنوان (Phone & WhatsApp) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>٣. أرقام الهاتف والواتساب والعنوان (للحجز والتفاوض عن بُعد)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>رقم هاتف خدمة العملاء المباشر:</span>
                </label>
                <input
                  type="text"
                  value={directPhone}
                  onChange={(e) => setDirectPhone(e.target.value)}
                  placeholder="+967 771 234 567"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>رقم الواتساب الرسمي (للتفاوض والحجز):</span>
                </label>
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="967771234567"
                  className="w-full bg-slate-950 border border-emerald-500/40 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-emerald-300 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  المدينة الرئيسية:
                </label>
                <input
                  type="text"
                  value={cityNameAr}
                  onChange={(e) => setCityNameAr(e.target.value)}
                  placeholder="صنعاء / عدن"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  عنوان المقر الرئيسي للمكتب:
                </label>
                <input
                  type="text"
                  value={mainAddress}
                  onChange={(e) => setMainAddress(e.target.value)}
                  placeholder="صنعاء — شارع حدة..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  رقم السجل التجاري / الترخيص (يظهر في العقود):
                </label>
                <input
                  type="text"
                  value={crNumber}
                  onChange={(e) => setCrNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  البريد الإلكتروني الرسمي:
                </label>
                <input
                  type="text"
                  value={officialEmail}
                  onChange={(e) => setOfficialEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* LEFT COLUMN (5 Cols): 4. Brand Style & Colors + 5. Excel Export & Backup */}
        <div className="lg:col-span-5 space-y-6">
          {/* BOX 4: الاستايل وألوان الهوية البصرية (Brand Colors & Style) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Palette className="w-4 h-4 text-amber-400" />
              <span>٤. الاستايل وألوان الهوية البصرية للمكتب</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                اختر باليت ألوان الهوية الجاهزة:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PALETTE_OPTIONS.map((pal) => {
                  const isActive = selectedPalette === pal.id;
                  return (
                    <button
                      key={pal.id}
                      type="button"
                      onClick={() => {
                        setSelectedPalette(pal.id);
                        setPrimaryColorHex(pal.primaryHex);
                        setSecondaryColorHex(pal.secondaryHex);
                        if (pal.id === 'alabaster-amber') {
                          onToggleThemeMode('light');
                        }
                      }}
                      className={`p-2.5 rounded-xl border text-right transition flex items-center gap-2.5 ${
                        isActive
                          ? 'border-white bg-slate-950 shadow-md'
                          : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                      }`}
                    >
                      <span
                        className="w-7 h-7 rounded-lg shrink-0 border border-white/20 shadow"
                        style={{ backgroundColor: pal.primaryHex }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-white truncate">{pal.nameAr}</div>
                        <div className="text-[10px] text-slate-400 truncate">{pal.descAr}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Hex Color Picker */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-slate-200">
                أو اختر لون شعار المكتب بدقة (تخصيص حر للون الهوية):
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">
                    اللون الأساسي للهوية والأزرار:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={primaryColorHex}
                      onChange={(e) => {
                        setPrimaryColorHex(e.target.value);
                        setSelectedPalette('custom-brand');
                      }}
                      className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border border-slate-700"
                    />
                    <input
                      type="text"
                      value={primaryColorHex}
                      onChange={(e) => {
                        setPrimaryColorHex(e.target.value);
                        setSelectedPalette('custom-brand');
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">
                    اللون الثانوي والتدرج:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={secondaryColorHex}
                      onChange={(e) => {
                        setSecondaryColorHex(e.target.value);
                        setSelectedPalette('custom-brand');
                      }}
                      className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border border-slate-700"
                    />
                    <input
                      type="text"
                      value={secondaryColorHex}
                      onChange={(e) => {
                        setSecondaryColorHex(e.target.value);
                        setSelectedPalette('custom-brand');
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Corner Style & Light/Dark Mode */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1.5">
                  استايل الحواف والبطاقات:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setCornerStyle('rounded_luxury')}
                    className={`py-2 px-2 rounded-xl border text-[11px] font-bold transition ${
                      cornerStyle === 'rounded_luxury'
                        ? 'border-amber-500 bg-amber-500/15 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    دائري عصري
                  </button>
                  <button
                    type="button"
                    onClick={() => setCornerStyle('sharp_executive')}
                    className={`py-2 px-2 rounded-md border text-[11px] font-bold transition ${
                      cornerStyle === 'sharp_executive'
                        ? 'border-amber-500 bg-amber-500/15 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    هندسي رسمي
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1.5">
                  مظهر الخلفية (الوضع العام):
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => onToggleThemeMode('dark')}
                    className={`py-2 px-2 rounded-xl border text-[11px] font-bold flex items-center justify-center gap-1 transition ${
                      themeMode === 'dark'
                        ? 'border-amber-500 bg-amber-500/15 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>ليلي فاخر</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleThemeMode('light')}
                    className={`py-2 px-2 rounded-xl border text-[11px] font-bold flex items-center justify-center gap-1 transition ${
                      themeMode === 'light'
                        ? 'border-amber-500 bg-amber-500/15 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>نهاري فاتح</span>
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSaveAndApplyAll}
              style={{ backgroundColor: primaryColorHex }}
              className="w-full py-3 rounded-xl text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg transition hover:opacity-95"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>تطبيق الهوية والألوان والواتساب الآن</span>
            </button>
          </div>

          {/* BOX 5: تصدير تقارير Excel والنسخ الاحتياطي (CSV / Excel Export) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3.5">
            <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>٥. تصدير السجلات إلى Excel (CSV) للعميل أو المحاسب</span>
            </h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              تصدير مباشر بترميز عربي معتمد يفتح في برنامج Microsoft Excel بضغطة زر واحدة:
            </p>

            <div className="space-y-2">
              <button
                type="button"
                onClick={handleExportBookingsCsv}
                className="w-full p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 flex items-center justify-between transition"
              >
                <span className="flex items-center gap-2">
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>تصدير سجل الحجوزات عن بُعد والتفاوض (Excel CSV)</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400">{bookings.length} عقد</span>
              </button>

              <button
                type="button"
                onClick={handleExportFleetCsv}
                className="w-full p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 flex items-center justify-between transition"
              >
                <span className="flex items-center gap-2">
                  <Download className="w-3.5 h-3.5 text-sky-400" />
                  <span>تصدير قائمة السيارات المتوفرة والأسعار (Excel CSV)</span>
                </span>
                <span className="text-[10px] font-mono text-sky-400">{cars.length} مركبة</span>
              </button>

              <button
                type="button"
                onClick={handleExportTreasuryCsv}
                className="w-full p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 flex items-center justify-between transition"
              >
                <span className="flex items-center gap-2">
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>تصدير كشف الخزينة والمحافظ الإلكترونية (Excel CSV)</span>
                </span>
                <span className="text-[10px] font-mono text-amber-400">{transactions.length} سند</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
