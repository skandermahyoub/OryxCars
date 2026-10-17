export interface ConciergeMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedAction?: {
    type: 'open_booking' | 'view_route' | 'view_guarantees';
    payload?: string;
    label: string;
  };
}

export const INITIAL_CONCIERGE_MESSAGES: ConciergeMessage[] = [
  {
    id: 'msg-welcome',
    sender: 'assistant',
    text: 'مرحباً بك في «الشركة المتحدة لتأجير السيارات — صنعاء». يسعدنا الرد على استفساراتكم حول فئات السيارات المتاحة للإيجار (للأفراد، الشركات، والمنظمات الدولية)، إجراءات التعاقد والضمانات، خدمة السائق الخاص، وطرق السداد عبر الحسابات البنكية والمحافظ الإلكترونية. كيف يمكننا مساعدتكم اليوم؟',
    timestamp: 'الآن'
  }
];

export async function askSanaaConcierge(userQuery: string, lang: 'ar' | 'en' = 'ar'): Promise<string> {
  await new Promise(r => setTimeout(r, 600));

  const q = userQuery.toLowerCase();

  if (lang === 'en') {
    if (q.includes('guarantee') || q.includes('law') || q.includes('deposit') || q.includes('requirement')) {
      return `Under Yemeni commercial leasing regulations, United Fleet requires one of the following official guarantees for self-drive rentals:\n1. Certified Commercial Guarantor (active Commercial Register).\n2. Refundable Cash Security Deposit.\n3. Certified Bank Guarantee Cheque.\n4. Official authorization letter from an accredited UN agency, INGO, or corporation.\n\nNote: Rentals with a company chauffeur do not require a vehicle guarantee.`;
    }
    if (q.includes('aden') || q.includes('inter') || q.includes('highway') || q.includes('trip')) {
      return `For inter-governorate trips from Sana'a to Aden, Marib, Taiz, Ibb, Hodeidah, or Hadhramaut, our Land Cruiser 300, Prado TXL, and Staria VIP vehicles are available with experienced highway drivers.`;
    }
    if (q.includes('payment') || q.includes('wallet') || q.includes('kuraimi') || q.includes('floosak')) {
      return `We accept official corporate bank transfers as well as all major Yemeni e-wallets: Kuraimi M-Floos, Floosak, OneCash, Jawali, and Jeeb.`;
    }
    return `United Car Rental in Sana'a provides a comprehensive fleet including B6 armored vehicles, 4x4 field SUVs, executive VIP vehicles, and fuel-efficient economy cars for individuals, companies, and international organizations.`;
  }

  if (q.includes('ضمان') || q.includes('شروط') || q.includes('قانون') || q.includes('تأمين') || q.includes('كفال')) {
    return `بالنسبة لتأجير السيارات بدون سائق (قيادة ذاتية)، نعتمد أربعة خيارات مرنة للضمان:
1. كفالة تجارية مصدقة من تاجر أو شركة ذات سجل تجاري ساري.
2. إيداع مبلغ تأمين نقدي مسترد (يُعاد فور تسليم المركبة وإتمام الفحص الفني).
3. شيك مصرفي مصدق مسحوب على أحد البنوك اليمنية المعتمدة.
4. خطاب تفويض رسمي من منظمة دولية أو شركة متعاقدة.
علماً أن الحجز مع سائق من الشركة يعفي المستأجر من تقديم ضمانة على المركبة.`;
  }

  if (q.includes('عدن') || q.includes('سفر') || q.includes('طريق') || q.includes('محافظ') || q.includes('سمارة') || q.includes('مارب') || q.includes('مأرب') || q.includes('حضرموت')) {
    return `نوفر خدمة السفر بين المحافظات مع سائقين معتمدين ذوي خبرة عالية بالطرق الجبلية والخطوط الطويلة:
• خط صنعاء ⇄ إب ⇄ عدن (380 كم).
• خط صنعاء ⇄ مأرب (175 كم).
• خط صنعاء ⇄ مناخة ⇄ الحديدة (230 كم).
• خط صنعاء ⇄ ذمار ⇄ تعز (260 كم).
• خط صنعاء ⇄ شبوة ⇄ حضرموت (سيئون والمكلا).
جميع المركبات تخضع للفحص الفني الشامل قبل الانطلاق ومزودة بأنظمة التتبع.`;
  }

  if (q.includes('دفع') || q.includes('كريمي') || q.includes('فلوسك') || q.includes('ون كاش') || q.includes('محفظ') || q.includes('جوالي') || q.includes('سعر')) {
    return `تتوفر خيارات سداد متعددة وموثقة:
• بنك الكريمي (إم فلوس M-Floos) - حساب الشركات: 3024881903.
• محفظة فلوسك (بنك اليمن والكويت): 777002911.
• محفظة ون كاش (OneCash)، جوالي، وجيب.
• التحويل البنكي الرسمي للشركات والمنظمات مع إصدار فاتورة ضريبية معتمدة.`;
  }

  if (q.includes('توصيل') || q.includes('حدة') || q.includes('بيت بوس') || q.includes('السبعين') || q.includes('مطار') || q.includes('فندق')) {
    return `نوفر خدمة تسليم واستلام المركبة في موقع العميل داخل أمانة العاصمة صنعاء (المنازل، الشركات، الفنادق، ومطار صنعاء الدولي):
• التوصيل مجاني للعقود التي تزيد مدتها عن 3 أيام داخل صنعاء.
• عند وصول المندوب يتم توقيع محضر الفحص الفني ومطابقة أصل الوثائق وتسليم المفتاح فوراً.`;
  }

  return `يسعدنا خدمتكم في الشركة المتحدة لتأجير السيارات — صنعاء:
• عقود تأجير للمنظمات الدولية والشركات (سيارات ميدانية 4x4 وسيارات مصفحة B6).
• تأجير سيارات تنفيذية وخدمات مراسم واستقبال مطار (لكزس LX600 ومرسيدس S580).
• تأجير سيارات اقتصادية وعائلية للأفراد والمغتربين (راف فور هايبرد وإلنترا 2024).
• للتواصل المباشر مع مركز الحجوزات: +967 771 234 567.`;
}
