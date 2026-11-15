import { useRef, useState } from 'react'
import { WhatsAppButton } from '../components/Buttons'
import { Icon } from '../components/Icon'
import { Latin } from '../components/Latin'
import { SectionHeading } from '../components/SectionHeading'
import { CONTACT_WHATSAPP_LABEL, PROCESS } from '../config/site'
import { gsap, useGsapScene } from '../lib/motion'

/**
 * SCENE 07 (PART A) — THE NEXT CHAPTER / ONBOARDING HORIZON
 * Desktop (>=1024px): Unified brand gradient rail + 4-column horizon steps.
 * Mobile/Tablet (<1024px): Interactive 4-step progress rail + 2x2 connected launch matrix.
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

    // Mobile & Tablet (<1024px): Diagonal 2x2 launch matrix deal-in reveal
    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.from('.m-proc-rail, .m-proc-dock', {
        y: 16,
        opacity: 0,
        duration: 0.48,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.m-proc-matrix',
          start: 'top 88%',
          once: true,
        },
      })

      gsap.from('.m-proc-card', {
        scale: 0.88,
        y: 22,
        opacity: 0,
        duration: 0.52,
        stagger: 0.07,
        ease: 'back.out(1.25)',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.m-proc-matrix',
          start: 'top 88%',
          once: true,
        },
      })
    })
  })

  return (
    <section ref={sectionRef} id="process" aria-labelledby="process-title" className="relative overflow-x-clip py-14 sm:py-16 lg:py-24">
      <div className="hairline-x absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="container-x">
        <SectionHeading id="process-title" title={PROCESS.title} />

        {/* Desktop View (>=1024px): Unified Horizon Rail + 4-Column Row */}
        <div className="process-grid-wrap relative mt-14 hidden lg:block">
          {/* Unified horizontal brand gradient rail connecting Steps 01 -> 04 */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[12%] top-12 h-px overflow-hidden bg-white/12"
          >
            <div className="process-horizon-fill h-full w-full origin-right bg-gradient-to-l from-cyan via-azure to-violet" />
          </div>

          <ol className="grid grid-cols-4 gap-5">
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
                    <p className="mt-2 text-base leading-7 text-mist">{step.text}</p>
                  </button>
                </li>
              )
            })}
          </ol>

          <div className="process-spotlight mt-6 flex flex-row items-center justify-between gap-4 rounded-2xl border border-sky/20 bg-night/75 px-6 py-5">
            <div className="flex items-center gap-3.5">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-cyan/30 bg-cyan/10 font-mono text-sm font-black text-glow">
                <Latin>{String(activeStep + 1).padStart(2, '0')}</Latin>
              </span>
              <div>
                <p className="text-sm font-extrabold text-white">{current.title}</p>
                <p className="text-sm text-mist">{current.text}</p>
              </div>
            </div>

            <WhatsAppButton message="general" size="sm" className="w-auto shrink-0">
              {CONTACT_WHATSAPP_LABEL}
            </WhatsAppButton>
          </div>
        </div>

        {/* Mobile & Tablet View (<1024px): Interactive Progress Rail + 2x2 Launch Matrix */}
        <div className="mt-8 lg:hidden">
          {/* Interactive 4-Step Connected Progress Bar */}
          <div className="m-proc-rail mx-auto mb-4 grid max-w-2xl grid-cols-4 gap-1.5" role="tablist" aria-label="خطوات البدء">
            {PROCESS.steps.map((step, i) => {
              const reached = i <= activeStep
              const isSelected = activeStep === i
              return (
                <button
                  key={step.title}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveStep(i)}
                  className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border py-2 font-mono text-xs font-black transition-all ${
                    isSelected
                      ? 'border-cyan bg-panel text-white shadow-[0_0_18px_-6px_rgb(3_220_254/0.7)]'
                      : reached
                        ? 'border-sky/40 bg-sky/10 text-glow'
                        : 'border-white/10 bg-night/60 text-haze hover:text-white'
                  }`}
                >
                  <Latin>{String(i + 1).padStart(2, '0')}</Latin>
                </button>
              )
            })}
          </div>

          {/* 2x2 Compact Launch Matrix */}
          <ol className="m-proc-matrix mx-auto grid max-w-2xl grid-cols-2 gap-2.5 sm:gap-3.5">
            {PROCESS.steps.map((step, i) => {
              const isActive = activeStep === i
              return (
                <li key={step.title} className="m-proc-card">
                  <button
                    type="button"
                    onClick={() => setActiveStep(i)}
                    aria-pressed={isActive}
                    className={`flex h-full w-full cursor-pointer flex-col justify-between rounded-2xl border p-3.5 text-start transition-all duration-300 sm:p-5 ${
                      isActive
                        ? 'border-cyan/50 bg-gradient-to-b from-panel/90 to-night shadow-[0_14px_34px_-18px_rgb(17_166_251/0.6)]'
                        : 'border-white/10 bg-night/60 hover:border-sky/30'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`grid size-9 place-items-center rounded-xl transition-all sm:size-10 ${
                            isActive
                              ? 'bg-[image:var(--gradient-cta)] text-white shadow-[0_8px_20px_-6px_rgb(35_53_252/0.8)]'
                              : 'border border-white/12 bg-ink text-mist'
                          }`}
                        >
                          <Icon name={step.icon} size={18} />
                        </span>
                        <span className={`font-mono text-base font-black sm:text-lg ${isActive ? 'text-gradient' : 'text-white/25'}`}>
                          <Latin>{String(i + 1).padStart(2, '0')}</Latin>
                        </span>
                      </div>

                      <h3 className="mt-3 text-sm font-extrabold leading-snug text-white sm:text-base">
                        <span className="sr-only">الخطوة {i + 1}: </span>
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-xs leading-5 text-mist sm:text-sm sm:leading-6">{step.text}</p>
                  </button>
                </li>
              )
            })}
          </ol>

          {/* Bottom Launch Dock */}
          <div className="m-proc-dock mx-auto mt-4 flex max-w-2xl flex-col gap-3 rounded-2xl border border-sky/25 bg-night/80 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-cyan/30 bg-cyan/10 font-mono text-xs font-black text-glow">
                <Latin>{String(activeStep + 1).padStart(2, '0')}</Latin>
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-extrabold text-white">{current.title}</p>
                <p className="text-xs leading-5 text-mist sm:text-sm">{current.text}</p>
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
