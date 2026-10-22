// React helper
import { useEffect, useState } from 'react'
// page sections
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PromoCards from './components/PromoCards'
import ProductSection from './components/ProductSection'
import BentoCollections from './components/BentoCollections'
import CTABanner from './components/CTABanner'
import Footer from './components/Footer'
// panels and pop-ups
import CartDrawer from './components/CartDrawer'
import Toasts from './components/Toasts'
import { SearchModal, CheckoutModal, AccountModal, InfoModal } from './components/Modals'
// product lists
import { newlyDropped, summer } from './data'

// fades sections in as they scroll into view
function useReveal() {
  // run once after the page renders
  useEffect(() => {
    // watcher that fires when an element becomes visible
    const io = new IntersectionObserver(
      // for each element that changed visibility
      (entries) => entries.forEach((e) => {
        // only act when it enters the screen
        if (!e.isIntersecting) return
        // trigger the CSS fade-in
        e.target.classList.add('is-visible')
        // no need to watch it any more
        io.unobserve(e.target)
      }),
      // fire when 10% of the element is visible
      { threshold: 0.1 },
    )
    // watch every section marked with .reveal
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    // stop watching when the page unmounts
    return () => io.disconnect()
  }, [])
}

// the whole landing page
export default function App() {
  // turn on scroll animations
  useReveal()
  // summer grid shows 3 products until "See More" is pressed
  const [showAllSummer, setShowAllSummer] = useState(false)

  return (
    <>
      {/* hidden link that lets keyboard users skip straight to products */}
      <a href="#shop" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">Skip to products</a>
      {/* top navigation */}
      <Navbar />
      {/* main page content */}
      <main>
        {/* big banner carousel */}
        <Hero />
        {/* three featured cards and store promises */}
        <PromoCards />
        {/* first product grid, with category filters */}
        <ProductSection
          id="shop"
          title="Newly Dropped Collections"
          subtitle="From fresh drops to timeless classics, we bring you authentic kicks built for style and comfort."
          products={newlyDropped}
          filterable
        />
        {/* big photo tiles */}
        <BentoCollections />
        {/* second product grid */}
        <ProductSection
          id="summer"
          title="Summer Collections"
          subtitle="Light, bright and breathable pairs made for long sunny days and warm city nights."
          products={showAllSummer ? summer : summer.slice(0, 3)}
        >
          {/* shows the remaining summer products */}
          {!showAllSummer && (
            <div className="mt-16 flex justify-center">
              {/* reveal button */}
              <button
                onClick={() => setShowAllSummer(true)}
                className="btn h-[52px] w-[230px] rounded-xl border-[1.5px] border-[#cbb89f] bg-beige text-brown-dark hover:bg-[#ddd0c1]"
              >
                See More Collections
              </button>
            </div>
          )}
        </ProductSection>
        {/* closing banner */}
        <CTABanner />
      </main>
      {/* footer */}
      <Footer />
      {/* bag and wishlist drawer */}
      <CartDrawer />
      {/* pop-ups */}
      <SearchModal />
      <CheckoutModal />
      <AccountModal />
      <InfoModal />
      {/* notifications */}
      <Toasts />
    </>
  )
}
