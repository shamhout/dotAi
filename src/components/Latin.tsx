import type { ReactNode } from 'react'

/**
 * Isolates a Latin-script run (HR, Sales, AI, dot Ai) inside Arabic text so the
 * Unicode bidi algorithm can never reorder it or the punctuation around it.
 */
export function Latin({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <bdi dir="ltr" className={className}>
      {children}
    </bdi>
  )
}
