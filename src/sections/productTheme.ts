/** Visual identity per product so the two systems are clearly distinguishable. HR = cyan→blue, Sales = blue→violet. */
export const PRODUCT_THEME = {
  hr: {
    pill: 'border-cyan/30 bg-cyan/10 text-glow',
    iconTile: 'border-cyan/25 bg-gradient-to-br from-cyan/20 to-azure/10 text-glow',
    check: 'bg-cyan/15 text-glow',
    glow: 'bg-[radial-gradient(closest-side,rgb(3_220_254/0.16),transparent)]',
    topBar: 'from-cyan via-azure to-electric',
    cardHover: 'hover:border-cyan/40',
  },
  sales: {
    pill: 'border-violet/40 bg-violet/15 text-iris',
    iconTile: 'border-violet/35 bg-gradient-to-br from-violet/25 to-azure/10 text-iris',
    check: 'bg-violet/20 text-iris',
    glow: 'bg-[radial-gradient(closest-side,rgb(94_76_249/0.22),transparent)]',
    topBar: 'from-azure via-electric to-violet',
    cardHover: 'hover:border-violet/50',
  },
} as const
