import React, { useState } from 'react';
import { Booking, Currency } from '../../types';
import { X, Send, Copy, Check, MessageSquare, Shield, Sparkles } from 'lucide-react';

interface WhatsAppQuickConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking;
  companyName?: string;
  agencyPhone?: string;
}

export const WhatsAppQuickConciergeModal: React.FC<WhatsAppQuickConciergeModalProps> = ({
  isOpen,
  onClose,
  booking,
  companyName = 'الشركة المتحدة لتأجير السيارات — صنعاء',
  agencyPhone = '967771234567'
}) => {
  if (!isOpen || !booking) return null;

  const [copied, setCopied] = useState<boolean>(false);
  const [activeTemplate, setActiveTemplate] = useState<string>('confirmation');

  const templates: Record<string, { title: string; desc: string; text: string }> = {
    confirmation: {
      title: 'تأكيد الحجز وكود الاستلام السريع',
      desc: 'إرسال بيانات الحجز وكود FAST-XXXX للعميل فور الاعتماد',
      text: `مرحباً ${booking.customerName}،
يسعدنا إبلاغك باعتماد حجزك لمركبة (${booking.carName}) بنجاح لدى ${companyName}.
🏷️ رقم العقد: #${booking.id}
🔑 كود الاستلام الفوري المعتمد: ${booking.remotePickupCode || 'FAST-8810'}
📅 فترة الإيجار: من ${booking.startDate} إلى ${booking.endDate} (${booking.days} أيام)
📍 موقع الاستلام: ${booking.pickupLocation}
💰 إجمالي العقد: ${booking.totalAmountYer.toLocaleString()} ر.ي
يرجى إبراز هذا الإشعار عند الاستلام لتسلم المفتاح مباشرة دون انتظار. نتمنى لك رحلة موفقة!`
    },
    airport: {
      title: 'استقبال المطار الفاخر ولوحة الاسم (VIP)',
      desc: 'بيانات الكابتن وموقع الاستقبال بصالة الوصول',
      text: `مرحباً بك في اليمن ${booking.customerName}،
سيارتك (${booking.carName}) بانتظارك في مطار صنعاء الدولي مع خدمة الاستقبال الفاخرة VIP.
👨‍✈️ كابتن البروتوكول: ${booking.driverName || 'الكابتن / فهد الأنسي'} (${booking.driverPhone || '+967 773 987 654'})
🪧 لوحة الاستقبال في صالة الوصول: باسم (${booking.customerName})
نتطلع لخدمتك وضمان أقصى درجات الراحة والأمان!`
    },
    negotiation: {
      title: 'رد إدارة المكتب على التفاوض السعري',
      desc: 'إرسال العرض المعتمد لإتمام المعاملة فوراً',
      text: `عزيزي ${booking.customerName}،
بشأن طلبك للتفاوض على سعر تأجير (${booking.carName}) لعقد #${booking.id}:
يسعدنا تقديم سعر خاص ومعتمد بقيمة ${(booking.counterOfferTotalYer || booking.proposedTotalYer || booking.totalAmountYer).toLocaleString()} ر.ي لإتمام حجزك عن بُعد فوراً.
يمكنك تأكيد العقد الآن برابط السداد لإصدار كود الاستلام مباشرة.`
    },
    return_reminder: {
      title: 'تذكير موعد الإرجاع وتمديد العقد بنقرة واحدة',
      desc: 'إشعار تذكيري ودود مع إمكانية التمديد الفوري',
      text: `مرحباً ${booking.customerName}،
نود تذكيرك بأن موعد تسليم مركبة (${booking.carName}) ينتهي غداً بتاريخ ${booking.endDate}.
إذا كنت ترغب في تمديد فترة الإيجار ليوم أو أسبوع إضافي بنقرة واحدة دون مراجعة المكتب، يرجى الرد على هذه الرسالة أو استخدام خيار التمديد في المنصة.`
    },
    deposit_release: {
      title: 'شهادة إخلاء الطرف وفك حجز الوديعة',
      desc: 'إشعار تصفية الحساب ورد مبلغ التأمين للمحفظة',
      text: `عزيزي ${booking.customerName}،
نشكرك على التزامك وحسن استخدامك لمركبة (${booking.carName}).
تم الانتهاء من الفحص الفني ومطابقة العداد وإخلاء طرف العقد #${booking.id} بنجاح.
تم فك حجز مبلغ التأمين وإعادته لحسابك في محفظة (${booking.walletUsed.toUpperCase()}) برقم مرجعي: ${booking.transactionRef}. نسعد بخدمتك دائماً!`
    }
  };

  const currentText = templates[activeTemplate]?.text || templates.confirmation.text;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendWhatsApp = () => {
    const phoneClean = booking.customerPhone.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${phoneClean}?text=${encodeURIComponent(currentText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 text-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/90">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white">
                مولد رسائل الواتساب الذكي للرد السريع والتفاوض
              </h3>
              <p className="text-[11px] text-slate-400">
                إرسال قوالب احترافية منسقة للعميل بنقرة واحدة
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Templates Selection Tabs */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/50 flex gap-2 overflow-x-auto text-xs">
          {Object.entries(templates).map(([key, t]) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTemplate(key)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-bold transition ${
                activeTemplate === key
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {t.title}
            </button>
          ))}
        </div>

        {/* Message Content Preview */}
        <div className="p-5 sm:p-6 space-y-4 text-xs">
          <div className="space-y-1">
            <label className="block text-slate-400 text-[11px]">
              نص الرسالة المجهز للإرسال الفوري للرقم ({booking.customerPhone}):
            </label>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 whitespace-pre-line text-slate-200 leading-relaxed font-sans text-xs max-h-60 overflow-y-auto">
              {currentText}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition"
              >
                <Send className="w-4 h-4" />
                <span>إرسال عبر الواتساب الآن</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'تم النسخ!' : 'نسخ النص'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white font-bold text-xs"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
