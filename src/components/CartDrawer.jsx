// shop state and helpers
import { useStore, money } from '../store'
// product data and shop rules
import { img, productById, FREE_SHIPPING_FROM, MAX_QTY } from '../data'
// icons
import { PlusIcon, MinusIcon, HeartIcon } from './Icons'
// slide-in shell
import Overlay from './Overlay'

// small product thumbnail
const Thumb = ({ product }) => (
  // square gray tile
  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-card">
    {/* product photo */}
    <img src={img(product.image)} alt="" className={`h-full w-full object-cover ${product.studio ? 'mix-blend-multiply' : ''}`} />
  </div>
)

// the bag list with totals
function Bag() {
  // bag contents, totals and actions
  const { lines, subtotal, shipping, total, setQty, removeFromCart, setModal, setDrawer } = useStore()
  // how much more to spend for free shipping
  const remaining = Math.max(0, FREE_SHIPPING_FROM - subtotal)

  // empty bag message
  if (!lines.length) {
    return (
      // centered message
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        {/* title */}
        <p className="font-display text-2xl font-semibold">Your bag is empty</p>
        {/* hint */}
        <p className="text-sm text-muted">Find a pair you love and it will show up here.</p>
        {/* closes the drawer and jumps to products */}
        <a href="#shop" onClick={() => setDrawer(null)} className="btn mt-2 h-12 bg-brown-btn px-8 text-white">Start shopping</a>
      </div>
    )
  }

  return (
    <>
      {/* free shipping progress */}
      <div className="border-b border-[#eee6dc] px-6 py-4">
        {/* message */}
        <p className="text-[13px]">
          {remaining > 0 ? <>Spend <b>{money(remaining)}</b> more for free shipping</> : <b>You unlocked free shipping</b>}
        </p>
        {/* bar background */}
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-beige">
          {/* filled part */}
          <div className="h-full rounded-full bg-brown-btn transition-all duration-500" style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_FROM) * 100)}%` }} />
        </div>
      </div>

      {/* scrolling list of items */}
      <ul className="flex-1 divide-y divide-[#eee6dc] overflow-y-auto px-6">
        {/* one row per item and size */}
        {lines.map((l) => (
          <li key={`${l.id}-${l.size}`} className="flex gap-4 py-5">
            {/* photo */}
            <Thumb product={l.product} />
            {/* details */}
            <div className="flex flex-1 flex-col">
              {/* name and line price */}
              <div className="flex justify-between gap-3">
                {/* name */}
                <p className="font-medium">{l.product.name}</p>
                {/* price for this row */}
                <p className="font-semibold">{money(l.total)}</p>
              </div>
              {/* size */}
              <p className="mt-1 text-[13px] text-muted">Size EU {l.size}</p>
              {/* quantity controls and remove */}
              <div className="mt-auto flex items-center justify-between pt-3">
                {/* - qty + */}
                <div className="flex items-center rounded-full border border-[#ddd3c7]">
                  {/* decrease, disabled at 1 */}
                  <button aria-label="Decrease quantity" disabled={l.qty <= 1} onClick={() => setQty(l.id, l.size, l.qty - 1)} className="grid h-8 w-8 cursor-pointer place-items-center disabled:opacity-30">
                    <MinusIcon className="h-3.5 w-3.5" />
                  </button>
                  {/* current quantity */}
                  <span className="w-6 text-center text-sm font-semibold" aria-live="polite">{l.qty}</span>
                  {/* increase, disabled at the maximum */}
                  <button aria-label="Increase quantity" disabled={l.qty >= MAX_QTY} onClick={() => setQty(l.id, l.size, l.qty + 1)} className="grid h-8 w-8 cursor-pointer place-items-center disabled:opacity-30">
                    <PlusIcon className="h-3.5 w-3.5" />
                  </button>
                </div>
                {/* remove the row */}
                <button onClick={() => removeFromCart(l.id, l.size)} className="cursor-pointer text-[13px] text-muted underline underline-offset-2 hover:text-brown-dark">Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* totals and checkout */}
      <div className="border-t border-[#eee6dc] bg-[#faf7f3] px-6 py-5">
        {/* subtotal row */}
        <div className="flex justify-between text-sm"><span>Subtotal</span><span>{money(subtotal)}</span></div>
        {/* shipping row */}
        <div className="mt-1 flex justify-between text-sm"><span>Shipping</span><span>{shipping ? money(shipping) : 'Free'}</span></div>
        {/* total row */}
        <div className="mt-3 flex justify-between text-lg font-bold"><span>Total</span><span>{money(total)}</span></div>
        {/* opens the checkout form */}
        <button onClick={() => { setDrawer(null); setModal('checkout') }} className="btn mt-4 h-12 w-full bg-brown-btn text-white hover:bg-[#654528]">Checkout</button>
      </div>
    </>
  )
}

// saved products list
function Wishlist() {
  // saved ids and actions
  const { wishlist, toggleWishlist, addToCart, setDrawer } = useStore()

  // nothing saved yet
  if (!wishlist.length) {
    return (
      // centered message
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        {/* heart */}
        <HeartIcon className="h-10 w-10 text-brown-btn" />
        {/* title */}
        <p className="font-display text-2xl font-semibold">No saved pairs yet</p>
        {/* hint */}
        <p className="text-sm text-muted">Tap the heart on any product to save it for later.</p>
        {/* back to products */}
        <a href="#shop" onClick={() => setDrawer(null)} className="btn mt-2 h-12 bg-brown-btn px-8 text-white">Browse sneakers</a>
      </div>
    )
  }

  return (
    // scrolling list
    <ul className="flex-1 divide-y divide-[#eee6dc] overflow-y-auto px-6">
      {/* one row per saved product */}
      {wishlist.map((id) => {
        // full product details
        const p = productById[id]
        return (
          <li key={id} className="flex gap-4 py-5">
            {/* photo */}
            <Thumb product={p} />
            {/* details and actions */}
            <div className="flex flex-1 flex-col">
              {/* name */}
              <p className="font-medium">{p.name}</p>
              {/* price */}
              <p className="mt-1 text-sm font-semibold">{money(p.price)}</p>
              {/* buttons */}
              <div className="mt-auto flex gap-3 pt-3">
                {/* moves it into the bag in the default size */}
                <button onClick={() => { addToCart(id); toggleWishlist(id) }} className="btn h-9 bg-brown-btn px-4 text-[13px] text-white">Move to bag</button>
                {/* removes it from the list */}
                <button onClick={() => toggleWishlist(id)} className="cursor-pointer text-[13px] text-muted underline underline-offset-2">Remove</button>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

// right-side drawer with Bag and Wishlist tabs
export default function CartDrawer() {
  // which tab is open (or null for closed) plus counts
  const { drawer, setDrawer, count, wishlist } = useStore()

  return (
    // slide-in panel
    <Overlay open={!!drawer} onClose={() => setDrawer(null)} label={drawer === 'wishlist' ? 'Wishlist' : 'Shopping bag'} variant="drawer">
      {/* tab buttons */}
      <div role="tablist" className="flex gap-6 border-b border-[#eee6dc] px-6 pb-0 pt-6">
        {/* bag tab */}
        <button role="tab" aria-selected={drawer === 'bag'} onClick={() => setDrawer('bag')} className={`cursor-pointer border-b-2 pb-3 font-display text-xl font-semibold ${drawer === 'bag' ? 'border-brown-dark' : 'border-transparent text-muted'}`}>
          Bag ({count})
        </button>
        {/* wishlist tab */}
        <button role="tab" aria-selected={drawer === 'wishlist'} onClick={() => setDrawer('wishlist')} className={`cursor-pointer border-b-2 pb-3 font-display text-xl font-semibold ${drawer === 'wishlist' ? 'border-brown-dark' : 'border-transparent text-muted'}`}>
          Wishlist ({wishlist.length})
        </button>
      </div>
      {/* active tab content */}
      {drawer === 'wishlist' ? <Wishlist /> : <Bag />}
    </Overlay>
  )
}
