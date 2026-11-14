import { useRef } from 'react'
import { Icon } from '../components/Icon'
import { Latin } from '../components/Latin'
import { CONSEQUENCE_SCENARIOS, PROBLEM_SEQUENCE } from '../config/storyData'
import { gsap, useGsapScene } from '../lib/motion'

/**
 * TABLET SCENES 02 & 03 — PROBLEM MATRIX (#problem) + CONSEQUENCES THEATER (#pain)
 * Transition 01 -> 02: horizontal laser scan across a balanced 2-col problem blueprint.
 * Transition 02 -> 03: opposing split-entry showing Sales losses vs Team drain side-by-side.
 */
export function TabletProblemPain() {
  const wrapRef = useRef<HTMLDivElement>(null)

  useGsapScene(wrapRef, (_ctx, mm) => {
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.t-prob-scan', {
        scaleX: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#problem',
          start: 'top 86%',
          once: true,
        },
      })

      gsap.from('.t-prob-tile', {
        y: 26,
        scale: 0.94,
        opacity: 0,
        duration: 0.58,
        stagger: 0.07,
        ease: 'back.out(1.15)',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.t-prob-grid',
          start: 'top 88%',
          once: true,
        },
      })

      gsap.from('.t-pain-col-right', {
        x: 44,
        opacity: 0,
        duration: 0.72,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '#pain',
          start: 'top 88%',
          once: true,
        },
      })

      gsap.from('.t-pain-col-left', {
        x: -44,
        opacity: 0,
        duration: 0.72,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '#pain',
          start: 'top 88%',
          once: true,
        },
      })
    })
  })

  return (
    <div ref={wrapRef} className="overflow-x-clip">
      {/* SCENE 02: Blueprint Matrix */}
      <section id="problem" aria-labelledby="t-problem-title" className="relative bg-gradient-to-b from-ink via-night/55 to-ink px-6 py-16">
        <div
          aria-hidden="true"
          className="t-prob-scan mx-auto mb-10 h-[2px] max-w-5xl origin-right bg-gradient-to-l from-cyan via-azure to-transparent"
        />

        <div className="mx-auto max-w-5xl">
          <div className="grid items-end gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <span className="inline-flex items-center gap-2 text-xs font-extrabold text-glow">
                <span className="size-1.5 rounded-full bg-cyan" aria-hidden="true" />
                <span>{PROBLEM_SEQUENCE.eyebrow}</span>
              </span>
              <h2 id="t-problem-title" className="mt-3 text-3xl font-black leading-[1.3] text-white">
                {PROBLEM_SEQUENCE.title}
              </h2>
            </div>
            <p className="text-sm leading-7 text-mist md:col-span-5">{PROBLEM_SEQUENCE.subtitle}</p>
          </div>

          <div className="t-prob-grid mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PROBLEM_SEQUENCE.nodes.map((node) => (
              <article key={node.index} className="t-prob-tile surface-architect flex flex-col justify-between rounded-2xl p-5">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 text-xs font-bold text-cyan">
                      <Icon name={node.icon} size={16} />
                      <span>{node.tag}</span>
                    </span>
                    <span className="font-mono text-xs font-bold text-haze">
                      <Latin>{node.index}</Latin>
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-extrabold text-white">{node.title}</h3>
                  <p className="mt-1.5 text-sm leading-7 text-mist">{node.detail}</p>
                </div>
              </article>
            ))}

            {/* 6th Summary Connector Tile filling crisp 3-col tablet balance */}
            <article className="t-prob-tile flex flex-col justify-center rounded-2xl border border-dashed border-sky/30 bg-panel/35 p-5">
              <span className="font-mono text-xs font-bold text-glow">
                <Latin>06 · CASCADE EFFECT</Latin>
              </span>
              <p className="mt-2 text-base font-black text-white">كل تأخير يومي بيتراكم مع الوقت.</p>
              <p className="mt-1.5 text-xs leading-6 text-mist">
                المشكلة مش في خطوة واحدة، بل في غياب الترابط بين كل خطوة والتانية.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* SCENE 03: Side-by-Side Consequence Theater */}
      <section id="pain" aria-labelledby="t-pain-title" className="scene-angle-cut relative bg-gradient-to-b from-night/85 via-panel/25 to-ink px-6 pb-16 pt-20">
        <div className="mx-auto max-w-5xl">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold text-iris">
            <span className="size-1.5 rounded-full bg-violet" aria-hidden="true" />
            <span>الفصل 03 · النتيجة على أرض الواقع</span>
          </span>
          <h2 id="t-pain-title" className="mt-3 max-w-3xl text-3xl font-black leading-[1.3] text-white">
            كيف يدفع العمل ثمن الشغل اليدوي يومياً؟
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {CONSEQUENCE_SCENARIOS.map((sc, idx) => {
              const isViolet = sc.accent === 'violet'
              return (
                <article
                  key={sc.id}
                  className={`surface-console flex flex-col justify-between rounded-3xl p-6 ${
                    isViolet ? 'border-violet/35' : 'border-cyan/30'
                  } ${idx === 0 ? 't-pain-col-right' : 't-pain-col-left'}`}
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className={`text-xs font-extrabold ${isViolet ? 'text-iris' : 'text-glow'}`}>
                        {sc.category}
                      </span>
                      <span className="font-mono text-xs font-bold text-haze">
                        <Latin>{sc.index}</Latin>
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-black text-white">{sc.title}</h3>

                    <ol className="mt-5 space-y-2.5">
                      {sc.steps.map((step, sIdx) => (
                        <li key={step.label} className="flex items-start gap-3 rounded-xl border border-white/8 bg-ink/80 p-3">
                          <span
                            className={`grid size-6 shrink-0 place-items-center rounded-lg font-mono text-xs font-black ${
                              isViolet ? 'bg-violet/25 text-iris' : 'bg-cyan/15 text-glow'
                            }`}
                          >
                            <Latin>{sIdx + 1}</Latin>
                          </span>
                          <div>
                            <p className="text-sm font-extrabold text-white">{step.label}</p>
                            <p className="mt-0.5 text-xs text-mist">{step.note}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div
                    className={`mt-5 flex items-start gap-2.5 rounded-2xl border p-3.5 ${
                      isViolet ? 'border-violet/35 bg-violet/12' : 'border-cyan/30 bg-cyan/10'
                    }`}
                  >
                    <Icon name="zap" size={16} className={`mt-0.5 shrink-0 ${isViolet ? 'text-iris' : 'text-cyan'}`} />
                    <p className="text-xs font-bold leading-6 text-white">{sc.outcome}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
