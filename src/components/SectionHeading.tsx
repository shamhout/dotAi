import type { ReactNode } from 'react'

interface Props {
  index?: string
  eyebrow?: string
  title: ReactNode
  text?: string
  align?: 'center' | 'start'
  id?: string
}

/**
 * Editorial section header without distracting chapter index pills.
 */
export function SectionHeading({ title, text, align = 'center', id }: Props) {
  const center = align === 'center'
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-3xl`}>
      <h2
        id={id}
        className="text-balance text-[1.75rem] font-black leading-[1.35] tracking-[-0.01em] sm:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </h2>

      {text && <p className="mt-4 text-pretty text-base leading-8 text-mist sm:text-lg sm:leading-9">{text}</p>}
    </div>
  )
}
