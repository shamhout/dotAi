import { WhatsAppButton } from '../components/Buttons'
import { Latin } from '../components/Latin'
import { Logo } from '../components/Logo'
import { SEO } from '../config/seo'
import { CONTACT_LABEL, FOOTER, NAV_LINKS, PRODUCTS } from '../config/site'
import { WHATSAPP_DISPLAY_NUMBER } from '../config/whatsapp'

/**
 * No social-media links on purpose: none were provided and the brief forbids
 * inventing them. Add real URLs here when they exist.
 */
export function Footer() {
  const year = new Date().getFullYear()
  const quickLinks = NAV_LINKS.filter((l) => l.id !== 'hr' && l.id !== 'sales')

  return (
    <footer className="relative border-t border-white/10 bg-night/60 pb-28 pt-14 md:pb-10">
      <div className="container-x">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <a href="#home" aria-label="dot Ai – الصفحة الرئيسية" className="inline-block">
              <Logo size="lg" />
            </a>
            <p className="mt-5 text-lg font-bold">
              <Latin className="text-gradient">{SEO.tagline}</Latin>
            </p>
            <p className="mt-2 max-w-xs text-sm leading-7 text-haze">
              <Latin>{SEO.categories.join(' | ')}</Latin>
            </p>
          </div>

          <nav aria-label={FOOTER.quickLinksTitle}>
            <h2 className="text-base font-bold">{FOOTER.quickLinksTitle}</h2>
            <ul className="mt-4 grid gap-1">
              {quickLinks.map((l) => (
                <li key={l.id}>
                  <a href={l.href} className="inline-flex min-h-9 items-center text-mist transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={FOOTER.systemsTitle}>
            <h2 className="text-base font-bold">{FOOTER.systemsTitle}</h2>
            <ul className="mt-4 grid gap-1">
              {[PRODUCTS.hr, PRODUCTS.sales].map((p) => (
                <li key={p.id}>
                  <a href={`#${p.id}`} className="inline-flex min-h-9 items-center text-mist transition-colors hover:text-white">
                    {p.shortName}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-base font-bold">{FOOTER.contactTitle}</h2>
            <p className="mt-4 text-sm text-haze">{FOOTER.whatsappLabel}</p>
            <p className="mt-1 text-lg font-bold">
              <Latin>{WHATSAPP_DISPLAY_NUMBER}</Latin>
            </p>
            <WhatsAppButton message="general" size="sm" className="mt-4">
              {CONTACT_LABEL}
            </WhatsAppButton>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-haze">
          © {year} <Latin>{SEO.siteName}</Latin>. {FOOTER.rights}
        </p>
      </div>
    </footer>
  )
}
