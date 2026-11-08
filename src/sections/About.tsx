import { Icon } from '../components/Icon'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { ABOUT } from '../config/site'

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-20 lg:py-28">
      <div className="container-x grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Reveal>
          <SectionHeading id="about-title" align="start" eyebrow={ABOUT.eyebrow} title={ABOUT.title} />
          <p className="mt-6 text-pretty text-base leading-8 text-mist sm:text-lg sm:leading-9">{ABOUT.lead}</p>
          <blockquote className="relative mt-8 rounded-2xl border border-sky/20 bg-gradient-to-br from-azure/10 to-violet/10 p-6 ps-7">
            <span aria-hidden="true" className="absolute inset-y-5 start-0 w-1 rounded-full bg-[image:var(--gradient-brand)]" />
            <p className="text-lg font-bold leading-9 sm:text-xl">{ABOUT.statement}</p>
          </blockquote>
        </Reveal>

        <Reveal delay={120} className="glass rounded-3xl p-6 sm:p-8">
          <h3 className="text-lg font-bold text-glow">{ABOUT.audienceTitle}</h3>
          <ul className="mt-5 grid gap-3.5">
            {ABOUT.audience.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base text-mist">
                <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-sky/15 text-glow">
                  <Icon name="check" size={14} strokeWidth={2.6} />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
