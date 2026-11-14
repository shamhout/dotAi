import { useRef } from 'react'
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
        <div className="relative h-48 overflow-hidden sm:h-52">
          <Illustration className="relative mx-auto w-full max-w-lg transition-transform duration-500 group-hover:-translate-y-1.5" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
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
 * Dramatic brand reveal: the focused line from Scene 02 blooms into the dot Ai
 * core, then splits via scroll-drawn SVG conduits into HR (Cyan) and Sales (Violet).
 */
export function Solutions() {
  const sectionRef = useRef<HTMLElement>(null)
  const coreRef = useRef<HTMLDivElement>(null)
  const splitHrRef = useRef<SVGPathElement>(null)
  const splitSalesRef = useRef<SVGPathElement>(null)

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

    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      const mobileTargets = [coreRef.current, '.portal-start', '.portal-end'].filter(Boolean)
      if (!mobileTargets.length || !sectionRef.current) return
      gsap.from(mobileTargets, {
        y: 26,
        opacity: 0,
        duration: 0.65,
        stagger: 0.14,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    })
  })

  return (
    <section ref={sectionRef} id="solutions" aria-labelledby="solutions-title" className="relative overflow-hidden py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-transparent via-night/70 to-transparent"
      />
      <div className="hairline-x absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="container-x">
        {/* Dramatic Brand Turning Point Hub */}
        <div ref={coreRef} className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-3">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-cyan">
              <Latin>03</Latin>
            </span>
            <span aria-hidden="true" className="h-px w-8 bg-gradient-to-l from-cyan via-sky to-transparent" />
            <p className="text-sm font-extrabold text-glow">{SOLUTIONS_INTRO.sceneTag}</p>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-sky/35 bg-panel/65 px-5 py-2.5 shadow-[0_0_50px_-14px_rgb(17_166_251/0.65)]">
              <Logo />
            </div>
          </div>

          <h2
            id="solutions-title"
            className="mt-6 text-balance text-[1.9rem] font-black leading-[1.32] sm:text-4xl lg:text-[3rem]"
          >
            {SOLUTIONS_INTRO.title}
          </h2>
          <p className="mt-4 text-pretty text-base leading-8 text-mist sm:text-lg">{SOLUTIONS_INTRO.text}</p>
        </div>

        {/* Scroll-Drawn SVG Stream Splitter (1 Core → 2 Intelligent Systems in RTL: Right=HR, Left=Sales) */}
        <div className="mx-auto hidden max-w-3xl lg:block" aria-hidden="true">
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
        <div className="portals-grid mt-8 grid gap-6 lg:mt-0 lg:grid-cols-2 lg:gap-8">
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
    </section>
  )
}
