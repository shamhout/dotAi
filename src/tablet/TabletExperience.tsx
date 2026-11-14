import { STORY_MOBILE_CHAPTERS } from '../config/storyData'
import { Footer } from '../sections/Footer'
import { TabletActionFinale } from './TabletActionFinale'
import { TabletHeader } from './TabletHeader'
import { TabletHeroHook } from './TabletHeroHook'
import { TabletProblemPain } from './TabletProblemPain'
import { TabletServices } from './TabletServices'
import { TabletTransformation } from './TabletTransformation'
import { TabletTurningReveal } from './TabletTurningReveal'

/**
 * Dedicated 8-scene Editorial Storyboard Experience for Tablet (768px–1024px):
 * designed natively for both portrait (768x1024, 820x1180) and landscape (1024x768).
 */
export function TabletExperience() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-2.5 focus:font-bold focus:text-ink"
      >
        تخطّي إلى المحتوى
      </a>
      <TabletHeader />
      <main id="main">
        <TabletHeroHook />
        <TabletProblemPain />
        <TabletTurningReveal />
        <TabletTransformation />
        <TabletServices />
        <TabletActionFinale />
      </main>
      <Footer chapters={STORY_MOBILE_CHAPTERS} />
    </>
  )
}
