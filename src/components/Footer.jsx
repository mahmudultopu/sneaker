// React helper
import { useState } from 'react'
// footer link data
import { footerLinks } from '../data'
// shop actions
import { useStore } from '../store'
// safe storage
import { load, save } from '../storage'
// icons
import { LogoMark, MailIcon } from './Icons'
// shared logo
import { Logo } from './Navbar'

// social profiles; external links open in a new tab safely
const socials = [
  // Twitter / X profile
  { label: 'Twitter', href: 'https://x.com' },
  // Facebook page
  { label: 'Facebook', href: 'https://facebook.com' },
  // Instagram profile
  { label: 'Instagram', href: 'https://instagram.com' },
  // LinkedIn page
  { label: 'Linkedin', href: 'https://linkedin.com' },
]

// strict but simple email pattern: text@text.domain, no spaces
const EMAIL = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i

// dark footer with newsletter, links and socials
export default function Footer() {
  // shop actions used by footer links
  const { shopCategory, openInfo, setModal } = useStore()
  // current text in the email box
  const [email, setEmail] = useState('')
  // 'idle', 'error' or 'done'
  const [status, setStatus] = useState(() => (load('subscribed', false) ? 'done' : 'idle'))

  // newsletter submit
  const onSubscribe = (e) => {
    // stay on the page
    e.preventDefault()
    // tidy the input
    const value = email.trim().toLowerCase()
    // reject invalid addresses
    if (value.length > 254 || !EMAIL.test(value)) return setStatus('error')
    // remember the subscription on this device only
    save('subscribed', true)
    // clear the box
    setEmail('')
    // show the thank-you message
    setStatus('done')
  }

  // what a footer link does when clicked
  const onLink = (e, link) => {
    // plain section links just follow their href
    if (link.href) return
    // everything else is handled here
    e.preventDefault()
    // category links filter the grid
    if (link.filter) shopCategory(link.filter)
    // info links open a page
    else if (link.page) openInfo(link.page)
    // "Track Order" opens order history
    else if (link.account) setModal('account')
  }

  return (
    // dark brown footer; clips the big background logo
    <footer className="relative overflow-hidden bg-brown-footer text-cream">
      {/* huge faded logo in the bottom-right corner */}
      <LogoMark className="pointer-events-none absolute -bottom-40 -right-24 h-[520px] w-[520px] text-[#4a3f33] opacity-70" />

      {/* two columns on desktop: brand on the left, links on the right */}
      <div className="container-x relative grid gap-14 py-16 lg:grid-cols-[40%_1fr] lg:gap-20">
        {/* brand column */}
        <div>
          {/* logo */}
          <Logo name="ConWerse" className="text-cream" />
          {/* short about text */}
          <p className="mt-6 max-w-[340px] text-sm leading-[1.8] text-cream/85">
            We specialize in buying and selling high-quality, authentic sneakers, with every pair reflecting our unique style and culture.
          </p>

          {/* newsletter heading */}
          <h4 className="font-display mt-12 text-base font-semibold">Subscribe to Newsletter</h4>
          {/* after subscribing show a thank-you, otherwise the form */}
          {status === 'done' ? (
            // thank-you message
            <p className="mt-4 max-w-[340px] rounded-xl bg-brown-soft px-4 py-4 text-sm">Thanks for subscribing. New drops will land in your inbox first.</p>
          ) : (
            // email form
            <form onSubmit={onSubscribe} noValidate className="mt-4 max-w-[340px]">
              {/* input group */}
              <div className={`flex items-center gap-2 rounded-xl bg-brown-soft p-1.5 pl-4 ring-1 ${status === 'error' ? 'ring-[#d9785f]' : 'ring-transparent'}`}>
                {/* envelope icon */}
                <MailIcon className="h-5 w-5 shrink-0" />
                {/* hidden label for screen readers */}
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                {/* email box */}
                <input
                  id="newsletter-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  maxLength={254}
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setStatus('idle') }}
                  placeholder="Enter your email address"
                  aria-invalid={status === 'error'}
                  aria-describedby="newsletter-error"
                  className="min-w-0 flex-1 bg-transparent text-[13px] text-cream placeholder:text-cream/70 focus:outline-none"
                />
                {/* submit button */}
                <button className="btn h-10 rounded-lg bg-beige px-5 text-[13px] font-medium text-brown-dark hover:bg-white">Subscribe</button>
              </div>
              {/* error message, announced to screen readers */}
              <p id="newsletter-error" role="alert" className="mt-2 min-h-[1.25rem] text-xs text-[#e9a08c]">
                {status === 'error' && 'Please enter a valid email address.'}
              </p>
            </form>
          )}

          {/* copyright with the current year */}
          <p className="mt-14 text-xs text-cream/80">© {new Date().getFullYear()} Copyright by Conwerse. All Rights Reserved</p>
        </div>

        {/* links column */}
        <div className="flex flex-col justify-between gap-14">
          {/* 2 columns on phones, 3 on larger screens */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {/* one column per group */}
            {Object.entries(footerLinks).map(([heading, items]) => (
              <nav key={heading} aria-label={heading}>
                {/* group heading */}
                <h4 className="font-display text-xl font-semibold">{heading}</h4>
                {/* links */}
                <ul className="mt-6 space-y-4 text-[13px]">
                  {/* one per link */}
                  {items.map((i) => (
                    <li key={i.label}>
                      {/* link */}
                      <a href={i.href ?? '#'} onClick={(e) => onLink(e, i)} className="text-cream/85 transition hover:text-white">{i.label}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* social pills */}
          <div className="flex flex-wrap gap-2">
            {/* one per profile */}
            {socials.map((s) => (
              // new tab; noopener/noreferrer stop the other site from controlling this page
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="font-display rounded-full bg-brown-soft px-3.5 py-1.5 text-[15px] transition hover:bg-brown-btn">
                {/* network name */}
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
