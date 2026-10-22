import { useState } from 'react'
import { footerLinks } from '../data'
import { LogoMark, MailIcon } from './Icons'
import { Logo } from './Navbar'

const socials = ['Twitter', 'Facebook', 'Instagram', 'Linkedin']

export default function Footer() {
  const [sent, setSent] = useState(false)

  return (
    <footer className="relative overflow-hidden bg-brown-footer text-cream">
      <LogoMark className="pointer-events-none absolute -bottom-40 -right-24 h-[520px] w-[520px] text-[#4a3f33] opacity-80" />

      <div className="container-x relative grid gap-14 py-16 lg:grid-cols-[40%_1fr] lg:gap-20">
        <div>
          <Logo name="ConWerse" />
          <p className="mt-6 max-w-[340px] text-sm leading-[1.8] text-cream/90">
            We specialize in buying and selling high-quality, authentic sneakers, with every pair reflecting our unique
            style and culture.
          </p>

          <h4 className="font-display mt-12 text-base font-semibold">Subscribe to Newsletter</h4>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
            className="mt-4 flex max-w-[340px] items-center gap-2 rounded-xl bg-brown-soft p-1.5 pl-4"
          >
            <MailIcon className="h-5 w-5 shrink-0" />
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              type="email"
              required
              placeholder={sent ? 'Thanks for subscribing!' : 'Enter your email address'}
              className="min-w-0 flex-1 bg-transparent text-[13px] text-cream placeholder:text-cream/80 focus:outline-none"
            />
            <button className="btn h-10 rounded-lg bg-beige px-6 text-[13px] font-medium text-brown-dark hover:bg-white">
              Subscribe
            </button>
          </form>

          <p className="mt-20 text-xs text-cream/90">© 2026 Copyright by Conwerse. All Right Reserved</p>
        </div>

        <div className="flex flex-col justify-between gap-14">
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {Object.entries(footerLinks).map(([heading, items]) => (
              <div key={heading}>
                <h4 className="font-display text-xl font-semibold">{heading}</h4>
                <ul className="mt-6 space-y-4 text-[13px]">
                  {items.map((i) => (
                    <li key={i}>
                      <a href="#" className="text-cream/90 transition hover:text-white">{i}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {socials.map((s) => (
              <a key={s} href="#" className="font-display rounded-full bg-brown-soft px-3.5 py-1.5 text-[15px] transition hover:bg-brown-btn">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
