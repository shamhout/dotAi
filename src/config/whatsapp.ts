/**
 * WhatsApp is the ONLY sales channel for dot Ai.
 * This file is the single source of truth for the number and the pre-filled
 * messages. Nothing else in the project hard-codes either of them.
 *
 * NOTE: this file is also imported by vite.config.ts (to build the JSON-LD and
 * the <noscript> fallback), so it must stay free of React / browser code.
 */

/** International format, digits only (no "+", no spaces, no leading zero). */
export const WHATSAPP_NUMBER = '201278574730'

/** Pre-filled messages. The text is URL-encoded by createWhatsAppLink(). */
export const WHATSAPP_MESSAGES = {
  general: 'مرحباً dot Ai، أريد معرفة المزيد عن حلولكم.',
  hr: 'مرحباً dot Ai، أنا مهتم بشراء نظام HR لإدارة الموظفين والحضور والانصراف، وأريد معرفة التفاصيل والأسعار.',
  sales:
    'مرحباً dot Ai، أنا مهتم بشراء نظام Sales لإدارة ومتابعة المبيعات، وأريد معرفة التفاصيل والأسعار.',
} as const

export type WhatsAppMessageKey = keyof typeof WHATSAPP_MESSAGES

/** "+20 127 857 4730" – for display only (falls back to the raw digits). */
export const WHATSAPP_DISPLAY_NUMBER = (() => {
  const m = /^(\d{2})(\d{3})(\d{3})(\d{4})$/.exec(WHATSAPP_NUMBER)
  return m ? `+${m[1]} ${m[2]} ${m[3]} ${m[4]}` : `+${WHATSAPP_NUMBER}`
})()
