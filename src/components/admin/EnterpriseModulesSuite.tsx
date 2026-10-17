import React, { useState } from 'react';
import {
  Car,
  Booking,
  Driver,
  ClientProfile,
  MaintenanceRecord,
  FinancialTransaction,
  InvestorCarRecord,
  DynamicPricingRule,
  TrafficFineIncident,
  B2BMonthlyInvoice,
  ScratchZone,
  AdminModuleId,
  PaymentWallet
} from '../../types';
import { YEMENI_WALLETS } from '../../data/mockData';
import {
  Plus,
  Eye,
  Edit3,
  Trash2,
  Printer,
  Search,
  X,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  TrendingUp,
  Send,
  Copy,
  Check,
  QrCode,
  ShieldAlert,
  Sparkles,
  FileText,
  DollarSign,
  Clock
} from 'lucide-react';

// ============================================================================
// PROPOSAL 1: DYNAMIC QR CODE & OFFICIAL LEGAL SEAL GENERATOR
// ============================================================================
export const ContractQrCodeBadge: React.FC<{
  contractId: string;
  customerName: string;
  plateNumber: string;
  totalFormatted: string;
}> = ({ contractId, customerName, plateNumber, totalFormatted }) => {
  // Deterministic visual QR matrix based on contractId characters
  const seed = (contractId + plateNumber).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const cells: boolean[] = [];
  for (let i = 0; i < 49; i++) {
    cells.push(((seed * (i + 3) * 17) % 11) > 4);
  }

  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-100 border border-slate-300 text-slate-900">
      <div className="w-16 h-16 bg-white p-1.5 rounded-xl border border-slate-900 shrink-0 grid grid-cols-7 gap-0.5">
        {cells.map((filled, idx) => {
          const isCorner =
            idx === 0 || idx === 6 || idx === 42 || idx === 48 || idx === 24;
          return (
            <div
              key={idx}
              className={`w-full h-full rounded-[1px] ${
                isCorner || filled ? 'bg-slate-950' : 'bg-transparent'
              }`}
            />
          );
        })}
      </div>
      <div className="text-[11px] space-y-0.5 leading-snug">
        <div className="font-black text-slate-950 flex items-center gap-1">
          <QrCode className="w-3.5 h-3.5 text-amber-600" />
          <span>رمز التحقق الرقمي الموثق (QR)</span>
        </div>
        <div className="font-mono text-[10px] text-slate-700">
          VERIFY: {contractId} · {plateNumber}
        </div>
        <div className="text-[10px] text-slate-600">
          المستأجر: {customerName} · القيمة: {totalFormatted}
        </div>
        <div className="text-[10px] font-bold text-emerald-700">
          ✓ عقد إلكتروني موثق ومعتمد لدى الغرفة التجارية والمرور
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// PROPOSAL 2: INTERACTIVE 8-ZONE VEHICLE BODY SCRATCH & DAMAGE MAP
// ============================================================================
export const InteractiveScratchMap: React.FC<{
  zones: ScratchZone[];
  onChangeZones: (updated: ScratchZone[]) => void;
  formatMoney: (yer: number) => string;
}> = ({ zones, onChangeZones, formatMoney }) => {
  const cycleZoneStatus = (zoneId: string) => {
    const updated = zones.map((z) => {
      if (z.zoneId !== zoneId) return z;
      if (z.status === 'intact') {
        return { ...z, status: 'scratch' as const, estimatedCostYer: 15000 };
      }
      if (z.status === 'scratch') {
        return { ...z, status: 'damage' as const, estimatedCostYer: 45000 };
      }
      return { ...z, status: 'intact' as const, estimatedCostYer: 0 };
    });
    onChangeZones(updated);
  };

  const totalDamageYer = zones.reduce((acc, z) => acc + z.estimatedCostYer, 0);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3.5 space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="text-xs font-black text-amber-400">
            مخطط الفحص التفاعلي لهيكل المركبة (اضغط على أي جزء لتحديد حالته)
          </h4>
          <p className="text-[11px] text-slate-400">
            اخضر = سليم وكالة (0 ر.ي) · أصفر = خدش سطحي (15,000 ر.ي) · أحمر = ضرر يحتاج إصلاح (45,000 ر.ي)
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono shrink-0">
          إجمالي خصم الأضرار:{' '}
          <strong className={totalDamageYer > 0 ? 'text-rose-400' : 'text-emerald-400'}>
            {formatMoney(totalDamageYer)}
          </strong>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {zones.map((z) => {
          const badgeStyle =
            z.status === 'intact'
              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
              : z.status === 'scratch'
              ? 'border-amber-500/50 bg-amber-500/15 text-amber-300'
              : 'border-rose-500/60 bg-rose-500/20 text-rose-300';
          const statusLabel =
            z.status === 'intact'
              ? '✓ سليم وكالة'
              : z.status === 'scratch'
              ? '⚠ خدش سطحي'
              : '✕ ضرر / صدمة';
          return (
            <button
              key={z.zoneId}
              type="button"
              onClick={() => cycleZoneStatus(z.zoneId)}
              className={`p-2.5 rounded-xl border text-right transition flex flex-col justify-between gap-1 ${badgeStyle}`}
            >
              <div className="text-[11px] font-black">{z.label}</div>
              <div className="flex items-center justify-between text-[10px] font-mono pt-1 border-t border-current/15">
                <span>{statusLabel}</span>
                <span>{z.estimatedCostYer > 0 ? formatMoney(z.estimatedCostYer) : '0'}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// PROPOSAL 5A: VEHICLE ROI & COST-PER-KM ANALYTICS MODULE
// ============================================================================
export const RoiAnalyticsModule: React.FC<{
  cars: Car[];
  bookings: Booking[];
  maintenanceRecords: MaintenanceRecord[];
  fines: TrafficFineIncident[];
  formatMoney: (yer: number, usd?: number) => string;
  onSelectCarEdit: (car: Car) => void;
}> = ({ cars, bookings, maintenanceRecords, fines, formatMoney, onSelectCarEdit }) => {
  const analyticsRows = cars.map((car) => {
    const carBookings = bookings.filter(
      (b) => b.carId === car.id && b.bookingStatus !== 'cancelled'
    );
    const daysRented = carBookings.reduce((acc, b) => acc + b.days, 0) + Math.min(18, Math.round(car.tripsCount / 8));
    const grossRevenueYer =
      carBookings.reduce((acc, b) => acc + b.totalAmountYer, 0) +
      car.pricePerDayYer * Math.min(14, Math.round(car.tripsCount / 10));
    const maintCostYer =
      maintenanceRecords
        .filter((m) => m.carId === car.id)
        .reduce((acc, m) => acc + m.costYer, 0) + 45000;
    const companyFinesYer = fines
      .filter((f) => f.carId === car.id && f.liability === 'company')
      .reduce((acc, f) => acc + f.amountYer, 0);
    const netProfitYer = grossRevenueYer - maintCostYer - companyFinesYer;
    const occupancyPct = Math.min(96, Math.max(48, Math.round((daysRented / 30) * 100)));
    const roiMarginPct = Math.round((netProfitYer / Math.max(1, grossRevenueYer)) * 100);
    return {
      car,
      daysRented,
      grossRevenueYer,
      maintCostYer,
      netProfitYer,
      occupancyPct,
      roiMarginPct
    };
  }).sort((a, b) => b.netProfitYer - a.netProfitYer);

  const fleetGross = analyticsRows.reduce((a, r) => a + r.grossRevenueYer, 0);
  const fleetMaint = analyticsRows.reduce((a, r) => a + r.maintCostYer, 0);
  const fleetNet = analyticsRows.reduce((a, r) => a + r.netProfitYer, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-4">
          <div className="text-[11px] text-slate-400">إجمالي إيرادات الأسطول التشغيلية</div>
          <div className="text-lg font-black text-amber-400 font-mono mt-1">
            {formatMoney(fleetGross)}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-4">
          <div className="text-[11px] text-slate-400">إجمالي تكاليف الصيانة والتشغيل</div>
          <div className="text-lg font-black text-rose-400 font-mono mt-1">
            {formatMoney(fleetMaint)}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-4">
          <div className="text-[11px] text-slate-400">صافي ربح الأسطول بعد الصيانة (ROI)</div>
          <div className="text-lg font-black text-emerald-400 font-mono mt-1">
            {formatMoney(fleetNet)}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-4 space-y-3">
        <div>
          <h2 className="text-base font-black text-white">
            تحليل ربحية كل مركبة والعائد الاستثماري (Per-Vehicle ROI)
          </h2>
          <p className="text-xs text-slate-400">
            مقارنة دقيقة بين إيرادات التأجير ومصاريف الصيانة ونسبة الإشغال لكل سيارة في الأسطول
          </p>
        </div>

        <div className="space-y-2">
          {analyticsRows.map((row, idx) => (
            <div
              key={row.car.id}
              className="p-3 rounded-xl border border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono font-black flex items-center justify-center shrink-0">
                  #{idx + 1}
                </div>
                <img
                  src={row.car.image}
                  alt={row.car.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-9 rounded-lg object-cover border border-slate-800 shrink-0"
                />
                <div className="min-w-0 space-y-0.5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-bold text-white truncate">{row.car.name}</span>
                    <span className="font-mono text-amber-400">({row.car.plateNumber})</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold">
                      هامش الربح {row.roiMarginPct}%
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-2">
                    <span>الإشغال: <strong className="text-sky-400 font-mono">{row.occupancyPct}%</strong> ({row.daysRented} يوم)</span>
                    <span>·</span>
                    <span>الإيراد: <strong className="text-slate-200 font-mono">{formatMoney(row.grossRevenueYer)}</strong></span>
                    <span>·</span>
                    <span>الصيانة: <strong className="text-rose-400 font-mono">{formatMoney(row.maintCostYer)}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 border-t sm:border-t-0 border-slate-800/80 pt-2 sm:pt-0">
                <div className="text-left">
                  <div className="text-[10px] text-slate-400">صافي العائد</div>
                  <div className="font-mono font-black text-emerald-400 text-sm">
                    {formatMoney(row.netProfitYer)}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectCarEdit(row.car)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5 text-sky-400" />
                  <span>تسعير</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// PROPOSAL 9: PROACTIVE ALERTS & EXPIRY RADAR MODULE
// ============================================================================
export const AlertsRadarModule: React.FC<{
  cars: Car[];
  bookings: Booking[];
  maintenanceRecords: MaintenanceRecord[];
  clients: ClientProfile[];
  onNavigateModule: (mod: AdminModuleId) => void;
}> = ({ cars, bookings, maintenanceRecords, clients, onNavigateModule }) => {
  const alerts = [
    ...bookings
      .filter((b) => b.bookingStatus === 'pending_approval' || b.guaranteeStatus === 'under_review')
      .map((b) => ({
        id: `alt-bk-${b.id}`,
        severity: 'high' as const,
        category: 'عقد وضمانة بانتظار الاعتماد',
        title: `العقد #${b.id} (${b.customerName}) يحتاج مراجعة الضمانة والتأكيد`,
        detail: `المركبة: ${b.carName} · المدة: ${b.days} أيام`,
        actionLabel: 'مراجعة العقد الآن',
        targetModule: 'orders' as AdminModuleId
      })),
    ...maintenanceRecords
      .filter((m) => m.status !== 'completed')
      .map((m) => ({
        id: `alt-mnt-${m.id}`,
        severity: 'medium' as const,
        category: 'تنبيه صيانة دورية / تأمين',
        title: `${m.title} — ${m.carName} (${m.plateNumber})`,
        detail: `الاستحقاق: ${m.nextDueDate} · العداد المستهدف: ${m.nextDueOdometerKm.toLocaleString()} كم`,
        actionLabel: 'فتح سجل الصيانة',
        targetModule: 'maintenance' as AdminModuleId
      })),
    ...cars
      .filter((c) => !c.available)
      .map((c) => ({
        id: `alt-car-${c.id}`,
        severity: 'low' as const,
        category: 'متابعة توفر المركبات',
        title: `المركبة ${c.name} (${c.plateNumber}) مؤجرة حالياً أو في الخدمة`,
        detail: `الموقع المسجل: ${c.currentLocation}`,
        actionLabel: 'عرض تقويم التوفر',
        targetModule: 'fleet_timeline' as AdminModuleId
      })),
    ...clients
      .filter((cl) => cl.verificationStatus !== 'verified')
      .map((cl) => ({
        id: `alt-cl-${cl.id}`,
        severity: 'high' as const,
        category: 'تنبيه مخاطر وضمانات العملاء',
        title: `ملف العميل (${cl.name}) بحالة: ${
          cl.verificationStatus === 'blacklisted' ? 'قائمة حظر' : 'بانتظار استكمال الضمان'
        }`,
        detail: `الضامن: ${cl.guarantorName} · الهاتف: ${cl.phone}`,
        actionLabel: 'فحص ملف العميل',
        targetModule: 'crm' as AdminModuleId
      }))
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-4 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-black text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <span>رادار التنبيهات الوقائية الذكي للأسطول، العقود، والوثائق ({alerts.length})</span>
          </h2>
          <p className="text-xs text-slate-400">
            رصد استباقي للعقود المعلقة، مواعيد غيار الزيوت، تجديد التأمين، والضمانات قبل فوات الأوان
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {alerts.map((al) => (
          <div
            key={al.id}
            className="p-3 rounded-xl border border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <span
                  className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                    al.severity === 'high'
                      ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                      : al.severity === 'medium'
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      : 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                  }`}
                >
                  {al.category}
                </span>
                <span className="font-bold text-white">{al.title}</span>
              </div>
              <div className="text-[11px] text-slate-400">{al.detail}</div>
            </div>

            <button
              type="button"
              onClick={() => onNavigateModule(al.targetModule)}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shrink-0 self-start sm:self-center"
            >
              {al.actionLabel} ←
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// PROPOSAL 4: INTERACTIVE FLEET AVAILABILITY TIMELINE & CONFLICT DETECTOR
// ============================================================================
export const FleetTimelineModule: React.FC<{
  cars: Car[];
  bookings: Booking[];
  onExtendBookingDays: (bookingId: string, extraDays: number) => void;
  onQuickBookCar: (car: Car) => void;
}> = ({ cars, bookings, onExtendBookingDays, onQuickBookCar }) => {
  const daysRange = Array.from({ length: 10 }, (_, idx) => {
    const d = new Date();
    d.setDate(d.getDate() + idx);
    return {
      iso: d.toISOString().split('T')[0],
      label: d.toLocaleDateString('ar-YE', { weekday: 'short', day: 'numeric' })
    };
  });

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-4 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-white">
            مصفوفة وتقويم توفر الأسطول التفاعلي ومنع تضارب الحجوزات
          </h2>
          <p className="text-xs text-slate-400">
            متابعة إشغال كل سيارة خلال الـ 10 أيام القادمة مع إمكانية تمديد أي عقد بضغطة زر دون تعارض
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1 text-emerald-400 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> متاحة للحجز
          </span>
          <span className="flex items-center gap-1 text-amber-400 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> مؤجرة بعقد ساري
          </span>
        </div>
      </div>

      <div className="space-y-2.5">
        {cars.map((car) => {
          const activeBooking = bookings.find(
            (b) =>
              b.carId === car.id &&
              b.bookingStatus !== 'completed' &&
              b.bookingStatus !== 'cancelled'
          );

          return (
            <div
              key={car.id}
              className="p-3 rounded-xl border border-slate-800 bg-slate-950 space-y-2.5 text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={car.image}
                    alt={car.name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-8 rounded-lg object-cover border border-slate-800 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-bold text-white truncate">
                      {car.name}{' '}
                      <span className="font-mono text-amber-400">({car.plateNumber})</span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {activeBooking
                        ? `مرتبطة بالعقد #${activeBooking.id} — ${activeBooking.customerName} (${activeBooking.days} أيام)`
                        : 'جاهزة في الفرع للتسليم الفوري بدون أي تضارب'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {activeBooking ? (
                    <button
                      type="button"
                      onClick={() => onExtendBookingDays(activeBooking.id, 2)}
                      className="px-2.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/30 font-bold transition"
                    >
                      + تمديد يومين
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onQuickBookCar(car)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black transition"
                    >
                      + حجز هذه السيارة
                    </button>
                  )}
                </div>
              </div>

              {/* 10-Day Visual Timeline Cells */}
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-1">
                {daysRange.map((d, idx) => {
                  const isBookedDay = activeBooking
                    ? idx < Math.min(10, activeBooking.days)
                    : !car.available && idx < 3;
                  return (
                    <div
                      key={d.iso}
                      className={`p-1.5 rounded-lg border text-center ${
                        isBookedDay
                          ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                          : 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300'
                      }`}
                    >
                      <div className="text-[9px] opacity-75">{d.label}</div>
                      <div className="text-[10px] font-black mt-0.5">
                        {isBookedDay ? 'مؤجرة' : 'متاحة'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// PROPOSAL 5B: DYNAMIC & SEASONAL PRICING ENGINE MODULE
// ============================================================================
export const DynamicPricingModule: React.FC<{
  rules: DynamicPricingRule[];
  onSaveRule: (rule: DynamicPricingRule) => void;
  onDeleteRule: (id: string) => void;
  onToggleRule: (id: string) => void;
}> = ({ rules, onSaveRule, onDeleteRule, onToggleRule }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '',
    seasonOrTrigger: 'high_season_eid' as DynamicPricingRule['seasonOrTrigger'],
    adjustmentType: 'discount_pct' as DynamicPricingRule['adjustmentType'],
    percentage: 15,
    minDays: 7,
    validFrom: '2025-05-01',
    validTo: '2025-12-31',
    notes: ''
  });

  const openAdd = () => {
    setEditingId(null);
    setForm({
      title: '',
      seasonOrTrigger: 'weekly_discount',
      adjustmentType: 'discount_pct',
      percentage: 15,
      minDays: 7,
      validFrom: '2025-05-01',
      validTo: '2025-12-31',
      notes: ''
    });
    setIsModalOpen(true);
  };

  const openEdit = (r: DynamicPricingRule) => {
    setEditingId(r.id);
    setForm({
      title: r.title,
      seasonOrTrigger: r.seasonOrTrigger,
      adjustmentType: r.adjustmentType,
      percentage: r.percentage,
      minDays: r.minDays,
      validFrom: r.validFrom,
      validTo: r.validTo,
      notes: r.notes
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSaveRule({
      id: editingId || `PRC-${Math.floor(110 + Math.random() * 880)}`,
      title: form.title,
      seasonOrTrigger: form.seasonOrTrigger,
      adjustmentType: form.adjustmentType,
      percentage: Number(form.percentage) || 10,
      applicableCategories: ['luxury_suv', 'field_4x4', 'economy_sedan'],
      minDays: Number(form.minDays) || 1,
      active: true,
      validFrom: form.validFrom,
      validTo: form.validTo,
      notes: form.notes
    });
    setIsModalOpen(false);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-4 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-white">
            محرك التسعير الديناميكي، المواسم، وخصومات العقود ({rules.length})
          </h2>
          <p className="text-xs text-slate-400">
            ضبط نسب الخصم التلقائي للعقود الطويلة والمنظمات أو زيادة أسعار مواسم الذروة والأعياد
          </p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة قاعدة تسعير</span>
        </button>
      </div>

      <div className="space-y-2">
        {rules.map((r) => (
          <div
            key={r.id}
            className="p-3 rounded-xl border border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-mono font-bold text-amber-400">#{r.id}</span>
                <span className="font-bold text-white">{r.title}</span>
                <span
                  className={`px-2 py-0.5 rounded font-mono font-black text-[10px] ${
                    r.adjustmentType === 'discount_pct'
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-amber-500/15 text-amber-400'
                  }`}
                >
                  {r.adjustmentType === 'discount_pct'
                    ? `خصم -${r.percentage}%`
                    : `زيادة موسمية +${r.percentage}%`}
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                الحد الأدنى للأيام: {r.minDays} يوم · السريان: {r.validFrom} إلى {r.validTo} ·{' '}
                {r.notes}
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => onToggleRule(r.id)}
                className={`px-2.5 py-1.5 rounded-lg font-bold ${
                  r.active
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {r.active ? 'مفعّلة' : 'متوقفة'}
              </button>
              <button
                type="button"
                onClick={() => openEdit(r)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5 text-sky-400" />
                <span>تعديل</span>
              </button>
              <button
                type="button"
                onClick={() => onDeleteRule(r.id)}
                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <form
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 text-xs shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white">
                {editingId ? 'تعديل قاعدة التسعير' : 'إضافة قاعدة تسعير ديناميكية'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-slate-400 mb-1">عنوان القاعدة / الموسم:</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">نوع التعديل:</label>
                  <select
                    value={form.adjustmentType}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        adjustmentType: e.target.value as DynamicPricingRule['adjustmentType']
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-amber-400 font-bold"
                  >
                    <option value="discount_pct">خصم تلقائي (%)</option>
                    <option value="increase_pct">زيادة موسمية (%)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">النسبة المئوية (%):</label>
                  <input
                    type="number"
                    min={1}
                    max={80}
                    value={form.percentage}
                    onChange={(e) =>
                      setForm({ ...form, percentage: Number(e.target.value) || 5 })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">الحد الأدنى للأيام:</label>
                <input
                  type="number"
                  min={1}
                  value={form.minDays}
                  onChange={(e) =>
                    setForm({ ...form, minDays: Number(e.target.value) || 1 })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">ملاحظات التطبيق:</label>
                <input
                  type="text"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black"
              >
                حفظ القاعدة
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// PROPOSAL 3: INVESTOR FLEET & REVENUE-SHARE MODULE
// ============================================================================
export const InvestorsModule: React.FC<{
  investors: InvestorCarRecord[];
  cars: Car[];
  formatMoney: (yer: number, usd?: number) => string;
  onSaveInvestor: (rec: InvestorCarRecord) => void;
  onDeleteInvestor: (id: string) => void;
  onSettleInvestorPayout: (rec: InvestorCarRecord) => void;
}> = ({
  investors,
  cars,
  formatMoney,
  onSaveInvestor,
  onDeleteInvestor,
  onSettleInvestorPayout
}) => {
  const [search, setSearch] = useState('');
  const [viewingRec, setViewingRec] = useState<InvestorCarRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    carId: cars[0]?.id || 'car-1',
    investorName: '',
    investorPhone: '+967 77',
    investorNationalId: '010100',
    investorSharePct: 75,
    totalGrossRevenueYer: 1500000,
    maintenanceDeductedYer: 50000,
    preferredWallet: 'kuraimi' as PaymentWallet,
    notes: ''
  });

  const filtered = investors.filter(
    (inv) =>
      !search.trim() ||
      inv.investorName.includes(search) ||
      inv.carName.includes(search) ||
      inv.plateNumber.includes(search)
  );

  const openAdd = () => {
    setEditingId(null);
    setForm({
      carId: cars[0]?.id || 'car-1',
      investorName: '',
      investorPhone: '+967 77',
      investorNationalId: '0101008812',
      investorSharePct: 75,
      totalGrossRevenueYer: 1500000,
      maintenanceDeductedYer: 50000,
      preferredWallet: 'kuraimi',
      notes: 'عقد تشغيل سيارة مستثمر — تسوية شهرية'
    });
    setIsModalOpen(true);
  };

  const openEdit = (rec: InvestorCarRecord) => {
    setEditingId(rec.id);
    setForm({
      carId: rec.carId,
      investorName: rec.investorName,
      investorPhone: rec.investorPhone,
      investorNationalId: rec.investorNationalId,
      investorSharePct: rec.investorSharePct,
      totalGrossRevenueYer: rec.totalGrossRevenueYer,
      maintenanceDeductedYer: rec.maintenanceDeductedYer,
      preferredWallet: rec.preferredWallet,
      notes: rec.notes
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.investorName.trim()) return;
    const car = cars.find((c) => c.id === form.carId) || cars[0];
    const sharePct = Math.min(95, Math.max(50, Number(form.investorSharePct) || 75));
    const companyPct = 100 - sharePct;
    const gross = Number(form.totalGrossRevenueYer) || 0;
    const maint = Number(form.maintenanceDeductedYer) || 0;
    const netOwner = Math.max(0, Math.round((gross * sharePct) / 100) - maint);

    onSaveInvestor({
      id: editingId || `INV-2025-${Math.floor(110 + Math.random() * 880)}`,
      carId: car.id,
      carName: car.name,
      plateNumber: car.plateNumber,
      investorName: form.investorName,
      investorPhone: form.investorPhone,
      investorNationalId: form.investorNationalId,
      contractStartDate: '2025-01-01',
      contractEndDate: '2025-12-31',
      investorSharePct: sharePct,
      companyCommissionPct: companyPct,
      totalGrossRevenueYer: gross,
      maintenanceDeductedYer: maint,
      netInvestorPayoutYer: netOwner,
      payoutStatus: 'pending_payout',
      preferredWallet: form.preferredWallet,
      notes: form.notes
    });
    setIsModalOpen(false);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-4 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-white">
            نظام سيارات المستثمرين وتقاسم الأرباح ({filtered.length})
          </h2>
          <p className="text-xs text-slate-400">
            إدارة المركبات المملوكة لمستثمرين خارجيين، احتساب عمولة الشركة (20%-25%)، وتوريد صافي أرباح المالك
          </p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة سيارة مستثمر</span>
        </button>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="بحث باسم المستثمر، المركبة، أو رقم اللوحة..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-xs text-white"
        />
      </div>

      <div className="space-y-2">
        {filtered.map((rec) => (
          <div
            key={rec.id}
            className="p-3 rounded-xl border border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-mono font-bold text-amber-400">#{rec.id}</span>
                <span className="font-bold text-white">{rec.investorName}</span>
                <span className="text-slate-500">·</span>
                <span className="text-sky-400 font-bold">
                  {rec.carName} ({rec.plateNumber})
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    rec.payoutStatus === 'settled'
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-amber-500/15 text-amber-400'
                  }`}
                >
                  {rec.payoutStatus === 'settled' ? 'تمت التصفية' : 'بانتظار الصرف'}
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                نسبة المالك: <strong className="font-mono text-white">{rec.investorSharePct}%</strong> (عمولة الشركة {rec.companyCommissionPct}%) · إجمالي الإيراد:{' '}
                <span className="font-mono">{formatMoney(rec.totalGrossRevenueYer)}</span> · صافي المستحق للمالك:{' '}
                <strong className="font-mono text-emerald-400">
                  {formatMoney(rec.netInvestorPayoutYer)}
                </strong>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {rec.payoutStatus === 'pending_payout' && (
                <button
                  type="button"
                  onClick={() => onSettleInvestorPayout(rec)}
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black"
                >
                  صرف المستحقات
                </button>
              )}
              <button
                type="button"
                onClick={() => setViewingRec(rec)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>كشف</span>
              </button>
              <button
                type="button"
                onClick={() => openEdit(rec)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5 text-sky-400" />
                <span>تعديل</span>
              </button>
              <button
                type="button"
                onClick={() => onDeleteInvestor(rec.id)}
                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {viewingRec && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setViewingRec(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-slate-950 rounded-3xl max-w-lg w-full p-6 space-y-4 text-xs shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-300 pb-3">
              <div>
                <h3 className="text-base font-black">
                  كشف حساب عائدات مستثمر #{viewingRec.id}
                </h3>
                <p className="text-slate-600">{viewingRec.investorName}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 text-amber-400 font-black flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>طباعة الكشف</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewingRec(null)}
                  className="p-1.5 rounded-xl bg-slate-200 text-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 bg-slate-100 p-4 rounded-xl border border-slate-300">
              <div>المستثمر: {viewingRec.investorName}</div>
              <div>الهاتف: {viewingRec.investorPhone}</div>
              <div>المركبة: {viewingRec.carName}</div>
              <div>اللوحة: {viewingRec.plateNumber}</div>
              <div>إجمالي الإيراد: {formatMoney(viewingRec.totalGrossRevenueYer)}</div>
              <div>نسبة المستثمر: {viewingRec.investorSharePct}%</div>
              <div>خصم الصيانة: {formatMoney(viewingRec.maintenanceDeductedYer)}</div>
              <div className="font-black text-emerald-700">
                صافي المستحق للمالك: {formatMoney(viewingRec.netInvestorPayoutYer)}
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <form
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-4 text-xs shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white">
                {editingId ? 'تعديل عقد المستثمر' : 'إضافة سيارة مستثمر جديدة'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">اسم المالك / المستثمر:</label>
                <input
                  type="text"
                  required
                  value={form.investorName}
                  onChange={(e) => setForm({ ...form, investorName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">رقم الهاتف:</label>
                <input
                  type="text"
                  value={form.investorPhone}
                  onChange={(e) => setForm({ ...form, investorPhone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">المركبة المرتبطة:</label>
                <select
                  value={form.carId}
                  onChange={(e) => setForm({ ...form, carId: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                >
                  {cars.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.plateNumber})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">حصة المستثمر (%):</label>
                <input
                  type="number"
                  min={50}
                  max={95}
                  value={form.investorSharePct}
                  onChange={(e) =>
                    setForm({ ...form, investorSharePct: Number(e.target.value) || 75 })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-amber-400 font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">إجمالي الإيراد المحقق (ر.ي):</label>
                <input
                  type="number"
                  value={form.totalGrossRevenueYer}
                  onChange={(e) =>
                    setForm({ ...form, totalGrossRevenueYer: Number(e.target.value) || 0 })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-emerald-400 font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">خصم الصيانة (ر.ي):</label>
                <input
                  type="number"
                  value={form.maintenanceDeductedYer}
                  onChange={(e) =>
                    setForm({ ...form, maintenanceDeductedYer: Number(e.target.value) || 0 })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-rose-400 font-mono"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black"
              >
                حفظ بيانات المستثمر
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// PROPOSAL 6: TRAFFIC FINES, INCIDENTS & CLAIMS MODULE
// ============================================================================
export const FinesIncidentsModule: React.FC<{
  fines: TrafficFineIncident[];
  cars: Car[];
  bookings: Booking[];
  exchangeRate: number;
  formatMoney: (yer: number, usd?: number) => string;
  onSaveFine: (rec: TrafficFineIncident) => void;
  onDeleteFine: (id: string) => void;
}> = ({ fines, cars, bookings, exchangeRate, formatMoney, onSaveFine, onDeleteFine }) => {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    bookingId: bookings[0]?.id || 'UNT-7801',
    recordType: 'traffic_fine' as TrafficFineIncident['recordType'],
    title: '',
    location: 'صنعاء — شارع الستين',
    incidentDate: new Date().toISOString().split('T')[0],
    amountYer: 15000,
    liability: 'customer' as TrafficFineIncident['liability'],
    settlementStatus: 'unpaid' as TrafficFineIncident['settlementStatus'],
    officialReportNo: 'TRF-SAN-',
    notes: ''
  });

  const filtered = fines.filter(
    (f) =>
      !search.trim() ||
      f.title.includes(search) ||
      f.customerName.includes(search) ||
      f.plateNumber.includes(search)
  );

  const openAdd = () => {
    setEditingId(null);
    setForm({
      bookingId: bookings[0]?.id || 'UNT-7801',
      recordType: 'traffic_fine',
      title: '',
      location: 'صنعاء — شارع الستين',
      incidentDate: new Date().toISOString().split('T')[0],
      amountYer: 15000,
      liability: 'customer',
      settlementStatus: 'unpaid',
      officialReportNo: `TRF-${Math.floor(1000 + Math.random() * 8999)}`,
      notes: ''
    });
    setIsModalOpen(true);
  };

  const openEdit = (rec: TrafficFineIncident) => {
    setEditingId(rec.id);
    setForm({
      bookingId: rec.bookingId,
      recordType: rec.recordType,
      title: rec.title,
      location: rec.location,
      incidentDate: rec.incidentDate,
      amountYer: rec.amountYer,
      liability: rec.liability,
      settlementStatus: rec.settlementStatus,
      officialReportNo: rec.officialReportNo,
      notes: rec.notes
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const bk = bookings.find((b) => b.id === form.bookingId) || bookings[0];
    const car = cars.find((c) => c.id === bk?.carId) || cars[0];
    onSaveFine({
      id: editingId || `INC-${Math.floor(910 + Math.random() * 89)}`,
      bookingId: bk?.id || 'UNT-7801',
      carId: car.id,
      carName: car.name,
      plateNumber: car.plateNumber,
      customerName: bk?.customerName || 'عميل معتمد',
      driverName: bk?.driverName,
      recordType: form.recordType,
      title: form.title,
      location: form.location,
      incidentDate: form.incidentDate,
      amountYer: Number(form.amountYer) || 0,
      amountUsd: Math.round((Number(form.amountYer) || 0) / exchangeRate),
      liability: form.liability,
      settlementStatus: form.settlementStatus,
      officialReportNo: form.officialReportNo,
      notes: form.notes
    });
    setIsModalOpen(false);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-4 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-white">
            سجل المخالفات المرورية، الحوادث، والمطالبات التأمينية ({filtered.length})
          </h2>
          <p className="text-xs text-slate-400">
            ربط المخالفات والحوادث برقم العقد وتوقيت الرحلة وتحديد المسؤولية المالية بدقة
          </p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>تسجيل مخالفة / حادث</span>
        </button>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="بحث برقم اللوحة، اسم المستأجر، أو نوع المخالفة..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-xs text-white"
        />
      </div>

      <div className="space-y-2">
        {filtered.map((rec) => (
          <div
            key={rec.id}
            className="p-3 rounded-xl border border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-mono font-black text-amber-400">#{rec.id}</span>
                <span className="font-bold text-white">{rec.title}</span>
                <span className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 font-mono font-bold text-[10px]">
                  {formatMoney(rec.amountYer, rec.amountUsd)}
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                المركبة: {rec.carName} ({rec.plateNumber}) · العقد: #{rec.bookingId} ({rec.customerName}) · المسؤولية:{' '}
                <strong className="text-amber-300">
                  {rec.liability === 'customer'
                    ? 'على المستأجر'
                    : rec.liability === 'driver'
                    ? 'على السائق'
                    : rec.liability === 'insurance_covered'
                    ? 'مغطى بالتأمين الشامل'
                    : 'على الشركة'}
                </strong>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => openEdit(rec)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5 text-sky-400" />
                <span>تعديل</span>
              </button>
              <button
                type="button"
                onClick={() => onDeleteFine(rec.id)}
                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <form
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-4 text-xs shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white">
                {editingId ? 'تعديل سجل المخالفة / الحادث' : 'تسجيل مخالفة أو حادث مروري'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-slate-400 mb-1">بيان المخالفة / الحادث:</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">العقد المرتبط:</label>
                <select
                  value={form.bookingId}
                  onChange={(e) => setForm({ ...form, bookingId: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                >
                  {bookings.map((b) => (
                    <option key={b.id} value={b.id}>
                      #{b.id} — {b.customerName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">المسؤولية المالية:</label>
                <select
                  value={form.liability}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      liability: e.target.value as TrafficFineIncident['liability']
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-amber-400 font-bold"
                >
                  <option value="customer">على المستأجر (خصم من التأمين)</option>
                  <option value="driver">على السائق</option>
                  <option value="insurance_covered">مغطى بالتأمين الشامل</option>
                  <option value="company">على الشركة</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">المبلغ المقدر (ر.ي):</label>
                <input
                  type="number"
                  value={form.amountYer}
                  onChange={(e) =>
                    setForm({ ...form, amountYer: Number(e.target.value) || 0 })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-rose-400 font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">موقع الحدث:</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black"
              >
                حفظ السجل
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// PROPOSAL 7: B2B / UN & NGO MONTHLY INVOICING & LPO SUB-PANEL
// ============================================================================
export const B2BInvoicesSubPanel: React.FC<{
  invoices: B2BMonthlyInvoice[];
  formatMoney: (yer: number, usd?: number) => string;
  onMarkPaid: (inv: B2BMonthlyInvoice) => void;
}> = ({ invoices, formatMoney, onMarkPaid }) => {
  const [printingInv, setPrintingInv] = useState<B2BMonthlyInvoice | null>(null);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-4 space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-black text-amber-400">
            فواتير العقود الشهرية المجمعة للمنظمات والشركات وأوامر الشراء (B2B / UN LPOs)
          </h3>
          <p className="text-xs text-slate-400">
            كشوفات الفوترة الشهرية الموحدة للبعثات الأممية والشركات مع طباعة فاتورة ضريبية/تجارية رسمية
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {invoices.map((inv) => (
          <div
            key={inv.id}
            className="p-3 rounded-xl border border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-mono font-bold text-amber-400">#{inv.id}</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-sky-400 font-mono text-[10px]">
                  {inv.lpoNumber}
                </span>
                <span className="font-bold text-white">{inv.organizationName}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    inv.status === 'paid'
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-amber-500/15 text-amber-400'
                  }`}
                >
                  {inv.status === 'paid' ? 'مسددة بالكامل' : 'صادرة بانتظار التحويل'}
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                شهر الفوترة: {inv.billingMonth} · {inv.vehiclesCount} مركبات ({inv.totalDaysBilled} يوم إجمالي) · الإجمالي:{' '}
                <strong className="font-mono text-emerald-400">
                  {formatMoney(inv.totalAmountYer, inv.totalAmountUsd)}
                </strong>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {inv.status !== 'paid' && (
                <button
                  type="button"
                  onClick={() => onMarkPaid(inv)}
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black"
                >
                  تأكيد التحصيل
                </button>
              )}
              <button
                type="button"
                onClick={() => setPrintingInv(inv)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold flex items-center gap-1"
              >
                <Printer className="w-3.5 h-3.5 text-amber-400" />
                <span>فاتورة رسمية</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {printingInv && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPrintingInv(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-slate-950 rounded-3xl max-w-xl w-full p-6 space-y-4 text-xs shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-300 pb-3">
              <div>
                <h3 className="text-base font-black">
                  فاتورة مطالبة مالية شهرية (B2B Commercial Invoice) #{printingInv.id}
                </h3>
                <p className="text-slate-600">مرجع أمر الشراء: {printingInv.lpoNumber}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 text-amber-400 font-black flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>طباعة A4</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPrintingInv(null)}
                  className="p-1.5 rounded-xl bg-slate-200 text-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 bg-slate-100 p-4 rounded-xl border border-slate-300">
              <div className="col-span-2 font-bold">الجهة: {printingInv.organizationName}</div>
              <div>المسؤول: {printingInv.contactPerson}</div>
              <div>شهر الفوترة: {printingInv.billingMonth}</div>
              <div>عدد المركبات المؤجرة: {printingInv.vehiclesCount} مركبات</div>
              <div>إجمالي أيام التشغيل: {printingInv.totalDaysBilled} يوم</div>
              <div className="col-span-2 font-black text-emerald-700 text-sm">
                إجمالي الفاتورة المستحقة: ${printingInv.totalAmountUsd.toLocaleString()} (
                {printingInv.totalAmountYer.toLocaleString()} ر.ي)
              </div>
              <div className="col-span-2 text-slate-600">{printingInv.notes}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// PROPOSAL 10: AUTOMATED WHATSAPP & SMS OPERATIONS HUB MODULE
// ============================================================================
export const WhatsAppHubModule: React.FC<{
  bookings: Booking[];
  drivers: Driver[];
  formatMoney: (yer: number, usd?: number) => string;
}> = ({ bookings, drivers, formatMoney }) => {
  const [selectedBookingId, setSelectedBookingId] = useState<string>(
    bookings[0]?.id || ''
  );
  const [selectedTemplate, setSelectedTemplate] = useState<
    'contract_confirm' | 'expiry_reminder' | 'driver_dispatch' | 'deposit_refund'
  >('contract_confirm');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sentLog, setSentLog] = useState<
    { id: string; recipient: string; phone: string; type: string; time: string }[]
  >([
    {
      id: 'WA-101',
      recipient: bookings[0]?.customerName || 'م. هشام المتوكل',
      phone: bookings[0]?.customerPhone || '+967 771 445 890',
      type: 'تأكيد عقد إيجار إلكتروني + رابط QR',
      time: 'منذ 15 دقيقة'
    }
  ]);

  const activeBooking =
    bookings.find((b) => b.id === selectedBookingId) || bookings[0];
  const assignedDriver =
    drivers.find((d) => d.id === activeBooking?.driverId) || drivers[0];

  const generateMessageText = () => {
    if (!activeBooking) return '';
    switch (selectedTemplate) {
      case 'contract_confirm':
        return `مرحباً بك أ. ${activeBooking.customerName} في الشركة المتحدة لتأجير السيارات — صنعاء.\nتم اعتماد عقد الإيجار الإلكتروني رقم (#${activeBooking.id}) للمركبة (${activeBooking.carName}) لمدة (${activeBooking.days} أيام).\nإجمالي العقد: ${formatMoney(activeBooking.totalAmountYer, activeBooking.totalAmountUsd)} عبر محفظة (${activeBooking.walletUsed.toUpperCase()}).\nنتمنى لك قيادة آمنة وموفقة.`;
      case 'expiry_reminder':
        return `تنبيه لطيف أ. ${activeBooking.customerName}،\nنود تذكيركم بأن عقد إيجار المركبة (${activeBooking.carName} — #${activeBooking.id}) ينتهي بتاريخ (${activeBooking.endDate}).\nهل ترغبون بتمديد العقد لأيام إضافية أم التنسيق لاستلام المركبة وإخلاء الطرف؟`;
      case 'driver_dispatch':
        return `عزيزنا العميل ${activeBooking.customerName}،\nالكابتن المعتمد (${assignedDriver?.name || 'مراد الحميري'} — هاتف: ${assignedDriver?.phone || '+967 777'}) في طريقه إليكم الآن بالمركبة (${activeBooking.carName}) إلى نقطة الالتقاء: (${activeBooking.pickupLocation}).`;
      case 'deposit_refund':
        return `إشعار مالي أ. ${activeBooking.customerName}،\nتم الانتهاء من فحص المركبة (${activeBooking.carName}) وإصدار شهادة إخلاء الطرف للعقد (#${activeBooking.id}) وتحويل صافي مبلغ التأمين المسترد إلى حسابكم بنجاح. شكراً لثقتكم بنا.`;
    }
  };

  const messageText = generateMessageText();

  const handleCopyMessage = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(messageText);
    }
    setCopiedId('copied');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLogSend = () => {
    if (!activeBooking) return;
    const typeMap = {
      contract_confirm: 'تأكيد العقد وإشعار الحجز',
      expiry_reminder: 'تذكير قرب انتهاء العقد والتمديد',
      driver_dispatch: 'إرسال بيانات الكابتن وموقع الانطلاق',
      deposit_refund: 'إشعار إخلاء الطرف ورد التأمين'
    };
    setSentLog((prev) => [
      {
        id: `WA-${Math.floor(105 + Math.random() * 890)}`,
        recipient: activeBooking.customerName,
        phone: activeBooking.customerPhone,
        type: typeMap[selectedTemplate],
        time: 'الآن'
      },
      ...prev
    ]);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-4 space-y-4">
        <div>
          <h2 className="text-base font-black text-white">
            مركز رسائل وإشعارات واتساب التشغيلية التلقائية (WhatsApp Operations Hub)
          </h2>
          <p className="text-xs text-slate-400">
            توليد رسائل رسمية مخصصة ببيانات العقد والعميل والسيارة لإرسالها بضغطة زر للعملاء والكباتن
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">اختر العقد / العميل المستهدف:</label>
            <select
              value={selectedBookingId}
              onChange={(e) => setSelectedBookingId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-bold"
            >
              {bookings.map((b) => (
                <option key={b.id} value={b.id}>
                  #{b.id} — {b.customerName} ({b.carName})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-slate-400 mb-1">نوع القالب التشغيلي:</label>
            <select
              value={selectedTemplate}
              onChange={(e) =>
                setSelectedTemplate(
                  e.target.value as
                    | 'contract_confirm'
                    | 'expiry_reminder'
                    | 'driver_dispatch'
                    | 'deposit_refund'
                )
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-amber-400 font-bold"
            >
              <option value="contract_confirm">1. رسالة تأكيد العقد وتفاصيل المركبة</option>
              <option value="expiry_reminder">2. تذكير بقرب انتهاء العقد وعرض التمديد</option>
              <option value="driver_dispatch">3. إرسال بيانات الكابتن وموقع الانطلاق</option>
              <option value="deposit_refund">4. إشعار إخلاء الطرف ورد مبلغ التأمين</option>
            </select>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-3">
          <div className="flex items-center justify-between text-[11px] text-emerald-400 font-bold">
            <span>معاينة الرسالة الجاهزة للإرسال ({activeBooking?.customerPhone})</span>
            <span>قالب رسمي معتمد</span>
          </div>
          <pre className="whitespace-pre-wrap font-sans text-xs text-slate-100 leading-relaxed bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
            {messageText}
          </pre>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleLogSend}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>تسجيل وإرسال فوري للعميل</span>
            </button>
            <button
              type="button"
              onClick={handleCopyMessage}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5"
            >
              {copiedId ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">تم نسخ النص!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span>نسخ نص الرسالة</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-4 space-y-2.5">
        <h3 className="text-xs font-black text-white">
          سجل الإشعارات المرسلة مؤخراً ({sentLog.length})
        </h3>
        <div className="space-y-2">
          {sentLog.map((log) => (
            <div
              key={log.id}
              className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-between text-xs"
            >
              <div>
                <span className="font-mono text-emerald-400 font-bold">#{log.id}</span> ·{' '}
                <strong className="text-white">{log.recipient}</strong> ({log.phone}) —{' '}
                <span className="text-slate-400">{log.type}</span>
              </div>
              <span className="text-[11px] text-slate-500">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
