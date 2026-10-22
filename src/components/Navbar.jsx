import { useEffect, useState } from 'react'
import { LogoMark, SearchIcon, UserIcon, HeartIcon, CartIcon, MenuIcon, CloseIcon } from './Icons'

const links = ['Women', 'Men', 'Kids', 'Accessories', 'Collection', 'Brands']

export function Logo({ name = 'Conwerse' }) {
  return (
    <a href="#" className="flex items-center gap-2 text-white">
      <LogoMark className="h-8 w-8" />
      <span className="font-display text-2xl font-bold">{name}</span>
    </a>
  )
}

export default function Navbar({ cartCount }) {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'bg-brown-footer/80 shadow-lg backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex h-[72px] items-center justify-between text-white">
        <Logo />

        <ul className="hidden items-center gap-8 text-sm md:flex">
          {links.map((l) => (
            <li key={l}>
              <a href="#" className="opacity-90 transition hover:opacity-100 hover:underline underline-offset-4">
                {l}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 sm:gap-6">
          <button aria-label="Search" className="hidden sm:block"><SearchIcon className="h-5 w-5" /></button>
          <button aria-label="Account" className="hidden sm:block"><UserIcon className="h-5 w-5" /></button>
          <button aria-label="Wishlist" className="hidden sm:block"><HeartIcon className="h-5 w-5" /></button>
          <button aria-label={`Cart, ${cartCount} items`} className="relative">
            <CartIcon className="h-6 w-6" />
            <span
              key={cartCount}
              className="absolute -right-2 -top-2 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-white px-1 text-[10px] font-bold text-brown-dark animate-[pop_.3s_ease]"
            >
              {cartCount}
            </span>
          </button>
          <button aria-label="Open menu" className="md:hidden" onClick={() => setOpen(true)}>
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* mobile slide-in menu */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-72 flex-col gap-8 bg-brown-footer p-6 text-cream transition-transform duration-300 md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between">
          <Logo />
          <button aria-label="Close menu" onClick={() => setOpen(false)}>
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        <ul className="flex flex-col gap-5 font-display text-2xl">
          {links.map((l) => (
            <li key={l}>
              <a href="#" onClick={() => setOpen(false)}>{l}</a>
            </li>
          ))}
        </ul>
      </aside>
    </header>
  )
}
