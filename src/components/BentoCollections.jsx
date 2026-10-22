import { img } from '../data'
import { SectionHeading } from './ProductSection'
import { ArrowUpRight } from './Icons'

function Tile({ image, alt, className = '', overlay = 'bg-black/20', children }) {
  return (
    <article className={`group relative overflow-hidden rounded-[18px] ${className}`}>
      <img src={img(image, 1400)} alt={alt} loading="lazy" className="img-zoom absolute inset-0 h-full w-full object-cover" />
      <div className={`absolute inset-0 ${overlay}`} />
      {children}
    </article>
  )
}

const whiteBtn = 'btn h-[50px] bg-white px-10 text-brown-dark hover:bg-cream'

export default function BentoCollections() {
  return (
    <section className="container-x reveal pt-[72px] lg:pt-[120px]">
      <SectionHeading title="Most Recommend Collections For You" />
      <div className="grid gap-5 md:grid-cols-2">
        <Tile
          image="1552346154-21d32810aba3"
          alt="Pair of high-top sneakers resting on a court"
          className="h-[420px] md:row-span-2 md:h-[600px]"
          overlay="bg-gradient-to-t from-black/50 to-transparent"
        >
          <a href="#" className={`${whiteBtn} absolute bottom-7 left-7`}>View all sneakers</a>
        </Tile>

        <Tile image="1603808033192-082d6919d3e1" alt="White and tan leather sneakers" className="h-[290px]">
          <div className="absolute left-7 top-6">
            <h3 className="font-display text-[44px] font-semibold leading-none text-white">Sneakers</h3>
            <a href="#" className={`${whiteBtn} mt-4`}>View all sneakers</a>
          </div>
        </Tile>

        <Tile image="1543508282-6319a3e2621f" alt="Black low-top sneaker on a white shelf" className="h-[290px]">
          <div className="absolute left-7 top-6">
            <h3 className="font-display text-[44px] font-semibold leading-none text-white">Sneakers</h3>
            <a href="#" className={`${whiteBtn} mt-4`}>View all sneakers</a>
          </div>
        </Tile>

        <Tile
          image="1622760807800-66cf1466fc08"
          alt="Close-up of a cream leather sneaker"
          className="h-[420px] md:col-span-2"
          overlay="bg-gradient-to-t from-black/45 via-black/5 to-transparent"
        >
          <div className="absolute bottom-8 left-8">
            <h3 className="font-display text-[40px] font-normal leading-none text-white sm:text-[44px]">Trending Now</h3>
            <a href="#" className="btn mt-5 h-[50px] w-[200px] justify-between bg-white px-10 text-brown-dark hover:bg-cream">
              Explore Shop <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>
        </Tile>
      </div>
    </section>
  )
}
