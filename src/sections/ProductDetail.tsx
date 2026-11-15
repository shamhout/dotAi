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
 * Desktop (>=1024px): Interactive dual product studios with 3D perspective stage + matrix.
 * Mobile/Tablet (<1024px): System Studio card + live workbench + interactive capability spotlight deck.
 */
export function ProductDetail({ product, flip = false }: { product: Product; flip?: boolean }) {
  const [focusedIdx, setFocusedIdx] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const theme = PRODUCT_THEME[product.id]
  const isHr = product.id === 'hr'
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

    // Mobile & Tablet (<1024px): Sheet slide + elastic workbench pop + wave chip reveal
    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      if (flip) {
        gsap.from('.spectral-bridge-beam', {
          scaleX: 0,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 86%',
            once: true,
          },
        })
      }

      gsap.from('.m-prod-hero', {
        y: 26,
        scale: 0.96,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.m-prod-hero',
          start: 'top 86%',
          once: true,
        },
      })

      gsap.from('.m-prod-stage', {
        y: 32,
        scale: 0.93,
        opacity: 0,
        duration: 0.68,
        ease: 'back.out(1.2)',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.m-prod-stage',
          start: 'top 88%',
          once: true,
        },
      })

      gsap.from('.m-prod-cap-chip', {
        y: 12,
        scale: 0.92,
        opacity: 0,
        duration: 0.4,
        stagger: 0.03,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.m-prod-caps',
          start: 'top 88%',
          once: true,
        },
      })
    })
  })

  return (
    <section
      ref={sectionRef}
      id={product.id}
      aria-label={product.title}
      className="relative isolate overflow-x-clip py-14 sm:py-16 lg:py-28"
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
        {/* Dual Systems Top Switcher Bar at top of first system */}
        {!flip && (
          <div className="mb-7 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-night/70 px-4 py-3 sm:px-5 sm:py-3.5 lg:mb-12">
            <p className="text-xs font-bold text-mist sm:text-sm">
              منظومتان متكاملتان نبنيهما لتشغيل شركتك بكفاءة أعلى
            </p>
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

        {/* Desktop View (>=1024px): Editorial Narrative + 3D Workbench + Capabilities Ledger */}
        <div className="product-split hidden items-center gap-12 lg:grid lg:grid-cols-12">
          <div className={`product-narrative lg:col-span-6 ${flip ? 'lg:order-2' : ''}`}>
            <div className="inline-flex flex-wrap items-center gap-3">
              <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-bold ${theme.pill}`}>
                <Latin>{product.englishName}</Latin>
              </span>
            </div>

            <h2 className="mt-4 text-balance text-[2.65rem] font-black leading-[1.35]">
              {product.title}
            </h2>

            <p className="text-gradient mt-3 text-2xl font-extrabold leading-9">{product.value}</p>
            <p className="mt-5 text-pretty text-lg leading-9 text-mist">{product.howItHelps}</p>

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

            <div className="mt-9 flex flex-row items-center gap-3">
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

        <div className="product-matrix mt-20 hidden lg:block">
          <div className="overflow-hidden rounded-2xl border border-white/12 bg-night/55">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-panel/45 px-7 py-4">
              <div>
                <h3 className="text-xl font-black text-white">إمكانيات {product.shortName}</h3>
                <p className="mt-0.5 text-sm text-haze">
                  اختر أي وحدة لاستعراض دورها في تنظيم العمل اليومي
                </p>
              </div>
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold ${theme.pill}`}
              >
                <Icon name={activeCapability.icon} size={15} />
                <span>{activeCapability.title}</span>
              </div>
            </div>

            <ul className="grid grid-cols-2 gap-px bg-white/10">
              {product.capabilities.map((cap, i) => {
                const isSelected = focusedIdx === i
                const spanFull = isOddCapabilities && i === product.capabilities.length - 1
                return (
                  <li key={cap.title} className={`bg-ink/95 ${spanFull ? 'col-span-2' : ''}`}>
                    <button
                      type="button"
                      onClick={() => setFocusedIdx(i)}
                      onMouseEnter={() => setFocusedIdx(i)}
                      className={`group flex h-full w-full cursor-pointer items-start gap-4 p-6 text-start transition-colors ${
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

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-night/75 px-7 py-4">
              <p className="text-sm font-semibold text-mist">
                هل يناسب <span className="font-bold text-white">{product.shortName}</span> طبيعة عملك؟ تواصل مباشرة مع فريقنا.
              </p>
              <WhatsAppButton message={product.whatsAppKey} size="sm">
                {product.orderLabel}
              </WhatsAppButton>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet View (<1024px): Compact Studio Header + Workbench + Capability Spotlight Deck */}
        <div className="mx-auto max-w-2xl lg:hidden">
          {/* 1. System Studio Header Card */}
          <div className="m-prod-hero rounded-3xl border border-white/12 bg-night/75 p-5 sm:p-6">
            <div className="flex items-center justify-between gap-2">
              <span className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-bold ${theme.pill}`}>
                <Latin>{product.englishName}</Latin>
              </span>
              <span className="font-mono text-xs font-bold text-haze">
                <Latin>{isHr ? '01 / HR' : '02 / SALES'}</Latin>
              </span>
            </div>

            <h2 className="mt-4 text-balance text-[1.75rem] font-black leading-[1.32] text-white sm:text-4xl">
              {product.title}
            </h2>
            <p className="text-gradient mt-2 text-lg font-extrabold leading-8 sm:text-2xl">{product.value}</p>
            <p className="mt-3 text-pretty text-sm leading-7 text-mist sm:text-base sm:leading-8">{product.howItHelps}</p>

            {/* Compact 2-Column Outcomes Pills */}
            <ul className="mt-5 grid gap-2 min-[380px]:grid-cols-2">
              {product.benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 rounded-xl border border-white/8 bg-ink/75 p-2.5 text-xs leading-5 text-white sm:p-3 sm:text-sm"
                >
                  <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-md ${theme.check}`}>
                    <Icon name="check" size={12} strokeWidth={2.8} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Interactive Live Workbench */}
          <div className="m-prod-stage mt-5">
            <ProductWorkbench system={product.id} />
            <p className="mt-2.5 text-center text-xs text-haze">
              تصوّر تفاعلي لمكونات {product.shortName} — يتم تجهيز النظام وفق احتياج شركتك
            </p>
          </div>

          {/* 3. Interactive Capability Spotlight Deck (replaces oversized scroll matrix) */}
          <div className="m-prod-caps mt-5 rounded-3xl border border-white/12 bg-ink/90 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-black text-white sm:text-lg">إمكانيات {product.shortName}</h3>
              <span className="text-[11px] font-semibold text-haze">اضغط على أي وحدة</span>
            </div>

            {/* Active Capability Spotlight */}
            <div
              className={`mt-3.5 rounded-2xl border p-4 transition-colors duration-200 ${
                isHr
                  ? 'border-cyan/35 bg-gradient-to-l from-cyan/10 to-night'
                  : 'border-violet/40 bg-gradient-to-l from-violet/14 to-night'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className={`grid size-10 shrink-0 place-items-center rounded-xl border ${theme.iconTile}`}>
                    <Icon name={activeCapability.icon} size={18} />
                  </span>
                  <h4 className="text-sm font-black text-white sm:text-base">{activeCapability.title}</h4>
                </div>
                <span className={`shrink-0 font-mono text-xs font-bold ${isHr ? 'text-cyan' : 'text-iris'}`}>
                  <Latin>
                    {String(focusedIdx + 1).padStart(2, '0')} / {String(product.capabilities.length).padStart(2, '0')}
                  </Latin>
                </span>
              </div>
              <p className="mt-2.5 text-xs leading-6 text-mist sm:text-sm sm:leading-7">{activeCapability.text}</p>
            </div>

            {/* 2-Column Touch Chip Selector Grid */}
            <div className="mt-3 grid grid-cols-2 gap-2" role="tablist" aria-label={`اختر ميزة في ${product.shortName}`}>
              {product.capabilities.map((cap, i) => {
                const isSelected = focusedIdx === i
                const spanFull = isOddCapabilities && i === product.capabilities.length - 1
                return (
                  <button
                    key={cap.title}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setFocusedIdx(i)}
                    className={`m-prod-cap-chip flex w-full cursor-pointer items-center gap-2 rounded-xl border px-2.5 py-2 text-start text-xs font-bold transition-all ${
                      spanFull ? 'col-span-2' : ''
                    } ${
                      isSelected
                        ? isHr
                          ? 'border-cyan/55 bg-panel/90 text-white shadow-[0_0_20px_-10px_rgb(3_220_254/0.55)]'
                          : 'border-violet/55 bg-panel/90 text-white shadow-[0_0_20px_-10px_rgb(94_76_249/0.6)]'
                        : 'border-white/8 bg-night/70 text-mist hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <Icon
                      name={cap.icon}
                      size={14}
                      className={`shrink-0 ${isSelected ? (isHr ? 'text-cyan' : 'text-iris') : 'text-haze'}`}
                    />
                    <span className="leading-snug">{cap.title}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 4. Mobile Conversion Bar */}
          <div className="m-prod-cta mt-4 flex flex-col gap-3 rounded-2xl border border-white/10 bg-night/80 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-semibold leading-6 text-mist sm:text-sm">
              تواصل معنا على واتساب لتجهيز <span className="font-bold text-white">{product.shortName}</span> لشركتك.
            </p>
            <WhatsAppButton message={product.whatsAppKey} size="lg" className="w-full shrink-0 sm:w-auto">
              {product.orderLabel}
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  )
}
