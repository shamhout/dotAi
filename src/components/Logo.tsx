import mark128 from '../assets/logo-mark-128.webp'
import mark512 from '../assets/logo-mark-512.webp'
import wordmark from '../assets/wordmark.webp'

/**
 * Official dot Ai logo, used as supplied: the circular mark and the wordmark
 * are both cut directly from the uploaded artwork (never re-typed).
 */
export function Logo({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const markPx = size === 'lg' ? 56 : 42
  const wordH = size === 'lg' ? 34 : 26
  // wordmark.webp is 587x160 → keep the exact aspect ratio
  const wordW = Math.round((587 / 160) * wordH)
  return (
    <span className="inline-flex items-center gap-3" dir="ltr">
      <img
        src={mark128}
        srcSet={`${mark128} 128w, ${mark512} 512w`}
        sizes={`${markPx}px`}
        width={markPx}
        height={markPx}
        alt=""
        decoding="async"
        className="rounded-full"
      />
      <img src={wordmark} width={wordW} height={wordH} alt="dot Ai" decoding="async" />
    </span>
  )
}
