import { useRef } from 'react'
import { Icon } from '../components/Icon'
import { Latin } from '../components/Latin'
import { SectionHeading } from '../components/SectionHeading'
import { WHY } from '../config/site'
import { gsap, useGsapScene } from '../lib/motion'

/**
 * SCENE 05 — THE IMPACT
 * Desktop (>=1024px): Optical radial iris wipe + opposing contrast strips + 6-pillar matrix.
 * Mobile/Tablet (<1024px): Horizontal Transformation Capsules + Asymmetric Bento Value Grid.
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

    // Mobile & Tablet (<1024px): Distinct alternating capsule snap-in + Bento spring pop
    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.from('.m-why-strip', {
        x: (i: number) => (i % 2 === 0 ? 32 : -32),
        opacity: 0,
        duration: 0.52,
        stagger: 0.07,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.m-why-strips',
          start: 'top 88%',
          once: true,
        },
      })

      gsap.from('.m-why-bento', {
        y: 22,
        scale: 0.9,
        opacity: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: 'back.out(1.25)',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.m-why-bento-grid',
          start: 'top 90%',
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
      className="relative overflow-x-clip bg-gradient-to-b from-ink via-night/75 to-ink py-14 sm:py-16 lg:py-28"
    >
      <div className="hairline-x absolute inset-x-0 top-0" aria-hidden="true" />

      <div ref={irisStageRef} className="container-x">
        <SectionHeading
          id="why-title"
          title={WHY.title}
          text={WHY.subtitle}
        />

        {/* Desktop View (>=1024px): 4 High-Contrast Shifts + 1px Matrix */}
        <div className="why-shifts-grid mt-12 hidden gap-3 lg:grid lg:grid-cols-4">
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

        <div className="why-matrix mt-8 hidden overflow-hidden rounded-2xl border border-sky/20 bg-sky/15 lg:block">
          <ul className="grid grid-cols-3 gap-px">
            {WHY.items.map((item, i) => (
              <li
                key={item.title}
                className="why-pillar group relative flex flex-col justify-between bg-ink/95 p-8 transition-colors duration-300 hover:bg-night/90"
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
                  <p className="mt-2.5 text-base leading-8 text-mist">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile & Tablet View (<1024px): Horizontal Transformation Capsules + Asymmetric Bento Grid */}
        <div className="lg:hidden">
          <div className="m-why-strips mx-auto mt-8 max-w-2xl space-y-2.5">
            {WHY.shifts.map((shift) => (
              <div
                key={shift.to}
                className="m-why-strip flex items-center justify-between gap-2.5 rounded-2xl border border-sky/25 bg-ink/90 px-3.5 py-3 shadow-[0_12px_30px_-20px_rgb(17_166_251/0.45)] sm:px-5 sm:py-3.5"
              >
                <span className="min-w-0 flex-1 text-xs font-semibold leading-snug text-haze line-through decoration-white/30 sm:text-sm">
                  {shift.from}
                </span>
                <span
                  aria-hidden="true"
                  className="grid size-6 shrink-0 place-items-center rounded-full border border-cyan/35 bg-cyan/10 text-cyan sm:size-7"
                >
                  <Icon name="arrowLeft" size={12} />
                </span>
                <span className="text-gradient min-w-0 flex-1 text-end text-sm font-black leading-snug sm:text-base">
                  {shift.to}
                </span>
              </div>
            ))}
          </div>

          <ul className="m-why-bento-grid mx-auto mt-6 grid max-w-2xl grid-cols-2 gap-2.5 sm:gap-3.5">
            {WHY.items.map((item, i) => {
              const isBanner = i === 0 || i === WHY.items.length - 1
              return isBanner ? (
                <li
                  key={item.title}
                  className="m-why-bento col-span-2 flex items-center gap-3.5 rounded-2xl border border-sky/25 bg-gradient-to-l from-panel/75 to-night/90 p-4 sm:p-5"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-sky/30 bg-panel/70 text-glow">
                    <Icon name={item.icon} size={20} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-extrabold text-white sm:text-base">{item.title}</h3>
                      <span className="font-mono text-[11px] font-bold text-cyan/80">
                        <Latin>{String(i + 1).padStart(2, '0')}</Latin>
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-6 text-mist sm:text-sm">{item.text}</p>
                  </div>
                </li>
              ) : (
                <li
                  key={item.title}
                  className="m-why-bento col-span-1 flex flex-col justify-between rounded-2xl border border-white/10 bg-night/80 p-3.5 sm:p-5"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="grid size-9 place-items-center rounded-xl border border-sky/25 bg-panel/60 text-glow">
                        <Icon name={item.icon} size={17} />
                      </span>
                      <span className="font-mono text-[10px] font-bold text-haze">
                        <Latin>{String(i + 1).padStart(2, '0')}</Latin>
                      </span>
                    </div>
                    <h3 className="mt-3 text-sm font-extrabold leading-snug text-white sm:text-base">{item.title}</h3>
                  </div>
                  <p className="mt-1.5 text-xs leading-6 text-mist sm:text-sm">{item.text}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
