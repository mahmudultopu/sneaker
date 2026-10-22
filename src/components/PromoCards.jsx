import { img } from '../data'
import { SwooshMark } from './Icons'

function Card({ image, alt, className = '', children }) {
  return (
    <article className={`group relative h-[470px] overflow-hidden rounded-[18px] ${className}`}>
      <img src={img(image, 900)} alt={alt} loading="lazy" className="img-zoom absolute inset-0 h-full w-full object-cover" />
      {children}
    </article>
  )
}

export default function PromoCards() {
  return (
    <section className="container-x reveal grid gap-5 pt-10 md:grid-cols-2 lg:grid-cols-3">
      <Card image="1460353581641-37baddab0fa2" alt="White sneakers worn on the street">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <span className="absolute left-1/2 top-5 -translate-x-1/2 font-display text-xl font-extrabold italic tracking-wider text-black">
          PUMA
        </span>
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <p className="text-[24px] font-semibold leading-snug text-white sm:text-[26px]">
            Sneakers That Move With You, Comfortable, Durable, And Always In Style.
          </p>
          <a href="#" className="btn mt-8 h-[50px] bg-brown-dark px-6 text-white hover:bg-black">Find Your Fit</a>
        </div>
      </Card>

      <Card image="1551107696-a4b0c5a0d9a2" alt="Pink suede sneaker">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <SwooshMark className="absolute left-1/2 top-6 h-5 -translate-x-1/2 text-black" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <p className="text-[24px] font-semibold leading-snug text-white sm:text-[26px]">
            Fresh Drops. Iconic Silhouettes. Sneakers That Speak Before You Do.
          </p>
          <a href="#" className="btn mt-8 h-[50px] bg-brown-dark px-6 text-white hover:bg-black">Get Your Pair</a>
        </div>
      </Card>

      <Card image="1597045566677-8cf032ed6634" alt="High-top sneaker hanging by its laces" className="md:col-span-2 lg:col-span-1">
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-x-0 top-[28%] flex flex-col items-center gap-5 text-center">
          <h3 className="font-display text-[44px] font-extrabold uppercase text-cream">Style-Stack</h3>
          <a href="#" className="btn h-[50px] bg-white px-6 text-brown-dark hover:bg-cream">Shop Sneakers</a>
        </div>
      </Card>
    </section>
  )
}
