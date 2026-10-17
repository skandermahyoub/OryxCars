import React, { useState } from 'react';
import { Language, Currency, UserRole } from '../../types';
import { AppViewMode } from '../Header';
import { DEFAULT_LOGO_IMAGE } from '../../data/defaultCmsData';
import {
  Home,
  Search,
  ShoppingBag,
  Calendar,
  Bell,
  BarChart2,
  Settings,
  HeartHandshake,
  LogOut,
  Sun,
  Moon,
  Globe,
  Car as CarIcon,
  UserCheck,
  Sparkles,
  Phone,
  PanelLeftClose,
  PanelLeftOpen,
  Shield
} from 'lucide-react';

interface CurvedEdgeControlBarProps {
  themeMode: 'dark' | 'light';
  onToggleTheme: () => void;
  lang: Language;
  onToggleLang: () => void;
  currency: Currency;
  onToggleCurrency: () => void;
  onOpenCmsEditor: () => void;
}

/**
 * 1. Flush Screen-Edge Curved Widget (Inspired by Reference Image 1)
 * Features liquid S-curve SVG top/bottom fillets, circular progress rings,
 * Dark/Light mode toggle, Language switcher, and bottom circular Settings gear.
 */
export const CurvedEdgeControlBar: React.FC<CurvedEdgeControlBarProps> = ({
  themeMode,
  onToggleTheme,
  lang,
  onToggleLang,
  currency,
  onToggleCurrency,
  onOpenCmsEditor
}) => {
  const isDark = themeMode === 'dark';
  const isAr = lang === 'ar';

  return (
    <div
      className="dark-media-card fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-start select-none"
      dir="ltr"
    >
      {/* Main Flush Curved Capsule - Compact & Sleek */}
      <div
        className={`relative w-[40px] py-2.5 flex flex-col items-center gap-2.5 rounded-r-[20px] border-y border-r transition-colors ${
          isDark
            ? 'bg-[#0e0e11] text-white border-white/10 shadow-[4px_0_20px_rgba(0,0,0,0.55)]'
            : 'bg-[#0e0e11] text-white border-slate-700/60 shadow-[4px_0_16px_rgba(15,23,42,0.18)]'
        }`}
      >

        {/* Ring 1: Dark / Light Mode Toggle with Glowing Orange/Amber Arc */}
        <button
          type="button"
          onClick={onToggleTheme}
          title={isAr ? (isDark ? 'الوضع الفاتح' : 'الوضع الداكن') : 'Toggle Theme'}
          className="group flex flex-col items-center focus:outline-none"
        >
          <div className="relative w-7 h-7 flex items-center justify-center">
            <svg className="w-7 h-7 -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="#27272a"
                strokeWidth="2.5"
              />
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke={isDark ? '#f97316' : '#f59e0b'}
                strokeWidth="2.5"
                strokeDasharray="94"
                strokeDashoffset={isDark ? '24' : '10'}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              {isDark ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-orange-400" />
              )}
            </div>
          </div>
          <span className="text-[8px] font-mono font-bold text-zinc-300 mt-0.5 tracking-tight leading-none">
            {isDark ? (isAr ? 'داكن' : 'Dark') : (isAr ? 'فاتح' : 'Light')}
          </span>
        </button>

        {/* Ring 2: Language Switcher (AR / EN) with Glowing Emerald Arc */}
        <button
          type="button"
          onClick={onToggleLang}
          title={isAr ? 'تبديل اللغة (AR / EN)' : 'Switch Language'}
          className="group flex flex-col items-center focus:outline-none"
        >
          <div className="relative w-7 h-7 flex items-center justify-center">
            <svg className="w-7 h-7 -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="#27272a"
                strokeWidth="2.5"
              />
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeDasharray="94"
                strokeDashoffset={isAr ? '28' : '50'}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>
          <span className="text-[8px] font-mono font-bold text-zinc-300 mt-0.5 leading-none">
            {isAr ? 'عربي' : 'ENG'}
          </span>
        </button>

        {/* Ring 3: Currency Switcher (YER / USD) with Glowing Yellow/Gold Arc */}
        <button
          type="button"
          onClick={onToggleCurrency}
          title={isAr ? 'تبديل العملة (ريال / دولار)' : 'Switch Currency'}
          className="group flex flex-col items-center focus:outline-none"
        >
          <div className="relative w-7 h-7 flex items-center justify-center">
            <svg className="w-7 h-7 -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="#27272a"
                strokeWidth="2.5"
              />
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="#eab308"
                strokeWidth="2.5"
                strokeDasharray="94"
                strokeDashoffset={currency === 'YER' ? '38' : '18'}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-black text-yellow-400 group-hover:scale-110 transition-transform">
              {currency === 'YER' ? 'ر.ي' : '$'}
            </div>
          </div>
          <span className="text-[8px] font-mono font-bold text-zinc-300 mt-0.5 leading-none">
            {currency}
          </span>
        </button>
      </div>

      {/* Detached Circular Settings Button Below Capsule */}
      <button
        type="button"
        onClick={onOpenCmsEditor}
        title={isAr ? 'إعدادات وتخصيص الصفحة (CMS)' : 'CMS Settings'}
        className="mt-2 ml-1 w-8 h-8 rounded-full bg-[#0e0e11] text-white border border-white/15 shadow-xl flex items-center justify-center hover:border-amber-400 hover:text-amber-400 transition group"
      >
        <Settings className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-300" />
      </button>
    </div>
  );
};

interface FloatingSidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: AppViewMode;
  onChangeView: (view: AppViewMode) => void;
  onOpenBooking: () => void;
  onOpenConcierge: () => void;
  themeMode: 'dark' | 'light';
  companyName: string;
  logoUrl?: string;
  lang: Language;
}

/**
 * 2. Ultra-Clean Floating Pill Sidebar Menu (Inspired by Reference Image 2 @theveberr)
 * Supports both Expanded Card & Slim Icon Rail side-by-side or toggleable,
 * with high-contrast active pill and Light/Dark adaptation.
 */
export const FloatingSidebarMenu: React.FC<FloatingSidebarMenuProps> = ({
  isOpen,
  onClose,
  currentView,
  onChangeView,
  onOpenBooking,
  onOpenConcierge,
  themeMode,
  companyName,
  logoUrl,
  lang
}) => {
  const [isCompact, setIsCompact] = useState(false);
  const [activeNavId, setActiveNavId] = useState<string>(
    currentView === 'landing' ? 'shop' : currentView
  );

  if (!isOpen) return null;

  const isDark = themeMode === 'dark';
  const isAr = lang === 'ar';
  const effectiveLogo = logoUrl || DEFAULT_LOGO_IMAGE;

  const mainItems = [
    {
      id: 'home',
      icon: Home,
      label: isAr ? 'الرئيسية' : 'Home',
      onClick: () => {
        setActiveNavId('home');
        onChangeView('landing');
        onClose();
      }
    },
    {
      id: 'notifications',
      icon: Shield,
      label: isAr ? 'لوحة التحكم والأنظمة' : 'Control Panel & ERP',
      onClick: () => {
        setActiveNavId('notifications');
        onChangeView('admin');
        onClose();
      }
    },
    {
      id: 'search',
      icon: Search,
      label: isAr ? 'بوابة العميل وعقود الإيجار' : 'Client Portal & Contracts',
      onClick: () => {
        setActiveNavId('search');
        onChangeView('customer');
        onClose();
      }
    },
    {
      id: 'shop',
      icon: ShoppingBag,
      label: isAr ? 'حجز سيارة وتوصيل مباشر' : 'Direct Car Booking',
      onClick: () => {
        setActiveNavId('shop');
        onOpenBooking();
        onClose();
      }
    },
    {
      id: 'calendar',
      icon: Calendar,
      label: isAr ? 'بوابة السائق والتسليم الميداني' : 'Chauffeur & Handover App',
      onClick: () => {
        setActiveNavId('calendar');
        onChangeView('driver');
        onClose();
      }
    },
    {
      id: 'analytics',
      icon: BarChart2,
      label: isAr ? 'دليل خدمات تأجير السيارات' : 'Car Rental Services',
      onClick: () => {
        setActiveNavId('analytics');
        onChangeView('landing');
        onClose();
        setTimeout(() => {
          document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  ];

  const bottomItems = [
    {
      id: 'settings',
      icon: Settings,
      label: isAr ? 'إعدادات الموقع' : 'CMS Settings',
      onClick: () => {
        setActiveNavId('settings');
        onChangeView('cms_builder');
        onClose();
      }
    },
    {
      id: 'support',
      icon: HeartHandshake,
      label: isAr ? 'تحدث معنا!' : 'Support us!',
      onClick: () => {
        onOpenConcierge();
        onClose();
      }
    }
  ];

  // Surface & Text classes matching Reference Image 2
  const panelSurface = isDark
    ? 'bg-[#18181b] text-[#f4f4f5] border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.75)]'
    : 'bg-[#f4f4f6] text-[#18181b] border-black/10 shadow-[0_25px_70px_rgba(0,0,0,0.22)]';

  const activePillClass = isDark
    ? 'bg-[#f4f4f5] text-[#18181b] font-black shadow-md'
    : 'bg-[#1c1c1e] text-[#ffffff] font-black shadow-md';

  const inactiveItemClass = isDark
    ? 'text-zinc-300 hover:bg-white/5 hover:text-white'
    : 'text-zinc-700 hover:bg-black/5 hover:text-black';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-start p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Floating Rounded Pill Sidebar Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`h-[90vh] max-h-[740px] rounded-[30px] border p-3.5 flex flex-col justify-between transition-all duration-300 ${panelSurface} ${
          isCompact ? 'w-[74px] items-center' : 'w-[250px]'
        }`}
      >
        {/* Top Section: Profile Header + Main Nav */}
        <div className="space-y-6 w-full">
          {/* Profile Row */}
          <div
            className={`flex items-center ${
              isCompact ? 'justify-center' : 'justify-between px-2'
            } pt-1`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={effectiveLogo}
                alt={companyName}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border-2 border-current/20 shrink-0"
              />
              {!isCompact && (
                <div className="min-w-0 leading-tight">
                  <div className="text-sm font-black truncate">
                    {isAr ? 'المتحدة لتأجير السيارات' : 'United Car Rental'}
                  </div>
                  <div
                    className={`text-[11px] truncate ${
                      isDark ? 'text-zinc-400' : 'text-zinc-500'
                    }`}
                  >
                    @united_rental_ye
                  </div>
                </div>
              )}
            </div>

            {!isCompact && (
              <button
                type="button"
                onClick={() => setIsCompact(true)}
                title={isAr ? 'تصغير للأيقونات فقط' : 'Compact Icon Mode'}
                className={`p-1.5 rounded-xl transition ${
                  isDark ? 'hover:bg-white/10 text-zinc-400' : 'hover:bg-black/10 text-zinc-500'
                }`}
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            )}
          </div>

          {isCompact && (
            <button
              type="button"
              onClick={() => setIsCompact(false)}
              title={isAr ? 'توسيع القائمة' : 'Expand Menu'}
              className={`w-full py-1.5 rounded-xl flex items-center justify-center transition ${
                isDark ? 'hover:bg-white/10 text-zinc-400' : 'hover:bg-black/10 text-zinc-500'
              }`}
            >
              <PanelLeftOpen className="w-4 h-4" />
            </button>
          )}

          {/* Main Navigation List */}
          <nav className="space-y-1.5 w-full">
            {mainItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeNavId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.onClick}
                  title={item.label}
                  className={`w-full h-12 rounded-[18px] flex items-center transition-all duration-200 ${
                    isCompact ? 'justify-center px-0' : 'px-4 gap-3.5'
                  } ${isActive ? activePillClass : inactiveItemClass}`}
                >
                  <IconComp className="w-5 h-5 shrink-0 stroke-[2]" />
                  {!isCompact && <span className="text-xs font-bold truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Settings, Support & Red Log Out / Close */}
        <div
          className={`space-y-1.5 w-full pt-4 border-t ${
            isDark ? 'border-white/10' : 'border-black/10'
          }`}
        >
          {bottomItems.map((item) => {
            const IconComp = item.icon;
            const isActive = activeNavId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={item.onClick}
                title={item.label}
                className={`w-full h-11 rounded-[16px] flex items-center transition-all ${
                  isCompact ? 'justify-center px-0' : 'px-4 gap-3.5'
                } ${isActive ? activePillClass : inactiveItemClass}`}
              >
                <IconComp className="w-5 h-5 shrink-0 stroke-[1.8]" />
                {!isCompact && <span className="text-xs font-bold truncate">{item.label}</span>}
              </button>
            );
          })}

          {/* Coral Red Exit / Close Row (Exactly matching Reference Image 2) */}
          <button
            type="button"
            onClick={onClose}
            title={isAr ? 'إغلاق القائمة' : 'Close Menu'}
            className={`w-full h-11 rounded-[16px] flex items-center text-rose-500 hover:bg-rose-500/10 transition-all ${
              isCompact ? 'justify-center px-0' : 'px-4 gap-3.5'
            }`}
          >
            <LogOut className="w-5 h-5 shrink-0 stroke-[2]" />
            {!isCompact && (
              <span className="text-xs font-bold truncate">
                {isAr ? 'إغلاق القائمة' : 'Close menu'}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

interface IconOnlyBottomDockProps {
  themeMode: 'dark' | 'light';
  accentBg: string;
  accentText: string;
  onOpenBookingModal: () => void;
  onSwitchRole: (role: UserRole) => void;
  onOpenConcierge: () => void;
}

/**
 * 3. Sleek Icon-Only Bottom Floating Dock (Zero text labels as requested)
 */
export const IconOnlyBottomDock: React.FC<IconOnlyBottomDockProps> = ({
  themeMode,
  accentBg,
  accentText,
  onOpenBookingModal,
  onSwitchRole,
  onOpenConcierge
}) => {
  const isDark = themeMode === 'dark';

  return (
    <div className="fixed bottom-5 inset-x-0 z-40 px-4 flex justify-center pointer-events-none">
      <div
        className={`pointer-events-auto rounded-full px-3 py-2 shadow-2xl border backdrop-blur-xl flex items-center gap-2 sm:gap-3 ${
          isDark
            ? 'bg-slate-950/90 border-slate-800/90 text-slate-300'
            : 'bg-white/95 border-slate-200 text-slate-700 shadow-slate-900/10'
        }`}
      >
        {/* Home */}
        <a
          href="#"
          aria-label="Home"
          title="الرئيسية"
          className={`w-11 h-11 rounded-full flex items-center justify-center transition ${
            isDark ? 'hover:bg-slate-900' : 'hover:bg-slate-100'
          } ${accentText}`}
        >
          <Home className="w-5 h-5" />
        </a>

        {/* Services Catalog */}
        <a
          href="#services-section"
          aria-label="Services"
          title="كاتلوج الخدمات"
          className={`w-11 h-11 rounded-full flex items-center justify-center transition ${
            isDark ? 'hover:bg-slate-900 hover:text-white' : 'hover:bg-slate-100 hover:text-slate-950'
          }`}
        >
          <Sparkles className="w-5 h-5" />
        </a>

        {/* Center Highlighted Instant Booking Icon Button */}
        <button
          type="button"
          onClick={onOpenBookingModal}
          aria-label="Instant Booking"
          title="حجز سيارة فوري"
          className={`w-12 h-12 rounded-full ${accentBg} flex items-center justify-center shadow-lg transform hover:scale-105 active:scale-95 transition`}
        >
          <CarIcon className="w-5 h-5" />
        </button>

        {/* Fleet & Live GPS Tracking */}
        <button
          type="button"
          onClick={() => onSwitchRole('customer')}
          aria-label="Fleet and GPS"
          title="الأسطول والتتبع المباشر"
          className={`w-11 h-11 rounded-full flex items-center justify-center transition ${
            isDark ? 'hover:bg-slate-900 hover:text-white' : 'hover:bg-slate-100 hover:text-slate-950'
          }`}
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Direct Contact / Concierge */}
        <button
          type="button"
          onClick={onOpenConcierge}
          aria-label="Support"
          title="المستشار الذكي والتواصل"
          className={`w-11 h-11 rounded-full flex items-center justify-center transition ${
            isDark ? 'hover:bg-slate-900 hover:text-white' : 'hover:bg-slate-100 hover:text-slate-950'
          }`}
        >
          <Phone className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
