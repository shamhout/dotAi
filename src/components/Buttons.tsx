import type { ReactNode } from 'react'
import type { WhatsAppMessageKey } from '../config/whatsapp'
import { whatsAppLinkFor } from '../utils/whatsapp'
import { Icon } from './Icon'

type Variant = 'primary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const cls = (variant: Variant, size: Size, extra = '') =>
  `group btn btn-${variant} ${size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : ''} ${extra}`.replace(/\s+/g, ' ').trim()

interface BaseProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

/** In-page navigation button (smooth-scrolls to a section). */
export function AnchorButton({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  onClick,
}: BaseProps & { href: string; onClick?: () => void }) {
  return (
    <a href={href} className={cls(variant, size, className)} onClick={onClick}>
      {children}
    </a>
  )
}

interface WhatsAppButtonProps extends BaseProps {
  /** Which predefined message to open the chat with (see config/whatsapp.ts). */
  message: WhatsAppMessageKey
  /** Show the WhatsApp glyph (default true). */
  icon?: boolean
  onClick?: () => void
}

/**
 * Every conversion CTA on the site is a WhatsAppButton: same number, same
 * encoding, opens a new tab (WhatsApp app on mobile, WhatsApp Web on desktop).
 */
export function WhatsAppButton({
  message,
  variant = 'primary',
  size = 'md',
  icon = true,
  className,
  children,
  onClick,
}: WhatsAppButtonProps) {
  return (
    <a
      href={whatsAppLinkFor(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cls(variant, size, className)}
      onClick={onClick}
    >
      {icon && (
        <Icon
          name="whatsapp"
          size={size === 'sm' ? 18 : 21}
          className="shrink-0 transition-transform duration-300 group-hover:scale-110"
        />
      )}
      <span>{children}</span>
      <span className="sr-only"> (يفتح واتساب في نافذة جديدة)</span>
    </a>
  )
}
