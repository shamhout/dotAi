import { useRef } from 'react'
import { WhatsAppButton } from '../components/Buttons'
import { Icon } from '../components/Icon'
import { Latin } from '../components/Latin'
import { Logo } from '../components/Logo'
import { FINAL_CTA } from '../config/site'
import { WHATSAPP_DISPLAY_NUMBER } from '../config/whatsapp'
import { gsap, useGsapScene } from '../lib/motion'

/**
 * SCENE 07 (PART B) — THE NEXT CHAPTER / CLOSING CONVERGENCE
 * Concentric brand orbital light rings and the dot Ai emblem converge around
 * the final conversion invitation — one WhatsApp conversation begins the shift.
 */
export function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null)

  useGsapScene(sectionRef, (_ctx, mm) => {
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      // Orbital chamber emerges via radial iris aperture with concentric rings
      gsap.from('.final-stage', {
        clipPath: 'circle(24% at 50% 50%)',
        scale: 0.92,
        opacity: 0.35,
        duration: 0.95,
        ease: 'power3.out',
        clearProps: 'clipPath,transform,opacity',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 88%',
          once: true,
        },
      })

      gsap.from('.final-ring', {
        scale: 0.62,
        opacity: 0,
        duration: 1.15,
        stagger: 0.15,
        ease: 'back.out(1.1)',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 88%',
          once: true,
        },
      })

      gsap.from('.final-stagger', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 86%',
          once: true,
        },
      })
    })

    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.from('.final-stagger', {
        y: 16,
        opacity: 0,
        duration: 0.55,
        stagger: 0.07,
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
    <section ref={sectionRef} id="contact" aria-labelledby="contact-title" className="relative pb-24 pt-12 lg:pb-32">
      <div className="container-x">
        <div className="final-stage surface-console relative isolate overflow-hidden rounded-3xl border border-sky/30 px-6 py-16 text-center sm:px-12 sm:py-24">
          {/* Concentric orbital light rings (brand ring geometry without clipart) */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 grid place-items-center overflow-hidden">
            <div className="final-ring animate-spin-slow size-[32rem] rounded-full border border-dashed border-sky/18 sm:size-[44rem]" />
            <div className="final-ring animate-spin-slower absolute size-[22rem] rounded-full border border-violet/20 sm:size-[32rem]" />
          </div>
          <div aria-hidden="true" className="bg-dots pointer-events-none absolute inset-0 -z-10 opacity-30" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgb(17_166_251/0.24),transparent)]"
          />
          <div aria-hidden="true" className="hairline-x absolute inset-x-0 top-0" />

          <div className="final-stagger mb-6 flex justify-center">
            <Logo size="md" />
          </div>

          <div className="final-stagger inline-flex items-center gap-2.5 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-1.5 text-xs font-bold text-glow">
            <Icon name="whatsapp" size={16} />
            <span>{FINAL_CTA.sceneTag}</span>
          </div>

          <h2
            id="contact-title"
            className="final-stagger mx-auto mt-6 max-w-3xl text-balance text-[2rem] font-black leading-[1.3] sm:text-5xl"
          >
            {FINAL_CTA.title}
          </h2>
          <p className="final-stagger mx-auto mt-5 max-w-xl text-pretty text-base leading-8 text-mist sm:text-lg sm:leading-9">
            {FINAL_CTA.text}
          </p>

          {/* Primary WhatsApp Conversion CTA */}
          <div className="final-stagger mt-10 flex flex-col items-center justify-center gap-4">
            <WhatsAppButton message="general" size="lg" className="w-full sm:w-auto">
              {FINAL_CTA.cta}
            </WhatsAppButton>

            {/* Quick system-specific WhatsApp shortcuts */}
            <div className="flex w-full flex-col justify-center gap-2.5 sm:w-auto sm:flex-row">
              <WhatsAppButton message="hr" variant="ghost" size="sm">
                {FINAL_CTA.hrShortcut}
              </WhatsAppButton>
              <WhatsAppButton message="sales" variant="ghost" size="sm">
                {FINAL_CTA.salesShortcut}
              </WhatsAppButton>
            </div>
          </div>

          <p className="final-stagger mt-8 text-xs text-haze sm:text-sm">
            رقم الواتساب المباشر:{' '}
            <Latin className="font-bold text-white">{WHATSAPP_DISPLAY_NUMBER}</Latin>
          </p>
        </div>
      </div>
    </section>
  )
}
