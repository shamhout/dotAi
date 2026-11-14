import { useRef, useState } from 'react'
import { WhatsAppButton } from '../components/Buttons'
import { Icon } from '../components/Icon'
import { Latin } from '../components/Latin'
import { ProductWorkbench } from '../components/ProductWorkbench'
import type { Product } from '../config/site'
import { gsap, useGsapScene } from '../lib/motion'
import { PRODUCT_THEME } from './productTheme'

/**
 * SCENE 06 — WHAT WE BUILD (#hr and #sales)
 * Interactive dual product studios connected by a Cyan-to-Violet spectral bridge:
 * narrative slides from its system axis while each live workbench settles in 3D space.
 */
export function ProductDetail({ product, flip = false }: { product: Product; flip?: boolean }) {
  const [focusedIdx, setFocusedIdx] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const theme = PRODUCT_THEME[product.id]
  const titleId = `${product.id}-title`
  const isHr = product.id === 'hr'
  const sceneTag = isHr ? 'المشهد 06 · ما نبنيه — النظام الأول' : 'المشهد 06 · ما نبنيه — النظام الثاني'
  const isOddCapabilities = product.capabilities.length % 2 === 1

  const activeCapability = product.capabilities[focusedIdx] ?? product.capabilities[0]

  useGsapScene(sectionRef, (_ctx, mm) => {
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      // Inter-product spectral handoff beam (HR Cyan -> Sales Violet)
      gsap.from('.spectral-bridge-beam', {
        scaleX: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 84%',
          once: true,
        },
      })

      // Editorial copy enters along its system track direction
      gsap.from('.product-narrative', {
        x: flip ? -48 : 48,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.product-split',
          start: 'top 82%',
          once: true,
        },
      })

      // Deeper 3D perspective studio settle for interactive workbench
      gsap.from('.product-stage', {
        rotateY: flip ? 14 : -14,
        rotateX: 6,
        y: 24,
        scale: 0.91,
        opacity: 0,
        duration: 0.95,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.product-split',
          start: 'top 82%',
          once: true,
        },
      })

      // Subtle scroll depth scrub on workbench inside desktop stage
      gsap.to('.product-stage', {
        y: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      })

      // Architectural capability ledger rises and cascades items
      gsap.from('.product-matrix', {
        y: 30,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.product-matrix',
          start: 'top 88%',
          once: true,
        },
      })
    })

    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.from('.product-narrative, .product-stage, .product-matrix', {
        y: 18,
        opacity: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 84%',
          once: true,
        },
      })
    })
  })

  return (
    <section
      ref={sectionRef}
      id={product.id}
      aria-labelledby={titleId}
      className="relative isolate overflow-x-clip py-20 lg:py-28"
    >
      {/* Unique transition into #sales: diagonal Cyan-to-Violet spectral handoff */}
      {flip ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-14 overflow-hidden"
        >
          <div className="spectral-bridge-beam mx-auto h-px w-full origin-right bg-gradient-to-l from-cyan via-azure to-violet opacity-75" />
          <div className="mx-auto flex max-w-4xl items-center justify-center pt-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-night/90 px-3.5 py-1 text-[11px] font-bold text-mist shadow-[0_6px_24px_-8px_rgb(94_76_249/0.45)]">
              <span className="size-1.5 rounded-full bg-cyan" />
              <span>تحوّل المسار</span>
              <span className="text-haze">←</span>
              <span className="size-1.5 rounded-full bg-violet" />
              <span className="text-iris">المبيعات والنمو</span>
            </span>
          </div>
        </div>
      ) : (
        <div className="hairline-x absolute inset-x-0 top-0" aria-hidden="true" />
      )}

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -z-10 h-[38rem] w-[38rem] ${theme.glow} ${
          flip ? 'start-[-14%]' : 'end-[-14%]'
        } top-10`}
      />

      <div className="container-x">
        {/* Scene 06 Chapter Studio Switcher at top of first system */}
        {!flip && (
          <div className="mb-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-night/70 px-5 py-3.5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-glow">
                <Latin>SCENE 06</Latin>
              </span>
              <span className="h-3.5 w-px bg-white/15" aria-hidden="true" />
              <p className="text-xs font-bold text-mist sm:text-sm">
                منظومتان متكاملتان نبنيهما لتشغيل شركتك بكفاءة أعلى
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold">
              <a
                href="#hr"
                className="inline-flex items-center gap-1.5 rounded-full border border-cyan/35 bg-cyan/10 px-3 py-1 text-cyan transition-colors hover:bg-cyan/20"
              >
                <span className="size-1.5 rounded-full bg-cyan" />
                <span><Latin>01 · HR</Latin></span>
              </a>
              <a
                href="#sales"
                className="inline-flex items-center gap-1.5 rounded-full border border-violet/35 bg-violet/10 px-3 py-1 text-iris transition-colors hover:bg-violet/20"
              >
                <span className="size-1.5 rounded-full bg-violet" />
                <span><Latin>02 · Sales</Latin></span>
              </a>
            </div>
          </div>
        )}

        {/* Part 1: Editorial Narrative + Interactive 3D Perspective Workbench */}
        <div className="product-split grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
          <div className={`product-narrative lg:col-span-6 ${flip ? 'lg:order-2' : ''}`}>
            <div className="inline-flex flex-wrap items-center gap-3">
              <span className={`font-mono text-xs font-bold tracking-[0.2em] ${isHr ? 'text-cyan' : 'text-iris'}`}>
                <Latin>06</Latin>
              </span>
              <span
                aria-hidden="true"
                className={`h-px w-8 ${isHr ? 'bg-gradient-to-l from-cyan to-transparent' : 'bg-gradient-to-l from-violet to-transparent'}`}
              />
              <span className="text-xs font-extrabold text-glow">{sceneTag}</span>
              <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-bold ${theme.pill}`}>
                <Latin>{product.englishName}</Latin>
              </span>
            </div>

            <h2
              id={titleId}
              className="mt-4 text-balance text-[1.85rem] font-black leading-[1.35] sm:text-4xl lg:text-[2.65rem]"
            >
              {product.title}
            </h2>

            <p className="text-gradient mt-3 text-xl font-extrabold leading-9 sm:text-2xl">{product.value}</p>
            <p className="mt-5 text-pretty text-base leading-8 text-mist sm:text-lg sm:leading-9">{product.howItHelps}</p>

            {/* Outcomes checklist */}
            <ul className="mt-7 grid gap-3 border-t border-white/10 pt-6">
              {product.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-base leading-7 text-white">
                  <span className={`mt-1 grid size-6 shrink-0 place-items-center rounded-md ${theme.check}`}>
                    <Icon name="check" size={14} strokeWidth={2.8} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <WhatsAppButton message={product.whatsAppKey} size="lg">
                {product.orderLabel}
              </WhatsAppButton>
              <p className="text-sm text-haze">تواصل معنا على واتساب لمعرفة التفاصيل والأسعار.</p>
            </div>
          </div>

          <div className={`perspective-stage lg:col-span-6 ${flip ? 'lg:order-1' : ''}`}>
            <div className="product-stage">
              <ProductWorkbench system={product.id} />
              <p className="mt-3 text-center text-xs text-haze">
                تصوّر تفاعلي لمكونات {product.shortName} — يتم تجهيز النظام وفق احتياج شركتك
              </p>
            </div>
          </div>
        </div>

        {/* Part 2: Architectural Capabilities Specification Matrix */}
        <div className="product-matrix mt-16 lg:mt-20">
          <div className="overflow-hidden rounded-2xl border border-white/12 bg-night/55">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-panel/45 px-5 py-4 sm:px-7">
              <div>
                <h3 className="text-lg font-black text-white sm:text-xl">إمكانيات {product.shortName}</h3>
                <p className="mt-0.5 text-xs text-haze sm:text-sm">
                  اختر أي وحدة لاستعراض دورها في تنظيم العمل اليومي
                </p>
              </div>
              <div
                className={`hidden items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold md:inline-flex ${theme.pill}`}
              >
                <Icon name={activeCapability.icon} size={15} />
                <span>{activeCapability.title}</span>
              </div>
            </div>

            <ul className="grid gap-px bg-white/10 sm:grid-cols-2">
              {product.capabilities.map((cap, i) => {
                const isSelected = focusedIdx === i
                const spanFull = isOddCapabilities && i === product.capabilities.length - 1
                return (
                  <li key={cap.title} className={`bg-ink/95 ${spanFull ? 'sm:col-span-2' : ''}`}>
                    <button
                      type="button"
                      onClick={() => setFocusedIdx(i)}
                      onMouseEnter={() => setFocusedIdx(i)}
                      className={`group flex h-full w-full cursor-pointer items-start gap-4 p-5 text-start transition-colors sm:p-6 ${
                        isSelected
                          ? isHr
                            ? 'bg-gradient-to-l from-cyan/10 via-night/90 to-ink'
                            : 'bg-gradient-to-l from-violet/14 via-night/90 to-ink'
                          : 'hover:bg-night/70'
                      }`}
                    >
                      <span
                        className={`grid size-11 shrink-0 place-items-center rounded-xl border transition-transform duration-300 group-hover:scale-105 ${theme.iconTile}`}
                      >
                        <Icon name={cap.icon} size={20} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-base font-extrabold text-white">{cap.title}</h4>
                          <span
                            className={`font-mono text-xs font-bold transition-colors ${
                              isSelected ? (isHr ? 'text-cyan' : 'text-iris') : 'text-haze/70'
                            }`}
                          >
                            <Latin>{String(i + 1).padStart(2, '0')}</Latin>
                          </span>
                        </div>
                        <p className="mt-1.5 text-sm leading-7 text-mist">{cap.text}</p>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-night/75 px-5 py-4 sm:px-7">
              <p className="text-sm font-semibold text-mist">
                هل يناسب <span className="font-bold text-white">{product.shortName}</span> طبيعة عملك؟ تواصل مباشرة مع فريقنا.
              </p>
              <WhatsAppButton message={product.whatsAppKey} size="sm">
                {product.orderLabel}
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
