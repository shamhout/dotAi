import { useRef } from 'react'
import { AnchorButton } from '../components/Buttons'
import { Icon } from '../components/Icon'
import { Latin } from '../components/Latin'
import { Logo } from '../components/Logo'
import { BRAND } from '../config/brand'
import { BRAND_REVEAL } from '../config/storyData'
import { SEO } from '../config/seo'
import { gsap, useGsapScene } from '../lib/motion'

/**
 * MOBILE SCENE 05 — THE BRAND REVEAL (#solutions)
 * Signature climax: radial aperture mask blooms open to reveal dot Ai's logo
 * and orbital rings, then splits downward into Cyan (HR) and Violet (Sales) channels.
 */
export function MobileBrandReveal() {
  const sectionRef = useRef<HTMLElement>(null)

  useGsapScene(sectionRef, (_ctx, mm) => {
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Transition 04 -> 05: Radial iris mask expansion + emblem spring lock
      gsap.from('.m-brand-chamber', {
        clipPath: 'circle(10% at 50% 40%)',
        scale: 0.9,
        opacity: 0.3,
        duration: 0.95,
        ease: 'power3.out',
        clearProps: 'clipPath,transform,opacity',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 88%',
          once: true,
        },
      })

      gsap.from('.m-brand-ring', {
        scale: 0.45,
        opacity: 0,
        duration: 1.0,
        stagger: 0.14,
        ease: 'back.out(1.25)',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.m-brand-chamber',
          start: 'top 88%',
          once: true,
        },
      })

      gsap.from('.m-brand-logo-box', {
        scale: 0.85,
        y: 16,
        opacity: 0,
        duration: 0.65,
        delay: 0.12,
        ease: 'back.out(1.3)',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.m-brand-chamber',
          start: 'top 88%',
          once: true,
        },
      })

      gsap.from('.m-brand-pillar', {
        y: 22,
        scale: 0.94,
        opacity: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.m-brand-pillars',
          start: 'top 92%',
          once: true,
        },
      })

      // Split conduit SVG draw into HR & Sales pillars
      const paths = gsap.utils.toArray<SVGPathElement>('.m-brand-branch')
      paths.forEach((p) => {
        const len = p.getTotalLength()
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(p, {
          strokeDashoffset: 0,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.m-brand-branches',
            start: 'top 90%',
            once: true,
          },
        })
      })
    })
  })

  return (
    <section
      ref={sectionRef}
      id="solutions"
      aria-labelledby="m-brand-title"
      className="relative overflow-x-clip px-4 py-14"
    >
      <div className="mx-auto max-w-md">
        <div className="m-brand-chamber surface-console relative isolate overflow-hidden rounded-3xl border border-sky/35 px-5 py-10 text-center">
          {/* Concentric Orbital Assembly */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 grid place-items-center overflow-hidden">
            <div className="m-brand-ring animate-spin-slow size-72 rounded-full border border-dashed border-cyan/25" />
            <div className="m-brand-ring animate-spin-slower absolute size-52 rounded-full border border-violet/30" />
            <div className="absolute size-40 rounded-full bg-[radial-gradient(closest-side,rgb(17_166_251/0.25),transparent)]" />
          </div>

          <div className="inline-flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-6 bg-gradient-to-l from-cyan to-transparent" />
            <span className="text-[11px] font-extrabold text-glow">{BRAND_REVEAL.eyebrow}</span>
            <span aria-hidden="true" className="h-px w-6 bg-gradient-to-r from-violet to-transparent" />
          </div>

          {/* The Official dot Ai Unveiling */}
          <div className="mt-6 flex justify-center">
            <div className="m-brand-logo-box rounded-2xl border border-white/15 bg-ink/85 px-6 py-4 shadow-[0_18px_46px_-14px_rgb(3_220_254/0.45)]">
              <Logo size="lg" />
            </div>
          </div>

          <h2 id="m-brand-title" className="mt-6 text-2xl font-black leading-snug text-white">
            {BRAND_REVEAL.headline}
          </h2>
          <p className="mt-2.5 text-sm leading-7 text-mist">{BRAND_REVEAL.subhead}</p>
          <p className="mt-3 text-xs font-extrabold tracking-wide text-glow">
            <Latin>{SEO.tagline}</Latin>
          </p>
        </div>

        {/* SVG Beam Splitter directly connecting dot Ai emblem -> Two Systems */}
        <svg viewBox="0 0 360 44" className="m-brand-branches mx-auto h-10 w-full" aria-hidden="true">
          <path
            d="M180 0 C180 22 275 14 275 44"
            fill="none"
            stroke={BRAND.cyan}
            strokeWidth="2"
            strokeLinecap="round"
            className="m-brand-branch"
          />
          <path
            d="M180 0 C180 22 85 14 85 44"
            fill="none"
            stroke={BRAND.violet}
            strokeWidth="2"
            strokeLinecap="round"
            className="m-brand-branch"
          />
        </svg>

        {/* Twin Intelligence Pillars */}
        <div className="m-brand-pillars grid grid-cols-2 gap-2.5">
          {BRAND_REVEAL.pillars.map((pillar) => {
            const isHr = pillar.accent === 'cyan'
            return (
              <a
                key={pillar.id}
                href={`#${pillar.id}`}
                className={`m-brand-pillar surface-architect group flex flex-col justify-between rounded-2xl border p-3.5 transition-colors ${
                  isHr ? 'border-cyan/35' : 'border-violet/40'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={`size-2 rounded-full ${isHr ? 'bg-cyan' : 'bg-violet'}`} />
                  <Icon
                    name="arrowLeft"
                    size={14}
                    className={`transition-transform group-hover:-translate-x-0.5 ${isHr ? 'text-cyan' : 'text-iris'}`}
                  />
                </div>
                <p className="mt-2.5 text-sm font-black text-white">{pillar.title}</p>
                <p className="mt-1 text-[11px] leading-5 text-mist">{pillar.focus}</p>
              </a>
            )
          })}
        </div>

        <div className="mt-4">
          <AnchorButton href="#transformation" variant="ghost" className="w-full">
            <span>شوف التحوّل قبل وبعد</span>
            <Icon name="arrowLeft" size={16} className="-rotate-90" />
          </AnchorButton>
        </div>
      </div>
    </section>
  )
}
