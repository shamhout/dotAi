import { useRef } from 'react'
import { WhatsAppButton } from '../components/Buttons'
import { Icon } from '../components/Icon'
import { Latin } from '../components/Latin'
import { Logo } from '../components/Logo'
import { FINAL_CTA, PROCESS } from '../config/site'
import { WHATSAPP_DISPLAY_NUMBER } from '../config/whatsapp'
import { gsap, useGsapScene } from '../lib/motion'

/**
 * MOBILE SCENE 08 — THE FINAL ACTION (#process & #contact)
 * Transition 07 -> 08: 4-step journey rail flows seamlessly into the luminous
 * orbital WhatsApp finale — one tap starts the conversation.
 */
export function MobileActionFinale() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGsapScene(sectionRef, (_ctx, mm) => {
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.m-proc-item', {
        y: 22,
        scale: 0.94,
        opacity: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: 'back.out(1.2)',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '#process',
          start: 'top 90%',
          once: true,
        },
      })

      gsap.from('.m-final-box', {
        clipPath: 'circle(20% at 50% 50%)',
        scale: 0.91,
        opacity: 0.25,
        duration: 0.85,
        ease: 'power3.out',
        clearProps: 'clipPath,transform,opacity',
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 90%',
          once: true,
        },
      })

      gsap.from('.m-final-ring', {
        scale: 0.55,
        opacity: 0,
        duration: 1.0,
        stagger: 0.14,
        ease: 'back.out(1.1)',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 90%',
          once: true,
        },
      })
    })
  })

  return (
    <div ref={sectionRef} className="overflow-x-clip">
      {/* Process 4-Step Compact Horizon */}
      <section id="process" aria-labelledby="m-process-title" className="relative px-4 pb-8 pt-14">
        <div className="hairline-x absolute inset-x-0 top-0" aria-hidden="true" />
        <div className="mx-auto max-w-md">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold text-glow">
            <span className="size-1.5 rounded-full bg-cyan" aria-hidden="true" />
            <span>{PROCESS.eyebrow}</span>
          </span>
          <h2 id="m-process-title" className="mt-2.5 text-2xl font-black leading-snug text-white">
            {PROCESS.title}
          </h2>

          <ol className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {PROCESS.steps.map((step, i) => (
              <li key={step.title} className="m-proc-item surface-architect flex items-start gap-3 rounded-2xl p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-cta)] text-white">
                  <Icon name={step.icon} size={18} />
                </span>
                <div className="min-w-0">
                  <span className="font-mono text-[10px] font-bold text-cyan">
                    <Latin>{String(i + 1).padStart(2, '0')}</Latin>
                  </span>
                  <h3 className="text-sm font-extrabold text-white">{step.title}</h3>
                  <p className="mt-0.5 text-xs leading-6 text-mist">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Final Conversion Orbital Chamber */}
      <section id="contact" aria-labelledby="m-contact-title" className="px-4 pb-16 pt-6">
        <div className="m-final-box surface-console relative isolate mx-auto max-w-md overflow-hidden rounded-3xl border border-sky/35 px-5 py-12 text-center">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 grid place-items-center overflow-hidden">
            <div className="m-final-ring animate-spin-slow size-72 rounded-full border border-dashed border-sky/20" />
            <div className="m-final-ring animate-spin-slower absolute size-52 rounded-full border border-violet/25" />
          </div>

          <div className="flex justify-center">
            <Logo size="md" />
          </div>

          <div className="mt-5 inline-flex items-center gap-2.5 text-[11px] font-bold text-glow">
            <span aria-hidden="true" className="h-px w-5 bg-gradient-to-l from-cyan to-transparent" />
            <Icon name="whatsapp" size={14} />
            <span>الفصل 08 · ابدأ المحادثة</span>
            <span aria-hidden="true" className="h-px w-5 bg-gradient-to-r from-violet to-transparent" />
          </div>

          <h2 id="m-contact-title" className="mt-4 text-[clamp(1.55rem,6.5vw,2.15rem)] font-black leading-[1.28] text-white">
            {FINAL_CTA.title}
          </h2>
          <p className="mt-3 text-sm leading-7 text-mist">{FINAL_CTA.text}</p>

          <div className="mt-7 space-y-2.5">
            <WhatsAppButton message="general" size="lg" className="w-full">
              {FINAL_CTA.cta}
            </WhatsAppButton>

            <div className="flex flex-col gap-2">
              <WhatsAppButton message="hr" variant="ghost" size="sm" className="w-full justify-center">
                {FINAL_CTA.hrShortcut}
              </WhatsAppButton>
              <WhatsAppButton message="sales" variant="ghost" size="sm" className="w-full justify-center">
                {FINAL_CTA.salesShortcut}
              </WhatsAppButton>
            </div>
          </div>

          <p className="mt-6 text-xs text-haze">
            رقم الواتساب المباشر:{' '}
            <Latin className="font-bold text-white">{WHATSAPP_DISPLAY_NUMBER}</Latin>
          </p>
        </div>
      </section>
    </div>
  )
}
