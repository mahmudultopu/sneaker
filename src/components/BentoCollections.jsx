// image path helper
import { img } from '../data'
// shared section heading
import { SectionHeading } from './ProductSection'
// diagonal arrow
import { ArrowUpRight } from './Icons'
// shop actions
import { useStore } from '../store'

// one photo tile in the grid
function Tile({ image, alt, className = '', overlay = 'bg-black/20', children }) {
  return (
    // rounded tile that zooms its photo on hover
    <article className={`group relative overflow-hidden rounded-[18px] ${className}`}>
      {/* background photo */}
      <img src={img(image)} alt={alt} loading="lazy" className="img-zoom absolute inset-0 h-full w-full object-cover" />
      {/* darkening layer for readable text */}
      <div className={`absolute inset-0 ${overlay}`} />
      {/* tile content */}
      {children}
    </article>
  )
}

// shared white button style
const whiteBtn = 'btn h-[50px] bg-white px-8 text-brown-dark hover:bg-cream'

// grid of large collection tiles
export default function BentoCollections() {
  // filter + scroll helper
  const { shopCategory } = useStore()

  return (
    // id lets the "Accessories" link jump here
    <section id="collections" className="container-x reveal pt-[72px] lg:pt-[120px]">
      {/* title and subtitle */}
      <SectionHeading
        title="Most Recommended For You"
        subtitle="Hand-picked pairs our customers keep coming back to, from street-ready classics to everyday runners."
      />
      {/* 1 column on phones, 2 on larger screens */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* tall tile on the left, spans two rows */}
        <Tile
          image="bento-1"
          alt="Pair of red and black high-tops resting on a court"
          className="h-[420px] md:row-span-2 md:h-[600px]"
          overlay="bg-gradient-to-t from-black/55 to-transparent"
        >
          {/* bottom text and button */}
          <div className="absolute bottom-7 left-7">
            {/* tile title */}
            <h3 className="font-display mb-4 text-[40px] font-semibold leading-none text-white">Men</h3>
            {/* filters to men's shoes */}
            <button onClick={() => shopCategory('men')} className={whiteBtn}>View all sneakers</button>
          </div>
        </Tile>

        {/* top-right tile */}
        <Tile image="bento-2" alt="White and tan leather sneakers on an orange backdrop" className="h-[290px]">
          {/* top-left text and button */}
          <div className="absolute left-7 top-6">
            {/* tile title */}
            <h3 className="font-display text-[44px] font-semibold leading-none text-white">Women</h3>
            {/* filters to women's shoes */}
            <button onClick={() => shopCategory('women')} className={`${whiteBtn} mt-4`}>View all sneakers</button>
          </div>
        </Tile>

        {/* middle-right tile */}
        <Tile image="bento-3" alt="Black low-top sneaker on a white shelf" className="h-[290px]">
          {/* top-left text and button */}
          <div className="absolute left-7 top-6">
            {/* tile title */}
            <h3 className="font-display text-[44px] font-semibold leading-none text-white">Kids</h3>
            {/* filters to kids' shoes */}
            <button onClick={() => shopCategory('kids')} className={`${whiteBtn} mt-4`}>View all sneakers</button>
          </div>
        </Tile>

        {/* wide tile across the bottom */}
        <Tile
          image="bento-4"
          alt="Close-up of a cream leather sneaker"
          className="h-[420px] md:col-span-2"
          overlay="bg-gradient-to-t from-black/50 via-black/5 to-transparent"
        >
          {/* bottom-left text and button */}
          <div className="absolute bottom-8 left-8">
            {/* tile title */}
            <h3 className="font-display text-[40px] font-normal leading-none text-white sm:text-[44px]">Trending Now</h3>
            {/* jumps to the summer collection */}
            <a href="#summer" className="btn mt-5 h-[50px] w-[210px] justify-between bg-white px-8 text-brown-dark hover:bg-cream">
              {/* label */}
              Explore Shop
              {/* arrow */}
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>
        </Tile>
      </div>
    </section>
  )
}
