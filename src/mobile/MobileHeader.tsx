import { useEffect, useRef, useState } from 'react'
import { WhatsAppButton } from '../components/Buttons'
import { Icon } from '../components/Icon'
import { Latin } from '../components/Latin'
import { Logo } from '../components/Logo'
import { CONTACT_LABEL, CONTACT_WHATSAPP_LABEL } from '../config/site'
import { STORY_MOBILE_CHAPTERS } from '../config/storyData'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { useScrolled } from '../hooks/useScrolled'
import { gsap, useGsapScene } from '../lib/motion'
import { whatsAppLinkFor } from '../utils/whatsapp'

const MOBILE_CHAPTER_IDS = STORY_MOBILE_CHAPTERS.map((c) => c.id)

/**
 * Purpose-built minimal mobile touch bar + chapter drawer + single bottom CTA.
 * Displays the official dot Ai logo immediately and reveals the bottom sticky WhatsApp
 * action bar once the visitor scrolls past the opening hook, yielding at #contact.
 */
export function MobileHeader() {
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const scrolled = useScrolled(24)
  const pastHook = useScrolled(420)
  const active = useScrollSpy(MOBILE_CHAPTER_IDS)

  useGsapScene(headerRef, () => {
    const bar = progressRef.current
    if (bar) {
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
    }
  })

  const showStickyBar = pastHook && !open && active !== 'contact'

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const generalWhatsApp = whatsAppLinkFor('general')

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          open
            ? 'border-b border-white/10 bg-ink'
            : scrolled
              ? 'glass-blur border-b border-sky/15 bg-ink/95 shadow-[0_10px_30px_-18px_rgb(0_6_19/0.95)]'
              : 'border-b border-transparent bg-gradient-to-b from-ink/90 to-transparent'
        }`}
      >
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between gap-2 px-4">
          <a
            href="#home"
            aria-label="dot Ai – الصفحة الرئيسية"
            className="shrink-0"
            onClick={() => setOpen(false)}
          >
            <Logo />
          </a>

          <button
            type="button"
            className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-white/15 bg-night/85 text-white transition-colors active:scale-95"
            aria-expanded={open}
            aria-controls="touch-story-drawer"
            aria-label={open ? 'إغلاق القائمة' : 'فتح فصول القصة'}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} size={20} />
          </button>
        </div>

        {/* Continuous Story Progress Bar */}
        <div aria-hidden="true" className="h-[2px] w-full bg-white/[0.05]">
          <div ref={progressRef} className="story-progress-bar h-full w-full bg-[image:var(--gradient-brand)]" />
        </div>

        {/* Full-screen friendly touch chapter drawer */}
        <div
          id="touch-story-drawer"
          hidden={!open}
          className="max-h-[calc(100svh-3.6rem)] overflow-y-auto border-t border-white/10 bg-ink/98 backdrop-blur-xl"
        >
          <nav aria-label="فصول القصة التفاعلية" className="mx-auto max-w-lg px-4 py-4">
            <ul className="grid gap-1.5">
              {STORY_MOBILE_CHAPTERS.map((ch) => {
                const isActive = active === ch.id || (ch.id === 'hr' && active === 'sales')
                return (
                  <li key={ch.id}>
                    <a
                      href={ch.href}
                      onClick={() => setOpen(false)}
                      className={`flex min-h-12 items-center justify-between rounded-xl border px-3.5 text-sm font-bold transition-colors ${
                        isActive
                          ? 'border-cyan/40 bg-panel/80 text-white'
                          : 'border-white/8 bg-night/60 text-mist active:bg-panel/50'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`font-mono text-xs font-bold ${isActive ? 'text-cyan' : 'text-haze'}`}>
                          <Latin>{ch.num}</Latin>
                        </span>
                        <span>{ch.label}</span>
                      </span>
                      <Icon name="arrowLeft" size={16} className={isActive ? 'text-cyan' : 'text-haze/60'} />
                    </a>
                  </li>
                )
              })}
            </ul>

            <div className="mt-4 grid gap-2.5 border-t border-white/10 pt-4">
              <WhatsAppButton message="general" size="lg" onClick={() => setOpen(false)}>
                {CONTACT_LABEL}
              </WhatsAppButton>
            </div>
          </nav>
        </div>
      </header>

      {/* Single Mobile Sticky WhatsApp Conversion Bar (hidden on Hook Screen 01 and Finale #contact) */}
      <div
        className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 bg-gradient-to-t from-ink via-ink/92 to-transparent px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-5 transition-all duration-300 ${
          showStickyBar ? 'translate-y-0 opacity-100' : 'invisible translate-y-full opacity-0'
        }`}
      >
        <a
          href={generalWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={showStickyBar ? 0 : -1}
          className="btn btn-primary btn-md pointer-events-auto mx-auto flex min-h-12 w-full max-w-md shadow-[0_14px_34px_-8px_rgb(35_53_252/0.85)]"
        >
          <Icon name="whatsapp" size={20} />
          <span className="text-sm font-extrabold">{CONTACT_WHATSAPP_LABEL}</span>
          <span className="sr-only"> (يفتح واتساب في نافذة جديدة)</span>
        </a>
      </div>
    </>
  )
}
