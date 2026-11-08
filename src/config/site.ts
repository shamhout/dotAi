/**
 * All user-facing content that is data (navigation, products, process, value
 * propositions) lives here so it can be edited without touching components.
 *
 * Rules followed (from the brief): ONLY two products, no invented features,
 * no statistics, no testimonials, no social links.
 */
import type { WhatsAppMessageKey } from './whatsapp'

export type IconName =
  | 'users'
  | 'clock'
  | 'calendar'
  | 'banknote'
  | 'award'
  | 'minusCircle'
  | 'calculator'
  | 'fileText'
  | 'briefcase'
  | 'barChart'
  | 'trendingUp'
  | 'eye'
  | 'userCheck'
  | 'database'
  | 'target'
  | 'cpu'
  | 'zap'
  | 'headset'
  | 'repeat'
  | 'sliders'
  | 'search'
  | 'compass'
  | 'box'
  | 'flag'

/* ---------------------------------------------------------------- navigation */
export const NAV_LINKS = [
  { id: 'home', label: 'الرئيسية', href: '#home' },
  { id: 'about', label: 'من نحن', href: '#about' },
  { id: 'solutions', label: 'حلولنا', href: '#solutions' },
  { id: 'hr', label: 'نظام HR', href: '#hr' },
  { id: 'sales', label: 'نظام Sales', href: '#sales' },
] as const

export const CONTACT_LABEL = 'تواصل معنا'
export const CONTACT_WHATSAPP_LABEL = 'تواصل معنا على واتساب'

/* --------------------------------------------------------------------- hero */
export const HERO = {
  headlineStart: 'خلّي شغلك ',
  headlineAccent: 'أذكى...',
  headlineEnd: ' وسيب المهام المتكررة للأنظمة الذكية.',
  text: 'في dot Ai بنطوّر أنظمة ذكية تساعد الشركات على إدارة أعمالها بكفاءة أعلى، وتنظيم عملياتها، وتحقيق نمو أفضل.',
  primaryCta: 'اكتشف حلولنا',
  secondaryCta: CONTACT_WHATSAPP_LABEL,
} as const

/* -------------------------------------------------------------------- about */
export const ABOUT = {
  eyebrow: 'من نحن',
  title: 'التكنولوجيا لازم تشتغل لصالحك.',
  lead: 'dot Ai شركة تقنية متخصصة في أتمتة الأعمال وتطوير الأنظمة الذكية. بنحوّل التكنولوجيا لحلول عملية تساعد الشركات على تقليل المهام المتكررة، وتنظيم العمليات اليومية، ورفع كفاءة التشغيل.',
  statement: 'مش بنقدّم برمجيات وبس. بنبني أنظمة ذكية تساعد الشركات تشتغل أذكى.',
  audienceTitle: 'بنخدم',
  audience: [
    'الشركات الصغيرة والمتوسطة',
    'متاجر التجزئة',
    'علامات الملابس',
    'الشركات متعددة الفروع',
    'المؤسسات',
    'أي نشاط يريد رفع كفاءته التشغيلية',
  ],
} as const

/* ----------------------------------------------------------------- products */
export interface Capability {
  icon: IconName
  title: string
  text: string
}

export interface Product {
  id: 'hr' | 'sales'
  /** Order of the Latin name matters for RTL rendering: it is shown on its own line. */
  englishName: string
  /** Short label used in nav, chips and footer, e.g. "نظام HR". */
  shortName: string
  title: string
  focus: string
  value: string
  summary: string
  /** Short list shown on the overview card. */
  keyCapabilities: string[]
  /** Full list shown in the detail section. */
  capabilities: Capability[]
  benefits: string[]
  howItHelps: string
  orderLabel: string
  whatsAppKey: Extract<WhatsAppMessageKey, 'hr' | 'sales'>
}

export const PRODUCTS: Record<'hr' | 'sales', Product> = {
  hr: {
    id: 'hr',
    englishName: 'HR Management System',
    shortName: 'نظام HR',
    title: 'نظام إدارة الموارد البشرية',
    focus: 'الموظفين والحضور والرواتب',
    value: 'أدِر موظفينك وحضورهم ورواتبهم من نظام ذكي واحد.',
    summary:
      'نظام ذكي لإدارة الموظفين، مصمّم للشركات اللي محتاجة تحكّم أفضل في موظفيها وعمليات القوى العاملة اليومية.',
    keyCapabilities: [
      'إدارة الموظفين وسجلاتهم',
      'تسجيل الحضور والانصراف',
      'الورديات وجداول العمل',
      'السلف والمكافآت والخصومات',
      'حساب الرواتب',
      'تقارير الحضور',
    ],
    capabilities: [
      { icon: 'users', title: 'إدارة الموظفين', text: 'تنظيم بيانات الموظفين ومتابعة شؤونهم من مكان واحد.' },
      { icon: 'clock', title: 'الحضور والانصراف', text: 'تسجيل ومتابعة حضور وانصراف الموظفين.' },
      { icon: 'calendar', title: 'الورديات والجداول', text: 'تنظيم ورديات وجداول العمل للفريق.' },
      { icon: 'banknote', title: 'سلف الموظفين', text: 'تسجيل ومتابعة السلف الخاصة بالموظفين.' },
      { icon: 'award', title: 'المكافآت', text: 'إدارة المكافآت الخاصة بالموظفين.' },
      { icon: 'minusCircle', title: 'الخصومات', text: 'تسجيل ومتابعة الخصومات بشكل منظّم.' },
      { icon: 'calculator', title: 'حساب الرواتب', text: 'المساعدة في تنظيم وحساب رواتب الموظفين.' },
      { icon: 'fileText', title: 'سجلات الموظفين', text: 'سجلات منظمة لكل موظف يسهل الرجوع إليها.' },
      { icon: 'barChart', title: 'تقارير الحضور', text: 'تقارير توضّح صورة الحضور والانصراف.' },
      { icon: 'briefcase', title: 'إدارة القوى العاملة', text: 'رؤية أوضح لحركة العمل اليومية في شركتك.' },
    ],
    benefits: [
      'بيانات الموظفين والحضور والرواتب في مكان واحد',
      'تقليل العمل الإداري اليدوي المتكرر',
      'وضوح أكبر في متابعة الحضور والانصراف',
      'وقت أقل في التنظيم، وتركيز أكبر على إدارة شغلك',
    ],
    howItHelps:
      'بدل ما تتوزّع معلومات الموظفين بين أوراق وملفات ومتابعات يدوية، النظام بيجمّع شؤون الموظفين اليومية في مكان واحد منظّم. صاحب العمل بيقدر يتابع الحضور والورديات والسلف والمكافآت والخصومات والرواتب بشكل أوضح، وبمجهود إداري متكرر أقل.',
    orderLabel: 'اطلب نظام HR',
    whatsAppKey: 'hr',
  },
  sales: {
    id: 'sales',
    englishName: 'Sales Management System',
    shortName: 'نظام Sales',
    title: 'نظام إدارة المبيعات',
    focus: 'المبيعات والتقارير والأداء',
    value: 'احصل على رؤية وتحكّم أفضل في مبيعات شغلك.',
    summary:
      'حل ذكي لإدارة المبيعات، يساعد الشركات على تنظيم عمليات البيع ومتابعتها بوضوح.',
    keyCapabilities: [
      'تتبع المبيعات',
      'متابعة أداء المبيعات',
      'تقارير وتحليلات الأعمال',
      'نشاط العملاء والمبيعات',
      'بيانات مبيعات منظمة',
    ],
    capabilities: [
      { icon: 'trendingUp', title: 'تتبع المبيعات', text: 'متابعة عمليات البيع أولاً بأول بشكل منظّم.' },
      { icon: 'target', title: 'متابعة الأداء', text: 'مراقبة أداء المبيعات وفهم ما يحدث في شغلك.' },
      { icon: 'barChart', title: 'تقارير وتحليلات', text: 'تقارير وتحليلات للأعمال تدعم قراراتك.' },
      { icon: 'userCheck', title: 'نشاط العملاء والمبيعات', text: 'إدارة ومتابعة نشاط العملاء والمبيعات.' },
      { icon: 'eye', title: 'رؤية تشغيلية أوضح', text: 'صورة أوضح لسير العمل والمبيعات.' },
      { icon: 'database', title: 'بيانات منظمة', text: 'معلومات المبيعات مرتبة وسهلة الرجوع إليها.' },
      { icon: 'zap', title: 'قرارات أفضل', text: 'معلومات أوضح تساعدك في اتخاذ قرارات مبنية على بيانات.' },
    ],
    benefits: [
      'رؤية أوضح لحركة المبيعات',
      'معلومات مبيعات منظمة بدل البيانات المبعثرة',
      'تقارير تساعدك في متابعة الأداء',
      'دعم لاتخاذ قرارات أفضل لشغلك',
    ],
    howItHelps:
      'النظام بيحوّل معلومات المبيعات المتفرقة لصورة منظمة وواضحة. بتتابع المبيعات ونشاط العملاء وأداء شغلك من خلال تقارير وتحليلات، فتعرف أين تقف وتتخذ قراراتك بثقة أكبر.',
    orderLabel: 'اطلب نظام Sales',
    whatsAppKey: 'sales',
  },
}

/* ----------------------------------------------------------------- sections */
export const SOLUTIONS_INTRO = {
  eyebrow: 'حلولنا',
  title: 'نظامان ذكيان. كل نظام بيحل جزء مختلف من شغلك.',
  text: 'اختار النظام اللي يناسب احتياجك، وتواصل معنا على واتساب لمعرفة التفاصيل والأسعار.',
  discoverLabel: 'اكتشف النظام',
} as const

export const WHY = {
  eyebrow: 'ليه dot Ai؟',
  title: 'تقنية مبنية حوالين احتياج شغلك.',
  items: [
    { icon: 'target', title: 'تقنية تخدم أعمالك', text: 'بنبدأ من تحديات شغلك الفعلية، مش من التقنية نفسها.' },
    { icon: 'cpu', title: 'أنظمة ذكية', text: 'أنظمة تنظّم العمليات اليومية وتختصر الخطوات اللي بتتكرر.' },
    { icon: 'trendingUp', title: 'كفاءة تشغيلية أفضل', text: 'عمليات أوضح وأكثر انتظاماً داخل شركتك.' },
    { icon: 'repeat', title: 'مهام متكررة أقل', text: 'وقت أقل في الشغل اليدوي، وتركيز أكبر على نمو شغلك.' },
    { icon: 'sliders', title: 'حلول حسب احتياجك', text: 'بنختار الحل المناسب لطبيعة نشاطك واحتياجاتك.' },
    { icon: 'headset', title: 'دعم احترافي', text: 'فريقنا معاك وإنت بتبدأ استخدام النظام.' },
  ] satisfies { icon: IconName; title: string; text: string }[],
} as const

export const PROCESS = {
  eyebrow: 'كيف نعمل',
  title: 'من أول رسالة لحد ما تبدأ الاستخدام.',
  steps: [
    { icon: 'search', title: 'نفهم احتياج شغلك', text: 'بنسمعك ونفهم طبيعة نشاطك وإيه اللي محتاج تنظيم.' },
    { icon: 'compass', title: 'نحدد الحل المناسب', text: 'بنرشّح لك النظام اللي يناسب احتياجك.' },
    { icon: 'box', title: 'نجهّز النظام المناسب', text: 'بنجهّز النظام المناسب لك قبل البدء.' },
    { icon: 'flag', title: 'تبدأ الاستخدام بدعم فريقنا', text: 'بتبدأ تستخدم الحل، وفريقنا معاك.' },
  ] satisfies { icon: IconName; title: string; text: string }[],
} as const

export const FINAL_CTA = {
  title: 'جاهز تطوّر طريقة إدارة شغلك؟',
  text: 'ابدأ خطوتك الأولى نحو إدارة أذكى وأعمال أكثر كفاءة.',
  cta: CONTACT_WHATSAPP_LABEL,
} as const

export const FOOTER = {
  quickLinksTitle: 'روابط سريعة',
  systemsTitle: 'أنظمتنا',
  contactTitle: 'تواصل',
  whatsappLabel: 'واتساب',
  rights: 'جميع الحقوق محفوظة.',
} as const
