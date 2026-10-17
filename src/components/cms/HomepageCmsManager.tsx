import React, { useState } from 'react';
import {
  HomepageCmsConfig,
  ModuleId,
  ThemePalette,
  TickerCategory,
  TestimonialCardStyle,
  BrandDisplayMode,
  PromoLayoutMode
} from '../../types/cms';
import { ImageSourceField } from './ImageSourceField';
import {
  generatePackageFromPrompt,
  generatePromoFromPrompt
} from '../../services/aiStudioGenerator';
import {
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Plus,
  Trash2,
  Edit3,
  X,
  Sparkles,
  Palette,
  Inbox,
  Layers,
  Sliders,
  RotateCcw,
  Check
} from 'lucide-react';

interface HomepageCmsManagerProps {
  cms: HomepageCmsConfig;
  onUpdateCms: (updated: HomepageCmsConfig) => void;
  onResetDefaultCms: () => void;
  onPreviewLive: () => void;
}

export const HomepageCmsManager: React.FC<HomepageCmsManagerProps> = ({
  cms,
  onUpdateCms,
  onResetDefaultCms,
  onPreviewLive
}) => {
  const [activeModule, setActiveModule] = useState<ModuleId>('header_hero');
  const [isReorderModalOpen, setIsReorderModalOpen] = useState(false);

  // Track which single item is currently expanded for editing (Zero pre-opened card clutter!)
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  // AI Package & Promo Prompt States
  const [aiPackagePrompt, setAiPackagePrompt] = useState('');
  const [isGeneratingPkg, setIsGeneratingPkg] = useState(false);
  const [aiPromoPrompt, setAiPromoPrompt] = useState('');
  const [isGeneratingPromo, setIsGeneratingPromo] = useState(false);

  const toggleEditItem = (id: string) => {
    setEditingItemId((prev) => (prev === id ? null : id));
  };

  const moveModule = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...cms.moduleOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;
    onUpdateCms({ ...cms, moduleOrder: newOrder });
  };

  const toggleModuleEnabled = (id: ModuleId) => {
    const newOrder = cms.moduleOrder.map((m) =>
      m.id === id ? { ...m, enabled: !m.enabled } : m
    );
    onUpdateCms({ ...cms, moduleOrder: newOrder });
  };

  const pendingTestimonialsCount = cms.testimonials.items.filter(
    (t) => t.status === 'pending'
  ).length;
  const unreadInboxCount = cms.contact.inboxMessages.filter((m) => !m.read).length;

  const handleGenerateAiPackage = async () => {
    if (!aiPackagePrompt.trim()) return;
    setIsGeneratingPkg(true);
    try {
      const pkg = await generatePackageFromPrompt(aiPackagePrompt);
      onUpdateCms({
        ...cms,
        packages: {
          ...cms.packages,
          packages: [pkg, ...cms.packages.packages]
        }
      });
      setEditingItemId(pkg.id);
      setAiPackagePrompt('');
    } finally {
      setIsGeneratingPkg(false);
    }
  };

  const handleGenerateAiPromo = async () => {
    if (!aiPromoPrompt.trim()) return;
    setIsGeneratingPromo(true);
    try {
      const promo = await generatePromoFromPrompt(aiPromoPrompt);
      onUpdateCms({
        ...cms,
        promos: {
          ...cms.promos,
          items: [promo, ...cms.promos.items]
        }
      });
      setEditingItemId(promo.id);
      setAiPromoPrompt('');
    } finally {
      setIsGeneratingPromo(false);
    }
  };

  const activeModuleMeta = cms.moduleOrder.find((m) => m.id === activeModule);

  return (
    <div className="space-y-4 pb-20">
      {/* Compact Top CMS Action Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
            <Sliders className="w-3.5 h-3.5 shrink-0" />
            <span>محرر أقسام الصفحة الرئيسية (CMS)</span>
          </div>
          <h2 className="text-sm sm:text-base font-black text-slate-100 truncate mt-0.5">
            اختر القسم من الشريط أدناه لتعديل محتواه مباشرة بدون تمرير
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Theme Selector */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]">
            <Palette className="w-3.5 h-3.5 text-amber-400 mx-1" />
            {(
              [
                { id: 'obsidian-gold', label: 'الذهب الليلي' },
                { id: 'carbon-crimson', label: 'الأحمر الرياضي' },
                { id: 'alabaster-amber', label: 'النهار العاجي' }
              ] as { id: ThemePalette; label: string }[]
            ).map((th) => (
              <button
                key={th.id}
                type="button"
                onClick={() => onUpdateCms({ ...cms, themePalette: th.id })}
                className={`px-2 py-1 rounded-lg font-bold transition whitespace-nowrap ${
                  cms.themePalette === th.id
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {th.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsReorderModalOpen(true)}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 font-bold text-xs flex items-center gap-1.5 transition"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>ترتيب وإخفاء الأقسام</span>
          </button>

          <button
            type="button"
            onClick={onPreviewLive}
            className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>معاينة الرئيسية</span>
          </button>

          <button
            type="button"
            onClick={onResetDefaultCms}
            className="p-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
            title="استعادة الإعدادات الافتراضية"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* MOBILE-FIRST STICKY HORIZONTAL MODULE SELECTOR BAR (Zero Scroll Up/Down!) */}
      <div className="sticky top-20 z-30 bg-slate-950/95 backdrop-blur-md border border-slate-800 rounded-2xl p-2 shadow-xl">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          {cms.moduleOrder.map((mod, idx) => {
            const isSelected = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => {
                  setActiveModule(mod.id);
                  setEditingItemId(null);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                    : mod.enabled
                    ? 'bg-slate-900 text-slate-200 hover:bg-slate-800 border border-slate-800'
                    : 'bg-slate-900/40 text-slate-500 border border-slate-900 line-through'
                }`}
              >
                <span className="font-mono text-[10px] opacity-75">{idx + 1}.</span>
                <span>{mod.titleAr}</span>
                {mod.id === 'testimonials' && pendingTestimonialsCount > 0 && (
                  <span className="px-1.5 py-0.2 text-[10px] rounded bg-red-500 text-white font-black">
                    {pendingTestimonialsCount}
                  </span>
                )}
                {mod.id === 'contact_us' && unreadInboxCount > 0 && (
                  <span className="px-1.5 py-0.2 text-[10px] rounded bg-red-500 text-white font-black">
                    {unreadInboxCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Focused Active Module Editor Area */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-5">
        {/* Active Module Status Header */}
        {activeModuleMeta && (
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm sm:text-base font-black text-amber-400">
                {activeModuleMeta.titleAr}
              </h3>
              <p className="text-[11px] text-slate-400">
                {activeModuleMeta.enabled
                  ? 'هذا القسم مفعّل ويظهر حالياً في الصفحة الرئيسية'
                  : 'هذا القسم مخفي حالياً عن الزوار'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => toggleModuleEnabled(activeModuleMeta.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition ${
                activeModuleMeta.enabled
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              {activeModuleMeta.enabled ? (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>ظاهر في الرئيسية</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>مخفي (اضغط للإظهار)</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* 1. HEADER & HERO MODULE EDITOR */}
        {activeModule === 'header_hero' && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  اسم الشركة (عربي):
                </label>
                <input
                  type="text"
                  value={cms.header.companyName}
                  onChange={(e) =>
                    onUpdateCms({
                      ...cms,
                      header: { ...cms.header, companyName: e.target.value }
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  السلوجون (الشعار اللفظي):
                </label>
                <input
                  type="text"
                  value={cms.header.slogan}
                  onChange={(e) =>
                    onUpdateCms({
                      ...cms,
                      header: { ...cms.header, slogan: e.target.value }
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                العنوان الترحيبي الرئيسي في الهيرو:
              </label>
              <input
                type="text"
                value={cms.header.welcomeTitle}
                onChange={(e) =>
                  onUpdateCms({
                    ...cms,
                    header: { ...cms.header, welcomeTitle: e.target.value }
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                العنوان الفرعي التوضيحي:
              </label>
              <textarea
                rows={2}
                value={cms.header.welcomeSubtitle}
                onChange={(e) =>
                  onUpdateCms({
                    ...cms,
                    header: { ...cms.header, welcomeSubtitle: e.target.value }
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ImageSourceField
                label="شعار الشركة (Logo)"
                value={cms.header.logoUrl}
                onChange={(url) =>
                  onUpdateCms({ ...cms, header: { ...cms.header, logoUrl: url } })
                }
              />
              <ImageSourceField
                label="صورة خلفية الهيرو الرئيسية"
                value={cms.header.backgroundImage}
                onChange={(url) =>
                  onUpdateCms({
                    ...cms,
                    header: { ...cms.header, backgroundImage: url }
                  })
                }
              />
            </div>
          </div>
        )}

        {/* 2. VERTICAL SLIDER EDITOR (Compact List + On-Demand Edit) */}
        {activeModule === 'vertical_slider' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">مدة عرض الشريحة (ثواني):</span>
                <input
                  type="number"
                  min={3}
                  max={20}
                  value={cms.verticalSlider.slideDurationSeconds}
                  onChange={(e) =>
                    onUpdateCms({
                      ...cms,
                      verticalSlider: {
                        ...cms.verticalSlider,
                        slideDurationSeconds: Math.max(
                          3,
                          parseInt(e.target.value) || 6
                        )
                      }
                    })
                  }
                  className="w-20 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-amber-400 font-mono font-bold"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  const newId = `vs-${Date.now()}`;
                  const newSlide = {
                    id: newId,
                    title: 'شريحة عرض جديدة للأسطول',
                    subtitle: 'وصف مختصر للشريحة والسيارة المعروضة',
                    backgroundImage:
                      '/src/assets/images/car_landcruiser_gr_1790624456804.jpg',
                    buttonText: 'احجز الآن',
                    buttonLink: '#booking',
                    priceTag: '90,000 ر.ي / يوم',
                    badgeText: 'جديد 2024'
                  };
                  onUpdateCms({
                    ...cms,
                    verticalSlider: {
                      ...cms.verticalSlider,
                      slides: [newSlide, ...cms.verticalSlider.slides]
                    }
                  });
                  setEditingItemId(newId);
                }}
                className="px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة شريحة</span>
              </button>
            </div>

            {/* Compact Rows */}
            <div className="space-y-2">
              {cms.verticalSlider.slides.map((slide, idx) => {
                const isOpen = editingItemId === slide.id;
                return (
                  <div
                    key={slide.id}
                    className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden"
                  >
                    <div className="p-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={slide.backgroundImage}
                          alt={slide.title}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-800 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white truncate">
                            {idx + 1}. {slide.title}
                          </div>
                          <div className="text-[11px] text-amber-400 font-mono truncate">
                            {slide.priceTag || slide.subtitle}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleEditItem(slide.id)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ${
                            isOpen
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                          }`}
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>{isOpen ? 'إغلاق' : 'تعديل'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateCms({
                              ...cms,
                              verticalSlider: {
                                ...cms.verticalSlider,
                                slides: cms.verticalSlider.slides.filter(
                                  (s) => s.id !== slide.id
                                )
                              }
                            })
                          }
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white"
                          title="حذف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {isOpen && (
                      <div className="p-4 border-t border-slate-800 bg-slate-900/60 space-y-3 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-slate-400 mb-1">العنوان:</label>
                            <input
                              type="text"
                              value={slide.title}
                              onChange={(e) => {
                                const updated = cms.verticalSlider.slides.map((s) =>
                                  s.id === slide.id
                                    ? { ...s, title: e.target.value }
                                    : s
                                );
                                onUpdateCms({
                                  ...cms,
                                  verticalSlider: {
                                    ...cms.verticalSlider,
                                    slides: updated
                                  }
                                });
                              }}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-400 mb-1">السعر / الوسم:</label>
                            <input
                              type="text"
                              value={slide.priceTag || ''}
                              onChange={(e) => {
                                const updated = cms.verticalSlider.slides.map((s) =>
                                  s.id === slide.id
                                    ? { ...s, priceTag: e.target.value }
                                    : s
                                );
                                onUpdateCms({
                                  ...cms,
                                  verticalSlider: {
                                    ...cms.verticalSlider,
                                    slides: updated
                                  }
                                });
                              }}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-amber-400 font-mono"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-slate-400 mb-1">الوصف الفرعي:</label>
                          <input
                            type="text"
                            value={slide.subtitle}
                            onChange={(e) => {
                              const updated = cms.verticalSlider.slides.map((s) =>
                                s.id === slide.id
                                  ? { ...s, subtitle: e.target.value }
                                  : s
                              );
                              onUpdateCms({
                                ...cms,
                                verticalSlider: {
                                  ...cms.verticalSlider,
                                  slides: updated
                                }
                              });
                            }}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                          />
                        </div>
                        <ImageSourceField
                          label="صورة الشريحة"
                          value={slide.backgroundImage}
                          onChange={(url) => {
                            const updated = cms.verticalSlider.slides.map((s) =>
                              s.id === slide.id ? { ...s, backgroundImage: url } : s
                            );
                            onUpdateCms({
                              ...cms,
                              verticalSlider: {
                                ...cms.verticalSlider,
                                slides: updated
                              }
                            });
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. NEWS TICKER EDITOR */}
        {activeModule === 'news_ticker' && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  const newId = `tk-${Date.now()}`;
                  const newItem = {
                    id: newId,
                    category: 'offer' as TickerCategory,
                    text: 'عنصر جديد في الشريط المتحرك'
                  };
                  onUpdateCms({
                    ...cms,
                    ticker: { ...cms.ticker, items: [newItem, ...cms.ticker.items] }
                  });
                  setEditingItemId(newId);
                }}
                className="px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة خبر / عرض للشريط</span>
              </button>
            </div>

            <div className="space-y-2">
              {cms.ticker.items.map((item) => {
                const isOpen = editingItemId === item.id;
                return (
                  <div
                    key={item.id}
                    className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden"
                  >
                    <div className="p-3 flex items-center justify-between gap-2 text-xs">
                      <div className="truncate font-bold text-slate-200">
                        {item.text}
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleEditItem(item.id)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 font-bold"
                        >
                          {isOpen ? 'إغلاق' : 'تعديل'}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateCms({
                              ...cms,
                              ticker: {
                                ...cms.ticker,
                                items: cms.ticker.items.filter(
                                  (it) => it.id !== item.id
                                )
                              }
                            })
                          }
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    {isOpen && (
                      <div className="p-3 border-t border-slate-800 bg-slate-900/60 flex flex-col sm:flex-row gap-2 text-xs">
                        <select
                          value={item.category}
                          onChange={(e) => {
                            const updated = cms.ticker.items.map((it) =>
                              it.id === item.id
                                ? {
                                    ...it,
                                    category: e.target.value as TickerCategory
                                  }
                                : it
                            );
                            onUpdateCms({
                              ...cms,
                              ticker: { ...cms.ticker, items: updated }
                            });
                          }}
                          className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-amber-400 font-bold"
                        >
                          <option value="news">أخبار</option>
                          <option value="offer">عرض مميز</option>
                          <option value="ad">إعلان</option>
                          <option value="marketing">عبارات تسويقية</option>
                        </select>
                        <input
                          type="text"
                          value={item.text}
                          onChange={(e) => {
                            const updated = cms.ticker.items.map((it) =>
                              it.id === item.id ? { ...it, text: e.target.value } : it
                            );
                            onUpdateCms({
                              ...cms,
                              ticker: { ...cms.ticker, items: updated }
                            });
                          }}
                          className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. ABOUT US MODULE EDITOR */}
        {activeModule === 'about_us' && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">عنوان القسم:</label>
                <input
                  type="text"
                  value={cms.about.sectionTitle}
                  onChange={(e) =>
                    onUpdateCms({
                      ...cms,
                      about: { ...cms.about, sectionTitle: e.target.value }
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">اسم المدير العام:</label>
                <input
                  type="text"
                  value={cms.about.directorName}
                  onChange={(e) =>
                    onUpdateCms({
                      ...cms,
                      about: { ...cms.about, directorName: e.target.value }
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">الفقرة التعريفية:</label>
              <textarea
                rows={3}
                value={cms.about.paragraph}
                onChange={(e) =>
                  onUpdateCms({
                    ...cms,
                    about: { ...cms.about, paragraph: e.target.value }
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
              />
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-300">
                  ركائز المؤسسة ({cms.about.pillars.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const id = `pil-${Date.now()}`;
                    onUpdateCms({
                      ...cms,
                      about: {
                        ...cms.about,
                        pillars: [
                          ...cms.about.pillars,
                          {
                            id,
                            label: 'قيمنا',
                            title: 'عنوان جديد',
                            content: 'التفاصيل...'
                          }
                        ]
                      }
                    });
                    setEditingItemId(id);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-black"
                >
                  + إضافة فقرة
                </button>
              </div>
              {cms.about.pillars.map((pil) => {
                const isOpen = editingItemId === pil.id;
                return (
                  <div
                    key={pil.id}
                    className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden"
                  >
                    <div className="p-3 flex items-center justify-between gap-2">
                      <div className="truncate">
                        <span className="text-amber-400 font-bold">{pil.label}: </span>
                        <span className="text-white font-bold">{pil.title}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleEditItem(pil.id)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 font-bold"
                        >
                          {isOpen ? 'إغلاق' : 'تعديل'}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateCms({
                              ...cms,
                              about: {
                                ...cms.about,
                                pillars: cms.about.pillars.filter(
                                  (p) => p.id !== pil.id
                                )
                              }
                            })
                          }
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    {isOpen && (
                      <div className="p-3 border-t border-slate-800 bg-slate-900/60 space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={pil.label}
                            onChange={(e) => {
                              const updated = cms.about.pillars.map((p) =>
                                p.id === pil.id ? { ...p, label: e.target.value } : p
                              );
                              onUpdateCms({
                                ...cms,
                                about: { ...cms.about, pillars: updated }
                              });
                            }}
                            className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-amber-400"
                          />
                          <input
                            type="text"
                            value={pil.title}
                            onChange={(e) => {
                              const updated = cms.about.pillars.map((p) =>
                                p.id === pil.id ? { ...p, title: e.target.value } : p
                              );
                              onUpdateCms({
                                ...cms,
                                about: { ...cms.about, pillars: updated }
                              });
                            }}
                            className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                          />
                        </div>
                        <textarea
                          rows={2}
                          value={pil.content}
                          onChange={(e) => {
                            const updated = cms.about.pillars.map((p) =>
                              p.id === pil.id ? { ...p, content: e.target.value } : p
                            );
                            onUpdateCms({
                              ...cms,
                              about: { ...cms.about, pillars: updated }
                            });
                          }}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}


        {/* 6. SERVICES CATALOG EDITOR (Compact List) */}
        {activeModule === 'services_catalog' && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">
                قائمة الخدمات ({cms.servicesCatalog.services.length})
              </span>
              <button
                type="button"
                onClick={() => {
                  const newId = `srv-${Date.now()}`;
                  const newSrv = {
                    id: newId,
                    title: 'خدمة تأجير جديدة',
                    subtitle: 'وصف مختصر للخدمة المقدمة',
                    category: cms.servicesCatalog.categories[1] || 'تأجير فاخر',
                    priceText: '75,000 ر.ي / يوم',
                    image: '/src/assets/images/car_lexus_lx600_1790624445559.jpg',
                    badge: 'خدمة مميزة',
                    features: ['ضمانة ميسرة', 'توصيل فوري', 'دعم 24/7']
                  };
                  onUpdateCms({
                    ...cms,
                    servicesCatalog: {
                      ...cms.servicesCatalog,
                      services: [newSrv, ...cms.servicesCatalog.services]
                    }
                  });
                  setEditingItemId(newId);
                }}
                className="px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة خدمة</span>
              </button>
            </div>

            <div className="space-y-2">
              {cms.servicesCatalog.services.map((srv) => {
                const isOpen = editingItemId === srv.id;
                return (
                  <div
                    key={srv.id}
                    className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden"
                  >
                    <div className="p-3 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-bold text-white truncate">
                          {srv.title}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {srv.category} ·{' '}
                          <span className="text-amber-400 font-mono">
                            {srv.priceText}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleEditItem(srv.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-200 font-bold"
                        >
                          {isOpen ? 'إغلاق' : 'تعديل'}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateCms({
                              ...cms,
                              servicesCatalog: {
                                ...cms.servicesCatalog,
                                services: cms.servicesCatalog.services.filter(
                                  (s) => s.id !== srv.id
                                )
                              }
                            })
                          }
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    {isOpen && (
                      <div className="p-3 border-t border-slate-800 bg-slate-900/60 space-y-2.5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={srv.title}
                            onChange={(e) => {
                              const updated = cms.servicesCatalog.services.map((s) =>
                                s.id === srv.id ? { ...s, title: e.target.value } : s
                              );
                              onUpdateCms({
                                ...cms,
                                servicesCatalog: {
                                  ...cms.servicesCatalog,
                                  services: updated
                                }
                              });
                            }}
                            placeholder="اسم الخدمة"
                            className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-bold"
                          />
                          <input
                            type="text"
                            value={srv.priceText}
                            onChange={(e) => {
                              const updated = cms.servicesCatalog.services.map((s) =>
                                s.id === srv.id
                                  ? { ...s, priceText: e.target.value }
                                  : s
                              );
                              onUpdateCms({
                                ...cms,
                                servicesCatalog: {
                                  ...cms.servicesCatalog,
                                  services: updated
                                }
                              });
                            }}
                            placeholder="السعر"
                            className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-amber-400 font-mono"
                          />
                        </div>
                        <input
                          type="text"
                          value={srv.subtitle}
                          onChange={(e) => {
                            const updated = cms.servicesCatalog.services.map((s) =>
                              s.id === srv.id
                                ? { ...s, subtitle: e.target.value }
                                : s
                            );
                            onUpdateCms({
                              ...cms,
                              servicesCatalog: {
                                ...cms.servicesCatalog,
                                services: updated
                              }
                            });
                          }}
                          placeholder="الوصف المختصر"
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 7A. B2B PACKAGES EDITOR (Compact List) */}
        {activeModule === 'b2b_packages' && (
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/5 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={aiPackagePrompt}
                onChange={(e) => setAiPackagePrompt(e.target.value)}
                placeholder="وصف باقة جديدة لتوليدها تلقائياً..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
              />
              <button
                type="button"
                onClick={handleGenerateAiPackage}
                disabled={isGeneratingPkg || !aiPackagePrompt.trim()}
                className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isGeneratingPkg ? 'جارِ الإنشاء...' : '+ توليد باقة'}</span>
              </button>
            </div>

            <div className="space-y-2">
              {cms.packages.packages.map((pkg) => {
                const isOpen = editingItemId === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden"
                  >
                    <div className="p-3 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-bold text-white truncate">
                          {pkg.title}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {pkg.sectorTag} ·{' '}
                          <span className="text-emerald-400 font-mono">
                            {pkg.priceText}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleEditItem(pkg.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-200 font-bold"
                        >
                          {isOpen ? 'إغلاق' : 'تعديل'}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateCms({
                              ...cms,
                              packages: {
                                ...cms.packages,
                                packages: cms.packages.packages.filter(
                                  (p) => p.id !== pkg.id
                                )
                              }
                            })
                          }
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    {isOpen && (
                      <div className="p-3 border-t border-slate-800 bg-slate-900/60 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={pkg.title}
                          onChange={(e) => {
                            const updated = cms.packages.packages.map((p) =>
                              p.id === pkg.id ? { ...p, title: e.target.value } : p
                            );
                            onUpdateCms({
                              ...cms,
                              packages: { ...cms.packages, packages: updated }
                            });
                          }}
                          className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                        />
                        <input
                          type="text"
                          value={pkg.sectorTag}
                          onChange={(e) => {
                            const updated = cms.packages.packages.map((p) =>
                              p.id === pkg.id
                                ? { ...p, sectorTag: e.target.value }
                                : p
                            );
                            onUpdateCms({
                              ...cms,
                              packages: { ...cms.packages, packages: updated }
                            });
                          }}
                          className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-amber-400"
                        />
                        <input
                          type="text"
                          value={pkg.priceText}
                          onChange={(e) => {
                            const updated = cms.packages.packages.map((p) =>
                              p.id === pkg.id
                                ? { ...p, priceText: e.target.value }
                                : p
                            );
                            onUpdateCms({
                              ...cms,
                              packages: { ...cms.packages, packages: updated }
                            });
                          }}
                          className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-emerald-400 font-mono"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 7B. TESTIMONIALS EDITOR */}
        {activeModule === 'testimonials' && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select
                value={cms.testimonials.cardStyle}
                onChange={(e) =>
                  onUpdateCms({
                    ...cms,
                    testimonials: {
                      ...cms.testimonials,
                      cardStyle: e.target.value as TestimonialCardStyle
                    }
                  })
                }
                className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-amber-400 font-bold"
              >
                <option value="full">عرض كامل (تقييم + صورة + نص)</option>
                <option value="avatar_text">صورة واسم ونص</option>
                <option value="minimal">مختصر بدون صورة</option>
              </select>
              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-800 bg-slate-950 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cms.testimonials.enablePublicForm}
                  onChange={(e) =>
                    onUpdateCms({
                      ...cms,
                      testimonials: {
                        ...cms.testimonials,
                        enablePublicForm: e.target.checked
                      }
                    })
                  }
                />
                <span className="text-slate-200 font-bold">
                  تفعيل نموذج إضافة تقييم للزوار
                </span>
              </label>
            </div>

            <div className="space-y-2">
              {cms.testimonials.items.map((t) => (
                <div
                  key={t.id}
                  className="p-3 rounded-xl border border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-white truncate">
                      {t.name} · <span className="text-amber-400">{t.role}</span>
                    </div>
                    <p className="text-slate-400 truncate mt-0.5">{t.comment}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {t.status !== 'approved' ? (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = cms.testimonials.items.map((item) =>
                            item.id === t.id
                              ? { ...item, status: 'approved' as const }
                              : item
                          );
                          onUpdateCms({
                            ...cms,
                            testimonials: { ...cms.testimonials, items: updated }
                          });
                        }}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500 text-slate-950 font-black"
                      >
                        اعتماد
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = cms.testimonials.items.map((item) =>
                            item.id === t.id
                              ? { ...item, status: 'hidden' as const }
                              : item
                          );
                          onUpdateCms({
                            ...cms,
                            testimonials: { ...cms.testimonials, items: updated }
                          });
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300"
                      >
                        إخفاء
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        const updated = cms.testimonials.items.filter(
                          (item) => item.id !== t.id
                        );
                        onUpdateCms({
                          ...cms,
                          testimonials: { ...cms.testimonials, items: updated }
                        });
                      }}
                      className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. BRANDS & PARTNERS EDITOR */}
        {activeModule === 'brands_partners' && (
          <div className="space-y-4 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <select
                value={cms.brands.displayMode}
                onChange={(e) =>
                  onUpdateCms({
                    ...cms,
                    brands: {
                      ...cms.brands,
                      displayMode: e.target.value as BrandDisplayMode
                    }
                  })
                }
                className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-amber-400 font-bold"
              >
                <option value="logo_only">الشعارات فقط</option>
                <option value="logo_label">الشعار مع الاسم</option>
                <option value="logo_text_rating">الشعار مع الوصف والتقييم</option>
              </select>

              <button
                type="button"
                onClick={() => {
                  const newId = `br-${Date.now()}`;
                  onUpdateCms({
                    ...cms,
                    brands: {
                      ...cms.brands,
                      items: [
                        {
                          id: newId,
                          name: 'شريك نجاح جديد',
                          categoryLabel: 'شريك استراتيجي',
                          logoUrl: '',
                          description: 'وصف الشراكة',
                          rating: 5
                        },
                        ...cms.brands.items
                      ]
                    }
                  });
                  setEditingItemId(newId);
                }}
                className="px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 font-black"
              >
                + إضافة شريك
              </button>
            </div>

            <div className="space-y-2">
              {cms.brands.items.map((b) => {
                const isOpen = editingItemId === b.id;
                return (
                  <div
                    key={b.id}
                    className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden"
                  >
                    <div className="p-3 flex items-center justify-between gap-2">
                      <div className="truncate font-bold text-white">
                        {b.name}{' '}
                        <span className="text-slate-400 font-normal">
                          · {b.description}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleEditItem(b.id)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 font-bold"
                        >
                          {isOpen ? 'إغلاق' : 'تعديل'}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateCms({
                              ...cms,
                              brands: {
                                ...cms.brands,
                                items: cms.brands.items.filter(
                                  (item) => item.id !== b.id
                                )
                              }
                            })
                          }
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    {isOpen && (
                      <div className="p-3 border-t border-slate-800 bg-slate-900/60 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={b.name}
                          onChange={(e) => {
                            const updated = cms.brands.items.map((item) =>
                              item.id === b.id
                                ? { ...item, name: e.target.value }
                                : item
                            );
                            onUpdateCms({
                              ...cms,
                              brands: { ...cms.brands, items: updated }
                            });
                          }}
                          className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                        />
                        <input
                          type="text"
                          value={b.description}
                          onChange={(e) => {
                            const updated = cms.brands.items.map((item) =>
                              item.id === b.id
                                ? { ...item, description: e.target.value }
                                : item
                            );
                            onUpdateCms({
                              ...cms,
                              brands: { ...cms.brands, items: updated }
                            });
                          }}
                          className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-300"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 9. FEATURED PROMOS EDITOR */}
        {activeModule === 'featured_promos' && (
          <div className="space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={cms.promos.layoutMode}
                onChange={(e) =>
                  onUpdateCms({
                    ...cms,
                    promos: {
                      ...cms.promos,
                      layoutMode: e.target.value as PromoLayoutMode
                    }
                  })
                }
                className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-amber-400 font-bold"
              >
                <option value="carousel">كاروسال منزلق</option>
                <option value="grid_4">رباعية متساوية</option>
                <option value="split_2_horizontal">ثنائية أفقية</option>
                <option value="bento_3_mixed">ثلاثية مقسمة</option>
              </select>

              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={aiPromoPrompt}
                  onChange={(e) => setAiPromoPrompt(e.target.value)}
                  placeholder="وصف عرض ترويجي جديد..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                />
                <button
                  type="button"
                  onClick={handleGenerateAiPromo}
                  disabled={isGeneratingPromo || !aiPromoPrompt.trim()}
                  className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-black whitespace-nowrap"
                >
                  + إضافة عرض
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {cms.promos.items.map((pr) => {
                const isOpen = editingItemId === pr.id;
                return (
                  <div
                    key={pr.id}
                    className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden"
                  >
                    <div className="p-3 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-bold text-white truncate">
                          {pr.title}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {pr.subtitle}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleEditItem(pr.id)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 font-bold"
                        >
                          {isOpen ? 'إغلاق' : 'تعديل'}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateCms({
                              ...cms,
                              promos: {
                                ...cms.promos,
                                items: cms.promos.items.filter(
                                  (item) => item.id !== pr.id
                                )
                              }
                            })
                          }
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    {isOpen && (
                      <div className="p-3 border-t border-slate-800 bg-slate-900/60 space-y-2">
                        <input
                          type="text"
                          value={pr.title}
                          onChange={(e) => {
                            const updated = cms.promos.items.map((item) =>
                              item.id === pr.id
                                ? { ...item, title: e.target.value }
                                : item
                            );
                            onUpdateCms({
                              ...cms,
                              promos: { ...cms.promos, items: updated }
                            });
                          }}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-bold"
                        />
                        <input
                          type="text"
                          value={pr.subtitle}
                          onChange={(e) => {
                            const updated = cms.promos.items.map((item) =>
                              item.id === pr.id
                                ? { ...item, subtitle: e.target.value }
                                : item
                            );
                            onUpdateCms({
                              ...cms,
                              promos: { ...cms.promos, items: updated }
                            });
                          }}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-300"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 10. BLOG SECTION EDITOR */}
        {activeModule === 'blog_section' && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">
                المقالات المنشورة ({cms.blog.posts.length})
              </span>
              <button
                type="button"
                onClick={() => {
                  const newId = `blg-${Date.now()}`;
                  const newPost = {
                    id: newId,
                    title: 'مقال جديد حول خدمات تأجير السيارات في اليمن',
                    excerpt: 'ملخص قصير للمقال يظهر في الصفحة الرئيسية...',
                    content: 'المحتوى الكامل للمقال...',
                    category: 'دليل التأجير',
                    image: '/src/assets/images/hero_sanaa_fleet_1790624432645.jpg',
                    author: 'إدارة التحرير',
                    publishDate: new Date().toISOString().split('T')[0],
                    readTime: '4 دقائق قراءة',
                    featuredInHome: true
                  };
                  onUpdateCms({
                    ...cms,
                    blog: { ...cms.blog, posts: [newPost, ...cms.blog.posts] }
                  });
                  setEditingItemId(newId);
                }}
                className="px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 font-black"
              >
                + إضافة مقال
              </button>
            </div>

            <div className="space-y-2">
              {cms.blog.posts.map((post) => {
                const isOpen = editingItemId === post.id;
                return (
                  <div
                    key={post.id}
                    className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden"
                  >
                    <div className="p-3 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-bold text-white truncate">
                          {post.title}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {post.category} · {post.publishDate}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleEditItem(post.id)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 font-bold"
                        >
                          {isOpen ? 'إغلاق' : 'تعديل'}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateCms({
                              ...cms,
                              blog: {
                                ...cms.blog,
                                posts: cms.blog.posts.filter(
                                  (p) => p.id !== post.id
                                )
                              }
                            })
                          }
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    {isOpen && (
                      <div className="p-3 border-t border-slate-800 bg-slate-900/60 space-y-2">
                        <input
                          type="text"
                          value={post.title}
                          onChange={(e) => {
                            const updated = cms.blog.posts.map((p) =>
                              p.id === post.id
                                ? { ...p, title: e.target.value }
                                : p
                            );
                            onUpdateCms({
                              ...cms,
                              blog: { ...cms.blog, posts: updated }
                            });
                          }}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-bold"
                        />
                        <textarea
                          rows={2}
                          value={post.excerpt}
                          onChange={(e) => {
                            const updated = cms.blog.posts.map((p) =>
                              p.id === post.id
                                ? { ...p, excerpt: e.target.value }
                                : p
                            );
                            onUpdateCms({
                              ...cms,
                              blog: { ...cms.blog, posts: updated }
                            });
                          }}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-300"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 11. FAQ SECTION EDITOR */}
        {activeModule === 'faq_section' && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">
                الأسئلة الشائعة ({cms.faq.items.length})
              </span>
              <button
                type="button"
                onClick={() => {
                  const newId = `faq-${Date.now()}`;
                  onUpdateCms({
                    ...cms,
                    faq: {
                      ...cms.faq,
                      items: [
                        {
                          id: newId,
                          category: 'عام',
                          question: 'سؤال شائع جديد؟',
                          answer: 'الإجابة التفصيلية...'
                        },
                        ...cms.faq.items
                      ]
                    }
                  });
                  setEditingItemId(newId);
                }}
                className="px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 font-black"
              >
                + إضافة سؤال
              </button>
            </div>

            <div className="space-y-2">
              {cms.faq.items.map((item) => {
                const isOpen = editingItemId === item.id;
                return (
                  <div
                    key={item.id}
                    className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden"
                  >
                    <div className="p-3 flex items-center justify-between gap-2">
                      <div className="font-bold text-white truncate">
                        {item.question}
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleEditItem(item.id)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 font-bold"
                        >
                          {isOpen ? 'إغلاق' : 'تعديل'}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateCms({
                              ...cms,
                              faq: {
                                ...cms.faq,
                                items: cms.faq.items.filter(
                                  (f) => f.id !== item.id
                                )
                              }
                            })
                          }
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    {isOpen && (
                      <div className="p-3 border-t border-slate-800 bg-slate-900/60 space-y-2">
                        <input
                          type="text"
                          value={item.question}
                          onChange={(e) => {
                            const updated = cms.faq.items.map((f) =>
                              f.id === item.id
                                ? { ...f, question: e.target.value }
                                : f
                            );
                            onUpdateCms({
                              ...cms,
                              faq: { ...cms.faq, items: updated }
                            });
                          }}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-amber-400 font-bold"
                        />
                        <textarea
                          rows={2}
                          value={item.answer}
                          onChange={(e) => {
                            const updated = cms.faq.items.map((f) =>
                              f.id === item.id
                                ? { ...f, answer: e.target.value }
                                : f
                            );
                            onUpdateCms({
                              ...cms,
                              faq: { ...cms.faq, items: updated }
                            });
                          }}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-300"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 12. CONTACT US & INBOX */}
        {activeModule === 'contact_us' && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">رقم واتساب أعمال:</label>
                <input
                  type="text"
                  value={cms.contact.whatsappNumber}
                  onChange={(e) =>
                    onUpdateCms({
                      ...cms,
                      contact: { ...cms.contact, whatsappNumber: e.target.value }
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">رقم الاتصال المباشر:</label>
                <input
                  type="text"
                  value={cms.contact.directPhone}
                  onChange={(e) =>
                    onUpdateCms({
                      ...cms,
                      contact: { ...cms.contact, directPhone: e.target.value }
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2">
              <div className="font-bold text-slate-200 flex items-center gap-1.5">
                <Inbox className="w-4 h-4 text-amber-400" />
                <span>البريد الوارد ({cms.contact.inboxMessages.length})</span>
              </div>
              {cms.contact.inboxMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-3 rounded-xl border border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-white">
                      {msg.senderName} ({msg.senderPhone}) —{' '}
                      <span className="text-amber-400">{msg.subject}</span>
                    </div>
                    <p className="text-slate-400 truncate mt-0.5">{msg.message}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {!msg.read && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = cms.contact.inboxMessages.map((m) =>
                            m.id === msg.id ? { ...m, read: true } : m
                          );
                          onUpdateCms({
                            ...cms,
                            contact: { ...cms.contact, inboxMessages: updated }
                          });
                        }}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500 text-slate-950 font-black"
                      >
                        مقروء
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        const updated = cms.contact.inboxMessages.filter(
                          (m) => m.id !== msg.id
                        );
                        onUpdateCms({
                          ...cms,
                          contact: { ...cms.contact, inboxMessages: updated }
                        });
                      }}
                      className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 13. GLOBAL FOOTER EDITOR */}
        {activeModule === 'global_footer' && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">اسم الشركة في الفوتر:</label>
                <input
                  type="text"
                  value={cms.footer.companyName}
                  onChange={(e) =>
                    onUpdateCms({
                      ...cms,
                      footer: { ...cms.footer, companyName: e.target.value }
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">العنوان الرئيسي:</label>
                <input
                  type="text"
                  value={cms.footer.mainGeoAddress}
                  onChange={(e) =>
                    onUpdateCms({
                      ...cms,
                      footer: { ...cms.footer, mainGeoAddress: e.target.value }
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">
                  فروع الشركة ({cms.footer.branches.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const newId = `brn-${Date.now()}`;
                    onUpdateCms({
                      ...cms,
                      footer: {
                        ...cms.footer,
                        branches: [
                          ...cms.footer.branches,
                          {
                            id: newId,
                            city: 'فرع جديد',
                            address: 'العنوان',
                            phone: '+967 771 000 000',
                            visible: true
                          }
                        ]
                      }
                    });
                    setEditingItemId(newId);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-black"
                >
                  + إضافة فرع
                </button>
              </div>
              {cms.footer.branches.map((br) => {
                const isOpen = editingItemId === br.id;
                return (
                  <div
                    key={br.id}
                    className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden"
                  >
                    <div className="p-3 flex items-center justify-between gap-2">
                      <div className="truncate font-bold text-white">
                        {br.city} ·{' '}
                        <span className="text-slate-400 font-normal">
                          {br.address}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleEditItem(br.id)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 font-bold"
                        >
                          {isOpen ? 'إغلاق' : 'تعديل'}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateCms({
                              ...cms,
                              footer: {
                                ...cms.footer,
                                branches: cms.footer.branches.filter(
                                  (b) => b.id !== br.id
                                )
                              }
                            })
                          }
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    {isOpen && (
                      <div className="p-3 border-t border-slate-800 bg-slate-900/60 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={br.city}
                          onChange={(e) => {
                            const updated = cms.footer.branches.map((b) =>
                              b.id === br.id ? { ...b, city: e.target.value } : b
                            );
                            onUpdateCms({
                              ...cms,
                              footer: { ...cms.footer, branches: updated }
                            });
                          }}
                          className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-amber-400 font-bold"
                        />
                        <input
                          type="text"
                          value={br.address}
                          onChange={(e) => {
                            const updated = cms.footer.branches.map((b) =>
                              b.id === br.id
                                ? { ...b, address: e.target.value }
                                : b
                            );
                            onUpdateCms({
                              ...cms,
                              footer: { ...cms.footer, branches: updated }
                            });
                          }}
                          className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                        />
                        <input
                          type="text"
                          value={br.phone}
                          onChange={(e) => {
                            const updated = cms.footer.branches.map((b) =>
                              b.id === br.id ? { ...b, phone: e.target.value } : b
                            );
                            onUpdateCms({
                              ...cms,
                              footer: { ...cms.footer, branches: updated }
                            });
                          }}
                          className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-300 font-mono"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Modal for Reordering & Toggling Visibility of the 13 Modules */}
      {isReorderModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsReorderModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-5 space-y-4 max-h-[85vh] flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>ترتيب وإظهار أقسام الصفحة الرئيسية (13 قسماً)</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsReorderModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 overflow-y-auto pe-1 flex-1">
              {cms.moduleOrder.map((mod, idx) => (
                <div
                  key={mod.id}
                  className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-between gap-2 text-xs"
                >
                  <div className="font-bold text-slate-200 truncate">
                    {idx + 1}. {mod.titleAr}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => moveModule(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-30"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveModule(idx, 'down')}
                      disabled={idx === cms.moduleOrder.length - 1}
                      className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-30"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleModuleEnabled(mod.id)}
                      className={`p-1.5 rounded-lg border ${
                        mod.enabled
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                          : 'bg-slate-900 border-slate-800 text-slate-500'
                      }`}
                    >
                      {mod.enabled ? (
                        <Eye className="w-3.5 h-3.5" />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setIsReorderModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>تم الحفظ</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
