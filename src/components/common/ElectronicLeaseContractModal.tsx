import React, { useState } from 'react';
import { Booking, Car, Currency, Language } from '../../types';
import {
  X,
  Printer,
  Shield,
  CheckCircle2,
  QrCode,
  FileText,
  Send,
  Building2,
  MapPin,
  Phone,
  Car as CarIcon,
  Download,
  Copy,
  Check,
  Edit3,
  Plus,
  Trash2,
  RotateCcw,
  Sparkles,
  Lock
} from 'lucide-react';
import { SAMPLE_SIGNATURE_SVG } from '../../data/mockData';
import {
  DEFAULT_OFFICIAL_CONTRACT_CLAUSES,
  DEFAULT_SPECIAL_TERMS,
  generatePrintableContractHtml
} from '../../data/contractTerms';

interface ElectronicLeaseContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking;
  car?: Car;
  currency: Currency;
  lang: Language;
  companyName?: string;
  companyLogoUrl?: string;
  slogan?: string;
  address?: string;
  phone?: string;
  whatsappNumber?: string;
  crNumber?: string;
  onUpdateBookingClauses?: (
    bookingId: string,
    clauses: string[],
    specialTerms?: string
  ) => void;
}

export const ElectronicLeaseContractModal: React.FC<ElectronicLeaseContractModalProps> = ({
  isOpen,
  onClose,
  booking,
  car,
  currency,
  lang,
  companyName = 'الشركة المتحدة لتأجير السيارات — صنعاء',
  companyLogoUrl,
  slogan = 'خدمات تأجير السيارات المعتمدة للمنظمات الدولية وقطاع الأعمال والأفراد',
  address = 'أمانة العاصمة صنعاء — شارع حدة الرئيسي / السبعين',
  phone = '+967 771 234 567',
  whatsappNumber = '967771234567',
  crNumber = 'س.ت 10492 - أمانة العاصمة',
  onUpdateBookingClauses
}) => {
  if (!isOpen || !booking) return null;

  const isAr = lang === 'ar';
  const formatMoney = (yer: number, usd?: number) => {
    if (currency === 'USD' && usd) {
      return `$${usd.toLocaleString()}`;
    }
    return `${yer.toLocaleString()} ${isAr ? 'ر.ي' : 'YER'}`;
  };

  // State for editable clauses
  const [isEditingClauses, setIsEditingClauses] = useState(false);
  const [clauses, setClauses] = useState<string[]>(
    booking.contractClauses && booking.contractClauses.length > 0
      ? booking.contractClauses
      : DEFAULT_OFFICIAL_CONTRACT_CLAUSES
  );
  const [specialTerms, setSpecialTerms] = useState<string>(
    booking.contractSpecialTerms || DEFAULT_SPECIAL_TERMS
  );
  const [newClauseInput, setNewClauseInput] = useState('');
  const [copiedStatus, setCopiedStatus] = useState<string | null>(null);
  const [printSuccessAlert, setPrintSuccessAlert] = useState<string | null>(null);

  // Helper labels
  const insuranceLabels: Record<string, string> = {
    comprehensive: 'تأمين شامل ضد الحوادث والمسؤولية المدنية',
    third_party: 'تأمين ضد الغير وإلزام المرور',
    vip_shield: 'درع VIP شامل الصيانة والإصلاح والبديلة'
  };
  const insuranceText =
    insuranceLabels[booking.insuranceCoverage || 'comprehensive'] ||
    insuranceLabels.comprehensive;

  const fuelLabels: Record<string, string> = {
    full: 'ممتلئ بالكامل (8/8)',
    three_quarters: 'ثلاثة أرباع الخزان (3/4)',
    half: 'نصف الخزان (1/2)',
    quarter: 'ربع الخزان (1/4)'
  };
  const fuelText = fuelLabels[booking.fuelLevelOut || 'full'] || fuelLabels.full;

  const dailyKmText =
    booking.dailyKmAllowance && booking.dailyKmAllowance > 0
      ? `${booking.dailyKmAllowance} كم/يوم (${booking.extraKmRateYer || 350} ر.ي للكم الزائد)`
      : 'كيلومترات مفتوحة غير محدودة';

  const rentalTypeLabels: Record<string, string> = {
    intra_sanaa: 'داخل أمانة العاصمة وضواحيها',
    inter_governorate: 'بين المحافظات والمنافذ بتصريح رسمي',
    corporate_vip: 'وفود وبعثات دبلوماسية VIP'
  };
  const rentalTypeText =
    rentalTypeLabels[booking.rentalType] || 'إيجار تشغيلي معتمد';

  const idTypeLabels: Record<string, string> = {
    national_id: 'بطاقة شخصية ذكية',
    passport: 'جواز سفر رسمي ساري',
    commercial_record: 'سجل تجاري / كفالة مؤسسية'
  };
  const idTypeText = idTypeLabels[booking.idDocumentType || 'national_id'] || 'إثبات هوية رسمي';

  // Handle Safe Print
  const handlePrint = () => {
    try {
      window.print();
    } catch {
      // In case iframe blocks direct window.print, alert user to download HTML
      setPrintSuccessAlert('يرجى استخدام خيار "تحميل وثيقة HTML المستقلة" للطباعة بدون قيود المتصفح.');
    }
  };

  // Handle Standalone HTML Download
  const handleDownloadStandaloneHtml = () => {
    const htmlContent = generatePrintableContractHtml({
      bookingId: booking.id,
      contractDate: booking.contractSignedAt || booking.createdAt.split('T')[0],
      pickupCode: booking.remotePickupCode,
      companyName,
      companyLogoUrl,
      slogan,
      address,
      phone,
      whatsapp: whatsappNumber,
      crNumber,
      customerName: booking.customerName,
      customerPhone: booking.customerPhone,
      customerIdType: idTypeText,
      customerIdNumber: booking.customerIdNumber,
      organizationName: booking.organizationName,
      guarantorName: booking.guaranteeDetails,
      guarantorPhone: booking.guarantorPhone,
      carName: booking.carName,
      carPlate: car?.plateNumber || 'صنعاء 14-88902',
      startDate: booking.startDate,
      endDate: booking.endDate,
      days: booking.days,
      pickupLocation: booking.pickupLocation,
      destination: booking.destination,
      rentalTypeLabel: rentalTypeText,
      insuranceLabel: insuranceText,
      dailyKmLabel: dailyKmText,
      fuelLevelLabel: fuelText,
      totalYer: booking.totalAmountYer,
      totalUsd: booking.totalAmountUsd,
      paidYer: booking.paidAmountYer || booking.totalAmountYer,
      depositYer: booking.depositHeldAmountYer || 100000,
      walletName: (booking.walletUsed || 'kuraimi').toUpperCase(),
      clauses,
      specialTerms,
      signatureDataUrl: booking.customerSignatureDataUrl || SAMPLE_SIGNATURE_SVG
    });

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `عقد_إيجار_رسمي_${booking.id}_${booking.customerName.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setCopiedStatus('html_downloaded');
    setTimeout(() => setCopiedStatus(null), 3000);
  };

  // Handle Copy Legal Text
  const handleCopyLegalText = () => {
    const text = `عقد إيجار مركبة رسمي #${booking.id}
المؤجر: ${companyName} (${phone})
المستأجر: ${booking.customerName} (${booking.customerPhone})
المركبة: ${booking.carName} — لوحة: ${car?.plateNumber || 'صنعاء 14-88902'}
المدة: من ${booking.startDate} إلى ${booking.endDate} (${booking.days} أيام)
الموقع: ${booking.pickupLocation} | النطاق: ${rentalTypeText}
القيمة الإجمالية: ${booking.totalAmountYer.toLocaleString()} ر.ي
التأمين والوقود: ${insuranceText} | الوقود: ${fuelText} | الكيلومترات: ${dailyKmText}
الوديعة المحتجزة: ${(booking.depositHeldAmountYer || 100000).toLocaleString()} ر.ي
كود الاستلام السريع: ${booking.remotePickupCode || 'FAST-8810'}
بنود العقد المعتمدة:
${clauses.map((c, i) => `${i + 1}. ${c}`).join('\n')}
${specialTerms ? `شروط خاصة: ${specialTerms}` : ''}
حرر إلكترونياً وموثق بختم الإدارة وتوقيع المستأجر الرقمي.`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedStatus('text_copied');
      setTimeout(() => setCopiedStatus(null), 3000);
    }
  };

  // Save customized clauses
  const handleSaveClauses = () => {
    if (onUpdateBookingClauses) {
      onUpdateBookingClauses(booking.id, clauses, specialTerms);
    }
    setIsEditingClauses(false);
    setCopiedStatus('clauses_saved');
    setTimeout(() => setCopiedStatus(null), 3000);
  };

  const handleAddClause = () => {
    if (!newClauseInput.trim()) return;
    setClauses((prev) => [...prev, newClauseInput.trim()]);
    setNewClauseInput('');
  };

  const handleRemoveClause = (idx: number) => {
    setClauses((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleResetClauses = () => {
    setClauses(DEFAULT_OFFICIAL_CONTRACT_CLAUSES);
    setSpecialTerms(DEFAULT_SPECIAL_TERMS);
  };

  const qrHash = `YE-CONTRACT-${booking.id}-${booking.carId}-${(booking.customerPhone || '0000').slice(-4)}`;
  const whatsappUrl = `https://wa.me/${(booking.customerPhone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `عزيزنا المستأجر ${booking.customerName}،\nمرفق لكم تفاصيل عقد الإيجار الإلكتروني المعتمد #${booking.id} لمركبة (${booking.carName}).\nكود الاستلام السريع: ${booking.remotePickupCode || 'FAST-8810'}\nإجمالي القيمة: ${booking.totalAmountYer.toLocaleString()} ر.ي\nشكراً لاختياركم ${companyName}.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-4xl bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] border border-slate-300">
        
        {/* Top Control Bar (Hidden in Print) */}
        <div className="print:hidden flex flex-wrap items-center justify-between gap-2 px-4 sm:px-6 py-3.5 bg-slate-950 text-white border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-black text-white">
                  عقد إيجار مركبة رسمي معتمد (A4 / QR Code)
                </h3>
                <span className="font-mono text-xs text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                  #{booking.id}
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                {companyName} · المركز الرئيسي: {address}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {/* Toggle Clauses Editor Button */}
            <button
              type="button"
              onClick={() => setIsEditingClauses(!isEditingClauses)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                isEditingClauses
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditingClauses ? 'معاينة الوثيقة' : 'تحرير بنود العقد'}</span>
            </button>

            {/* Direct WhatsApp Link (No window.open!) */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition"
              title="إرسال عبر واتساب"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">إرسال واتساب</span>
            </a>

            {/* Copy Legal Text */}
            <button
              type="button"
              onClick={handleCopyLegalText}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition"
              title="نسخ صيغة العقد"
            >
              {copiedStatus === 'text_copied' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">تم النسخ!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-300" />
                  <span className="hidden sm:inline">نسخ النص</span>
                </>
              )}
            </button>

            {/* Download Standalone HTML File (Guaranteed Print on Any Computer!) */}
            <button
              type="button"
              onClick={handleDownloadStandaloneHtml}
              className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 transition shadow"
              title="تحميل وثيقة HTML رسمية قابلة للطباعة المستقلة"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{copiedStatus === 'html_downloaded' ? 'تم التحميل ✓' : 'تحميل HTML'}</span>
            </button>

            {/* Direct A4 Print Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition shadow-md"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة A4</span>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Temporary Alert if triggered */}
        {printSuccessAlert && (
          <div className="print:hidden px-4 py-2 bg-amber-500/15 border-b border-amber-500/30 text-amber-900 text-xs flex items-center justify-between">
            <span>{printSuccessAlert}</span>
            <button
              type="button"
              onClick={() => setPrintSuccessAlert(null)}
              className="text-amber-800 font-bold"
            >
              ×
            </button>
          </div>
        )}

        {/* =========================================================================
            DRAWER / PANEL: CONTRACT CLAUSES EDITOR (When isEditingClauses === true)
            ========================================================================= */}
        {isEditingClauses && (
          <div className="print:hidden p-4 sm:p-6 bg-slate-100 border-b-2 border-amber-500/50 space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-300 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <h4 className="text-sm font-black text-slate-900">
                  محرر بنود وشروط العقد القانونية (تعديل، إضافة، وتثبيت البنود)
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetClauses}
                  className="px-2.5 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-[11px] font-bold flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>استعادة البنود الافتراضية</span>
                </button>
                <button
                  type="button"
                  onClick={handleSaveClauses}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>تثبيت واعتماد البنود لهذا العقد</span>
                </button>
              </div>
            </div>

            {/* List of current clauses */}
            <div className="space-y-2.5">
              {clauses.map((clause, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-300 shadow-sm"
                >
                  <span className="font-mono font-bold text-amber-700 text-xs mt-1 shrink-0">
                    #{idx + 1}
                  </span>
                  <textarea
                    rows={2}
                    value={clause}
                    onChange={(e) => {
                      const updated = [...clauses];
                      updated[idx] = e.target.value;
                      setClauses(updated);
                    }}
                    className="w-full text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-lg p-2 focus:bg-white focus:border-amber-500 leading-relaxed font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveClause(idx)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg shrink-0 mt-1"
                    title="حذف هذا البند"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add new clause */}
            <div className="bg-white p-3 rounded-xl border border-slate-300 space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                + إضافة بند قانوني أو شرط تشغيلي جديد:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newClauseInput}
                  onChange={(e) => setNewClauseInput(e.target.value)}
                  placeholder="اكتب نص البند الجديد هنا (مثلاً: يلتزم المستأجر بعدم التدخين داخل المركبة...)"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddClause();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddClause}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shrink-0 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>إضافة</span>
                </button>
              </div>
            </div>

            {/* Special notes */}
            <div className="bg-white p-3 rounded-xl border border-slate-300 space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                ملاحظات وشروط خاصة إضافية (تظهر أسفل البنود):
              </label>
              <input
                type="text"
                value={specialTerms}
                onChange={(e) => setSpecialTerms(e.target.value)}
                placeholder="شروط خاصة إضافية لهذا العقد..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
              />
            </div>
          </div>
        )}

        {/* =========================================================================
            PRINTABLE CONTRACT BODY (#printable-contract ISOLATED BY @media print)
            ========================================================================= */}
        <div
          id="printable-contract"
          className="p-6 sm:p-8 space-y-5 overflow-y-auto text-xs leading-relaxed text-slate-800 font-sans bg-white"
        >
          {/* Official Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-slate-900 pb-4 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                {companyLogoUrl ? (
                  <img
                    src={companyLogoUrl}
                    alt={companyName}
                    referrerPolicy="no-referrer"
                    className="h-10 w-auto object-contain max-w-[140px]"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-600 flex items-center justify-center text-amber-700 font-black">
                    <Shield className="w-5 h-5 text-amber-700" />
                  </div>
                )}
                <div>
                  <h1 className="text-base sm:text-lg font-black text-slate-950">
                    {companyName}
                  </h1>
                  <p className="text-[11px] text-amber-800 font-bold">{slogan}</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 pt-1">
                المركز الرئيسي: {address} · هاتف: {phone} · واتساب: {whatsappNumber}
              </p>
              <p className="text-[10px] text-slate-500">
                {crNumber} · مصرح ومعتمد رسمياً لدى وزارة النقل وهيئة تنظيم شؤون النقل البري
              </p>
            </div>

            <div className="text-left bg-slate-50 p-3 rounded-2xl border border-slate-300 shrink-0 min-w-[180px]">
              <div className="font-mono text-xs font-black text-slate-900">
                عقد رقم: <span className="text-amber-700">#{booking.id}</span>
              </div>
              <div className="text-[10px] text-slate-600 mt-0.5">
                تاريخ الإنشاء: {booking.contractSignedAt || booking.createdAt.split('T')[0]}
              </div>
              {booking.remotePickupCode && (
                <div className="mt-1 px-2.5 py-0.5 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-900 text-[10px] font-mono font-bold">
                  كود الاستلام: {booking.remotePickupCode}
                </div>
              )}
            </div>
          </div>

          {/* Section 1: Parties Information */}
          <div>
            <div className="text-xs font-black bg-slate-100 text-slate-900 px-3 py-1.5 rounded-lg border-r-4 border-amber-600 mb-2">
              أولاً: بيانات أطراف العقد والضمانة القانونية
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="space-y-1">
                <div>
                  <span className="text-slate-500">الطرف الأول (المؤجر): </span>
                  <strong className="text-slate-950">{companyName}</strong>
                </div>
                <div>
                  <span className="text-slate-500">هاتف المؤجر / خدمة العملاء: </span>
                  <span className="font-mono font-bold text-slate-900">{phone}</span>
                </div>
                <div>
                  <span className="text-slate-500">الفرع المسلم: </span>
                  <span className="text-slate-800">فرع صنعاء الرئيسي — شارع حدة</span>
                </div>
              </div>

              <div className="space-y-1">
                <div>
                  <span className="text-slate-500">الطرف الثاني (المستأجر): </span>
                  <strong className="text-slate-950 font-bold">{booking.customerName}</strong>
                  {booking.organizationName && (
                    <span className="text-amber-800 font-bold"> ({booking.organizationName})</span>
                  )}
                </div>
                <div>
                  <span className="text-slate-500">هاتف المستأجر: </span>
                  <span className="font-mono font-bold text-slate-900">{booking.customerPhone}</span>
                </div>
                <div>
                  <span className="text-slate-500">إثبات الهوية: </span>
                  <span className="font-mono font-bold text-slate-900">
                    {idTypeText} ({booking.customerIdNumber || 'موثقة بالنظام'})
                  </span>
                  {booking.customerLicenseNumber && (
                    <span className="text-slate-600 mr-2 font-mono">
                      · رخصة: {booking.customerLicenseNumber}
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-slate-500">الضمانة المعتمدة: </span>
                  <span className="font-bold text-emerald-800">
                    {booking.guaranteeDetails || 'كفالة تجارية معتمدة لدى إدارة المخاطر'}
                  </span>
                  {booking.guarantorPhone && (
                    <span className="font-mono text-slate-600 mr-1">({booking.guarantorPhone})</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Vehicle & Operational Terms */}
          <div>
            <div className="text-xs font-black bg-slate-100 text-slate-900 px-3 py-1.5 rounded-lg border-r-4 border-amber-600 mb-2">
              ثانياً: مواصفات المركبة وفترة التشغيل والشروط الفنية
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-500 block text-[11px]">المركبة المستأجرة:</span>
                <strong className="text-slate-950">{booking.carName}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">رقم اللوحة المسجل:</span>
                <span className="font-mono font-bold text-slate-900">
                  {car?.plateNumber || 'صنعاء 14-88902'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">تاريخ ووقت البدء:</span>
                <span className="font-mono font-bold text-slate-900">{booking.startDate}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">تاريخ ووقت الإرجاع:</span>
                <span className="font-mono font-bold text-slate-900">
                  {booking.endDate} ({booking.days} أيام)
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">نطاق الاستخدام:</span>
                <span className="font-bold text-slate-800">{rentalTypeText}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">موقع التسليم:</span>
                <span className="text-slate-800">{booking.pickupLocation}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">الكيلومترات اليومية:</span>
                <span className="font-bold text-slate-900">{dailyKmText}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">مستوى الوقود عند التسليم:</span>
                <span className="font-bold text-emerald-800">{fuelText}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block text-[11px]">التغطية التأمينية:</span>
                <span className="font-bold text-slate-900">{insuranceText}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block text-[11px]">نظام القيادة:</span>
                <span className="font-bold text-slate-900">
                  {booking.withDriver ? 'مع سائق خاص معتمد بروتوكول' : 'قيادة ذاتية للمستأجر المصرح له'}
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Financial Settlement Table */}
          <div>
            <div className="text-xs font-black bg-slate-100 text-slate-900 px-3 py-1.5 rounded-lg border-r-4 border-amber-600 mb-2">
              ثالثاً: المقابل المالي والوديعة النقدية المسددة
            </div>
            <table className="w-full text-right text-xs bg-slate-50 rounded-xl overflow-hidden border border-slate-200">
              <thead className="bg-slate-200/70 text-slate-800 font-bold border-b border-slate-300">
                <tr>
                  <th className="p-2.5">البند المالي</th>
                  <th className="p-2.5">التفاصيل</th>
                  <th className="p-2.5">المبلغ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-2.5 font-bold text-slate-900">
                    القيمة الإيجارية للمدة ({booking.days} أيام)
                  </td>
                  <td className="p-2.5 text-slate-600">
                    {booking.isNegotiated
                      ? 'سعر تفاوضي معتمد عن بُعد ومثبت بالعقد'
                      : 'السعر اليومي الرسمي المعتمد'}
                  </td>
                  <td className="p-2.5 font-mono font-black text-amber-900">
                    {formatMoney(booking.totalAmountYer, booking.totalAmountUsd)}
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-slate-900">الوديعة النقدية ومبلغ التأمين</td>
                  <td className="p-2.5 text-slate-600">
                    مستردة بالكامل فور تسليم المركبة ومطابقة محضر الفحص الفني
                  </td>
                  <td className="p-2.5 font-mono font-bold text-slate-900">
                    {formatMoney(booking.depositHeldAmountYer || 100000)}
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-slate-900">طريقة وحالة السداد</td>
                  <td className="p-2.5 text-slate-600">
                    محفظة: <strong className="uppercase font-mono">{(booking.walletUsed || 'kuraimi').toUpperCase()}</strong> · مرجع: {booking.transactionRef || 'TRX-ONLINE'}
                  </td>
                  <td className="p-2.5 font-bold text-emerald-800">
                    {booking.paymentStatus === 'paid' ? 'مسدد بالكامل ✓' : 'دفعة معتمدة ومؤكدة ✓'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 4: Official Contract Clauses (Dynamic & Editable) */}
          <div>
            <div className="flex items-center justify-between text-xs font-black bg-slate-100 text-slate-900 px-3 py-1.5 rounded-lg border-r-4 border-amber-600 mb-2">
              <span>رابعاً: بنود وشروط العقد القانونية المعتمدة ({clauses.length} بنود)</span>
              <span className="text-[10px] font-normal text-slate-500">
                سند رسمي ملزم وفق قانون التجارة والمعاملات المدنية
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-[11px] text-slate-700 leading-relaxed text-justify">
              {clauses.map((c, i) => (
                <div key={i} className="flex gap-1.5">
                  <strong className="text-amber-800 shrink-0 font-mono font-bold">
                    {i + 1}.
                  </strong>
                  <span>{c}</span>
                </div>
              ))}
              {specialTerms && (
                <div className="mt-2 p-2 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-[11px]">
                  <strong>شروط خاصة إضافية: </strong>
                  <span>{specialTerms}</span>
                </div>
              )}
            </div>
          </div>

          {/* Section 5: QR Code Seal & Official Digital Signatures */}
          <div className="pt-2 border-t-2 border-slate-300 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            {/* Signature 1: Customer */}
            <div className="text-center space-y-1 p-2.5 rounded-xl border border-slate-200 bg-slate-50">
              <div className="text-[11px] font-bold text-slate-700">توقيع المستأجر الإلكتروني:</div>
              <img
                src={booking.customerSignatureDataUrl || SAMPLE_SIGNATURE_SVG}
                alt="Signature"
                className="h-11 mx-auto object-contain p-1 border border-slate-300 rounded bg-white"
              />
              <div className="text-[10px] text-slate-500 font-mono">
                {booking.customerName} ({booking.contractSignedAt || 'موثق رقمياً'})
              </div>
            </div>

            {/* Middle: Cryptographic QR Code Seal */}
            <div className="text-center space-y-1 p-2.5 rounded-xl bg-amber-50 border border-amber-300">
              <div className="w-14 h-14 mx-auto bg-white p-1 rounded-lg border border-amber-400 shadow-sm flex items-center justify-center">
                <QrCode className="w-12 h-12 text-slate-900" />
              </div>
              <div className="text-[9px] font-mono font-bold text-amber-950">
                {qrHash}
              </div>
              <div className="text-[9px] text-emerald-800 font-bold">
                ✓ مصادقة رقمية سارية المفعول
              </div>
            </div>

            {/* Signature 2: Agency Seal */}
            <div className="text-center space-y-1 p-2.5 rounded-xl border border-slate-200 bg-slate-50">
              <div className="text-[11px] font-bold text-slate-700">خاتم الإدارة والاعتماد:</div>
              <div className="h-11 flex items-center justify-center">
                <div className="w-28 h-10 border-2 border-dashed border-amber-600 rounded-lg flex flex-col items-center justify-center text-amber-800 font-black text-[9px] rotate-[-2deg]">
                  <span className="truncate max-w-[100px]">{companyName}</span>
                  <span className="text-[8px] font-mono">APPROVED & SEALED</span>
                </div>
              </div>
              <div className="text-[10px] text-slate-500">
                إدارة الحركة والتشغيل — صنعاء
              </div>
            </div>
          </div>

          {/* Footer Credentials */}
          <div className="pt-2 border-t border-slate-200 text-center text-[10px] text-slate-500 leading-normal">
            {companyName} · المركز الرئيسي: {address} · هاتف: {phone} · واتساب: {whatsappNumber}<br />
            عقد إلكتروني معتمد لدى الغرفة التجارية الصناعية بأمانة العاصمة والجهات الرسمية ذات العلاقة · حرر برقم #{booking.id}
          </div>
        </div>
      </div>
    </div>
  );
};
