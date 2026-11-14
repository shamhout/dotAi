import { useRef } from 'react'
import { Icon } from '../components/Icon'
import { Latin } from '../components/Latin'
import { HERO } from '../config/site'
import { SEO } from '../config/seo'
import { gsap, useGsapScene } from '../lib/motion'

const SHARD_POSITIONS = [
  'lg:top-[17%] lg:start-[5%] lg:-rotate-3',
  'lg:top-[22%] lg:end-[5%] lg:rotate-3',
  'lg:bottom-[23%] lg:start-[7%] lg:rotate-2',
  'lg:bottom-[20%] lg:end-[6%] lg:-rotate-2',
  'lg:bottom-[8%] lg:start-1/2 lg:-translate-x-1/2 lg:rtl:translate-x-1/2',
] as const

/**
 * SCENE 01 — THE PROBLEM
 * Full-bleed atmospheric opening film: scattered manual task shards drift around
 * a stark central typographic stage, then physically converge inward on scroll
 * to launch Scene 02.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const wiresRef = useRef<SVGSVGElement>(null)

  useGsapScene(sectionRef, (_ctx, mm) => {
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Masked entrance reveal for the opening cinema lines
      gsap.from('.hero-mask-line', {
        clipPath: 'inset(0 0 100% 0)',
        y: 34,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power4.out',
        clearProps: 'clipPath,transform',
      })

      gsap.from('.hero-fade-in', {
        y: 18,
        opacity: 0,
        duration: 0.6,
        stagger: 0.06,
        delay: 0.12,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      })

      gsap.from('.chaos-shard', {
        scale: 0.86,
        opacity: 0,
        duration: 0.7,
        stagger: 0.07,
        delay: 0.15,
        ease: 'back.out(1.3)',
        clearProps: 'transform,opacity',
      })
    })

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      // Livelier organic orbital drift on the 5 disconnected manual task shards
      const shards = gsap.utils.toArray<HTMLElement>('.chaos-shard')
      shards.forEach((el, idx) => {
        gsap.to(el, {
          y: idx % 2 === 0 ? -14 : 14,
          x: idx % 2 === 0 ? 9 : -9,
          rotation: idx % 2 === 0 ? 1.8 : -1.8,
          duration: 2.9 + idx * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })

      // TRANSITION 01 (PROBLEM → REALIZATION):
      // As the visitor scrolls out of Scene 01, scattered fragments pull inward
      // toward the central axis while broken wires collapse into the scroll thread.
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.65,
        },
      })

      const wires = wiresRef.current
      const center = centerRef.current

      exitTl.to(
        shards,
        {
          xPercent: (i) => (i % 2 === 0 ? 35 : -35),
          y: 90,
          rotation: 0,
          scale: 0.84,
          opacity: 0,
          ease: 'power2.in',
        },
        0,
      )

      if (wires) {
        exitTl.to(
          wires,
          {
            scale: 0.72,
            opacity: 0,
            ease: 'power2.in',
          },
          0,
        )
      }

      if (center) {
        exitTl.to(
          center,
          {
            y: -48,
            scale: 0.94,
            opacity: 0.15,
            ease: 'power1.in',
          },
          0,
        )
      }
    })
  })

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pb-16 pt-28 lg:pb-24 lg:pt-32"
    >
      {/* Stark deep-midnight atmospheric stage */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute -top-44 start-1/2 h-[42rem] w-[42rem] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(31_126_254/0.18),transparent)] rtl:translate-x-1/2" />
        <div className="bg-grid absolute inset-0 opacity-75" />
      </div>

      {/* Desktop Broken Disconnected SVG Wires (fail to meet at center) */}
      <svg
        ref={wiresRef}
        aria-hidden="true"
        viewBox="0 0 1200 720"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 -z-10 hidden size-full lg:block"
      >
        <path
          d="M170 150 Q380 260 470 310"
          fill="none"
          stroke="rgba(147,166,214,0.28)"
          strokeWidth="1.5"
          className="svg-signal"
        />
        <path
          d="M1030 180 Q820 260 720 315"
          fill="none"
          stroke="rgba(17,166,251,0.3)"
          strokeWidth="1.5"
          className="svg-signal-slow"
        />
        <path
          d="M190 540 Q390 460 490 420"
          fill="none"
          stroke="rgba(94,76,249,0.3)"
          strokeWidth="1.5"
          className="svg-signal-rev"
        />
        <path
          d="M1010 560 Q820 470 710 425"
          fill="none"
          stroke="rgba(147,166,214,0.26)"
          strokeWidth="1.5"
          className="svg-signal"
        />
        <path
          d="M600 680 L600 615"
          fill="none"
          stroke="rgba(3,220,254,0.22)"
          strokeWidth="1.5"
          strokeDasharray="4 8"
        />
      </svg>

      {/* Desktop Perimeter Scattered Manual Operation Shards */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="container-x relative h-full">
          {HERO.fragments.map((frag, idx) => (
            <div
              key={frag.id}
              className={`chaos-shard absolute w-60 rounded-2xl border border-dashed border-white/16 bg-night/75 px-4 py-3 backdrop-blur-sm ${SHARD_POSITIONS[idx]}`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-ink text-mist">
                    <Icon name={frag.icon} size={15} />
                  </span>
                  <div>
                    <p className="text-xs font-extrabold text-white">{frag.title}</p>
                    <p className="text-[11px] text-haze">{frag.status}</p>
                  </div>
                </div>
                <span className="size-1.5 rounded-full bg-haze/60" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Central Typographic Theater */}
      <div ref={centerRef} className="container-x relative z-10 text-center">
        <h1
          id="hero-title"
          className="mx-auto max-w-4xl text-balance text-[2.1rem] font-black leading-[1.28] tracking-[-0.02em] sm:text-5xl sm:leading-[1.22] lg:text-[4.35rem]"
        >
          <span className="hero-mask-line block text-white">{HERO.headlineLine1}</span>
          <span className="hero-mask-line text-gradient mt-2 block">{HERO.headlineLine2}</span>
        </h1>

        <p className="hero-fade-in mx-auto mt-6 max-w-xl text-pretty text-base leading-8 text-mist sm:text-lg sm:leading-9">
          {HERO.text}
        </p>

        {/* Mobile Compact Chaos Chips (< lg) */}
        <ul className="hero-fade-in mx-auto mt-7 flex max-w-md flex-wrap justify-center gap-2 lg:hidden" aria-label="تحديات التشغيل اليدوي">
          {HERO.fragments.slice(0, 4).map((frag) => (
            <li
              key={frag.id}
              className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-white/16 bg-night/80 px-3 py-1.5 text-xs font-semibold text-mist"
            >
              <Icon name={frag.icon} size={13} className="text-sky" />
              <span>{frag.title}</span>
            </li>
          ))}
        </ul>

        {/* Cohesive Animated Signal Conduit Scroll Cue (harmonious optical bridge into the story) */}
        <div className="hero-fade-in mt-10 flex justify-center">
          <a
            href="#about"
            aria-label="الانتقال إلى المشهد التالي لاكتشاف كيف تنتهي الفوضى اليومية"
            className="group inline-flex items-center gap-3.5 text-xs font-bold text-mist transition-colors duration-300 hover:text-white sm:gap-5"
          >
            <span aria-hidden="true" className="hidden h-px w-10 bg-gradient-to-l from-cyan/60 to-transparent sm:block" />
            <span className="text-haze transition-colors group-hover:text-mist">{HERO.chaosLabel}</span>
            <span
              aria-hidden="true"
              className="grid size-10 place-items-center rounded-2xl border border-cyan/40 bg-night/90 text-cyan shadow-[0_0_24px_-6px_rgb(3_220_254/0.6)] transition-all duration-300 group-hover:border-cyan group-hover:bg-panel"
            >
              <Icon name="arrowLeft" size={16} className="chevron-bounce -rotate-90" />
            </span>
            <span className="text-glow">{HERO.orderPreviewLabel}</span>
            <span aria-hidden="true" className="hidden h-px w-10 bg-gradient-to-r from-violet/60 to-transparent sm:block" />
          </a>
        </div>

        <ul className="hero-fade-in mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-bold tracking-wider text-haze sm:text-xs" aria-label="مجالات العمل">
          {SEO.categories.map((c, idx) => (
            <li key={c} className="inline-flex items-center gap-2.5">
              {idx > 0 && <span className="size-1 rounded-full bg-sky/50" aria-hidden="true" />}
              <Latin className="text-mist">{c}</Latin>
            </li>
          ))}
        </ul>
      </div>

      {/* Continuous Scroll Thread leading down to Scene 02 */}
      <div aria-hidden="true" className="absolute bottom-3 start-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 rtl:translate-x-1/2">
        <div className="relative h-10 w-px overflow-hidden bg-white/15">
          <span className="thread-drop-beam absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-transparent via-cyan to-transparent" />
        </div>
      </div>
    </section>
  )
}
