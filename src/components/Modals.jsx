// React helpers
import { useMemo, useState } from 'react'
// shop state and helpers
import { useStore, money } from '../store'
// product data and info page text
import { img, products, infoPages, categoryTag } from '../data'
// icons
import { SearchIcon, CheckIcon } from './Icons'
// pop-up shell
import Overlay from './Overlay'

// ---------- Search ----------

// search pop-up that filters products as you type
export function SearchModal() {
  // open state and actions
  const { modal, setModal, addToCart } = useStore()
  // what the visitor typed
  const [query, setQuery] = useState('')
  // close and clear the box
  const close = () => { setModal(null); setQuery('') }

  // products whose name, category or description match every typed word
  const results = useMemo(() => {
    // lowercase words, ignoring extra spaces
    const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean)
    // nothing typed: show nothing
    if (!words.length) return []
    // keep products that contain every word
    return products.filter((p) => {
      // all searchable text for this product
      const text = `${p.name} ${p.category} ${categoryTag[p.category]} ${p.desc}`.toLowerCase()
      // every word must appear
      return words.every((w) => text.includes(w))
    })
  }, [query])

  return (
    // centered pop-up
    <Overlay open={modal === 'search'} onClose={close} label="Search products">
      {/* title */}
      <h2 className="font-display text-3xl font-bold">Search</h2>
      {/* search box with icon */}
      <div className="relative mt-5">
        {/* magnifier inside the box */}
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        {/* text box */}
        <input
          type="search"
          value={query}
          maxLength={60}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try 'runner', 'red' or 'kids'"
          aria-label="Search products"
          className="field pl-12"
        />
      </div>
      {/* results */}
      <ul className="mt-5 divide-y divide-[#eee6dc]">
        {/* one row per match */}
        {results.map((p) => (
          <li key={p.id} className="flex items-center gap-4 py-3">
            {/* photo */}
            <img src={img(p.image)} alt="" className={`h-16 w-16 rounded-lg bg-card object-cover ${p.studio ? 'mix-blend-multiply' : ''}`} />
            {/* name and price */}
            <div className="flex-1">
              {/* name */}
              <p className="font-medium">{p.name}</p>
              {/* price and category */}
              <p className="text-[13px] text-muted">{money(p.price)} · {categoryTag[p.category]}</p>
            </div>
            {/* quick add in the default size */}
            <button onClick={() => addToCart(p.id)} className="btn h-9 bg-beige px-4 text-[13px] text-brown-dark hover:bg-[#ddd0c1]">Add</button>
          </li>
        ))}
      </ul>
      {/* message when nothing matches */}
      {query.trim() && !results.length && <p className="mt-6 text-center text-sm text-muted">No sneakers match “{query.trim()}”.</p>}
    </Overlay>
  )
}

// ---------- Checkout ----------

// rules for each checkout field: returns an error message or ''
const rules = {
  // 2 to 60 letters, spaces, dots, apostrophes or hyphens
  name: (v) => (/^[\p{L} .'-]{2,60}$/u.test(v) ? '' : 'Enter your full name.'),
  // basic email shape
  email: (v) => (/^[^\s@<>]+@[^\s@<>]+\.[a-z]{2,}$/i.test(v) && v.length <= 254 ? '' : 'Enter a valid email address.'),
  // digits, spaces, +, -, brackets; 7 to 20 characters
  phone: (v) => (/^[+\d\s()-]{7,20}$/.test(v) ? '' : 'Enter a valid phone number.'),
  // at least 5 characters
  address: (v) => (v.length >= 5 && v.length <= 120 ? '' : 'Enter your street address.'),
  // at least 2 characters
  city: (v) => (v.length >= 2 && v.length <= 60 ? '' : 'Enter your city.'),
  // letters, digits, spaces or hyphens; 3 to 10 characters
  zip: (v) => (/^[a-z\d\s-]{3,10}$/i.test(v) ? '' : 'Enter a valid postal code.'),
}

// form fields in display order
const fields = [
  // full name
  { name: 'name', label: 'Full name', autoComplete: 'name', max: 60 },
  // email
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', max: 254 },
  // phone
  { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel', max: 20 },
  // street
  { name: 'address', label: 'Street address', autoComplete: 'street-address', max: 120, wide: true },
  // city
  { name: 'city', label: 'City', autoComplete: 'address-level2', max: 60 },
  // postal code
  { name: 'zip', label: 'Postal code', autoComplete: 'postal-code', max: 10 },
]

// empty form values
const blank = { name: '', email: '', phone: '', address: '', city: '', zip: '' }

// checkout pop-up: delivery form, then order confirmation
export function CheckoutModal() {
  // bag, totals and actions
  const { modal, setModal, lines, subtotal, shipping, total, placeOrder } = useStore()
  // what the visitor typed
  const [form, setForm] = useState(blank)
  // error message per field
  const [errors, setErrors] = useState({})
  // the placed order, once submitted
  const [order, setOrder] = useState(null)

  // close the pop-up and reset for next time
  const close = () => { setModal(null); setOrder(null); setErrors({}) }

  // update one field and clear its error
  const onChange = (e) => {
    // field name and new value
    const { name, value } = e.target
    // save the value
    setForm((f) => ({ ...f, [name]: value }))
    // clear the old error for this field
    setErrors((er) => ({ ...er, [name]: '' }))
  }

  // form submit
  const onSubmit = (e) => {
    // stay on the page
    e.preventDefault()
    // trim every value
    const clean = Object.fromEntries(Object.entries(form).map(([k, v]) => [k, v.trim()]))
    // check every field
    const found = Object.fromEntries(Object.keys(rules).map((k) => [k, rules[k](clean[k])]))
    // show the errors
    setErrors(found)
    // stop if any field is wrong
    if (Object.values(found).some(Boolean)) return
    // create the order and empty the bag
    setOrder(placeOrder(clean))
    // clear the form
    setForm(blank)
  }

  return (
    // centered pop-up
    <Overlay open={modal === 'checkout'} onClose={close} label="Checkout">
      {order ? (
        // ---- confirmation screen ----
        <div className="py-4 text-center">
          {/* big tick */}
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-beige text-brown-btn"><CheckIcon className="h-8 w-8" /></span>
          {/* thank you */}
          <h2 className="font-display mt-5 text-3xl font-bold">Thank you, {order.name}!</h2>
          {/* order number */}
          <p className="mt-3 text-muted">Your order <b className="text-brown-dark">{order.number}</b> has been placed.</p>
          {/* amount */}
          <p className="mt-1 text-muted">Total to pay on delivery: <b className="text-brown-dark">{money(order.total)}</b></p>
          {/* where to find it again */}
          <p className="mt-4 text-sm text-muted">You can track it any time from the account icon in the menu.</p>
          {/* close */}
          <button onClick={close} className="btn mt-6 h-12 bg-brown-btn px-8 text-white">Continue shopping</button>
        </div>
      ) : !lines.length ? (
        // ---- empty bag ----
        <div className="py-6 text-center">
          {/* title */}
          <h2 className="font-display text-3xl font-bold">Your bag is empty</h2>
          {/* hint */}
          <p className="mt-3 text-muted">Add a pair first, then come back to check out.</p>
          {/* close and jump to products */}
          <a href="#shop" onClick={close} className="btn mt-6 h-12 bg-brown-btn px-8 text-white">Shop sneakers</a>
        </div>
      ) : (
        // ---- delivery form ----
        <form onSubmit={onSubmit} noValidate>
          {/* title */}
          <h2 className="font-display text-3xl font-bold">Checkout</h2>
          {/* short order summary */}
          <ul className="mt-5 space-y-2 rounded-xl bg-[#faf7f3] p-4 text-sm">
            {/* one line per item */}
            {lines.map((l) => (
              <li key={`${l.id}-${l.size}`} className="flex justify-between gap-3">
                {/* name, size and quantity */}
                <span>{l.product.name} · EU {l.size} × {l.qty}</span>
                {/* line price */}
                <span className="font-medium">{money(l.total)}</span>
              </li>
            ))}
            {/* shipping line */}
            <li className="flex justify-between border-t border-[#eee6dc] pt-2 text-muted"><span>Shipping</span><span>{shipping ? money(shipping) : 'Free'}</span></li>
            {/* total line */}
            <li className="flex justify-between text-base font-bold"><span>Total</span><span>{money(total)}</span></li>
          </ul>

          {/* delivery fields, two columns on larger screens */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {/* one input per field */}
            {fields.map((f) => (
              <label key={f.name} className={f.wide ? 'sm:col-span-2' : ''}>
                {/* field label */}
                <span className="mb-1.5 block text-[13px] font-medium">{f.label}</span>
                {/* input */}
                <input
                  name={f.name}
                  type={f.type ?? 'text'}
                  autoComplete={f.autoComplete}
                  maxLength={f.max}
                  value={form[f.name]}
                  onChange={onChange}
                  aria-invalid={!!errors[f.name]}
                  className={`field ${errors[f.name] ? 'border-[#c4553b]' : ''}`}
                />
                {/* error message */}
                {errors[f.name] && <span role="alert" className="mt-1 block text-xs text-[#b4442f]">{errors[f.name]}</span>}
              </label>
            ))}
          </div>

          {/* payment method */}
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-[#eee6dc] p-4 text-sm">
            {/* selected radio look */}
            <span className="grid h-5 w-5 place-items-center rounded-full border-2 border-brown-btn"><span className="h-2.5 w-2.5 rounded-full bg-brown-btn" /></span>
            {/* method name */}
            <span><b>Cash on delivery</b><span className="block text-muted">Pay when your sneakers arrive. No card details needed.</span></span>
          </div>

          {/* submit */}
          <button className="btn mt-6 h-12 w-full bg-brown-btn text-white hover:bg-[#654528]">Place order · {money(subtotal + shipping)}</button>
        </form>
      )}
    </Overlay>
  )
}

// ---------- Account / orders ----------

// order history saved on this device
export function AccountModal() {
  // open state and orders
  const { modal, setModal, orders } = useStore()

  return (
    // centered pop-up
    <Overlay open={modal === 'account'} onClose={() => setModal(null)} label="My orders">
      {/* title */}
      <h2 className="font-display text-3xl font-bold">My Orders</h2>
      {/* list or empty message */}
      {orders.length ? (
        // list of orders, newest first
        <ul className="mt-5 space-y-4">
          {/* one card per order */}
          {orders.map((o) => (
            <li key={o.number} className="rounded-xl border border-[#eee6dc] p-4">
              {/* number and status */}
              <div className="flex items-center justify-between">
                {/* order number */}
                <span className="font-semibold">{o.number}</span>
                {/* status pill */}
                <span className="rounded-full bg-beige px-3 py-1 text-xs font-medium">{o.status}</span>
              </div>
              {/* date and total */}
              <p className="mt-1 text-[13px] text-muted">{new Date(o.date).toLocaleDateString(undefined, { dateStyle: 'medium' })} · {money(o.total)}</p>
              {/* items */}
              <ul className="mt-3 space-y-1 text-sm">
                {/* one line per item */}
                {o.items.map((i) => <li key={`${i.id}-${i.size}`}>{i.name} · EU {i.size} × {i.qty}</li>)}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        // empty message
        <p className="mt-4 text-muted">You have not placed any orders yet. Orders you place will appear here so you can track them.</p>
      )}
    </Overlay>
  )
}

// ---------- Info pages ----------

// policy and help pages opened from the footer
export function InfoModal() {
  // open state and which page
  const { modal, setModal, infoPage } = useStore()
  // page content, if the key is known
  const page = infoPages[infoPage]

  return (
    // centered pop-up
    <Overlay open={modal === 'info' && !!page} onClose={() => setModal(null)} label={page?.title ?? 'Information'}>
      {/* page title */}
      <h2 className="font-display text-3xl font-bold">{page?.title}</h2>
      {/* paragraphs */}
      <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-brown-dark/85">
        {/* one paragraph per line of text */}
        {page?.body.map((p) => <p key={p}>{p}</p>)}
      </div>
    </Overlay>
  )
}
