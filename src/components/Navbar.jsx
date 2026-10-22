// React helpers
import { useEffect, useState } from 'react'
// shared shop state
import { useStore } from '../store'
// icons used in the bar
import { LogoMark, SearchIcon, UserIcon, HeartIcon, CartIcon, MenuIcon } from './Icons'
// pop-up shell reused for the mobile menu
import Overlay from './Overlay'

// main menu: category links filter the grid, the rest jump to a section
const links = [
  // filters to women's shoes
  { label: 'Women', filter: 'women' },
  // filters to men's shoes
  { label: 'Men', filter: 'men' },
  // filters to kids' shoes
  { label: 'Kids', filter: 'kids' },
  // jumps to the recommended collections
  { label: 'Accessories', href: '#collections' },
  // jumps to the summer collection
  { label: 'Collection', href: '#summer' },
  // jumps to the featured cards
  { label: 'Brands', href: '#featured' },
]

// logo + wordmark, links back to the top of the page
export function Logo({ name = 'Conwerse', className = 'text-white' }) {
  return (
    // link to the top
    <a href="#top" className={`flex items-center gap-2 ${className}`} aria-label="Conwerse home">
      {/* ring icon */}
      <LogoMark className="h-8 w-8" />
      {/* store name */}
      <span className="font-display text-2xl font-bold">{name}</span>
    </a>
  )
}

// small number bubble on an icon
function Badge({ value }) {
  // hide when zero
  if (!value) return null
  // white circle with the number; key restarts the pop animation on change
  return (
    <span key={value} className="absolute -right-2 -top-2 grid h-[18px] min-w-[18px] animate-[pop_.3s_ease] place-items-center rounded-full bg-white px-1 text-[10px] font-bold text-brown-dark">
      {/* the number */}
      {value}
    </span>
  )
}

// fixed navigation bar
export default function Navbar() {
  // shop state and actions
  const { count, wishlist, setDrawer, setModal, shopCategory } = useStore()
  // true once the visitor scrolls past the hero
  const [solid, setSolid] = useState(false)
  // mobile menu open or closed
  const [open, setOpen] = useState(false)

  // watch the scroll position
  useEffect(() => {
    // switch to a solid bar after 80% of the screen height
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.8)
    // check once on load
    onScroll()
    // listen while scrolling
    window.addEventListener('scroll', onScroll, { passive: true })
    // stop listening when removed
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // what happens when a menu link is clicked
  const onLink = (e, link) => {
    // close the mobile menu
    setOpen(false)
    // section links just follow their href
    if (!link.filter) return
    // category links: stop the default jump
    e.preventDefault()
    // apply the filter and scroll to the grid
    shopCategory(link.filter)
  }

  return (
    <>
    {/* bar stays at the top; turns dark and blurred after the hero */}
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid ? 'bg-brown-footer/85 shadow-lg backdrop-blur-md' : 'bg-transparent'}`}>
      {/* content row */}
      <nav aria-label="Main" className="container-x flex h-[72px] items-center justify-between text-white">
        {/* logo on the left */}
        <Logo />

        {/* menu links in the middle (hidden on phones) */}
        <ul className="hidden items-center gap-8 text-sm md:flex">
          {/* one item per link */}
          {links.map((l) => (
            <li key={l.label}>
              {/* link with an underline on hover */}
              <a href={l.href ?? '#shop'} onClick={(e) => onLink(e, l)} className="opacity-90 underline-offset-4 transition hover:opacity-100 hover:underline">
                {/* link text */}
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* icon buttons on the right */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* opens the search pop-up */}
          <button aria-label="Search products" onClick={() => setModal('search')} className="cursor-pointer transition hover:opacity-75">
            {/* magnifier */}
            <SearchIcon className="h-5 w-5" />
          </button>
          {/* opens order history */}
          <button aria-label="My orders" onClick={() => setModal('account')} className="hidden cursor-pointer transition hover:opacity-75 sm:block">
            {/* person */}
            <UserIcon className="h-5 w-5" />
          </button>
          {/* opens the wishlist drawer */}
          <button aria-label={`Wishlist, ${wishlist.length} items`} onClick={() => setDrawer('wishlist')} className="relative cursor-pointer transition hover:opacity-75">
            {/* heart */}
            <HeartIcon className="h-5 w-5" />
            {/* saved count */}
            <Badge value={wishlist.length} />
          </button>
          {/* opens the bag drawer */}
          <button aria-label={`Bag, ${count} items`} onClick={() => setDrawer('bag')} className="relative cursor-pointer transition hover:opacity-75">
            {/* cart */}
            <CartIcon className="h-6 w-6" />
            {/* pair count */}
            <Badge value={count} />
          </button>
          {/* opens the mobile menu (phones only) */}
          <button aria-label="Open menu" onClick={() => setOpen(true)} className="cursor-pointer md:hidden">
            {/* three bars */}
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </nav>
    </header>

      {/* mobile menu drawer, kept outside the header so the header's blur cannot trap it */}
      <Overlay open={open} onClose={() => setOpen(false)} label="Menu" variant="drawer">
        {/* menu content */}
        <div className="flex h-full flex-col gap-10 p-6 pt-16">
          {/* large serif links */}
          <ul className="flex flex-col gap-6 font-display text-3xl font-semibold text-brown-dark">
            {/* one per link */}
            {links.map((l) => (
              <li key={l.label}>
                {/* same behavior as the desktop links */}
                <a href={l.href ?? '#shop'} onClick={(e) => onLink(e, l)}>{l.label}</a>
              </li>
            ))}
          </ul>
          {/* order history link at the bottom */}
          <button onClick={() => { setOpen(false); setModal('account') }} className="btn mt-auto h-12 bg-beige text-brown-dark">
            {/* label */}
            My orders
          </button>
        </div>
      </Overlay>
    </>
  )
}
