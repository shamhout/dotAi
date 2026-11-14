import { CONTACT_WHATSAPP_LABEL } from '../config/site'
import { useScrolled } from '../hooks/useScrolled'
import { whatsAppLinkFor } from '../utils/whatsapp'
import { Icon } from './Icon'

/**
 * Desktop/tablet: floating pill that smoothly appears after scrolling past the hero
 * (keeping the hero viewport clean and focused on its primary WhatsApp CTA).
 * Mobile: full-width sticky bar that appears after the hero. The footer reserves
 * matching bottom padding so nothing is ever hidden behind it.
 */
export function WhatsAppFloating() {
  const pastHero = useScrolled(420)
  const href = whatsAppLinkFor('general')

  return (
    <>
      {/* ≥ md : floating pill (appears after scrolling past the hero) */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل معنا على واتساب (يفتح في نافذة جديدة)"
        tabIndex={pastHero ? 0 : -1}
        aria-hidden={!pastHero}
        className={`group fixed bottom-6 end-6 z-40 hidden items-center gap-2.5 rounded-full border border-cyan/35 bg-[image:var(--gradient-cta)] py-3 ps-4 pe-5 font-bold text-white shadow-[0_14px_40px_-8px_rgb(35_53_252/0.85)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan/70 hover:shadow-[0_18px_44px_-8px_rgb(3_220_254/0.55)] md:flex ${
          pastHero ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <span className="relative grid size-7 place-items-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-cyan/40 [animation-duration:2.6s]" aria-hidden="true" />
          <Icon name="whatsapp" size={24} className="relative transition-transform duration-300 group-hover:scale-110" />
        </span>
        <span className="text-sm font-extrabold">{CONTACT_WHATSAPP_LABEL}</span>
      </a>

      {/* < md : sticky bottom CTA */}
      <div
        className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 bg-gradient-to-t from-ink via-ink/90 to-transparent px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-6 transition duration-300 md:hidden ${
          pastHero ? 'translate-y-0 opacity-100' : 'invisible translate-y-full opacity-0'
        }`}
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-lg pointer-events-auto w-full"
          tabIndex={pastHero ? 0 : -1}
        >
          <Icon name="whatsapp" size={22} />
          <span>{CONTACT_WHATSAPP_LABEL}</span>
          <span className="sr-only"> (يفتح واتساب في نافذة جديدة)</span>
        </a>
      </div>
    </>
  )
}
