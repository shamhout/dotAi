import { STORY_CHAPTERS } from '../config/site'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { Latin } from './Latin'

const CHAPTER_IDS = ['home', 'about', 'solutions', 'transformation', 'why', 'hr', 'sales', 'process', 'contact']

/**
 * Compact desktop chapter rail anchored strictly inside the outer gutter
 * (>=1360px) so it never overlaps section text, expanding labels only on hover.
 */
export function StoryProgress() {
  const active = useScrollSpy(CHAPTER_IDS)

  return (
    <nav
      aria-label="فصول القصة"
      className="fixed top-1/2 end-3 z-30 hidden -translate-y-1/2 flex-col items-end min-[1360px]:flex"
    >
      <div className="rounded-2xl border border-white/10 bg-ink/85 p-1.5 backdrop-blur-md">
        <ul className="flex flex-col gap-1">
          {STORY_CHAPTERS.map((ch) => {
            const isActive =
              active === ch.id ||
              (ch.id === 'hr' && active === 'sales') ||
              (ch.id === 'contact' && active === 'process')

            return (
              <li key={ch.id} className="relative">
                <a
                  href={`#${ch.id}`}
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={`المشهد ${ch.num}: ${ch.label}`}
                  className={`group flex items-center justify-center gap-1.5 rounded-xl px-2 py-1.5 transition-all ${
                    isActive ? 'bg-panel/95 text-white shadow-[0_0_16px_-4px_rgb(3_220_254/0.4)]' : 'text-haze hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute end-full me-2.5 whitespace-nowrap rounded-lg border border-white/12 bg-night/95 px-2.5 py-1 text-[11px] font-bold text-white opacity-0 shadow-lg transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100 ltr:-translate-x-1 rtl:translate-x-1`}
                  >
                    {ch.label}
                  </span>
                  <span
                    className={`font-mono text-[10px] font-extrabold ${
                      isActive ? 'text-cyan' : 'text-haze/75 group-hover:text-sky'
                    }`}
                  >
                    <Latin>{ch.num}</Latin>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`size-1.5 rounded-full transition-all ${
                      isActive
                        ? 'scale-125 bg-cyan shadow-[0_0_10px_var(--color-cyan)]'
                        : 'bg-white/25 group-hover:bg-sky'
                    }`}
                  />
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
