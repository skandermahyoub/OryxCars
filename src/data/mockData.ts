import {
  Car,
  Driver,
  Booking,
  WalletInfo,
  LoyaltyTier,
  InterCityRoute,
  FinancialTransaction,
  RfqRequest,
  ClientProfile,
  VehicleInspectionRecord,
  MaintenanceRecord
} from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_sanaa_fleet_1790624432645.jpg';

// SVG Data URIs for sample verified KYC Documents, Receipts, and Signatures
export const SAMPLE_ID_DOC_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="480" height="280" viewBox="0 0 480 280">
  <rect width="480" height="280" rx="16" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
  <rect x="20" y="20" width="440" height="45" rx="8" fill="#1e293b"/>
  <text x="240" y="48" fill="#f8fafc" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle">الجمهورية اليمنية - البطاقة الشخصية الذكية</text>
  <rect x="340" y="85" width="100" height="120" rx="8" fill="#334155" stroke="#94a3b8"/>
  <text x="390" y="150" fill="#cbd5e1" font-family="sans-serif" font-size="12" text-anchor="middle">صورة الهوية</text>
  <text x="320" y="110" fill="#94a3b8" font-family="sans-serif" font-size="13" text-anchor="end">الاسم: م. هشام عبدالرحمن المتوكل</text>
  <text x="320" y="140" fill="#f59e0b" font-family="monospace" font-size="14" font-weight="bold" text-anchor="end">ID: 01010088921</text>
  <text x="320" y="170" fill="#cbd5e1" font-family="sans-serif" font-size="12" text-anchor="end">محل الإصدار: أمانة العاصمة صنعاء</text>
  <text x="320" y="200" fill="#10b981" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="end">✓ وثيقة رسمية مطابقة وسارية</text>
  <rect x="20" y="230" width="440" height="30" rx="6" fill="#020617"/>
  <text x="240" y="250" fill="#64748b" font-family="monospace" font-size="11" text-anchor="middle">YEMEN NATIONAL ID CARD &lt;&lt;01010088921&lt;&lt;SANAA</text>
</svg>`);

export const SAMPLE_LICENSE_DOC_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="480" height="280" viewBox="0 0 480 280">
  <rect width="480" height="280" rx="16" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
  <rect x="20" y="20" width="440" height="45" rx="8" fill="#1e293b"/>
  <text x="240" y="48" fill="#38bdf8" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle">الجمهورية اليمنية - الإدارة العامة للمرور (رخصة قيادة)</text>
  <text x="430" y="110" fill="#f8fafc" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="end">نوع الرخصة: خاصة / عمومي سارية</text>
  <text x="430" y="145" fill="#38bdf8" font-family="monospace" font-size="14" text-anchor="end">LIC NO: YE-SAN-994120</text>
  <text x="430" y="180" fill="#cbd5e1" font-family="sans-serif" font-size="13" text-anchor="end">تاريخ الانتهاء: 2029 / 12 / 31</text>
  <text x="430" y="215" fill="#10b981" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="end">✓ مفحوصة ومعتمدة للقيادة</text>
</svg>`);

export const SAMPLE_GUARANTEE_DOC_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="480" height="280" viewBox="0 0 480 280">
  <rect width="480" height="280" rx="16" fill="#18181b" stroke="#10b981" stroke-width="2"/>
  <rect x="20" y="20" width="440" height="45" rx="8" fill="#27272a"/>
  <text x="240" y="48" fill="#10b981" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle">وثيقة ضمانة تجارية / خطاب تفويض مصدق - الغرفة التجارية صنعاء</text>
  <text x="430" y="105" fill="#f4f4f5" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="end">الجهة الضامنة: مجموعة المتوكل التجارية (سجل تجاري #1094)</text>
  <text x="430" y="140" fill="#d4d4d8" font-family="sans-serif" font-size="12" text-anchor="end">نضمن ونكفل تسليم المركبة المؤجرة بحالتها الوكالية وسداد كافة الالتزامات</text>
  <text x="430" y="175" fill="#f59e0b" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="end">مصدق من الغرفة التجارية والصناعية بأمانة العاصمة صنعاء</text>
  <circle cx="95" cy="195" r="38" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 2"/>
  <text x="95" y="198" fill="#f59e0b" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">ختم رسمي مصدق</text>
</svg>`);

export const SAMPLE_RECEIPT_DOC_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="480" height="280" viewBox="0 0 480 280">
  <rect width="480" height="280" rx="16" fill="#090d16" stroke="#f59e0b" stroke-width="2"/>
  <rect x="20" y="20" width="440" height="45" rx="8" fill="#1e293b"/>
  <text x="240" y="48" fill="#f59e0b" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle">إشعار تحويل مالي إلكتروني مؤكد (بنك الكريمي / فلوسك)</text>
  <text x="430" y="105" fill="#f8fafc" font-family="sans-serif" font-size="13" text-anchor="end">المستفيد: الشركة المتحدة لتأجير السيارات - صنعاء</text>
  <text x="430" y="140" fill="#10b981" font-family="monospace" font-size="15" font-weight="bold" text-anchor="end">TRX REF: KRM-TRX-9981204</text>
  <text x="430" y="175" fill="#cbd5e1" font-family="sans-serif" font-size="13" text-anchor="end">حالة العملية: مكتملة ومقيدة في حساب الشركة</text>
  <text x="430" y="210" fill="#f59e0b" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="end">✓ تم التحقق المالي الآلي</text>
</svg>`);

export const SAMPLE_SIGNATURE_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="110" viewBox="0 0 320 110">
  <rect width="320" height="110" rx="8" fill="#ffffff"/>
  <path d="M 40 75 Q 75 25 110 65 T 180 55 T 250 40 Q 270 65 285 50" fill="none" stroke="#0f172a" stroke-width="3" stroke-linecap="round"/>
  <path d="M 65 85 L 245 78" fill="none" stroke="#d97706" stroke-width="1.5" stroke-linecap="round"/>
  <text x="160" y="102" fill="#475569" font-family="sans-serif" font-size="10" text-anchor="middle">توقيع إلكتروني موثق ومعتمد</text>
</svg>`);

export const INITIAL_CARS: Car[] = [
  {
    id: 'car-1',
    slug: 'land-cruiser-300-vxr-2024',
    name: 'تويوتا لاندكروزر 300 VXR 2024',
    nameEn: 'Toyota Land Cruiser 300 VXR 2024',
    category: 'luxury_suv',
    modelYear: 2024,
    engine: '3.5L Twin Turbo V6 (409 HP)',
    seats: 7,
    transmission: 'أوتوماتيك 10 سرعات',
    pricePerDayYer: 95000,
    pricePerDayUsd: 180,
    pricePerWeekYer: 590000,
    pricePerMonthYer: 2250000,
    pricePerMonthUsd: 4200,
    pricePerKmInterCityYer: 280,
    securityDepositYer: 200000,
    securityDepositUsd: 400,
    freeKmPerDay: 250,
    extraKmFeeYer: 200,
    image: '/src/assets/images/car_landcruiser_gr_1790624456804.jpg',
    gallery: [
      '/src/assets/images/car_landcruiser_gr_1790624456804.jpg',
      '/src/assets/images/hero_sanaa_fleet_1790624432645.jpg',
      '/src/assets/images/car_lexus_lx600_1790624445559.jpg'
    ],
    landingSubtitle: 'المركبة القياسية الأولى لمديري الشركات، الوفود الرسمية، والرحلات الطويلة بين المحافظات اليمنية',
    landingDescription:
      'تم تجهيز تويوتا لاندكروزر 300 VXR موديل 2024 لتلبية أعلى متطلبات الاعتمادية والأمان على الطرق الجبلية والخطوط السريعة في اليمن. تجمع المركبة بين محرك V6 تيربو مزدوج بقوة 409 حصان، نظام تعليق متكيف، ومقصورة تنفيذية معزولة بالكامل تسع 7 ركاب براحة تامة.',
    clientSuitability: ['الشركات ورجال الأعمال', 'المنظمات الدولية UN/NGOs', 'السفر العائلي بين المحافظات'],
    specs: {
      driveType: 'دفع رباعي مستمر 4WD مع أقفال دفرنس',
      tankCapacity: '110 لتر (خزان مزدوج للمسافات الطويلة)',
      luggageCapacity: '5 حقائب سفر كبيرة',
      safetyRating: '5 نجوم - 10 وسائد هوائية + رادار Toyota Safety Sense',
      insuranceType: 'تأمين شامل مع خدمة المركبة البديلة الفورية'
    },
    available: true,
    plateNumber: 'صنعاء 14-88902',
    currentLocation: 'صنعاء - فرع حدة، شارع القدس',
    features: [
      'دفع رباعي ذكي متكيف مع الطرق الجبلية والمنعطفات',
      'تجهيز كامل للرحلات الطويلة بين صنعاء والمحافظات',
      'نظام تتبع الأقمار الصناعية GPS متصل بغرفة العمليات',
      'مقاعد جلد طبيعي مهواة مع تكييف مركزي لثلاث مناطق',
      'ثلاجة مقصورة وسطية مدمجة ومنافذ طاقة 220V',
      'فحص فني وكالي شامل قبل كل تسليم'
    ],
    featuresEn: [
      'Adaptive 4WD for Yemen Mountain Passes',
      'Full Inter-Governorate Highway Spec',
      'Real-time Satellite GPS Operations Link',
      'Ventilated Leather Seating & 3-Zone Climate',
      'Built-in Center Console Refrigerator & 220V Inverter',
      'Full Agency Multi-Point Inspection'
    ],
    rating: 4.95,
    tripsCount: 142,
    fuelType: 'بنزين ممتاز 95'
  },
  {
    id: 'car-2',
    slug: 'lexus-lx600-vip-2024',
    name: 'لكزس LX600 VIP Executive 2024',
    nameEn: 'Lexus LX600 VIP Executive 2024',
    category: 'luxury_suv',
    modelYear: 2024,
    engine: '3.5L V6 Twin Turbo (409 HP)',
    seats: 4,
    transmission: 'أوتوماتيك 10 سرعات Direct-Shift',
    pricePerDayYer: 135000,
    pricePerDayUsd: 250,
    pricePerWeekYer: 850000,
    pricePerMonthYer: 3150000,
    pricePerMonthUsd: 5900,
    pricePerKmInterCityYer: 340,
    securityDepositYer: 300000,
    securityDepositUsd: 600,
    freeKmPerDay: 250,
    extraKmFeeYer: 250,
    image: '/src/assets/images/car_lexus_lx600_1790624445559.jpg',
    gallery: [
      '/src/assets/images/car_lexus_lx600_1790624445559.jpg',
      '/src/assets/images/car_mercedes_maybach_1790624467638.jpg',
      '/src/assets/images/hero_sanaa_fleet_1790624432645.jpg'
    ],
    landingSubtitle: 'مقصورة تنفيذية فاخرة بأربعة مقاعد مستقلة لاستقبال كبار الضيوف، السفراء، ورؤساء مجالس الإدارة',
    landingDescription:
      'صُممت لكزس LX600 VIP لتكون مقصورة أعمال عالية الخصوصية في قلب صنعاء وعلى خطوط السفر. تتميز بنظام تعليق هيدروليكي يمتص اهتزازات الطريق، زجاج مزدوج عازل للصوت، مقاعد خلفية قابلة للإمالة الكاملة مع مساند قدم، واتصال إنترنت فضائي Starlink.',
    clientSuitability: ['كبار الشخصيات VIP', 'مراسم استقبال المطار', 'رؤساء الشركات والبعثات'],
    specs: {
      driveType: 'دفع رباعي ذكي مع تعليق هوائي هيدروليكي AHC',
      tankCapacity: '110 لتر',
      luggageCapacity: '4 حقائب كبيرة',
      safetyRating: '5 نجوم - نظام Lexus Safety System+ 2.5',
      insuranceType: 'تأمين VIP شامل مع سائق بروتوكول معتمد'
    },
    available: true,
    plateNumber: 'صنعاء 11-77210',
    currentLocation: 'صنعاء - فرع السبعين، جوار ميدان السبعين',
    features: [
      'مقصورة VIP تنفيذية (4 مقاعد مستقلة بتحكم كامل)',
      'شاشات أعمال وترفيه خلفية مستقلة 11.6 إنش',
      'زجاج عازل للصوت والحرارة بدرجة 99%',
      'نظام تعليق هوائي هيدروليكي فائق النعومة',
      'إنترنت فضائي Starlink مدمج للوفود ورجال الأعمال',
      'إمكانية التخصيص مع سائق بروتوكول يتحدث الإنجليزية'
    ],
    featuresEn: [
      'VIP 4-Seater Executive First Class Cabin',
      'Dual 11.6" Independent Rear Work Screens',
      '99% Acoustic & Thermal Insulated Glass',
      'Active Height Control Air Suspension',
      'Onboard Starlink Satellite Wi-Fi',
      'Bilingual Protocol Chauffeur Available'
    ],
    rating: 4.98,
    tripsCount: 98,
    fuelType: 'بنزين ممتاز 95'
  },
  {
    id: 'car-3',
    slug: 'armored-land-cruiser-b6-un',
    name: 'تويوتا لاندكروزر مصفحة B6 VR7 (معتمدة للمنظمات والوفود)',
    nameEn: 'Armored Toyota Land Cruiser B6 VR7 (UN/NGO Spec)',
    category: 'vip_armored',
    modelYear: 2023,
    engine: '4.5L V8 Twin Turbo Diesel Heavy-Duty',
    seats: 6,
    armoredLevel: 'تصفيح بالستي CEN B6 معتمد دولياً (الشاسيه، الزجاج، السقف، والأرضية)',
    transmission: 'أوتوماتيك 6 سرعات مقوى Heavy-Duty',
    pricePerDayYer: 210000,
    pricePerDayUsd: 400,
    pricePerWeekYer: 1350000,
    pricePerMonthYer: 4800000,
    pricePerMonthUsd: 9000,
    pricePerKmInterCityYer: 450,
    securityDepositYer: 500000,
    securityDepositUsd: 1000,
    freeKmPerDay: 200,
    extraKmFeeYer: 350,
    image: '/src/assets/images/car_landcruiser_gr_1790624456804.jpg',
    gallery: [
      '/src/assets/images/car_landcruiser_gr_1790624456804.jpg',
      '/src/assets/images/hero_sanaa_fleet_1790624432645.jpg'
    ],
    landingSubtitle: 'سيارة مصفحة بمعيار CEN B6 الأوروبي، مخصصة للإيجار للبعثات الأممية والدبلوماسية والمنظمات الدولية العاملة في اليمن',
    landingDescription:
      'تخضع هذه السيارة المصفحة لمعايير إجراءات التشغيل القياسية (SOP) الخاصة بالأمم المتحدة والمنظمات الدولية (INGO). مزودة بدرع متكامل B6، إطارات Run-Flat، نظام إطفاء حرائق آلي، أجهزة اتصال VHF/Sat-Phone، ويقودها كابتن أمن وقائي معتمد.',
    clientSuitability: ['الأمم المتحدة والمنظمات الدولية', 'السفارات والبعثات الدبلوماسية', 'الوفود الإنسانية الميدانية'],
    specs: {
      driveType: 'دفع رباعي ثقيل 4x4 مع نظام تعليق وفرامل مقواة للتصفيح',
      tankCapacity: '138 لتر ديزل محمي ضد الاختراق والاحتراق',
      luggageCapacity: '4 حقائب + صندوق معدات طوارئ وإسعاف',
      safetyRating: 'تصفيح CEN B6 / VR7 بشهادة مطابقة دولية',
      insuranceType: 'عقد تشغيلي مؤسسي شامل الصيانة والمركبة البديلة'
    },
    available: true,
    plateNumber: 'صنعاء 22-30041',
    currentLocation: 'صنعاء - الحي الدبلوماسي، فج عطان',
    features: [
      'تصفيح كامل مستوى B6 مع حماية السقف والأرضية وخزان الوقود',
      'إطارات Run-Flat تسير لمسافة 80 كم بعد التضرر',
      'نظام إطفاء حرائق آلي في حجرة المحرك والهيكل السفلي',
      'حقيبة إسعافات أولية متقدمة (Trauma Kit) وجهاز اتصال فضائي',
      'سائق مرخص أمنياً وملم بإجراءات نقاط العبور والتنسيق الميداني'
    ],
    featuresEn: [
      'Certified CEN B6 Full Ballistic & Underbody Armor',
      'Heavy-Duty Run-Flat Tire System (80km range)',
      'Automatic Engine & Underbody Fire Suppression',
      'Onboard Trauma Medical Kit & Sat-Comms Link',
      'Security-Cleared Protocol Driver Included'
    ],
    rating: 4.97,
    tripsCount: 64,
    fuelType: 'ديزل ممتاز'
  },
  {
    id: 'car-4',
    slug: 'toyota-prado-txl-2024',
    name: 'تويوتا برادو TXL V6 2024 (ميداني وعائلي)',
    nameEn: 'Toyota Prado TXL V6 2024 (Field & Family)',
    category: 'field_4x4',
    modelYear: 2024,
    engine: '4.0L V6 Dual VVT-i (271 HP)',
    seats: 7,
    transmission: 'أوتوماتيك 6 سرعات',
    pricePerDayYer: 65000,
    pricePerDayUsd: 125,
    pricePerWeekYer: 410000,
    pricePerMonthYer: 1550000,
    pricePerMonthUsd: 2950,
    pricePerKmInterCityYer: 210,
    securityDepositYer: 150000,
    securityDepositUsd: 300,
    freeKmPerDay: 250,
    extraKmFeeYer: 150,
    image: '/src/assets/images/car_lexus_lx600_1790624445559.jpg',
    gallery: [
      '/src/assets/images/car_lexus_lx600_1790624445559.jpg',
      '/src/assets/images/car_landcruiser_gr_1790624456804.jpg'
    ],
    landingSubtitle: 'الخيار الأكثر توازناً واقتصادية للمشاريع الميدانية للشركات والمنظمات، وللقيادة الذاتية أو العائلية في صنعاء والمحافظات',
    landingDescription:
      'تُعد تويوتا برادو TXL V6 الخيار الأول لرحلات المهندسين، الفرق الميدانية للمنظمات، والعائلات المسافرة. تجمع بين الخلوص الأرضي المرتفع، استهلاك الوقود المعتدل، وسهولة القيادة داخل شوارع صنعاء وفي الطرق الجبلية إلى إب وتعز والحديدة.',
    clientSuitability: ['عقود المنظمات والشركات الشهرية', 'الأفراد والعائلات (قيادة ذاتية)', 'السفر بين المحافظات'],
    specs: {
      driveType: 'دفع رباعي 4WD مع دبل ثقيل وخفيف',
      tankCapacity: '150 لتر (خزانان)',
      luggageCapacity: '5 حقائب متوسطة',
      safetyRating: '5 نجوم - نظام ثبات إلكتروني وحساسات 360',
      insuranceType: 'تأمين شامل مع خيار القيادة الذاتية أو بسائق'
    },
    available: true,
    plateNumber: 'صنعاء 18-44219',
    currentLocation: 'صنعاء - فرع عصر، شارع الستين الغربي',
    features: [
      'متاحة للتأجير بالقيادة الذاتية أو مع سائق وبعقود شهرية مخفضة',
      'كفاءة عالية في استهلاك الوقود مع عزم قوي في المرتفعات الجبلية',
      'ثلاجة وسطية، حساسات وكاميرات محيطية، وتكييف مركزي قوي',
      'مفضلة لعقود التأجير التشغيلي للمنظمات والشركات الهندسية'
    ],
    featuresEn: [
      'Available for Self-Drive, Chauffeur, or Monthly NGO Lease',
      'Fuel Efficient V6 with High Mountain Torque',
      'Cool Box, Parking Cameras & Multi-Zone A/C',
      'Top Choice for Corporate & Engineering Field Teams'
    ],
    rating: 4.92,
    tripsCount: 215,
    fuelType: 'بنزين 95'
  },
  {
    id: 'car-5',
    slug: 'toyota-rav4-hybrid-2024-economy',
    name: 'تويوتا راف فور (RAV4 Hybrid 2024) - الفئة الاقتصادية والعائلية',
    nameEn: 'Toyota RAV4 Hybrid 2024 - Smart Economy SUV',
    category: 'economy_sedan',
    modelYear: 2024,
    engine: '2.5L Hybrid AWD (219 HP) - توفير فائق للوقود',
    seats: 5,
    transmission: 'أوتوماتيك E-CVT',
    pricePerDayYer: 35000,
    pricePerDayUsd: 65,
    pricePerWeekYer: 215000,
    pricePerMonthYer: 790000,
    pricePerMonthUsd: 1500,
    pricePerKmInterCityYer: 130,
    securityDepositYer: 100000,
    securityDepositUsd: 200,
    freeKmPerDay: 250,
    extraKmFeeYer: 100,
    image: '/src/assets/images/hero_sanaa_fleet_1790624432645.jpg',
    gallery: [
      '/src/assets/images/hero_sanaa_fleet_1790624432645.jpg',
      '/src/assets/images/car_lexus_lx600_1790624445559.jpg'
    ],
    landingSubtitle: 'كروس أوفر حديثة واقتصادية جداً في استهلاك الوقود، مثالية للأفراد، العائلات، والمغتربين للقيادة اليومية المريحة',
    landingDescription:
      'تجمع تويوتا RAV4 هايبرد 2024 بين الأناقة العصرية والكفاءة الفائقة في استهلاك الوقود، مما يجعلها الخيار الأمثل للأفراد والعائلات والمغتربين وموظفي الشركات للاستخدام اليومي داخل أمانة العاصمة صنعاء والمحافظات بسعر إيجار يومي وأسبوعي مدروس.',
    clientSuitability: ['الأفراد والعائلات', 'المغتربون والزوار', 'عقود موظفي الشركات داخل صنعاء'],
    specs: {
      driveType: 'دفع رباعي إلكتروني ذكي AWD-i',
      tankCapacity: '55 لتر (تقطع حتى 950 كم بالفل الواحد)',
      luggageCapacity: '4 حقائب سفر',
      safetyRating: '5 نجوم - نظام أمان Toyota Safety Sense',
      insuranceType: 'تأمين شامل وضمانة ميسرة للأفراد والموظفين'
    },
    available: true,
    plateNumber: 'صنعاء 15-61209',
    currentLocation: 'صنعاء - فرع شارع الزبيري، المركز التجاري',
    features: [
      'اقتصادية جداً (تقطع نحو 350 كم لكل دبة بنزين 20 لتر)',
      'سعر تأجير يومي وأسبوعي في متناول الأفراد والعائلات',
      'ارتفاع ممتاز عن الأرض يناسب شوارع ومطبات صنعاء',
      'شاشة لمس تدعم Apple CarPlay & Android Auto وكاميرا خلفية'
    ],
    featuresEn: [
      'Ultra Fuel-Efficient Hybrid (Up to 350km per 20L)',
      'Affordable Daily & Weekly Rates for Families & Expats',
      'High Ground Clearance Suited for Sanaa Roads',
      'Apple CarPlay, Android Auto & Reverse Camera'
    ],
    rating: 4.94,
    tripsCount: 310,
    fuelType: 'بنزين (هايبرد اقتصادي)'
  },
  {
    id: 'car-6',
    slug: 'hyundai-elantra-2024-daily',
    name: 'هيونداي إلنترا Smart 2024 (اقتصادية يومية للأفراد)',
    nameEn: 'Hyundai Elantra Smart 2024 (Daily Economy Sedan)',
    category: 'economy_sedan',
    modelYear: 2024,
    engine: '1.6L MPI الاقتصادية (123 HP)',
    seats: 5,
    transmission: 'أوتوماتيك 6 سرعات',
    pricePerDayYer: 24000,
    pricePerDayUsd: 45,
    pricePerWeekYer: 145000,
    pricePerMonthYer: 520000,
    pricePerMonthUsd: 980,
    pricePerKmInterCityYer: 100,
    securityDepositYer: 80000,
    securityDepositUsd: 150,
    freeKmPerDay: 250,
    extraKmFeeYer: 80,
    image: '/src/assets/images/car_mercedes_maybach_1790624467638.jpg',
    gallery: [
      '/src/assets/images/car_mercedes_maybach_1790624467638.jpg',
      '/src/assets/images/hero_sanaa_fleet_1790624432645.jpg'
    ],
    landingSubtitle: 'سيدان عملية وأنيقة بأقل تكلفة إيجار يومي في صنعاء، مثالية للمشاوير اليومية، الأطباء، المهندسين، والطلاب',
    landingDescription:
      'توفر هيونداي إلنترا 2024 حلاً عملياً واقتصادياً للراغبين باستئجار سيارة حديثة ونظيفة داخل أمانة العاصمة صنعاء دون أعباء مالية عالية. إجراءات التعاقد والضمان ميسرة وسريعة مع إمكانية التوصيل المباشر لمقر السكن أو العمل.',
    clientSuitability: ['الأفراد والموظفون', 'الإيجار اليومي والأسبوعي الاقتصادي', 'قيادة ذاتية داخل صنعاء'],
    specs: {
      driveType: 'دفع أمامي FWD عملي ومريح',
      tankCapacity: '47 لتر (استهلاك اقتصادي جداً)',
      luggageCapacity: '3 حقائب متوسطة',
      safetyRating: 'حساسات ركن، كاميرا خلفية، وفرامل ABS/ESC',
      insuranceType: 'تأمين شامل مع وديعة تأمين ميسرة ومستردة فوراً'
    },
    available: true,
    plateNumber: 'صنعاء 19-33410',
    currentLocation: 'صنعاء - فرع حدة، شارع القدس',
    features: [
      'أفضل سعر إيجار يومي وأسبوعي لسيارة موديل 2024 وكالة',
      'ضمانة ميسرة للموظفين والتجار والمغتربين',
      'توصيل فوري للمنزل أو المكتب في كافة أحياء صنعاء',
      'تكييف ممتاز، بلوتوث، وشاحن لاسلكي للهواتف'
    ],
    featuresEn: [
      'Best Value 2024 Sedan for Daily & Weekly Rental in Sanaa',
      'Streamlined Guarantee Options for Employees & Expats',
      'Direct Delivery to Home or Office in Sanaa',
      'Chilled A/C, Bluetooth & Wireless Phone Charging'
    ],
    rating: 4.89,
    tripsCount: 385,
    fuelType: 'بنزين 95'
  },
  {
    id: 'car-7',
    slug: 'mercedes-s580-executive-protocol',
    name: 'مرسيدس-بنز S580 4MATIC Executive (بروتوكول ومناسبات)',
    nameEn: 'Mercedes-Benz S580 4MATIC Executive Protocol',
    category: 'executive_sedan',
    modelYear: 2023,
    engine: '4.0L V8 Biturbo + EQ Boost (496 HP)',
    seats: 4,
    transmission: '9G-TRONIC أوتوماتيك',
    pricePerDayYer: 150000,
    pricePerDayUsd: 285,
    pricePerWeekYer: 950000,
    pricePerMonthYer: 3500000,
    pricePerMonthUsd: 6600,
    pricePerKmInterCityYer: 380,
    securityDepositYer: 350000,
    securityDepositUsd: 700,
    freeKmPerDay: 200,
    extraKmFeeYer: 300,
    image: '/src/assets/images/car_mercedes_maybach_1790624467638.jpg',
    gallery: [
      '/src/assets/images/car_mercedes_maybach_1790624467638.jpg',
      '/src/assets/images/car_lexus_lx600_1790624445559.jpg'
    ],
    landingSubtitle: 'سيدان المراسم الأولى في العاصمة صنعاء لوفود المؤتمرات، كبار رجال الأعمال، ومواكب الزفاف الراقية',
    landingDescription:
      'تجمع مرسيدس S580 بين الفخامة الألمانية الرفيعة وأنظمة القيادة الذكية، وتُقدم مع كابتن مراسم بزي رسمي لخدمة ضيوف الشركات الكبرى، المؤتمرات، وحفلات الزفاف في أمانة العاصمة صنعاء.',
    clientSuitability: ['مراسم الشركات والبنوك', 'كبار الضيوف والمؤتمرات', 'مواكب الأعراس والمناسبات'],
    specs: {
      driveType: 'دفع رباعي مستمر 4MATIC',
      tankCapacity: '76 لتر',
      luggageCapacity: '3 حقائب كبيرة',
      safetyRating: '5 نجوم - أنظمة قيادة وحماية استباقية PRE-SAFE',
      insuranceType: 'تأمين شامل مخصص للمراسم (شامل السائق)'
    },
    available: true,
    plateNumber: 'صنعاء 1-90055',
    currentLocation: 'صنعاء - فرع حدة، شارع القدس',
    features: [
      'مخصصة لخدمات البروتوكول والمراسم ومواكب المناسبات',
      'أبواب شفط كهربائية وإضاءة محيطية تفاعلية',
      'نظام صوتي Burmester ثلاثي الأبعاد وشاشات خلفية',
      'تُقدم مع كابتن مراسم محترف وخدمة ضيافة متكاملة'
    ],
    featuresEn: [
      'Dedicated to Corporate Protocol, Conferences & VIP Weddings',
      'Soft-Close Doors & Active Ambient Lighting',
      'Burmester 3D Surround Audio & Rear Tablets',
      'Includes Professional Protocol Chauffeur'
    ],
    rating: 4.99,
    tripsCount: 84,
    fuelType: 'بنزين ممتاز'
  },
  {
    id: 'car-8',
    slug: 'hyundai-staria-vip-family-van',
    name: 'هيونداي ستاريا VIP Lounge 2024 (حافلة عائلية ووفود - 7 إلى 9 ركاب)',
    nameEn: 'Hyundai Staria VIP Lounge 2024 (Executive & Family Van)',
    category: 'prestige_van',
    modelYear: 2024,
    engine: '3.5L V6 Smartstream (272 HP)',
    seats: 7,
    transmission: 'أوتوماتيك 8 سرعات',
    pricePerDayYer: 75000,
    pricePerDayUsd: 140,
    pricePerWeekYer: 470000,
    pricePerMonthYer: 1750000,
    pricePerMonthUsd: 3300,
    pricePerKmInterCityYer: 240,
    securityDepositYer: 160000,
    securityDepositUsd: 320,
    freeKmPerDay: 250,
    extraKmFeeYer: 180,
    image: '/src/assets/images/car_mercedes_maybach_1790624467638.jpg',
    gallery: [
      '/src/assets/images/car_mercedes_maybach_1790624467638.jpg',
      '/src/assets/images/hero_sanaa_fleet_1790624432645.jpg'
    ],
    landingSubtitle: 'مقصورة رحبة للوفود الزائرة، فرق العمل، والعائلات الكبيرة المسافرة بين المحافظات أو من وإلى المطار',
    landingDescription:
      'توفر هيونداي ستاريا 2024 مقاعد استرخاء كهربائية مريحة ومساحة واسعة للحقائب، مما يجعلها الخيار الأمثل لاستقبال الوفود، اللجان الفنية للمنظمات، والعائلات في رحلات المطار والسفر بين المدن.',
    clientSuitability: ['العائلات الكبيرة والمغتربون', 'وفود المنظمات والفرق الفنية', 'رحلات المطار والسياحة الداخلية'],
    specs: {
      driveType: 'دفع أمامي متوازن مع نظام تعليق خلفي متعدد الوصلات',
      tankCapacity: '75 لتر',
      luggageCapacity: '7 حقائب سفر كبيرة',
      safetyRating: '5 نجوم - أبواب انزلاقية كهربائية ذكية',
      insuranceType: 'تأمين شامل للركاب والمركبة'
    },
    available: true,
    plateNumber: 'صنعاء 12-65501',
    currentLocation: 'صنعاء - فرع الزبيري، المركز التجاري',
    features: [
      'مقاعد كابتن كهربائية مريحة مع مساند أرجل',
      'مساحة أمتعة واسعة جداً مناسبة لسفر العائلات وفرق العمل',
      'نوافذ بانورامية وستائر خصوصية جانبية',
      'منافذ شحن USB-C لكل مقعد وتكييف سقفي مستقل'
    ],
    featuresEn: [
      'Power Captain Relaxation Seats with Leg Rests',
      'Extra-Large Cargo Bay for Family & Team Luggage',
      'Panoramic Windows with Privacy Sunshades',
      'Dedicated USB-C Ports & Roof Climate Vents'
    ],
    rating: 4.91,
    tripsCount: 129,
    fuelType: 'بنزين 95'
  }
];

export const YEMENI_WALLETS: WalletInfo[] = [
  {
    id: 'kuraimi',
    name: 'الكريمي إم فلوس (M-Floos)',
    nameEn: 'Kuraimi M-Floos',
    bankName: 'بنك الكريمي للتمويل الأصغر الإسلامي',
    bankNameEn: 'Kuraimi Islamic Microfinance Bank',
    accountNumber: 'حساب الشركات الموحد: 3024881903 (ريال / دولار)',
    logoColor: 'from-amber-600 to-amber-700',
    badgeText: 'تحويل فوري - الأكثر انتشاراً',
    iconType: 'bank'
  },
  {
    id: 'floosak',
    name: 'محفظة فلوسك (Floosak)',
    nameEn: 'Floosak Wallet',
    bankName: 'بنك اليمن والكويت (YKB)',
    bankNameEn: 'Yemen Kuwait Bank',
    accountNumber: 'نقطة حاسب / حساب: 777002911',
    logoColor: 'from-blue-600 to-indigo-700',
    badgeText: 'سداد فوري عبر التطبيق',
    iconType: 'wallet'
  },
  {
    id: 'onecash',
    name: 'ون كاش (OneCash)',
    nameEn: 'OneCash Wallet',
    bankName: 'شركة ون كاش لخدمات الدفع الإلكتروني',
    bankNameEn: 'OneCash Electronic Services',
    accountNumber: 'كود التاجر المعتمد: ONECASH-88920',
    logoColor: 'from-emerald-600 to-teal-700',
    badgeText: 'معتمد للأفراد والشركات',
    iconType: 'wallet'
  },
  {
    id: 'jawali',
    name: 'محفظة جوالي (Jawali)',
    nameEn: 'Jawali Wallet',
    bankName: 'مصرف اليمن والبحرين الشامل',
    bankNameEn: 'Yemen Bahrain Comprehensive Bank',
    accountNumber: 'رقم حساب التاجر: 967770881240',
    logoColor: 'from-purple-600 to-indigo-800',
    badgeText: 'سداد إلكتروني موثق',
    iconType: 'mobile'
  },
  {
    id: 'jeeb',
    name: 'محفظة جيب (Jeeb)',
    nameEn: 'Jeeb Wallet',
    bankName: 'بنك التضامن الإسلامي',
    bankNameEn: 'Tadhamon Islamic Bank',
    accountNumber: 'كود السداد المباشر: JEEB-44510',
    logoColor: 'from-orange-500 to-red-600',
    badgeText: 'دفع بالباركود أو الرقم',
    iconType: 'qr'
  },
  {
    id: 'cash',
    name: 'تحويل بنكي رسمي / نقداً عند التعاقد',
    nameEn: 'Corporate Bank Transfer / Showroom Cash',
    bankName: 'بنك التضامن / كاك بنك / YKB - أو في فرع حدة',
    bankNameEn: 'Official Corporate Account or Hadda Branch',
    accountNumber: 'IBAN: YE44TADHAMON0001928374 (شامل فاتورة ضريبية)',
    logoColor: 'from-slate-700 to-slate-900',
    badgeText: 'للشركات والمنظمات والأفراد',
    iconType: 'cash'
  }
];

export const INTER_CITY_ROUTES: InterCityRoute[] = [
  {
    id: 'route-sanaa-aden',
    origin: 'sanaa',
    destination: 'aden',
    titleAr: 'صنعاء ⇄ عدن (عبر ذمار - إب - الضالع / القبيطة)',
    titleEn: 'Sanaa to Aden Highway Route',
    distanceKm: 380,
    estimatedHours: '7 - 8 ساعات',
    roadCondition: 'طريق إسفلتي وجبلي عبر نقيل سمارة مع استراحات منظمة ونقاط عبور معتمدة',
    recommendedVehicle: 'لاندكروزر 300 VXR أو برادو TXL أو لكزس LX600',
    securityStatus: 'normal',
    checkpoints: [
      'نقطة يسلح (المدخل الجنوبي لأمانة العاصمة)',
      'مرتفعات نقيل سمارة الجبلية',
      'استراحة يريم ومدينة إب',
      'محور الضالع / قعطبة',
      'نقطة الرباط ومدخل خور مكسر - عدن'
    ]
  },
  {
    id: 'route-sanaa-marib',
    origin: 'sanaa',
    destination: 'marib',
    titleAr: 'صنعاء ⇄ مأرب (خط السفر والتنسيق الميداني)',
    titleEn: 'Sanaa to Marib Executive Route',
    distanceKm: 175,
    estimatedHours: '3.5 - 4 ساعات',
    roadCondition: 'طريق معبد يتطلب مركبات دفع رباعي حديثة وسائقين معتمدين ذوي خبرة بالمسار',
    recommendedVehicle: 'لاندكروزر VXR أو برادو TXL دفع رباعي',
    securityStatus: 'stable',
    checkpoints: [
      'مخرج صنعاء الشرقي',
      'المسار الجبلي والصحراوي المعتمد',
      'مدخل مدينة مأرب المجمع الحكومي'
    ]
  },
  {
    id: 'route-sanaa-ibb-taiz',
    origin: 'sanaa',
    destination: 'taiz',
    titleAr: 'صنعاء ⇄ ذمار ⇄ إب ⇄ تعز (الحوبان / المدينة)',
    titleEn: 'Sanaa - Ibb - Taiz Route',
    distanceKm: 260,
    estimatedHours: '5 - 6 ساعات',
    roadCondition: 'طريق حيوي يربط العاصمة بالمحافظات الوسطى مع منعطفات جبلية',
    recommendedVehicle: 'تويوتا برادو TXL أو لاندكروزر VXR أو ستاريا عائلية',
    securityStatus: 'stable',
    checkpoints: [
      'نقطة يسلح - ذمار',
      'نقيل سمارة ومدينة القاعدة',
      'محافظة إب',
      'الحوبان - مدخل مدينة تعز'
    ]
  },
  {
    id: 'route-sanaa-hodeidah',
    origin: 'sanaa',
    destination: 'hodeidah',
    titleAr: 'صنعاء ⇄ مناخة ⇄ الحديدة (الميناء والساحل الغربي)',
    titleEn: 'Sanaa to Hodeidah via Manakhah Pass',
    distanceKm: 230,
    estimatedHours: '4.5 - 5 ساعات',
    roadCondition: 'منحدرات جبلية في مناخة وحراز تليها طريق تهامة الساحلية السريعة',
    recommendedVehicle: 'لاندكروزر VXR أو برادو TXL أو راف فور',
    securityStatus: 'stable',
    checkpoints: [
      'نقطة عصر (مخرج صنعاء الغربي)',
      'مناخة - جبال حراز',
      'باجل وسهل تهامة',
      'مدخل مدينة الحديدة الكيلو 16'
    ]
  },
  {
    id: 'route-sanaa-hadhramaut',
    origin: 'sanaa',
    destination: 'hadhramaut_mukalla',
    titleAr: 'صنعاء ⇄ شبوة ⇄ حضرموت (سيئون / المكلا)',
    titleEn: 'Sanaa to Hadhramaut (Seiyun & Mukalla)',
    distanceKm: 780,
    estimatedHours: '12 - 14 ساعة (مع سائقين بالتناوب)',
    roadCondition: 'خط سفر طويل للمسافرين والوفود ومطار سيئون الدولي مع تجهيز كامل للمركبة',
    recommendedVehicle: 'لاندكروزر 300 VXR أو ستاريا VIP Lounge',
    securityStatus: 'normal',
    checkpoints: [
      'صنعاء - الخط الشرقي الدولي',
      'عتق - محافظة شبوة',
      'وادي حضرموت (مطار سيئون) أو ساحل المكلا'
    ]
  }
];

export const INITIAL_DRIVERS: Driver[] = [
  {
    id: 'driver-1',
    name: 'الكابتن / وضاح أحمد الحاشدي',
    nameEn: 'Capt. Waddah Al-Hashidi',
    phone: '+967 771 234 567',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    licenseNumber: 'رخصة قيادة عمومي فئة أولى #882190',
    rating: 4.97,
    tripsCount: 420,
    interGovernorateCertified: true,
    status: 'on_trip',
    assignedCarPlate: 'صنعاء 14-88902',
    assignedCarName: 'تويوتا لاندكروزر 300 VXR 2024',
    currentLocation: 'طريق صنعاء - السبعين باتجاه نقطة يسلح',
    earningsThisMonthYer: 420000,
    earningsThisMonthUsd: 800,
    yearsExperience: 14
  },
  {
    id: 'driver-2',
    name: 'الكابتن / فهد يحيى الأنسي',
    nameEn: 'Capt. Fahd Al-Ansi',
    phone: '+967 773 987 654',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    licenseNumber: 'رخصة قيادة دبلوماسية وبروتوكول #554102',
    rating: 4.99,
    tripsCount: 310,
    interGovernorateCertified: true,
    status: 'available',
    assignedCarPlate: 'صنعاء 11-77210',
    assignedCarName: 'لكزس LX600 VIP Executive',
    currentLocation: 'المركز الرئيسي - حدة، شارع القدس',
    earningsThisMonthYer: 380000,
    earningsThisMonthUsd: 720,
    yearsExperience: 11
  },
  {
    id: 'driver-3',
    name: 'الكابتن / معتز سلطان الصنعاني',
    nameEn: 'Capt. Moataz Al-Sanaani',
    phone: '+967 777 551 234',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    licenseNumber: 'رخصة قيادة مركبات مصفحة وأمن وقائي UN-SOP #339901',
    rating: 4.96,
    tripsCount: 265,
    interGovernorateCertified: true,
    status: 'available',
    assignedCarPlate: 'صنعاء 22-30041',
    assignedCarName: 'تويوتا لاندكروزر مصفحة B6',
    currentLocation: 'صنعاء - فج عطان، الحي الدبلوماسي',
    earningsThisMonthYer: 490000,
    earningsThisMonthUsd: 930,
    yearsExperience: 16
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'UNT-7801',
    carId: 'car-1',
    carName: 'تويوتا لاندكروزر 300 VXR 2024',
    carImage: '/src/assets/images/car_landcruiser_gr_1790624456804.jpg',
    clientCategory: 'corporate',
    organizationName: 'مجموعة المتوكل للتجارة والاستيراد',
    customerName: 'المهندس / هشام عبدالرحمن المتوكل',
    customerPhone: '+967 770 112 233',
    customerIdNumber: '01010088921 (بطاقة شخصية ذكية)',
    customerLicenseNumber: 'YE-SAN-994120',
    guaranteeType: 'commercial_guarantor',
    guaranteeStatus: 'approved',
    guaranteeDetails: 'كفالة تجارية مصدقة من مجموعة المتوكل للتجارة والاستيراد (سجل تجاري 1094 - الغرفة التجارية صنعاء)',
    idDocumentUrl: SAMPLE_ID_DOC_SVG,
    licenseDocumentUrl: SAMPLE_LICENSE_DOC_SVG,
    guaranteeDocumentUrl: SAMPLE_GUARANTEE_DOC_SVG,
    paymentReceiptUrl: SAMPLE_RECEIPT_DOC_SVG,
    contractAgreed: true,
    contractSignedAt: '2026-09-28 07:10 AM',
    customerSignatureDataUrl: SAMPLE_SIGNATURE_SVG,
    rentalType: 'inter_governorate',
    deliveryMode: 'doorstep_delivery',
    pickupLocation: 'صنعاء - فندق موفنبيك / حدة',
    destination: 'عدن - خور مكسر',
    governorate: 'aden',
    startDate: '2026-09-28',
    endDate: '2026-09-30',
    days: 3,
    withDriver: true,
    driverId: 'driver-1',
    driverName: 'الكابتن / وضاح أحمد الحاشدي',
    driverPhone: '+967 771 234 567',
    totalAmountYer: 380000,
    totalAmountUsd: 720,
    paymentPlan: 'full_100',
    paidAmountYer: 380000,
    remainingAmountYer: 0,
    walletUsed: 'kuraimi',
    paymentStatus: 'paid',
    transactionRef: 'KRM-TRX-9981204',
    bookingStatus: 'in_progress',
    tripProgressPct: 45,
    currentCheckpointIndex: 2,
    checkpoints: [
      { id: 'cp-1', name: 'نقطة يسلح (مخرج صنعاء الجنوبي)', nameEn: 'Yasleh Checkpoint (Sanaa South Exit)', passed: true, timeEstimate: '08:45 AM' },
      { id: 'cp-2', name: 'نقيل سمارة الجبلي', nameEn: 'Naqil Samarah Mountain Pass', passed: true, timeEstimate: '11:15 AM' },
      { id: 'cp-3', name: 'استراحة يريم ومدينة إب', nameEn: 'Yarim Rest Area & Ibb City', passed: false, timeEstimate: '01:30 PM' },
      { id: 'cp-4', name: 'نقطة الضالع والخط السريع', nameEn: 'Al-Dhalea Highway Checkpoint', passed: false, timeEstimate: '03:45 PM' },
      { id: 'cp-5', name: 'مدخل عدن - خور مكسر', nameEn: 'Aden Entrance - Khor Maksar', passed: false, timeEstimate: '05:30 PM' }
    ],
    etaMinutes: 185,
    currentSpeedKmh: 78,
    createdAt: '2026-09-28T07:15:00'
  },
  {
    id: 'UNT-7802',
    carId: 'car-5',
    carName: 'تويوتا راف فور (RAV4 Hybrid 2024) - الفئة الاقتصادية والعائلية',
    carImage: '/src/assets/images/hero_sanaa_fleet_1790624432645.jpg',
    clientCategory: 'individual',
    customerName: 'الدكتور / سمير نبيل الكبسي',
    customerPhone: '+967 775 889 900',
    customerIdNumber: '01030099120 (بطاقة شخصية ذكية)',
    customerLicenseNumber: 'YE-SAN-771029',
    guaranteeType: 'cash_deposit',
    guaranteeStatus: 'under_review',
    guaranteeDetails: 'تأمين نقدي مسترد (100,000 ر.ي) محول عبر محفظة فلوسك + صورة الهوية ورخصة القيادة',
    idDocumentUrl: SAMPLE_ID_DOC_SVG,
    licenseDocumentUrl: SAMPLE_LICENSE_DOC_SVG,
    guaranteeDocumentUrl: SAMPLE_GUARANTEE_DOC_SVG,
    paymentReceiptUrl: SAMPLE_RECEIPT_DOC_SVG,
    contractAgreed: true,
    contractSignedAt: '2026-10-09 08:40 AM',
    customerSignatureDataUrl: SAMPLE_SIGNATURE_SVG,
    rentalType: 'self_drive',
    deliveryMode: 'doorstep_delivery',
    pickupLocation: 'صنعاء - حي الأصبحي، شارع المقالح (توصيل لباب المنزل)',
    destination: 'داخل أمانة العاصمة صنعاء (قيادة ذاتية)',
    startDate: '2026-10-09',
    endDate: '2026-10-12',
    days: 3,
    withDriver: false,
    totalAmountYer: 105000,
    totalAmountUsd: 195,
    paymentPlan: 'with_escrow',
    paidAmountYer: 205000,
    remainingAmountYer: 0,
    walletUsed: 'floosak',
    paymentStatus: 'paid',
    transactionRef: 'FLS-90124-77',
    bookingStatus: 'pending_approval',
    tripProgressPct: 0,
    currentCheckpointIndex: 0,
    checkpoints: [
      { id: 'cp-a1', name: 'تجهيز وفحص المركبة في فرع حدة', nameEn: 'Vehicle Inspection at Hadda Branch', passed: true, timeEstimate: '09:00 AM' },
      { id: 'cp-a2', name: 'تحرك مندوب التوصيل إلى حي الأصبحي', nameEn: 'Delivery Rep En Route to Asbahi', passed: false, timeEstimate: '09:30 AM' },
      { id: 'cp-a3', name: 'مطابقة أصل الوثائق وتسليم المفتاح للعميل', nameEn: 'ID Check & Key Handover', passed: false, timeEstimate: '09:50 AM' }
    ],
    etaMinutes: 30,
    currentSpeedKmh: 0,
    createdAt: '2026-10-09T08:45:00'
  },
  {
    id: 'UNT-7803',
    carId: 'car-3',
    carName: 'تويوتا لاندكروزر مصفحة B6 VR7 (معتمدة للمنظمات والوفود)',
    carImage: '/src/assets/images/car_landcruiser_gr_1790624456804.jpg',
    clientCategory: 'un_ngo',
    organizationName: 'بعثة منظمة الإغاثة والتنمية الدولية (INGO)',
    customerName: 'أ. طارق عبدالجبار السامعي (مدير المشتريات والعقود)',
    customerPhone: '+967 772 445 667',
    customerIdNumber: 'UN-LP-884920',
    guaranteeType: 'government_id_escrow',
    guaranteeStatus: 'approved',
    guaranteeDetails: 'أمر شراء وتفويض رسمي موقع من مكتب المنظمة في صنعاء (PO #INGO-2026-441)',
    idDocumentUrl: SAMPLE_ID_DOC_SVG,
    guaranteeDocumentUrl: SAMPLE_GUARANTEE_DOC_SVG,
    paymentReceiptUrl: SAMPLE_RECEIPT_DOC_SVG,
    contractAgreed: true,
    contractSignedAt: '2026-10-05 10:00 AM',
    customerSignatureDataUrl: SAMPLE_SIGNATURE_SVG,
    rentalType: 'airport_vip',
    deliveryMode: 'doorstep_delivery',
    pickupLocation: 'مطار صنعاء الدولي - صالة الوفود الأممية',
    destination: 'صنعاء - الحي الدبلوماسي، فج عطان',
    startDate: '2026-10-06',
    endDate: '2026-10-08',
    days: 2,
    withDriver: true,
    driverId: 'driver-3',
    driverName: 'الكابتن / معتز سلطان الصنعاني',
    driverPhone: '+967 777 551 234',
    totalAmountYer: 420000,
    totalAmountUsd: 800,
    paymentPlan: 'full_100',
    paidAmountYer: 420000,
    remainingAmountYer: 0,
    walletUsed: 'kuraimi',
    paymentStatus: 'paid',
    transactionRef: 'KRM-INGO-77410',
    bookingStatus: 'completed',
    tripProgressPct: 100,
    currentCheckpointIndex: 3,
    checkpoints: [],
    etaMinutes: 0,
    currentSpeedKmh: 0,
    rating: 5,
    reviewComment: 'التزام دقيق بمعايير الأمان الدولية SOP، السيارة المصفحة مجهزة بالكامل والكابتن على دراية تامة ببروتوكول الوفود.',
    createdAt: '2026-10-05T10:00:00'
  }
];

export const INITIAL_TRANSACTIONS: FinancialTransaction[] = [
  {
    id: 'VCH-9001',
    date: '2026-09-28',
    type: 'receipt',
    bookingId: 'UNT-7801',
    partyName: 'مجموعة المتوكل للتجارة (م. هشام المتوكل)',
    amountYer: 380000,
    amountUsd: 720,
    wallet: 'kuraimi',
    referenceNo: 'KRM-TRX-9981204',
    description: 'سند قبض قيمة عقد إيجار لاندكروزر 300 VXR لمدة 3 أيام (خط صنعاء - عدن)',
    status: 'completed'
  },
  {
    id: 'VCH-9002',
    date: '2026-10-06',
    type: 'receipt',
    bookingId: 'UNT-7803',
    partyName: 'بعثة منظمة الإغاثة والتنمية الدولية (INGO)',
    amountYer: 420000,
    amountUsd: 800,
    wallet: 'kuraimi',
    referenceNo: 'KRM-INGO-77410',
    description: 'سند قبض عقد تأجير لاندكروزر مصفحة B6 مع كابتن أمن وقائي (مطار صنعاء - فج عطان)',
    status: 'completed'
  },
  {
    id: 'VCH-9003',
    date: '2026-10-09',
    type: 'receipt',
    bookingId: 'UNT-7802',
    partyName: 'د. سمير نبيل الكبسي',
    amountYer: 205000,
    amountUsd: 395,
    wallet: 'floosak',
    referenceNo: 'FLS-90124-77',
    description: 'سند قبض إيجار تويوتا راف فور هايبرد (105,000 ر.ي) + أمانة تأمين نقدي مسترد (100,000 ر.ي)',
    status: 'completed'
  },
  {
    id: 'VCH-9004',
    date: '2026-10-08',
    type: 'refund',
    partyName: 'أ. نايف حسين العولقي',
    amountYer: 150000,
    amountUsd: 285,
    wallet: 'onecash',
    referenceNo: 'ONE-REF-55219',
    description: 'سند صرف واسترداد مبلغ التأمين النقدي بعد فحص واستلام سيارة برادو TXL سليمة',
    status: 'completed'
  }
];

export const INITIAL_RFQS: RfqRequest[] = [
  {
    id: 'RFQ-2026-01',
    orgName: 'مكتب منظمة العمل الإنساني الدولية - صنعاء',
    orgType: 'un_ngo',
    contactPerson: 'م. خالد عبدالله الأغبري (مسؤول المشتريات والعقود)',
    phone: '+967 777 889 112',
    email: 'procurement.ye@humanitarian-int.org',
    vehiclesCount: 4,
    durationMonths: 6,
    vehicleCategory: 'تويوتا برادو TXL 2024 + لاندكروزر VXR مع سائقين',
    requirements: 'مطلوب عرض سعر رسمي (Technical & Financial Proposal) لتأجير 4 مركبات دفع رباعي شاملة السائقين، الوقود، الصيانة الدورية، وتصاريح التحرك الميداني بين صنعاء والحديدة وإب.',
    status: 'new',
    createdAt: '2026-10-08'
  },
  {
    id: 'RFQ-2026-02',
    orgName: 'شركة يمن تيليكوم للحلول الهندسية',
    orgType: 'corporate',
    contactPerson: 'أ. ريم الحمادي (المدير الإداري)',
    phone: '+967 771 445 990',
    email: 'r.hammadi@yementelecom.ye',
    vehiclesCount: 3,
    durationMonths: 12,
    vehicleCategory: 'تويوتا راف فور هايبرد 2024 + برادو للمهندسين',
    requirements: 'نرغب بعقد تأجير تشغيلي سنوي لعدد 3 سيارات لاستخدام المهندسين داخل أمانة العاصمة صنعاء مع فواتير ضريبية رسمية.',
    status: 'quoted',
    createdAt: '2026-10-07'
  }
];

export const LOYALTY_TIERS: LoyaltyTier[] = [
  {
    id: 'silver',
    name: 'فئة الأفراد والعائلات (الأساسية)',
    nameEn: 'Standard Individual & Family Tier',
    minPoints: 0,
    discountPct: 5,
    perks: [
      'خصم 5% على جميع الإيجارات اليومية والأسبوعية',
      'إجراءات ضمان ميسرة للموظفين والمغتربين',
      'دعم فني ومساعدة على الطريق 24/7'
    ],
    perksEn: [
      '5% off daily & weekly bookings',
      'Streamlined guarantee process for residents & expats',
      '24/7 roadside assistance'
    ],
    badgeColor: 'border-slate-400 text-slate-300'
  },
  {
    id: 'gold',
    name: 'فئة رجال الأعمال والشركات (الذهبية)',
    nameEn: 'Corporate & Business Gold Tier',
    minPoints: 500,
    discountPct: 12,
    perks: [
      'خصم 12% على كافة الرحلات بين المحافظات',
      'توصيل واستلام مجاني لباب المكتب أو الفندق في صنعاء',
      'تعديل مرن للمواعيد وفواتير مالية موثقة',
      'أولوية توفير سيارات اللاندكروزر والبرادو في المواسم'
    ],
    perksEn: [
      '12% off inter-governorate trips',
      'Free office/hotel delivery in Sanaa',
      'Flexible rescheduling & official tax invoices',
      'Priority fleet allocation'
    ],
    badgeColor: 'border-amber-400 text-amber-300'
  },
  {
    id: 'platinum',
    name: 'فئة العقود التشغيلية طويلة الأجل',
    nameEn: 'Long-Term Operational Lease Tier',
    minPoints: 1500,
    discountPct: 20,
    perks: [
      'خصم تعاقدي يصل إلى 20% للعقود الشهرية والسنوية',
      'توفير مركبة بديلة خلال 60 دقيقة في حال الصيانة الدورية',
      'اعتماد ملف الكفالة التجارية للشركة لمرة واحدة فقط',
      'مدير حساب عقود مخصص على مدار الساعة'
    ],
    perksEn: [
      'Up to 20% discount on monthly/annual leases',
      'Replacement vehicle within 60 mins during maintenance',
      'One-time corporate guarantee clearance',
      'Dedicated 24/7 corporate account manager'
    ],
    badgeColor: 'border-cyan-400 text-cyan-300'
  },
  {
    id: 'royal_vip',
    name: 'فئة المنظمات الدولية والبعثات الدبلوماسية (UN / INGO)',
    nameEn: 'Diplomatic & UN/INGO Protocol Tier',
    minPoints: 3000,
    discountPct: 25,
    perks: [
      'أسعار تعاقدية خاصة للأسطول المصفح B6 ومركبات الميدان 4x4',
      'كباتن مدربون على إجراءات التشغيل القياسية (SOP) واللغة الإنجليزية',
      'تتبع فضائي مباشر وتنسيق تصاريح المرور بين المحافظات',
      'إصدار فواتير وعقود متوافقة مع معايير المشتريات الدولية'
    ],
    perksEn: [
      'Contractual rates for B6 Armored & 4x4 field units',
      'SOP-certified bilingual security drivers',
      'Live satellite telemetry & transit permit coordination',
      'UN/INGO procurement-compliant invoicing'
    ],
    badgeColor: 'border-amber-300 text-amber-200'
  }
];

export const SANAA_NEIGHBORHOODS = [
  'حدة - شارع القدس / شارع صفر / المدينة السكنية',
  'السبعين - ميدان السبعين / حي الرئاسة / شارع الخمسين',
  'فج عطان والحي الدبلوماسي (مقرات المنظمات والسفارات)',
  'عصر - شارع الستين الغربي وجولة عصر',
  'بيت بوس - حي الشباب والشارع العام',
  'الأصبحي والمقالح وشارع تعز',
  'شارع الزبيري - المركز التجاري وعصر',
  'حي شيراتون وشارع مجاهد (جوار فندق موفنبيك)',
  'مطار صنعاء الدولي - صالة الوصول وصالة التشريفات',
  'الستين الشمالي وحي النهضة والجراف',
  'مذبح وجوار جامعة صنعاء الجديدة'
];

export const CAR_CATEGORIES: { id: import('../types').CarCategory; labelAr: string; labelEn: string }[] = [
  { id: 'all', labelAr: 'الكل (شامل الفئات)', labelEn: 'All Fleet' },
  { id: 'vip_armored', labelAr: 'مصفحة B6 للوفود والمنظمات', labelEn: 'B6 Armored VIP/UN' },
  { id: 'luxury_suv', labelAr: 'دفع رباعي تنفيذي فاخر', labelEn: 'Executive Luxury SUV' },
  { id: 'field_4x4', labelAr: 'دفع رباعي ميداني للمحافظات', labelEn: 'Field 4x4 (UN/NGO)' },
  { id: 'executive_sedan', labelAr: 'سيدان رجال الأعمال والشركات', labelEn: 'Corporate Sedan' },
  { id: 'economy_sedan', labelAr: 'اقتصادية وعملية للأفراد', labelEn: 'Economy & Mid-Range' },
  { id: 'prestige_van', labelAr: 'باصات وفانات الوفود والعائلات', labelEn: 'VIP & Family Vans' }
];

export const INITIAL_CLIENTS: ClientProfile[] = [
  {
    id: 'CRM-1001',
    clientType: 'corporate',
    name: 'المهندس / هشام عبدالرحمن المتوكل',
    organizationName: 'مجموعة المتوكل للتجارة والاستيراد',
    jobTitle: 'المدير التنفيذي للعمليات',
    phone: '+967 770 112 233',
    email: 'h.almutawakel@mutawakel-group.ye',
    address: 'صنعاء — شارع حدة الرئيسي، برج المتوكل التجاري، الدور الخامس',
    nationalIdOrPassport: '01010088921 (بطاقة شخصية ذكية - أمانة العاصمة)',
    licenseNumber: 'YE-SAN-994120',
    licenseExpiry: '2029-12-31',
    guarantorName: 'مجموعة المتوكل للتجارة والاستيراد (سجل تجاري #1094)',
    guarantorType: 'commercial_guarantor',
    guarantorDocumentRef: 'غ.ت.ص / تصديق رقم 44892 - الغرفة التجارية صنعاء',
    guarantorPhone: '+967 01 445566',
    verificationStatus: 'verified',
    riskScore: 'low',
    creditLimitUsd: 15000,
    totalBookingsCount: 14,
    activeBookingsCount: 1,
    totalSpentYer: 4850000,
    totalSpentUsd: 9065,
    heldDepositYer: 0,
    idDocumentUrl: SAMPLE_ID_DOC_SVG,
    licenseDocumentUrl: SAMPLE_LICENSE_DOC_SVG,
    guaranteeDocumentUrl: SAMPLE_GUARANTEE_DOC_SVG,
    notes: 'عميل شركات من الفئة الذهبية — معتمد بتفويض وكفالة تجارية مفتوحة لعقود السفر بين المحافظات وسيارات اللاندكروزر.',
    createdAt: '2025-02-14'
  },
  {
    id: 'CRM-1002',
    clientType: 'un_ngo',
    name: 'أ. طارق عبدالجبار السامعي',
    organizationName: 'بعثة منظمة الإغاثة والتنمية الدولية (INGO)',
    jobTitle: 'مدير المشتريات والعقود الإقليمي (Procurement Manager)',
    phone: '+967 772 445 667',
    email: 't.alsamei@ingo-mission-ye.org',
    address: 'صنعاء — فج عطان، الحي الدبلوماسي، مربع المنظمات الدولية',
    nationalIdOrPassport: 'UN-LP-884920 (وثيقة عمل أممية + بطاقة شخصية)',
    licenseNumber: 'بإشراف كباتن الشركة المعتمدين أمنياً (SOP)',
    licenseExpiry: '2028-06-30',
    guarantorName: 'مكتب البعثة الرئيسي في صنعاء — اتفاقية إطارية LTA #INGO-2026-441',
    guarantorType: 'government_id_escrow',
    guarantorDocumentRef: 'PO-LTA-2026-441 (أمر شراء دولي معتمد)',
    guarantorPhone: '+967 01 432100',
    verificationStatus: 'verified',
    riskScore: 'low',
    creditLimitUsd: 50000,
    totalBookingsCount: 28,
    activeBookingsCount: 0,
    totalSpentYer: 14980000,
    totalSpentUsd: 28000,
    heldDepositYer: 0,
    idDocumentUrl: SAMPLE_ID_DOC_SVG,
    guaranteeDocumentUrl: SAMPLE_GUARANTEE_DOC_SVG,
    notes: 'اتفاقية تأجير طويلة الأجل (LTA) تشمل سيارات مصفحة B6 وسيارات برادو ميدانية مع فواتير دولارية شهرية موحدة.',
    createdAt: '2024-11-01'
  },
  {
    id: 'CRM-1003',
    clientType: 'individual',
    name: 'الدكتور / سمير نبيل الكبسي',
    organizationName: 'المستشفى الأوروبي الحديث — صنعاء',
    jobTitle: 'استشاري جراحة القلب والأوعية الدموية',
    phone: '+967 775 889 900',
    email: 'dr.sameer.kabsi@gmail.com',
    address: 'صنعاء — حي الأصبحي، شارع المقالح، جوار حديقة الأصبحي',
    nationalIdOrPassport: '01030099120 (بطاقة شخصية ذكية)',
    licenseNumber: 'YE-SAN-771029',
    licenseExpiry: '2028-09-15',
    guarantorName: 'تأمين نقدي مسترد عبر محفظة فلوسك + تعريف جهة عمل',
    guarantorType: 'cash_deposit',
    guarantorDocumentRef: 'FLS-ESCROW-90124 (أمانة نقدية 100,000 ر.ي)',
    guarantorPhone: '+967 775 889 900',
    verificationStatus: 'pending',
    riskScore: 'low',
    creditLimitUsd: 2000,
    totalBookingsCount: 3,
    activeBookingsCount: 1,
    totalSpentYer: 415000,
    totalSpentUsd: 775,
    heldDepositYer: 100000,
    idDocumentUrl: SAMPLE_ID_DOC_SVG,
    licenseDocumentUrl: SAMPLE_LICENSE_DOC_SVG,
    guaranteeDocumentUrl: SAMPLE_GUARANTEE_DOC_SVG,
    notes: 'عميل أفراد مميز (قيادة ذاتية داخل صنعاء) — تم إيداع مبلغ التأمين المسترد عبر محفظة فلوسك وبانتظار الاعتماد النهائي.',
    createdAt: '2026-04-10'
  },
  {
    id: 'CRM-1004',
    clientType: 'vip',
    name: 'الشيخ / عبدالكريم قاسم الشيباني',
    organizationName: 'مجموعة الشيباني الصناعية والمصرفية',
    jobTitle: 'رئيس مجلس الإدارة',
    phone: '+967 777 001 122',
    email: 'chairman@shaibani-group.com',
    address: 'صنعاء — حي حدة السكني، الفلل الدبلوماسية',
    nationalIdOrPassport: 'جواز سفر دبلوماسي / تجاري #09981244',
    licenseNumber: 'YE-VIP-10029',
    licenseExpiry: '2030-01-01',
    guarantorName: 'ضمانة مصرفية وكفالة مجموعة الشيباني الصناعية',
    guarantorType: 'commercial_guarantor',
    guarantorDocumentRef: 'VIP-CORP-0012 (اعتماد خاص من الإدارة العليا)',
    guarantorPhone: '+967 01 212121',
    verificationStatus: 'verified',
    riskScore: 'low',
    creditLimitUsd: 35000,
    totalBookingsCount: 19,
    activeBookingsCount: 0,
    totalSpentYer: 8560000,
    totalSpentUsd: 16000,
    heldDepositYer: 0,
    idDocumentUrl: SAMPLE_ID_DOC_SVG,
    licenseDocumentUrl: SAMPLE_LICENSE_DOC_SVG,
    guaranteeDocumentUrl: SAMPLE_GUARANTEE_DOC_SVG,
    notes: 'عميل VIP — يفضل سيارات لكزس LX600 ومرسيدس S580 مع خدمة توصيل للمطار ومراسم الاستقبال.',
    createdAt: '2024-08-20'
  },
  {
    id: 'CRM-1005',
    clientType: 'embassy',
    name: 'أ. فيصل منصور العريقي',
    organizationName: 'قسم المراسم والعلاقات الدبلوماسية — بعثة دولية',
    jobTitle: 'مسؤول حركة الوفود والتشريفات',
    phone: '+967 771 900 800',
    email: 'protocol.sanaa@diplomatic-mission.org',
    address: 'صنعاء — شارع الجزائر / الحي الدبلوماسي',
    nationalIdOrPassport: 'DIP-YE-55210',
    licenseNumber: 'مع سائق مراسم معتمد',
    licenseExpiry: '2029-05-01',
    guarantorName: 'مذكرة تفويض دبلوماسية رسمية معتمدة',
    guarantorType: 'government_id_escrow',
    guarantorDocumentRef: 'DIP-NOTE-2026-88',
    guarantorPhone: '+967 01 440900',
    verificationStatus: 'verified',
    riskScore: 'low',
    creditLimitUsd: 40000,
    totalBookingsCount: 11,
    activeBookingsCount: 0,
    totalSpentYer: 5885000,
    totalSpentUsd: 11000,
    heldDepositYer: 0,
    idDocumentUrl: SAMPLE_ID_DOC_SVG,
    guaranteeDocumentUrl: SAMPLE_GUARANTEE_DOC_SVG,
    notes: 'حجوزات دورية لاستقبال الوفود من مطار صنعاء الدولي وتأمين تنقلات البعثات داخل أمانة العاصمة.',
    createdAt: '2025-05-19'
  },
  {
    id: 'CRM-1006',
    clientType: 'individual',
    name: 'مراد قائد الحرازي',
    organizationName: 'عميل أفراد — قيادة ذاتية',
    jobTitle: 'أعمال حرة',
    phone: '+967 773 404 505',
    email: 'murad.h@mail.com',
    address: 'صنعاء — شارع الستين الشمالي',
    nationalIdOrPassport: '01098823104',
    licenseNumber: 'YE-SAN-33102',
    licenseExpiry: '2026-11-10',
    guarantorName: 'معرض الأمانة للسيارات (قيد التحقق من السجل التجاري)',
    guarantorType: 'commercial_guarantor',
    guarantorDocumentRef: 'كفالة غير مجددة لعام 2026',
    guarantorPhone: '+967 770 998 877',
    verificationStatus: 'blacklisted',
    riskScore: 'high',
    creditLimitUsd: 0,
    totalBookingsCount: 1,
    activeBookingsCount: 0,
    totalSpentYer: 75000,
    totalSpentUsd: 140,
    heldDepositYer: 0,
    notes: 'تم إيقاف التعامل المؤقت بسبب تأخر تسليم المركبة في العقد السابق لمدة 48 ساعة دون إشعار مسبق وتقديم كفالة منتهية الصلاحية.',
    createdAt: '2026-01-12'
  }
];

export const INITIAL_INSPECTIONS: VehicleInspectionRecord[] = [
  {
    id: 'INSP-501',
    bookingId: 'UNT-7801',
    carId: 'car-1',
    carName: 'تويوتا لاندكروزر 300 VXR 2024',
    plateNumber: 'صنعاء 14-88902',
    customerName: 'المهندس / هشام عبدالرحمن المتوكل (مجموعة المتوكل)',
    inspectionType: 'check_out',
    date: '2026-09-28 07:30 AM',
    inspectorName: 'م. ريدان الشامي (مسؤول الفحص الفني - فرع حدة)',
    odometerOutKm: 18420,
    allowedKm: 750,
    extraKm: 0,
    extraKmFeeYer: 0,
    fuelLevelOut: '100%',
    exteriorCondition: 'agency_intact',
    interiorCondition: 'clean_intact',
    tiresAndSpareOk: true,
    safetyKitAndToolsOk: true,
    damageNotes: 'المركبة بحالة الوكالة 100% — تم فحص الإطارات الخمسة، طفاية الحريق، حقيبة الإسعافات، وأجهزة التتبع قبل الانطلاق لخط عدن.',
    damageDeductionYer: 0,
    securityDepositHeldYer: 200000,
    netDepositRefundYer: 200000,
    clearanceStatus: 'checked_out_active'
  },
  {
    id: 'INSP-502',
    bookingId: 'UNT-7803',
    carId: 'car-3',
    carName: 'تويوتا لاندكروزر مصفحة B6 VR7 (معتمدة للمنظمات والوفود)',
    plateNumber: 'صنعاء 22-30041',
    customerName: 'بعثة منظمة الإغاثة والتنمية الدولية (INGO)',
    inspectionType: 'check_in',
    date: '2026-10-08 06:15 PM',
    inspectorName: 'م. ريدان الشامي (مسؤول الفحص الفني - فرع حدة)',
    odometerOutKm: 9100,
    odometerInKm: 9380,
    allowedKm: 400,
    extraKm: 0,
    extraKmFeeYer: 0,
    fuelLevelOut: '100%',
    fuelLevelIn: '100%',
    exteriorCondition: 'agency_intact',
    interiorCondition: 'clean_intact',
    tiresAndSpareOk: true,
    safetyKitAndToolsOk: true,
    damageNotes: 'تم استلام المركبة المصفحة B6 بعد انتهاء مهمة الوفد الأممي بحالة ممتازة ودون أي ملاحظات فنية.',
    damageDeductionYer: 0,
    securityDepositHeldYer: 0,
    netDepositRefundYer: 0,
    clearanceStatus: 'cleared_refunded',
    clearanceCertificateNo: 'CLR-2026-8841'
  },
  {
    id: 'INSP-503',
    bookingId: 'UNT-7790',
    carId: 'car-4',
    carName: 'تويوتا برادو TXL V6 2024 (ميداني وعائلي)',
    plateNumber: 'صنعاء 18-44219',
    customerName: 'أ. نايف حسين العولقي',
    inspectionType: 'check_in',
    date: '2026-10-08 02:00 PM',
    inspectorName: 'م. عمار الكحلاني (مندوب الاستلام والفحص)',
    odometerOutKm: 24500,
    odometerInKm: 25080,
    allowedKm: 500,
    extraKm: 80,
    extraKmFeeYer: 12000,
    fuelLevelOut: '100%',
    fuelLevelIn: '100%',
    exteriorCondition: 'agency_intact',
    interiorCondition: 'clean_intact',
    tiresAndSpareOk: true,
    safetyKitAndToolsOk: true,
    damageNotes: 'المركبة سليمة بالكامل؛ يوجد فقط 80 كم إضافية فوق الحد المجاني (80 × 150 ر.ي = 12,000 ر.ي) وتم رد صافي التأمين للعميل عبر ون كاش.',
    damageDeductionYer: 0,
    securityDepositHeldYer: 150000,
    netDepositRefundYer: 138000,
    clearanceStatus: 'deducted_settled',
    clearanceCertificateNo: 'CLR-2026-8839'
  }
];

export const INITIAL_MAINTENANCE: MaintenanceRecord[] = [
  {
    id: 'MNT-301',
    carId: 'car-1',
    carName: 'تويوتا لاندكروزر 300 VXR 2024',
    plateNumber: 'صنعاء 14-88902',
    serviceType: 'periodic_oil_filter',
    title: 'صيانة دورية 20,000 كم (زيوت تخليقية + فلاتر وكالة + فحص فرامل)',
    workshopOrProvider: 'المركز المتخصص لصيانة تويوتا ولكزس — شارع الستين صنعاء',
    date: '2026-09-25',
    nextDueDate: '2026-11-25',
    odometerKm: 18100,
    nextDueOdometerKm: 23100,
    costYer: 65000,
    costUsd: 121,
    status: 'completed',
    notes: 'تم تغيير زيت المحرك الأصلي Toyota 5W-30 وفلتر الزيت وفلتر الهواء وفحص منظومة التعليق استعداداً لرحلات المحافظات.'
  },
  {
    id: 'MNT-302',
    carId: 'car-3',
    carName: 'تويوتا لاندكروزر مصفحة B6 VR7 (معتمدة للمنظمات والوفود)',
    plateNumber: 'صنعاء 22-30041',
    serviceType: 'armored_sop_check',
    title: 'فحص مطابقة الأمان للمركبات المصفحة UN-SOP (إطارات Run-Flat + منظومة الإطفاء + الاتصال)',
    workshopOrProvider: 'وحدة الهندسة والتجهيز الفني للمركبات المصفحة — صنعاء',
    date: '2026-10-02',
    nextDueDate: '2027-01-02',
    odometerKm: 9050,
    nextDueOdometerKm: 14050,
    costYer: 145000,
    costUsd: 271,
    status: 'completed',
    notes: 'اجتازت المركبة كافة اختبارات معايير الأمم المتحدة (SOP) ومفصلات الأبواب المصفحة والزجاج البالستي.'
  },
  {
    id: 'MNT-303',
    carId: 'car-2',
    carName: 'لكزس LX600 VIP Executive 2024',
    plateNumber: 'صنعاء 11-77210',
    serviceType: 'comprehensive_insurance',
    title: 'تجديد وثيقة التأمين الشامل VIP وتغطية الحوادث والمركبة البديلة لعام 2026-2027',
    workshopOrProvider: 'الشركة اليمنية للتأمين وإعادة التأمين — الإدارة العامة صنعاء',
    date: '2026-09-15',
    nextDueDate: '2027-09-15',
    odometerKm: 11200,
    nextDueOdometerKm: 40000,
    costYer: 642000,
    costUsd: 1200,
    status: 'completed',
    notes: 'بوليصة تأمين شامل رقم POL-YE-99812 تغطي كافة الأخطار داخل أمانة العاصمة وخطوط السفر.'
  },
  {
    id: 'MNT-304',
    carId: 'car-4',
    carName: 'تويوتا برادو TXL V6 2024 (ميداني وعائلي)',
    plateNumber: 'صنعاء 18-44219',
    serviceType: 'tires_brakes',
    title: 'ميزان إلكتروني + تبديل فحمات فرامل أمامية وخلفية وكالة',
    workshopOrProvider: 'مركز Bridgestone وخدمات الإطارات — شارع حدة',
    date: '2026-10-12',
    nextDueDate: '2027-03-12',
    odometerKm: 25080,
    nextDueOdometerKm: 35000,
    costYer: 78000,
    costUsd: 146,
    status: 'scheduled_soon',
    notes: 'مجدولة للصيانة الوقائية بعد عودتها من رحلة محافظة إب لضمان الجاهزية الكاملة.'
  },
  {
    id: 'MNT-305',
    carId: 'car-5',
    carName: 'تويوتا راف فور (RAV4 Hybrid 2024) - الفئة الاقتصادية والعائلية',
    plateNumber: 'صنعاء 15-61209',
    serviceType: 'traffic_customs_permit',
    title: 'تجديد كرت المرور السنوي وفحص منظومة الهايبرد والبطارية',
    workshopOrProvider: 'الإدارة العامة للمرور — أمانة العاصمة + مركز الهايبرد الحديث',
    date: '2026-09-10',
    nextDueDate: '2027-09-10',
    odometerKm: 14300,
    nextDueOdometerKm: 25000,
    costYer: 45000,
    costUsd: 84,
    status: 'completed',
    notes: 'كرت المرور ساري المفعول وكفاءة بطارية الهايبرد 100%.'
  }
];


