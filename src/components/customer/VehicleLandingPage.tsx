import React, { useState } from 'react';
import { Car, Currency, Language } from '../../types';
import {
  X,
  Shield,
  CheckCircle2,
  MapPin,
  Star,
  Calendar,
  Gauge,
  Fuel,
  Users,
  Briefcase,
  FileText,
  Printer,
  ArrowLeft,
  Sparkles,
  Building2,
  UserCheck,
  Car as CarIcon,
  Award
} from 'lucide-react';

interface VehicleLandingPageProps {
  car: Car | null;
  onClose: () => void;
  onBookNow: (car: Car) => void;
  currency: Currency;
  lang: Language;
}

export const VehicleLandingPage: React.FC<VehicleLandingPageProps> = ({
  car,
  onClose,
  onBookNow,
  currency,
  lang
}) => {
  if (!car) return null;

  const isAr = lang === 'ar';
  const galleryImages = car.gallery && car.gallery.length > 0 ? car.gallery : [car.image];

  const [activeImage, setActiveImage] = useState<string>(galleryImages[0] || car.image);
  const [estDays, setEstDays] = useState<number>(3);
  const [estWithDriver, setEstWithDriver] = useState<boolean>(car.category === 'vip_armored');

  // Tiered pricing calculation
  const weeklyRateYer = car.pricePerWeekYer || Math.round(car.pricePerDayYer * 7 * 0.88);
  const monthlyRateYer = car.pricePerMonthYer || Math.round(car.pricePerDayYer * 30 * 0.78);
  const monthlyRateUsd = car.pricePerMonthUsd || Math.round(car.pricePerDayUsd * 30 * 0.78);

  let effectiveDailyYer = car.pricePerDayYer;
  let tierLabel = isAr ? 'التعرفة اليومية القياسية (1 - 6 أيام)' : 'Standard Daily Rate (1-6 Days)';

  if (estDays >= 30) {
    effectiveDailyYer = Math.round(monthlyRateYer / 30);
    tierLabel = isAr ? 'تعرفة العقود الشهرية المخفضة (-22%)' : 'Monthly Corporate Rate (-22%)';
  } else if (estDays >= 7) {
    effectiveDailyYer = Math.round(weeklyRateYer / 7);
    tierLabel = isAr ? 'التعرفة الأسبوعية المخفضة (-12%)' : 'Weekly Discounted Rate (-12%)';
  }

  const driverDailyFeeYer = estWithDriver ? 15000 : 0;
  const totalEstimatedYer = (effectiveDailyYer + driverDailyFeeYer) * estDays;
  const totalEstimatedUsd = Math.round(totalEstimatedYer / 525);

  const getCategoryTitle = () => {
    switch (car.category) {
      case 'vip_armored':
        return isAr ? 'فئة المركبات المصفحة والأمن الوقائي (CEN B6)' : 'Armored VIP Security Unit';
      case 'luxury_suv':
        return isAr ? 'فئة الدفع الرباعي التنفيذي والـ VIP' : 'Executive Luxury 4WD SUV';
      case 'field_4x4':
        return isAr ? 'فئة المهام الميدانية للمنظمات والسفر (4x4)' : 'Field Operations & Travel 4x4';
      case 'executive_sedan':
        return isAr ? 'فئة السيدان التنفيذي والمراسم' : 'Executive Protocol Sedan';
      case 'economy_sedan':
        return isAr ? 'الفئة الاقتصادية والعائلية الموفرة للوقود' : 'Smart Economy & Family Vehicle';
      case 'prestige_van':
        return isAr ? 'فئة الفانات العائلية وسيارات الوفود (VIP Van)' : 'Executive & Family Lounge Van';
      default:
        return isAr ? 'مركبة معتمدة' : 'Certified Vehicle';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-xl flex items-start justify-center p-2 sm:p-6">
      <div className="relative w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto">
        {/* Top Sticky Header Bar */}
        <div className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-400 text-xs font-bold">
              {getCategoryTitle()}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {isAr ? 'رقم اللوحة:' : 'Plate:'} <strong className="text-slate-200">{car.plateNumber}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-2 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{isAr ? 'طباعة عرض المواصفات (PDF)' : 'Print Spec Sheet'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition"
            >
              <X className="w-4 h-4" />
              <span>{isAr ? 'إغلاق' : 'Close'}</span>
            </button>
          </div>
        </div>

        {/* Main Landing Page Content */}
        <div className="p-5 sm:p-8 space-y-10">
          {/* SECTION 1: Hero Gallery + Executive Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Gallery Column (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="dark-media-card relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl">
                <img
                  src={activeImage || car.image}
                  alt={car.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Top badges */}
                <div className="absolute top-4 right-4 flex flex-wrap gap-2">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-bold backdrop-blur ${
                      car.available
                        ? 'bg-emerald-500/90 text-slate-950'
                        : 'bg-amber-500/90 text-slate-950'
                    }`}
                  >
                    {car.available
                      ? isAr
                        ? '✓ متاحة للتسليم أو التوصيل الفوري'
                        : 'Available for Immediate Delivery'
                      : isAr
                      ? 'في مهمة حالياً (متاحة للحجز المسبق)'
                      : 'On Trip (Pre-book Available)'}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-slate-950/85 border border-white/15 text-xs font-mono text-amber-400 backdrop-blur">
                    {car.modelYear}
                  </span>
                </div>

                {/* Bottom location & rating overlay */}
                <div className="absolute bottom-4 inset-x-4 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-lg backdrop-blur border border-white/10">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{car.currentLocation}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-950/80 px-3 py-1.5 rounded-lg backdrop-blur border border-white/10 text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-mono">{car.rating}</span>
                    <span className="text-slate-300 font-normal">({car.tripsCount} رحلة ناجحة)</span>
                  </div>
                </div>
              </div>

              {/* Thumbnail Strip */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {galleryImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImage(imgUrl)}
                      className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                        activeImage === imgUrl
                          ? 'border-amber-400 scale-105 shadow-md'
                          : 'border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`${car.name} view ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Suitability Tags */}
              {car.clientSuitability && car.clientSuitability.length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 ml-2">
                    {isAr ? 'ملائمة ومعتمدة لـ:' : 'Certified For:'}
                  </span>
                  {car.clientSuitability.map((suit, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-amber-300 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{suit}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Vehicle Headline, Narrative & Tiered Pricing Column (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-100 leading-tight font-heading">
                  {isAr ? car.name : car.nameEn}
                </h1>
                <p className="text-xs sm:text-sm font-bold text-amber-400 mt-2 leading-relaxed">
                  {car.landingSubtitle ||
                    (isAr
                      ? 'مركبة مفحوصة ومؤمنة بالكامل، جاهزة للتسليم من الفرع أو التوصيل المباشر لموقعك في صنعاء'
                      : 'Fully inspected and insured vehicle ready for branch pickup or doorstep delivery in Sanaa.')}
                </p>
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  {car.landingDescription ||
                    (isAr
                      ? 'تخضع هذه السيارة لبرنامج الصيانة الدورية المعتمد لدى الشركة المتحدة لتأجير السيارات في صنعاء، وتتوفر للتأجير اليومي والأسبوعي والشهري للشركات والمنظمات والأفراد.'
                      : 'Maintained under strict agency standards for daily, weekly, and monthly corporate or personal rental.')}
                </p>
              </div>

              {car.armoredLevel && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-2.5">
                  <Shield className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-amber-400">مواصفات التصفيح والأمن الوقائي المعتمدة:</div>
                    <div className="mt-0.5 text-slate-200">{car.armoredLevel}</div>
                  </div>
                </div>
              )}

              {/* Tiered Pricing Cards (Daily / Weekly / Monthly NGO & Corporate) */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-slate-300">
                  {isAr ? 'جدول شرائح الأسعار التعاقدية (يومي / أسبوعي / شهري):' : 'Tiered Rental Pricing Matrix:'}
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <div className="text-[11px] text-slate-400">{isAr ? 'إيجار يومي' : 'Daily'}</div>
                    <div className="text-sm sm:text-base font-black font-mono text-amber-400 mt-1">
                      {currency === 'YER'
                        ? `${car.pricePerDayYer.toLocaleString()} ر.ي`
                        : `$${car.pricePerDayUsd}`}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{isAr ? '1 - 6 أيام' : '1-6 Days'}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/40 text-center relative">
                    <div className="text-[11px] text-amber-300 font-bold">{isAr ? 'باقة أسبوعية' : 'Weekly'}</div>
                    <div className="text-sm sm:text-base font-black font-mono text-slate-100 mt-1">
                      {currency === 'YER'
                        ? `${weeklyRateYer.toLocaleString()} ر.ي`
                        : `$${Math.round(weeklyRateYer / 525)}`}
                    </div>
                    <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">
                      {isAr ? 'وفر 12% (7 أيام)' : 'Save 12%'}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/40 text-center">
                    <div className="text-[11px] text-emerald-400 font-bold">
                      {isAr ? 'عقد شهري B2B' : 'Monthly Lease'}
                    </div>
                    <div className="text-sm sm:text-base font-black font-mono text-emerald-300 mt-1">
                      {currency === 'YER'
                        ? `${monthlyRateYer.toLocaleString()} ر.ي`
                        : `$${monthlyRateUsd}`}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {isAr ? 'للمنظمات والشركات' : 'NGOs & Firms'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Instant Cost Calculator on Vehicle Landing Page */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">
                    {isAr ? 'حاسبة التكلفة التعاقدية الفورية لهذه المركبة:' : 'Instant Rental Estimator:'}
                  </span>
                  <span className="text-[11px] text-amber-400 font-semibold">{tierLabel}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">
                      {isAr ? 'عدد أيام الإيجار المطلوبة:' : 'Rental Duration (Days):'}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        max={365}
                        value={estDays}
                        onChange={(e) => setEstDays(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setEstDays(7)}
                        className="px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 hover:border-amber-400 shrink-0"
                      >
                        أسبوع
                      </button>
                      <button
                        type="button"
                        onClick={() => setEstDays(30)}
                        className="px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 hover:border-amber-400 shrink-0"
                      >
                        شهر
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">
                      {isAr ? 'نظام القيادة:' : 'Driving Mode:'}
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setEstWithDriver(false)}
                        className={`py-2 px-2 rounded-xl border text-[11px] font-bold transition ${
                          !estWithDriver
                            ? 'border-amber-500 bg-amber-500/15 text-amber-300'
                            : 'border-slate-800 bg-slate-900 text-slate-400'
                        }`}
                      >
                        {isAr ? 'قيادة ذاتية' : 'Self-Drive'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEstWithDriver(true)}
                        className={`py-2 px-2 rounded-xl border text-[11px] font-bold transition ${
                          estWithDriver
                            ? 'border-amber-500 bg-amber-500/15 text-amber-300'
                            : 'border-slate-800 bg-slate-900 text-slate-400'
                        }`}
                      >
                        {isAr ? 'مع سائق معتمد' : 'With Chauffeur'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-slate-400">
                      {isAr ? 'الإجمالي التقديري للعقد:' : 'Estimated Contract Total:'}
                    </div>
                    <div className="text-xl font-black font-mono text-amber-400">
                      {currency === 'YER'
                        ? `${totalEstimatedYer.toLocaleString()} ريال يمني`
                        : `$${totalEstimatedUsd} USD`}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {!estWithDriver
                        ? isAr
                          ? `+ مبلغ التأمين المسترد عند التسليم: ${car.securityDepositYer.toLocaleString()} ر.ي (أو كفالة تجارية)`
                          : `+ Refundable Deposit: $${car.securityDepositUsd} (or Commercial Guarantee)`
                        : isAr
                        ? '✓ مع سائق الشركة: إعفاء كامل من الكفالة ومبلغ التأمين'
                        : '✓ With Company Driver: No security deposit required'}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onBookNow(car)}
                    className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 transition"
                  >
                    <span>{isAr ? 'تعاقد واحجز المركبة الآن' : 'Proceed to Contract & Book'}</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: Full Technical & Operational Specs Grid */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Gauge className="w-4 h-4 text-amber-400" />
              <span>{isAr ? 'المواصفات الفنية والتشغيلية الكاملة للمركبة' : 'Full Technical & Operational Specifications'}</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-1">{isAr ? 'المحرك والقوة:' : 'Engine & Power:'}</span>
                <span className="font-bold text-slate-100">{car.engine}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-1">{isAr ? 'ناقل الحركة:' : 'Transmission:'}</span>
                <span className="font-bold text-slate-100">{car.transmission}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-1">{isAr ? 'نظام الدفع والتعليق:' : 'Drive System:'}</span>
                <span className="font-bold text-slate-100">
                  {car.specs?.driveType || 'دفع رباعي / أمامي متوازن'}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-1">{isAr ? 'نوع الوقود وسعة الخزان:' : 'Fuel & Tank:'}</span>
                <span className="font-bold text-slate-100">
                  {car.fuelType} ({car.specs?.tankCapacity || '80 لتر'})
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-1">{isAr ? 'عدد المقاعد وسعة الأمتعة:' : 'Seating & Cargo:'}</span>
                <span className="font-bold text-slate-100">
                  {car.seats} ركاب · {car.specs?.luggageCapacity || '4 حقائب'}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-1">{isAr ? 'الكيلومترات المجانية يومياً:' : 'Free Daily Mileage:'}</span>
                <span className="font-bold text-emerald-400 font-mono">
                  {car.freeKmPerDay || 250} كم / يوم (الزائد: {car.extraKmFeeYer || 150} ر.ي/كم)
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-1">{isAr ? 'معايير السلامة والأمان:' : 'Safety Standard:'}</span>
                <span className="font-bold text-slate-100">
                  {car.specs?.safetyRating || 'فحص فني شامل + تتبع GPS'}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-1">{isAr ? 'التغطية التأمينية:' : 'Insurance Coverage:'}</span>
                <span className="font-bold text-amber-400">
                  {car.specs?.insuranceType || 'تأمين شامل مع مركبة بديلة'}
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 3: Features & Contractual Requirements Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Equipment & Features */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>{isAr ? 'التجهيزات والمزايا المتوفرة في هذه المركبة' : 'Included Vehicle Features'}</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
                {(isAr ? car.features : car.featuresEn).map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 bg-slate-900/70 p-2.5 rounded-xl border border-slate-800/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rental & Delivery Requirements */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-3">
              <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>
                  {isAr
                    ? 'إجراءات التعاقد واستلام المركبة'
                    : 'Contract & Handover Requirements'}
                </span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isAr
                  ? 'لإتمام حجز المركبة وتجهيزها للاستلام من الفرع أو التوصيل إلى موقعك في صنعاء:'
                  : 'To complete your vehicle booking for branch pickup or direct delivery in Sanaa:'}
              </p>
              <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside">
                <li>
                  <strong className="text-slate-100">الوثائق الرسمية:</strong> البطاقة الشخصية الذكية أو جواز السفر الساري + رخصة القيادة السارية (للتأجير بدون سائق).
                </li>
                <li>
                  <strong className="text-slate-100">الضمان المعتمد:</strong> كفالة تجارية مصدقة، أو خطاب تفويض من منظمة/شركة، أو إيداع تأمين نقدي مسترد ({car.securityDepositYer.toLocaleString()} ر.ي).
                </li>
                <li>
                  <strong className="text-slate-100">توقيع عقد الإيجار:</strong> الموافقة على شروط العقد والتوقيع عليه ومطابقة أصل الوثائق عند استلام المركبة.
                </li>
                <li>
                  <strong className="text-slate-100">السداد المالي:</strong> متاح عبر التحويل البنكي أو المحافظ الإلكترونية المعتمدة (الكريمي، فلوسك، ون كاش، جوالي، جيب).
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
