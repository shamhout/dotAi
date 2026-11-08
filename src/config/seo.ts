/**
 * Website metadata – single source of truth.
 * Consumed by vite.config.ts (to generate <head> tags, JSON-LD, sitemap and
 * robots.txt at build time), so keep this file free of React / browser code.
 *
 * The public URL is NOT hard-coded here: it comes from the VITE_SITE_URL
 * environment variable (set automatically by the GitHub Actions workflow), so
 * moving to a custom domain later needs no code changes.
 */
export const SEO = {
  siteName: 'dot Ai',
  tagline: 'Intelligence That Works.',
  categories: ['AI Automation', 'Intelligent Systems', 'Smarter Business'],
  lang: 'ar',
  locale: 'ar_EG',
  title: 'dot Ai | أنظمة ذكية لأتمتة الأعمال – نظام HR ونظام Sales',
  description:
    'dot Ai شركة تقنية تطوّر أنظمة ذكية لأتمتة الأعمال: نظام HR لإدارة الموظفين والحضور والرواتب، ونظام Sales لمتابعة المبيعات والتقارير. تواصل معنا على واتساب.',
  /** Paths are relative to the site root (files live in /public). */
  ogImage: 'og-image.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'شعار dot Ai – Intelligence That Works',
  logoImage: 'apple-touch-icon.png',
  themeColor: '#000613',
  /** Offerings listed in structured data (no prices – none were provided). */
  offerings: [
    {
      name: 'نظام HR لإدارة الموظفين',
      description: 'إدارة الموظفين والحضور والانصراف والورديات والسلف والمكافآت والخصومات وحساب الرواتب.',
    },
    {
      name: 'نظام Sales لإدارة المبيعات',
      description: 'تتبع المبيعات ومتابعة الأداء والتقارير والتحليلات ونشاط العملاء.',
    },
  ],
} as const
