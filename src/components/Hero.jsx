import { useEffect, useState } from 'react'
import { heroSlides, img } from '../data'
import { ChevronLeft, ChevronRight } from './Icons'

export default function Hero() {
  const [index, setIndex] = useState(0)
  const total = heroSlides.length
  const go = (dir) => setIndex((i) => (i + dir + total) % total)

  useEffect(() => {
    const t = setTimeout(() => go(1), 5000)
    return () => clearTimeout(t)
  }, [index])

  return (
    <section className="relative h-[90vh] max-h-[860px] min-h-[560px] overflow-hidden rounded-b-3xl bg-hero">
      {heroSlides.map((s, i) => (
        <img
          key={s.id}
          src={img(s.id, 1800)}
          alt={s.alt}
          className={`absolute inset-y-0 right-0 h-full w-full object-cover transition-opacity duration-1000 lg:w-[62%] ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}

      {/* blend photo into the taupe background */}
      <div className="absolute inset-0 bg-black/45 lg:hidden" />
      <div className="absolute inset-y-0 left-[38%] hidden w-[30%] bg-gradient-to-r from-hero via-hero/60 to-transparent lg:block" />

      <div className="container-x relative flex h-full flex-col justify-center pt-16">
        <h1 className="font-display max-w-[720px] text-[44px] font-extrabold leading-[1.02] text-cream sm:text-[64px] lg:text-[84px]">
          Sneakers That <br className="hidden lg:block" />
          Defy Your Every <br className="hidden lg:block" />
          day Look
        </h1>
        <a href="#new" className="btn mt-12 h-[50px] w-[150px] bg-cream text-brown-dark hover:bg-[#e9d9c2]">
          Shop Now
        </a>
      </div>

      <div className="absolute bottom-6 right-4 flex items-center gap-3 sm:right-10 lg:right-[max(2.5rem,calc((100vw-1200px)/2+2.5rem))]">
        <span className="grid h-11 w-11 place-items-center rounded-full border-[3px] border-white/70 font-display text-lg font-bold text-white">
          {index + 1}
        </span>
        <button
          aria-label="Previous slide"
          onClick={() => go(-1)}
          className="grid h-11 w-11 place-items-center rounded-full bg-black text-white transition hover:bg-brown-dark"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next slide"
          onClick={() => go(1)}
          className="grid h-11 w-11 place-items-center rounded-full bg-black text-white transition hover:bg-brown-dark"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  )
}
