import { WHATSAPP_MESSAGES, WHATSAPP_NUMBER, type WhatsAppMessageKey } from '../config/whatsapp'

/** Builds a wa.me deep link (works with the WhatsApp mobile app and WhatsApp Web). */
export const createWhatsAppLink = (message: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

/** Link for one of the predefined messages in config/whatsapp.ts. */
export const whatsAppLinkFor = (key: WhatsAppMessageKey): string =>
  createWhatsAppLink(WHATSAPP_MESSAGES[key])
