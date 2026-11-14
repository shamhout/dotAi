import { WhatsAppButton } from '../components/Buttons'
import { Latin } from '../components/Latin'
import { Logo } from '../components/Logo'
import { SEO } from '../config/seo'
import { CONTACT_LABEL, FOOTER, PRODUCTS, STORY_CHAPTERS } from '../config/site'
import { WHATSAPP_DISPLAY_NUMBER } from '../config/whatsapp'

/**
 * No social-media links on purpose: none were provided and the brief forbids
 * inventing them. Add real URLs here when they exist.
 */
export interface FooterChapter {
  id: string
  num: string
  label: string
}

export function Footer({ chapters }: { chapters?: readonly FooterChapter[] }) {
  const year = new Date().getFullYear()
  const storyLinks = (chapters ?? STORY_CHAPTERS).filter((c) => c.id !== 'hr')

  return (
    <footer className="relative bg-night/70 pb-28 pt-16 md:pb-12">
      <div className="hairline-x absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="container-x">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.45fr_1fr_1fr_1.2fr]">
          <div>
            <a href="#home" aria-label="dot Ai – الصفحة الرئيسية" className="inline-block">
              <Logo size="lg" />
            </a>
            <p className="mt-5 text-lg font-extrabold">
              <Latin className="text-gradient">{SEO.tagline}</Latin>
            </p>
            <p className="mt-2 max-w-xs text-xs font-semibold tracking-wider text-haze sm:text-sm">
              <Latin>{SEO.categories.join(' · ')}</Latin>
            </p>
          </div>

          <nav aria-label={FOOTER.quickLinksTitle}>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-white">{FOOTER.quickLinksTitle}</h2>
            <ul className="mt-4 grid gap-1.5">
              {storyLinks.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    className="group inline-flex min-h-9 items-center gap-2 text-sm text-mist transition-colors hover:text-glow"
                  >
                    <span className="font-mono text-[11px] font-bold text-haze/70 transition-colors group-hover:text-cyan">
                      <Latin>{c.num}</Latin>
                    </span>
                    <span>{c.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={FOOTER.systemsTitle}>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-white">{FOOTER.systemsTitle}</h2>
            <ul className="mt-4 grid gap-1.5">
              {[PRODUCTS.hr, PRODUCTS.sales].map((p) => (
                <li key={p.id}>
                  <a href={`#${p.id}`} className="inline-flex min-h-9 items-center text-sm text-mist transition-colors hover:text-glow">
                    {p.shortName}
                  </a>
                </li>
              ))}
              <li>
                <a href="#process" className="inline-flex min-h-9 items-center text-sm text-mist transition-colors hover:text-glow">
                  رحلة البدء والتنفيذ
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-white">{FOOTER.contactTitle}</h2>
            <p className="mt-4 text-xs text-haze">{FOOTER.whatsappLabel}</p>
            <p className="mt-1 text-lg font-extrabold text-white">
              <Latin>{WHATSAPP_DISPLAY_NUMBER}</Latin>
            </p>
            <WhatsAppButton message="general" size="sm" className="mt-4">
              {CONTACT_LABEL}
            </WhatsAppButton>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center text-xs text-haze sm:flex-row sm:text-sm">
          <p>
            © {year} <Latin>{SEO.siteName}</Latin>. {FOOTER.rights}
          </p>
          <p>
            <Latin>{SEO.tagline}</Latin>
          </p>
        </div>
      </div>
    </footer>
  )
}
