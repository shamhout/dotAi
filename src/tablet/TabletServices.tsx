import { useRef } from 'react'
import { WhatsAppButton } from '../components/Buttons'
import { Icon } from '../components/Icon'
import { Latin } from '../components/Latin'
import { TouchWorkDemo } from '../components/TouchWorkDemo'
import { PRODUCTS, type Product } from '../config/site'
import { SERVICES_PROBLEM_MAP } from '../config/storyData'
import { gsap, useGsapScene } from '../lib/motion'

function TabletProductStudio({ product, flip = false }: { product: Product; flip?: boolean }) {
  const isHr = product.id === 'hr'
  const problemMeta = SERVICES_PROBLEM_MAP[product.id]

  return (
    <section
      id={product.id}
      aria-labelledby={`t-${product.id}-title`}
      className="relative overflow-x-clip px-6 py-16"
    >
      <div className="hairline-x absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="perspective-stage mx-auto max-w-5xl">
        <div className="t-service-studio grid items-start gap-8 md:grid-cols-12">
          {/* Narrative & Problem Solved */}
          <div className={`md:col-span-5 ${flip ? 'md:order-2' : ''}`}>
            <span
              className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-extrabold ${
                isHr ? 'border-cyan/30 bg-cyan/10 text-glow' : 'border-violet/35 bg-violet/15 text-iris'
              }`}
            >
              <Latin>{product.englishName}</Latin>
            </span>

            <h3 id={`t-${product.id}-title`} className="mt-4 text-3xl font-black leading-snug text-white">
              {product.title}
            </h3>
            <p className="text-gradient mt-2 text-lg font-extrabold leading-8">{product.value}</p>

            <div className="mt-4 rounded-2xl border border-white/10 bg-night/80 p-4">
              <span className="block text-xs font-extrabold text-haze">{problemMeta.problemLabel}</span>
              <p className="mt-1 text-xs leading-6 text-mist">{problemMeta.problemSolved}</p>
            </div>

            <p className="mt-4 text-sm leading-7 text-mist">{product.summary}</p>

            <div className="mt-6">
              <WhatsAppButton message={product.whatsAppKey} size="lg" className="w-full sm:w-auto">
                {product.orderLabel}
              </WhatsAppButton>
            </div>
          </div>

          {/* Interactive Tablet Visual Demo */}
          <div className={`md:col-span-7 ${flip ? 'md:order-1' : ''}`}>
            <TouchWorkDemo system={product.id} variant="tablet" />
          </div>
        </div>

        {/* Balanced 2-Column Tablet Capability Matrix */}
        <ul className="t-cap-matrix mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
          {product.capabilities.map((cap, i) => (
            <li key={cap.title} className="t-cap-cell flex items-start gap-3 bg-ink/95 p-4">
              <span
                className={`grid size-9 shrink-0 place-items-center rounded-xl border ${
                  isHr ? 'border-cyan/25 bg-cyan/10 text-glow' : 'border-violet/35 bg-violet/15 text-iris'
                }`}
              >
                <Icon name={cap.icon} size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-extrabold text-white">{cap.title}</h4>
                  <span className="font-mono text-[11px] font-bold text-haze">
                    <Latin>{String(i + 1).padStart(2, '0')}</Latin>
                  </span>
                </div>
                <p className="mt-1 text-xs leading-6 text-mist">{cap.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/**
 * TABLET SCENE 07 — WHAT WE OFFER (#hr & #sales)
 */
export function TabletServices() {
  const wrapRef = useRef<HTMLDivElement>(null)

  useGsapScene(wrapRef, (_ctx, mm) => {
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const studios = gsap.utils.toArray<HTMLElement>('.t-service-studio')
      studios.forEach((studio, i) => {
        gsap.from(studio, {
          rotateY: i % 2 === 0 ? -9 : 9,
          y: 30,
          scale: 0.95,
          opacity: 0,
          duration: 0.72,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: studio,
            start: 'top 88%',
            once: true,
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('.t-cap-matrix').forEach((matrix) => {
        gsap.from(matrix.querySelectorAll('.t-cap-cell'), {
          y: 16,
          opacity: 0,
          duration: 0.42,
          stagger: 0.04,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: matrix,
            start: 'top 88%',
            once: true,
          },
        })
      })
    })
  })

  return (
    <div ref={wrapRef} className="overflow-x-clip">
      <div className="mx-auto max-w-5xl px-6 pt-14">
        <span className="inline-flex items-center gap-2 text-xs font-extrabold text-glow">
          <span className="size-1.5 rounded-full bg-cyan" aria-hidden="true" />
          <span>الفصل 07 · الأنظمة التي نبنيها</span>
        </span>
        <h2 className="mt-2.5 text-3xl font-black text-white">حلول ذكية واضحة لعمليات HR والمبيعات</h2>
      </div>
      <TabletProductStudio product={PRODUCTS.hr} />
      <TabletProductStudio product={PRODUCTS.sales} flip />
    </div>
  )
}
