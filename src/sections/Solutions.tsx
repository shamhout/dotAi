import { AnchorButton, WhatsAppButton } from '../components/Buttons'
import { HrIllustration } from '../components/illustrations/HrIllustration'
import { SalesIllustration } from '../components/illustrations/SalesIllustration'
import { Icon } from '../components/Icon'
import { Latin } from '../components/Latin'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { PRODUCTS, SOLUTIONS_INTRO, type Product } from '../config/site'
import { PRODUCT_THEME } from './productTheme'

/** Overview card. Exactly two products exist – nothing else is ever listed here. */
function ProductCard({ product }: { product: Product }) {
  const theme = PRODUCT_THEME[product.id]
  const Illustration = product.id === 'hr' ? HrIllustration : SalesIllustration

  return (
    <article className={`glass group relative flex h-full flex-col overflow-hidden rounded-3xl transition-colors ${theme.cardHover}`}>
      <div aria-hidden="true" className={`h-1 w-full bg-gradient-to-l ${theme.topBar}`} />

      {/* visual: top of the interface, fading out at the bottom */}
      <div className="relative h-52 overflow-hidden px-5 pt-5 sm:h-60">
        <div aria-hidden="true" className={`absolute inset-0 ${theme.glow}`} />
        <Illustration className="relative mx-auto w-full max-w-lg transition-transform duration-500 group-hover:-translate-y-1" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-night to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-6 pt-2 sm:p-8 sm:pt-2">
        <p className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-bold tracking-wide ${theme.pill}`}>
          <Latin>{product.englishName}</Latin>
        </p>
        <h3 className="mt-3 text-2xl font-extrabold leading-snug">{product.title}</h3>
        <p className="mt-1 text-sm font-semibold text-haze">يركّز على: {product.focus}</p>
        <p className="mt-4 text-pretty leading-8 text-mist">{product.summary}</p>

        <p className="mt-5 text-sm font-bold text-white">أهم الإمكانيات</p>
        <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {product.keyCapabilities.map((c) => (
            <li key={c} className="flex items-start gap-2.5 text-sm leading-6 text-mist">
              <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${theme.check}`}>
                <Icon name="check" size={12} strokeWidth={2.8} />
              </span>
              {c}
            </li>
          ))}
        </ul>

        <p className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm font-semibold leading-7 text-white">
          {product.value}
        </p>

        <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row">
          <AnchorButton href={`#${product.id}`} variant="ghost" className="sm:flex-1">
            {SOLUTIONS_INTRO.discoverLabel}
          </AnchorButton>
          <WhatsAppButton message={product.whatsAppKey} className="sm:flex-1">
            {product.orderLabel}
          </WhatsAppButton>
        </div>
      </div>
    </article>
  )
}

export function Solutions() {
  return (
    <section id="solutions" aria-labelledby="solutions-title" className="relative py-20 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-transparent via-night/70 to-transparent" />
      <div className="container-x">
        <Reveal>
          <SectionHeading
            id="solutions-title"
            eyebrow={SOLUTIONS_INTRO.eyebrow}
            title={SOLUTIONS_INTRO.title}
            text={SOLUTIONS_INTRO.text}
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Reveal>
            <ProductCard product={PRODUCTS.hr} />
          </Reveal>
          <Reveal delay={120}>
            <ProductCard product={PRODUCTS.sales} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
