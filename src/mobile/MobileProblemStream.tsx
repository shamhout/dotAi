import { useRef } from 'react'
import { Icon } from '../components/Icon'
import { Latin } from '../components/Latin'
import { PROBLEM_SEQUENCE } from '../config/storyData'
import { gsap, useGsapScene } from '../lib/motion'

/**
 * MOBILE SCENE 02 — THE PROBLEM (#problem)
 * Horizontal swipe laser clears entry, then draws a vertical operational chain
 * proving how one manual shortcut multiplies chaos down the company.
 */
export function MobileProblemStream() {
  const sectionRef = useRef<HTMLElement>(null)

  useGsapScene(sectionRef, (_ctx, mm) => {
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Transition 01 -> 02: horizontal laser sweep divider
      gsap.from('.m-prob-laser', {
        scaleX: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          once: true,
        },
      })

      // Vertical spine draws dynamically through all 5 linked breakdowns
      gsap.from('.m-prob-spine-fill', {
        scaleY: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.m-prob-list',
          start: 'top 82%',
          end: 'bottom 70%',
          scrub: 0.4,
        },
      })

      // Alternating directional slide + depth snap down the connected problem spine
      gsap.from('.m-prob-step', {
        x: (i) => (i % 2 === 0 ? 32 : -32),
        scale: 0.94,
        opacity: 0,
        duration: 0.58,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.m-prob-list',
          start: 'top 90%',
          once: true,
        },
      })

      gsap.from('.m-prob-joint', {
        scale: 0,
        duration: 0.45,
        stagger: 0.1,
        ease: 'back.out(1.8)',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: '.m-prob-list',
          start: 'top 90%',
          once: true,
        },
      })
    })
  })

  return (
    <section
      ref={sectionRef}
      id="problem"
      aria-labelledby="m-problem-title"
      className="relative overflow-x-clip bg-gradient-to-b from-ink via-night/55 to-ink px-4 py-14"
    >
      {/* Transition 01 -> 02 horizontal kinetic sweep */}
      <div
        aria-hidden="true"
        className="m-prob-laser mx-auto mb-8 h-[2px] w-full max-w-md origin-right bg-gradient-to-l from-cyan via-azure to-transparent"
      />

      <div className="mx-auto max-w-md">
        <span className="inline-flex items-center gap-2 text-xs font-extrabold text-glow">
          <span className="size-1.5 rounded-full bg-cyan" aria-hidden="true" />
          <span>{PROBLEM_SEQUENCE.eyebrow}</span>
        </span>

        <h2
          id="m-problem-title"
          className="mt-3 text-[clamp(1.45rem,5.8vw,2rem)] font-black leading-[1.3] text-white"
        >
          {PROBLEM_SEQUENCE.title}
        </h2>
        <p className="mt-2.5 text-sm leading-7 text-mist">{PROBLEM_SEQUENCE.subtitle}</p>

        {/* Connected Chain Sequence (NOT isolated boring cards) */}
        <ol className="m-prob-list relative mt-8 space-y-4 ps-6">
          {/* Continuous Vertical Spine along start axis */}
          <div aria-hidden="true" className="absolute bottom-4 start-2.5 top-4 w-px bg-white/12">
            <div className="m-prob-spine-fill h-full w-full origin-top bg-gradient-to-b from-cyan via-sky to-violet" />
          </div>

          {PROBLEM_SEQUENCE.nodes.map((node) => (
            <li key={node.index} className="m-prob-step relative">
              {/* Spine Joint Indicator */}
              <span
                aria-hidden="true"
                className="m-prob-joint absolute -start-[1.35rem] top-5 grid size-5 place-items-center rounded-full border border-sky/50 bg-ink shadow-[0_0_12px_rgb(3_220_254/0.4)]"
              >
                <span className="node-pulse size-1.5 rounded-full bg-cyan" />
              </span>

              <div className="surface-architect rounded-2xl p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-cyan">
                    <Icon name={node.icon} size={15} />
                    <span>{node.tag}</span>
                  </span>
                  <span className="font-mono text-[11px] font-bold text-haze">
                    <Latin>{node.index}</Latin>
                  </span>
                </div>
                <h3 className="mt-2 text-base font-extrabold leading-snug text-white">{node.title}</h3>
                <p className="mt-1 text-xs leading-6 text-mist">{node.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
