import { WhatsAppButton } from '../components/Buttons'
import { HrIllustration } from '../components/illustrations/HrIllustration'
import { SalesIllustration } from '../components/illustrations/SalesIllustration'
import { Icon } from '../components/Icon'
import { Latin } from '../components/Latin'
import { Reveal } from '../components/Reveal'
import type { Product } from '../config/site'
import { PRODUCT_THEME } from './productTheme'

/**
 * Dedicated, fully detailed section for one product (anchor: #hr / #sales).
 * `flip` mirrors the layout so the two sections read differently while scrolling.
 */
export function ProductDetail({ product, flip = false }: { product: Product; flip?: boolean }) {
  const theme = PRODUCT_THEME[product.id]
  const Illustration = product.id === 'hr' ? HrIllustration : SalesIllustration
  const titleId = `${product.id}-title`

  return (
    <section id={product.id} aria-labelledby={titleId} className="relative isolate overflow-x-clip py-20 lg:py-28">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -z-10 h-[38rem] w-[38rem] ${theme.glow} ${
          flip ? 'start-[-12%]' : 'end-[-12%]'
        } top-10`}
      />

      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className={flip ? 'lg:order-2' : ''}>
            <p className={`inline-flex items-center rounded-full border px-3.5 py-1 text-sm font-bold ${theme.pill}`}>
              <Latin>{product.englishName}</Latin>
            </p>
            <h2 id={titleId} className="mt-4 text-balance text-[1.8rem] font-extrabold leading-[1.4] sm:text-4xl lg:text-[2.6rem]">
              {product.title}
            </h2>
            <p className="text-gradient mt-3 text-xl font-bold leading-9 sm:text-2xl">{product.value}</p>
            <p className="mt-5 text-pretty text-base leading-8 text-mist sm:text-lg sm:leading-9">{product.howItHelps}</p>

            <ul className="mt-7 grid gap-3.5">
              {product.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-base leading-7">
                  <span className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full ${theme.check}`}>
                    <Icon name="check" size={14} strokeWidth={2.8} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <WhatsAppButton message={product.whatsAppKey} size="lg">
                {product.orderLabel}
              </WhatsAppButton>
              <p className="text-sm text-haze">تواصل معنا على واتساب لمعرفة التفاصيل والأسعار.</p>
            </div>
          </Reveal>

          <Reveal delay={120} className={flip ? 'lg:order-1' : ''}>
            <div className="glass relative rounded-[2rem] p-3 sm:p-5">
              <div aria-hidden="true" className={`absolute inset-0 rounded-[2rem] ${theme.glow}`} />
              <Illustration className="relative w-full" />
            </div>
            <p className="mt-3 text-center text-xs text-haze">تصوّر توضيحي للواجهة</p>
          </Reveal>
        </div>

        {/* full capability list */}
        <Reveal className="mt-16 lg:mt-20">
          <h3 className="text-center text-2xl font-extrabold sm:text-3xl">إمكانيات النظام</h3>
        </Reveal>
        <ul className="mt-8 flex flex-wrap justify-center gap-4">
          {product.capabilities.map((cap, i) => (
            <Reveal
              as="li"
              key={cap.title}
              delay={(i % 4) * 70}
              className="glass basis-full rounded-2xl p-5 sm:basis-[calc(50%-0.5rem)] lg:basis-[calc(25%-0.75rem)]"
            >
              <span className={`grid size-11 place-items-center rounded-xl border ${theme.iconTile}`}>
                <Icon name={cap.icon} size={22} />
              </span>
              <h4 className="mt-4 text-base font-bold">{cap.title}</h4>
              <p className="mt-1.5 text-sm leading-7 text-mist">{cap.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
