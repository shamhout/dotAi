import { useSyncExternalStore } from 'react'

export type ViewportTier = 'mobile' | 'tablet' | 'desktop'

const DESKTOP_MQ = '(min-width: 1025px)'
const TABLET_MQ = '(min-width: 768px) and (max-width: 1024px)'

function getViewportTier(): ViewportTier {
  if (typeof window === 'undefined') return 'desktop'
  if (window.matchMedia(DESKTOP_MQ).matches) return 'desktop'
  if (window.matchMedia(TABLET_MQ).matches) return 'tablet'
  return 'mobile'
}

function subscribeViewportTier(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  const desktopMq = window.matchMedia(DESKTOP_MQ)
  const tabletMq = window.matchMedia(TABLET_MQ)
  desktopMq.addEventListener('change', callback)
  tabletMq.addEventListener('change', callback)
  return () => {
    desktopMq.removeEventListener('change', callback)
    tabletMq.removeEventListener('change', callback)
  }
}

/**
 * Splits rendering cleanly between:
 *  - mobile  (<= 767px: 320px–430px touch cinema)
 *  - tablet  (768px–1024px: dedicated portrait & landscape editorial storyboard)
 *  - desktop (>= 1025px: preserves the full desktop experience untouched)
 */
export function useViewportTier(): ViewportTier {
  return useSyncExternalStore(subscribeViewportTier, getViewportTier, () => 'desktop')
}
