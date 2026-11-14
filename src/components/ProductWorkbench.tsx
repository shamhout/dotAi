import { useState } from 'react'
import { BRAND } from '../config/brand'
import { Icon } from './Icon'
import { Latin } from './Latin'

type HrTab = 'attendance' | 'shifts' | 'payroll'
type SalesTab = 'tracking' | 'customers' | 'reports'

/**
 * Interactive schematic workbench for #hr and #sales.
 * Strictly schematic (zero fabricated metrics/numbers) while letting visitors
 * explore how each system organizes daily operations.
 */
export function ProductWorkbench({ system }: { system: 'hr' | 'sales' }) {
  const [hrTab, setHrTab] = useState<HrTab>('attendance')
  const [salesTab, setSalesTab] = useState<SalesTab>('tracking')

  const isHr = system === 'hr'
  const activeTab = isHr ? hrTab : salesTab

  const tabs = isHr
    ? ([
        { id: 'attendance', label: 'الحضور والانصراف', icon: 'clock' },
        { id: 'shifts', label: 'الورديات والجداول', icon: 'calendar' },
        { id: 'payroll', label: 'السلف والرواتب', icon: 'calculator' },
      ] as const)
    : ([
        { id: 'tracking', label: 'تتبع المبيعات', icon: 'trendingUp' },
        { id: 'customers', label: 'نشاط العملاء', icon: 'userCheck' },
        { id: 'reports', label: 'التقارير والأداء', icon: 'barChart' },
      ] as const)

  return (
    <div
      className={`surface-console relative overflow-hidden rounded-3xl p-4 sm:p-6 ${
        isHr ? 'border-cyan/25' : 'border-violet/35'
      }`}
    >
      {/* Window Chrome */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3.5">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className={`size-2.5 rounded-full ${isHr ? 'bg-cyan' : 'bg-violet'}`} />
          </span>
          <span className="ms-1 text-xs font-bold text-mist">
            {isHr ? 'واجهة نظام HR' : 'واجهة نظام Sales'} · <Latin>dot Ai</Latin>
          </span>
        </div>

        <span
          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${
            isHr ? 'border-cyan/30 bg-cyan/10 text-glow' : 'border-violet/35 bg-violet/15 text-iris'
          }`}
        >
          معاينة تفاعلية
        </span>
      </div>

      {/* Interactive Module Tabs */}
      <div
        className="mt-4 grid grid-cols-3 gap-1.5 rounded-2xl border border-white/10 bg-ink/70 p-1.5"
        role="tablist"
        aria-label={isHr ? 'مكونات نظام الموارد البشرية' : 'مكونات نظام المبيعات'}
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
              className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-xs font-bold transition-all sm:text-[13px] ${
                selected
                  ? isHr
                    ? 'border border-cyan/35 bg-cyan/15 text-glow shadow-[0_4px_16px_-6px_rgb(3_220_254/0.5)]'
                    : 'border border-violet/45 bg-violet/25 text-white shadow-[0_4px_16px_-6px_rgb(94_76_249/0.6)]'
                  : 'border border-transparent text-mist hover:bg-white/[0.04] hover:text-white'
              }`}
            >
              <Icon name={tab.icon} size={15} className="hidden shrink-0 sm:block" />
              <span className="truncate">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Interactive Stage Content */}
      <div className="mt-4 min-h-[17.5rem] rounded-2xl border border-white/10 bg-ink/80 p-4 sm:p-5">
        {isHr && hrTab === 'attendance' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-xs">
              <span className="font-bold text-white">سجل الحضور والانصراف اليومي</span>
              <span className="text-glow">متابعة منظمة</span>
            </div>
            {[
              { role: 'ملف الموظف · الفريق التشغيلي', shift: 'الوردية الصباحية', status: 'تم تسجيل الحضور' },
              { role: 'ملف الموظف · المبيعات والفروع', shift: 'الوردية الصباحية', status: 'متواجد بالعمل' },
              { role: 'ملف الموظف · الإدارة والمتابعة', shift: 'الوردية المسائية', status: 'مجدول بالوردية' },
              { role: 'ملف الموظف · التشغيل الميداني', shift: 'تقرير الحضور', status: 'تحديث تلقائي' },
            ].map((row, idx) => (
              <div
                key={row.role}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/8 bg-night/70 px-3.5 py-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`grid size-7 shrink-0 place-items-center rounded-lg text-xs font-bold ${
                      idx % 2 === 0 ? 'bg-cyan/15 text-glow' : 'bg-azure/20 text-sky'
                    }`}
                  >
                    <Icon name="users" size={14} />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-white">{row.role}</p>
                    <p className="text-[11px] text-haze">{row.shift}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan/25 bg-cyan/10 px-2.5 py-0.5 text-[11px] font-semibold text-glow">
                  <span className="size-1.5 rounded-full bg-cyan" aria-hidden="true" />
                  {row.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {isHr && hrTab === 'shifts' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5 text-xs">
              <span className="font-bold text-white">مصفوفة تنظيم الورديات والجداول</span>
              <div className="flex items-center gap-3 text-[11px] text-mist">
                <span className="inline-flex items-center gap-1">
                  <span className="size-2 rounded-sm bg-cyan" />
                  صباحية
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="size-2 rounded-sm bg-azure" />
                  مسائية
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="size-2 rounded-sm bg-violet" />
                  مناوبة
                </span>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] text-haze">
              {['سبت', 'أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة'].map((d) => (
                <span key={d} className="pb-1 font-semibold">
                  {d}
                </span>
              ))}
              {[
                'bg-cyan/80',
                'bg-cyan/80',
                'bg-azure/80',
                'bg-white/10',
                'bg-azure/80',
                'bg-violet/80',
                'bg-white/10',
                'bg-azure/80',
                'bg-white/10',
                'bg-cyan/80',
                'bg-cyan/80',
                'bg-white/10',
                'bg-azure/80',
                'bg-violet/80',
                'bg-violet/80',
                'bg-azure/80',
                'bg-white/10',
                'bg-azure/80',
                'bg-cyan/80',
                'bg-cyan/80',
                'bg-white/10',
              ].map((bg, i) => (
                <span key={i} className={`h-8 rounded-lg border border-white/10 ${bg}`} aria-hidden="true" />
              ))}
            </div>
            <p className="rounded-xl border border-cyan/20 bg-cyan/5 px-3 py-2 text-xs text-mist">
              ربط مباشر بين جدول الورديات وسجلات الحضور والانصراف اليومية لكل موظف.
            </p>
          </div>
        )}

        {isHr && hrTab === 'payroll' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-xs">
              <span className="font-bold text-white">تنظيم وحساب الرواتب والمستحقات</span>
              <span className="text-glow">دقة بدون أخطاء يدوية</span>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-3">
              {[
                { icon: 'award' as const, label: 'المكافآت', desc: 'إضافة منظمة لكل موظف', tone: 'text-glow border-cyan/25 bg-cyan/10' },
                { icon: 'banknote' as const, label: 'السلف', desc: 'تسجيل ومتابعة السلف', tone: 'text-sky border-sky/25 bg-sky/10' },
                { icon: 'minusCircle' as const, label: 'الخصومات', desc: 'ربط بالحضور واللوائح', tone: 'text-iris border-violet/30 bg-violet/15' },
              ].map((box) => (
                <div key={box.label} className="rounded-xl border border-white/10 bg-night/70 p-3">
                  <span className={`inline-grid size-8 place-items-center rounded-lg border ${box.tone}`}>
                    <Icon name={box.icon} size={16} />
                  </span>
                  <p className="mt-2 text-xs font-extrabold text-white">{box.label}</p>
                  <p className="mt-0.5 text-[11px] text-haze">{box.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between rounded-xl border border-cyan/30 bg-gradient-to-l from-cyan/15 to-electric/15 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <Icon name="calculator" size={18} className="text-glow" />
                <span className="text-xs font-bold text-white">تجميع تلقائي لحساب الراتب النهائي في سجل واحد</span>
              </div>
              <Icon name="check" size={16} className="text-glow" />
            </div>
          </div>
        )}

        {!isHr && salesTab === 'tracking' && (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-xs">
              <span className="font-bold text-white">متابعة حركة المبيعات أولاً بأول</span>
              <span className="text-iris">تنظيم لحظي</span>
            </div>
            <svg viewBox="0 0 420 120" className="w-full overflow-visible" aria-hidden="true">
              <defs>
                <linearGradient id="wbSalesArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor={BRAND.violet} stopOpacity="0.45" />
                  <stop offset="1" stopColor={BRAND.violet} stopOpacity="0" />
                </linearGradient>
              </defs>
              {[30, 60, 90].map((y) => (
                <path key={y} d={`M0 ${y}H420`} stroke="rgba(147,166,214,0.14)" strokeDasharray="4 6" />
              ))}
              <path
                d="M12 96 L84 78 L156 84 L228 54 L300 60 L368 30 L412 22 L412 110 L12 110 Z"
                fill="url(#wbSalesArea)"
              />
              <path
                d="M12 96 L84 78 L156 84 L228 54 L300 60 L368 30 L412 22"
                fill="none"
                stroke={BRAND.azure}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 96 L84 78 L156 84 L228 54 L300 60 L368 30 L412 22"
                fill="none"
                stroke={BRAND.cyan}
                strokeWidth="2"
                strokeLinecap="round"
                className="svg-signal"
              />
              {[
                [12, 96],
                [84, 78],
                [156, 84],
                [228, 54],
                [300, 60],
                [368, 30],
                [412, 22],
              ].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={i === 6 ? 5.5 : 3.5} fill={i === 6 ? BRAND.glow : BRAND.ink} stroke={BRAND.violet} strokeWidth="2" />
              ))}
            </svg>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl border border-white/10 bg-night/70 px-3 py-2">
                <p className="font-bold text-white">تسجيل منظم للعمليات</p>
                <p className="text-[11px] text-haze">بيانات مرتبة يسهل الرجوع إليها</p>
              </div>
              <div className="rounded-xl border border-violet/30 bg-violet/10 px-3 py-2">
                <p className="font-bold text-iris">رؤية تشغيلية أوضح</p>
                <p className="text-[11px] text-mist">فهم فوري لحركة المبيعات</p>
              </div>
            </div>
          </div>
        )}

        {!isHr && salesTab === 'customers' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-xs">
              <span className="font-bold text-white">سجل نشاط العملاء ومتابعة البيع</span>
              <span className="text-iris">مرتب في مكان واحد</span>
            </div>
            {[
              { title: 'ملف عميل · متابعة طلبات نشطة', tag: 'قيد المتابعة' },
              { title: 'ملف عميل · سجل تعاملات مكتمل', tag: 'موثّق بالنظام' },
              { title: 'ملف عميل · نشاط بيع متكرر', tag: 'تحديث مستمر' },
              { title: 'ملف عميل · مراجعة الأداء الدوري', tag: 'جاهز للتقرير' },
            ].map((item, idx) => (
              <div
                key={item.title}
                className="flex items-center justify-between gap-2 rounded-xl border border-white/8 bg-night/70 px-3.5 py-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`grid size-7 shrink-0 place-items-center rounded-lg ${
                      idx % 2 === 0 ? 'bg-violet/20 text-iris' : 'bg-azure/20 text-sky'
                    }`}
                  >
                    <Icon name="userCheck" size={14} />
                  </span>
                  <span className="text-xs font-bold text-white">{item.title}</span>
                </div>
                <span className="rounded-full border border-violet/30 bg-violet/15 px-2.5 py-0.5 text-[11px] font-semibold text-iris">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        )}

        {!isHr && salesTab === 'reports' && (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-xs">
              <span className="font-bold text-white">تقارير وتحليلات تدعم قرارات الإدارة</span>
              <span className="text-iris">قرارات مبنية على بيانات</span>
            </div>
            <div className="grid grid-cols-6 items-end gap-2 rounded-xl border border-white/10 bg-night/70 px-4 pb-3 pt-6">
              {['h-12', 'h-16', 'h-10', 'h-20', 'h-14', 'h-24'].map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <span
                    className={`w-full max-w-[2rem] rounded-t-lg ${
                      i === 5
                        ? 'bg-[image:var(--gradient-brand)] shadow-[0_0_20px_-4px_rgb(17_166_251/0.8)]'
                        : 'bg-violet/45'
                    } ${h}`}
                    aria-hidden="true"
                  />
                  <span className="h-1.5 w-6 rounded-full bg-white/15" aria-hidden="true" />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border border-violet/30 bg-violet/10 px-3.5 py-2.5 text-xs text-mist">
              <Icon name="zap" size={16} className="shrink-0 text-iris" />
              <span>تقارير جاهزة تساعدك تعرف أين تقف مبيعاتك وتبني خطواتك الجاية بثقة.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
