import { Icon } from '../components/Icon'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { PROCESS } from '../config/site'

export function HowItWorks() {
  return (
    <section id="process" aria-labelledby="process-title" className="relative py-20 lg:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="process-title" eyebrow={PROCESS.eyebrow} title={PROCESS.title} />
        </Reveal>

        <ol className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* connector line (desktop only) */}
          <span
            aria-hidden="true"
            className="absolute inset-x-[12%] top-[3.1rem] hidden h-px bg-gradient-to-l from-transparent via-sky/40 to-transparent lg:block"
          />
          {PROCESS.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 90} className="glass relative rounded-3xl p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="relative grid size-14 place-items-center rounded-2xl bg-[image:var(--gradient-cta)] text-white shadow-[0_10px_30px_-10px_rgb(35_53_252/0.9)]">
                  <Icon name={step.icon} size={26} />
                </span>
                <span aria-hidden="true" className="text-gradient text-5xl font-extrabold leading-none opacity-70">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-bold leading-8">
                <span className="sr-only">الخطوة {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2 leading-8 text-mist">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
