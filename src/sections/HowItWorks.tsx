import { useRef, useState } from 'react'
import { WhatsAppButton } from '../components/Buttons'
import { Icon } from '../components/Icon'
import { Latin } from '../components/Latin'
import { SectionHeading } from '../components/SectionHeading'
import { CONTACT_WHATSAPP_LABEL, PROCESS } from '../config/site'
import { gsap, useGsapScene } from '../lib/motion'

/**
 * SCENE 07 (PART A) — THE NEXT CHAPTER / ONBOARDING HORIZON
 * Both product streams merge back into a unified brand gradient rail that
 * draws horizontally across scroll while the 4 launch stages lock into position.
 */
export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const current = PROCESS.steps[activeStep] ?? PROCESS.steps[0]

  useGsapScene(sectionRef, (_ctx, mm) => {
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      // Unified horizon rail draws across scroll from Step 01 to Step 04 (RTL right-to-left)
      gsap.from('.process-horizon-fill', {
        scaleX: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.process-grid-wrap',
          start: 'top 84%',
          end: 'top 40%',
          scrub: 0.5,
        },
      })

      gsap.from('.process-step-card', {
        y: 34,
        scale: 0.94,
        opacity: 0,
        duration: 0.72,
        stagger: 0.11,
        ease: 'back.out(1.15)',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.process-grid-wrap',
          start: 'top 88%',
          once: true,
        },
      })

      gsap.from('.process-spotlight', {
        y: 22,
        scale: 0.97,
        opacity: 0,
        duration: 0.68,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.process-spotlight',
          start: 'top 90%',
          once: true,
        },
      })
    })

    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.from('.process-step-card, .process-spotlight', {
        y: 18,
        opacity: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 88%',
          once: true,
        },
      })
    })
  })

  return (
    <section ref={sectionRef} id="process" aria-labelledby="process-title" className="relative py-20 lg:py-24">
      <div className="hairline-x absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="container-x">
        <SectionHeading index="07" id="process-title" eyebrow={PROCESS.eyebrow} title={PROCESS.title} />

        <div className="process-grid-wrap relative mt-14">
          {/* Unified horizontal brand gradient rail connecting Steps 01 -> 04 */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[12%] top-12 hidden h-px overflow-hidden bg-white/12 lg:block"
          >
            <div className="process-horizon-fill h-full w-full origin-right bg-gradient-to-l from-cyan via-azure to-violet" />
          </div>

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {PROCESS.steps.map((step, i) => {
              const isActive = activeStep === i
              return (
                <li key={step.title} className="process-step-card">
                  <button
                    type="button"
                    onClick={() => setActiveStep(i)}
                    onMouseEnter={() => setActiveStep(i)}
                    aria-pressed={isActive}
                    className={`group relative flex h-full w-full cursor-pointer flex-col rounded-2xl border p-6 text-start transition-all duration-300 ${
                      isActive
                        ? 'border-cyan/50 bg-gradient-to-b from-panel/85 to-night/95 shadow-[0_20px_50px_-24px_rgb(17_166_251/0.6)]'
                        : 'border-white/10 bg-night/50 hover:border-sky/35 hover:bg-night/80'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`relative z-10 grid size-12 place-items-center rounded-xl transition-all duration-300 ${
                          isActive
                            ? 'bg-[image:var(--gradient-cta)] text-white shadow-[0_10px_26px_-8px_rgb(35_53_252/0.9)]'
                            : 'border border-white/12 bg-ink text-mist group-hover:border-sky/35 group-hover:text-white'
                        }`}
                      >
                        <Icon name={step.icon} size={22} />
                      </span>
                      <span
                        aria-hidden="true"
                        className={`font-mono text-2xl font-black transition-colors ${
                          isActive ? 'text-gradient' : 'text-white/20 group-hover:text-white/40'
                        }`}
                      >
                        <Latin>{String(i + 1).padStart(2, '0')}</Latin>
                      </span>
                    </div>

                    <h3 className="mt-6 text-lg font-extrabold leading-7 text-white">
                      <span className="sr-only">الخطوة {i + 1}: </span>
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-mist sm:text-base">{step.text}</p>
                  </button>
                </li>
              )
            })}
          </ol>

          <div className="process-spotlight mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-sky/20 bg-night/75 px-6 py-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3.5">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-cyan/30 bg-cyan/10 font-mono text-sm font-black text-glow">
                <Latin>{String(activeStep + 1).padStart(2, '0')}</Latin>
              </span>
              <div>
                <p className="text-sm font-extrabold text-white">{current.title}</p>
                <p className="text-xs text-mist sm:text-sm">{current.text}</p>
              </div>
            </div>

            <WhatsAppButton message="general" size="sm" className="w-full shrink-0 sm:w-auto">
              {CONTACT_WHATSAPP_LABEL}
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  )
}
