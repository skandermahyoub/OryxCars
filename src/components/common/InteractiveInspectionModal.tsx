import React, { useState } from 'react';
import { Booking, Car, ScratchZone } from '../../types';
import { X, Shield, CheckCircle2, AlertTriangle, Gauge, Fuel, Camera, Check } from 'lucide-react';

interface InteractiveInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking?: Booking;
  car?: Car;
  inspectionType?: 'check_out' | 'check_in';
  onConfirmInspection?: (notes: string) => void;
}

export const InteractiveInspectionModal: React.FC<InteractiveInspectionModalProps> = ({
  isOpen,
  onClose,
  booking,
  car,
  inspectionType = 'check_out',
  onConfirmInspection
}) => {
  if (!isOpen) return null;

  const [fuelLevel, setFuelLevel] = useState<number>(100);
  const [odometerKm, setOdometerKm] = useState<number>(34210);
  const [activeZone, setActiveZone] = useState<string>('front');
  const [notes, setNotes] = useState<string>('المركبة بحالة ممتازة، نظافة داخلية وخارجية تامة، الإطارات سليمة.');
  const [signedApproved, setSignedApproved] = useState<boolean>(false);

  const zones: { id: string; name: string; status: 'clean' | 'minor_scratch' | 'inspected'; desc: string }[] = [
    { id: 'front', name: 'المقدمة والصدام والشبك الأمامي', status: 'clean', desc: 'سليم تماماً بدون أي خدوش أو كدمات' },
    { id: 'windshield', name: 'الزجاج الأمامي والسقف والبانوراما', status: 'clean', desc: 'زجاج عازل سليم ونظيف دون شروخ' },
    { id: 'left', name: 'الجانب الأيسر (أبواب ورفارف ومرايا)', status: 'clean', desc: 'سليم، دهان الوكالة بحالة المصنع' },
    { id: 'right', name: 'الجانب الأيمن (أبواب ورفارف ومرايا)', status: 'minor_scratch', desc: 'خدش سطحي طفيف جداً أسفل الرفرف الخلفي (مثبت بالصورة)' },
    { id: 'rear', name: 'المؤخرة والشنطة والصدام الخلفي', status: 'clean', desc: 'سليم والحساسات والكاميرا الخلفية تعمل بامتياز' },
    { id: 'interior', name: 'المقصورة الداخلية والفرش والجلد', status: 'clean', desc: 'نظافة VIP، شاشات سليمة، روائح منعشة' }
  ];

  const handleApprove = () => {
    setSignedApproved(true);
    if (onConfirmInspection) {
      onConfirmInspection(notes);
    }
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 text-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/90">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white">
                محضر فحص المركبة البصري التفاعلي 360° وسجل الحالة
              </h3>
              <p className="text-[11px] text-slate-400">
                {car?.name || booking?.carName || 'المركبة'} · لوحة: <span className="font-mono text-amber-400 font-bold">{car?.plateNumber || 'صنعاء 14-88902'}</span>
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

        {/* Body Content */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto text-xs">
          {/* Top Gauge Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                <Fuel className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">مستوى الوقود الحالي:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-emerald-400 text-sm">{fuelLevel}% (فل كامل)</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center shrink-0">
                <Gauge className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">قراءة عداد الكيلومترات:</span>
                <span className="font-mono font-black text-sky-400 text-sm">{odometerKm.toLocaleString()} كم</span>
              </div>
            </div>
          </div>

          {/* Interactive Car Body Diagram */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-200">
                مخطط هيكل السيارة (انقر على أي جزء لمعاينة الفحص والصور):
              </label>
              <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/30">
                فحص 360° دقيق وموثق بالصور
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {zones.map((z) => {
                const isSelected = activeZone === z.id;
                return (
                  <button
                    key={z.id}
                    type="button"
                    onClick={() => setActiveZone(z.id)}
                    className={`p-3 rounded-2xl border text-right transition flex flex-col justify-between gap-2 ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/15 text-white shadow-lg'
                        : 'border-slate-800 bg-slate-950/70 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs">{z.name}</span>
                      {z.status === 'clean' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {z.status === 'clean' ? '✓ سليم 100%' : '⚠️ ملاحظة مسجلة'}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Zone Details Box */}
            {(() => {
              const currentZ = zones.find((z) => z.id === activeZone) || zones[0];
              return (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-400 text-xs">
                      تفاصيل فحص: {currentZ.name}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        currentZ.status === 'clean'
                          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {currentZ.status === 'clean' ? 'سليم تماماً' : 'خدش سطحي موثق مسبقاً'}
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs">{currentZ.desc}</p>
                  <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
                    <Camera className="w-3.5 h-3.5 text-amber-400" />
                    <span>تم توثيق الحالة بصورة رقمية عالية الدقة مؤرخة عند الفحص الميداني</span>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Inspection Notes */}
          <div>
            <label className="block text-slate-300 font-bold mb-1.5">
              ملاحظات المهندس الفاحص / العميل:
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          {signedApproved ? (
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-center font-bold flex items-center justify-center gap-2">
              <Check className="w-5 h-5 text-emerald-400" />
              <span>تمت المصادقة واعتماد محضر الفحص الفني بنجاح!</span>
            </div>
          ) : (
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={handleApprove}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 transition"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>مصادقة واعتماد محضر الفحص</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold text-xs"
              >
                إغلاق
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
