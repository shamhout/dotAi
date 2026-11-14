import { useRef } from 'react'
import { Icon } from '../components/Icon'
import { Latin } from '../components/Latin'
import { SectionHeading } from '../components/SectionHeading'
import { WHY } from '../config/site'
import { gsap, useGsapScene } from '../lib/motion'

/**
 * SCENE 05 — THE IMPACT
 * Transitions via an optical radial iris clip-path reveal followed by opposing
 * chaos-to-clarity parallax strips and the 6-pillar architectural matrix.
 */
export function Why() {
  const sectionRef = useRef<HTMLElement>(null)
  const irisStageRef = useRef<HTMLDivElement>(null)

  useGsapScene(sectionRef, (_ctx, mm) => {
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      // Dynamic radial iris reveal opening across Scene 05
      if (irisStageRef.current) {
        gsap.fromTo(
          irisStageRef.current,
          { clipPath: 'circle(12% at 50% 10%)', scale: 0.96 },
          {
            clipPath: 'circle(155% at 50% 50%)',
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'clipPath,transform',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 86%',
              once: true,
            },
          },
        )
      }

      // Opposing horizontal contrast shifts converging from chaos into alignment
      gsap.from('.why-shift-right', {
        x: 48,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.why-shifts-grid',
          start: 'top 88%',
          once: true,
        },
      })

      gsap.from('.why-shift-left', {
        x: -48,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.why-shifts-grid',
          start: 'top 88%',
          once: true,
        },
      })

      // 6-pillar precision matrix cascade + icon pop
      gsap.from('.why-pillar', {
        y: 28,
        scale: 0.95,
        opacity: 0,
        duration: 0.6,
        stagger: 0.055,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.why-matrix',
          start: 'top 88%',
          once: true,
        },
      })
    })

    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.from('.why-shift-card, .why-pillar', {
        y: 18,
        opacity: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          once: true,
        },
      })
    })
  })

  return (
    <section
      ref={sectionRef}
      id="why"
      aria-labelledby="why-title"
      className="relative overflow-x-clip bg-gradient-to-b from-ink via-night/75 to-ink py-20 lg:py-28"
    >
      <div className="hairline-x absolute inset-x-0 top-0" aria-hidden="true" />

      <div ref={irisStageRef} className="container-x">
        <SectionHeading
          index="05"
          id="why-title"
          eyebrow={WHY.sceneTag}
          title={WHY.title}
          text={WHY.subtitle}
        />

        {/* 4 High-Contrast Chaos -> Clarity Shifts */}
        <div className="why-shifts-grid mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.shifts.map((shift, i) => (
            <div
              key={shift.to}
              className={`why-shift-card flex flex-col justify-between rounded-2xl border border-sky/20 bg-ink/90 p-5 shadow-[0_14px_40px_-24px_rgb(17_166_251/0.45)] ${
                i < 2 ? 'why-shift-right' : 'why-shift-left'
              }`}
            >
              <span className="font-mono text-[11px] font-bold text-haze">
                <Latin>0{i + 1}</Latin>
              </span>
              <p className="mt-3 text-xs font-semibold text-haze line-through decoration-white/25">{shift.from}</p>
              <p className="text-gradient mt-1.5 text-lg font-black leading-snug">{shift.to}</p>
            </div>
          ))}
        </div>

        {/* Architectural 1px-divided precision matrix */}
        <div className="why-matrix mt-8 overflow-hidden rounded-2xl border border-sky/20 bg-sky/15">
          <ul className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {WHY.items.map((item, i) => (
              <li
                key={item.title}
                className="why-pillar group relative flex flex-col justify-between bg-ink/95 p-6 transition-colors duration-300 hover:bg-night/90 sm:p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 scale-x-0 bg-[image:var(--gradient-brand)] transition-transform duration-300 group-hover:scale-x-100"
                />

                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid size-12 place-items-center rounded-xl border border-sky/25 bg-panel/60 text-glow transition-transform duration-300 group-hover:scale-105 group-hover:border-cyan/50">
                      <Icon name={item.icon} size={22} />
                    </span>
                    <span className="font-mono text-xs font-bold tracking-widest text-haze transition-colors group-hover:text-cyan">
                      <Latin>{String(i + 1).padStart(2, '0')}</Latin>
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-extrabold text-white">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-7 text-mist sm:text-base sm:leading-8">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
