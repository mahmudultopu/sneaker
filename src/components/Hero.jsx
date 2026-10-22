// React helpers
import { useEffect, useRef, useState } from 'react'
// slide data and image path helper
import { heroSlides, img } from '../data'
// arrow icons
import { ChevronLeft, ChevronRight } from './Icons'

// time each slide stays on screen
const SLIDE_MS = 6000

// big top banner with an auto-playing photo carousel
export default function Hero() {
  // which slide is showing
  const [index, setIndex] = useState(0)
  // true while the mouse is over the banner or a control has focus
  const [paused, setPaused] = useState(false)
  // x position where a swipe started
  const touchStart = useRef(null)
  // number of slides
  const total = heroSlides.length
  // move forward (1) or back (-1), looping around
  const go = (dir) => setIndex((i) => (i + dir + total) % total)

  // auto-advance timer
  useEffect(() => {
    // do not auto-play when paused
    if (paused) return
    // do not auto-play for visitors who prefer less motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // schedule the next slide
    const t = setTimeout(() => go(1), SLIDE_MS)
    // cancel if the slide changes first
    return () => clearTimeout(t)
  }, [index, paused])

  return (
    // full-width banner, 90% of the screen tall
    <section
      id="top"
      aria-roledescription="carousel"
      aria-label="Featured sneakers"
      className="relative h-[90vh] max-h-[860px] min-h-[580px] overflow-hidden rounded-b-3xl bg-hero"
      // pause on hover
      onMouseEnter={() => setPaused(true)}
      // resume when the mouse leaves
      onMouseLeave={() => setPaused(false)}
      // remember where a finger touched down
      onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
      // on lift, swipe left/right if the finger moved far enough
      onTouchEnd={(e) => {
        // no start point recorded
        if (touchStart.current === null) return
        // horizontal distance moved
        const dx = e.changedTouches[0].clientX - touchStart.current
        // more than 50px counts as a swipe
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
        // reset
        touchStart.current = null
      }}
    >
      {/* all slide images stacked; only the active one is visible */}
      {heroSlides.map((s, i) => (
        <img
          key={s.image}
          src={img(s.image)}
          alt={i === index ? s.alt : ''}
          aria-hidden={i !== index}
          // first image loads right away; the rest load after
          loading={i === 0 ? 'eager' : 'lazy'}
          // fade between slides; photo fills the right 62% on desktop
          className={`absolute inset-y-0 right-0 h-full w-full object-cover transition-opacity duration-1000 lg:w-[62%] ${i === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}

      {/* darkens the photo on phones so the headline stays readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20 lg:hidden" />
      {/* blends the photo edge into the taupe background on desktop */}
      <div className="absolute inset-y-0 left-[38%] hidden w-[30%] bg-gradient-to-r from-hero via-hero/60 to-transparent lg:block" />

      {/* headline and button */}
      <div className="container-x relative flex h-full flex-col justify-center pt-16">
        {/* main headline, line breaks only on desktop */}
        <h1 className="font-display max-w-[720px] text-[46px] font-extrabold leading-[1.02] text-cream sm:text-[64px] lg:text-[84px]">
          {/* line 1 */}
          Sneakers That <br className="hidden lg:block" />
          {/* line 2 */}
          Defy Your Every <br className="hidden lg:block" />
          {/* line 3 */}
          day Look
        </h1>
        {/* jumps to the product grid */}
        <a href="#shop" className="btn mt-12 h-[52px] w-[156px] bg-cream text-brown-dark shadow-lg shadow-black/10 hover:bg-white">
          {/* label */}
          Shop Now
        </a>
      </div>

      {/* slider controls in the bottom-right corner */}
      <div
        className="absolute bottom-6 right-4 flex items-center gap-3 sm:right-10 lg:right-[max(2.5rem,calc((100vw-1200px)/2+2.5rem))]"
        // pause while a control has keyboard focus
        onFocus={() => setPaused(true)}
        // resume when focus leaves
        onBlur={() => setPaused(false)}
      >
        {/* current slide number inside a ring */}
        <span aria-live="polite" className="grid h-11 w-11 place-items-center rounded-full border-[3px] border-white/70 font-display text-lg font-bold text-white">
          {/* screen-reader text */}
          <span className="sr-only">Slide </span>
          {/* number */}
          {index + 1}
          {/* screen-reader text */}
          <span className="sr-only"> of {total}</span>
        </span>
        {/* previous slide */}
        <button aria-label="Previous slide" onClick={() => go(-1)} className="grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-black text-white transition hover:bg-brown-dark">
          {/* left arrow */}
          <ChevronLeft className="h-5 w-5" />
        </button>
        {/* next slide */}
        <button aria-label="Next slide" onClick={() => go(1)} className="grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-black text-white transition hover:bg-brown-dark">
          {/* right arrow */}
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* thin progress bar showing time until the next slide */}
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
        {/* bar restarts with the timer on every slide change, pause and resume */}
        <div
          key={`${index}-${paused}`}
          className="h-full origin-left bg-cream/70"
          style={{ animation: `grow ${SLIDE_MS}ms linear forwards`, animationPlayState: paused ? 'paused' : 'running' }}
        />
      </div>
    </section>
  )
}
