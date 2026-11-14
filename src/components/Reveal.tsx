import type { ElementType, ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

interface RevealProps {
  as?: ElementType
  /** Stagger delay in ms (mapped to CSP-safe CSS classes). */
  delay?: number
  className?: string
  children: ReactNode
}

const DELAY_CLASSES = ['', 'reveal-d1', 'reveal-d2', 'reveal-d3', 'reveal-d4', 'reveal-d5'] as const

/** Subtle fade-up when the element scrolls into view (CSS-only animation, GPU friendly). */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children }: RevealProps) {
  const ref = useReveal<HTMLElement>()
  const step = delay > 0 ? Math.min(5, Math.max(1, Math.round(delay / 80))) : 0
  const delayCls = DELAY_CLASSES[step]
  return (
    <Tag ref={ref} className={`reveal ${delayCls} ${className}`.replace(/\s+/g, ' ').trim()}>
      {children}
    </Tag>
  )
}
