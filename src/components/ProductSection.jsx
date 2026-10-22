// React helper
import { useState } from 'react'
// image path helper, category tag text and filter tabs
import { img, categoryTag, categories } from '../data'
// shop state, sizes and price formatter
import { useStore, SIZES, money } from '../store'
// heart icon
import { HeartIcon } from './Icons'

// centered title + subtitle used by every section
export function SectionHeading({ title, subtitle }) {
  return (
    // centered block
    <div className="mx-auto mb-12 max-w-[760px] text-center">
      {/* big serif title */}
      <h2 className="font-display text-[36px] font-extrabold leading-tight text-brown-dark sm:text-[56px]">{title}</h2>
      {/* short description */}
      <p className="mx-auto mt-3 max-w-[480px] text-[15px] leading-relaxed text-muted">{subtitle}</p>
    </div>
  )
}

// one product: photo, price, name, size picker and buttons
export function ProductCard({ product }) {
  // shop actions and wishlist
  const { addToCart, toggleWishlist, wishlist, setModal } = useStore()
  // chosen size, defaults to EU 42
  const [size, setSize] = useState(42)
  // is this product saved?
  const saved = wishlist.includes(product.id)

  return (
    // card column; group lets the photo zoom on hover
    <article className="group flex flex-col">
      {/* square photo tile */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-b from-card to-[#fafafa]">
        {/* product photo; studio shots blend their white background into the gray tile */}
        <img
          src={img(product.image)}
          alt={product.name}
          loading="lazy"
          width="900"
          height="900"
          className={`img-zoom h-full w-full object-cover ${product.studio ? 'mix-blend-multiply' : ''}`}
        />
        {/* wishlist toggle in the corner */}
        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={saved}
          className={`absolute right-3 top-3 grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-110 ${saved ? 'text-[#b4442f]' : 'text-brown-dark'}`}
        >
          {/* filled heart when saved */}
          <HeartIcon filled={saved} className="h-5 w-5" />
        </button>
      </div>

      {/* price and category tag */}
      <div className="mt-6 flex items-center justify-between">
        {/* price */}
        <span className="text-[30px] font-bold tracking-tight">{money(product.price)}</span>
        {/* category pill */}
        <span className="rounded-full bg-beige px-3 py-1 text-[11px] font-medium">{categoryTag[product.category]}</span>
      </div>
      {/* product name */}
      <h3 className="mt-4 text-xl font-medium">{product.name}</h3>
      {/* two-line description */}
      <p className="mt-2 line-clamp-2 min-h-[2.6em] text-[13px] leading-[1.3] text-brown-dark/85">{product.desc}</p>

      {/* size picker */}
      <label className="mt-4 flex items-center gap-3 text-[13px] text-muted">
        {/* label text */}
        Size (EU)
        {/* dropdown of sizes */}
        <select
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="cursor-pointer rounded-lg border border-[#ddd3c7] bg-white px-2 py-1.5 text-[13px] font-medium text-brown-dark focus:border-brown-btn focus:outline-none"
        >
          {/* one option per size */}
          {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </label>

      {/* action buttons */}
      <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-6">
        {/* adds to the bag */}
        <button onClick={() => addToCart(product.id, size)} className="btn h-12 bg-beige text-brown-dark hover:bg-[#ddd0c1]">
          Add to Cart
        </button>
        {/* adds to the bag and opens checkout */}
        <button onClick={() => { addToCart(product.id, size); setModal('checkout') }} className="btn h-12 bg-brown-btn text-white hover:bg-[#654528]">
          Buy Now
        </button>
      </div>
    </article>
  )
}

// filter buttons above a grid
function FilterTabs() {
  // current filter
  const { category, setCategory } = useStore()

  return (
    // row of pills, centered
    <div role="tablist" aria-label="Filter by category" className="mb-12 flex flex-wrap justify-center gap-2">
      {/* one pill per category */}
      {categories.map((c) => (
        <button
          key={c.id}
          role="tab"
          aria-selected={category === c.id}
          onClick={() => setCategory(c.id)}
          // dark when active, light otherwise
          className={`h-10 cursor-pointer rounded-full px-5 text-sm font-medium transition ${category === c.id ? 'bg-brown-dark text-white' : 'bg-beige text-brown-dark hover:bg-[#ddd0c1]'}`}
        >
          {/* category name */}
          {c.label}
        </button>
      ))}
    </div>
  )
}

// a titled grid of product cards
export default function ProductSection({ id, title, subtitle, products, filterable = false, children }) {
  // active filter (only used when filterable)
  const { category, setCategory } = useStore()
  // products after filtering
  const shown = filterable && category !== 'all' ? products.filter((p) => p.category === category) : products

  return (
    // section with top/bottom spacing
    <section id={id} className="container-x reveal py-[72px] lg:py-[120px]">
      {/* title and subtitle */}
      <SectionHeading title={title} subtitle={subtitle} />
      {/* category pills */}
      {filterable && <FilterTabs />}
      {/* 1 column on phones, 2 on tablets, 3 on desktop */}
      <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {/* one card per product */}
        {shown.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
      {/* message when a filter matches nothing */}
      {shown.length === 0 && (
        <p className="py-10 text-center text-muted">
          {/* explanation */}
          No pairs in this category yet.{' '}
          {/* resets the filter */}
          <button onClick={() => setCategory('all')} className="cursor-pointer font-semibold text-brown-btn underline">Show all</button>
        </p>
      )}
      {/* optional extra content, like a "see more" button */}
      {children}
    </section>
  )
}
