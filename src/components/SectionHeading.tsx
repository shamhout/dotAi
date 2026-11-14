import type { ReactNode } from 'react'
import { Latin } from './Latin'

interface Props {
  index?: string
  eyebrow: string
  title: ReactNode
  text?: string
  align?: 'center' | 'start'
  id?: string
}

/**
 * Editorial section header with architectural index line instead of generic pill badges.
 */
export function SectionHeading({ index, eyebrow, title, text, align = 'center', id }: Props) {
  const center = align === 'center'
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-3xl`}>
      <div className={`inline-flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
        {index && (
          <span className="font-mono text-xs font-bold tracking-[0.2em] text-cyan">
            <Latin>{index}</Latin>
          </span>
        )}
        <span aria-hidden="true" className="h-px w-8 bg-gradient-to-l from-cyan via-sky to-transparent" />
        <p className="text-sm font-bold tracking-wide text-glow">{eyebrow}</p>
      </div>

      <h2
        id={id}
        className="mt-4 text-balance text-[1.75rem] font-black leading-[1.35] tracking-[-0.01em] sm:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </h2>

      {text && <p className="mt-4 text-pretty text-base leading-8 text-mist sm:text-lg sm:leading-9">{text}</p>}
    </div>
  )
}
