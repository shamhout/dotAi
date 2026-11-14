import type { IconName } from './site'

/**
 * Narrative copy and structured beats for the purpose-built 8-scene Mobile (<=767px)
 * and Tablet (768px–1024px) experiences:
 *   PROBLEM -> PAIN -> DISCOVERY -> REVEAL -> TRANSFORMATION -> RESULTS -> SERVICES -> ACTION.
 *
 * Strictly truthful: no invented metrics, no fabricated statistics, no third product.
 */

export const STORY_MOBILE_CHAPTERS = [
  { id: 'home', num: '01', label: 'البداية', href: '#home' },
  { id: 'problem', num: '02', label: 'المشكلة', href: '#problem' },
  { id: 'pain', num: '03', label: 'العواقب', href: '#pain' },
  { id: 'about', num: '04', label: 'نقطة التحوّل', href: '#about' },
  { id: 'solutions', num: '05', label: 'اكتشف dot Ai', href: '#solutions' },
  { id: 'transformation', num: '06', label: 'قبل وبعد', href: '#transformation' },
  { id: 'hr', num: '07', label: 'ما نبنيه', href: '#hr' },
  { id: 'contact', num: '08', label: 'ابدأ الآن', href: '#contact' },
] as const

/* ----------------------------------------------------- Scene 01: The Hook */
export const HOOK_COPY = {
  eyebrow: 'الفصل 01 · حقيقة يومية',
  headlineTop: 'كل يوم شغل كتير بيتعمل بإيدك...',
  headlineAccent: 'كان ممكن يخلص لوحده.',
  lead: 'بين رسائل العملاء، جداول الحضور، ومتابعة المبيعات والرواتب — المجهود بيروح في تفاصيل متكررة بدل تنمية شغلك.',
  scrollPrompt: 'شوف اللي بيحصل جوه شغلك',
  pulseLabels: ['متابعة متأخرة', 'ملفات مبعثرة', 'مجهود متكرر'] as const,
} as const

/* -------------------------------------------------- Scene 02: The Problem */
export interface ProblemNode {
  index: string
  icon: IconName
  title: string
  detail: string
  tag: string
}

export const PROBLEM_SEQUENCE = {
  eyebrow: 'الفصل 02 · أصل المشكلة',
  title: 'المشكلة مش إن فريقك مش بيشتغل... المشكلة إن النظام نفسه غائب.',
  subtitle: 'لما العمليات اليومية تمشي بالطريقة اليدوية، كل تفصيلة بتسحب جزء من وقتك وتركيزك.',
  nodes: [
    {
      index: '01',
      icon: 'repeat',
      title: 'مهام متكررة بتتعمل كل يوم',
      detail: 'إدخال بيانات، مراجعة كشوفات، وإعادة نفس الخطوات يدويًا أسبوع بعد أسبوع.',
      tag: 'استنزاف الوقت',
    },
    {
      index: '02',
      icon: 'clock',
      title: 'متابعة بطيئة لحركة العملاء',
      detail: 'رسائل واستفسارات متوزعة على أكتر من مكان بدون سجل متابعة موحّد.',
      tag: 'بطء الاستجابة',
    },
    {
      index: '03',
      icon: 'database',
      title: 'بيانات مبيعات وموظفين مبعثرة',
      detail: 'ملفات حضور منفصلة عن الورديات، والسلف في ورق، والمبيعات في شيت آخر.',
      tag: 'تشتّت البيانات',
    },
    {
      index: '04',
      icon: 'calculator',
      title: 'حسابات رواتب ومكافآت مرهقة',
      detail: 'تجميع السلف والخصومات والحضور مع نهاية كل شهر بيأخذ وقت مضاعف.',
      tag: 'عبء شهري',
    },
    {
      index: '05',
      icon: 'eye',
      title: 'صعوبة قراءة الأداء العام',
      detail: 'القرارات بتتأخر لأن الصورة الكاملة لحركة البيع والفريق مش واضحة لحظة بلحظة.',
      tag: 'غياب الرؤية',
    },
  ] satisfies ProblemNode[],
} as const

/* --------------------------------------------- Scene 03: The Consequences */
export interface ConsequenceScenario {
  id: 'sales-loss' | 'team-drain'
  index: string
  category: string
  accent: 'violet' | 'cyan'
  title: string
  steps: { label: string; note: string }[]
  outcome: string
}

export const CONSEQUENCE_SCENARIOS: ConsequenceScenario[] = [
  {
    id: 'sales-loss',
    index: '01',
    category: 'على مستوى العملاء والمبيعات',
    accent: 'violet',
    title: 'فرص بيع بتضيع في صمت',
    steps: [
      { label: 'استفسار أو طلب جديد', note: 'عميل مهتم بيتواصل مع فريقك' },
      { label: 'مفيش سجل متابعة منظم', note: 'التفاصيل بتتوه بين المحادثات' },
      { label: 'تأخر في المتابعة أو نسيان الرد', note: 'العميل يفقد الاهتمام ويتجه لغيرك' },
    ],
    outcome: 'فرص مبيعات حقيقية بتضيع قبل ما تتحوّل لنتيجة.',
  },
  {
    id: 'team-drain',
    index: '02',
    category: 'على مستوى الفريق والتشغيل',
    accent: 'cyan',
    title: 'طاقات فريقك بتستهلك في الروتين',
    steps: [
      { label: 'بيانات حضور وورديات متفرقة', note: 'مراجعة يدوية لكل موظف وفرع' },
      { label: 'تجميع السلف والخصومات والمكافآت', note: 'ساعات طويلة في الحساب والمطابقة' },
      { label: 'تقارير متأخرة ومجهود إداري مكرر', note: 'الإدارة مشغولة بالمتابعة بدل التطوير' },
    ],
    outcome: 'الموظف يضيع ساعاته في التنظيم اليدوي بدل التركيز على شغله الأساسي.',
  },
] as const

/* --------------------------------------------- Scene 04: The Turning Point */
export const TURNING_POINT = {
  eyebrow: 'الفصل 04 · نقطة التحوّل',
  prompt: 'شركتك مش محتاجة ساعات عمل أطول ولا موظفين أكتر للورق.',
  headline: 'في طريقة تانية تخلي كل ده يشتغل بترابط وذكاء.',
  lead: 'لما خطوات التشغيل اليومية تتجمع في مسار رقمي واحد، الفوضى بتتحول لنظام، والمجهود المكرر بيتحوّل لوضوح كامل.',
  clusters: [
    'الحضور والورديات',
    'السلف والرواتب',
    'حركة المبيعات',
    'متابعة العملاء',
    'تقارير الأداء',
    'قرارات الإدارة',
  ] as const,
} as const

/* ---------------------------------------------- Scene 05: The Brand Reveal */
export const BRAND_REVEAL = {
  eyebrow: 'الفصل 05 · الحل يظهر',
  headline: 'هنا بتبدأ قصة dot Ai',
  subhead: 'بنحوّل التعقيد اليومي والعمليات المتفرقة لأنظمة ذكية مترابطة تشتغل لصالح شركتك.',
  pillars: [
    { id: 'hr', title: 'نظام HR الذكي', accent: 'cyan' as const, focus: 'الموظفين · الحضور · الورديات · الرواتب' },
    { id: 'sales', title: 'نظام Sales الذكي', accent: 'violet' as const, focus: 'المبيعات · العملاء · التحليلات · الأداء' },
  ],
} as const

/* ------------------------------------------ Scene 06: Before -> After Shifts */
export interface BeforeAfterItem {
  id: string
  track: 'sales' | 'hr' | 'ops'
  tag: string
  beforeTitle: string
  beforeText: string
  afterTitle: string
  afterText: string
}

export const BEFORE_AFTER_ITEMS: BeforeAfterItem[] = [
  {
    id: 'customer-follow',
    track: 'sales',
    tag: 'نشاط العملاء والمبيعات',
    beforeTitle: 'متابعة متفرقة ورسائل بدون سجل',
    beforeText: 'تشتّت بيانات العملاء وصعوبة معرفة حالة كل طلب أو عملية بيع.',
    afterTitle: 'سجل منظم لحركة البيع والعملاء',
    afterText: 'تتبع مستمر لكل عميل وعملية بيع أولاً بأول في مكان واحد.',
  },
  {
    id: 'hr-attendance',
    track: 'hr',
    tag: 'الموظفين والحضور والرواتب',
    beforeTitle: 'حضور وورديات وسلف في ملفات متفرقة',
    beforeText: 'وقت طويل في تجميع السجلات وحساب المكافآت والخصومات كل شهر.',
    afterTitle: 'إدارة موحّدة للقوى العاملة والرواتب',
    afterText: 'الحضور والورديات والسلف والرواتب مربوطة مع بعض بوضوح كامل.',
  },
  {
    id: 'decisions',
    track: 'ops',
    tag: 'الرؤية واتخاذ القرار',
    beforeTitle: 'صعوبة قراءة الأداء العام للشركة',
    beforeText: 'تأخر التقارير واعتماد التقدير بدل البيانات الفعلية.',
    afterTitle: 'تقارير وتحليلات أوضح لقرار أسرع',
    afterText: 'تقارير حضور ومبيعات تمنحك صورة دقيقة تدعم قرارات النمو.',
  },
]

/* ------------------------------------------- Scene 07: Services Story Meta */
export const SERVICES_PROBLEM_MAP = {
  hr: {
    problemLabel: 'المشكلة التي يحلّها',
    problemSolved:
      'تشتّت بيانات الموظفين وجداول الورديات والسلف والرواتب بين ملفات ورقية ومراجعات يدوية شهرية متكررة.',
  },
  sales: {
    problemLabel: 'المشكلة التي يحلّها',
    problemSolved:
      'بعثرة بيانات البيع ونشاط العملاء بين رسائل متفرقة، وصعوبة قراءة الأداء العام لاتخاذ قرارات سريعة.',
  },
} as const
