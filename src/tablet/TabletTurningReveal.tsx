import { useRef } from 'react'
import { AnchorButton, WhatsAppButton } from '../components/Buttons'
import { Icon } from '../components/Icon'
import { Latin } from '../components/Latin'
import { Logo } from '../components/Logo'
import { BRAND } from '../config/brand'
import { SEO } from '../config/seo'
import { ABOUT, PRODUCTS } from '../config/site'
import { BRAND_REVEAL, TURNING_POINT } from '../config/storyData'
import { gsap, useGsapScene } from '../lib/motion'

/**
 * TABLET SCENES 04 & 05 — TURNING POINT (#about) + BRAND REVEAL (#solutions)
 * Transition 03 -> 04: 6 operational tiles pull inward into aligned symmetry.
 * Transition 04 -> 05: Side curtains part horizontally as iris spotlight unveils dot Ai
 * emblem and draws twin Cyan/Violet pathways into HR & Sales overview portals.
 */
export function TabletTurningReveal() {
  const wrapRef = useRef<HTMLDivElement>(null)

  useGsapScene(wrapRef, (_ctx, mm) => {
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.t-turn-cluster', {
        x: (i) => (i % 2 === 0 ? 40 : -40),
        rotation: (i) => (i % 2 === 0 ? 6 : -6),
        scale: 0.9,
        opacity: 0.2,
        duration: 0.72,
        stagger: 0.06,
        ease: 'back.out(1.25)',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '#about',
          start: 'top 88%',
          once: true,
        },
      })

      gsap.from('.t-turn-headline', {
        clipPath: 'inset(0 0 100% 0)',
        y: 26,
        opacity: 0,
        duration: 0.8,
        ease: 'power4.out',
        clearProps: 'clipPath,transform,opacity',
        scrollTrigger: {
          trigger: '.t-turn-headline',
          start: 'top 88%',
          once: true,
        },
      })

      gsap.from('.t-brand-chamber', {
        clipPath: 'circle(12% at 50% 45%)',
        scale: 0.91,
        opacity: 0.28,
        duration: 0.95,
        ease: 'power3.out',
        clearProps: 'clipPath,transform,opacity',
        scrollTrigger: {
          trigger: '#solutions',
          start: 'top 88%',
          once: true,
        },
      })

      gsap.from('.t-brand-ring', {
        scale: 0.5,
        opacity: 0,
        duration: 1.0,
        stagger: 0.14,
        ease: 'back.out(1.2)',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '#solutions',
          start: 'top 88%',
          once: true,
        },
      })

      gsap.from('.t-brand-portal', {
        x: (i) => (i === 0 ? 34 : -34),
        scale: 0.95,
        opacity: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.t-brand-portals',
          start: 'top 90%',
          once: true,
        },
      })

      const paths = gsap.utils.toArray<SVGPathElement>('.t-brand-path')
      paths.forEach((p) => {
        const len = p.getTotalLength()
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(p, {
          strokeDashoffset: 0,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.t-brand-svg',
            start: 'top 88%',
            once: true,
          },
        })
      })
    })
  })

  return (
    <div ref={wrapRef} className="overflow-x-clip">
      {/* SCENE 04: Turning Point */}
      <section id="about" aria-labelledby="t-about-title" className="relative bg-gradient-to-b from-ink via-night/60 to-ink px-6 py-16">
        <div className="hairline-x absolute inset-x-0 top-0" aria-hidden="true" />
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <span className="inline-flex items-center gap-2 text-xs font-extrabold text-glow">
                <span className="size-1.5 rounded-full bg-cyan" aria-hidden="true" />
                <span>{TURNING_POINT.eyebrow}</span>
              </span>
              <p className="mt-4 text-lg font-bold text-mist">{TURNING_POINT.prompt}</p>
              <div className="t-turn-headline mt-2">
                <h2 id="t-about-title" className="text-gradient text-3xl font-black leading-[1.25] lg:text-4xl">
                  {TURNING_POINT.headline}
                </h2>
              </div>
              <p className="mt-4 text-base leading-8 text-mist">{TURNING_POINT.lead}</p>
            </div>

            <div className="md:col-span-5">
              <ul className="grid grid-cols-2 gap-2.5" aria-label="عمليات قابلة للترابط">
                {TURNING_POINT.clusters.map((item) => (
                  <li
                    key={item}
                    className="t-turn-cluster flex items-center gap-2 rounded-xl border border-sky/25 bg-panel/45 px-3 py-3 text-xs font-extrabold text-white"
                  >
                    <Icon name="check" size={14} className="shrink-0 text-cyan" strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3x2 Tablet Sectors Strip */}
          <div className="mt-10 rounded-2xl border border-white/10 bg-night/70 p-4">
            <div className="mb-3 flex items-center justify-between text-xs">
              <span className="font-extrabold text-glow">{ABOUT.audienceTitle}</span>
              <span className="font-mono text-haze">
                <Latin>01 — 06</Latin>
              </span>
            </div>
            <ul className="grid grid-cols-3 gap-2">
              {ABOUT.audience.map((sector) => (
                <li
                  key={sector}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-ink/85 px-3 py-2 text-xs font-bold text-mist"
                >
                  <Icon name="check" size={13} className="shrink-0 text-cyan" />
                  <span>{sector}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SCENE 05: The Brand Reveal (dot Ai) */}
      <section id="solutions" aria-labelledby="t-brand-title" className="relative px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="t-brand-chamber surface-console relative isolate overflow-hidden rounded-3xl border border-sky/35 px-8 py-12 text-center">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 grid place-items-center overflow-hidden">
              <div className="t-brand-ring animate-spin-slow size-[26rem] rounded-full border border-dashed border-cyan/25" />
              <div className="t-brand-ring animate-spin-slower absolute size-[18rem] rounded-full border border-violet/30" />
            </div>

            <div className="inline-flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-gradient-to-l from-cyan to-transparent" />
              <span className="text-xs font-extrabold text-glow">{BRAND_REVEAL.eyebrow}</span>
              <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-violet to-transparent" />
            </div>

            <div className="mt-6 flex justify-center">
              <div className="rounded-2xl border border-white/15 bg-ink/90 px-8 py-5 shadow-[0_18px_50px_-14px_rgb(3_220_254/0.5)]">
                <Logo size="lg" />
              </div>
            </div>

            <h2 id="t-brand-title" className="mt-6 text-3xl font-black text-white">
              {BRAND_REVEAL.headline}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-8 text-mist">{BRAND_REVEAL.subhead}</p>
            <p className="mt-3 text-xs font-extrabold tracking-wide text-glow">
              <Latin>{SEO.tagline}</Latin>
            </p>
          </div>

          {/* Twin Beam Conduit SVG (HR Cyan right / Sales Violet left in RTL grid) */}
          <svg viewBox="0 0 600 54" className="t-brand-svg mx-auto h-12 w-full" aria-hidden="true">
            <path
              d="M300 0 C300 28 455 18 455 54"
              fill="none"
              stroke={BRAND.cyan}
              strokeWidth="2.5"
              strokeLinecap="round"
              className="t-brand-path"
            />
            <path
              d="M300 0 C300 28 145 18 145 54"
              fill="none"
              stroke={BRAND.violet}
              strokeWidth="2.5"
              strokeLinecap="round"
              className="t-brand-path"
            />
          </svg>

          {/* 2-Column Split Portal Cards */}
          <div className="t-brand-portals grid grid-cols-2 gap-5">
            {[PRODUCTS.hr, PRODUCTS.sales].map((p) => {
              const isHr = p.id === 'hr'
              return (
                <article
                  key={p.id}
                  className={`t-brand-portal surface-architect flex flex-col justify-between rounded-3xl border p-6 ${
                    isHr ? 'border-cyan/30' : 'border-violet/35'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`rounded-md border px-2.5 py-0.5 text-[11px] font-bold ${
                          isHr ? 'border-cyan/30 bg-cyan/10 text-glow' : 'border-violet/35 bg-violet/15 text-iris'
                        }`}
                      >
                        <Latin>{p.englishName}</Latin>
                      </span>
                      <span className="font-mono text-xs font-bold text-haze">
                        <Latin>{isHr ? '01' : '02'}</Latin>
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl font-black text-white">{p.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-mist">{p.summary}</p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <WhatsAppButton message={p.whatsAppKey} size="sm" className="flex-1">
                      {p.orderLabel}
                    </WhatsAppButton>
                    <AnchorButton href={`#${p.id}`} variant="ghost" size="sm" className="flex-1">
                      <span>التفاصيل</span>
                      <Icon name="arrowLeft" size={15} />
                    </AnchorButton>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
