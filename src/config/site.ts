/**
 * All user-facing content that is data (navigation, story chapters, products,
 * process, value propositions) lives here so it can be edited centrally.
 *
 * Rules followed (from the brief): ONLY two products (HR & Sales), no invented
 * features, no fabricated statistics, no testimonials, no social links.
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
  { id: 'home', label: 'المشكلة', href: '#home' },
  { id: 'about', label: 'الإدراك', href: '#about' },
  { id: 'solutions', label: 'الحل', href: '#solutions' },
  { id: 'transformation', label: 'الترابط', href: '#transformation' },
  { id: 'hr', label: 'نظام HR', href: '#hr' },
  { id: 'sales', label: 'نظام Sales', href: '#sales' },
] as const

export const STORY_CHAPTERS = [
  { id: 'home', num: '01', label: 'المشكلة' },
  { id: 'about', num: '02', label: 'الإدراك' },
  { id: 'solutions', num: '03', label: 'الحل' },
  { id: 'transformation', num: '04', label: 'الترابط' },
  { id: 'why', num: '05', label: 'الأثر' },
  { id: 'hr', num: '06', label: 'ما نبنيه' },
  { id: 'contact', num: '07', label: 'الفصل التالي' },
] as const

export const CONTACT_LABEL = 'تواصل معنا'
export const CONTACT_WHATSAPP_LABEL = 'تواصل معنا على واتساب'

/* ----------------------------------------------------------- scene 01: hero */
export const HERO = {
  sceneTag: 'المشهد 01 · المشكلة',
  headlineLine1: 'شغلك بيضيع في مهام يدوية...',
  headlineLine2: 'كان ممكن تخلص لوحدها.',
  text: 'في dot Ai بنطوّر أنظمة ذكية تخلّي شغلك أذكى وتنهي فوضى الملفات المتفرقة والمتابعة اليدوية المتكررة.',
  primaryCta: CONTACT_WHATSAPP_LABEL,
  secondaryCta: 'ابدأ القصة',
  whatsappHint: 'محادثة مباشرة على واتساب لاختيار النظام الأنسب لشركتك',
  chaosLabel: 'واقع العمل اليدوي بدون أتمتة',
  orderPreviewLabel: 'مع أنظمة dot Ai',
  fragments: [
    { id: 'f1', icon: 'clock' as IconName, title: 'حضور وانصراف متفرق', status: 'متابعة يدوية يومية' },
    { id: 'f2', icon: 'calculator' as IconName, title: 'حسابات رواتب وسلف', status: 'مجهود متكرر كل شهر' },
    { id: 'f3', icon: 'trendingUp' as IconName, title: 'بيانات مبيعات مبعثرة', status: 'صعوبة قراءة الأداء' },
    { id: 'f4', icon: 'userCheck' as IconName, title: 'نشاط عملاء غير موحّد', status: 'فرص متابعة ضائعة' },
    { id: 'f5', icon: 'barChart' as IconName, title: 'تقارير تتجمع بصعوبة', status: 'قرارات متأخرة' },
  ],
} as const

/* --------------------------------------------------- scene 02: realization */
export const ABOUT = {
  sceneTag: 'المشهد 02 · الإدراك',
  preTitle: 'شركتك مش محتاجة ساعات عمل أطول ولا تعقيد إضافي.',
  title: 'التكنولوجيا لازم تشتغل لصالحك.',
  lead: 'dot Ai شركة تقنية متخصصة في أتمتة الأعمال وتطوير الأنظمة الذكية. بنحوّل التكنولوجيا لحلول عملية تساعد الشركات على تقليل المهام المتكررة، وتنظيم العمليات اليومية، ورفع كفاءة التشغيل.',
  statement: 'مش بنقدّم برمجيات وبس. بنبني أنظمة ذكية تساعد الشركات تشتغل أذكى.',
  audienceTitle: 'القطاعات التي تتحوّل معنا',
  audience: [
    'الشركات الصغيرة والمتوسطة',
    'متاجر التجزئة',
    'علامات الملابس',
    'الشركات متعددة الفروع',
    'المؤسسات',
    'أي نشاط يريد رفع كفاءته التشغيلية',
  ],
} as const

/* --------------------------------------------------------- scene 03: solution */
export const SOLUTIONS_INTRO = {
  sceneTag: 'المشهد 03 · الحل',
  eyebrow: 'نقطة التحول',
  title: 'من الفوضى المتفرقة... إلى نظامين متصلين بذكاء.',
  text: 'اختار النظام اللي يناسب احتياجك، وتواصل معنا على واتساب لمعرفة التفاصيل والأسعار.',
  discoverLabel: 'استكشف تفاصيل النظام',
  comparison: [
    {
      system: 'نظام HR',
      before: 'بيانات الموظفين والحضور والورديات والرواتب موزّعة بين أوراق وملفات ومتابعات يدوية.',
      after: 'إدارة الموظفين والحضور والانصراف والورديات والسلف والمكافآت والرواتب في مكان واحد.',
    },
    {
      system: 'نظام Sales',
      before: 'معلومات المبيعات ونشاط العملاء متفرقة، وصعوبة في قراءة الأداء العام لاتخاذ القرار.',
      after: 'تتبع منظم لعمليات البيع ونشاط العملاء مع تقارير وتحليلات توضح الصورة أولاً بأول.',
    },
  ],
} as const

/* --------------------------------------------------- scene 04: transformation */
export interface TransformationBeat {
  id: string
  index: string
  track: 'hr' | 'sales' | 'both'
  icon: IconName
  badge: string
  title: string
  text: string
  nodes: readonly string[]
}

export const TRANSFORMATION = {
  sceneTag: 'المشهد 04 · الترابط الذكي',
  title: 'كل عمليات شغلك تشتغل في تناغم واحد.',
  subtitle: 'بدل الجزر المنعزلة، أنظمة dot Ai بتربط بين العمليات اليومية والبيانات والقرارات في مسار واحد واضح.',
  beats: [
    {
      id: 'daily-ops',
      index: '01',
      track: 'hr',
      icon: 'clock',
      badge: 'العمليات اليومية والقوى العاملة',
      title: 'تنظيم الموظفين والحضور والورديات',
      text: 'سجلات الموظفين وحضورهم وانصرافهم وجداول الورديات بتتجمع في سجل واحد منظم بدون متابعة ورقية متكررة.',
      nodes: ['سجلات الموظفين', 'الحضور والانصراف', 'الورديات والجداول'],
    },
    {
      id: 'payroll-sync',
      index: '02',
      track: 'hr',
      icon: 'calculator',
      badge: 'السلف والاستحقاقات',
      title: 'حساب رواتب واضح بلا تعقيد',
      text: 'متابعة السلف والمكافآت والخصومات بتتجمع تلقائياً لتنظيم وحساب رواتب الفريق بوضوح ومجهود أقل.',
      nodes: ['سلف الموظفين', 'المكافآت والخصومات', 'حساب الرواتب'],
    },
    {
      id: 'sales-activity',
      index: '03',
      track: 'sales',
      icon: 'trendingUp',
      badge: 'المبيعات ونشاط العملاء',
      title: 'متابعة مستمرة لحركة البيع والعملاء',
      text: 'تتبع المبيعات ونشاط العملاء بيتم أولاً بأول في مكان واحد، بدل ضياع التفاصيل بين الرسائل والملفات.',
      nodes: ['تتبع المبيعات', 'نشاط العملاء', 'بيانات مبيعات منظمة'],
    },
    {
      id: 'unified-clarity',
      index: '04',
      track: 'both',
      icon: 'barChart',
      badge: 'التقارير ودعم القرار',
      title: 'رؤية تشغيلية واضحة تقود النمو',
      text: 'تقارير الحضور وتحليلات المبيعات بتمنح الإدارة صورة كاملة عن أداء الشركة لاتخاذ قرارات مبنية على بيانات.',
      nodes: ['تقارير الحضور', 'تقارير المبيعات', 'قرارات أفضل للشركة'],
    },
  ] satisfies TransformationBeat[],
} as const

/* ----------------------------------------------------------- scene 05: impact */
export const WHY = {
  sceneTag: 'المشهد 05 · الأثر',
  eyebrow: 'من الفوضى إلى الوضوح',
  title: 'شغل أقل في المهام المتكررة. تركيز أكبر على نمو شركتك.',
  subtitle: 'تقنية مبنية حوالين احتياج شغلك، بتحوّل التعقيد اليومي لوضوح واستقرار تشغيلي.',
  shifts: [
    { from: 'مجهود إداري مكرر', to: 'مهام متكررة أقل' },
    { from: 'ملفات وبيانات مبعثرة', to: 'عمليات أوضح ومنظمة' },
    { from: 'متابعة بطيئة ومتقطعة', to: 'وضوح واستجابة أسرع' },
    { from: 'ضغط التشغيل اليومي', to: 'فرص أكبر للنمو' },
  ],
  items: [
    { icon: 'target', title: 'تقنية تخدم أعمالك', text: 'بنبدأ من تحديات شغلك الفعلية، مش من التقنية نفسها.' },
    { icon: 'cpu', title: 'أنظمة ذكية', text: 'أنظمة تنظّم العمليات اليومية وتختصر الخطوات اللي بتتكرر.' },
    { icon: 'trendingUp', title: 'كفاءة تشغيلية أفضل', text: 'عمليات أوضح وأكثر انتظاماً داخل شركتك.' },
    { icon: 'repeat', title: 'مهام متكررة أقل', text: 'وقت أقل في الشغل اليدوي، وتركيز أكبر على نمو شغلك.' },
    { icon: 'sliders', title: 'حلول حسب احتياجك', text: 'بنختار الحل المناسب لطبيعة نشاطك واحتياجاتك.' },
    { icon: 'headset', title: 'دعم احترافي', text: 'فريقنا معاك وإنت بتبدأ استخدام النظام.' },
  ] satisfies { icon: IconName; title: string; text: string }[],
} as const

/* --------------------------------------------------- scene 06: what we build */
export interface Capability {
  icon: IconName
  title: string
  text: string
}

export interface Product {
  id: 'hr' | 'sales'
  englishName: string
  shortName: string
  title: string
  focus: string
  value: string
  summary: string
  keyCapabilities: string[]
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

/* ------------------------------------------------- scene 07: the next chapter */
export const PROCESS = {
  eyebrow: 'رحلة التحوّل معانا',
  title: 'من أول رسالة لحد ما تبدأ الاستخدام.',
  steps: [
    { icon: 'search', title: 'نفهم احتياج شغلك', text: 'بنسمعك ونفهم طبيعة نشاطك وإيه اللي محتاج تنظيم.' },
    { icon: 'compass', title: 'نحدد الحل المناسب', text: 'بنرشّح لك النظام اللي يناسب احتياجك.' },
    { icon: 'box', title: 'نجهّز النظام المناسب', text: 'بنجهّز النظام المناسب لك قبل البدء.' },
    { icon: 'flag', title: 'تبدأ الاستخدام بدعم فريقنا', text: 'بتبدأ تستخدم الحل، وفريقنا معاك.' },
  ] satisfies { icon: IconName; title: string; text: string }[],
} as const

export const FINAL_CTA = {
  sceneTag: 'المشهد 07 · الفصل التالي',
  title: 'تحوّل شركتك بيبدأ بمحادثة واحدة.',
  text: 'كفاية شغل يدوي متكرر. ابدأ خطوتك الأولى نحو إدارة أذكى، وتواصل معنا على واتساب لنختار النظام المناسب لشركتك.',
  cta: CONTACT_WHATSAPP_LABEL,
  hrShortcut: 'استفسر عن نظام HR',
  salesShortcut: 'استفسر عن نظام Sales',
} as const

export const FOOTER = {
  quickLinksTitle: 'روابط سريعة',
  systemsTitle: 'أنظمتنا',
  contactTitle: 'تواصل',
  whatsappLabel: 'واتساب',
  rights: 'جميع الحقوق محفوظة.',
} as const
