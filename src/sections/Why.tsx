import { Icon } from '../components/Icon'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { WHY } from '../config/site'

export function Why() {
  return (
    <section id="why" aria-labelledby="why-title" className="relative py-20 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-transparent via-night/70 to-transparent" />
      <div className="container-x">
        <Reveal>
          <SectionHeading id="why-title" eyebrow={WHY.eyebrow} title={WHY.title} />
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={(i % 3) * 80} className="glass group rounded-3xl p-6 transition-colors hover:border-sky/40 sm:p-7">
              <span className="grid size-12 place-items-center rounded-2xl border border-sky/25 bg-gradient-to-br from-sky/20 to-violet/15 text-glow transition-transform duration-300 group-hover:scale-105">
                <Icon name={item.icon} size={24} />
              </span>
              <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 leading-8 text-mist">{item.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
