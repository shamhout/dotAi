import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true })

export { gsap, ScrollTrigger }

/**
 * Runs a GSAP animation setup inside a React 19 StrictMode-safe gsap.context().
 * Uses gsap.matchMedia() internally when callers branch between desktop cinema,
 * lightweight mobile storytelling, and prefers-reduced-motion.
 */
export function useGsapScene(
  scopeRef: RefObject<HTMLElement | null>,
  setup: (ctx: gsap.Context, mm: gsap.MatchMedia) => void,
) {
  useEffect(() => {
    const scope = scopeRef.current
    if (!scope) return

    const mm = gsap.matchMedia(scope)
    const ctx = gsap.context((self) => {
      setup(self, mm)
    }, scope)

    return () => {
      mm.revert()
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
