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

const TABLET_CHAPTER_IDS = STORY_MOBILE_CHAPTERS.map((c) => c.id)

const TABLET_QUICK_PILLS = [
  { id: 'problem', label: 'المشكلة', href: '#problem' },
  { id: 'about', label: 'التحوّل', href: '#about' },
  { id: 'solutions', label: 'dot Ai', href: '#solutions' },
  { id: 'hr', label: 'الأنظمة', href: '#hr' },
] as const

/**
 * Dedicated Tablet header & persistent chapter rail (768px–1024px portrait & landscape).
 * Shows the official dot Ai logo from load and reveals contextual WhatsApp conversion once
 * the visitor moves past the Hero opening scene.
 */
export function TabletHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const scrolled = useScrolled(24)
  const pastHook = useScrolled(420)
  const active = useScrollSpy(TABLET_CHAPTER_IDS)

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

  useEffect(() => {
    if (!drawerOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawerOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [drawerOpen])

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          drawerOpen
            ? 'border-b border-white/10 bg-ink'
            : scrolled
              ? 'glass-blur border-b border-sky/15 bg-ink/95 shadow-[0_12px_36px_-20px_rgb(0_6_19/0.95)]'
              : 'border-b border-transparent bg-gradient-to-b from-ink/90 to-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-6">
          <a href="#home" aria-label="dot Ai – الصفحة الرئيسية" className="shrink-0" onClick={() => setDrawerOpen(false)}>
            <Logo />
          </a>

          {/* Landscape / Wide Tablet Center Milestones (>=900px) */}
          <nav aria-label="محاور القصة" className="hidden min-[900px]:block">
            <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-night/70 p-1">
              {TABLET_QUICK_PILLS.map((pill) => {
                const isActive = active === pill.id
                return (
                  <li key={pill.id}>
                    <a
                      href={pill.href}
                      className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                        isActive ? 'bg-panel text-white' : 'text-mist hover:text-white'
                      }`}
                    >
                      {pill.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            {pastHook && (
              <WhatsAppButton message="general" size="sm">
                {CONTACT_LABEL}
              </WhatsAppButton>
            )}
            <button
              type="button"
              className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-night/85 px-3.5 text-xs font-bold text-white transition-colors hover:border-sky/40 hover:bg-panel"
              aria-expanded={drawerOpen}
              aria-controls="tablet-story-drawer"
              onClick={() => setDrawerOpen((v) => !v)}
            >
              <span>الفصول</span>
              <Icon name={drawerOpen ? 'close' : 'menu'} size={18} />
            </button>
          </div>
        </div>

        <div aria-hidden="true" className="h-[2px] w-full bg-white/[0.04]">
          <div ref={progressRef} className="story-progress-bar h-full w-full bg-[image:var(--gradient-brand)]" />
        </div>

        {/* Tablet Multi-Column Story Chapter Drawer */}
        <div
          id="tablet-story-drawer"
          hidden={!drawerOpen}
          className="border-t border-white/10 bg-ink/98 backdrop-blur-xl"
        >
          <nav aria-label="جميع فصول القصة" className="mx-auto max-w-5xl px-6 py-5">
            <ul className="grid grid-cols-2 gap-2.5">
              {STORY_MOBILE_CHAPTERS.map((ch) => {
                const isActive = active === ch.id || (ch.id === 'hr' && active === 'sales')
                return (
                  <li key={ch.id}>
                    <a
                      href={ch.href}
                      onClick={() => setDrawerOpen(false)}
                      className={`flex min-h-12 items-center justify-between rounded-xl border px-4 text-sm font-bold transition-colors ${
                        isActive
                          ? 'border-cyan/40 bg-panel/80 text-white'
                          : 'border-white/8 bg-night/70 text-mist hover:border-sky/30 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className={`font-mono text-xs ${isActive ? 'text-cyan' : 'text-haze'}`}>
                          <Latin>{ch.num}</Latin>
                        </span>
                        <span>{ch.label}</span>
                      </span>
                      <Icon name="arrowLeft" size={16} className={isActive ? 'text-cyan' : 'text-haze'} />
                    </a>
                  </li>
                )
              })}
            </ul>
            <div className="mt-4 flex justify-end border-t border-white/10 pt-4">
              <WhatsAppButton message="general" size="md" onClick={() => setDrawerOpen(false)}>
                {CONTACT_WHATSAPP_LABEL}
              </WhatsAppButton>
            </div>
          </nav>
        </div>
      </header>

      {/* Tablet Floating WhatsApp Pill once past Hook Screen, hidden at #contact finale */}
      <a
        href={whatsAppLinkFor('general')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل معنا على واتساب (يفتح في نافذة جديدة)"
        tabIndex={pastHook && !drawerOpen && active !== 'contact' ? 0 : -1}
        aria-hidden={!(pastHook && !drawerOpen && active !== 'contact')}
        className={`fixed bottom-5 end-5 z-40 flex items-center gap-2 rounded-full border border-cyan/35 bg-[image:var(--gradient-cta)] py-2.5 ps-4 pe-4 text-xs font-extrabold text-white shadow-[0_12px_32px_-8px_rgb(35_53_252/0.85)] transition-all duration-300 ${
          pastHook && !drawerOpen && active !== 'contact' ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <Icon name="whatsapp" size={20} />
        <span>{CONTACT_WHATSAPP_LABEL}</span>
      </a>
    </>
  )
}
