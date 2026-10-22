import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PromoCards from './components/PromoCards'
import ProductSection from './components/ProductSection'
import BentoCollections from './components/BentoCollections'
import CTABanner from './components/CTABanner'
import Footer from './components/Footer'
import { newlyDropped, summer } from './data'

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.12 },
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function App() {
  const [cartCount, setCartCount] = useState(5)
  const addToCart = () => setCartCount((c) => c + 1)
  useReveal()

  return (
    <>
      <Navbar cartCount={cartCount} />
      <main>
        <Hero />
        <PromoCards />
        <ProductSection id="new" title="Newly Dropped Collections" products={newlyDropped} onAdd={addToCart} />
        <BentoCollections />
        <ProductSection id="summer" title="Summer Collections" products={summer} onAdd={addToCart}>
          <div className="mt-16 flex justify-center">
            <a
              href="#"
              className="btn h-[52px] w-[220px] rounded-xl border-[1.5px] border-[#cbb89f] bg-beige text-brown-dark hover:bg-[#ddd0c1]"
            >
              See More Collections
            </a>
          </div>
        </ProductSection>
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
