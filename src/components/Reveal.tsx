import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

interface RevealProps {
  as?: ElementType
  /** Stagger delay in ms. */
  delay?: number
  className?: string
  children: ReactNode
}

/** Subtle fade-up when the element scrolls into view (CSS-only animation, GPU friendly). */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children }: RevealProps) {
  const ref = useReveal<HTMLElement>()
  const style = delay ? ({ '--d': `${delay}ms` } as CSSProperties) : undefined
  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} style={style}>
      {children}
    </Tag>
  )
}
