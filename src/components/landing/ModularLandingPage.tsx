import React, { useState, useEffect, useRef } from 'react';
import {
  HomepageCmsConfig,
  ModuleId,
  TickerCategory,
  BlogPostItem,
  ServiceItem
} from '../../types/cms';
import { Car, Currency, Language, UserRole } from '../../types';
import { DEFAULT_LOGO_IMAGE } from '../../data/defaultCmsData';
import { AppViewMode } from '../Header';
import {
  CurvedEdgeControlBar,
  FloatingSidebarMenu,
  IconOnlyBottomDock
} from '../common/LuxuryNavigationUI';
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
  FileDown,
  Info,
  Star,
  Send,
  Phone,
  Mail,
  MessageCircle,
  Globe,
  MapPin,
  CheckCircle2,
  Shield,
  Sliders,
  Home,
  Car as CarIcon,
  UserCheck,
  Building2,
  Search,
  Calendar,
  Bell,
  Settings,
  ArrowUpRight,
  Newspaper,
  Flame,
  Megaphone,
  Tag,
  BookOpen,
  HelpCircle,
  Printer
} from 'lucide-react';

interface ModularLandingPageProps {
  cms: HomepageCmsConfig;
  onUpdateCms: (updated: HomepageCmsConfig) => void;
  cars: Car[];
  currency: Currency;
  onToggleCurrency: () => void;
  lang: Language;
  onToggleLang: () => void;
  themeMode: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenBookingModal: (car?: Car) => void;
  onSelectCarForLanding?: (car: Car) => void;
  onOpenConcierge: () => void;
  onOpenCmsEditor: () => void;
  onSwitchRole: (role: UserRole) => void;
  onChangeView: (view: AppViewMode) => void;
}

export const ModularLandingPage: React.FC<ModularLandingPageProps> = ({
  cms,
  onUpdateCms,
  cars,
  currency,
  onToggleCurrency,
  lang,
  onToggleLang,
  themeMode,
  onToggleTheme,
  onOpenBookingModal,
  onSelectCarForLanding,
  onOpenConcierge,
  onOpenCmsEditor,
  onSwitchRole,
  onChangeView
}) => {
  // 1. Scroll detection for Morphing Header (Hero -> Compact Sticky Bar)
  const [isScrolled, setIsScrolled] = useState(false);
  // Collapsible Sidebar (Inspired by Reference Image 1)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCompact, setIsSidebarCompact] = useState(false);
  // Smart Edge Widget (Inspired by Reference Image 3)
  const [isEdgeExpanded, setIsEdgeExpanded] = useState(false);

  // Module 2: Vertical Slider state
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);

  // Module 4: About Us Accordion / Modal state
  const [openPillarId, setOpenPillarId] = useState<string>(cms.about.pillars[0]?.id || '');
  const [activePillarIdx, setActivePillarIdx] = useState(0);
  const [showAboutModal, setShowAboutModal] = useState<'none' | 'more' | 'pdf'>('none');

  // Module 6: Services Catalog state
  const [selectedServiceCat, setSelectedServiceCat] = useState<string>('الكل');
  const [showAllServicesModal, setShowAllServicesModal] = useState(false);
  const [landingAvailableOnly, setLandingAvailableOnly] = useState<boolean>(false);
  const servicesScrollRef = useRef<HTMLDivElement>(null);
  const agencyWhatsappClean = (
    cms.brandIdentity?.whatsappNumber ||
    cms.header.whatsappNumber ||
    cms.footer.phone ||
    '+967777123456'
  ).replace(/[^0-9]/g, '');

  // Module 7B: Testimonials Public Form state
  const [testName, setTestName] = useState('');
  const [testRole, setTestRole] = useState('');
  const [testComment, setTestComment] = useState('');
  const [testRating, setTestRating] = useState(5);
  const [testSubmittedNotice, setTestSubmittedNotice] = useState(false);

  // Module 10: Blog state
  const [selectedBlogCat, setSelectedBlogCat] = useState<string>('الكل');
  const [readingPost, setReadingPost] = useState<BlogPostItem | null>(null);
  const [showAllBlogsModal, setShowAllBlogsModal] = useState(false);

  // Module 11: FAQ state
  const [openFaqId, setOpenFaqId] = useState<string>(cms.faq.items[0]?.id || '');

  // Module 12: Contact Form state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSentNotice, setContactSentNotice] = useState(false);

  // Scroll listener for Morphing Header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 240);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Vertical Slider Timer & Progress Bar
  useEffect(() => {
    const slidesCount = cms.verticalSlider.slides.length;
    if (slidesCount === 0) return;
    const durationMs = (cms.verticalSlider.slideDurationSeconds || 6) * 1000;
    const stepMs = 100;
    const increment = (stepMs / durationMs) * 100;

    const timer = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev + increment >= 100) {
          setActiveSlideIdx((idx) => (idx + 1) % slidesCount);
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => clearInterval(timer);
  }, [cms.verticalSlider.slides.length, cms.verticalSlider.slideDurationSeconds]);

  // Theme dynamic classes
  const isCrimson = cms.themePalette === 'carbon-crimson';
  const isLight = cms.themePalette === 'alabaster-amber';

  const accentBg = isCrimson
    ? 'bg-red-600 hover:bg-red-500 text-white'
    : 'bg-amber-500 hover:bg-amber-400 text-slate-950';
  const accentText = isCrimson ? 'text-red-500' : 'text-amber-400';
  const accentBorder = isCrimson ? 'border-red-500/40' : 'border-amber-500/40';
  const slashGradient = isCrimson
    ? 'from-red-600/90 via-red-700/80 to-transparent'
    : 'from-amber-500/90 via-amber-600/80 to-transparent';

  // Helper for Ticker Category Icon
  const renderTickerIcon = (cat: TickerCategory) => {
    switch (cat) {
      case 'news':
        return <Newspaper className="w-3.5 h-3.5 text-sky-400 shrink-0" />;
      case 'offer':
        return <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
      case 'ad':
        return <Megaphone className="w-3.5 h-3.5 text-rose-400 shrink-0" />;
      case 'marketing':
        return <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
      default:
        return <Tag className="w-3.5 h-3.5 text-slate-400 shrink-0" />;
    }
  };

  // Handle Public Testimonial Submit
  const handleSubmitTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testName.trim() || !testComment.trim()) return;
    const newItem = {
      id: `test-${Date.now()}`,
      name: testName,
      role: testRole || 'عميل الشركة المتحدة لتأجير السيارات',
      comment: testComment,
      rating: testRating,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      status: 'pending' as const,
      createdAt: new Date().toISOString().split('T')[0]
    };
    onUpdateCms({
      ...cms,
      testimonials: {
        ...cms.testimonials,
        items: [newItem, ...cms.testimonials.items]
      }
    });
    setTestName('');
    setTestRole('');
    setTestComment('');
    setTestSubmittedNotice(true);
    setTimeout(() => setTestSubmittedNotice(false), 6000);
  };

  // Handle Direct Internal Inbox Message Submit
  const handleSubmitContactMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactMessage.trim()) return;
    const newMsg = {
      id: `msg-${Date.now()}`,
      senderName: contactName,
      senderPhone: contactPhone || 'غير محدد',
      senderEmail: '',
      subject: contactSubject || 'رسالة من الصفحة الرئيسية',
      message: contactMessage,
      createdAt: new Date().toLocaleString('ar-YE'),
      read: false
    };
    onUpdateCms({
      ...cms,
      contact: {
        ...cms.contact,
        inboxMessages: [newMsg, ...cms.contact.inboxMessages]
      }
    });
    setContactName('');
    setContactPhone('');
    setContactSubject('');
    setContactMessage('');
    setContactSentNotice(true);
    setTimeout(() => setContactSentNotice(false), 6000);
  };

  // Ensure Services Catalog always displays at least 10 service cards in any selected filter before Card #11 ("اعرض المزيد")
  const getFilteredServicesMinimum10 = (): ServiceItem[] => {
    const all = cms.servicesCatalog.services;
    if (selectedServiceCat === 'الكل') {
      return all.slice(0, 10);
    }
    const matching = all.filter((s) => s.category === selectedServiceCat);
    const others = all.filter((s) => s.category !== selectedServiceCat);
    return [...matching, ...others].slice(0, 10);
  };

  // Render Individual Module by ID
  const renderModuleById = (moduleId: ModuleId) => {
    switch (moduleId) {
      // =====================================================================
      // MODULE 1: MORPHING HERO & STICKY HEADER
      // =====================================================================
      case 'header_hero': {
        const effectiveLogo = cms.header.logoUrl || DEFAULT_LOGO_IMAGE;
        return (
          <section key="header_hero" className="relative">
            {/* Compact Fixed Top Bar when Scrolled (Only Logo + Name + Slogan + Single Icon Menu Button) */}
            <div
              className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
                isScrolled
                  ? 'translate-y-0 opacity-100 pointer-events-auto'
                  : '-translate-y-full opacity-0 pointer-events-none'
              }`}
            >
              <div className="bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={effectiveLogo}
                      alt={cms.header.companyName}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-xl object-cover border border-amber-500/40 shrink-0 shadow-md"
                    />
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold text-white truncate leading-snug">
                        {cms.header.companyName}
                      </div>
                      <div className="text-[10px] text-amber-300/80 font-normal truncate hidden sm:block">
                        {cms.header.slogan}
                      </div>
                    </div>
                  </div>

                  {/* Single Icon-Only Menu Trigger */}
                  <button
                    type="button"
                    onClick={() => setIsSidebarOpen(true)}
                    aria-label="Menu"
                    className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-amber-400 flex items-center justify-center transition shadow-md shrink-0"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Expandable Hero Header at top of page */}
            <div className="dark-media-card relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl min-h-[500px] sm:min-h-[560px] flex flex-col justify-between">
              {/* Background Image + Geometric Diagonal Cut (Inspired by Reference Images 4 & 5) */}
              <div className="absolute inset-0">
                <img
                  src={cms.header.backgroundImage}
                  alt={cms.header.companyName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center brightness-75 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/40" />
                {/* Dramatic Diagonal Automotive Slash */}
                <div
                  className={`absolute -top-24 -left-24 w-96 h-[140%] bg-gradient-to-b ${slashGradient} opacity-25 -rotate-12 pointer-events-none`}
                />
              </div>

              {/* Top Row Inside Hero: Logo Image + Name + Refined Slogan & Icon-Only Menu Trigger */}
              <div className="relative z-10 p-5 sm:p-8 flex items-center justify-between gap-4 border-b border-white/10">
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={effectiveLogo}
                    alt={cms.header.companyName}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover border border-amber-400/60 shadow-xl shrink-0"
                  />
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-xl font-bold text-white tracking-tight truncate leading-snug">
                      {cms.header.companyName}
                    </h2>
                    <p className="text-[10px] sm:text-xs font-normal text-amber-300/85 tracking-wide truncate mt-0.5">
                      {cms.header.slogan}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(true)}
                  aria-label="Menu"
                  className="w-11 h-11 rounded-2xl border border-white/20 bg-slate-950/65 hover:bg-amber-500 text-amber-400 hover:text-slate-950 flex items-center justify-center backdrop-blur-md shadow-xl transition shrink-0"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>

              {/* Center/Bottom Hero Welcome Message */}
              <div className="relative z-10 p-6 sm:p-12 max-w-4xl space-y-5">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 bg-slate-950/70 border border-amber-500/30 px-3.5 py-1.5 rounded-xl backdrop-blur">
                  <Sparkles className="w-4 h-4" />
                  <span>خدمات تأجير السيارات المؤسسية والفردية — صنعاء والمحافظات</span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                  {cms.header.welcomeTitle}
                </h1>

                <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
                  {cms.header.welcomeSubtitle}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onOpenBookingModal()}
                    className={`min-h-[48px] px-7 py-3 rounded-2xl ${accentBg} font-black text-sm shadow-2xl flex items-center gap-2 transition transform active:scale-95`}
                  >
                    <span>{cms.header.ctaButtonText}</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <a
                    href={`https://wa.me/${agencyWhatsappClean}?text=${encodeURIComponent(
                      `مرحباً ${cms.header.companyName}، أود الاستفسار عن السيارات المتوفرة حالياً وأسعارها وإمكانية التفاوض والحجز عن بعد.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="min-h-[48px] px-5 py-3 rounded-2xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 backdrop-blur shadow-lg transition"
                  >
                    <Phone className="w-4 h-4" />
                    <span>تفاوض واستفسر عبر واتساب</span>
                  </a>

                  <a
                    href="#services-section"
                    className="min-h-[48px] px-5 py-3 rounded-2xl bg-slate-900/85 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 backdrop-blur transition"
                  >
                    <CarIcon className="w-4 h-4 text-amber-400" />
                    <span>السيارات المتوفرة والأسعار</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        );
      }

      // =====================================================================
      // MODULE 2: VERTICAL MOBILE-FIRST CINEMATIC SLIDER (9:16)
      // =====================================================================
      case 'vertical_slider': {
        const slides = cms.verticalSlider.slides;
        if (!slides.length) return null;
        const currentSlide = slides[activeSlideIdx % slides.length];

        return (
          <section key="vertical_slider" className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div>
                <span className={`text-xs font-bold ${accentText}`}>فئات الأسطول المعتمدة</span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  خيارات تأجير متكاملة للمنظمات، الشركات، والأفراد
                </h2>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                0{activeSlideIdx + 1} / 0{slides.length}
              </span>
            </div>

            {/* Vertical Mobile-First Container (9:16 on mobile, split showcase on desktop) */}
            <div className="dark-media-card relative mx-auto w-full max-w-md sm:max-w-none aspect-[9/15] sm:aspect-[16/8] rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl flex flex-col justify-end">
              {/* Slide Background Image */}
              <img
                src={currentSlide.backgroundImage}
                alt={currentSlide.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700"
              />
              {/* Dramatic Poster Scrim + Diagonal Red/Gold Ribbon (Inspired by Image 5) */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
              <div
                className={`absolute top-0 left-8 w-28 sm:w-44 h-full bg-gradient-to-b ${slashGradient} opacity-35 -skew-x-12 pointer-events-none`}
              />

              {/* Circular Price Badge (Inspired by Image 4) */}
              {currentSlide.priceTag && (
                <div className="absolute top-6 left-6 z-20 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-slate-950/90 border-2 border-amber-400 shadow-2xl flex flex-col items-center justify-center text-center p-2 backdrop-blur">
                  <span className="text-[10px] text-slate-400">يبدأ الإيجار من</span>
                  <span className={`text-xs sm:text-sm font-black font-mono ${accentText} mt-0.5`}>
                    {currentSlide.priceTag}
                  </span>
                  <span className="text-[9px] text-emerald-400 mt-0.5">شامل التأمين</span>
                </div>
              )}

              {/* Top Badge */}
              {currentSlide.badgeText && (
                <div className="absolute top-6 right-6 z-20 px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs shadow-lg">
                  {currentSlide.badgeText}
                </div>
              )}

              {/* Slide Content Overlay */}
              <div className="relative z-20 p-6 sm:p-10 space-y-4 max-w-2xl">
                <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                  {currentSlide.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {currentSlide.subtitle}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => onOpenBookingModal()}
                    className={`min-h-[48px] px-6 py-3 rounded-2xl ${accentBg} font-black text-xs sm:text-sm inline-flex items-center gap-2 shadow-xl`}
                  >
                    <span>{currentSlide.buttonText}</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bottom Controls: Time Progress Bar + Slide Dots/Numbers + Prev/Next Arrows */}
              <div className="relative z-20 bg-slate-950/90 backdrop-blur-md border-t border-white/10 px-6 py-3.5 space-y-2.5">
                {/* Time Progress Bar */}
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${isCrimson ? 'bg-red-500' : 'bg-amber-400'} transition-all duration-100`}
                    style={{ width: `${slideProgress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  {/* Slide Numbers / Dots */}
                  <div className="flex items-center gap-2">
                    {slides.map((s, idx) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setActiveSlideIdx(idx);
                          setSlideProgress(0);
                        }}
                        className={`min-w-[32px] h-7 rounded-lg text-xs font-mono font-bold transition ${
                          idx === activeSlideIdx
                            ? `${accentBg}`
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        0{idx + 1}
                      </button>
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setActiveSlideIdx((prev) => (prev - 1 + slides.length) % slides.length);
                        setSlideProgress(0);
                      }}
                      className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-white flex items-center justify-center transition"
                      title="الشريحة السابقة"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        setActiveSlideIdx((prev) => (prev + 1) % slides.length);
                        setSlideProgress(0);
                      }}
                      className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-white flex items-center justify-center transition"
                      title="الشريحة التالية"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      }

      // =====================================================================
      // MODULE 3: ANIMATED ARABIC NEWS & PROMO TICKER (ICON-ONLY BADGE)
      // =====================================================================
      case 'news_ticker': {
        if (!cms.ticker.items.length) return null;
        const repeatedItems = [...cms.ticker.items, ...cms.ticker.items];
        return (
          <section
            key="news_ticker"
            className="rounded-2xl border border-amber-500/30 bg-slate-900/95 overflow-hidden shadow-lg flex items-center"
          >
            {/* Simple Icon-Only Badge (No title text as requested) */}
            <div className={`w-11 h-11 ${accentBg} shrink-0 flex items-center justify-center z-10 shadow-md`}>
              <Megaphone className="w-4 h-4" />
            </div>

            <div className="flex-1 overflow-hidden py-2.5 px-4" dir="ltr">
              <div className="animate-ticker-ltr items-center gap-10 whitespace-nowrap">
                {repeatedItems.map((item, idx) => (
                  <div
                    key={`${item.id}-${idx}`}
                    dir="rtl"
                    onClick={() => onOpenBookingModal()}
                    className="inline-flex items-center gap-2 text-xs text-slate-200 hover:text-amber-400 cursor-pointer transition shrink-0"
                  >
                    {renderTickerIcon(item.category)}
                    <span className="font-semibold">{item.text}</span>
                    <span className="text-amber-500/50 mx-3">✦</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      }

      // =====================================================================
      // MODULE 4: ABOUT US & DIRECTOR MESSAGE + ACCORDION/CAROUSEL
      // =====================================================================
      case 'about_us': {
        return (
          <section key="about_us" id="about-section" className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-10 space-y-8 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Executive Card */}
              <div className="lg:col-span-7 space-y-4">
                <div className={`text-xs font-bold ${accentText}`}>
                  {cms.about.sectionSubtitle}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  {cms.about.sectionTitle}
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {cms.about.paragraph}
                </p>

                {/* Director Signature Block */}
                <div className="pt-4 flex items-center gap-4 border-t border-slate-800">
                  <img
                    src={cms.about.directorImage}
                    alt={cms.about.directorName}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shrink-0"
                  />
                  <div>
                    <div className="text-sm font-black text-white">{cms.about.directorName}</div>
                    <div className={`text-xs font-semibold ${accentText}`}>{cms.about.directorRole}</div>
                  </div>
                </div>
              </div>

              {/* Pillars: Accordion OR Carousel */}
              <div className="lg:col-span-5 space-y-3">
                {cms.about.displayMode === 'accordion' ? (
                  <div className="space-y-2.5">
                    {cms.about.pillars.map((pil) => {
                      const isOpen = openPillarId === pil.id;
                      return (
                        <div
                          key={pil.id}
                          className={`rounded-2xl border transition overflow-hidden ${
                            isOpen ? `${accentBorder} bg-slate-950` : 'border-slate-800 bg-slate-950/60'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => setOpenPillarId(isOpen ? '' : pil.id)}
                            className="w-full p-4 flex items-center justify-between text-right"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${accentBg}`}>
                                {pil.label}
                              </span>
                              <span className="text-xs sm:text-sm font-bold text-white">{pil.title}</span>
                            </div>
                            <ChevronDown
                              className={`w-4 h-4 text-slate-400 transition-transform ${
                                isOpen ? 'rotate-180 text-amber-400' : ''
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                              {pil.content}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950 space-y-4">
                    {cms.about.pillars.length > 0 && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className={`px-3 py-1 rounded-lg text-xs font-black ${accentBg}`}>
                            {cms.about.pillars[activePillarIdx % cms.about.pillars.length].label}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() =>
                                setActivePillarIdx(
                                  (i) => (i - 1 + cms.about.pillars.length) % cms.about.pillars.length
                                )
                              }
                              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                setActivePillarIdx((i) => (i + 1) % cms.about.pillars.length)
                              }
                              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <h4 className="text-base font-bold text-white">
                          {cms.about.pillars[activePillarIdx % cms.about.pillars.length].title}
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {cms.about.pillars[activePillarIdx % cms.about.pillars.length].content}
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Action Buttons: Download PDF Profile & Know More */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-3">
              {cms.about.showPdfButton && (
                <button
                  onClick={() => setShowAboutModal('pdf')}
                  className={`min-h-[44px] px-5 py-2.5 rounded-xl ${accentBg} font-bold text-xs flex items-center gap-2 shadow-lg`}
                >
                  <FileDown className="w-4 h-4" />
                  <span>{cms.about.pdfButtonText}</span>
                </button>
              )}
              {cms.about.showMoreButton && (
                <button
                  onClick={() => setShowAboutModal('more')}
                  className="min-h-[44px] px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 hover:bg-slate-800 text-slate-200 font-bold text-xs flex items-center gap-2 transition"
                >
                  <Info className="w-4 h-4 text-amber-400" />
                  <span>{cms.about.moreButtonText}</span>
                </button>
              )}
            </div>
          </section>
        );
      }

      // =====================================================================
      // MODULE 6: SERVICES CATALOG CAROUSEL (10 CARDS + CARD #11 "VIEW MORE")
      // =====================================================================
      case 'services_catalog': {
        const displayServices = getFilteredServicesMinimum10();
        return (
          <section key="services_catalog" id="services-section" className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className={`text-xs font-bold ${accentText}`}>خدماتنا الاحترافية</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  {cms.servicesCatalog.mainTitle}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  {cms.servicesCatalog.subTitle}
                </p>
              </div>

              {/* Category Filters */}
              <div className="flex items-center gap-1.5 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto">
                {cms.servicesCatalog.categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedServiceCat(cat)}
                    className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                      selectedServiceCat === cat
                        ? `${accentBg}`
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Horizontal Sliding Carousel of 10 Cards + Card #11 "View More" */}
            <div className="relative">
              <div
                ref={servicesScrollRef}
                className="flex items-stretch gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth"
              >
                {displayServices.map((srv, idx) => (
                  <div
                    key={`${srv.id}-${idx}`}
                    className="snap-start shrink-0 w-72 sm:w-80 rounded-2xl border border-slate-800 bg-slate-900 hover:border-amber-500/50 overflow-hidden flex flex-col justify-between transition group shadow-xl"
                  >
                    <div>
                      {/* Diagonal Geometric Image Header */}
                      <div className="dark-media-card relative h-44 bg-slate-950 overflow-hidden">
                        <img
                          src={srv.image}
                          alt={srv.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-950/85 border border-amber-500/30 text-[11px] font-bold text-amber-400 backdrop-blur">
                          {srv.badge || srv.category}
                        </div>
                      </div>

                      <div className="p-4 space-y-2.5">
                        <h3 className="text-sm font-black text-white group-hover:text-amber-400 transition line-clamp-1">
                          {srv.title}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {srv.subtitle}
                        </p>
                        <ul className="space-y-1 pt-1">
                          {srv.features.slice(0, 3).map((f, fIdx) => (
                            <li key={fIdx} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span className="truncate">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/50">
                      <span className={`text-xs font-black font-mono ${accentText}`}>
                        {srv.priceText}
                      </span>
                      <button
                        onClick={() => onOpenBookingModal()}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold ${accentBg}`}
                      >
                        اطلب الخدمة
                      </button>
                    </div>
                  </div>
                ))}

                {/* View More Services Card */}
                <div
                  onClick={() => setShowAllServicesModal(true)}
                  className="snap-start shrink-0 w-72 sm:w-80 rounded-2xl border-2 border-dashed border-amber-500/50 bg-slate-900 hover:border-amber-400 p-6 flex flex-col items-center justify-center text-center cursor-pointer group transition shadow-xl"
                >
                  <div className={`w-16 h-16 rounded-2xl ${accentBg} flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                    <ArrowUpRight className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-bold text-amber-400 mb-1">دليل الخدمات المتكامل</span>
                  <h3 className="text-lg font-black text-white">استكشف كافة الخدمات</h3>
                  <p className="text-xs text-slate-400 mt-2">
                    تصفح القائمة الكاملة لخدمات تأجير السيارات، السائق الخاص، والمراسم في صنعاء والمحافظات
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Button: View All Services Page */}
            <div className="text-center pt-2">
              <button
                onClick={() => setShowAllServicesModal(true)}
                className="min-h-[46px] px-7 py-2.5 rounded-2xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500 hover:text-slate-950 text-amber-300 font-black text-xs inline-flex items-center gap-2 transition"
              >
                <span>{cms.servicesCatalog.viewAllButtonText}</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            {/* AVAILABLE FLEET SHOWCASE WITH LIVE AVAILABILITY & REMOTE NEGOTIATION */}
            <div className="pt-8 border-t border-slate-800/80 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className={`text-xs font-bold ${accentText}`}>
                    الأسطول المتاح للحجز والتفاوض عن بعد
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                    السيارات المتوفرة حالياً وأسعارها — تفاوض وأتمم معاملتك عن بعد قبل الاستلام
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    اختر سيارتك، تفاوض على السعر المقترح أو تواصل عبر واتساب، وأكمل العقد والضمانات إلكترونياً لتستلم سيارتك جاهزة فوراً.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 self-start">
                  <button
                    type="button"
                    onClick={() => setLandingAvailableOnly((prev) => !prev)}
                    className={`px-3.5 py-2.5 rounded-xl border text-xs font-bold transition flex items-center gap-2 ${
                      landingAvailableOnly
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg'
                        : 'bg-slate-900 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        landingAvailableOnly ? 'bg-slate-950' : 'bg-emerald-400 animate-pulse'
                      }`}
                    />
                    <span>
                      المتوفر حالياً فقط ({cars.filter((c) => c.available).length} سيارات)
                    </span>
                  </button>
                  <button
                    onClick={() => onChangeView('customer')}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-400 text-xs font-bold hover:bg-amber-500 hover:text-slate-950 transition"
                  >
                    بوابة الحجز والأسطول الكامل ({cars.length})
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {cars
                  .filter((c) => (landingAvailableOnly ? c.available : true))
                  .slice(0, 8)
                  .map((car) => (
                    <div
                      key={car.id}
                      className="rounded-2xl border border-slate-800 bg-slate-900 hover:border-amber-500/50 overflow-hidden flex flex-col justify-between transition group shadow-xl"
                    >
                      <div>
                        <div
                          onClick={() => onSelectCarForLanding && onSelectCarForLanding(car)}
                          className="dark-media-card relative h-44 bg-slate-950 overflow-hidden cursor-pointer"
                        >
                          <img
                            src={car.image}
                            alt={car.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />
                          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                            <span
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-black border backdrop-blur ${
                                car.available
                                  ? 'bg-emerald-500/90 text-slate-950 border-emerald-300'
                                  : 'bg-amber-500/90 text-slate-950 border-amber-300'
                              }`}
                            >
                              {car.available ? '● متاح للتسليم الفوري' : 'مؤجر حالياً'}
                            </span>
                          </div>
                          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-slate-950/85 border border-amber-500/40 text-[10px] font-bold text-amber-400">
                            قابل للتفاوض عن بعد
                          </div>
                          <div className="absolute bottom-2.5 right-2.5 left-2.5 flex items-center justify-between text-[11px]">
                            <span className="text-white font-bold bg-black/60 px-2 py-0.5 rounded">
                              {car.modelYear} • {car.seats} مقاعد
                            </span>
                            <span className="bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded">
                              المواصفات ↗
                            </span>
                          </div>
                        </div>

                        <div className="p-4 space-y-2">
                          <h4
                            onClick={() => onSelectCarForLanding && onSelectCarForLanding(car)}
                            className="text-sm font-black text-white group-hover:text-amber-400 transition cursor-pointer line-clamp-1"
                          >
                            {car.name}
                          </h4>
                          <div className="flex items-center justify-between text-xs bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                            <div>
                              <span className="text-[10px] text-slate-400 block">إيجار يومي</span>
                              <span className="font-black text-amber-400">
                                {currency === 'USD'
                                  ? `$${car.pricePerDayUsd}`
                                  : `${car.pricePerDayYer.toLocaleString()} ر.ي`}
                              </span>
                            </div>
                            <div className="text-left">
                              <span className="text-[10px] text-slate-400 block">عقد شهري</span>
                              <span className="font-bold text-white">
                                {currency === 'USD'
                                  ? `$${car.pricePerMonthUsd || car.pricePerDayUsd * 24}`
                                  : `${(
                                      car.pricePerMonthYer || car.pricePerDayYer * 24
                                    ).toLocaleString()} ر.ي`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3.5 pt-0 space-y-2">
                        <button
                          onClick={() => onOpenBookingModal(car)}
                          className={`w-full py-2.5 px-3 rounded-xl text-xs font-black ${accentBg} shadow-md`}
                        >
                          تفاوض على السعر واحجز عن بعد
                        </button>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => onSelectCarForLanding && onSelectCarForLanding(car)}
                            className="py-1.5 px-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-200 transition"
                          >
                            فحص المواصفات
                          </button>
                          <a
                            href={`https://wa.me/${agencyWhatsappClean}?text=${encodeURIComponent(
                              `مرحباً ${cms.header.companyName}، أرغب في الاستفسار والتفاوض حول استئجار مركبة (${car.name} - موديل ${car.modelYear}) المتاحة بسعر ${car.pricePerDayUsd}$ يومياً.`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="py-1.5 px-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 text-center transition"
                          >
                            تفاوض واتساب
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        );
      }

      // =====================================================================
      // MODULE 7A: CUSTOM B2B, NGO & EVENT PACKAGES
      // =====================================================================
      case 'b2b_packages': {
        return (
          <section key="b2b_packages" id="packages-section" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className={`text-xs font-bold ${accentText}`}>حلول القطاعات والأعمال</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  {cms.packages.mainTitle}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  {cms.packages.subTitle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {cms.packages.packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative rounded-3xl overflow-hidden border p-6 flex flex-col justify-between space-y-6 shadow-2xl transition ${
                    pkg.isFeatured
                      ? 'border-2 border-amber-400 bg-slate-900'
                      : 'border-slate-800 bg-slate-900/90'
                  }`}
                >
                  {/* Diagonal Accent Ribbon */}
                  <div
                    className={`absolute -top-12 -left-12 w-32 h-32 bg-gradient-to-br ${slashGradient} opacity-20 rotate-45 pointer-events-none`}
                  />

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-xl">
                        {pkg.sectorTag}
                      </span>
                      {pkg.isFeatured && (
                        <span className="text-[11px] font-black bg-emerald-500 text-slate-950 px-2.5 py-0.5 rounded-lg">
                          باقة موصى بها
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-black text-white leading-snug">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {pkg.subtitle}
                    </p>

                    {/* Pricing Box */}
                    <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-baseline justify-between">
                      <div>
                        {pkg.oldPriceText && (
                          <span className="text-xs text-slate-500 line-through block font-mono">
                            {pkg.oldPriceText}
                          </span>
                        )}
                        <span className={`text-2xl font-black font-mono ${accentText}`}>
                          {pkg.priceText}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">{pkg.periodText}</span>
                    </div>

                    {/* Included Services Checklist */}
                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-bold text-slate-200">تشمل هذه الباقة:</div>
                      {pkg.includedServices.map((inc, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenBookingModal()}
                    className={`w-full min-h-[46px] py-3 rounded-2xl font-black text-xs transition shadow-lg ${accentBg}`}
                  >
                    {pkg.ctaText}
                  </button>
                </div>
              ))}
            </div>
          </section>
        );
      }

      // =====================================================================
      // MODULE 7B: TESTIMONIALS CAROUSEL + PUBLIC SUBMISSION FORM
      // =====================================================================
      case 'testimonials': {
        const approvedTestimonials = cms.testimonials.items.filter((t) => t.status === 'approved');
        const styleMode = cms.testimonials.cardStyle;

        return (
          <section key="testimonials" className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-10 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className={`text-xs font-bold ${accentText}`}>ثقة عملائنا</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {cms.testimonials.mainTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                {cms.testimonials.subTitle}
              </p>
            </div>

            {/* Testimonials Carousel Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {approvedTestimonials.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl border border-slate-800 bg-slate-950 flex flex-col justify-between space-y-4 shadow-lg"
                >
                  <div className="space-y-3">
                    {styleMode !== 'avatar_text' && (
                      <div className="flex items-center gap-1 text-amber-400 text-sm">
                        {'★'.repeat(item.rating)}
                      </div>
                    )}
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      "{item.comment}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80">
                    {styleMode !== 'minimal' && (
                      <img
                        src={item.avatar}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-11 h-11 rounded-full object-cover border border-amber-400 shrink-0"
                      />
                    )}
                    <div>
                      <div className="text-xs font-black text-white">{item.name}</div>
                      <div className="text-[11px] text-slate-400">{item.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Public Form to Submit a Testimonial (Subject to Admin Approval) */}
            {cms.testimonials.enablePublicForm && (
              <div className="max-w-2xl mx-auto pt-4 border-t border-slate-800">
                <form onSubmit={handleSubmitTestimonial} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">شاركنا تقييمك لتجربتك معنا</h4>
                    <span className="text-[11px] text-slate-400">آراء العملاء</span>
                  </div>

                  {testSubmittedNotice && (
                    <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                      ✓ شكراً لك! تم استلام تقييمك بنجاح.
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <input
                      type="text"
                      required
                      placeholder="اسمك الكريم"
                      value={testName}
                      onChange={(e) => setTestName(e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
                    />
                    <input
                      type="text"
                      placeholder="صفتك / جهة العمل"
                      value={testRole}
                      onChange={(e) => setTestRole(e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
                    />
                    <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-xl px-3 py-2">
                      <span className="text-slate-400">تقييمك:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => setTestRating(st)}
                            className={`text-base ${testRating >= st ? 'text-amber-400' : 'text-slate-700'}`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      required
                      placeholder="اكتب شهادتك ورأيك بالتجربة..."
                      value={testComment}
                      onChange={(e) => setTestComment(e.target.value)}
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                    />
                    <button
                      type="submit"
                      className={`min-h-[42px] px-6 py-2 rounded-xl font-bold text-xs ${accentBg} flex items-center justify-center gap-1.5`}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>إرسال الشهادة</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </section>
        );
      }

      // =====================================================================
      // MODULE 8: BRANDS & SUCCESS PARTNERS CAROUSEL
      // =====================================================================
      case 'brands_partners': {
        const isGray = cms.brands.colorMode === 'grayscale';
        const dMode = cms.brands.displayMode;

        return (
          <section key="brands_partners" className="space-y-5">
            <div className="text-center space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {cms.brands.mainTitle}
              </h2>
              <p className="text-xs text-slate-400">{cms.brands.subTitle}</p>
            </div>

            <div className="flex items-stretch gap-4 overflow-x-auto pb-3 pt-1">
              {cms.brands.items.map((br) => (
                <div
                  key={br.id}
                  className="shrink-0 w-48 sm:w-56 p-5 rounded-2xl border border-slate-800 bg-slate-900/90 flex flex-col items-center justify-center text-center space-y-2.5 transition shadow-md"
                >
                  {/* Square Brand Emblem */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-slate-950 border border-amber-500/30 flex items-center justify-center overflow-hidden transition ${
                      isGray ? 'grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100' : ''
                    }`}
                  >
                    {br.logoUrl ? (
                      <img src={br.logoUrl} alt={br.name} referrerPolicy="no-referrer" className="w-full h-full object-contain p-2" />
                    ) : (
                      <Building2 className={`w-8 h-8 ${accentText}`} />
                    )}
                  </div>

                  {dMode !== 'logo_only' && (
                    <div className="text-xs font-black text-white">{br.name}</div>
                  )}

                  {(dMode === 'logo_text' || dMode === 'logo_text_rating') && (
                    <p className="text-[11px] text-slate-400 line-clamp-2">{br.description}</p>
                  )}

                  {(dMode === 'logo_rating' || dMode === 'logo_text_rating') && (
                    <div className="text-amber-400 text-xs">{'★'.repeat(br.rating)}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      }

      // =====================================================================
      // MODULE 9: FEATURED PROMOS & DIAGONAL AUTOMOTIVE AD BANNERS
      // =====================================================================
      case 'featured_promos': {
        const items = cms.promos.items;
        const layout = cms.promos.layoutMode;

        const gridClass =
          layout === 'grid_4'
            ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
            : layout === 'split_2_horizontal'
            ? 'space-y-6'
            : layout === 'split_2_vertical'
            ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
            : layout === 'grid_3_vertical'
            ? 'grid grid-cols-1 md:grid-cols-3 gap-6'
            : layout === 'bento_3_mixed'
            ? 'grid grid-cols-1 lg:grid-cols-12 gap-6'
            : 'flex overflow-x-auto gap-6 pb-4';

        return (
          <section key="featured_promos" className="space-y-6">
            <div>
              <span className={`text-xs font-bold ${accentText}`}>عروض حصرية</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {cms.promos.mainTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">{cms.promos.subTitle}</p>
            </div>

            <div className={gridClass}>
              {items.map((pr, idx) => {
                const spanClass =
                  layout === 'bento_3_mixed'
                    ? idx === 0
                      ? 'lg:col-span-7'
                      : idx === 1
                      ? 'lg:col-span-5'
                      : 'lg:col-span-6'
                    : layout === 'carousel'
                    ? 'shrink-0 w-80 sm:w-[460px]'
                    : '';

                return (
                  <div
                    key={pr.id}
                    onClick={() => onOpenBookingModal()}
                    className={`dark-media-card ${spanClass} relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 min-h-[260px] p-6 sm:p-8 flex flex-col justify-between cursor-pointer group shadow-2xl`}
                  >
                    <img
                      src={pr.backgroundImage}
                      alt={pr.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition duration-700 brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
                    {/* Diagonal Geometric Slash (Inspired by Reference Images 4, 5, 6) */}
                    <div
                      className={`absolute top-0 left-0 w-40 h-full bg-gradient-to-b ${slashGradient} opacity-35 -skew-x-12 pointer-events-none`}
                    />

                    <div className="relative z-10 flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-xl text-xs font-black ${accentBg}`}>
                        {pr.discountBadge}
                      </span>
                      <span className="px-3 py-1 rounded-xl bg-slate-950/90 border border-amber-500/40 text-amber-400 font-mono font-bold text-xs">
                        {pr.priceTag}
                      </span>
                    </div>

                    <div className="relative z-10 space-y-2 max-w-lg pt-6">
                      <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-400 transition">
                        {pr.title}
                      </h3>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {pr.subtitle}
                      </p>
                      <div className="pt-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-black text-amber-400">
                          <span>{pr.buttonText}</span>
                          <ChevronLeft className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      }

      // =====================================================================
      // MODULE 10: FULL BLOG & EDITORIAL MODULE
      // =====================================================================
      case 'blog_section': {
        const categories = ['الكل', ...Array.from(new Set(cms.blog.posts.map((p) => p.category)))];
        const filteredPosts = (
          selectedBlogCat === 'الكل'
            ? cms.blog.posts
            : cms.blog.posts.filter((p) => p.category === selectedBlogCat)
        ).slice(0, cms.blog.maxPostsToShow);

        return (
          <section key="blog_section" id="blog-section" className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className={`text-xs font-bold ${accentText}`}>المركز الإعلامي والأدلة</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  {cms.blog.mainTitle}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">{cms.blog.subTitle}</p>
              </div>

              {cms.blog.showCategoryFilters && (
                <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedBlogCat(c)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                        selectedBlogCat === c ? `${accentBg}` : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div
              className={
                cms.blog.scrollDirection === 'horizontal'
                  ? 'flex items-stretch gap-5 overflow-x-auto pb-4'
                  : 'grid grid-cols-1 md:grid-cols-2 gap-5'
              }
            >
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => setReadingPost(post)}
                  className={`${
                    cms.blog.scrollDirection === 'horizontal' ? 'shrink-0 w-80 sm:w-96' : ''
                  } rounded-2xl border border-slate-800 bg-slate-900 hover:border-amber-500/50 overflow-hidden flex flex-col justify-between cursor-pointer group transition shadow-xl`}
                >
                  <div>
                    <div className="relative h-44 bg-slate-950 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span className={accentText}>{post.category}</span>
                        <span>·</span>
                        <span>{post.publishDate}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-black text-white group-hover:text-amber-400 transition line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="px-5 py-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">{post.author}</span>
                    <span className={`font-bold ${accentText}`}>اقرأ المقال ←</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowAllBlogsModal(true)}
                className="min-h-[44px] px-6 py-2.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs inline-flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>{cms.blog.viewAllButtonText}</span>
              </button>
            </div>
          </section>
        );
      }

      // =====================================================================
      // MODULE 11: INTERACTIVE FAQ SECTION
      // =====================================================================
      case 'faq_section': {
        return (
          <section key="faq_section" className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-1.5">
              <span className={`text-xs font-bold ${accentText}`}>مركز المساعدة</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {cms.faq.mainTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">{cms.faq.subTitle}</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              {cms.faq.items.map((item) => {
                const isOpen = openFaqId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border transition overflow-hidden ${
                      isOpen ? `${accentBorder} bg-slate-950` : 'border-slate-800 bg-slate-950/60'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? '' : item.id)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between text-right gap-3"
                    >
                      <div className="flex items-center gap-2.5">
                        <HelpCircle className={`w-4 h-4 ${accentText} shrink-0`} />
                        <span className="text-xs sm:text-sm font-bold text-white">{item.question}</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-amber-400' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/70">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );
      }

      // =====================================================================
      // MODULE 12: OMNICHANNEL CONTACT US & INTERNAL INBOX FORM
      // =====================================================================
      case 'contact_us': {
        return (
          <section key="contact_us" id="contact-section" className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Omnichannel Instant Contact Buttons */}
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <span className={`text-xs font-bold ${accentText}`}>قنوات الاتصال المباشر</span>
                  <h2 className="text-2xl font-black text-white mt-1">
                    {cms.contact.mainTitle}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">{cms.contact.subTitle}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                  {cms.contact.showWhatsapp && (
                    <a
                      href={`https://wa.me/${cms.contact.whatsappNumber}`}
                      target="_blank"
                      rel="noreferrer"
                      className="min-h-[48px] p-3.5 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 flex items-center justify-between transition"
                    >
                      <span className="text-xs font-bold">{cms.contact.whatsappLabel}</span>
                      <span className="text-xs font-mono">+{cms.contact.whatsappNumber}</span>
                    </a>
                  )}

                  {cms.contact.showDirectCall && (
                    <a
                      href={`tel:${cms.contact.directPhone}`}
                      className="min-h-[48px] p-3.5 rounded-2xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 flex items-center justify-between transition"
                    >
                      <span className="text-xs font-bold">{cms.contact.directPhoneLabel}</span>
                      <span className="text-xs font-mono">{cms.contact.directPhone}</span>
                    </a>
                  )}

                  {cms.contact.showMessenger && (
                    <a
                      href={cms.contact.messengerUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="min-h-[48px] p-3.5 rounded-2xl border border-sky-500/40 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 flex items-center justify-between transition"
                    >
                      <span className="text-xs font-bold">{cms.contact.messengerLabel}</span>
                      <span className="text-xs">m.me/unitedfleetye</span>
                    </a>
                  )}

                  {cms.contact.showLiveChat && (
                    <button
                      type="button"
                      onClick={onOpenConcierge}
                      className="min-h-[48px] p-3.5 rounded-2xl border border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 flex items-center justify-between transition text-right"
                    >
                      <span className="text-xs font-bold">{cms.contact.liveChatLabel}</span>
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  )}

                  {cms.contact.showEmail && (
                    <a
                      href={`mailto:${cms.contact.officialEmail}`}
                      className="min-h-[48px] p-3.5 rounded-2xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 flex items-center justify-between transition"
                    >
                      <span className="text-xs font-bold">{cms.contact.officialEmailLabel}</span>
                      <span className="text-xs font-mono">{cms.contact.officialEmail}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Contact & Inquiry Form */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-base font-bold text-white">
                  تواصل مع فريق خدمة العملاء وإدارة العقود
                </h3>

                {contactSentNotice && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                    ✓ تم استلام رسالتك بنجاح، وسيتواصل معك فريق خدمة العملاء في أقرب وقت.
                  </div>
                )}

                <form onSubmit={handleSubmitContactMessage} className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">الاسم الكامل / الجهة:</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="أدخل اسمك أو اسم الجهة..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">رقم الهاتف / واتساب:</label>
                      <input
                        type="text"
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="+967 77..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">موضوع الاستفسار أو الطلب:</label>
                    <input
                      type="text"
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      placeholder="مثال: طلب عرض سعر لشركة / استفسار عن حجز سيارة..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">تفاصيل الرسالة:</label>
                    <textarea
                      rows={4}
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="اكتب تفاصيل طلبك أو استفسارك هنا..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full min-h-[48px] py-3 rounded-xl font-black text-xs ${accentBg} flex items-center justify-center gap-2 shadow-lg`}
                  >
                    <Send className="w-4 h-4" />
                    <span>إرسال الرسالة</span>
                  </button>
                </form>
              </div>
            </div>
          </section>
        );
      }

      // =====================================================================
      // MODULE 13: GLOBAL CUSTOMIZABLE FOOTER
      // =====================================================================
      case 'global_footer': {
        return (
          <footer key="global_footer" className="rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-10 space-y-8 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-xs">
              {/* Brand & Geo Address */}
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={cms.header.logoUrl || DEFAULT_LOGO_IMAGE}
                    alt={cms.footer.companyName}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-xl object-cover border border-amber-500/40 shrink-0"
                  />
                  <div>
                    <div className="text-sm font-bold text-white">{cms.footer.companyName}</div>
                    <div className="text-[10px] text-amber-300/80 font-normal">{cms.footer.slogan}</div>
                  </div>
                </div>
                <p className="text-slate-400 leading-relaxed">{cms.footer.description}</p>
                <div className="space-y-1.5 pt-2 text-slate-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{cms.footer.mainGeoAddress}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{cms.footer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{cms.footer.email}</span>
                  </div>
                </div>
              </div>

              {/* Sections & Pages */}
              {cms.footer.showSectionsLinks && (
                <div className="lg:col-span-2 space-y-2.5">
                  <h4 className="font-bold text-white text-sm">روابط سريعة</h4>
                  <ul className="space-y-2 text-slate-400">
                    {cms.footer.customPages
                      .filter((p) => p.visible)
                      .map((p) => (
                        <li key={p.id}>
                          <a href={p.url} className="hover:text-amber-400 transition">
                            {p.label}
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              {/* Legal Policies */}
              {cms.footer.showPoliciesLinks && (
                <div className="lg:col-span-3 space-y-2.5">
                  <h4 className="font-bold text-white text-sm">السياسات والأحكام والشروط</h4>
                  <ul className="space-y-2 text-slate-400">
                    {cms.footer.policyLinks
                      .filter((p) => p.visible)
                      .map((p) => (
                        <li key={p.id}>
                          <button
                            onClick={() => setShowAboutModal('more')}
                            className="hover:text-amber-400 transition text-right"
                          >
                            {p.label}
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              {/* Branches */}
              {cms.footer.showBranches && (
                <div className="lg:col-span-3 space-y-2.5">
                  <h4 className="font-bold text-white text-sm">فروعنا ومكاتب التنسيق</h4>
                  <div className="space-y-2.5">
                    {cms.footer.branches
                      .filter((b) => b.visible)
                      .map((b) => (
                        <div key={b.id} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                          <div className="font-bold text-amber-400">{b.city}</div>
                          <div className="text-[11px] text-slate-300">{b.address}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">{b.phone}</div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Social Media Links Bar (7 Major Platforms) */}
            {cms.footer.showSocials && (
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs font-bold text-slate-300">تابعنا على منصات التواصل الاجتماعي الرسمية:</span>
                <div className="flex flex-wrap items-center gap-2">
                  {cms.footer.socials
                    .filter((s) => s.visible)
                    .map((s) => (
                      <a
                        key={s.id}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 border border-slate-800 text-xs font-bold text-slate-300 transition"
                      >
                        {s.label}
                      </a>
                    ))}
                </div>
              </div>
            )}

            {/* Bottom Copyright + Powered By */}
            <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <div>{cms.footer.copyrightText}</div>
              <div className="text-amber-400/90 font-semibold">
                {cms.footer.poweredByText}
              </div>
            </div>
          </footer>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="relative space-y-12 pb-28">
      {/* 1. FLUSH SCREEN-EDGE CURVED CONTROL BAR (Inspired by Reference Image 1) */}
      <CurvedEdgeControlBar
        themeMode={themeMode}
        onToggleTheme={onToggleTheme}
        lang={lang}
        onToggleLang={onToggleLang}
        currency={currency}
        onToggleCurrency={onToggleCurrency}
        onOpenCmsEditor={onOpenCmsEditor}
      />

      {/* 2. FLOATING MODERN PILL SIDEBAR MENU (Inspired by Reference Image 2) */}
      <FloatingSidebarMenu
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentView="landing"
        onChangeView={onChangeView}
        onOpenBooking={() => onOpenBookingModal()}
        onOpenConcierge={onOpenConcierge}
        themeMode={themeMode}
        companyName={cms.header.companyName}
        logoUrl={cms.header.logoUrl}
        lang={lang}
      />

      {/* RENDER ALL ENABLED MODULES IN DYNAMIC CMS ORDER */}
      {cms.moduleOrder
        .filter((mod) => mod.enabled)
        .map((mod) => renderModuleById(mod.id))}

      {/* 3. SLEEK ICON-ONLY BOTTOM DOCK (Zero text labels) */}
      <IconOnlyBottomDock
        themeMode={themeMode}
        accentBg={accentBg}
        accentText={accentText}
        onOpenBookingModal={() => onOpenBookingModal()}
        onSwitchRole={onSwitchRole}
        onOpenConcierge={onOpenConcierge}
      />

      {/* =================================================================== */}
      {/* MODALS: PDF PROFILE / ABOUT MORE / ALL SERVICES / BLOG READER       */}
      {/* =================================================================== */}
      {showAboutModal !== 'none' && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-black text-white">
                {showAboutModal === 'pdf'
                  ? `الملف التعريفي الرسمي — ${cms.header.companyName} (PDF Profile)`
                  : cms.about.sectionTitle}
              </h3>
              <button onClick={() => setShowAboutModal('none')} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p>{cms.about.paragraph}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {cms.about.pillars.map((p) => (
                  <div key={p.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <div className={`font-black ${accentText} mb-1`}>{p.label}: {p.title}</div>
                    <p className="text-xs text-slate-400">{p.content}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => window.print()}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs ${accentBg} flex items-center gap-2`}
              >
                <Printer className="w-4 h-4" />
                <span>طباعة / حفظ كملف PDF</span>
              </button>
              <button
                onClick={() => setShowAboutModal('none')}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Services Page Modal */}
      {showAllServicesModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-black text-white">الدليل الشامل لكافة خدمات تأجير السيارات</h3>
                <p className="text-xs text-slate-400">جميع خدمات {cms.header.companyName} المتاحة للتعاقد الفوري ({cms.servicesCatalog.services.length} خدمة)</p>
              </div>
              <button onClick={() => setShowAllServicesModal(false)} className="p-2 rounded-xl bg-slate-800 text-slate-300">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cms.servicesCatalog.services.map((srv) => (
                <div key={srv.id} className="p-4 rounded-2xl border border-slate-800 bg-slate-950 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <img src={srv.image} alt={srv.title} referrerPolicy="no-referrer" className="w-full h-36 rounded-xl object-cover" />
                    <span className="text-[10px] text-amber-400 font-bold">{srv.category}</span>
                    <h4 className="text-sm font-bold text-white">{srv.title}</h4>
                    <p className="text-xs text-slate-400">{srv.subtitle}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400">{srv.priceText}</span>
                    <button
                      onClick={() => {
                        setShowAllServicesModal(false);
                        onOpenBookingModal();
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${accentBg}`}
                    >
                      احجز الآن
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Blog Article Reader Modal */}
      {readingPost && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className={`text-xs font-bold ${accentText}`}>{readingPost.category}</span>
              <button onClick={() => setReadingPost(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <img src={readingPost.image} alt={readingPost.title} referrerPolicy="no-referrer" className="w-full h-56 rounded-2xl object-cover" />
            <h2 className="text-xl font-black text-white">{readingPost.title}</h2>
            <div className="text-xs text-slate-400">
              الكاتب: {readingPost.author} · {readingPost.publishDate} · {readingPost.readTime}
            </div>
            <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">
              {readingPost.content}
            </p>
          </div>
        </div>
      )}

      {/* All Blogs Portal Modal */}
      {showAllBlogsModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-black text-white">المدونة الرئيسية · جميع التدوينات والمقالات</h3>
              <button onClick={() => setShowAllBlogsModal(false)} className="p-2 rounded-xl bg-slate-800 text-slate-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cms.blog.posts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => {
                    setShowAllBlogsModal(false);
                    setReadingPost(post);
                  }}
                  className="p-4 rounded-2xl border border-slate-800 bg-slate-950 hover:border-amber-400 cursor-pointer space-y-2"
                >
                  <img src={post.image} alt={post.title} referrerPolicy="no-referrer" className="w-full h-40 rounded-xl object-cover" />
                  <div className="text-[11px] text-amber-400">{post.category} · {post.publishDate}</div>
                  <h4 className="text-sm font-bold text-white">{post.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{post.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
