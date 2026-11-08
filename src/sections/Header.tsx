import { useEffect, useState } from 'react'
import { AnchorButton, WhatsAppButton } from '../components/Buttons'
import { Icon } from '../components/Icon'
import { Logo } from '../components/Logo'
import { CONTACT_LABEL, NAV_LINKS } from '../config/site'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { useScrolled } from '../hooks/useScrolled'

const NAV_IDS = NAV_LINKS.map((l) => l.id)

export function Header() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(12)
  const active = useScrollSpy(NAV_IDS)

  // Close the mobile menu with Escape and when the viewport grows to desktop width.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const mq = window.matchMedia('(min-width: 1024px)')
    const onMq = () => mq.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        open
          ? 'border-b border-white/10 bg-ink'
          : scrolled
            ? 'glass-blur border-b border-white/10 bg-ink/80'
            : 'border-b border-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <a href="#home" aria-label="dot Ai – الصفحة الرئيسية" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        {/* desktop navigation */}
        <nav aria-label="القائمة الرئيسية" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative rounded-full px-4 py-2 text-[0.95rem] font-semibold transition-colors hover:text-white ${
                      isActive ? 'text-white' : 'text-mist'
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-[image:var(--gradient-brand)] transition-opacity ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppButton message="general" size="sm" className="hidden sm:inline-flex">
            {CONTACT_LABEL}
          </WhatsAppButton>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div id="mobile-menu" hidden={!open} className="border-t border-white/10 lg:hidden">
        <nav aria-label="القائمة المحمولة" className="container-x py-4">
          <ul className="grid gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-12 items-center rounded-xl px-4 text-base font-semibold transition-colors hover:bg-white/5 ${
                    active === link.id ? 'bg-white/5 text-white' : 'text-mist'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 grid gap-2">
            <WhatsAppButton message="general" size="lg" onClick={() => setOpen(false)}>
              {CONTACT_LABEL}
            </WhatsAppButton>
            <AnchorButton href="#solutions" variant="ghost" onClick={() => setOpen(false)}>
              اكتشف حلولنا
            </AnchorButton>
          </div>
        </nav>
      </div>
    </header>
  )
}
