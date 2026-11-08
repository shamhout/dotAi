/**
 * Brand colours as raw hex values, for the few places that cannot read CSS
 * variables (inline SVG gradients in the product illustrations).
 *
 * The single source of truth for the design system is `@theme` in
 * src/styles/index.css – keep these values in sync with it. All of them were
 * sampled from the official dot Ai logo.
 */
export const BRAND = {
  ink: '#000613',
  night: '#030a2b',
  panel: '#07124a',
  sky: '#11a6fb',
  azure: '#1f7efe',
  electric: '#2335fc',
  violet: '#5e4cf9',
  cyan: '#03dcfe',
  glow: '#5af7fc',
} as const
