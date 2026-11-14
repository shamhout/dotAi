import { useEffect, useRef, useState } from 'react'
import { AnchorButton, WhatsAppButton } from '../components/Buttons'
import { Icon } from '../components/Icon'
import { Logo } from '../components/Logo'
import { CONTACT_LABEL, NAV_LINKS } from '../config/site'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { useScrolled } from '../hooks/useScrolled'
import { gsap, useGsapScene } from '../lib/motion'

const NAV_IDS = NAV_LINKS.map((l) => l.id)

export function Header() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(16)
  const active = useScrollSpy(NAV_IDS)
  const headerRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useGsapScene(headerRef, () => {
    const bar = progressRef.current
    if (!bar) return
    gsap.to(bar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.15,
      },
    })
  })

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
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        open
          ? 'border-b border-white/10 bg-ink'
          : scrolled
            ? 'glass-blur border-b border-sky/15 bg-ink/95 shadow-[0_12px_40px_-24px_rgb(0_6_19/0.95)]'
            : 'border-b border-transparent bg-gradient-to-b from-ink/85 to-transparent'
      }`}
    >
      <div className="container-x flex h-17 items-center justify-between gap-4">
        <a href="#home" aria-label="dot Ai – الصفحة الرئيسية" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        {/* desktop story chapter navigation */}
        <nav aria-label="القائمة الرئيسية" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-night/60 p-1">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative inline-flex items-center rounded-full px-3.5 py-1.5 text-[0.88rem] font-semibold transition-all ${
                      isActive
                        ? 'bg-panel text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.14)]'
                        : 'text-mist hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-l from-transparent via-cyan to-transparent"
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2.5">
          <WhatsAppButton message="general" size="sm" className="hidden md:inline-flex">
            {CONTACT_LABEL}
          </WhatsAppButton>
          <button
            type="button"
            className="grid size-11 cursor-pointer place-items-center rounded-full border border-white/15 bg-night/80 text-white transition-colors hover:border-sky/40 hover:bg-panel lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      {/* Continuous scroll progress thread along the bottom of the header */}
      <div aria-hidden="true" className="h-[2px] w-full bg-white/[0.04]">
        <div ref={progressRef} className="story-progress-bar h-full w-full bg-[image:var(--gradient-brand)]" />
      </div>

      {/* mobile menu */}
      <div id="mobile-menu" hidden={!open} className="border-t border-white/10 bg-ink lg:hidden">
        <nav aria-label="القائمة المحمولة" className="container-x py-5">
          <ul className="grid divide-y divide-white/8 rounded-2xl border border-white/10 bg-night/60">
            {NAV_LINKS.map((link, i) => {
              const isActive = active === link.id
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-12 items-center justify-between px-4 text-base font-semibold transition-colors ${
                      isActive ? 'text-glow' : 'text-mist hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-xs text-haze">{String(i + 1).padStart(2, '0')}</span>
                      <span>{link.label}</span>
                    </span>
                    {isActive && <span className="size-1.5 rounded-full bg-cyan" aria-hidden="true" />}
                  </a>
                </li>
              )
            })}
          </ul>
          <div className="mt-4 grid gap-2.5">
            <WhatsAppButton message="general" size="lg" onClick={() => setOpen(false)}>
              {CONTACT_LABEL}
            </WhatsAppButton>
            <AnchorButton href="#solutions" variant="ghost" onClick={() => setOpen(false)}>
              استكشف الأنظمة
            </AnchorButton>
          </div>
        </nav>
      </div>
    </header>
  )
}
