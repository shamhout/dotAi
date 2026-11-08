import mark512 from '../assets/logo-mark-512.webp'
import mark1024 from '../assets/logo-mark-1024.webp'
import { AnchorButton, WhatsAppButton } from '../components/Buttons'
import { Icon } from '../components/Icon'
import { Latin } from '../components/Latin'
import { HERO, PRODUCTS } from '../config/site'
import { SEO } from '../config/seo'

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-16 pt-28 md:pt-32 lg:pb-24 lg:pt-36">
      {/* backdrop: soft brand glows + fading grid (no blur filters → cheap to paint) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 start-[-10%] h-[38rem] w-[38rem] bg-[radial-gradient(closest-side,rgb(35_53_252/0.38),transparent)]" />
        <div className="absolute -bottom-32 end-[-12%] h-[34rem] w-[34rem] bg-[radial-gradient(closest-side,rgb(94_76_249/0.3),transparent)]" />
        <div className="bg-grid absolute inset-0" />
      </div>

      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
        {/* copy */}
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-sky/25 bg-sky/10 px-4 py-1.5 text-sm font-semibold text-glow">
            <Icon name="cpu" size={16} />
            <Latin>{SEO.tagline}</Latin>
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-balance text-[1.95rem] font-extrabold leading-[1.45] sm:text-5xl sm:leading-[1.4] lg:text-[3.35rem]"
          >
            {HERO.headlineStart}
            <span className="text-gradient">{HERO.headlineAccent}</span>
            {HERO.headlineEnd}
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-8 text-mist sm:text-lg sm:leading-9">{HERO.text}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <AnchorButton href="#solutions" size="lg">
              {HERO.primaryCta}
              <Icon name="arrowLeft" size={20} />
            </AnchorButton>
            <WhatsAppButton message="general" variant="ghost" size="lg">
              {HERO.secondaryCta}
            </WhatsAppButton>
          </div>

          <ul className="mt-9 flex flex-wrap gap-2.5" aria-label="مجالات عمل dot Ai">
            {SEO.categories.map((c) => (
              <li key={c} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-sm text-mist">
                <Latin>{c}</Latin>
              </li>
            ))}
          </ul>
        </div>

        {/* visual: the official mark + the two products */}
        <div className="animate-fade-up [animation-delay:150ms]">
          <div className="relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-[27rem] lg:max-w-[30rem]">
            <div aria-hidden="true" className="absolute -inset-[6%] rounded-full bg-[radial-gradient(closest-side,rgb(31_126_254/0.34),rgb(94_76_249/0.14)_60%,transparent)]" />
            <div aria-hidden="true" className="absolute -inset-[3%] animate-spin-slow rounded-full border border-dashed border-sky/30" />
            <div aria-hidden="true" className="absolute inset-[4%] animate-spin-slower rounded-full border border-violet/25" />

            <img
              src={mark512}
              srcSet={`${mark512} 512w, ${mark1024} 1024w`}
              sizes="(min-width: 1024px) 30rem, (min-width: 640px) 27rem, 22rem"
              width={1024}
              height={1024}
              alt="شعار dot Ai: روبوت ذكي يعمل على حاسوب محاط بأيقونات أقسام الشركة"
              fetchPriority="high"
              decoding="async"
              className="relative z-10 size-full animate-float-slow rounded-full"
            />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#hr"
              className="glass glass-blur flex items-center gap-2.5 rounded-2xl px-4 py-2.5 transition-colors hover:border-cyan/50"
            >
              <span className="grid size-9 place-items-center rounded-xl bg-cyan/15 text-glow">
                <Icon name="users" size={20} />
              </span>
              <span className="text-start leading-tight">
                <span className="block text-sm font-bold">{PRODUCTS.hr.shortName}</span>
                <span className="block text-xs text-haze">إدارة الموظفين</span>
              </span>
            </a>
            <a
              href="#sales"
              className="glass glass-blur flex items-center gap-2.5 rounded-2xl px-4 py-2.5 transition-colors hover:border-violet/60"
            >
              <span className="grid size-9 place-items-center rounded-xl bg-violet/20 text-iris">
                <Icon name="trendingUp" size={20} />
              </span>
              <span className="text-start leading-tight">
                <span className="block text-sm font-bold">{PRODUCTS.sales.shortName}</span>
                <span className="block text-xs text-haze">متابعة المبيعات</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
