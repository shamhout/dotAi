import { useState } from 'react'
import { BRAND } from '../config/brand'
import type { IconName } from '../config/site'
import { Icon } from './Icon'
import { Latin } from './Latin'

type HrTab = 'attendance' | 'shifts' | 'payroll'
type SalesTab = 'tracking' | 'customers' | 'reports'

const HR_TABS: readonly { id: HrTab; label: string; icon: IconName }[] = [
  { id: 'attendance', label: 'الحضور والانصراف', icon: 'clock' },
  { id: 'shifts', label: 'الورديات والجداول', icon: 'calendar' },
  { id: 'payroll', label: 'السلف والرواتب', icon: 'calculator' },
]

const SALES_TABS: readonly { id: SalesTab; label: string; icon: IconName }[] = [
  { id: 'tracking', label: 'تتبع المبيعات', icon: 'trendingUp' },
  { id: 'customers', label: 'نشاط العملاء', icon: 'userCheck' },
  { id: 'reports', label: 'التقارير والأداء', icon: 'barChart' },
]

const SHIFT_PATTERN = [
  'bg-cyan/80',
  'bg-azure/75',
  'bg-cyan/80',
  'bg-panel',
  'bg-azure/75',
  'bg-violet/70',
  'bg-cyan/80',
  'bg-azure/75',
  'bg-panel',
  'bg-cyan/80',
  'bg-violet/70',
  'bg-azure/75',
] as const

/**
 * Interactive visual demonstration tailored for touch viewports (320px–1024px).
 * Zero truncated labels, zero fabricated stats, touch-sized controls (>=40px).
 */
export function TouchWorkDemo({
  system,
  variant = 'mobile',
}: {
  system: 'hr' | 'sales'
  variant?: 'mobile' | 'tablet'
}) {
  const [hrTab, setHrTab] = useState<HrTab>('attendance')
  const [salesTab, setSalesTab] = useState<SalesTab>('tracking')

  const isHr = system === 'hr'
  const activeTab = isHr ? hrTab : salesTab
  const tabs = isHr ? HR_TABS : SALES_TABS

  return (
    <div
      className={`surface-console overflow-hidden rounded-2xl border p-3.5 sm:rounded-3xl sm:p-5 ${
        isHr ? 'border-cyan/30' : 'border-violet/35'
      }`}
    >
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={`size-2 rounded-full ${isHr ? 'bg-cyan shadow-[0_0_8px_var(--color-cyan)]' : 'bg-violet shadow-[0_0_8px_var(--color-violet)]'}`}
          />
          <span className="text-xs font-extrabold text-white">
            {isHr ? 'تجربة نظام HR' : 'تجربة نظام Sales'}
          </span>
        </div>
        <span
          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${
            isHr ? 'border-cyan/30 bg-cyan/10 text-glow' : 'border-violet/35 bg-violet/15 text-iris'
          }`}
        >
          {variant === 'tablet' ? 'استعراض تفاعلي' : 'المس للتجربة'}
        </span>
      </div>

      {/* Zero-Truncation Wrapping Touch Tabs */}
      <div
        role="tablist"
        aria-label={isHr ? 'عروض نظام الموارد البشرية' : 'عروض نظام المبيعات'}
        className="mt-3 flex flex-wrap gap-1.5 rounded-xl border border-white/10 bg-ink/80 p-1.5"
      >
        {tabs.map((tab) => {
          const selected = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => (isHr ? setHrTab(tab.id as HrTab) : setSalesTab(tab.id as SalesTab))}
              className={`flex min-h-10 flex-1 basis-[calc(50%-0.25rem)] cursor-pointer items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-bold transition-all sm:basis-0 sm:whitespace-nowrap ${
                selected
                  ? isHr
                    ? 'border border-cyan/40 bg-cyan/15 text-glow'
                    : 'border border-violet/45 bg-violet/25 text-white'
                  : 'border border-transparent text-mist hover:bg-white/[0.04] hover:text-white'
              }`}
            >
              <Icon name={tab.icon} size={14} className="shrink-0" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Interactive Panel Stage */}
      <div className="mt-3 rounded-xl border border-white/10 bg-ink/85 p-3.5 sm:p-4">
        {isHr && hrTab === 'attendance' && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-white">متابعة الحضور والانصراف يومياً</span>
              <span className="text-cyan">موثّق</span>
            </div>
            {[
              { name: 'ملف موظف · فريق المبيعات', badge: 'حاضر · الوردية الصباحية' },
              { name: 'ملف موظف · فريق التشغيل', badge: 'حاضر · نظام الفروع' },
              { name: 'ملف موظف · خدمة العملاء', badge: 'منصرف · مسجل بالنظام' },
            ].map((row) => (
              <div
                key={row.name}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/8 bg-night/75 px-3 py-2.5"
              >
                <span className="text-xs font-bold text-white">{row.name}</span>
                <span className="rounded-full border border-cyan/25 bg-cyan/10 px-2.5 py-0.5 text-[11px] font-bold text-glow">
                  {row.badge}
                </span>
              </div>
            ))}
          </div>
        )}

        {isHr && hrTab === 'shifts' && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-extrabold text-white">تنظيم الورديات وجداول الفريق</span>
              <span className="text-mist">صباحية · مسائية · مناوبة</span>
            </div>
            <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-6">
              {SHIFT_PATTERN.map((tone, idx) => (
                <div
                  key={idx}
                  className={`flex h-9 items-center justify-center rounded-lg border border-white/10 ${tone}`}
                  aria-hidden="true"
                >
                  <span className="size-1.5 rounded-full bg-white/60" />
                </div>
              ))}
            </div>
            <p className="rounded-lg border border-sky/20 bg-panel/45 px-3 py-2 text-xs leading-6 text-mist">
              جدول الورديات يتحدث تلقائياً ويرتبط بسجلات الحضور اليومي بدون متابعة ورقية.
            </p>
          </div>
        )}

        {isHr && hrTab === 'payroll' && (
          <div className="space-y-2.5">
            <p className="text-xs font-extrabold text-white">تجميع تلقائي لعناصر الراتب الشهري</p>
            <div className="grid gap-2 sm:grid-cols-3">
              {[
                { label: 'سجل الحضور والورديات', state: 'مُجمّع', tone: 'text-glow' },
                { label: 'السلف والمكافآت والخصومات', state: 'مرصود', tone: 'text-iris' },
                { label: 'الراتب النهائي', state: 'جاهز للمراجعة', tone: 'text-cyan' },
              ].map((step) => (
                <div key={step.label} className="rounded-xl border border-white/10 bg-night/80 p-2.5">
                  <p className="text-[11px] font-bold text-mist">{step.label}</p>
                  <p className={`mt-1 text-xs font-extrabold ${step.tone}`}>{step.state}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between rounded-xl border border-cyan/30 bg-cyan/10 px-3 py-2 text-xs font-bold text-white">
              <span>حساب الرواتب بوضوح تام</span>
              <span className="text-cyan"><Latin>dot Ai HR</Latin></span>
            </div>
          </div>
        )}

        {!isHr && salesTab === 'tracking' && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-white">مسار تتبع حركة البيع</span>
              <span className="text-iris">أولاً بأول</span>
            </div>
            {[
              { stage: 'استفسار عميل جديد', width: 'w-full bg-sky/75', tag: 'مسجل' },
              { stage: 'متابعة وعرض مناسب', width: 'w-4/5 bg-azure/80', tag: 'قيد المتابعة' },
              { stage: 'إتمام العملية وتوثيقها', width: 'w-3/5 bg-violet/85', tag: 'مكتمل' },
            ].map((bar) => (
              <div key={bar.stage} className="rounded-xl border border-white/8 bg-night/80 p-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{bar.stage}</span>
                  <span className="font-semibold text-iris">{bar.tag}</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className={`h-full rounded-full ${bar.width}`} />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isHr && salesTab === 'customers' && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-white">سجل موحّد لنشاط العملاء</span>
              <span className="text-iris">بدون تشتّت</span>
            </div>
            {[
              { title: 'ملف عميل · طلب متابعة جديد', status: 'مجدول للمتابعة' },
              { title: 'ملف عميل · تعاملات مستمرة', status: 'سجل محفوظ' },
              { title: 'ملف عميل · مراجعة فريق البيع', status: 'جاهز للتقرير' },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/8 bg-night/80 px-3 py-2.5"
              >
                <span className="text-xs font-bold text-white">{item.title}</span>
                <span className="rounded-full border border-violet/35 bg-violet/15 px-2.5 py-0.5 text-[11px] font-bold text-iris">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {!isHr && salesTab === 'reports' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-white">قراءة واضحة لأداء المبيعات</span>
              <span className="text-iris">دعم القرار</span>
            </div>
            <svg viewBox="0 0 360 88" className="h-20 w-full" aria-hidden="true">
              <defs>
                <linearGradient id="touch-sales-line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={BRAND.violet} />
                  <stop offset="100%" stopColor={BRAND.cyan} />
                </linearGradient>
              </defs>
              <path
                d="M12 70 C75 64 115 44 175 48 C230 52 275 24 348 16"
                fill="none"
                stroke="url(#touch-sales-line)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="175" cy="48" r="4" fill={BRAND.sky} />
              <circle cx="348" cy="16" r="5" fill={BRAND.cyan} />
            </svg>
            <p className="rounded-lg border border-violet/30 bg-violet/10 px-3 py-2 text-xs leading-6 text-mist">
              تقارير توضح حركة البيع ونشاط العملاء أولاً بأول لاتخاذ قرارات مبنية على بيانات واضحة.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
