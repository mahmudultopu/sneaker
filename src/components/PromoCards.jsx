// image path helper
import { img } from '../data'
// trust badge icons
import { ShieldIcon, TruckIcon, ReturnIcon } from './Icons'
// shared shipping rule
import { FREE_SHIPPING_FROM } from '../data'

// one tall photo card
function Card({ image, alt, className = '', children }) {
  return (
    // rounded card that zooms its photo on hover
    <article className={`group relative h-[470px] overflow-hidden rounded-[18px] ${className}`}>
      {/* background photo */}
      <img src={img(image)} alt={alt} loading="lazy" className="img-zoom absolute inset-0 h-full w-full object-cover" />
      {/* card content */}
      {children}
    </article>
  )
}

// small pill at the top of a card
const Eyebrow = ({ children }) => (
  // frosted pill centered at the top
  <span className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full bg-white/85 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-brown-dark backdrop-blur">
    {/* label text */}
    {children}
  </span>
)

// promises shown under the cards
const perks = [
  // shipping promise
  { icon: TruckIcon, title: 'Free shipping', text: `On every order over $${FREE_SHIPPING_FROM}` },
  // authenticity promise
  { icon: ShieldIcon, title: '100% authentic', text: 'Every pair checked by hand' },
  // returns promise
  { icon: ReturnIcon, title: '30-day returns', text: 'Free size exchanges' },
]

// three featured cards plus a row of store promises
export default function PromoCards() {
  return (
    // section id lets the "Brands" menu link jump here
    <section id="featured" className="container-x reveal pt-10">
      {/* 1 column on phones, 2 on tablets, 3 on desktop */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {/* card 1: comfort */}
        <Card image="promo-1" alt="Colorful runners worn on a city street">
          {/* dark fade at the bottom so white text is readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          {/* top label */}
          <Eyebrow>Everyday comfort</Eyebrow>
          {/* text and button at the bottom */}
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            {/* card headline */}
            <p className="text-[24px] font-semibold leading-snug text-white sm:text-[26px]">
              Sneakers That Move With You, Comfortable, Durable, And Always In Style.
            </p>
            {/* jumps to the product grid */}
            <a href="#shop" className="btn mt-8 h-[50px] bg-brown-dark px-6 text-white hover:bg-black">Find Your Fit</a>
          </div>
        </Card>

        {/* card 2: new drops */}
        <Card image="promo-2" alt="Pink and grey suede runner on a dark background">
          {/* dark fade at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          {/* top label */}
          <Eyebrow>Just dropped</Eyebrow>
          {/* text and button at the bottom */}
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            {/* card headline */}
            <p className="text-[24px] font-semibold leading-snug text-white sm:text-[26px]">
              Fresh Drops. Iconic Silhouettes. Sneakers That Speak Before You Do.
            </p>
            {/* jumps to the summer collection */}
            <a href="#summer" className="btn mt-8 h-[50px] bg-brown-dark px-6 text-white hover:bg-black">Get Your Pair</a>
          </div>
        </Card>

        {/* card 3: style stack, spans both columns on tablets */}
        <Card image="promo-3" alt="High-top sneaker hanging by its laces" className="md:col-span-2 lg:col-span-1">
          {/* even darkening over the whole photo */}
          <div className="absolute inset-0 bg-black/30" />
          {/* centered title and button */}
          <div className="absolute inset-x-0 top-[30%] flex flex-col items-center gap-5 text-center">
            {/* big serif title */}
            <h3 className="font-display text-[44px] font-extrabold uppercase text-cream">Style-Stack</h3>
            {/* jumps to the product grid */}
            <a href="#shop" className="btn h-[50px] bg-white px-6 text-brown-dark hover:bg-cream">Shop Sneakers</a>
          </div>
        </Card>
      </div>

      {/* promises row */}
      <ul className="mt-10 grid gap-4 rounded-2xl border border-[#eee6dc] bg-[#faf7f3] p-6 sm:grid-cols-3">
        {/* one item per promise */}
        {perks.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-center gap-4">
            {/* round icon badge */}
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-beige text-brown-btn">
              {/* icon */}
              <Icon className="h-5 w-5" />
            </span>
            {/* text block */}
            <span>
              {/* promise title */}
              <span className="block text-[15px] font-semibold">{title}</span>
              {/* promise detail */}
              <span className="block text-[13px] text-muted">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
