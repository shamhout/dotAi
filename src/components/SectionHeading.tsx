import type { ReactNode } from 'react'

interface Props {
  eyebrow: string
  title: ReactNode
  text?: string
  align?: 'center' | 'start'
  id?: string
}

export function SectionHeading({ eyebrow, title, text, align = 'center', id }: Props) {
  const center = align === 'center'
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-3xl`}>
      <p className="inline-flex items-center gap-2 rounded-full border border-sky/25 bg-sky/10 px-3.5 py-1 text-sm font-semibold text-glow">
        <span className="size-1.5 rounded-full bg-cyan shadow-[0_0_10px_var(--color-cyan)]" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-4 text-balance text-[1.7rem] font-extrabold leading-[1.4] sm:text-4xl lg:text-[2.6rem]">
        {title}
      </h2>
      {text && <p className="mt-4 text-pretty text-base leading-8 text-mist sm:text-lg">{text}</p>}
    </div>
  )
}
