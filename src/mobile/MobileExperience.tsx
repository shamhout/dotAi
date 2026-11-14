import { STORY_MOBILE_CHAPTERS } from '../config/storyData'
import { Footer } from '../sections/Footer'
import { MobileActionFinale } from './MobileActionFinale'
import { MobileBrandReveal } from './MobileBrandReveal'
import { MobileHeader } from './MobileHeader'
import { MobileHeroHook } from './MobileHeroHook'
import { MobilePainScenarios } from './MobilePainScenarios'
import { MobileProblemStream } from './MobileProblemStream'
import { MobileServices } from './MobileServices'
import { MobileTransformation } from './MobileTransformation'
import { MobileTurningPoint } from './MobileTurningPoint'

/**
 * Purpose-built 8-scene Touch Storytelling Experience for Mobile (<=767px: 320px–430px):
 *   01 The Hook -> 02 The Problem -> 03 Consequences -> 04 Turning Point ->
 *   05 Brand Reveal (dot Ai) -> 06 Before/After Results -> 07 Services -> 08 Action.
 */
export function MobileExperience() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-2.5 focus:font-bold focus:text-ink"
      >
        تخطّي إلى المحتوى
      </a>
      <MobileHeader />
      <main id="main">
        <MobileHeroHook />
        <MobileProblemStream />
        <MobilePainScenarios />
        <MobileTurningPoint />
        <MobileBrandReveal />
        <MobileTransformation />
        <MobileServices />
        <MobileActionFinale />
      </main>
      <Footer chapters={STORY_MOBILE_CHAPTERS} />
    </>
  )
}
