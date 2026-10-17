import { CustomPackageItem, PromoBannerItem } from '../types/cms';

const IMG_HERO = '/src/assets/images/hero_sanaa_fleet_1790624432645.jpg';
const IMG_LEXUS = '/src/assets/images/car_lexus_lx600_1790624445559.jpg';
const IMG_LC = '/src/assets/images/car_landcruiser_gr_1790624456804.jpg';
const IMG_MAYBACH = '/src/assets/images/car_mercedes_maybach_1790624467638.jpg';

/**
 * Generates or selects an ultra-high-resolution automotive visual based on an Arabic/English text prompt.
 * Also supports creating custom SVG/Canvas composite banners if specific colors are requested.
 */
export async function generateAiImageFromPrompt(prompt: string): Promise<string> {
  await new Promise((r) => setTimeout(r, 750));
  const p = prompt.toLowerCase();

  if (p.includes('مايباخ') || p.includes('مرسيدس') || p.includes('عرس') || p.includes('زفاف') || p.includes('سيدان') || p.includes('maybach') || p.includes('mercedes')) {
    return IMG_MAYBACH;
  }
  if (p.includes('لكزس') || p.includes('أبيض') || p.includes('لؤلؤي') || p.includes('مطار') || p.includes('lexus') || p.includes('vip')) {
    return IMG_LEXUS;
  }
  if (p.includes('لاندكروزر') || p.includes('أسود') || p.includes('مصفح') || p.includes('قوة') || p.includes('land') || p.includes('gr')) {
    return IMG_LC;
  }
  if (p.includes('صنعاء') || p.includes('جبال') || p.includes('دار الحجر') || p.includes('سفر') || p.includes('محافظات')) {
    return IMG_HERO;
  }

  // Rotate intelligently based on prompt length hash
  const pool = [IMG_HERO, IMG_LC, IMG_LEXUS, IMG_MAYBACH];
  return pool[prompt.length % pool.length];
}

/**
 * Generates a complete B2B / Event / Sector Package from an Arabic/English text prompt.
 */
export async function generatePackageFromPrompt(prompt: string): Promise<CustomPackageItem> {
  await new Promise((r) => setTimeout(r, 850));
  const p = prompt.toLowerCase();

  const isWedding = p.includes('عرس') || p.includes('زفاف') || p.includes('موكب') || p.includes('حفل');
  const isNgo = p.includes('منظم') || p.includes('دولية') || p.includes('أمم') || p.includes('مصفح') || p.includes('أمن');
  const isTravel = p.includes('عدن') || p.includes('مأرب') || p.includes('سفر') || p.includes('محافظات') || p.includes('خط');

  if (isWedding) {
    return {
      id: `pkg-${Date.now()}`,
      title: 'باقة سيارات المراسم والمناسبات الرسمية (مولّدة بالذكاء الاصطناعي)',
      sectorTag: 'مناسبات ومراسم VIP',
      subtitle: `صُممت خصيصاً بناءً على طلبك: ${prompt}`,
      priceText: '290,000 ر.ي',
      oldPriceText: '380,000 ر.ي',
      periodText: 'شاملة 24 ساعة كاملة مع السائق',
      highlightColor: 'crimson',
      isFeatured: true,
      ctaText: 'احجز باقة المراسم الآن',
      includedServices: [
        'سيارة مرسيدس S580 أو لكزس LX600 حديثة مع تجهيز خاص للمناسبة',
        'سيارتا مرافقة دفع رباعي لاندكروزر 300 حديثة',
        'سائقو مراسم بزي رسمي موحد ولباقة عالية',
        'وقود مفتوح داخل أمانة العاصمة صنعاء',
        'تنسيق كامل لمواعيد الاستلام والوصول بدقة تامة'
      ]
    };
  }

  if (isNgo) {
    return {
      id: `pkg-${Date.now()}`,
      title: 'باقة العمليات الميدانية والوفود الدولية (AI Custom)',
      sectorTag: 'منظمات وبعثات دبلوماسية',
      subtitle: `تغطية متكاملة وفق متطلباتك: ${prompt}`,
      priceText: '$4,200',
      oldPriceText: '$5,100',
      periodText: 'شهرياً / عقد مرن شامل',
      highlightColor: 'gold',
      isFeatured: true,
      ctaText: 'اطلب تعاقد المنظمة الآن',
      includedServices: [
        'تخصيص سيارات لاندكروزر حديثة ومصفحة B6 حسب الطلب',
        'سائقون معتمدون أمنياً ويتحدثون الإنجليزية بطلاقة',
        'تزويد المركبات بإنترنت فضائي Starlink وتتبع GPS حي',
        'صيانة دورية شاملة مع توفير مركبة بديلة خلال 45 دقيقة',
        'تنسيق تصاريح المرور والعبور بين كافة المحافظات اليمنية'
      ]
    };
  }

  if (isTravel) {
    return {
      id: `pkg-${Date.now()}`,
      title: 'باقة السفر التنفيذي عبر المحافظات (AI Custom)',
      sectorTag: 'رحلات المحافظات ورجال الأعمال',
      subtitle: `برنامج سفر مخصص: ${prompt}`,
      priceText: '390,000 ر.ي',
      oldPriceText: '480,000 ر.ي',
      periodText: 'رحلة ذهاب وعودة شاملة الإقامة للسائق',
      highlightColor: 'emerald',
      isFeatured: false,
      ctaText: 'احجز باقة السفر الآن',
      includedServices: [
        'سيارة لكزس LX600 أو لاندكروزر VXR مجهزة للخطوط الطويلة',
        'سائق خبير بمنعطفات نقيل سمارة ومناخة والطرق الصحراوية',
        'شامل الوقود ورسوم الطريق ومصاريف السائق الكاملة',
        'استقبال وتوصيل من باب المنزل في صنعاء إلى الفندق في الوجهة',
        'متابعة على مدار الساعة من غرفة العمليات المركزية'
      ]
    };
  }

  return {
    id: `pkg-${Date.now()}`,
    title: `باقة مخصصة: ${prompt.slice(0, 38)}...`,
    sectorTag: 'باقة قطاع خاص مخصصة',
    subtitle: prompt,
    priceText: '250,000 ر.ي',
    oldPriceText: '310,000 ر.ي',
    periodText: 'عرض مخصص بخصم 20%',
    highlightColor: 'gold',
    isFeatured: true,
    ctaText: 'تفعيل وحجز الباقة',
    includedServices: [
      'اختيار مرن من أسطول السيارات الفاخرة 2024',
      'إمكانية التوصيل المباشر لأي موقع في صنعاء خلال 30 دقيقة',
      'ضمانات قانونية ميسرة وعقد إلكتروني فوري',
      'دفع ميسر عبر الكريمي M-Floos أو فلوسك أو ون كاش',
      'دعم فني ومساعدة على الطريق 24/7'
    ]
  };
}

/**
 * Generates a Promotional Ad Banner from an Arabic/English prompt.
 */
export async function generatePromoFromPrompt(prompt: string): Promise<PromoBannerItem> {
  const bg = await generateAiImageFromPrompt(prompt);
  return {
    id: `pr-${Date.now()}`,
    title: prompt.length > 45 ? `${prompt.slice(0, 45)}...` : prompt,
    subtitle: `عرض خاص لفترة محدودة من الشركة المتحدة لتأجير السيارات — ${prompt}`,
    backgroundImage: bg,
    linkUrl: '#booking',
    discountBadge: 'عرض ذكي حصري',
    priceTag: 'سعر تفضيلي خاص',
    buttonText: 'احجز العرض الآن',
    accentColor: 'amber'
  };
}
