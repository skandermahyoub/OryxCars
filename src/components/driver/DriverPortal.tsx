import React, { useState } from 'react';
import { Driver, Booking, Currency, Language } from '../../types';
import { TripMapTracker } from '../common/TripMapTracker';
import { 
  Navigation, 
  MapPin, 
  Phone, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  User, 
  DollarSign, 
  Award, 
  AlertTriangle, 
  Check, 
  Compass, 
  Car, 
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';

interface DriverPortalProps {
  driver: Driver;
  activeBooking?: Booking;
  onUpdateBooking: (booking: Booking) => void;
  currency: Currency;
  lang: Language;
}

export const DriverPortal: React.FC<DriverPortalProps> = ({
  driver,
  activeBooking,
  onUpdateBooking,
  currency,
  lang
}) => {
  const isAr = lang === 'ar';
  const [driverStatus, setDriverStatus] = useState<'available' | 'on_trip' | 'offline'>(driver.status);
  const [sosActive, setSosActive] = useState<boolean>(false);
  const [sosMessage, setSosMessage] = useState<string>('');

  const currentTrip = activeBooking;

  const handleAdvanceStatus = () => {
    if (!currentTrip) return;
    if (currentTrip.bookingStatus === 'confirmed') {
      onUpdateBooking({ ...currentTrip, bookingStatus: 'driver_en_route' });
    } else if (currentTrip.bookingStatus === 'driver_en_route') {
      onUpdateBooking({ ...currentTrip, bookingStatus: 'in_progress', tripProgressPct: 15 });
    } else if (currentTrip.bookingStatus === 'in_progress') {
      onUpdateBooking({ ...currentTrip, bookingStatus: 'completed', tripProgressPct: 100, etaMinutes: 0 });
    }
  };

  const handleCheckpointToggle = (checkpointId: string) => {
    if (!currentTrip) return;
    const updatedCheckpoints = currentTrip.checkpoints.map((cp) => {
      if (cp.id === checkpointId) {
        return { ...cp, passed: !cp.passed };
      }
      return cp;
    });
    const passedCount = updatedCheckpoints.filter((c) => c.passed).length;
    const newProgress = Math.round((passedCount / updatedCheckpoints.length) * 100);

    onUpdateBooking({
      ...currentTrip,
      checkpoints: updatedCheckpoints,
      tripProgressPct: newProgress
    });
  };

  const triggerSos = () => {
    setSosActive(true);
    setSosMessage(isAr ? 'تم إرسال إشارة استغاثة فورية وتحديد موقعك بالأقمار الصناعية لغرفة عمليات صنعاء المركزية.' : 'SOS signal and GPS coordinate sent to Sanaa Central Operations.');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Driver Cockpit Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 flex items-center justify-center overflow-hidden shrink-0">
            <span className="text-xl font-black text-amber-400">VIP</span>
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>{driver.licenseNumber}</span>
              <span>·</span>
              <span className="text-amber-400 font-medium">{isAr ? 'معتمد للرحلات بين المحافظات' : 'Certified Highway Chauffeur'}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-100 font-heading">
              {isAr ? driver.name : driver.nameEn}
            </h2>
            <div className="flex items-center gap-3 text-xs text-slate-300 mt-1">
              <span className="font-mono text-amber-400">{driver.assignedCarName}</span>
              <span>·</span>
              <span className="font-mono text-slate-400">[{driver.assignedCarPlate}]</span>
            </div>
          </div>
        </div>

        {/* Quick Duty Status Controls */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center">
            <button
              onClick={() => setDriverStatus('available')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                driverStatus === 'available'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isAr ? 'متاح للطلب' : 'Available'}
            </button>
            <button
              onClick={() => setDriverStatus('on_trip')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                driverStatus === 'on_trip'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isAr ? 'في مهمة رسمية' : 'On Mission'}
            </button>
            <button
              onClick={() => setDriverStatus('offline')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                driverStatus === 'offline'
                  ? 'bg-slate-700 text-slate-200'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isAr ? 'استراحة' : 'Rest'}
            </button>
          </div>

          {/* SOS Trigger Button */}
          <button
            onClick={triggerSos}
            className="px-4 py-2 rounded-xl bg-red-600/20 border border-red-500/40 text-red-400 hover:bg-red-600 hover:text-white font-bold text-xs flex items-center gap-1.5 transition shadow-lg shadow-red-500/10"
            title={isAr ? 'زر الطوارئ والاتصال بالعمليات' : 'Emergency SOS'}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>{isAr ? 'طوارئ SOS' : 'SOS'}</span>
          </button>
        </div>
      </div>

      {sosActive && (
        <div className="p-4 rounded-xl border border-red-500 bg-red-950/40 text-red-200 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{sosMessage}</span>
          </div>
          <button
            onClick={() => setSosActive(false)}
            className="text-xs underline text-red-400"
          >
            {isAr ? 'إلغاء التنبيه' : 'Dismiss'}
          </button>
        </div>
      )}

      {/* Driver Operational Metrics (NO PILLS, Tabular numerals) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80">
          <div className="text-[11px] text-slate-400">{isAr ? 'أرباح ومستحقات الشهر' : 'Monthly Earnings'}</div>
          <div className="text-xl font-bold font-mono tabular-nums text-amber-400 mt-1">
            {currency === 'YER'
              ? `${driver.earningsThisMonthYer.toLocaleString()} ريال`
              : `$${driver.earningsThisMonthUsd}`}
          </div>
          <div className="text-[10px] text-emerald-400 mt-0.5">✓ تم صرف بدل الوقود والخطوط</div>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80">
          <div className="text-[11px] text-slate-400">{isAr ? 'الرحلات الناجحة المكتملة' : 'Completed Trips'}</div>
          <div className="text-xl font-bold font-mono tabular-nums text-slate-100 mt-1">
            {driver.tripsCount} {isAr ? 'رحلة' : 'trips'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">{driver.yearsExperience} {isAr ? 'سنوات خبرة جبلية' : 'years experience'}</div>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80">
          <div className="text-[11px] text-slate-400">{isAr ? 'تقييم العملاء والضيوف' : 'Guest Rating'}</div>
          <div className="text-xl font-bold font-mono tabular-nums text-amber-400 mt-1 flex items-center gap-1">
            <span>{driver.rating}</span>
            <span className="text-xs text-amber-400">★</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">{isAr ? 'سائق نخبوي معتمد' : 'Protocol Certified'}</div>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80">
          <div className="text-[11px] text-slate-400">{isAr ? 'الموقع الحالي المسجل' : 'GPS Location'}</div>
          <div className="text-xs font-semibold text-slate-200 mt-1 truncate">
            {driver.currentLocation}
          </div>
          <div className="text-[10px] text-emerald-400 mt-0.5">● متصل بالأقمار الصناعية</div>
        </div>
      </div>

      {/* Active Mission Cockpit */}
      {currentTrip ? (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Mission status bar */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs text-amber-400 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>{isAr ? 'المهمة التنفيذية النشطة حالياً' : 'Active Assigned Mission'}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-100">
                  {currentTrip.carName} · {currentTrip.destination}
                </h3>
              </div>

              {/* Mission Progress Action Button */}
              <button
                onClick={handleAdvanceStatus}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition"
              >
                {currentTrip.bookingStatus === 'confirmed' && (isAr ? 'بدء التوجه لموقع العميل' : 'En Route to Client')}
                {currentTrip.bookingStatus === 'driver_en_route' && (isAr ? 'تم الوصول ومقابلة العميل' : 'Arrived at Client')}
                {currentTrip.bookingStatus === 'in_progress' && (isAr ? 'إكمال الرحلة وتسليم السيارة' : 'Complete Trip')}
                {currentTrip.bookingStatus === 'completed' && (isAr ? 'الرحلة مكتملة بنجاح' : 'Trip Completed')}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Passenger & Booking Info */}
            <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-slate-800">
              <div className="space-y-1">
                <div className="text-xs text-slate-400">{isAr ? 'العميل والضيف الكريم' : 'VIP Passenger'}</div>
                <div className="text-sm font-bold text-slate-100">{currentTrip.customerName}</div>
                <div className="text-xs text-slate-400 font-mono">{currentTrip.customerPhone}</div>
                <div className="text-[11px] text-amber-400">{currentTrip.customerIdNumber}</div>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-slate-400">{isAr ? 'نقطة الانطلاق والتوصيل' : 'Pickup & Destination'}</div>
                <div className="text-xs font-semibold text-slate-200">
                  {isAr ? 'من:' : 'From:'} {currentTrip.pickupLocation}
                </div>
                <div className="text-xs font-semibold text-emerald-400">
                  {isAr ? 'إلى:' : 'To:'} {currentTrip.destination}
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  {currentTrip.startDate} ({currentTrip.days} {isAr ? 'أيام' : 'days'})
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-slate-400">{isAr ? 'الضمان المعتمد والمستحقات' : 'Guarantee & Financials'}</div>
                <div className="text-xs text-slate-300 line-clamp-1">{currentTrip.guaranteeDetails}</div>
                <div className="text-sm font-bold font-mono text-amber-400 tabular-nums">
                  {currency === 'YER'
                    ? `${currentTrip.totalAmountYer.toLocaleString()} ريال يمني`
                    : `$${currentTrip.totalAmountUsd} USD`}
                </div>
                <div className="text-[10px] text-emerald-400">✓ السداد مدفوع إلكترونياً ({currentTrip.walletUsed})</div>
              </div>
            </div>

            {/* Interactive Telemetry Map Tracker */}
            <div className="p-5">
              <TripMapTracker booking={currentTrip} onUpdateBooking={onUpdateBooking} lang={lang} />
            </div>

            {/* Checkpoint Sign-off Interactive List */}
            {currentTrip.checkpoints.length > 0 && (
              <div className="p-5 bg-slate-950/60 border-t border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-200">
                  {isAr ? 'سجل تأكيد عبور نقاط التفتيش والاستراحات (اضغط للتأكيد):' : 'Checkpoints Transit Verification Log:'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentTrip.checkpoints.map((cp) => (
                    <div
                      key={cp.id}
                      onClick={() => handleCheckpointToggle(cp.id)}
                      className={`cursor-pointer p-3 rounded-xl border text-right transition flex items-center justify-between ${
                        cp.passed
                          ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300'
                          : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                          cp.passed ? 'border-emerald-400 bg-emerald-500 text-slate-950' : 'border-slate-700'
                        }`}>
                          {cp.passed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-bold">{isAr ? cp.name : cp.nameEn}</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">{cp.timeEstimate}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-12 rounded-2xl border border-slate-800 bg-slate-900/60 text-center space-y-3">
          <Car className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-200">
            {isAr ? 'لا توجد رحلة معينة لك في هذه اللحظة' : 'No Active Mission Assigned'}
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            {isAr
              ? 'أنت على رأس قائمة الانتظار للمهام التنفيذية واستقبال المطار والرحلات بين المحافظات. سيصلك إشعار فوري عند إسناد حجز جديد.'
              : 'You are on standby for executive airport transfers and highway assignments.'}
          </p>
        </div>
      )}

      {/* Driver Mountain Highway Safety Protocols */}
      <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-3">
        <h4 className="text-xs font-bold text-amber-400 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4" />
          <span>{isAr ? 'بروتوكولات السلامة في المنعطفات الجبلية اليمنية (سمارة، يسلح، مناخة)' : 'High Mountain Pass Safety Protocols'}</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
            <span className="font-bold text-slate-200 block mb-1">{isAr ? '1. فحص الفرامل وضغط الإطارات' : '1. Brake & Pressure Inspection'}</span>
            <span>{isAr ? 'التأكد من سلامة نظام الفرامل ومستوى زيت الهيدروليك قبل صعود نقيل سمارة.' : 'Check hydraulic fluid prior to ascending.'}</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
            <span className="font-bold text-slate-200 block mb-1">{isAr ? '2. الالتزام بمسار الصعود' : '2. Mountain Lane Discipline'}</span>
            <span>{isAr ? 'عدم التجاوز في المنعطفات العمياء واستخدام الغيار المنخفض (Heavy Engine Braking).' : 'Never overtake on blind mountain bends.'}</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
            <span className="font-bold text-slate-200 block mb-1">{isAr ? '3. تجهيز أوراق الضيوف' : '3. Checkpoint Manifests'}</span>
            <span>{isAr ? 'التأكد من حمل وثائق عقد الإيجار الإلكتروني وتصريح السفر الرسمي لتسريع العبور.' : 'Carry digital rental contract for fast pass.'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
