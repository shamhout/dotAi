import { defineConfig, loadEnv, type HtmlTagDescriptor, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { SEO } from './src/config/seo.ts'
import { WHATSAPP_MESSAGES, WHATSAPP_NUMBER } from './src/config/whatsapp.ts'

/**
 * Content-Security-Policy delivered through <meta> (GitHub Pages cannot send
 * custom response headers). Production builds only – the Vite dev server needs
 * inline scripts for hot reload.
 *
 * Limits of a meta CSP: `frame-ancestors`, `report-uri` and `sandbox` are
 * ignored in <meta>. See README ("Security") for details.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  'upgrade-insecure-requests',
].join('; ')

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function siteMetaPlugin(siteUrl: string | undefined): Plugin {
  const abs = (path = '') => (siteUrl ? `${siteUrl}/${path}` : undefined)

  const jsonLd = () => {
    const url = abs()!
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${url}#organization`,
          name: SEO.siteName,
          url,
          logo: abs(SEO.logoImage),
          slogan: SEO.tagline,
          description: SEO.description,
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'sales',
            telephone: `+${WHATSAPP_NUMBER}`,
            availableLanguage: ['ar'],
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: SEO.siteName,
            itemListElement: SEO.offerings.map((o) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: o.name, description: o.description },
            })),
          },
        },
        {
          '@type': 'WebSite',
          '@id': `${url}#website`,
          url,
          name: SEO.siteName,
          inLanguage: SEO.lang,
          publisher: { '@id': `${url}#organization` },
        },
      ],
    }).replace(/</g, '\\u003c') // never let data close the <script> element
  }

  return {
    name: 'dotai-site-meta',

    transformIndexHtml(_html, ctx) {
      const isBuild = !ctx.server
      const tags: HtmlTagDescriptor[] = []

      // CSP must come first so it covers everything after it.
      if (isBuild) {
        tags.push({
          tag: 'meta',
          attrs: { 'http-equiv': 'Content-Security-Policy', content: CSP },
          injectTo: 'head-prepend',
        })
      }

      const meta = (attrs: Record<string, string>): HtmlTagDescriptor => ({ tag: 'meta', attrs, injectTo: 'head' })
      tags.push(
        { tag: 'title', children: SEO.title, injectTo: 'head' },
        meta({ name: 'description', content: SEO.description }),
        meta({ name: 'robots', content: 'index, follow, max-image-preview:large' }),
        meta({ name: 'theme-color', content: SEO.themeColor }),
        meta({ property: 'og:type', content: 'website' }),
        meta({ property: 'og:site_name', content: SEO.siteName }),
        meta({ property: 'og:locale', content: SEO.locale }),
        meta({ property: 'og:title', content: SEO.title }),
        meta({ property: 'og:description', content: SEO.description }),
        meta({ name: 'twitter:card', content: 'summary_large_image' }),
        meta({ name: 'twitter:title', content: SEO.title }),
        meta({ name: 'twitter:description', content: SEO.description }),
      )

      // Absolute URLs are only emitted when the real public URL is known –
      // a wrong canonical is worse than none.
      if (siteUrl) {
        const og = abs(SEO.ogImage)!
        tags.push(
          { tag: 'link', attrs: { rel: 'canonical', href: `${siteUrl}/` }, injectTo: 'head' },
          meta({ property: 'og:url', content: `${siteUrl}/` }),
          meta({ property: 'og:image', content: og }),
          meta({ property: 'og:image:width', content: String(SEO.ogImageWidth) }),
          meta({ property: 'og:image:height', content: String(SEO.ogImageHeight) }),
          meta({ property: 'og:image:alt', content: SEO.ogImageAlt }),
          meta({ name: 'twitter:image', content: og }),
          meta({ name: 'twitter:image:alt', content: SEO.ogImageAlt }),
          { tag: 'script', attrs: { type: 'application/ld+json' }, children: jsonLd(), injectTo: 'head' },
        )
      }

      // No-JS fallback. Number and message come from the same config as the rest of the site.
      const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGES.general)}`
      tags.push({
        tag: 'noscript',
        injectTo: 'body-prepend',
        children:
          // (styled from src/styles/index.css – inline style attributes would violate our own CSP)
          `<main class="noscript-fallback">` +
          `<h1>${escapeHtml(SEO.siteName)} – ${escapeHtml(SEO.tagline)}</h1>` +
          `<p>${escapeHtml(SEO.description)}</p>` +
          `<p><a href="${wa}" rel="noopener noreferrer">تواصل معنا على واتساب</a></p>` +
          `</main>`,
      })

      return tags
    },

    generateBundle() {
      if (!siteUrl) {
        this.warn(
          'VITE_SITE_URL is not set: canonical, Open Graph image, JSON-LD, sitemap.xml and robots.txt were skipped. ' +
            'Set it (see .env.example) or build through the GitHub Actions workflow.',
        )
        return
      }
      const lastmod = new Date().toISOString().slice(0, 10)
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source:
          `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          `  <url><loc>${siteUrl}/</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url>\n` +
          `</urlset>\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const siteUrl = (env.VITE_SITE_URL || '').trim().replace(/\/+$/, '') || undefined

  return {
    /**
     * Base path. './' (relative) works at the domain root, under a repository
     * sub-path (https://user.github.io/repo/) and on a future custom domain.
     * Override with VITE_BASE_PATH (e.g. "/repo/") if you ever need an absolute base.
     */
    base: env.VITE_BASE_PATH || './',
    plugins: [react(), tailwindcss(), siteMetaPlugin(siteUrl)],
    build: {
      target: 'es2022',
      sourcemap: false, // do not publish source maps
    },
  }
})
