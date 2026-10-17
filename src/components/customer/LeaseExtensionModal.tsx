import React, { useState } from 'react';
import { Booking, Currency, PaymentWallet } from '../../types';
import { YEMENI_WALLETS } from '../../data/mockData';
import { X, Calendar, Clock, Sparkles, CheckCircle2, Shield, ArrowRight } from 'lucide-react';

interface LeaseExtensionModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking;
  currency: Currency;
  onConfirmExtension: (bookingId: string, additionalDays: number, additionalAmountYer: number) => void;
}

export const LeaseExtensionModal: React.FC<LeaseExtensionModalProps> = ({
  isOpen,
  onClose,
  booking,
  currency,
  onConfirmExtension
}) => {
  if (!isOpen || !booking) return null;

  const [additionalDays, setAdditionalDays] = useState<number>(3);
  const [wallet, setWallet] = useState<PaymentWallet>('kuraimi');
  const [success, setSuccess] = useState<boolean>(false);

  // Daily rate estimation based on booking
  const baseDailyYer = Math.round(booking.totalAmountYer / Math.max(1, booking.days));

  // Extension discounts
  let discountPct = 0;
  if (additionalDays >= 30) discountPct = 25;
  else if (additionalDays >= 7) discountPct = 15;
  else if (additionalDays >= 3) discountPct = 10;

  const standardFeeYer = baseDailyYer * additionalDays;
  const discountedFeeYer = Math.round(standardFeeYer * (1 - discountPct / 100));

  const currentEndDate = new Date(booking.endDate);
  const newEndDate = new Date(currentEndDate.getTime() + additionalDays * 86400000)
    .toISOString()
    .split('T')[0];

  const handleExtend = () => {
    setSuccess(true);
    setTimeout(() => {
      onConfirmExtension(booking.id, additionalDays, discountedFeeYer);
      setSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 text-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/90">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white">
                تمديد عقد الإيجار بنقرة واحدة
              </h3>
              <p className="text-[11px] text-slate-400">
                عقد #{booking.id} · {booking.carName}
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

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5 text-xs">
          {/* Current Dates vs New Extended Dates */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-slate-400 block">تاريخ الإرجاع الحالي:</span>
              <span className="font-mono font-bold text-amber-400 text-sm">{booking.endDate}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 rotate-180" />
            <div>
              <span className="text-[10px] text-emerald-400 font-bold block">تاريخ الإرجاع الجديد:</span>
              <span className="font-mono font-black text-emerald-400 text-sm">{newEndDate}</span>
            </div>
          </div>

          {/* Quick Select Days */}
          <div>
            <label className="block text-slate-300 font-bold mb-2">
              اختر مدة التمديد الإضافية (تطبق خصومات تلقائية فورية):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { days: 1, label: '+1 يوم', disc: '' },
                { days: 3, label: '+3 أيام', disc: 'خصم 10%' },
                { days: 7, label: '+أسبوع (7 أيام)', disc: 'خصم 15%' },
                { days: 30, label: '+شهر (30 يوم)', disc: 'خصم 25%' }
              ].map((opt) => (
                <button
                  key={opt.days}
                  type="button"
                  onClick={() => setAdditionalDays(opt.days)}
                  className={`p-2.5 rounded-xl border text-center transition flex flex-col justify-between ${
                    additionalDays === opt.days
                      ? 'border-amber-500 bg-amber-500/15 text-white shadow-lg'
                      : 'border-slate-800 bg-slate-950/70 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold text-xs">{opt.label}</span>
                  {opt.disc && (
                    <span className="text-[9px] text-emerald-400 font-bold mt-1">
                      {opt.disc}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Cost Summary Box */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">قيمة التمديد الإضافية:</span>
              <span className="font-mono font-black text-amber-400 text-sm">
                {discountedFeeYer.toLocaleString()} ر.ي
              </span>
            </div>
            {discountPct > 0 && (
              <div className="flex items-center justify-between text-[11px] text-emerald-400">
                <span>قيمة الخصم التلقائي الموفرة:</span>
                <span className="font-mono font-bold">
                  {(standardFeeYer - discountedFeeYer).toLocaleString()} ر.ي ({discountPct}%)
                </span>
              </div>
            )}
            <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800/80">
              * يتم تحديث العقد فورياً وإرسال إشعار للمكتب لمنع احتساب أي غرامات تأخير أو تضارب في الجدولة.
            </div>
          </div>

          {/* Wallet Choice */}
          <div>
            <label className="block text-slate-300 font-bold mb-1.5">
              طريقة سداد قيمة التمديد:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {YEMENI_WALLETS.slice(0, 4).map((w) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setWallet(w.id)}
                  className={`p-2 rounded-xl border text-right transition ${
                    wallet === w.id
                      ? 'border-amber-500 bg-amber-500/15 text-white'
                      : 'border-slate-800 bg-slate-950 text-slate-400'
                  }`}
                >
                  <div className="text-xs font-bold">{w.name}</div>
                  <div className="text-[10px] text-slate-500 truncate">{w.bankName}</div>
                </button>
              ))}
            </div>
          </div>

          {success ? (
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-center font-bold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>تم تمديد فترة عقد الإيجار بنجاح! تم تحديث موعد الإرجاع.</span>
            </div>
          ) : (
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={handleExtend}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 transition"
              >
                <Sparkles className="w-4 h-4" />
                <span>تأكيد التمديد وتحديث العقد</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold text-xs"
              >
                إلغاء
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
