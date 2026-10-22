import { img } from '../data'

export function SectionHeading({ title }) {
  return (
    <div className="mx-auto mb-12 max-w-[760px] text-center">
      <h2 className="font-display text-[36px] font-extrabold leading-tight text-brown-dark sm:text-[56px]">{title}</h2>
      <p className="mx-auto mt-3 max-w-[460px] text-[15px] leading-relaxed text-muted">
        These sneakers drops to timeless classics, we bring you authentic kicks built for style and comfort and
      </p>
    </div>
  )
}

export function ProductCard({ product, onAdd }) {
  return (
    <article className="group flex flex-col">
      <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-b from-card to-[#fafafa]">
        <img
          src={img(product.id, 700)}
          alt={product.name}
          loading="lazy"
          className="img-zoom h-full w-full object-cover mix-blend-multiply"
        />
      </div>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-[30px] font-bold tracking-tight">${product.price.toFixed(2)}</span>
        <span className="rounded-full bg-beige px-3 py-1 text-[11px] font-medium">Men's Sneakers</span>
      </div>
      <h3 className="mt-4 text-xl font-medium">{product.name}</h3>
      <p className="mt-2 line-clamp-2 min-h-[2.6em] text-[13px] leading-[1.3] text-brown-dark">{product.desc}</p>
      <div className="mt-5 grid grid-cols-2 gap-6">
        <button onClick={onAdd} className="btn h-12 bg-beige text-brown-dark hover:bg-[#ddd0c1]">
          Add to Cart
        </button>
        <button className="btn h-12 bg-brown-btn text-white hover:bg-[#654528]">Buy Now</button>
      </div>
    </article>
  )
}

export default function ProductSection({ id, title, products, onAdd, children }) {
  return (
    <section id={id} className="container-x reveal py-[72px] lg:py-[120px]">
      <SectionHeading title={title} />
      <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <ProductCard key={`${p.id}-${i}`} product={p} onAdd={onAdd} />
        ))}
      </div>
      {children}
    </section>
  )
}
