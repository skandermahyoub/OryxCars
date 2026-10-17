export type ThemePalette =
  | 'obsidian-gold'
  | 'carbon-crimson'
  | 'alabaster-amber'
  | 'royal-emerald'
  | 'sapphire-blue'
  | 'desert-bronze'
  | 'custom-brand';

export type BrandCornerStyle = 'rounded_luxury' | 'sharp_executive';

export interface BrandIdentityConfig {
  primaryColorHex: string;
  secondaryColorHex: string;
  cornerStyle: BrandCornerStyle;
  defaultThemeMode: 'dark' | 'light';
  cityNameAr: string;
  cityNameEn: string;
  workingHoursAr: string;
  crNumber: string; // رقم السجل التجاري أو الترخيص
  whatsappNumber?: string;
  directPhone?: string;
  mainAddress?: string;
}

export type ModuleId =
  | 'header_hero'
  | 'vertical_slider'
  | 'news_ticker'
  | 'about_us'
  | 'services_catalog'
  | 'b2b_packages'
  | 'testimonials'
  | 'brands_partners'
  | 'featured_promos'
  | 'blog_section'
  | 'faq_section'
  | 'contact_us'
  | 'global_footer';

export interface ModuleOrderItem {
  id: ModuleId;
  titleAr: string;
  titleEn: string;
  enabled: boolean;
}

// 1. Header & Collapsible Hero Module
export interface HeaderModuleConfig {
  logoUrl: string;
  logoText: string;
  companyName: string;
  companyNameEn: string;
  slogan: string;
  sloganEn: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  backgroundImage: string;
  ctaButtonText: string;
  preferredDimensionsNote: string;
  whatsappNumber?: string;
  directPhone?: string;
  mainAddress?: string;
}

// 2. Vertical Cinematic Slider Module
export interface VerticalSlide {
  id: string;
  title: string;
  subtitle: string;
  backgroundImage: string;
  buttonText: string;
  buttonLink: string;
  priceTag?: string;
  badgeText?: string;
}

export interface VerticalSliderConfig {
  slideDurationSeconds: number;
  slides: VerticalSlide[];
  preferredDimensionsNote: string;
}

// 3. Animated Ticker Module
export type TickerCategory = 'news' | 'offer' | 'ad' | 'marketing' | 'uncategorized';

export interface TickerItem {
  id: string;
  text: string;
  category: TickerCategory;
  link?: string;
}

export interface TickerModuleConfig {
  speedSeconds: number;
  direction: 'ltr' | 'rtl';
  items: TickerItem[];
}

// 4. About Us Module
export interface AboutPillar {
  id: string;
  label: string; // الهدف، الرؤية، الرسالة، المهمة
  title: string;
  content: string;
}

export interface AboutModuleConfig {
  sectionTitle: string;
  sectionSubtitle: string;
  paragraph: string;
  directorName: string;
  directorRole: string;
  directorImage: string;
  displayMode: 'accordion' | 'carousel';
  pillars: AboutPillar[];
  pdfButtonText: string;
  pdfUrl: string;
  moreButtonText: string;
  showPdfButton: boolean;
  showMoreButton: boolean;
}

// 6. Services Catalog Module
export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  priceText: string;
  image: string;
  badge?: string;
  features: string[];
}

export interface ServicesModuleConfig {
  mainTitle: string;
  subTitle: string;
  categories: string[];
  services: ServiceItem[];
  viewAllButtonText: string;
}

// 7A. B2B & Event Custom Packages Module
export interface CustomPackageItem {
  id: string;
  title: string;
  sectorTag: string; // شركات، منظمات دولية، أعراس ومواكب، وفود دبلوماسية
  subtitle: string;
  priceText: string;
  oldPriceText?: string;
  periodText: string;
  includedServices: string[];
  highlightColor: 'gold' | 'crimson' | 'emerald' | 'blue';
  isFeatured: boolean;
  ctaText: string;
}

export interface PackagesModuleConfig {
  mainTitle: string;
  subTitle: string;
  packages: CustomPackageItem[];
}

// 7B. Testimonials Module
export type TestimonialCardStyle = 'full' | 'avatar_text' | 'minimal';

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  avatar: string;
  status: 'approved' | 'pending' | 'hidden';
  createdAt: string;
}

export interface TestimonialsModuleConfig {
  mainTitle: string;
  subTitle: string;
  cardStyle: TestimonialCardStyle;
  enablePublicForm: boolean;
  items: TestimonialItem[];
}

// 8. Brands & Success Partners Module
export type BrandDisplayMode =
  | 'logo_only'
  | 'logo_label'
  | 'logo_rating'
  | 'logo_text_rating'
  | 'logo_text';

export interface BrandItem {
  id: string;
  name: string;
  categoryLabel: string; // شريك نجاح، عميل مميز، علامة تجارية
  logoUrl: string;
  description: string;
  rating: number;
}

export interface BrandsModuleConfig {
  mainTitle: string;
  subTitle: string;
  colorMode: 'grayscale' | 'colored';
  displayMode: BrandDisplayMode;
  autoScroll: boolean;
  items: BrandItem[];
}

// 9. Featured Promotions / Ad Banners Module
export type PromoLayoutMode =
  | 'carousel'
  | 'grid_4'
  | 'split_2_horizontal'
  | 'split_2_vertical'
  | 'bento_3_mixed'
  | 'grid_3_vertical';

export interface PromoBannerItem {
  id: string;
  title: string;
  subtitle: string;
  backgroundImage: string;
  linkUrl: string;
  discountBadge: string;
  priceTag: string;
  buttonText: string;
  accentColor: 'amber' | 'red' | 'emerald' | 'blue';
}

export interface PromosModuleConfig {
  mainTitle: string;
  subTitle: string;
  layoutMode: PromoLayoutMode;
  items: PromoBannerItem[];
}

// 10. Blog Module
export interface BlogPostItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  publishDate: string;
  readTime: string;
  featuredInHome: boolean;
}

export interface BlogModuleConfig {
  mainTitle: string;
  subTitle: string;
  scrollDirection: 'horizontal' | 'vertical';
  maxPostsToShow: 5 | 10;
  showCategoryFilters: boolean;
  viewAllButtonText: string;
  posts: BlogPostItem[];
}

// 11. FAQ Module
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface FaqModuleConfig {
  mainTitle: string;
  subTitle: string;
  items: FaqItem[];
}

// 12. Contact Us Module & Internal Inbox
export interface InternalMessage {
  id: string;
  senderName: string;
  senderPhone: string;
  senderEmail: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface ContactModuleConfig {
  mainTitle: string;
  subTitle: string;
  backgroundImage: string;
  whatsappNumber: string;
  whatsappLabel: string;
  messengerUrl: string;
  messengerLabel: string;
  directPhone: string;
  directPhoneLabel: string;
  officialEmail: string;
  officialEmailLabel: string;
  liveChatLabel: string;
  showWhatsapp: boolean;
  showMessenger: boolean;
  showDirectCall: boolean;
  showLiveChat: boolean;
  showEmail: boolean;
  inboxMessages: InternalMessage[];
}

// 13. Global Footer Module
export interface FooterLinkItem {
  id: string;
  label: string;
  url: string;
  visible: boolean;
}

export interface FooterBranchItem {
  id: string;
  city: string;
  address: string;
  phone: string;
  visible: boolean;
}

export interface FooterSocialItem {
  id: string;
  platform: 'tiktok' | 'facebook' | 'youtube' | 'instagram' | 'whatsapp_channel' | 'telegram' | 'snapchat';
  label: string;
  url: string;
  visible: boolean;
}

export interface FooterModuleConfig {
  logoText: string;
  companyName: string;
  slogan: string;
  description: string;
  phone: string;
  email: string;
  website: string;
  mainGeoAddress: string;
  showSectionsLinks: boolean;
  showPoliciesLinks: boolean;
  showBranches: boolean;
  showSocials: boolean;
  customPages: FooterLinkItem[];
  policyLinks: FooterLinkItem[];
  branches: FooterBranchItem[];
  socials: FooterSocialItem[];
  copyrightText: string;
  poweredByText: string;
}

// Master CMS State
export interface HomepageCmsConfig {
  themePalette: ThemePalette;
  brandIdentity?: BrandIdentityConfig;
  moduleOrder: ModuleOrderItem[];
  header: HeaderModuleConfig;
  verticalSlider: VerticalSliderConfig;
  ticker: TickerModuleConfig;
  about: AboutModuleConfig;
  servicesCatalog: ServicesModuleConfig;
  packages: PackagesModuleConfig;
  testimonials: TestimonialsModuleConfig;
  brands: BrandsModuleConfig;
  promos: PromosModuleConfig;
  blog: BlogModuleConfig;
  faq: FaqModuleConfig;
  contact: ContactModuleConfig;
  footer: FooterModuleConfig;
}
