import { WhatsAppFloating } from './components/WhatsAppFloating'
import { PRODUCTS } from './config/site'
import { About } from './sections/About'
import { FinalCta } from './sections/FinalCta'
import { Footer } from './sections/Footer'
import { Header } from './sections/Header'
import { Hero } from './sections/Hero'
import { HowItWorks } from './sections/HowItWorks'
import { ProductDetail } from './sections/ProductDetail'
import { Solutions } from './sections/Solutions'
import { Why } from './sections/Why'

/**
 * Single-page site. HR and Sales have dedicated sections (#hr, #sales) instead
 * of separate routes: no router, no 404-on-refresh problem on GitHub Pages,
 * and it works unchanged under any base path or custom domain.
 */
export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-2.5 focus:font-bold focus:text-ink"
      >
        تخطّي إلى المحتوى
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Solutions />
        <ProductDetail product={PRODUCTS.hr} />
        <ProductDetail product={PRODUCTS.sales} flip />
        <Why />
        <HowItWorks />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFloating />
    </>
  )
}
