import { img } from '../data'

export default function CTABanner() {
  return (
    <section className="container-x reveal pb-[72px] lg:pb-[120px]">
      <div className="group relative flex min-h-[400px] items-center justify-center overflow-hidden rounded-3xl px-6 py-16 text-center">
        <img
          src={img('1584735175097-719d848f8449', 1800)}
          alt="High-top sneakers held up in warm light"
          loading="lazy"
          className="img-zoom absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative">
          <h2 className="font-display mx-auto max-w-[820px] text-[34px] font-extrabold leading-[1.1] text-white sm:text-[56px]">
            Build Your Style With Confident Steps By Wearing Our Sneakers.
          </h2>
          <a href="#new" className="btn mt-8 h-[50px] w-[150px] bg-cream text-brown-dark hover:bg-[#e9d9c2]">
            Shop Now
          </a>
        </div>
      </div>
    </section>
  )
}
