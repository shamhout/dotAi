import { StoryProgress } from '../components/StoryProgress'
import { WhatsAppFloating } from '../components/WhatsAppFloating'
import { PRODUCTS } from '../config/site'
import { About } from '../sections/About'
import { FinalCta } from '../sections/FinalCta'
import { Footer } from '../sections/Footer'
import { Header } from '../sections/Header'
import { Hero } from '../sections/Hero'
import { HowItWorks } from '../sections/HowItWorks'
import { ProductDetail } from '../sections/ProductDetail'
import { Solutions } from '../sections/Solutions'
import { Transformation } from '../sections/Transformation'
import { Why } from '../sections/Why'

/**
 * 7-scene interactive storytelling experience for Desktop (>=1025px).
 * Lazy-loaded separately from Mobile & Tablet experiences so smaller screens
 * never download desktop-only scenes on constrained connections.
 */
export default function DesktopExperience() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-2.5 focus:font-bold focus:text-ink"
      >
        تخطّي إلى المحتوى
      </a>
      <Header />
      <StoryProgress />
      <main id="main">
        <Hero />
        <About />
        <Solutions />
        <Transformation />
        <Why />
        <ProductDetail product={PRODUCTS.hr} />
        <ProductDetail product={PRODUCTS.sales} flip />
        <HowItWorks />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFloating />
    </>
  )
}
