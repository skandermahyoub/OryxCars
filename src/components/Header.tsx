import React, { useState, useRef, useEffect } from 'react';
import { Language, Currency, AdminModuleId, AdminCategoryId, AdminAccessRole } from '../types';
import { DEFAULT_LOGO_IMAGE } from '../data/defaultCmsData';
import {
  ADMIN_NAVIGATION_CATEGORIES,
  findCategoryByModule,
  findModuleItem
} from '../data/adminNavigation';
import {
  Menu,
  ChevronDown,
  LayoutGrid,
  Shield,
  Home,
  X,
  BarChart3,
  FileCheck2,
  Car as CarIcon,
  Users,
  Wallet,
  Palette,
  Lock,
  UserCheck
} from 'lucide-react';
import {
  CurvedEdgeControlBar,
  FloatingSidebarMenu
} from './common/LuxuryNavigationUI';

export type AppViewMode = 'landing' | 'cms_builder' | 'customer' | 'driver' | 'admin';

interface HeaderProps {
  currentView: AppViewMode;
  onChangeView: (view: AppViewMode) => void;
  activeAdminModule?: AdminModuleId;
  onSelectAdminModule?: (moduleId: AdminModuleId) => void;
  adminAccessRole?: AdminAccessRole;
  onToggleAdminAccessRole?: () => void;
  lang: Language;
  onToggleLang: () => void;
  currency: Currency;
  onToggleCurrency: () => void;
  themeMode: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenConcierge: () => void;
  onOpenBooking: () => void;
  activeTripsCount: number;
  pendingOrdersCount?: number;
  clientsCount?: number;
  carsCount?: number;
  driversCount?: number;
  rfqsCount?: number;
  inspectionsCount?: number;
  maintenanceCount?: number;
  transactionsCount?: number;
  investorsCount?: number;
  finesCount?: number;
  pricingCount?: number;
  alertsCount?: number;
  companyName?: string;
  slogan?: string;
  logoUrl?: string;
  logoText?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onChangeView,
  activeAdminModule = 'overview',
  onSelectAdminModule,
  adminAccessRole = 'general_manager',
  onToggleAdminAccessRole,
  lang,
  onToggleLang,
  currency,
  onToggleCurrency,
  themeMode,
  onToggleTheme,
  onOpenConcierge,
  onOpenBooking,
  pendingOrdersCount = 0,
  clientsCount = 0,
  carsCount = 0,
  driversCount = 0,
  rfqsCount = 0,
  inspectionsCount = 0,
  maintenanceCount = 0,
  transactionsCount = 0,
  investorsCount = 0,
  finesCount = 0,
  pricingCount = 0,
  alertsCount = 0,
  companyName,
  slogan,
  logoUrl
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdownCat, setOpenDropdownCat] = useState<AdminCategoryId | null>(null);
  const [isCategorizedDrawerOpen, setIsCategorizedDrawerOpen] = useState(false);
  const [lockNotice, setLockNotice] = useState<string>('');
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  const isAr = lang === 'ar';
  const effectiveLogo = logoUrl || DEFAULT_LOGO_IMAGE;

  const activeCategory = findCategoryByModule(activeAdminModule);
  const activeModuleItem = findModuleItem(activeAdminModule);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(e.target as Node)
      ) {
        setOpenDropdownCat(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCountForKey = (key?: string): number | undefined => {
    switch (key) {
      case 'bookings':
        return pendingOrdersCount;
      case 'clients':
        return clientsCount;
      case 'cars':
        return carsCount;
      case 'drivers':
        return driversCount;
      case 'rfqs':
        return rfqsCount;
      case 'inspections':
        return inspectionsCount;
      case 'maintenance':
        return maintenanceCount;
      case 'transactions':
        return transactionsCount;
      case 'investors':
        return investorsCount;
      case 'fines':
        return finesCount;
      case 'pricing':
        return pricingCount;
      case 'alerts':
        return alertsCount;
      default:
        return undefined;
    }
  };

  const getCategoryIcon = (catId: AdminCategoryId) => {
    switch (catId) {
      case 'executive':
        return BarChart3;
      case 'operations':
        return FileCheck2;
      case 'assets':
        return CarIcon;
      case 'relations':
        return Users;
      case 'finance_cms':
        return Wallet;
    }
  };

  const handleChooseModule = (modId: AdminModuleId, managerOnly?: boolean) => {
    if (adminAccessRole === 'reception_staff' && managerOnly) {
      setLockNotice('🔒 هذا القسم مخصص للمدير العام فقط (مقفل عن موظف الاستقبال والحجوزات)');
      setTimeout(() => setLockNotice(''), 3500);
      return;
    }
    if (currentView !== 'admin') {
      onChangeView('admin');
    }
    if (onSelectAdminModule) {
      onSelectAdminModule(modId);
    }
    setOpenDropdownCat(null);
    setIsCategorizedDrawerOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/90 bg-slate-950/95 backdrop-blur-xl shadow-xl">
        {/* TOP HEADER ROW */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
          {/* Brand Identity (Logo Image + Company Name) */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => onChangeView('landing')}
              className="flex items-center gap-3 min-w-0 text-right group"
            >
              <img
                src={effectiveLogo}
                alt={companyName || 'Logo'}
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-2xl object-cover border border-amber-500/40 shrink-0 shadow-md"
              />
              <div className="min-w-0">
                <div className="font-heading text-sm sm:text-base font-bold text-white group-hover:text-amber-400 transition truncate leading-snug">
                  {companyName ||
                    (isAr
                      ? 'الشركة المتحدة لتأجير السيارات — صنعاء'
                      : 'United Car Rental - Sana’a')}
                </div>
                <div className="text-[11px] text-amber-300/80 font-normal tracking-wide truncate">
                  {currentView === 'admin'
                    ? `لوحة التحكم المصنّفة · ${activeCategory.titleAr}`
                    : slogan ||
                      (isAr
                        ? 'خدمات تأجير السيارات المعتمدة للمنظمات والأعمال والأفراد'
                        : 'Certified Car Rental Services')}
                </div>
              </div>
            </button>
          </div>

          {/* DEDICATED CATEGORIZED ADMIN MAIN MENU (Desktop Dropdown Bar) */}
          {currentView === 'admin' && (
            <nav
              ref={dropdownContainerRef}
              className="hidden xl:flex items-center gap-1.5 relative"
              aria-label="القائمة الرئيسية المصنفة للوحة التحكم"
            >
              {ADMIN_NAVIGATION_CATEGORIES.map((cat) => {
                const CatIcon = getCategoryIcon(cat.id);
                const isCatActive = activeCategory.id === cat.id;
                const isOpen = openDropdownCat === cat.id;

                return (
                  <div key={cat.id} className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdownCat((prev) => (prev === cat.id ? null : cat.id))
                      }
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                        isCatActive
                          ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-md'
                          : isOpen
                          ? 'bg-slate-800 text-white border-slate-700'
                          : 'bg-slate-900/90 text-slate-200 hover:bg-slate-800 border-slate-800'
                      }`}
                    >
                      <CatIcon className="w-3.5 h-3.5 shrink-0" />
                      <span>{cat.titleAr}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Categorized Dropdown Panel */}
                    {isOpen && (
                      <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-2.5 z-50 space-y-1.5">
                        <div className="px-2.5 py-1.5 border-b border-slate-800">
                          <div className="text-xs font-black text-amber-400">
                            {cat.titleAr}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {cat.subtitleAr}
                          </div>
                        </div>
                        <div className="space-y-1">
                          {cat.items.map((item) => {
                            const isItemActive = activeAdminModule === item.id;
                            const isLockedForStaff =
                              adminAccessRole === 'reception_staff' && item.managerOnly;
                            const count = getCountForKey(item.countKey);
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => handleChooseModule(item.id, item.managerOnly)}
                                className={`w-full p-2.5 rounded-xl text-right transition flex items-start justify-between gap-2 ${
                                  isLockedForStaff
                                    ? 'opacity-50 bg-slate-950/60 text-slate-500 cursor-not-allowed'
                                    : isItemActive
                                    ? 'bg-amber-500 text-slate-950 font-black'
                                    : 'hover:bg-slate-800 text-slate-200'
                                }`}
                              >
                                <div className="min-w-0 space-y-0.5">
                                  <div className="text-xs font-bold flex items-center gap-1.5 flex-wrap">
                                    <span>{item.labelAr}</span>
                                    {isLockedForStaff && (
                                      <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 text-[9px] font-bold">
                                        🔒 للمدير فقط
                                      </span>
                                    )}
                                    {item.proposalNumber && !isLockedForStaff && (
                                      <span
                                        className={`px-1.5 py-0.2 rounded text-[9px] font-mono ${
                                          isItemActive
                                            ? 'bg-slate-950 text-amber-400'
                                            : 'bg-amber-500/15 text-amber-400'
                                        }`}
                                      >
                                        ميزة #{item.proposalNumber}
                                      </span>
                                    )}
                                  </div>
                                  <div
                                    className={`text-[10px] leading-snug ${
                                      isItemActive ? 'text-slate-900' : 'text-slate-400'
                                    }`}
                                  >
                                    {item.descAr}
                                  </div>
                                </div>

                                {count !== undefined && (
                                  <span
                                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                                      isItemActive
                                        ? 'bg-slate-950/20 text-slate-950'
                                        : 'bg-slate-950 text-amber-400 border border-slate-800'
                                    }`}
                                  >
                                    {count}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          )}

          {/* RIGHT / END ACTIONS IN HEADER */}
          <div className="flex items-center gap-2 shrink-0">
            {currentView === 'admin' && (
              <>
                {/* 1-Click Unified Brand & Identity Studio Button */}
                <button
                  type="button"
                  onClick={() => handleChooseModule('agency_identity', true)}
                  title="تخصيص الشعار والاسم والسلوجون والألوان والواتساب في لوحة واحدة"
                  className={`hidden md:flex px-3 py-2.5 rounded-2xl border text-xs font-bold items-center gap-1.5 transition ${
                    activeAdminModule === 'agency_identity'
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                      : 'bg-slate-900 hover:bg-slate-800 border-amber-500/40 text-amber-300'
                  }`}
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>تخصيص الهوية</span>
                </button>

                {/* Role Lock Switcher (Manager vs Customer Service Receptionist) */}
                {onToggleAdminAccessRole && (
                  <button
                    type="button"
                    onClick={onToggleAdminAccessRole}
                    title="تبديل صلاحيات العرض بين المدير العام وموظف خدمة العملاء والحجوزات"
                    className={`hidden sm:flex px-3 py-2.5 rounded-2xl border text-xs font-bold items-center gap-1.5 transition ${
                      adminAccessRole === 'general_manager'
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25'
                        : 'bg-rose-500/15 border-rose-500/40 text-rose-300 hover:bg-rose-500/25'
                    }`}
                  >
                    {adminAccessRole === 'general_manager' ? (
                      <>
                        <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>وضع: المدير العام</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5 text-rose-400" />
                        <span>وضع: موظف الحجوزات</span>
                      </>
                    )}
                  </button>
                )}
              </>
            )}

            {/* Categorized Full Admin Menu Trigger */}
            {currentView === 'admin' ? (
              <button
                type="button"
                onClick={() => setIsCategorizedDrawerOpen(true)}
                className="px-3 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg transition"
              >
                <LayoutGrid className="w-4 h-4" />
                <span>فهرس الأقسام المصنّف</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onChangeView('admin')}
                className="px-3 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-400 font-bold text-xs flex items-center gap-1.5 transition"
              >
                <Shield className="w-4 h-4" />
                <span>لوحة التحكم</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onChangeView('landing')}
              title="العودة للصفحة الرئيسية"
              className="hidden sm:flex px-3 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-bold items-center gap-1.5 transition"
            >
              <Home className="w-4 h-4 text-amber-400" />
              <span>الرئيسية</span>
            </button>

            {/* Global Navigation Menu Trigger */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="w-11 h-11 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-amber-400 flex items-center justify-center transition shadow-lg shrink-0"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Role Restriction Notice Toast */}
        {lockNotice && (
          <div className="bg-rose-600 text-white text-xs font-bold py-1.5 px-4 text-center">
            {lockNotice}
          </div>
        )}

        {/* SUB-HEADER ROW FOR ADMIN: ACTIVE CATEGORY & ITS SIBLING SECTIONS ONLY */}
        {currentView === 'admin' && (
          <div className="border-t border-slate-800/80 bg-slate-900/90">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              {/* Mobile & Tablet Category Switcher Pill Strip */}
              <div className="flex xl:hidden items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0 border-b sm:border-b-0 border-slate-800/80">
                {ADMIN_NAVIGATION_CATEGORIES.map((cat) => {
                  const isCatActive = activeCategory.id === cat.id;
                  const firstAllowed =
                    cat.items.find(
                      (i) => !(adminAccessRole === 'reception_staff' && i.managerOnly)
                    ) || cat.items[0];
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleChooseModule(firstAllowed.id, firstAllowed.managerOnly)}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition shrink-0 ${
                        isCatActive
                          ? 'bg-amber-500 text-slate-950 font-black'
                          : 'bg-slate-950 text-slate-300 border border-slate-800'
                      }`}
                    >
                      {cat.titleAr}
                    </button>
                  );
                })}
              </div>

              {/* Active Category Sibling Sections (Only 2-4 items! Never crowded!) */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap hidden sm:inline ml-1">
                  {activeCategory.titleAr}:
                </span>
                {activeCategory.items.map((item) => {
                  const isSelected = activeAdminModule === item.id;
                  const isLockedForStaff =
                    adminAccessRole === 'reception_staff' && item.managerOnly;
                  const count = getCountForKey(item.countKey);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleChooseModule(item.id, item.managerOnly)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 ${
                        isLockedForStaff
                          ? 'opacity-45 bg-slate-950 text-slate-500 border border-slate-900 cursor-not-allowed'
                          : isSelected
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-black'
                          : 'bg-slate-950/90 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                      }`}
                    >
                      <span>{isLockedForStaff ? `🔒 ${item.labelAr}` : item.labelAr}</span>
                      {count !== undefined && (
                        <span className="px-1.5 py-0.2 rounded bg-slate-900 text-amber-400 font-mono text-[10px]">
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Current Active Module Quick Status */}
              <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-400 shrink-0">
                <span>القسم المفتوح:</span>
                <strong className="text-white">{activeModuleItem.labelAr}</strong>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* =====================================================================
          CATEGORIZED FULL ADMIN COMMAND MENU MODAL / DRAWER (5 Clear Categories)
         ===================================================================== */}
      {isCategorizedDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setIsCategorizedDrawerOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-6xl w-full p-4 sm:p-6 space-y-5 max-h-[92vh] overflow-y-auto shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5 text-amber-400" />
                  <span>القائمة الرئيسية المصنّفة لأقسام لوحة التحكم والأنظمة</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  مرتبة هندسياً في 5 تصنيفات رئيسية تضم كافة الأنظمة والميزات العشرة المتقدمة — اضغط على أي قسم لفتحه فوراً
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCategorizedDrawerOpen(false)}
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 5 Categorized Columns / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ADMIN_NAVIGATION_CATEGORIES.map((cat, idx) => {
                const CatIcon = getCategoryIcon(cat.id);
                return (
                  <div
                    key={cat.id}
                    className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800/90 pb-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center font-mono font-black text-xs">
                            0{idx + 1}
                          </div>
                          <div>
                            <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                              <CatIcon className="w-4 h-4 text-amber-400" />
                              <span>{cat.titleAr}</span>
                            </h3>
                            <p className="text-[10px] text-slate-400">{cat.subtitleAr}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        {cat.items.map((item) => {
                          const isSelected = activeAdminModule === item.id;
                          const count = getCountForKey(item.countKey);
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => handleChooseModule(item.id)}
                              className={`w-full p-2.5 rounded-xl border text-right transition flex items-start justify-between gap-2 ${
                                isSelected
                                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-md'
                                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-800/80'
                              }`}
                            >
                              <div className="min-w-0 space-y-0.5">
                                <div className="text-xs font-bold flex flex-wrap items-center gap-1.5">
                                  <span>{item.labelAr}</span>
                                  {item.proposalNumber && (
                                    <span
                                      className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold ${
                                        isSelected
                                          ? 'bg-slate-950 text-amber-400'
                                          : 'bg-amber-500/15 text-amber-400'
                                      }`}
                                    >
                                      مقترح #{item.proposalNumber}
                                    </span>
                                  )}
                                </div>
                                <div
                                  className={`text-[10px] leading-snug ${
                                    isSelected ? 'text-slate-900' : 'text-slate-400'
                                  }`}
                                >
                                  {item.descAr}
                                </div>
                              </div>

                              {count !== undefined && (
                                <span
                                  className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold shrink-0 ${
                                    isSelected
                                      ? 'bg-slate-950/20 text-slate-950'
                                      : 'bg-slate-950 text-amber-400 border border-slate-800'
                                  }`}
                                >
                                  {count}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Flush Screen-Edge Curved Control Bar */}
      <CurvedEdgeControlBar
        themeMode={themeMode}
        onToggleTheme={onToggleTheme}
        lang={lang}
        onToggleLang={onToggleLang}
        currency={currency}
        onToggleCurrency={onToggleCurrency}
        onOpenCmsEditor={() => onChangeView('cms_builder')}
      />

      {/* Modern Floating Pill Sidebar Menu */}
      <FloatingSidebarMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        currentView={currentView}
        onChangeView={onChangeView}
        onOpenBooking={onOpenBooking}
        onOpenConcierge={onOpenConcierge}
        themeMode={themeMode}
        companyName={companyName || 'الشركة المتحدة لتأجير السيارات'}
        logoUrl={effectiveLogo}
        lang={lang}
      />
    </>
  );
};
