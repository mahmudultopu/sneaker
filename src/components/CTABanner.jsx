// image path helper
import { img } from '../data'

// wide closing banner with a call to action
export default function CTABanner() {
  return (
    // page width section with bottom spacing
    <section className="container-x reveal pb-[72px] lg:pb-[120px]">
      {/* rounded photo banner, content centered */}
      <div className="group relative flex min-h-[400px] items-center justify-center overflow-hidden rounded-3xl px-6 py-16 text-center">
        {/* background photo */}
        <img src={img('cta')} alt="" loading="lazy" className="img-zoom absolute inset-0 h-full w-full object-cover" />
        {/* darkening layer so the headline is readable */}
        <div className="absolute inset-0 bg-black/40" />
        {/* text and button */}
        <div className="relative">
          {/* headline */}
          <h2 className="font-display mx-auto max-w-[820px] text-[34px] font-extrabold leading-[1.1] text-white sm:text-[56px]">
            Build Your Style With Confident Steps By Wearing Our Sneakers.
          </h2>
          {/* jumps to the product grid */}
          <a href="#shop" className="btn mt-8 h-[52px] w-[156px] bg-cream text-brown-dark hover:bg-white">
            Shop Now
          </a>
        </div>
      </div>
    </section>
  )
}
