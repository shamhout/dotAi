import { useEffect, useRef } from 'react'

/**
 * One shared IntersectionObserver for every scroll-reveal element.
 * Falls back to "already visible" when IntersectionObserver is unavailable or
 * the visitor prefers reduced motion, so content can never stay hidden.
 */
let observer: IntersectionObserver | null = null

const getObserver = (): IntersectionObserver | null => {
  if (observer) return observer
  if (typeof IntersectionObserver === 'undefined') return null
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  )
  return observer
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const io = getObserver()
    if (reduce || !io) {
      el.classList.add('is-visible')
      return
    }
    io.observe(el)
    return () => io.unobserve(el)
  }, [])

  return ref
}
