import React, { useState, useEffect } from 'react';
import { Booking } from '../../types';
import { Navigation, Compass, ShieldCheck, MapPin, Phone, MessageSquare, Play, Pause, FastForward, CheckCircle2, Clock } from 'lucide-react';

interface TripMapTrackerProps {
  booking: Booking;
  onUpdateBooking?: (updated: Booking) => void;
  lang?: 'ar' | 'en';
}

export const TripMapTracker: React.FC<TripMapTrackerProps> = ({ booking, onUpdateBooking, lang = 'ar' }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(booking.tripProgressPct || 45);
  const [speed, setSpeed] = useState<number>(booking.currentSpeedKmh || 78);
  const [mapMode, setMapMode] = useState<'standard' | 'topography'>('standard');

  const isAr = lang === 'ar';

  // Smooth live simulation of travel
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        const next = Math.min(100, prev + 0.5);
        // Vary speed slightly for realism
        const nextSpeed = Math.floor(70 + Math.sin(next / 5) * 18);
        setSpeed(nextSpeed);
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Sync to parent if provided
  useEffect(() => {
    if (onUpdateBooking && Math.abs(progress - booking.tripProgressPct) > 2) {
      const activeIdx = Math.min(
        booking.checkpoints.length - 1,
        Math.floor((progress / 100) * booking.checkpoints.length)
      );
      onUpdateBooking({
        ...booking,
        tripProgressPct: Math.round(progress),
        currentSpeedKmh: speed,
        currentCheckpointIndex: activeIdx
      });
    }
  }, [progress, speed]);

  // Calculate coordinates along a natural Yemeni mountain curved path
  // SVG viewBox is 0 0 800 360
  // Path starts at Sanaa (top left/center: 180, 50) -> through Yasleh (230, 110) -> Samarah (320, 170) -> Ibb (420, 220) -> Taiz/Dhalea (540, 270) -> Aden (710, 310)
  const pathD = "M 120 70 Q 220 100 280 140 T 430 200 T 580 250 T 720 290";

  // Approximate parametric interpolation for the car position
  const t = progress / 100;
  // Cubic Bezier interpolation
  const carX = (1 - t) * (1 - t) * 120 + 2 * (1 - t) * t * 350 + t * t * 720;
  const carY = (1 - t) * (1 - t) * 70 + 2 * (1 - t) * t * 190 + t * t * 290;

  const currentCpIndex = Math.min(
    booking.checkpoints.length - 1,
    Math.floor(t * booking.checkpoints.length)
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Top telemetry control bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Navigation className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>{isAr ? 'نظام التتبع الساتلي المباشر' : 'Live Satellite GPS Telemetry'}</span>
              <span>·</span>
              <span className="text-emerald-400 font-medium">
                {progress >= 100 ? (isAr ? 'تم الوصول للوجهة' : 'Arrived') : (isAr ? 'المركبة في حركة نشطة' : 'Vehicle in Motion')}
              </span>
            </div>
            <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <span>{booking.carName}</span>
              <span className="text-xs text-amber-400 font-mono">[{booking.id}]</span>
            </h4>
          </div>
        </div>

        {/* Action affordances: simulation speed & map styles */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-800/80 p-1 rounded-lg border border-slate-700/60">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-2.5 py-1 text-xs font-medium rounded text-slate-300 hover:text-white hover:bg-slate-700 transition flex items-center gap-1.5"
              title={isPlaying ? (isAr ? 'إيقاف مؤقت' : 'Pause') : (isAr ? 'تشغيل' : 'Play')}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{isPlaying ? (isAr ? 'إيقاف' : 'Pause') : (isAr ? 'متابعة' : 'Resume')}</span>
            </button>
            <button
              onClick={() => setProgress((p) => Math.min(100, p + 15))}
              className="px-2 py-1 text-xs font-medium rounded text-slate-300 hover:text-white hover:bg-slate-700 transition flex items-center gap-1"
              title={isAr ? 'تسريع المحاكاة' : 'Fast-forward'}
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>+15%</span>
            </button>
          </div>

          <button
            onClick={() => setMapMode(mapMode === 'standard' ? 'topography' : 'standard')}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white transition flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>{mapMode === 'standard' ? (isAr ? 'خريطة التضاريس' : 'Terrain View') : (isAr ? 'الخريطة التنفيذية' : 'Executive View')}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Map Canvas */}
      <div className="dark-media-card relative w-full h-80 sm:h-96 bg-[#0a0f1d] overflow-hidden select-none">
        {/* Subtle grid pattern background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Topography mountain contours simulation */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 360" preserveAspectRatio="none">
          <defs>
            <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Contour elevation curves for Yemen highlands */}
          <path d="M 50 180 Q 200 120 400 180 T 750 140" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M 80 240 Q 250 190 500 250 T 780 220" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="6 6" />

          {/* Planned Highway Route */}
          <path
            d={pathD}
            fill="none"
            stroke="#1e293b"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d={pathD}
            fill="none"
            stroke="#334155"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Active traversed path */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#roadGradient)"
            strokeWidth="4"
            strokeDasharray="800"
            strokeDashoffset={800 - (progress / 100) * 800}
            strokeLinecap="round"
            filter="url(#glow)"
          />

          {/* Checkpoints along the road */}
          {booking.checkpoints.map((cp, idx) => {
            const cpT = (idx + 0.5) / booking.checkpoints.length;
            const x = (1 - cpT) * (1 - cpT) * 120 + 2 * (1 - cpT) * cpT * 350 + cpT * cpT * 720;
            const y = (1 - cpT) * (1 - cpT) * 70 + 2 * (1 - cpT) * cpT * 190 + cpT * cpT * 290;
            const isPassed = idx < currentCpIndex;
            const isCurrent = idx === currentCpIndex;

            return (
              <g key={cp.id} className="cursor-pointer transition-transform hover:scale-110">
                <circle
                  cx={x}
                  cy={y}
                  r={isCurrent ? "12" : "8"}
                  fill={isCurrent ? "#f59e0b" : isPassed ? "#10b981" : "#1e293b"}
                  stroke={isCurrent ? "#ffffff" : isPassed ? "#34d399" : "#475569"}
                  strokeWidth="2"
                  className={isCurrent ? "animate-pulse" : ""}
                />
                {isPassed && (
                  <circle cx={x} cy={y} r="3" fill="#ffffff" />
                )}
                {/* Checkpoint label */}
                <text
                  x={x}
                  y={y - 16}
                  textAnchor="middle"
                  fill={isCurrent ? "#fde68a" : isPassed ? "#a7f3d0" : "#94a3b8"}
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="Cairo, sans-serif"
                >
                  {isAr ? cp.name : cp.nameEn}
                </text>
              </g>
            );
          })}

          {/* Moving Vehicle Marker */}
          <g transform={`translate(${carX}, ${carY})`}>
            {/* Pulsing radar wave */}
            <circle cx="0" cy="0" r="26" fill="rgba(245, 158, 11, 0.15)" className="animate-ping" />
            <circle cx="0" cy="0" r="14" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="5" fill="#f59e0b" />
          </g>
        </svg>

        {/* Start (Sana'a) Badge */}
        <div className="absolute top-4 left-6 flex items-center gap-2 bg-slate-950/90 border border-slate-700/80 px-3 py-1.5 rounded-lg backdrop-blur">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <div className="text-xs">
            <span className="text-slate-400 block">{isAr ? 'نقطة الانطلاق' : 'Origin'}</span>
            <span className="font-bold text-slate-100">{booking.pickupLocation || (isAr ? 'صنعاء - حدة' : 'Sanaa - Hadda')}</span>
          </div>
        </div>

        {/* Destination Badge */}
        <div className="absolute bottom-4 right-6 flex items-center gap-2 bg-slate-950/90 border border-emerald-500/40 px-3 py-1.5 rounded-lg backdrop-blur">
          <MapPin className="w-4 h-4 text-emerald-400" />
          <div className="text-xs">
            <span className="text-slate-400 block">{isAr ? 'نقطة الوصول' : 'Destination'}</span>
            <span className="font-bold text-emerald-300">{booking.destination || (isAr ? 'عدن - المعلا' : 'Aden')}</span>
          </div>
        </div>

        {/* Floating Telemetry HUD */}
        <div className="absolute top-4 right-6 flex items-center gap-3">
          {/* Speedometer */}
          <div className="bg-slate-950/90 border border-slate-700/80 px-3 py-2 rounded-lg backdrop-blur text-right">
            <div className="text-[10px] text-slate-400">{isAr ? 'السرعة الآن' : 'Speed'}</div>
            <div className="text-lg font-bold font-mono tabular-nums text-amber-400">
              {progress >= 100 ? '0' : speed} <span className="text-xs font-normal text-slate-400">كم/س</span>
            </div>
          </div>

          {/* ETA Display */}
          <div className="bg-slate-950/90 border border-slate-700/80 px-3 py-2 rounded-lg backdrop-blur text-right">
            <div className="text-[10px] text-slate-400">{isAr ? 'الوصول المتوقع (ETA)' : 'ETA'}</div>
            <div className="text-lg font-bold font-mono tabular-nums text-slate-100 flex items-center gap-1">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>{Math.max(0, Math.round(booking.etaMinutes * (1 - progress / 100)))} دقيقة</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Driver & Checkpoint Milestone Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-slate-800 bg-slate-950/90 border-t border-slate-800 p-4">
        {/* Driver identity & instant contact */}
        <div className="flex items-center justify-between pb-3 md:pb-0 md:pe-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-amber-500/50 flex items-center justify-center overflow-hidden">
              <span className="text-base font-bold text-amber-400">كابتن</span>
            </div>
            <div>
              <div className="text-xs text-slate-400">{isAr ? 'السائق المعتمد' : 'Assigned Chauffeur'}</div>
              <h5 className="text-sm font-bold text-slate-100">{booking.driverName || (isAr ? 'الكابتن / وضاح الحاشدي' : 'Capt. Waddah')}</h5>
              <div className="text-xs text-slate-400 font-mono">{booking.driverPhone || '+967 771 234 567'}</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <a
              href={`tel:${booking.driverPhone || '+967771234567'}`}
              className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 transition"
              title={isAr ? 'اتصال مباشر بالسائق' : 'Call Chauffeur'}
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/967771234567?text=مرحبا كابتن، بخصوص حجز السيارة رقم ${booking.id}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30 transition"
              title={isAr ? 'مراسلة واتساب' : 'WhatsApp'}
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Current Checkpoint Status */}
        <div className="py-3 md:py-0 md:px-4">
          <div className="text-xs text-slate-400 mb-1 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>{isAr ? 'المرحلة الحالية من الرحلة' : 'Current Checkpoint'}</span>
          </div>
          <div className="text-sm font-semibold text-slate-200">
            {booking.checkpoints[currentCpIndex]?.name || (isAr ? 'الطريق السريع بين المحافظات' : 'Inter-governorate Route')}
          </div>
          <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
            <span>{isAr ? 'تقدير العبور' : 'Estimated transit'}: {booking.checkpoints[currentCpIndex]?.timeEstimate || '11:45 AM'}</span>
            <span>·</span>
            <span className="text-emerald-400 font-mono tabular-nums">{Math.round(progress)}% {isAr ? 'مكتمل' : 'completed'}</span>
          </div>
        </div>

        {/* Legal Guarantee & Security Protocol Clearance */}
        <div className="pt-3 md:pt-0 md:ps-4 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{isAr ? 'الضمانة القانونية مصدقة وتصريح السفر ساري' : 'Legal Guarantee & Road Clearance Active'}</span>
          </div>
          <p className="text-xs text-slate-400 mt-1 line-clamp-1">
            {booking.guaranteeDetails || (isAr ? 'كفالة تجارية معتمدة لدى الغرفة التجارية' : 'Commercial Guarantor Authenticated')}
          </p>
        </div>
      </div>
    </div>
  );
};
