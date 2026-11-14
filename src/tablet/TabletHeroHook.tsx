import { useRef } from 'react'
import { Icon } from '../components/Icon'
import { Latin } from '../components/Latin'
import { BRAND } from '../config/brand'
import { HERO } from '../config/site'
import { HOOK_COPY } from '../config/storyData'
import { gsap, useGsapScene } from '../lib/motion'

const RADAR_NODES = [
  { label: 'رسائل العملاء', note: 'ردود غير منتظمة' },
  { label: 'الحضور والورديات', note: 'مراجعة يدوية' },
  { label: 'حساب الرواتب', note: 'تجميع ورقي' },
  { label: 'تقارير المبيعات', note: 'بيانات متفرقة' },
] as const

/**
 * TABLET SCENE 01 — EDITORIAL SPLIT HOOK (#home)
 * Asymmetric split canvas pairing kinetic typography with a live animated
 * Signal Leak Radar and an integrated optical story conduit.
 */
export function TabletHeroHook() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useGsapScene(sectionRef, (_ctx, mm) => {
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        '.t-hook-line',
        { clipPath: 'inset(0 0 100% 0)', y: 18, opacity: 0.78 },
        {
          clipPath: 'inset(0 0 0% 0)',
          y: 0,
          opacity: 1,
          duration: 0.52,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'clipPath,transform,opacity',
        },
      )

      gsap.fromTo(
        '.t-hook-fade',
        { y: 12, opacity: 0.78 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.06,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
        },
      )

      gsap.fromTo(
        '.t-radar-card',
        { x: -20, opacity: 0.8 },
        {
          x: 0,
          opacity: 1,
          duration: 0.55,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        },
      )

      gsap.fromTo(
        '.t-radar-node',
        { scale: 0.94, opacity: 0.75 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.45,
          stagger: 0.06,
          delay: 0.15,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
        },
      )

      // Smooth scrubbed parallax compression leading into Scene 02 (#problem)
      if (gridRef.current && sectionRef.current) {
        gsap.to(gridRef.current, {
          y: -30,
          scale: 0.96,
          opacity: 0.4,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: '65% top',
            end: 'bottom top',
            scrub: 0.5,
          },
        })
      }
    })
  })

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-labelledby="t-hook-title"
      className="relative isolate flex min-h-[min(92svh,52rem)] flex-col justify-center overflow-hidden px-6 pb-14 pt-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20">
        <div className="bg-grid absolute inset-0 opacity-70" />
        <div className="halo-breathe absolute -top-36 start-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(31_126_254/0.2),transparent)] rtl:translate-x-1/2" />
      </div>

      <div ref={gridRef} className="mx-auto grid w-full max-w-5xl items-center gap-8 md:grid-cols-12">
        {/* Editorial Kinetic Typography */}
        <div className="md:col-span-7">
          <h1
            id="t-hook-title"
            className="text-balance text-4xl font-black leading-[1.24] tracking-[-0.02em] lg:text-[2.85rem]"
          >
            <span className="t-hook-line block text-white">{HOOK_COPY.headlineTop}</span>
            <span className="t-hook-line text-gradient mt-2 block">{HOOK_COPY.headlineAccent}</span>
          </h1>

          <p className="t-hook-fade mt-5 max-w-xl text-base leading-8 text-mist">{HOOK_COPY.lead}</p>

          {/* Cohesive Optical Scroll Conduit matching Desktop & Mobile circuitry */}
          <div className="t-hook-fade mt-8">
            <a
              href="#problem"
              aria-label="الانتقال إلى المشهد التالي لاكتشاف أثر العمل اليدوي"
              className="group inline-flex items-center gap-3.5 text-xs font-bold text-mist transition-colors hover:text-white"
            >
              <span className="text-haze">{HERO.chaosLabel}</span>
              <span
                aria-hidden="true"
                className="grid size-10 place-items-center rounded-2xl border border-cyan/40 bg-night/90 text-cyan shadow-[0_0_22px_-6px_rgb(3_220_254/0.55)] transition-colors group-hover:border-cyan group-hover:bg-panel"
              >
                <Icon name="arrowLeft" size={16} className="chevron-bounce -rotate-90" />
              </span>
              <span className="text-glow">{HERO.orderPreviewLabel}</span>
              <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-violet/60 to-transparent" />
            </a>
          </div>
        </div>

        {/* Visual Signal Leak Console */}
        <div className="t-radar-card surface-console overflow-hidden rounded-3xl border border-sky/25 p-5 md:col-span-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs">
            <span className="font-extrabold text-white">مؤشر التشغيل اليدوي الحالي</span>
            <span className="font-mono font-bold text-haze">
              <Latin>ASYNC · DISCONNECTED</Latin>
            </span>
          </div>

          <div className="my-4 flex justify-center">
            <svg viewBox="0 0 260 110" className="h-24 w-full" aria-hidden="true">
              <circle cx="130" cy="55" r="44" fill="none" stroke="rgba(147,166,214,0.16)" strokeDasharray="4 6" />
              <circle cx="130" cy="55" r="26" fill="none" stroke="rgba(17,166,251,0.28)" />
              <path
                d="M14 55 L58 55 L74 22 L92 84 L110 55 L120 55"
                fill="none"
                stroke={BRAND.sky}
                strokeWidth="2.2"
                strokeLinecap="round"
                className="svg-signal"
              />
              <path
                d="M144 55 L176 55 L192 38 L208 72 L222 55 L248 55"
                fill="none"
                stroke={BRAND.violet}
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.72"
                className="svg-signal-rev"
              />
              <circle cx="130" cy="55" r="5" fill={BRAND.cyan} className="node-pulse" />
            </svg>
          </div>

          <ul className="grid grid-cols-2 gap-2">
            {RADAR_NODES.map((node) => (
              <li key={node.label} className="t-radar-node rounded-xl border border-white/10 bg-ink/80 px-3 py-2">
                <p className="text-xs font-extrabold text-white">{node.label}</p>
                <p className="text-[11px] text-haze">{node.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
