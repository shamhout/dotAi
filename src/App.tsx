import { lazy, Suspense } from 'react'
import { useViewportTier } from './hooks/useViewportTier'

const MobileExperience = lazy(() =>
  import('./mobile/MobileExperience').then((m) => ({ default: m.MobileExperience })),
)
const TabletExperience = lazy(() =>
  import('./tablet/TabletExperience').then((m) => ({ default: m.TabletExperience })),
)
const DesktopExperience = lazy(() => import('./desktop/DesktopExperience'))

function TierFallback() {
  return (
    <div className="boot" role="status" aria-label="جاري التحميل">
      <div className="boot-ring" />
    </div>
  )
}

export default function App() {
  const tier = useViewportTier()

  return (
    <Suspense fallback={<TierFallback />}>
      {tier === 'mobile' ? (
        <MobileExperience />
      ) : tier === 'tablet' ? (
        <TabletExperience />
      ) : (
        <DesktopExperience />
      )}
    </Suspense>
  )
}
