// React helpers for shared state
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
// product list and shop rules
import { productById, MAX_QTY, FREE_SHIPPING_FROM, SHIPPING_FEE } from './data'
// safe browser storage helpers
import { load, save } from './storage'

// the shared shop state lives in this context
const StoreContext = createContext(null)

// keep a number between a minimum and maximum
const clamp = (n, min, max) => Math.min(max, Math.max(min, n))

// shoe sizes offered on every product
export const SIZES = [38, 39, 40, 41, 42, 43, 44, 45]

// clean up a saved bag so tampered or outdated data can never break the page
function cleanCart(value) {
  // anything that is not a list becomes an empty bag
  if (!Array.isArray(value)) return []
  // keep only rows that point at a real product with a valid size and quantity
  return value
    // drop rows for products that no longer exist
    .filter((row) => row && productById[row.id] && SIZES.includes(row.size))
    // force the quantity into the allowed range
    .map((row) => ({ id: row.id, size: row.size, qty: clamp(Math.floor(Number(row.qty) || 1), 1, MAX_QTY) }))
}

// clean up a saved wishlist the same way
function cleanWishlist(value) {
  // only a list of known product ids is accepted
  return Array.isArray(value) ? value.filter((id) => typeof id === 'string' && productById[id]) : []
}

// clean up saved order history
function cleanOrders(value) {
  // only a list of orders with the expected fields is accepted
  return Array.isArray(value)
    ? value.filter((o) => o && typeof o.number === 'string' && Array.isArray(o.items) && typeof o.total === 'number').slice(0, 20)
    : []
}

// create an order number like CW-7K2D9Q using the browser's secure random generator
function orderNumber() {
  // 6 random bytes
  const bytes = crypto.getRandomValues(new Uint8Array(6))
  // letters and digits without look-alike characters (no 0/O, 1/I)
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  // map each byte to one character
  return 'CW-' + Array.from(bytes, (b) => chars[b % chars.length]).join('')
}

// wraps the app and provides the shop state to every component
export function StoreProvider({ children }) {
  // items in the bag, restored from the last visit
  const [cart, setCart] = useState(() => cleanCart(load('cart', [])))
  // saved products, restored from the last visit
  const [wishlist, setWishlist] = useState(() => cleanWishlist(load('wishlist', [])))
  // past orders placed on this device
  const [orders, setOrders] = useState(() => cleanOrders(load('orders', [])))
  // which slide-in panel is open: 'bag', 'wishlist' or null
  const [drawer, setDrawer] = useState(null)
  // which pop-up is open: 'search', 'checkout', 'account', 'info' or null
  const [modal, setModal] = useState(null)
  // which info page to show inside the info pop-up
  const [infoPage, setInfoPage] = useState(null)
  // active category filter for the product grid
  const [category, setCategory] = useState('all')
  // small notifications in the corner
  const [toasts, setToasts] = useState([])
  // counter used to give each toast a unique id
  const toastId = useRef(0)

  // save the bag whenever it changes
  useEffect(() => save('cart', cart), [cart])
  // save the wishlist whenever it changes
  useEffect(() => save('wishlist', wishlist), [wishlist])
  // save order history whenever it changes
  useEffect(() => save('orders', orders), [orders])

  // show a notification that disappears after a few seconds
  const notify = useCallback((message) => {
    // next unique id
    const id = ++toastId.current
    // add it, keeping at most 3 on screen
    setToasts((t) => [...t.slice(-2), { id, message }])
    // remove it after 2.8 seconds
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800)
  }, [])

  // add a product to the bag (or raise its quantity if it is already there)
  const addToCart = useCallback((id, size = 42, qty = 1) => {
    // ignore unknown products
    if (!productById[id]) return
    // update the bag
    setCart((c) => {
      // is this product in this size already in the bag?
      const existing = c.find((r) => r.id === id && r.size === size)
      // yes: raise the quantity, capped at the maximum
      if (existing) return c.map((r) => (r === existing ? { ...r, qty: clamp(r.qty + qty, 1, MAX_QTY) } : r))
      // no: add a new row
      return [...c, { id, size, qty: clamp(qty, 1, MAX_QTY) }]
    })
    // confirm to the shopper
    notify(`${productById[id].name} added to your bag`)
  }, [notify])

  // change the quantity of one bag row
  const setQty = useCallback((id, size, qty) => {
    // replace the matching row with the new quantity
    setCart((c) => c.map((r) => (r.id === id && r.size === size ? { ...r, qty: clamp(qty, 1, MAX_QTY) } : r)))
  }, [])

  // remove one row from the bag
  const removeFromCart = useCallback((id, size) => {
    // keep every row except the matching one
    setCart((c) => c.filter((r) => !(r.id === id && r.size === size)))
  }, [])

  // add or remove a product from the wishlist
  const toggleWishlist = useCallback((id) => {
    // ignore unknown products
    if (!productById[id]) return
    // was it already saved?
    const saved = wishlist.includes(id)
    // flip it
    setWishlist((w) => (saved ? w.filter((x) => x !== id) : [...w, id]))
    // confirm to the shopper
    notify(saved ? 'Removed from wishlist' : `${productById[id].name} saved to wishlist`)
  }, [wishlist, notify])

  // bag rows joined with their product details and line totals
  const lines = useMemo(
    () => cart.map((r) => ({ ...r, product: productById[r.id], total: productById[r.id].price * r.qty })),
    [cart],
  )
  // number of pairs in the bag
  const count = useMemo(() => cart.reduce((n, r) => n + r.qty, 0), [cart])
  // price of everything in the bag
  const subtotal = useMemo(() => lines.reduce((n, l) => n + l.total, 0), [lines])
  // shipping is free above the threshold or when the bag is empty
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE
  // final amount to pay
  const total = subtotal + shipping

  // turn the current bag into a saved order and empty the bag
  const placeOrder = useCallback((customer) => {
    // build the order record
    const order = {
      // readable order number
      number: orderNumber(),
      // date the order was placed
      date: new Date().toISOString(),
      // only the first name is kept, for a friendly greeting in order history
      name: customer.name.split(' ')[0],
      // a copy of what was bought
      items: lines.map((l) => ({ id: l.id, name: l.product.name, size: l.size, qty: l.qty, price: l.product.price })),
      // amount charged
      total,
      // starting status shown under "My orders"
      status: 'Processing',
    }
    // newest order first, keep at most 20
    setOrders((o) => [order, ...o].slice(0, 20))
    // empty the bag
    setCart([])
    // give the order back so checkout can show it
    return order
  }, [lines, total])

  // open an info page from the footer
  const openInfo = useCallback((page) => {
    // remember which page
    setInfoPage(page)
    // open the pop-up
    setModal('info')
  }, [])

  // pick a category and scroll to the product grid
  const shopCategory = useCallback((cat) => {
    // set the filter
    setCategory(cat)
    // close any open panel
    setDrawer(null)
    // scroll to the grid on the next frame, after the filter is applied
    requestAnimationFrame(() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }))
  }, [])

  // everything components can use
  const value = {
    cart, lines, count, subtotal, shipping, total, wishlist, orders,
    drawer, setDrawer, modal, setModal, infoPage, openInfo,
    category, setCategory, shopCategory, toasts,
    addToCart, setQty, removeFromCart, toggleWishlist, placeOrder, notify,
  }

  // share the value with every component inside
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

// hook to read the shop state inside any component
export function useStore() {
  // read the context
  const ctx = useContext(StoreContext)
  // fail loudly if a component is used outside the provider
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  // hand it back
  return ctx
}

// formats a number as US dollars, for example 229.96 -> $229.96
export const money = (n) => `$${n.toFixed(2)}`
