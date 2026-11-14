import { useRef, useState } from 'react'
import { WhatsAppButton } from '../components/Buttons'
import { Icon } from '../components/Icon'
import { Latin } from '../components/Latin'
import { TouchWorkDemo } from '../components/TouchWorkDemo'
import { PRODUCTS, type Product } from '../config/site'
import { SERVICES_PROBLEM_MAP } from '../config/storyData'
import { gsap, useGsapScene } from '../lib/motion'

function MobileProductDeck({ product }: { product: Product }) {
  const [showAllCaps, setShowAllCaps] = useState(false)
  const isHr = product.id === 'hr'
  const problemMeta = SERVICES_PROBLEM_MAP[product.id]

  return (
    <article
      id={product.id}
      aria-labelledby={`m-${product.id}-title`}
      className={`m-service-panel surface-architect overflow-hidden rounded-3xl border ${
        isHr ? 'border-cyan/30' : 'border-violet/35'
      }`}
    >
      <div
        aria-hidden="true"
        className={`h-1 w-full bg-gradient-to-l ${
          isHr ? 'from-cyan via-sky to-azure' : 'from-violet via-electric to-azure'
        }`}
      />

      <div className="p-4 sm:p-5">
        {/* Track Pill + Name */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span
            className={`inline-flex items-center rounded-md border px-2.5 py-1 text-[11px] font-extrabold ${
              isHr ? 'border-cyan/30 bg-cyan/10 text-glow' : 'border-violet/35 bg-violet/15 text-iris'
            }`}
          >
            <Latin>{product.englishName}</Latin>
          </span>
          <span className="font-mono text-xs font-bold text-haze">
            <Latin>{isHr ? '01' : '02'}</Latin>
          </span>
        </div>

        <h3 id={`m-${product.id}-title`} className="mt-3 text-xl font-black leading-snug text-white">
          {product.title}
        </h3>
        <p className="text-gradient mt-1 text-base font-extrabold leading-snug">{product.value}</p>

        {/* The Problem It Solves */}
        <div className="mt-4 rounded-2xl border border-white/10 bg-ink/85 p-3.5">
          <span className="block text-[11px] font-extrabold text-haze">{problemMeta.problemLabel}</span>
          <p className="mt-1 text-xs leading-6 text-mist">{problemMeta.problemSolved}</p>
        </div>

        {/* Short Explanation */}
        <p className="mt-3.5 text-sm leading-7 text-mist">{product.summary}</p>

        {/* Visual Touch Demo */}
        <div className="mt-4">
          <TouchWorkDemo system={product.id} variant="mobile" />
        </div>

        {/* Scannable Key Capabilities + Accordion for Full Matrix */}
        <div className="mt-5 rounded-2xl border border-white/10 bg-night/70 p-3.5">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-black text-white">ماذا ينظّم لك؟</h4>
            <button
              type="button"
              aria-expanded={showAllCaps}
              onClick={() => setShowAllCaps((v) => !v)}
              className={`min-h-8 cursor-pointer rounded-lg border px-2.5 text-[11px] font-bold transition-colors ${
                isHr ? 'border-cyan/30 text-glow' : 'border-violet/35 text-iris'
              }`}
            >
              {showAllCaps ? 'إخفاء التفاصيل' : `كل الإمكانيات (${product.capabilities.length})`}
            </button>
          </div>

          <ul className="mt-3 space-y-2">
            {(showAllCaps ? product.capabilities : product.capabilities.slice(0, 4)).map((cap) => (
              <li key={cap.title} className="m-cap-item flex items-start gap-2.5">
                <span
                  className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg border ${
                    isHr ? 'border-cyan/25 bg-cyan/10 text-glow' : 'border-violet/35 bg-violet/15 text-iris'
                  }`}
                >
                  <Icon name={cap.icon} size={13} />
                </span>
                <div>
                  <p className="text-xs font-extrabold text-white">{cap.title}</p>
                  <p className="text-[11px] leading-5 text-mist">{cap.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Dedicated System WhatsApp CTA */}
        <div className="mt-5">
          <WhatsAppButton message={product.whatsAppKey} size="lg" className="w-full">
            {product.orderLabel}
          </WhatsAppButton>
        </div>
      </div>
    </article>
  )
}

/**
 * MOBILE SCENE 07 — WHAT WE OFFER (#hr & #sales)
 * Transition 06 -> 07: Spatial vertical card deck with direct visual demos
 * and problem-to-solution scannable structure for touch screens.
 */
export function MobileServices() {
  const sectionRef = useRef<HTMLElement>(null)

  useGsapScene(sectionRef, (_ctx, mm) => {
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.m-service-panel', {
        rotateX: 7,
        y: 34,
        scale: 0.94,
        opacity: 0,
        duration: 0.72,
        stagger: 0.16,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          once: true,
        },
      })

      gsap.from('.m-cap-item', {
        x: 16,
        opacity: 0,
        duration: 0.42,
        stagger: 0.04,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.m-services-deck',
          start: 'top 86%',
          once: true,
        },
      })
    })
  })

  return (
    <section ref={sectionRef} aria-labelledby="m-services-title" className="relative overflow-x-clip px-4 py-14">
      <div className="hairline-x absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="mx-auto max-w-md">
        <span className="inline-flex items-center gap-2 text-xs font-extrabold text-glow">
          <span className="size-1.5 rounded-full bg-cyan" aria-hidden="true" />
          <span>الفصل 07 · ما نبنيه لشركتك</span>
        </span>
        <h2 id="m-services-title" className="mt-3 text-[clamp(1.45rem,5.8vw,2rem)] font-black leading-[1.3] text-white">
          منظومتان متكاملتان تبدأ منهما أتمتة شغلك.
        </h2>

        {/* Quick System Jump Pills */}
        <div className="mt-5 grid grid-cols-2 gap-2">
          <a
            href="#hr"
            className="flex min-h-10 items-center justify-center gap-2 rounded-xl border border-cyan/35 bg-cyan/10 text-xs font-extrabold text-glow"
          >
            <span className="size-1.5 rounded-full bg-cyan" aria-hidden="true" />
            <span>نظام HR الذكي</span>
          </a>
          <a
            href="#sales"
            className="flex min-h-10 items-center justify-center gap-2 rounded-xl border border-violet/40 bg-violet/12 text-xs font-extrabold text-iris"
          >
            <span className="size-1.5 rounded-full bg-violet" aria-hidden="true" />
            <span>نظام Sales الذكي</span>
          </a>
        </div>

        <div className="m-services-deck perspective-stage mt-6 space-y-8">
          <MobileProductDeck product={PRODUCTS.hr} />
          <MobileProductDeck product={PRODUCTS.sales} />
        </div>
      </div>
    </section>
  )
}
