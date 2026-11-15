import { useRef, useState } from 'react'
import { AnchorButton, WhatsAppButton } from '../components/Buttons'
import { HrIllustration } from '../components/illustrations/HrIllustration'
import { SalesIllustration } from '../components/illustrations/SalesIllustration'
import { Icon } from '../components/Icon'
import { Latin } from '../components/Latin'
import { Logo } from '../components/Logo'
import { BRAND } from '../config/brand'
import { PRODUCTS, SOLUTIONS_INTRO, type Product } from '../config/site'
import { gsap, useGsapScene } from '../lib/motion'
import { PRODUCT_THEME } from './productTheme'

/** Spatial Split Curtain Portal for HR or Sales. Strictly two systems exist. */
function SystemPortal({
  product,
  comparison,
  index,
  side,
}: {
  product: Product
  comparison: { before: string; after: string }
  index: string
  side: 'start' | 'end'
}) {
  const theme = PRODUCT_THEME[product.id]
  const Illustration = product.id === 'hr' ? HrIllustration : SalesIllustration
  const isHr = product.id === 'hr'

  return (
    <article
      className={`portal-${side} surface-architect group relative flex h-full flex-col overflow-hidden rounded-3xl transition-colors duration-300 ${theme.cardHover}`}
    >
      <div aria-hidden="true" className={`h-1 w-full bg-gradient-to-l ${theme.topBar}`} />

      {/* Top Schematic Stage */}
      <div className="relative overflow-hidden border-b border-white/10 bg-ink/75 px-5 pt-5">
        <div aria-hidden="true" className={`absolute inset-0 ${theme.glow}`} />
        <div className="relative mb-3 flex items-center justify-between text-xs">
          <span className={`inline-flex items-center rounded-md border px-2.5 py-1 font-bold tracking-wide ${theme.pill}`}>
            <Latin>{product.englishName}</Latin>
          </span>
          <span className="font-mono text-xs font-bold text-haze">
            <Latin>{index}</Latin>
          </span>
        </div>
        <div className="relative h-40 overflow-hidden min-[400px]:h-48 sm:h-52">
          <Illustration className="relative mx-auto w-full max-w-lg transition-transform duration-500 group-hover:-translate-y-1.5" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-7 lg:p-8">
        <h3 className="text-2xl font-black leading-snug text-white">{product.title}</h3>
        <p className="mt-1.5 text-sm font-bold text-haze">يركّز على: {product.focus}</p>
        <p className="mt-3 text-pretty text-sm leading-7 text-mist sm:text-base sm:leading-8">{product.summary}</p>

        {/* Before -> After Micro-Shift */}
        <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
          <div className="rounded-xl border border-white/8 bg-night/65 p-3">
            <span className="block text-[11px] font-bold text-haze">قبل الأتمتة</span>
            <p className="mt-1 text-xs leading-6 text-mist">{comparison.before}</p>
          </div>
          <div
            className={`rounded-xl border p-3 ${
              isHr ? 'border-cyan/30 bg-cyan/8' : 'border-violet/35 bg-violet/10'
            }`}
          >
            <span className={`block text-[11px] font-bold ${isHr ? 'text-glow' : 'text-iris'}`}>
              مع <Latin>dot Ai</Latin>
            </span>
            <p className="mt-1 text-xs leading-6 text-white">{comparison.after}</p>
          </div>
        </div>

        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {product.keyCapabilities.map((c) => (
            <li key={c} className="flex items-start gap-2 text-xs leading-6 text-mist sm:text-sm">
              <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-md ${theme.check}`}>
                <Icon name="check" size={12} strokeWidth={2.8} />
              </span>
              <span>{c}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row">
          <WhatsAppButton message={product.whatsAppKey} className="sm:flex-1">
            {product.orderLabel}
          </WhatsAppButton>
          <AnchorButton href={`#${product.id}`} variant="ghost" className="sm:flex-1">
            <span>{SOLUTIONS_INTRO.discoverLabel}</span>
            <Icon name="arrowLeft" size={17} className="transition-transform group-hover:-translate-x-0.5" />
          </AnchorButton>
        </div>
      </div>
    </article>
  )
}

/**
 * SCENE 03 — THE SOLUTION (The Turning Point)
 * Desktop (>=1024px): Brand core bloom + scroll-drawn SVG conduits + dual opposing portals.
 * Mobile/Tablet (<1024px): Interactive Dual-System Switcher Deck with elastic reveal.
 */
export function Solutions() {
  const [mobileSys, setMobileSys] = useState<'hr' | 'sales'>('hr')
  const sectionRef = useRef<HTMLElement>(null)
  const coreRef = useRef<HTMLDivElement>(null)
  const splitHrRef = useRef<SVGPathElement>(null)
  const splitSalesRef = useRef<SVGPathElement>(null)

  const activeProd = PRODUCTS[mobileSys]
  const activeComp = SOLUTIONS_INTRO.comparison[mobileSys === 'hr' ? 0 : 1]
  const otherProd = mobileSys === 'hr' ? PRODUCTS.sales : PRODUCTS.hr
  const activeTheme = PRODUCT_THEME[activeProd.id]
  const otherTheme = PRODUCT_THEME[otherProd.id]
  const ActiveIllustration = activeProd.id === 'hr' ? HrIllustration : SalesIllustration
  const isMobileHr = activeProd.id === 'hr'

  useGsapScene(sectionRef, (_ctx, mm) => {
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const core = coreRef.current
      if (core && sectionRef.current) {
        // Brand core bloom reveal
        gsap.from(core, {
          scale: 0.72,
          opacity: 0,
          y: 36,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 76%',
            end: 'top 36%',
            scrub: 0.6,
          },
        })
      }

      // Scroll-drawn dual branch SVG split (strokeDashoffset)
      const paths = [splitHrRef.current, splitSalesRef.current].filter((p): p is SVGPathElement => Boolean(p))
      for (const p of paths) {
        const len = p.getTotalLength()
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(p, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: coreRef.current,
            start: 'center 75%',
            end: 'bottom 35%',
            scrub: 0.5,
          },
        })
      }

      // Opposing spatial curtain reveal with subtle 3D portal angle
      gsap.from('.portal-start', {
        x: 56,
        rotateY: -5,
        opacity: 0,
        scale: 0.95,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.portals-grid',
          start: 'top 85%',
          end: 'top 42%',
          scrub: 0.6,
        },
      })
      gsap.from('.portal-end', {
        x: -56,
        rotateY: 5,
        opacity: 0,
        scale: 0.95,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.portals-grid',
          start: 'top 85%',
          end: 'top 42%',
          scrub: 0.6,
        },
      })
    })

    // Mobile & Tablet (<1024px): Distinct elastic pop + segmented switcher + sheet rise
    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.from('.m-sol-header', {
        scale: 0.88,
        y: 24,
        opacity: 0,
        duration: 0.65,
        ease: 'back.out(1.35)',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.m-sol-header',
          start: 'top 86%',
          once: true,
        },
      })

      gsap.from('.m-sol-switcher', {
        y: 18,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.m-sol-switcher',
          start: 'top 88%',
          once: true,
        },
      })

      gsap.from('.m-sol-card', {
        y: 36,
        scale: 0.94,
        opacity: 0,
        duration: 0.7,
        ease: 'power4.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.m-sol-card',
          start: 'top 88%',
          once: true,
        },
      })

      gsap.from('.m-sol-companion', {
        x: -24,
        opacity: 0,
        duration: 0.55,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.m-sol-companion',
          start: 'top 92%',
          once: true,
        },
      })
    })
  })

  return (
    <section
      ref={sectionRef}
      id="solutions"
      aria-label={SOLUTIONS_INTRO.title}
      className="relative overflow-hidden py-14 sm:py-16 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-transparent via-night/70 to-transparent"
      />
      <div className="hairline-x absolute inset-x-0 top-0" aria-hidden="true" />

      {/* Desktop View (>=1024px): Brand Turning Point Hub + Dual SVG Branches + Dual Portals */}
      <div className="container-x hidden lg:block">
        <div ref={coreRef} className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-sky/35 bg-panel/65 px-5 py-2.5 shadow-[0_0_50px_-14px_rgb(17_166_251/0.65)]">
              <Logo />
            </div>
          </div>

          <h2 className="mt-6 text-balance text-[3rem] font-black leading-[1.32]">{SOLUTIONS_INTRO.title}</h2>
          <p className="mt-4 text-pretty text-lg leading-8 text-mist">{SOLUTIONS_INTRO.text}</p>
        </div>

        {/* Scroll-Drawn SVG Stream Splitter (1 Core → 2 Intelligent Systems in RTL: Right=HR, Left=Sales) */}
        <div className="mx-auto max-w-3xl" aria-hidden="true">
          <svg viewBox="0 0 600 84" className="h-20 w-full overflow-visible">
            {/* Base dim tracks */}
            <path d="M300 0 C300 42, 460 28, 460 84" fill="none" stroke="rgba(147,166,214,0.14)" strokeWidth="2" />
            <path d="M300 0 C300 42, 140 28, 140 84" fill="none" stroke="rgba(147,166,214,0.14)" strokeWidth="2" />

            {/* Scroll-drawn luminous streams */}
            <path ref={splitHrRef} d="M300 0 C300 42, 460 28, 460 84" fill="none" stroke={BRAND.cyan} strokeWidth="2.6" />
            <path ref={splitSalesRef} d="M300 0 C300 42, 140 28, 140 84" fill="none" stroke={BRAND.violet} strokeWidth="2.6" />

            <circle cx="300" cy="4" r="5" fill={BRAND.glow} />
            <circle cx="460" cy="80" r="4.5" fill={BRAND.cyan} />
            <circle cx="140" cy="80" r="4.5" fill={BRAND.violet} />
          </svg>
        </div>

        {/* Dual System Entry Portals */}
        <div className="portals-grid grid grid-cols-2 gap-8">
          <SystemPortal
            product={PRODUCTS.hr}
            comparison={SOLUTIONS_INTRO.comparison[0]}
            index="النظام 01"
            side="start"
          />
          <SystemPortal
            product={PRODUCTS.sales}
            comparison={SOLUTIONS_INTRO.comparison[1]}
            index="النظام 02"
            side="end"
          />
        </div>
      </div>

      {/* Mobile & Tablet View (<1024px): Interactive Dual-System Switcher Deck */}
      <div className="container-x lg:hidden">
        <div className="m-sol-header mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-sky/35 bg-panel/65 px-5 py-2.5 shadow-[0_0_50px_-14px_rgb(17_166_251/0.65)]">
              <Logo />
            </div>
          </div>

          <h2 className="mt-5 text-balance text-[1.75rem] font-black leading-[1.32] sm:text-4xl">
            {SOLUTIONS_INTRO.title}
          </h2>
          <p className="mt-3 text-pretty text-sm leading-7 text-mist sm:text-base">{SOLUTIONS_INTRO.text}</p>
        </div>

        {/* Interactive Dual-System Segmented Switcher */}
        <div
          role="tablist"
          aria-label="اختر النظام لاستعراضه"
          className="m-sol-switcher mx-auto mt-6 grid max-w-xl grid-cols-2 gap-2 rounded-2xl border border-white/12 bg-night/85 p-1.5"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mobileSys === 'hr'}
            onClick={() => setMobileSys('hr')}
            className={`cursor-pointer rounded-xl border px-3 py-2.5 text-start transition-all duration-200 ${
              mobileSys === 'hr'
                ? 'border-cyan/55 bg-panel/95 text-white shadow-[0_0_24px_-10px_rgb(3_220_254/0.6)]'
                : 'border-transparent bg-transparent text-mist hover:text-white'
            }`}
          >
            <span className="block font-mono text-[11px] font-bold text-cyan">
              <Latin>01 · HR</Latin>
            </span>
            <span className="mt-0.5 block text-xs font-black sm:text-sm">نظام الموارد البشرية</span>
            <span className="mt-0.5 block text-[10px] text-haze sm:text-[11px]">الموظفين والرواتب</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={mobileSys === 'sales'}
            onClick={() => setMobileSys('sales')}
            className={`cursor-pointer rounded-xl border px-3 py-2.5 text-start transition-all duration-200 ${
              mobileSys === 'sales'
                ? 'border-violet/55 bg-panel/95 text-white shadow-[0_0_24px_-10px_rgb(94_76_249/0.65)]'
                : 'border-transparent bg-transparent text-mist hover:text-white'
            }`}
          >
            <span className="block font-mono text-[11px] font-bold text-iris">
              <Latin>02 · Sales</Latin>
            </span>
            <span className="mt-0.5 block text-xs font-black sm:text-sm">نظام المبيعات</span>
            <span className="mt-0.5 block text-[10px] text-haze sm:text-[11px]">المبيعات والأداء</span>
          </button>
        </div>

        {/* Active System Showcase Card */}
        <article
          className={`m-sol-card surface-architect relative mx-auto mt-4 flex max-w-2xl flex-col overflow-hidden rounded-3xl transition-colors duration-300 ${activeTheme.cardHover}`}
        >
          <div aria-hidden="true" className={`h-1 w-full bg-gradient-to-l ${activeTheme.topBar}`} />

          {/* Top Schematic Preview */}
          <div className="relative overflow-hidden border-b border-white/10 bg-ink/75 px-4 pt-4 sm:px-6 sm:pt-5">
            <div aria-hidden="true" className={`absolute inset-0 ${activeTheme.glow}`} />
            <div className="relative mb-3 flex items-center justify-between text-xs">
              <span className={`inline-flex items-center rounded-md border px-2.5 py-1 font-bold tracking-wide ${activeTheme.pill}`}>
                <Latin>{activeProd.englishName}</Latin>
              </span>
              <span className="font-mono text-xs font-bold text-haze">
                <Latin>{isMobileHr ? 'النظام 01' : 'النظام 02'}</Latin>
              </span>
            </div>
            <div className="relative h-36 overflow-hidden min-[400px]:h-44 sm:h-52">
              <ActiveIllustration className="relative mx-auto w-full max-w-lg" />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <h3 className="text-xl font-black leading-snug text-white sm:text-2xl">{activeProd.title}</h3>
            <p className="mt-1 text-xs font-bold text-haze sm:text-sm">يركّز على: {activeProd.focus}</p>
            <p className="mt-2.5 text-pretty text-sm leading-7 text-mist sm:text-base">{activeProd.summary}</p>

            {/* Vertical Connected Before -> After Transformation Flow */}
            <div className="mt-4">
              <div className="rounded-xl border border-white/8 bg-night/70 p-3">
                <span className="block text-[11px] font-bold text-haze">قبل الأتمتة</span>
                <p className="mt-1 text-xs leading-6 text-mist">{activeComp.before}</p>
              </div>
              <div className="relative z-10 -my-2 flex justify-center" aria-hidden="true">
                <span className="inline-flex items-center gap-1 rounded-full border border-sky/35 bg-ink px-2.5 py-0.5 text-[10px] font-bold text-glow shadow-md">
                  <Icon name="arrowLeft" size={11} className="-rotate-90" />
                  <span>تحوّل ذكي</span>
                </span>
              </div>
              <div
                className={`rounded-xl border p-3 ${
                  isMobileHr ? 'border-cyan/30 bg-cyan/8' : 'border-violet/35 bg-violet/10'
                }`}
              >
                <span className={`block text-[11px] font-bold ${isMobileHr ? 'text-glow' : 'text-iris'}`}>
                  مع <Latin>dot Ai</Latin>
                </span>
                <p className="mt-1 text-xs leading-6 text-white">{activeComp.after}</p>
              </div>
            </div>

            {/* Key Capabilities Grid */}
            <ul className="mt-4 grid grid-cols-1 gap-2 min-[360px]:grid-cols-2">
              {activeProd.keyCapabilities.map((c) => (
                <li key={c} className="flex items-start gap-2 text-xs leading-6 text-mist">
                  <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-md ${activeTheme.check}`}>
                    <Icon name="check" size={12} strokeWidth={2.8} />
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <WhatsAppButton message={activeProd.whatsAppKey} className="w-full sm:flex-1">
                {activeProd.orderLabel}
              </WhatsAppButton>
              <AnchorButton href={`#${activeProd.id}`} variant="ghost" className="w-full sm:flex-1">
                <span>{SOLUTIONS_INTRO.discoverLabel}</span>
                <Icon name="arrowLeft" size={17} />
              </AnchorButton>
            </div>
          </div>
        </article>

        {/* Companion System Quick-Switch Banner */}
        <div className="m-sol-companion mx-auto mt-3.5 flex max-w-2xl flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/12 bg-night/75 px-4 py-3.5 sm:px-5">
          <div className="min-w-0 flex-1">
            <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold ${otherTheme.pill}`}>
              <Latin>{otherProd.englishName}</Latin>
            </span>
            <p className="mt-1 text-sm font-black text-white">{otherProd.title}</p>
            <p className="text-xs text-haze">{otherProd.focus}</p>
          </div>
          <button
            type="button"
            onClick={() => setMobileSys(otherProd.id)}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-sky/35 bg-panel/80 px-3.5 py-2 text-xs font-extrabold text-white transition-colors hover:border-cyan hover:bg-panel"
          >
            <span>عرض {otherProd.shortName}</span>
            <Icon name="arrowLeft" size={14} />
          </button>
        </div>
      </div>
    </section>
  )
}
