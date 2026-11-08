import { WhatsAppButton } from '../components/Buttons'
import { Reveal } from '../components/Reveal'
import { FINAL_CTA } from '../config/site'

export function FinalCta() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-20 lg:py-28">
      <div className="container-x">
        <Reveal className="relative isolate overflow-hidden rounded-[2rem] border border-sky/25 px-6 py-14 text-center sm:px-12 sm:py-20">
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgb(35_53_252/0.45),rgb(3_10_43/0.95)_45%,rgb(94_76_249/0.45))]" />
          <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-60" />
          <div aria-hidden="true" className="absolute -top-24 start-1/2 -z-10 h-64 w-[36rem] max-w-full -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(3_220_254/0.28),transparent)] rtl:translate-x-1/2" />

          <h2 id="contact-title" className="mx-auto max-w-2xl text-balance text-[1.8rem] font-extrabold leading-[1.45] sm:text-4xl lg:text-[2.6rem]">
            {FINAL_CTA.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-8 text-mist sm:text-lg">{FINAL_CTA.text}</p>
          <div className="mt-9 flex justify-center">
            <WhatsAppButton message="general" size="lg" className="w-full sm:w-auto">
              {FINAL_CTA.cta}
            </WhatsAppButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
