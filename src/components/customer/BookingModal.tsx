import React, { useState, useRef, useEffect } from 'react';
import {
  Car,
  Booking,
  RentalType,
  PaymentWallet,
  GuaranteeType,
  Governorate,
  Currency,
  Language
} from '../../types';
import {
  YEMENI_WALLETS,
  SANAA_NEIGHBORHOODS,
  INTER_CITY_ROUTES,
  SAMPLE_ID_DOC_SVG,
  SAMPLE_LICENSE_DOC_SVG,
  SAMPLE_GUARANTEE_DOC_SVG,
  SAMPLE_RECEIPT_DOC_SVG,
  SAMPLE_SIGNATURE_SVG
} from '../../data/mockData';
import {
  X,
  Shield,
  Check,
  ArrowLeft,
  ArrowRight,
  QrCode,
  Upload,
  FileCheck2,
  FileText,
  PenTool,
  AlertCircle,
  Building2,
  User,
  Globe2,
  Truck,
  MapPin,
  RotateCcw,
  Plane,
  Wifi,
  Baby,
  Sparkles,
  Send,
  Hotel
} from 'lucide-react';

interface BookingModalProps {
  cars: Car[];
  selectedCar?: Car;
  isOpen: boolean;
  onClose: () => void;
  onSubmitBooking: (booking: Booking) => void;
  currency: Currency;
  lang: Language;
  companyName?: string;
  whatsappNumber?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  cars,
  selectedCar: initialCar,
  isOpen,
  onClose,
  onSubmitBooking,
  currency,
  lang,
  companyName = 'الشركة المتحدة لتأجير السيارات — صنعاء',
  whatsappNumber = '967771234567'
}) => {
  const isAr = lang === 'ar';

  const [step, setStep] = useState<number>(1);
  const [validationError, setValidationError] = useState<string>('');

  // Step 1: Service, Client Segment, Vehicle & Delivery
  const [clientCategory, setClientCategory] = useState<'individual' | 'corporate' | 'un_ngo'>('individual');
  const [organizationName, setOrganizationName] = useState<string>('');
  const [selectedCarId, setSelectedCarId] = useState<string>(initialCar?.id || cars[0]?.id || '');
  const [rentalType, setRentalType] = useState<RentalType>('self_drive');
  const [deliveryMode, setDeliveryMode] = useState<'doorstep_delivery' | 'branch_pickup'>('doorstep_delivery');
  const [pickupServiceType, setPickupServiceType] = useState<'branch_pickup' | 'airport_vip' | 'hotel_delivery' | 'doorstep_delivery'>('doorstep_delivery');
  const [flightNumber, setFlightNumber] = useState<string>('IY-601 (طيران اليمنية - مطار صنعاء الدولي)');
  const [airportPlacardName, setAirportPlacardName] = useState<string>('المهندس / هشام المتوكل');
  const [hotelName, setHotelName] = useState<string>('فندق موفنبيك صنعاء - جناح 402');
  const [governorate, setGovernorate] = useState<Governorate>('aden');
  const [pickupLocation, setPickupLocation] = useState<string>(SANAA_NEIGHBORHOODS[0]);
  const [customAddress, setCustomAddress] = useState<string>('شارع القدس - جوار فندق موفنبيك');
  const [startDate, setStartDate] = useState<string>('2026-10-10');
  const [days, setDays] = useState<number>(3);
  const [withDriver, setWithDriver] = useState<boolean>(false);

  // Chauffeur VIP Protocol Suite
  const [chauffeurUniform, setChauffeurUniform] = useState<boolean>(true);
  const [chauffeurLanguage, setChauffeurLanguage] = useState<'ar' | 'en'>('ar');

  // VIP Concierge Add-ons
  const [addonChildSeat, setAddonChildSeat] = useState<boolean>(false);
  const [addonPocketWifi, setAddonPocketWifi] = useState<boolean>(true);
  const [addonSalikTag, setAddonSalikTag] = useState<boolean>(false);
  const [addonRoadside, setAddonRoadside] = useState<boolean>(true);
  const [addonInterPermit, setAddonInterPermit] = useState<boolean>(false);

  // Remote Price Negotiation State (التفاوض على السعر عن بُعد)
  const [isNegotiating, setIsNegotiating] = useState<boolean>(false);
  const [proposedDailyYer, setProposedDailyYer] = useState<number>(0);
  const [negotiationNote, setNegotiationNote] = useState<string>(
    'التزام كامل بالقيادة داخل المدينة وسداد الدفعة مقدماً عن بُعد قبل الاستلام'
  );

  // Step 2: Renter Info, Guarantee & Attached KYC Documents
  const [guaranteeType, setGuaranteeType] = useState<GuaranteeType>('commercial_guarantor');
  const [guarantorName, setGuarantorName] = useState<string>('مجموعة المتوكل التجارية (سجل تجاري 1094 - الغرفة التجارية صنعاء)');
  const [customerName, setCustomerName] = useState<string>('المهندس / هشام عبدالرحمن المتوكل');
  const [customerPhone, setCustomerPhone] = useState<string>('+967 770 112 233');
  const [customerIdNumber, setCustomerIdNumber] = useState<string>('01010088921 (بطاقة شخصية ذكية)');
  const [customerLicenseNumber, setCustomerLicenseNumber] = useState<string>('YE-SAN-994120');

  const [idDocumentUrl, setIdDocumentUrl] = useState<string>(SAMPLE_ID_DOC_SVG);
  const [licenseDocumentUrl, setLicenseDocumentUrl] = useState<string>(SAMPLE_LICENSE_DOC_SVG);
  const [guaranteeDocumentUrl, setGuaranteeDocumentUrl] = useState<string>(SAMPLE_GUARANTEE_DOC_SVG);

  // Step 3: Rental Agreement & Digital Signature
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(true);
  const [agreedToOriginalCheck, setAgreedToOriginalCheck] = useState<boolean>(true);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string>(SAMPLE_SIGNATURE_SVG);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // Step 4: Yemeni E-Wallet Payment & Receipt Upload
  const [paymentPlan, setPaymentPlan] = useState<'full_100' | 'deposit_30' | 'with_escrow'>('full_100');
  const [wallet, setWallet] = useState<PaymentWallet>('kuraimi');
  const [trxRef, setTrxRef] = useState<string>('KRM-TRX-884920');
  const [paymentReceiptUrl, setPaymentReceiptUrl] = useState<string>(SAMPLE_RECEIPT_DOC_SVG);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (initialCar?.id) {
      setSelectedCarId(initialCar.id);
    }
  }, [initialCar]);

  const currentCar = cars.find((c) => c.id === selectedCarId) || cars[0];

  // Tiered Pricing Calculation (Daily vs Weekly -12% vs Monthly -22%)
  let effectiveDailyYer = currentCar ? currentCar.pricePerDayYer : 0;
  let discountBadge = '';
  if (days >= 30 && currentCar) {
    effectiveDailyYer = Math.round((currentCar.pricePerMonthYer || currentCar.pricePerDayYer * 30 * 0.78) / 30);
    discountBadge = isAr ? 'خصم العقود الشهرية (-22%)' : 'Monthly Lease Discount (-22%)';
  } else if (days >= 7 && currentCar) {
    effectiveDailyYer = Math.round((currentCar.pricePerWeekYer || currentCar.pricePerDayYer * 7 * 0.88) / 7);
    discountBadge = isAr ? 'خصم الإيجار الأسبوعي (-12%)' : 'Weekly Discount (-12%)';
  }

  useEffect(() => {
    if (currentCar) {
      setProposedDailyYer(Math.round(effectiveDailyYer * 0.92));
    }
  }, [selectedCarId, days, effectiveDailyYer, currentCar]);

  if (!isOpen) return null;

  let standardBasePriceYer = effectiveDailyYer * days;
  let activeDailyYer = isNegotiating && proposedDailyYer > 0 ? proposedDailyYer : effectiveDailyYer;
  let basePriceYer = activeDailyYer * days;

  // Highway inter-governorate supplement
  if (rentalType === 'inter_governorate') {
    const route = INTER_CITY_ROUTES.find((r) => r.destination === governorate);
    const distance = route ? route.distanceKm : 300;
    const highwayFeeYer = distance * (currentCar ? currentCar.pricePerKmInterCityYer : 250);
    standardBasePriceYer += highwayFeeYer;
    basePriceYer += highwayFeeYer;
  }

  // Chauffeur fee if requested
  const isDriverIncluded = rentalType !== 'self_drive' || withDriver;
  if (isDriverIncluded) {
    standardBasePriceYer += 15000 * days;
    basePriceYer += 15000 * days;
  }

  // VIP Add-ons calculation
  let addonsTotalYer = 0;
  if (addonChildSeat) addonsTotalYer += 1500 * days;
  if (addonPocketWifi) addonsTotalYer += 2500 * days;
  if (addonSalikTag) addonsTotalYer += 1000 * days;
  if (addonInterPermit) addonsTotalYer += 5000;
  standardBasePriceYer += addonsTotalYer;
  basePriceYer += addonsTotalYer;

  // VIP Airport Meet-and-Greet service supplement
  const airportVipFeeYer = (rentalType === 'airport_vip' || pickupServiceType === 'airport_vip') ? 10000 : 0;
  standardBasePriceYer += airportVipFeeYer;
  basePriceYer += airportVipFeeYer;

  // Doorstep / Hotel delivery fee in Sana'a (Free for >= 3 days, else 5,000 YER)
  const isCustomDelivery = deliveryMode === 'doorstep_delivery' || pickupServiceType === 'hotel_delivery' || pickupServiceType === 'doorstep_delivery';
  const deliveryFeeYer = isCustomDelivery && days < 3 ? 5000 : 0;
  standardBasePriceYer += deliveryFeeYer;
  basePriceYer += deliveryFeeYer;

  const basePriceUsd = Math.round(basePriceYer / 525);
  const standardPriceUsd = Math.round(standardBasePriceYer / 525);
  const requestedDiscountPct =
    standardBasePriceYer > 0
      ? Math.max(0, Math.round(((standardBasePriceYer - basePriceYer) / standardBasePriceYer) * 100))
      : 0;
  const isInstantAutoApprovedDiscount = isNegotiating && requestedDiscountPct <= 10;

  // Required payment now based on selected Payment Plan
  const escrowYer = !isDriverIncluded && guaranteeType === 'cash_deposit' ? currentCar.securityDepositYer : 0;
  const requiredNowYer =
    paymentPlan === 'deposit_30'
      ? Math.round(basePriceYer * 0.3)
      : paymentPlan === 'with_escrow'
      ? basePriceYer + currentCar.securityDepositYer
      : basePriceYer + escrowYer;
  const requiredNowUsd = Math.round(requiredNowYer / 525);
  const remainingYer = Math.max(0, basePriceYer - (paymentPlan === 'deposit_30' ? requiredNowYer : basePriceYer));

  // File Upload Helper (converts selected image file to Data URL)
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setter(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Canvas Digital Signature handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      setSignatureDataUrl(canvas.toDataURL('image/png'));
    }
  };

  const clearSignatureCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
    setSignatureDataUrl('');
  };

  const validateAndProceed = () => {
    setValidationError('');
    if (step === 2) {
      if (!customerName.trim() || !customerPhone.trim() || !customerIdNumber.trim()) {
        setValidationError(isAr ? 'يرجى إدخال الاسم الكامل ورقم الهاتف ورقم الهوية السارية.' : 'Please complete customer details.');
        return;
      }
      if (!idDocumentUrl) {
        setValidationError(isAr ? 'يرجى إرفاق صورة البطاقة الشخصية الذكية أو جواز السفر.' : 'Please attach ID document.');
        return;
      }
      if (!isDriverIncluded && !licenseDocumentUrl) {
        setValidationError(isAr ? 'القيادة الذاتية تتطلب إرفاق صورة رخصة القيادة السارية.' : 'Self-drive requires a valid driving license copy.');
        return;
      }
      if (!isDriverIncluded && !guaranteeDocumentUrl) {
        setValidationError(isAr ? 'يرجى إرفاق وثيقة الضمان المعتمدة (كفالة تجارية / شيك / إقرار تأمين).' : 'Please attach guarantee document.');
        return;
      }
    }
    if (step === 3) {
      if (!agreedToTerms || !agreedToOriginalCheck) {
        setValidationError(
          isAr
            ? 'لا يمكن متابعة الحجز دون قراءة اتفاقية التأجير والموافقة على كافة بنودها القانونية.'
            : 'You must read and accept the rental agreement terms.'
        );
        return;
      }
      if (!signatureDataUrl) {
        setValidationError(
          isAr
            ? 'يرجى التوقيع إلكترونياً في مربع التوقيع لاعتماد اتفاقية التأجير.'
            : 'Please provide your digital signature on the contract.'
        );
        return;
      }
    }
    setStep((s) => Math.min(4, s + 1));
  };

  const handlePrev = () => {
    setValidationError('');
    setStep((s) => Math.max(1, s - 1));
  };

  const handleFinish = () => {
    if (!trxRef.trim() && wallet !== 'cash') {
      setValidationError(isAr ? 'يرجى إدخال رقم إشعار الحوالة المالية أو إرفاق صورة الإشعار.' : 'Please provide transaction reference.');
      return;
    }
    setValidationError('');
    setIsSubmitting(true);
    setTimeout(() => {
      const newBooking: Booking = {
        id: `UNT-${Math.floor(1000 + Math.random() * 9000)}`,
        carId: currentCar.id,
        carName: currentCar.name,
        carImage: currentCar.image,
        clientCategory,
        organizationName: clientCategory !== 'individual' ? organizationName || 'جهة متعاقدة' : undefined,
        customerName,
        customerPhone,
        customerIdNumber,
        customerLicenseNumber: !isDriverIncluded ? customerLicenseNumber : undefined,
        guaranteeType,
        guaranteeStatus: 'under_review',
        guaranteeDetails: isDriverIncluded
          ? 'معفي من كفالة المركبة (حجز مع سائق معتمد من الشركة)'
          : guarantorName,
        idDocumentUrl,
        licenseDocumentUrl: !isDriverIncluded ? licenseDocumentUrl : undefined,
        guaranteeDocumentUrl: !isDriverIncluded ? guaranteeDocumentUrl : undefined,
        paymentReceiptUrl,
        contractAgreed: true,
        contractSignedAt: new Date().toLocaleString('ar-YE'),
        customerSignatureDataUrl: signatureDataUrl || SAMPLE_SIGNATURE_SVG,
        rentalType,
        deliveryMode,
        pickupServiceType,
        flightNumber: pickupServiceType === 'airport_vip' ? flightNumber : undefined,
        airportPlacardName: pickupServiceType === 'airport_vip' ? airportPlacardName : undefined,
        hotelRoomOrAddress: pickupServiceType === 'hotel_delivery' ? hotelName : undefined,
        chauffeurOption: isDriverIncluded
          ? {
              requested: true,
              language: chauffeurLanguage,
              uniformVip: chauffeurUniform
            }
          : undefined,
        selectedAddons: {
          childSeat: addonChildSeat,
          pocketWifi: addonPocketWifi,
          salikTag: addonSalikTag,
          roadsideAssistance: addonRoadside,
          interGovernoratePermit: addonInterPermit
        },
        addonsTotalYer,
        depositStatus: 'held',
        depositHeldAmountYer: currentCar.securityDepositYer,
        pickupLocation:
          pickupServiceType === 'airport_vip'
            ? `استقبال مطار VIP: صالة الوصول — رحلة ${flightNumber} (${airportPlacardName})`
            : pickupServiceType === 'hotel_delivery'
            ? `توصيل فندق: ${hotelName}`
            : deliveryMode === 'doorstep_delivery'
            ? `توصيل مباشر: ${pickupLocation} - ${customAddress}`
            : `استلام من الفرع: ${currentCar.currentLocation}`,
        destination:
          rentalType === 'inter_governorate'
            ? `خط سفر إلى محافظة ${governorate}`
            : rentalType === 'airport_vip'
            ? 'مطار صنعاء الدولي ⇄ أمانة العاصمة'
            : isAr
            ? 'داخل أمانة العاصمة صنعاء'
            : 'Within Sanaa Capital',
        governorate: rentalType === 'inter_governorate' ? governorate : undefined,
        startDate,
        endDate: new Date(new Date(startDate).getTime() + days * 86400000).toISOString().split('T')[0],
        days,
        withDriver: isDriverIncluded,
        driverName: isDriverIncluded ? 'الكابتن / وضاح أحمد الحاشدي' : undefined,
        driverPhone: isDriverIncluded ? '+967 771 234 567' : undefined,
        totalAmountYer: basePriceYer,
        totalAmountUsd: basePriceUsd,
        isNegotiated: isNegotiating,
        standardTotalYer: standardBasePriceYer,
        proposedTotalYer: isNegotiating ? basePriceYer : undefined,
        negotiationNote: isNegotiating ? negotiationNote : undefined,
        negotiationStatus: isNegotiating
          ? isInstantAutoApprovedDiscount
            ? 'approved'
            : 'pending_review'
          : 'none',
        remotePickupCode: `FAST-${Math.floor(1000 + Math.random() * 9000)}`,
        paymentPlan,
        paidAmountYer: requiredNowYer,
        remainingAmountYer: remainingYer,
        walletUsed: wallet,
        paymentStatus: paymentPlan === 'deposit_30' ? 'partially_paid' : 'paid',
        transactionRef: trxRef || `TRX-${Math.floor(100000 + Math.random() * 900000)}`,
        bookingStatus: isInstantAutoApprovedDiscount ? 'confirmed' : 'pending_approval',
        tripProgressPct: 0,
        currentCheckpointIndex: 0,
        checkpoints:
          rentalType === 'inter_governorate'
            ? [
                { id: 'cp-1', name: 'نقطة يسلح (مخرج صنعاء الجنوبي)', nameEn: 'Yasleh Checkpoint', passed: false, timeEstimate: '08:30 AM' },
                { id: 'cp-2', name: 'نقيل سمارة الجبلي', nameEn: 'Naqil Samarah Mountain', passed: false, timeEstimate: '11:00 AM' },
                { id: 'cp-3', name: 'مدينة إب واستراحة يريم', nameEn: 'Ibb City & Yarim', passed: false, timeEstimate: '01:30 PM' },
                { id: 'cp-4', name: 'الوصول للوجهة النهائية', nameEn: 'Final Arrival Destination', passed: false, timeEstimate: '05:00 PM' }
              ]
            : [
                { id: 'cp-s1', name: 'فحص المركبة وتجهيز العقد المطبوع في الفرع', nameEn: 'Vehicle Inspection & Contract Prep', passed: true, timeEstimate: 'الآن' },
                { id: 'cp-s2', name: 'تحرك مندوب التوصيل إلى عنوان العميل في صنعاء', nameEn: 'Delivery Rep Dispatched', passed: false, timeEstimate: 'خلال 20 دقيقة' },
                { id: 'cp-s3', name: 'مطابقة أصل الوثائق وتسليم المفتاح للعميل', nameEn: 'Original ID Check & Key Handover', passed: false, timeEstimate: 'خلال 35 دقيقة' }
              ],
        etaMinutes: 35,
        currentSpeedKmh: 0,
        createdAt: new Date().toISOString()
      };
      setIsSubmitting(false);
      onSubmitBooking(newBooking);
      onClose();
    }, 600);
  };

  const selectedWalletInfo = YEMENI_WALLETS.find((w) => w.id === wallet) || YEMENI_WALLETS[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/95">
          <div>
            <div className="text-xs text-amber-400 font-bold flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>
                {isAr
                  ? `منظومة الحجز والتفاوض عن بُعد وإتمام المعاملة قبل الاستلام — ${companyName}`
                  : `Remote Booking, Price Negotiation & Pre-Pickup System — ${companyName}`}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-100 mt-0.5">
              {step === 1 && (isAr ? 'الخطوة 1: اختيار المركبة المتوفرة، التفاوض على السعر، وموقع الاستلام' : 'Step 1: Vehicle, Remote Price Negotiation & Pickup')}
              {step === 2 && (isAr ? 'الخطوة 2: إرفاق الوثائق الرسمية ومسوغات الضمان عن بُعد' : 'Step 2: Upload KYC Documents & Legal Guarantee')}
              {step === 3 && (isAr ? 'الخطوة 3: قراءة اتفاقية التأجير الرسمية والتوقيع الإلكتروني' : 'Step 3: Read Lease Agreement & Digital Signature')}
              {step === 4 && (isAr ? 'الخطوة 4: سداد الدفعة عبر المحافظ اليمنية وإصدار كود الاستلام الفوري' : 'Step 4: Yemeni E-Wallet Payment & Fast-Track Pickup Pass')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4-Step Progress Bar */}
        <div className="grid grid-cols-4 gap-1 px-4 py-2.5 bg-slate-950/70 border-b border-slate-800 text-[11px] font-bold">
          {[
            { num: 1, title: isAr ? '1. المركبة والتفاوض' : '1. Car & Negotiate' },
            { num: 2, title: isAr ? '2. الوثائق والضمان' : '2. KYC & Guarantee' },
            { num: 3, title: isAr ? '3. الاتفاقية والتوقيع' : '3. Contract & Sign' },
            { num: 4, title: isAr ? '4. المحفظة والاستلام' : '4. Wallet & Pass' }
          ].map((s) => (
            <button
              key={s.num}
              type="button"
              onClick={() => {
                if (s.num < step) setStep(s.num);
              }}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg border transition ${
                step === s.num
                  ? 'border-amber-500 bg-amber-500/15 text-amber-300'
                  : step > s.num
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400 cursor-pointer'
                  : 'border-slate-800 bg-slate-900/50 text-slate-500'
              }`}
            >
              <span className="truncate">{s.title}</span>
            </button>
          ))}
        </div>

        {/* Validation Alert Banner */}
        {validationError && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* =============================================================== */}
          {/* STEP 1: CLIENT SEGMENT, VEHICLE, SERVICE & DELIVERY LOCATION    */}
          {/* =============================================================== */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Client Segment Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  {isAr ? 'فئة المستأجر / الجهة المتعاقدة:' : 'Client Category:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    {
                      id: 'individual',
                      icon: User,
                      title: isAr ? 'أفراد وعائلات ومغتربون' : 'Individual & Family',
                      desc: isAr ? 'إيجار يومي أو أسبوعي مرن' : 'Daily or weekly personal rental'
                    },
                    {
                      id: 'corporate',
                      icon: Building2,
                      title: isAr ? 'شركات ومؤسسات تجارية' : 'Corporate & Business',
                      desc: isAr ? 'عقود شركات وفواتير ضريبية' : 'Corporate account & tax invoice'
                    },
                    {
                      id: 'un_ngo',
                      icon: Globe2,
                      title: isAr ? 'منظمات دولية وبعثات (UN/NGO)' : 'UN / INGO & Diplomatic',
                      desc: isAr ? 'مطابق لمعايير الأمان SOP' : 'SOP compliant field & VIP units'
                    }
                  ].map((seg) => {
                    const IconComp = seg.icon;
                    return (
                      <button
                        key={seg.id}
                        type="button"
                        onClick={() => setClientCategory(seg.id as any)}
                        className={`p-3 rounded-xl border text-right transition flex items-start gap-2.5 ${
                          clientCategory === seg.id
                            ? 'border-amber-500 bg-amber-500/10 text-slate-100'
                            : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <IconComp className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold">{seg.title}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{seg.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {clientCategory !== 'individual' && (
                <div>
                  <label className="block text-xs font-bold text-amber-400 mb-1.5">
                    {clientCategory === 'un_ngo'
                      ? isAr
                        ? 'اسم المنظمة الدولية / البعثة ورقم طلب الشراء (PO):'
                        : 'UN Agency / INGO Name & PO Ref:'
                      : isAr
                      ? 'اسم الشركة / المؤسسة ورقم السجل التجاري:'
                      : 'Company Name & Commercial Register:'}
                  </label>
                  <input
                    type="text"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    placeholder={
                      clientCategory === 'un_ngo'
                        ? 'مثال: منظمة الإغاثة الدولية - مكتب صنعاء (PO #2026-88)'
                        : 'مثال: شركة التضامن للتجارة والمقاولات (س.ت 44912)'
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}

              {/* Vehicle Selection Grid */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  {isAr ? 'اختر المركبة المطلوبة من الأسطول (مصفح / دفع رباعي / اقتصادي / عائلي):' : 'Select Fleet Vehicle:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1">
                  {cars.map((car) => (
                    <div
                      key={car.id}
                      onClick={() => setSelectedCarId(car.id)}
                      className={`cursor-pointer p-2.5 rounded-xl border transition-all flex items-center gap-3 ${
                        selectedCarId === car.id
                          ? 'border-amber-500 bg-amber-500/10'
                          : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                      }`}
                    >
                      <img
                        src={car.image}
                        alt={car.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-12 rounded-lg object-cover border border-slate-700 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-slate-100 truncate">{car.name}</div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[11px] text-amber-400 font-mono font-bold">
                            {currency === 'YER'
                              ? `${car.pricePerDayYer.toLocaleString()} ر.ي/يوم`
                              : `$${car.pricePerDayUsd}/day`}
                          </span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                              car.available
                                ? 'bg-emerald-500/15 text-emerald-400'
                                : 'bg-rose-500/15 text-rose-400'
                            }`}
                          >
                            {car.available ? 'متوفرة الآن' : 'مؤجرة'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Mode & Delivery Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    {isAr ? 'نظام التأجير والقيادة:' : 'Rental & Driver Mode:'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'self_drive', label: isAr ? 'قيادة ذاتية (بدون سائق)' : 'Self-Drive', driver: false },
                      { id: 'with_chauffeur', label: isAr ? 'مع سائق خاص بصنعاء' : 'With Chauffeur', driver: true },
                      { id: 'inter_governorate', label: isAr ? 'سفر بين المحافظات' : 'Inter-Governorate', driver: true },
                      { id: 'airport_vip', label: isAr ? 'استقبال وتوديع المطار' : 'Airport Transfer', driver: true }
                    ].map((rt) => (
                      <button
                        key={rt.id}
                        type="button"
                        onClick={() => {
                          setRentalType(rt.id as RentalType);
                          setWithDriver(rt.driver);
                        }}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition ${
                          rentalType === rt.id
                            ? 'border-amber-500 bg-amber-500/15 text-amber-300'
                            : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {rt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    {isAr ? 'مكان وطريقة استلام المركبة (خدمة التوصيل والمطار):' : 'Vehicle Handover & VIP Delivery:'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setPickupServiceType('airport_vip');
                        setDeliveryMode('doorstep_delivery');
                      }}
                      className={`p-2.5 rounded-xl border text-right transition flex items-center justify-between ${
                        pickupServiceType === 'airport_vip'
                          ? 'border-amber-500 bg-amber-500/15 text-slate-100'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Plane className="w-4 h-4 text-amber-400 shrink-0" />
                        <div>
                          <div className="text-xs font-bold">صالة المطار — استقبال VIP</div>
                          <div className="text-[10px] text-slate-400">لافتة اسم ومساعد أمتعة</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-amber-400 font-bold">+10,000 ر.ي</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPickupServiceType('hotel_delivery');
                        setDeliveryMode('doorstep_delivery');
                      }}
                      className={`p-2.5 rounded-xl border text-right transition flex items-center justify-between ${
                        pickupServiceType === 'hotel_delivery'
                          ? 'border-amber-500 bg-amber-500/15 text-slate-100'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Hotel className="w-4 h-4 text-amber-400 shrink-0" />
                        <div>
                          <div className="text-xs font-bold">باب الفندق / السكن</div>
                          <div className="text-[10px] text-slate-400">تسليم عند اللوبي أو الغرفة</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400">{days >= 3 ? 'مجاناً' : '+5,000 ر.ي'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPickupServiceType('doorstep_delivery');
                        setDeliveryMode('doorstep_delivery');
                      }}
                      className={`p-2.5 rounded-xl border text-right transition flex items-center justify-between ${
                        pickupServiceType === 'doorstep_delivery'
                          ? 'border-emerald-500 bg-emerald-500/10 text-slate-100'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div>
                          <div className="text-xs font-bold">توصيل لباب المنزل بصنعاء</div>
                          <div className="text-[10px] text-slate-400">إلى عنوانك مباشرة</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400">{days >= 3 ? 'مجاناً' : '+5,000 ر.ي'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPickupServiceType('branch_pickup');
                        setDeliveryMode('branch_pickup');
                      }}
                      className={`p-2.5 rounded-xl border text-right transition flex items-center justify-between ${
                        pickupServiceType === 'branch_pickup'
                          ? 'border-amber-500 bg-amber-500/10 text-slate-100'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                        <div>
                          <div className="text-xs font-bold">استلام سريع من الفرع</div>
                          <div className="text-[10px] text-slate-400">بعد إتمام الحجز عن بُعد</div>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold">مجاني</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Conditional VIP Airport Meet-and-Greet Details */}
              {pickupServiceType === 'airport_vip' && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                    <Plane className="w-4 h-4" />
                    <span>تفاصيل خدمة استقبال المطار وصالة الوصول VIP:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-300 mb-1">
                        رقم الرحلة الجوية ومطار الوصول:
                      </label>
                      <input
                        type="text"
                        value={flightNumber}
                        onChange={(e) => setFlightNumber(e.target.value)}
                        placeholder="مثال: IY-601 (طيران اليمنية) - مطار صنعاء الدولي"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-300 mb-1">
                        الاسم المطبوع على لوحة الاستقبال (Airport Placard):
                      </label>
                      <input
                        type="text"
                        value={airportPlacardName}
                        onChange={(e) => setAirportPlacardName(e.target.value)}
                        placeholder="مثال: المهندس / هشام المتوكل"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Conditional Hotel Delivery Details */}
              {pickupServiceType === 'hotel_delivery' && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <label className="block text-xs font-bold text-amber-400">
                    اسم الفندق / المجمع السكني ورقم الغرفة:
                  </label>
                  <input
                    type="text"
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                    placeholder="مثال: فندق موفنبيك صنعاء — جناح 402 أو فندق تاج سبأ"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              )}

              {/* Chauffeur Protocol Options if Driver is included */}
              {isDriverIncluded && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>مواصفات خدمة السائق الخاص والبروتوكول:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <input
                        type="checkbox"
                        checked={chauffeurUniform}
                        onChange={(e) => setChauffeurUniform(e.target.checked)}
                        className="w-4 h-4 accent-amber-500 rounded"
                      />
                      <span className="text-slate-200 font-semibold">
                        سائق بزي رسمي كامل (Formal Suit / Protocol Attire)
                      </span>
                    </label>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-300 font-semibold">لغة التحدث المفضلة:</span>
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => setChauffeurLanguage('ar')}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                            chauffeurLanguage === 'ar' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          العربية
                        </button>
                        <button
                          type="button"
                          onClick={() => setChauffeurLanguage('en')}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                            chauffeurLanguage === 'en' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          English
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* VIP Add-ons & Roadside Concierge Section */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>إضافات الـ VIP والكونسيرج والمساعدة على الطريق:</span>
                  </div>
                  {addonsTotalYer > 0 && (
                    <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/30">
                      +{(addonsTotalYer).toLocaleString()} ر.ي
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                    <div className="flex items-center gap-2">
                      <Baby className="w-4 h-4 text-amber-400" />
                      <span className="text-slate-200">مقعد أطفال أوروبي معتمد (ISOFIX)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-mono">+1,500 ر.ي/يوم</span>
                      <input
                        type="checkbox"
                        checked={addonChildSeat}
                        onChange={(e) => setAddonChildSeat(e.target.checked)}
                        className="w-4 h-4 accent-amber-500 rounded"
                      />
                    </div>
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-sky-400" />
                      <span className="text-slate-200">راوتر 4G Wi-Fi متنقل غير محدود</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-mono">+2,500 ر.ي/يوم</span>
                      <input
                        type="checkbox"
                        checked={addonPocketWifi}
                        onChange={(e) => setAddonPocketWifi(e.target.checked)}
                        className="w-4 h-4 accent-amber-500 rounded"
                      />
                    </div>
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-400" />
                      <span className="text-slate-200">جهاز سالك / درب للتعرفة السريعة</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-mono">+1,000 ر.ي/يوم</span>
                      <input
                        type="checkbox"
                        checked={addonSalikTag}
                        onChange={(e) => setAddonSalikTag(e.target.checked)}
                        className="w-4 h-4 accent-amber-500 rounded"
                      />
                    </div>
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-400" />
                      <span className="text-slate-200">مساعدة على الطريق وإنقاذ 24/7</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-emerald-400 font-bold">مجاناً</span>
                      <input
                        type="checkbox"
                        checked={addonRoadside}
                        onChange={(e) => setAddonRoadside(e.target.checked)}
                        className="w-4 h-4 accent-amber-500 rounded"
                      />
                    </div>
                  </label>

                  <label className="sm:col-span-2 flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                    <div className="flex items-center gap-2">
                      <FileCheck2 className="w-4 h-4 text-amber-400" />
                      <span className="text-slate-200">تصريح مرور بين المحافظات والمنافذ معتمد رسمياً</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-mono">+5,000 ر.ي (مرة واحدة)</span>
                      <input
                        type="checkbox"
                        checked={addonInterPermit}
                        onChange={(e) => setAddonInterPermit(e.target.checked)}
                        className="w-4 h-4 accent-amber-500 rounded"
                      />
                    </div>
                  </label>
                </div>
              </div>

              {/* If Inter-Governorate: select destination */}
              {rentalType === 'inter_governorate' && (
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2.5">
                  <label className="block text-xs font-bold text-amber-400">
                    {isAr ? 'حدد خط السير والمحافظة المقصودة:' : 'Select Destination Governorate:'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'aden', name: 'عدن (خور مكسر / المعلا)' },
                      { id: 'marib', name: 'مأرب (المجمع)' },
                      { id: 'taiz', name: 'تعز (الحوبان / المدينة)' },
                      { id: 'ibb', name: 'إب (المركز / يريم)' },
                      { id: 'hodeidah', name: 'الحديدة (الميناء / الكورنيش)' },
                      { id: 'hadhramaut_mukalla', name: 'حضرموت (سيئون / المكلا)' }
                    ].map((gov) => (
                      <button
                        key={gov.id}
                        type="button"
                        onClick={() => setGovernorate(gov.id as Governorate)}
                        className={`p-2 rounded-lg text-xs font-bold border text-center transition ${
                          governorate === gov.id
                            ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                            : 'border-slate-800 bg-slate-900 text-slate-400'
                        }`}
                      >
                        {gov.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Address & Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {deliveryMode === 'doorstep_delivery' && (
                  <div className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {isAr ? 'الحي / المنطقة في صنعاء للتوصيل:' : 'Sanaa Neighborhood:'}
                      </label>
                      <select
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                      >
                        {SANAA_NEIGHBORHOODS.map((nh) => (
                          <option key={nh} value={nh}>
                            {nh}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {isAr ? 'العنوان التفصيلي (الشارع، المعلم، أو الفندق):' : 'Street / Landmark / Hotel:'}
                      </label>
                      <input
                        type="text"
                        value={customAddress}
                        onChange={(e) => setCustomAddress(e.target.value)}
                        placeholder="مثال: شارع القدس، جوار السفارة أو فندق موفنبيك"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    {isAr ? 'تاريخ بدء العقد:' : 'Start Date:'}
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    {isAr ? 'مدة الإيجار (بالأيام) — تطبق خصومات تلقائية للأسبوع والشهر:' : 'Duration (Days):'}
                  </label>
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="365"
                      value={days}
                      onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-24 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono"
                    />
                    {[
                      { d: 1, label: 'يوم' },
                      { d: 3, label: '3 أيام (توصيل مجاني)' },
                      { d: 7, label: 'أسبوع (-12%)' },
                      { d: 30, label: 'شهر كامل (-22%)' }
                    ].map((preset) => (
                      <button
                        key={preset.d}
                        type="button"
                        onClick={() => setDays(preset.d)}
                        className={`px-2.5 py-2 rounded-xl border text-[11px] font-bold transition ${
                          days === preset.d
                            ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                            : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ================================================================= */}
              {/* NEW: REMOTE PRICE NEGOTIATION & COUNTER-OFFER PANEL              */}
              {/* ================================================================= */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-black text-amber-400 flex items-center gap-1.5">
                      <span>🤝 ميزة التفاوض على السعر عن بُعد قبل الاستلام</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-[10px] font-bold">
                        خدمة عملاء مرنة
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      السعر القياسي لمدة ({days}) أيام هو{' '}
                      <strong className="text-white font-mono">
                        {standardBasePriceYer.toLocaleString()} ر.ي (${standardPriceUsd})
                      </strong>
                      . يمكنك اعتماد السعر المباشر أو تقديم عرض سعر تفاوضي للمكتب.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsNegotiating((prev) => !prev)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black transition shrink-0 border ${
                      isNegotiating
                        ? 'bg-amber-500 text-slate-950 border-amber-500'
                        : 'bg-slate-900 hover:bg-slate-800 text-amber-300 border-amber-500/40'
                    }`}
                  >
                    {isNegotiating ? '✓ وضع التفاوض على السعر مفعّل' : 'تفاوض على السعر / اطلب خصماً خاصاً'}
                  </button>
                </div>

                {isNegotiating && (
                  <div className="pt-3 border-t border-slate-800 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">
                          السعر اليومي المقترح منك (ر.ي / يوم):
                        </label>
                        <input
                          type="number"
                          value={proposedDailyYer}
                          onChange={(e) => setProposedDailyYer(Math.max(5000, parseInt(e.target.value) || 0))}
                          className="w-full bg-slate-900 border border-amber-500/50 rounded-xl px-3 py-2 text-xs font-mono font-black text-amber-400"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">
                          أو اختر نسبة تخفيض تفاوضية سريعة:
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            { pct: 5, label: 'خصم دفع فوري (-5%)' },
                            { pct: 10, label: 'خصم عميل دائم (-10%)' },
                            { pct: 15, label: 'عرض تفاوض خاص (-15%)' }
                          ].map((opt) => (
                            <button
                              key={opt.pct}
                              type="button"
                              onClick={() =>
                                setProposedDailyYer(Math.round(effectiveDailyYer * (1 - opt.pct / 100)))
                              }
                              className="px-2.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[11px] font-bold text-slate-200 transition"
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        ملاحظة أو مبرر عرضك السعري لإدارة المكتب:
                      </label>
                      <input
                        type="text"
                        value={negotiationNote}
                        onChange={(e) => setNegotiationNote(e.target.value)}
                        placeholder="مثال: سألتزم بالقيادة داخل صنعاء فقط وأدفع كامل المبلغ مقدماً..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                      />
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="text-xs">
                        <span className="text-slate-400">إجمالي العرض التفاوضي الجديد: </span>
                        <strong className="text-emerald-400 font-mono text-sm">
                          {basePriceYer.toLocaleString()} ر.ي (${basePriceUsd})
                        </strong>
                        <span className="mr-2 text-[11px] text-amber-400 font-bold">
                          (توفير {(standardBasePriceYer - basePriceYer).toLocaleString()} ر.ي / خصم {requestedDiscountPct}%)
                        </span>
                        <div className="text-[11px] mt-1">
                          {isInstantAutoApprovedDiscount ? (
                            <span className="text-emerald-400 font-bold">
                              ✓ هذا العرض ضمن صلاحية الخصم الفوري للمكتب — سيتم اعتماده تلقائياً في عقدك الآن!
                            </span>
                          ) : (
                            <span className="text-amber-300 font-bold">
                              ⚡ سيتم إرفاق هذا السعر التفاوضي في معاملتك ليراجعه مدير المكتب ويعتمد السعر النهائي قبل الاستلام.
                            </span>
                          )}
                        </div>
                      </div>

                      <a
                        href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `مرحباً إدارة ${companyName}، أود استئجار سيارة (${currentCar.name}) لمدة (${days}) أيام بدءاً من ${startDate}.\nالسعر القياسي: ${standardBasePriceYer.toLocaleString()} ر.ي\nعرضي التفاوضي المقترح: ${basePriceYer.toLocaleString()} ر.ي (${proposedDailyYer.toLocaleString()} ر.ي/يوم)\nملاحظة: ${negotiationNote}`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold text-center shrink-0 transition"
                      >
                        مناقشة العرض عبر واتساب المكتب
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* STEP 2: KYC DOCUMENT UPLOAD & GUARANTEE ATTACHMENT              */}
          {/* =============================================================== */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 text-xs text-slate-300 space-y-1">
                <div className="font-bold text-amber-400 flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4" />
                  <span>
                    {isAr
                      ? 'توثيق الهوية والضمان القانوني قبل تحريك المركبة للتوصيل'
                      : 'Mandatory KYC & Legal Guarantee Verification Before Dispatch'}
                  </span>
                </div>
                <p>
                  {isAr
                    ? 'وفقاً للإجراءات القانونية في الجمهورية اليمنية، يلزم إرفاق صور واضحة من الهوية ورخصة القيادة ووثيقة الضمان المعتمدة ليتم تدقيقها واعتماد العقد فوراً.'
                    : 'Please provide renter information and attach clear copies of required identification and guarantee documents.'}
                </p>
              </div>

              {/* Renter Details Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {isAr ? 'الاسم الرباعي للمستأجر / المفوض بالتوقيع:' : 'Full Legal Name:'}
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {isAr ? 'رقم الجوال المعتمد (لواتساب العقد والتوصيل):' : 'Phone Number (+967):'}
                  </label>
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {isAr ? 'رقم البطاقة الشخصية الذكية أو جواز السفر:' : 'Smart National ID / Passport No.:'}
                  </label>
                  <input
                    type="text"
                    value={customerIdNumber}
                    onChange={(e) => setCustomerIdNumber(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 font-mono"
                  />
                </div>
                {!isDriverIncluded && (
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      {isAr ? 'رقم رخصة القيادة السارية:' : 'Valid Driving License Number:'}
                    </label>
                    <input
                      type="text"
                      value={customerLicenseNumber}
                      onChange={(e) => setCustomerLicenseNumber(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 font-mono"
                    />
                  </div>
                )}
              </div>

              {/* Guarantee Type Selection */}
              {!isDriverIncluded ? (
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-200">
                    {isAr ? 'اختر نوع الضمان القانوني المقدم (للتأجير بدون سائق):' : 'Select Legal Guarantee Type:'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      {
                        id: 'commercial_guarantor',
                        title: isAr ? '1. كفالة تجارية مصدقة (سجل تجاري ساري)' : '1. Certified Commercial Guarantor',
                        desc: isAr ? 'كفالة تاجر أو شركة معتمدة لدى الغرفة التجارية بصنعاء' : 'Verified commercial register'
                      },
                      {
                        id: 'cash_deposit',
                        title: isAr ? '2. إيداع مبلغ تأمين نقدي مسترد' : '2. Refundable Cash Security Deposit',
                        desc: isAr
                          ? `${currentCar.securityDepositYer.toLocaleString()} ر.ي (${currentCar.securityDepositUsd}$) يُسترد فور إرجاع المركبة`
                          : `Refunded immediately upon vehicle return`
                      },
                      {
                        id: 'security_check',
                        title: isAr ? '3. شيك مصرفي ضمانة مصدق' : '3. Certified Bank Guarantee Cheque',
                        desc: isAr ? 'مسحوب على بنك الكريمي / التضامن / YKB / كاك بنك' : 'Drawn on accredited Yemeni bank'
                      },
                      {
                        id: 'government_id_escrow',
                        title: isAr ? '4. خطاب تفويض رسمي من منظمة دولية أو شركة' : '4. Official UN/INGO or Corporate Letter',
                        desc: isAr ? 'مختوم بختم المنظمة أو المؤسسة مع البطاقة الوظيفية' : 'Stamped institutional authorization'
                      }
                    ].map((g) => (
                      <div
                        key={g.id}
                        onClick={() => setGuaranteeType(g.id as GuaranteeType)}
                        className={`cursor-pointer p-3 rounded-xl border text-right transition ${
                          guaranteeType === g.id
                            ? 'border-amber-500 bg-amber-500/10 text-slate-100'
                            : 'border-slate-800 bg-slate-950 text-slate-400'
                        }`}
                      >
                        <div className="text-xs font-bold text-amber-400">{g.title}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{g.desc}</div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 font-semibold mb-1">
                      {isAr ? 'بيان الكفيل التجاري / تفاصيل الضمان المقدم:' : 'Guarantor / Guarantee Details:'}
                    </label>
                    <input
                      type="text"
                      value={guarantorName}
                      onChange={(e) => setGuarantorName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-semibold">
                  ✓ بما أن الحجز يتضمن سائقاً معتمداً من الشركة، فإن العميل معفي تماماً من تقديم كفالة تجارية أو وديعة تأمين على المركبة، ويكتفى بإرفاق صورة إثبات الهوية.
                </div>
              )}

              {/* Interactive KYC Document Uploaders */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <h4 className="text-xs font-bold text-slate-200">
                  {isAr ? 'إرفاق صور المستندات والوثائق المطلوبة (تُحفظ في ملف العقد الإلكتروني):' : 'Attach Required KYC Documents:'}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Doc 1: National ID / Passport */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                        <span>1. الهوية الذكية / الجواز</span>
                        {idDocumentUrl && <span className="text-[10px] text-emerald-400">✓ مرفق</span>}
                      </div>
                      {idDocumentUrl ? (
                        <img
                          src={idDocumentUrl}
                          alt="National ID"
                          className="w-full h-28 object-cover rounded-lg border border-slate-800 mt-2"
                        />
                      ) : (
                        <div className="w-full h-28 rounded-lg border border-dashed border-slate-700 flex items-center justify-center text-[11px] text-slate-500 mt-2">
                          لم يتم إرفاق ملف
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <label className="flex-1 cursor-pointer py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold text-center flex items-center justify-center gap-1">
                        <Upload className="w-3 h-3 text-amber-400" />
                        <span>رفع صورة</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, setIdDocumentUrl)}
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => setIdDocumentUrl(SAMPLE_ID_DOC_SVG)}
                        className="py-1.5 px-2 rounded-lg border border-amber-500/40 text-amber-400 text-[10px] font-semibold"
                      >
                        نموذج جاهز
                      </button>
                    </div>
                  </div>

                  {/* Doc 2: Driving License */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                        <span>2. رخصة القيادة السارية</span>
                        {isDriverIncluded ? (
                          <span className="text-[10px] text-amber-400">معفي (مع سائق)</span>
                        ) : (
                          licenseDocumentUrl && <span className="text-[10px] text-emerald-400">✓ مرفق</span>
                        )}
                      </div>
                      {licenseDocumentUrl ? (
                        <img
                          src={licenseDocumentUrl}
                          alt="Driving License"
                          className="w-full h-28 object-cover rounded-lg border border-slate-800 mt-2"
                        />
                      ) : (
                        <div className="w-full h-28 rounded-lg border border-dashed border-slate-700 flex items-center justify-center text-[11px] text-slate-500 mt-2">
                          لم يتم إرفاق ملف
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <label className="flex-1 cursor-pointer py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold text-center flex items-center justify-center gap-1">
                        <Upload className="w-3 h-3 text-amber-400" />
                        <span>رفع رخصة</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, setLicenseDocumentUrl)}
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => setLicenseDocumentUrl(SAMPLE_LICENSE_DOC_SVG)}
                        className="py-1.5 px-2 rounded-lg border border-amber-500/40 text-amber-400 text-[10px] font-semibold"
                      >
                        نموذج جاهز
                      </button>
                    </div>
                  </div>

                  {/* Doc 3: Guarantee Document */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                        <span>3. وثيقة الضمان / الكفالة</span>
                        {guaranteeDocumentUrl && <span className="text-[10px] text-emerald-400">✓ مرفق</span>}
                      </div>
                      {guaranteeDocumentUrl ? (
                        <img
                          src={guaranteeDocumentUrl}
                          alt="Guarantee Document"
                          className="w-full h-28 object-cover rounded-lg border border-slate-800 mt-2"
                        />
                      ) : (
                        <div className="w-full h-28 rounded-lg border border-dashed border-slate-700 flex items-center justify-center text-[11px] text-slate-500 mt-2">
                          لم يتم إرفاق ملف
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <label className="flex-1 cursor-pointer py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold text-center flex items-center justify-center gap-1">
                        <Upload className="w-3 h-3 text-amber-400" />
                        <span>رفع الضمان</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, setGuaranteeDocumentUrl)}
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => setGuaranteeDocumentUrl(SAMPLE_GUARANTEE_DOC_SVG)}
                        className="py-1.5 px-2 rounded-lg border border-amber-500/40 text-amber-400 text-[10px] font-semibold"
                      >
                        نموذج جاهز
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* STEP 3: LEGAL RENTAL AGREEMENT & DIGITAL SIGNATURE              */}
          {/* =============================================================== */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>
                    {isAr
                      ? 'اتفاقية تأجير مركبة ملزمة قانوناً وفق القوانين النافذة في الجمهورية اليمنية'
                      : 'Official Yemeni Commercial Vehicle Lease Agreement'}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">تاريخ التحرير: {new Date().toLocaleDateString('ar-YE')}</span>
              </div>

              {/* Scrollable Official Legal Contract Text */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 max-h-64 overflow-y-auto space-y-3 text-xs text-slate-300 leading-relaxed font-serif">
                <div className="text-center border-b border-slate-800 pb-3 space-y-1">
                  <div className="text-[11px] text-amber-400 font-sans font-bold">الجمهورية اليمنية — أمانة العاصمة صنعاء</div>
                  <div className="text-sm font-black text-white font-sans">
                    عقد واتفاقية إيجار مركبة وتوصيل مباشر
                  </div>
                </div>

                <p>
                  <strong className="text-white">الطرف الأول (المؤجر):</strong> {companyName}، ومقرها الرئيسي المعتمد في الجمهورية اليمنية.
                </p>
                <p>
                  <strong className="text-white">الطرف الثاني (المستأجر):</strong> {customerName}، حامل هوية رقم ({customerIdNumber})، هاتف ({customerPhone})
                  {organizationName ? `، ممثلاً عن: ${organizationName}` : ''}.
                </p>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-sans space-y-1 text-[11px]">
                  <div>
                    <strong className="text-amber-400">المركبة محل العقد:</strong> {currentCar.name} — رقم اللوحة: ({currentCar.plateNumber}) — موديل ({currentCar.modelYear}).
                  </div>
                  <div>
                    <strong className="text-amber-400">مدة الإيجار ومسار الاستخدام:</strong> ({days}) أيام تبدأ من تاريخ {startDate} — مكان التسليم: {deliveryMode === 'doorstep_delivery' ? `${pickupLocation} (${customAddress})` : currentCar.currentLocation}.
                  </div>
                  <div>
                    <strong className="text-amber-400">القيمة الإيجارية والضمان:</strong> إجمالي الإيجار ({basePriceYer.toLocaleString()} ريال يمني / ${basePriceUsd})، بموجب ضمانة ({isDriverIncluded ? 'رحلة مع سائق الشركة' : guarantorName}).
                  </div>
                </div>

                <div className="space-y-1.5 font-sans">
                  <div className="font-bold text-white">البنود والشروط القانونية الملزمة:</div>
                  <p>
                    <strong>البند الأول (الفحص والاستلام عند التوصيل):</strong> يقر الطرف الثاني بأنه عند وصول المركبة لموقعه سيتم توقيع محضر الفحص الفني لحالة الهيكل، الإطارات، ومستوى الوقود، ومطابقة أصل البطاقة الشخصية والضمان مع النسخ المرفقة إلكترونياً.
                  </p>
                  <p>
                    <strong>البند الثاني (نطاق الاستخدام والمسافة):</strong> يحق للمستأجر استخدام المركبة في الأغراض المشروعة قانوناً بحد أقصى ({currentCar.freeKmPerDay || 250} كم/يوم)، ولا يجوز الخروج بالمركبة خارج المحافظة المتفق عليها دون إشعار خطي مسبق لغرفة العمليات.
                  </p>
                  <p>
                    <strong>البند الثالث (المسؤولية القانونية والضمان):</strong> في حال التأجير بالقيادة الذاتية، يتحمل المستأجر والكفيل المتضامن كافة الالتزامات المترتبة على سوء الاستخدام أو الحوادث غير المغطاة أو المخالفات المرورية طوال فترة حيازة المركبة حتى إرجاعها واستلام سند إخلاء الطرف.
                  </p>
                  <p>
                    <strong>البند الرابع (استرداد مبلغ التأمين):</strong> في حال اختيار الضمان النقدي المسترد، تلتزم الشركة برد كامل مبلغ التأمين ({currentCar.securityDepositYer.toLocaleString()} ر.ي) إلى محفظة العميل فور استلام المركبة سليمة ومطابقتها لمحضر الفحص.
                  </p>
                </div>
              </div>

              {/* Mandatory Checkboxes */}
              <div className="space-y-2.5 text-xs">
                <label className="flex items-start gap-2.5 cursor-pointer p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-amber-500 rounded"
                  />
                  <span className="text-slate-200 font-semibold">
                    أقر بأنني قرأت كافة بنود اتفاقية التأجير وشروط الضمان والتأمين الموضحة أعلاه وأوافق عليها موافقة تامة وملزمة قانوناً.
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40">
                  <input
                    type="checkbox"
                    checked={agreedToOriginalCheck}
                    onChange={(e) => setAgreedToOriginalCheck(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-amber-500 rounded"
                  />
                  <span className="text-slate-200 font-semibold">
                    أتعهد بإبراز أصل الهوية والضمان لمندوب الشركة عند توصيل وتسليم المركبة والتوقيع على محضر الفحص الفني.
                  </span>
                </label>
              </div>

              {/* Digital Signature Pad */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <PenTool className="w-4 h-4 text-amber-400" />
                    <span>التوقيع الإلكتروني للمستأجر (ارسم توقيعك بالماوس/اللمس أو اعتمد التوقيع الرقمي):</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSignatureDataUrl(SAMPLE_SIGNATURE_SVG)}
                      className="px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[11px] font-bold"
                    >
                      اعتماد توقيع رقمي فوري باسمي
                    </button>
                    <button
                      type="button"
                      onClick={clearSignatureCanvas}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-[11px] flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>مسح وإعادة</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div className="bg-white rounded-xl overflow-hidden border-2 border-slate-700">
                    <canvas
                      ref={canvasRef}
                      width={340}
                      height={110}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      className="w-full h-[110px] cursor-crosshair touch-none"
                    />
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="text-slate-400">معاينة التوقيع المعتمد في العقد:</div>
                    {signatureDataUrl ? (
                      <div className="p-2 bg-white rounded-xl border border-emerald-500/50 flex flex-col items-center">
                        <img src={signatureDataUrl} alt="Customer Signature" className="h-20 object-contain" />
                        <span className="text-[10px] text-emerald-700 font-bold">
                          ✓ موقّع إلكترونياً بواسطة: {customerName}
                        </span>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl border border-dashed border-slate-700 text-slate-500 text-center">
                        يرجى التوقيع في المربع الأبيض المجاور
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* STEP 4: YEMENI E-WALLET PAYMENT & RECEIPT UPLOAD                */}
          {/* =============================================================== */}
          {step === 4 && (
            <div className="space-y-6">
              {/* Payment Plan Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  {isAr ? 'اختر خيار السداد المالي لتأكيد الحجز وتحريك المركبة للتوصيل:' : 'Select Payment Option:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentPlan('deposit_30')}
                    className={`p-3 rounded-xl border text-right transition ${
                      paymentPlan === 'deposit_30'
                        ? 'border-amber-500 bg-amber-500/15 text-slate-100'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    <div className="text-xs font-bold text-amber-400">1. سداد عربون التوصيل (30%)</div>
                    <div className="text-sm font-black font-mono mt-1">
                      {Math.round(basePriceYer * 0.3).toLocaleString()} ر.ي
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">والباقي عند استلام المركبة</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentPlan('full_100')}
                    className={`p-3 rounded-xl border text-right transition ${
                      paymentPlan === 'full_100'
                        ? 'border-amber-500 bg-amber-500/15 text-slate-100'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    <div className="text-xs font-bold text-emerald-400">2. سداد كامل قيمة الإيجار (100%)</div>
                    <div className="text-sm font-black font-mono mt-1">
                      {basePriceYer.toLocaleString()} ر.ي
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">شامل التوصيل والتأمين</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentPlan('with_escrow')}
                    className={`p-3 rounded-xl border text-right transition ${
                      paymentPlan === 'with_escrow'
                        ? 'border-amber-500 bg-amber-500/15 text-slate-100'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    <div className="text-xs font-bold text-sky-400">3. الإيجار + التأمين المسترد</div>
                    <div className="text-sm font-black font-mono mt-1">
                      {(basePriceYer + currentCar.securityDepositYer).toLocaleString()} ر.ي
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">يُسترد التأمين فور إرجاع السيارة</div>
                  </button>
                </div>
              </div>

              {/* Total Summary Banner */}
              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/40 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-400">
                    {isAr ? 'المبلغ المطلوب تحويله الآن لاعتماد العقد:' : 'Amount Required Now:'}
                  </div>
                  <div className="text-2xl font-black font-mono text-amber-400">
                    {currency === 'YER'
                      ? `${requiredNowYer.toLocaleString()} ريال يمني`
                      : `$${requiredNowUsd} USD`}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {currentCar.name} · {days} أيام {discountBadge ? `(${discountBadge})` : ''}
                  </div>
                </div>
                <div className="text-end text-xs space-y-1">
                  <div className="text-emerald-400 font-bold">✓ الوثائق والهوية مرفقة (3 مستندات)</div>
                  <div className="text-emerald-400 font-bold">✓ اتفاقية التأجير موقعة إلكترونياً</div>
                </div>
              </div>

              {/* Yemeni E-Wallets Grid */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold text-slate-300">
                  {isAr ? 'اختر المحفظة الإلكترونية اليمنية أو الحساب البنكي للسداد:' : 'Select Yemeni E-Wallet:'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {YEMENI_WALLETS.map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setWallet(w.id)}
                      className={`p-3 rounded-xl border text-right transition flex flex-col justify-between ${
                        wallet === w.id
                          ? 'border-amber-500 bg-amber-500/10 text-slate-100'
                          : 'border-slate-800 bg-slate-950/60 text-slate-400'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold">{w.name}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{w.bankName}</div>
                      </div>
                      <div className="mt-2 text-[10px] text-amber-400 font-mono">{w.badgeText}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Transfer Account Details + Reference Input + Receipt Screenshot Upload */}
              <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <div className="text-xs font-bold text-slate-200">{selectedWalletInfo.name}</div>
                    <div className="text-xs text-amber-400 font-mono font-bold mt-1">
                      {selectedWalletInfo.accountNumber}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      باسم: {companyName}
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-xl p-1 flex items-center justify-center shrink-0">
                    <QrCode className="w-10 h-10 text-slate-900" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        {isAr ? 'رقم مرجع الحوالة / إشعار السداد:' : 'Transaction Reference No.:'}
                      </label>
                      <input
                        type="text"
                        placeholder="مثال: KRM-TRX-884920"
                        value={trxRef}
                        onChange={(e) => setTrxRef(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="flex-1 cursor-pointer py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5">
                        <Upload className="w-3.5 h-3.5 text-amber-400" />
                        <span>إرفاق صورة إشعار السداد</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, setPaymentReceiptUrl)}
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => setPaymentReceiptUrl(SAMPLE_RECEIPT_DOC_SVG)}
                        className="py-2 px-3 rounded-xl border border-amber-500/40 text-amber-400 text-xs font-bold"
                      >
                        نموذج إشعار
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] text-slate-400 mb-1">صورة إشعار التحويل المالي المرفقة:</div>
                    {paymentReceiptUrl ? (
                      <img
                        src={paymentReceiptUrl}
                        alt="Payment Receipt"
                        className="w-full h-28 object-cover rounded-xl border border-emerald-500/40"
                      />
                    ) : (
                      <div className="w-full h-28 rounded-xl border border-dashed border-slate-700 flex items-center justify-center text-xs text-slate-500">
                        لم يتم إرفاق صورة الإشعار بعد
                      </div>
                    )}
                  </div>
                </div>

                {/* Instant WhatsApp Concierge Action */}
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-emerald-300">
                    <span className="font-bold">💬 كونسيرج الواتساب الفوري: </span>
                    <span>يمكنك التواصل مباشرة مع غرفة عمليات {companyName} لتأكيد تجهيز السيارة فوراً.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const msg = encodeURIComponent(
                        `مرحباً، أود الاستفسار عن حجز مركبة (${currentCar.name}) لمدة ${days} أيام باسم (${customerName}). هل المركبة جاهزة للتسليم؟`
                      );
                      window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>مراسلة العمليات عبر واتساب</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Controls */}
        <div className="flex items-center justify-between p-4 border-t border-slate-800 bg-slate-950/95">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="px-4 py-2.5 text-xs font-bold rounded-xl border border-slate-700 bg-slate-800 text-slate-200 hover:text-white transition flex items-center gap-1.5"
            >
              <ArrowRight className="w-4 h-4" />
              <span>{isAr ? 'الخطوة السابقة' : 'Previous Step'}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200"
            >
              {isAr ? 'إلغاء' : 'Cancel'}
            </button>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={validateAndProceed}
              className="px-6 py-2.5 text-xs font-black text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center gap-1.5"
            >
              <span>
                {step === 1 && (isAr ? 'متابعة لإرفاق الوثائق والضمان (2/4)' : 'Next: Upload Documents')}
                {step === 2 && (isAr ? 'متابعة لقراءة الاتفاقية والتوقيع (3/4)' : 'Next: Read & Sign Contract')}
                {step === 3 && (isAr ? 'متابعة للسداد عبر المحفظة (4/4)' : 'Next: E-Wallet Payment')}
              </span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              disabled={isSubmitting}
              className="px-6 py-2.5 text-xs font-black text-slate-950 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 rounded-xl shadow-lg shadow-emerald-500/20 transition flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>{isAr ? 'جارِ توثيق العقد وإصدار أمر التوصيل...' : 'Submitting Contract...'}</span>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>{isAr ? 'اعتماد العقد الموقّع وإرسال المركبة للتوصيل' : 'Confirm Signed Lease & Dispatch'}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
