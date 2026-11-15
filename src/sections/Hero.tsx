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

const MOBILE_SHARD_OFFSETS = [
  '-rotate-2 translate-y-1',
  'rotate-2 -translate-y-1',
  'rotate-1 translate-y-1.5',
  '-rotate-2 -translate-y-0.5',
] as const

/**
 * SCENE 01 — THE PROBLEM
 * Full-bleed atmospheric opening film: scattered manual task shards drift around
 * broken disconnected wires, physically converging inward on scroll to launch Scene 02.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const wiresRef = useRef<SVGSVGElement>(null)
  const mobileFieldRef = useRef<HTMLDivElement>(null)
  const mobileWiresRef = useRef<SVGSVGElement>(null)

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

    // Mobile & Tablet (<1024px): Animated disconnected operations field above headline + scroll collapse
    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      const mShards = gsap.utils.toArray<HTMLElement>('.m-chaos-shard')
      if (mShards.length) {
        gsap.fromTo(
          mShards,
          {
            x: (i) => (i % 2 === 0 ? 18 : -18),
            y: (i) => (i < 2 ? -10 : 10),
            scale: 0.9,
            opacity: 0.72,
          },
          {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.65,
            stagger: 0.07,
            ease: 'back.out(1.25)',
            clearProps: 'transform,opacity',
          },
        )

        mShards.forEach((el, idx) => {
          gsap.to(el, {
            y: idx % 2 === 0 ? -5 : 5,
            x: idx % 2 === 0 ? 3 : -3,
            rotation: idx % 2 === 0 ? 2 : -2,
            duration: 2.6 + idx * 0.35,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        })
      }

      if (sectionRef.current && mobileFieldRef.current) {
        const mExitTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: '65% top',
            end: 'bottom top',
            scrub: 0.5,
          },
        })

        if (mShards.length) {
          mExitTl.to(
            mShards,
            {
              xPercent: (i) => (i % 2 === 0 ? -18 : 18),
              y: 26,
              scale: 0.86,
              rotation: 0,
              opacity: 0.15,
              ease: 'power2.in',
            },
            0,
          )
        }

        if (mobileWiresRef.current) {
          mExitTl.to(mobileWiresRef.current, { scale: 0.8, opacity: 0.15, ease: 'power2.in' }, 0)
        }

        if (centerRef.current) {
          mExitTl.to(centerRef.current, { y: -22, scale: 0.96, opacity: 0.25, ease: 'power1.in' }, 0)
        }
      }
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
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pb-16 pt-[4.5rem] sm:pt-24 lg:pb-24 lg:pt-32"
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

      {/* Mobile & Tablet (<lg): Integrated Disconnected Operations Field directly feeding into Headline */}
      <div ref={mobileFieldRef} aria-hidden="true" className="container-x relative z-10 mb-2 lg:hidden">
        <div className="relative mx-auto max-w-md md:max-w-2xl">
          {/* Open Broken Signal Circuitry connecting scattered tasks down toward Headline */}
          <svg
            ref={mobileWiresRef}
            viewBox="0 0 380 162"
            className="pointer-events-none mx-auto h-36 w-full overflow-visible min-[380px]:h-40 md:h-44"
          >
            <path d="M44 26 Q126 52 166 76" fill="none" stroke="rgba(147,166,214,0.34)" strokeWidth="1.5" className="svg-signal" />
            <path d="M336 26 Q254 52 214 76" fill="none" stroke="rgba(17,166,251,0.38)" strokeWidth="1.5" className="svg-signal-slow" />
            <path d="M40 120 Q126 98 166 84" fill="none" stroke="rgba(94,76,249,0.4)" strokeWidth="1.5" className="svg-signal-rev" />
            <path d="M340 120 Q254 98 214 84" fill="none" stroke="rgba(147,166,214,0.34)" strokeWidth="1.5" className="svg-signal" />
            {/* Interrupted Central Gap Ring */}
            <circle cx="190" cy="80" r="14" fill="none" stroke="rgba(3,220,254,0.32)" strokeDasharray="3 4" />
            <circle cx="190" cy="80" r="4" fill="#03dcfe" className="node-pulse" />
            {/* Vertical Anticipation Drop linking directly to top of H1 below */}
            <path d="M190 96 L190 162" fill="none" stroke="rgba(3,220,254,0.55)" strokeWidth="1.5" strokeDasharray="3 5" className="svg-signal" />
          </svg>

          {/* Drifting Manual Task Shards orbiting the broken hub (full readable Arabic text, zero truncation) */}
          <div className="pointer-events-none absolute inset-0 grid grid-cols-2 content-start gap-x-3 gap-y-5 pb-7 pt-1 sm:gap-x-10 md:gap-x-28">
            {HERO.fragments.slice(0, 4).map((frag, idx) => (
              <div
                key={frag.id}
                className={`m-chaos-shard flex w-full max-w-[9.1rem] items-center gap-2 rounded-xl border border-dashed border-white/18 bg-night/82 px-2 py-1.5 shadow-[0_8px_22px_-12px_rgb(0_6_19/0.95)] backdrop-blur-sm min-[360px]:max-w-[10.4rem] min-[400px]:max-w-[11.8rem] min-[400px]:px-2.5 md:max-w-[13.5rem] ${
                  idx % 2 === 1 ? 'justify-self-end' : 'justify-self-start'
                } ${MOBILE_SHARD_OFFSETS[idx]}`}
              >
                <span className="grid size-6 shrink-0 place-items-center rounded-lg border border-white/10 bg-ink text-cyan min-[380px]:size-7">
                  <Icon name={frag.icon} size={13} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10.5px] font-extrabold leading-tight text-white min-[380px]:text-[11.5px]">{frag.title}</p>
                  <p className="mt-0.5 text-[9.5px] leading-tight text-haze min-[380px]:text-[10px]">{frag.status}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 5th Shard center accent visible cleanly on Tablet (>=768px) */}
          <div className="pointer-events-none hidden justify-center md:flex">
            <div className="m-chaos-shard -mt-6 inline-flex items-center gap-2 rounded-xl border border-dashed border-violet/30 bg-night/85 px-3 py-1.5 backdrop-blur-sm">
              <span className="node-pulse size-1.5 rounded-full bg-violet" />
              <span className="text-xs font-extrabold text-white">{HERO.fragments[4].title}</span>
              <span className="text-[11px] text-haze">· {HERO.fragments[4].status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Central Typographic Theater */}
      <div ref={centerRef} className="container-x relative z-10 text-center">
        <h1
          id="hero-title"
          className="mx-auto max-w-4xl text-balance text-[clamp(1.75rem,7.2vw,2.75rem)] font-black leading-[1.24] tracking-[-0.02em] sm:text-5xl sm:leading-[1.22] lg:text-[4.35rem]"
        >
          <span className="hero-mask-line block text-white">{HERO.headlineLine1}</span>
          <span className="hero-mask-line text-gradient mt-2 block">{HERO.headlineLine2}</span>
        </h1>

        <p className="hero-fade-in mx-auto mt-4 max-w-xl text-pretty text-[15px] leading-7 text-mist sm:mt-6 sm:text-lg sm:leading-9">
          {HERO.text}
        </p>

        {/* Cohesive Animated Signal Conduit Scroll Cue (harmonious optical bridge into the story) */}
        <div className="hero-fade-in mt-6 flex justify-center sm:mt-9 lg:mt-10">
          <a
            href="#about"
            aria-label="الانتقال إلى المشهد التالي لاكتشاف كيف تنتهي الفوضى اليومية"
            className="group grid w-full max-w-sm grid-cols-[1fr_auto_1fr] items-center gap-3 text-[11px] font-bold leading-4 text-mist transition-colors duration-300 hover:text-white sm:inline-flex sm:w-auto sm:max-w-none sm:gap-5 sm:text-xs"
          >
            <span aria-hidden="true" className="hidden h-px w-10 bg-gradient-to-l from-cyan/60 to-transparent sm:block" />
            <span className="text-end text-haze transition-colors group-hover:text-mist sm:text-start">{HERO.chaosLabel}</span>
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-xl border border-cyan/40 bg-night/90 text-cyan shadow-[0_0_24px_-6px_rgb(3_220_254/0.6)] transition-all duration-300 group-hover:border-cyan group-hover:bg-panel sm:size-10"
            >
              <Icon name="arrowLeft" size={16} className="chevron-bounce -rotate-90" />
            </span>
            <span className="text-start text-glow">{HERO.orderPreviewLabel}</span>
            <span aria-hidden="true" className="hidden h-px w-10 bg-gradient-to-r from-violet/60 to-transparent sm:block" />
          </a>
        </div>

        <ul className="hero-fade-in mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-bold tracking-wider text-haze sm:mt-8 sm:gap-x-5 sm:text-xs" aria-label="مجالات العمل">
          {SEO.categories.map((c) => (
            <li key={c} className="inline-flex items-center gap-2">
              <span className="size-1 rounded-full bg-sky/70" aria-hidden="true" />
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
