import { useRef } from 'react'
import { WhatsAppButton } from '../components/Buttons'
import { Icon } from '../components/Icon'
import { Latin } from '../components/Latin'
import { Logo } from '../components/Logo'
import { FINAL_CTA, PROCESS } from '../config/site'
import { WHATSAPP_DISPLAY_NUMBER } from '../config/whatsapp'
import { gsap, useGsapScene } from '../lib/motion'

/**
 * TABLET SCENE 08 — THE FINAL ACTION (#process & #contact)
 */
export function TabletActionFinale() {
  const wrapRef = useRef<HTMLDivElement>(null)

  useGsapScene(wrapRef, (_ctx, mm) => {
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.t-proc-step', {
        y: 24,
        scale: 0.93,
        opacity: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: 'back.out(1.2)',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '#process',
          start: 'top 88%',
          once: true,
        },
      })

      gsap.from('.t-final-chamber', {
        clipPath: 'circle(20% at 50% 50%)',
        scale: 0.91,
        opacity: 0.28,
        duration: 0.85,
        ease: 'power3.out',
        clearProps: 'clipPath,transform,opacity',
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 88%',
          once: true,
        },
      })

      gsap.from('.t-final-ring', {
        scale: 0.55,
        opacity: 0,
        duration: 1.0,
        stagger: 0.15,
        ease: 'back.out(1.1)',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 88%',
          once: true,
        },
      })
    })
  })

  return (
    <div ref={wrapRef} className="overflow-x-clip">
      <section id="process" aria-labelledby="t-process-title" className="relative px-6 py-16">
        <div className="hairline-x absolute inset-x-0 top-0" aria-hidden="true" />
        <div className="mx-auto max-w-5xl">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold text-glow">
            <span className="size-1.5 rounded-full bg-cyan" aria-hidden="true" />
            <span>{PROCESS.eyebrow}</span>
          </span>
          <h2 id="t-process-title" className="mt-2.5 text-3xl font-black text-white">
            {PROCESS.title}
          </h2>

          <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.steps.map((step, i) => (
              <li key={step.title} className="t-proc-step surface-architect rounded-2xl p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="grid size-11 place-items-center rounded-xl bg-[image:var(--gradient-cta)] text-white">
                    <Icon name={step.icon} size={20} />
                  </span>
                  <span className="font-mono text-lg font-black text-white/25">
                    <Latin>{String(i + 1).padStart(2, '0')}</Latin>
                  </span>
                </div>
                <h3 className="mt-4 text-base font-extrabold text-white">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-6 text-mist">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="contact" aria-labelledby="t-contact-title" className="px-6 pb-20 pt-4">
        <div className="t-final-chamber surface-console relative isolate mx-auto max-w-5xl overflow-hidden rounded-3xl border border-sky/35 px-8 py-14 text-center">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 grid place-items-center overflow-hidden">
            <div className="t-final-ring animate-spin-slow size-[26rem] rounded-full border border-dashed border-sky/20" />
            <div className="t-final-ring animate-spin-slower absolute size-[18rem] rounded-full border border-violet/25" />
          </div>

          <div className="flex justify-center">
            <Logo size="md" />
          </div>

          <div className="mt-5 inline-flex items-center gap-2.5 text-xs font-bold text-glow">
            <span aria-hidden="true" className="h-px w-6 bg-gradient-to-l from-cyan to-transparent" />
            <Icon name="whatsapp" size={15} />
            <span>الفصل 08 · ابدأ المحادثة</span>
            <span aria-hidden="true" className="h-px w-6 bg-gradient-to-r from-violet to-transparent" />
          </div>

          <h2 id="t-contact-title" className="mx-auto mt-5 max-w-2xl text-4xl font-black leading-[1.28] text-white">
            {FINAL_CTA.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-mist">{FINAL_CTA.text}</p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <WhatsAppButton message="general" size="lg">
              {FINAL_CTA.cta}
            </WhatsAppButton>
            <div className="flex flex-wrap justify-center gap-2.5">
              <WhatsAppButton message="hr" variant="ghost" size="sm">
                {FINAL_CTA.hrShortcut}
              </WhatsAppButton>
              <WhatsAppButton message="sales" variant="ghost" size="sm">
                {FINAL_CTA.salesShortcut}
              </WhatsAppButton>
            </div>
          </div>

          <p className="mt-7 text-xs text-haze">
            رقم الواتساب المباشر:{' '}
            <Latin className="font-bold text-white">{WHATSAPP_DISPLAY_NUMBER}</Latin>
          </p>
        </div>
      </section>
    </div>
  )
}
