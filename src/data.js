// builds the path to an image stored in public/images
export const img = (name) => `/images/${name}.webp`

// orders at or above this amount ship for free
export const FREE_SHIPPING_FROM = 250
// shipping cost for smaller orders
export const SHIPPING_FEE = 12
// highest quantity of one product allowed in the bag
export const MAX_QTY = 10

// filter tabs shown above the product grid
export const categories = [
  // show everything
  { id: 'all', label: 'All' },
  // men's shoes only
  { id: 'men', label: 'Men' },
  // women's shoes only
  { id: 'women', label: 'Women' },
  // kids' shoes only
  { id: 'kids', label: 'Kids' },
]

// text for the small tag on each product card
export const categoryTag = { men: "Men's Sneakers", women: "Women's Sneakers", kids: "Kids' Sneakers" }

// every product in the store
export const products = [
  // studio: true means the photo has a plain white background that blends into the gray tile
  { id: 'aero-runner-90', image: 'product-1', name: 'Aero Runner 90', price: 229.96, category: 'men', studio: true, desc: 'Retro runner in sail white with a coral swoosh, visible air heel and padded suede overlays.' },
  // pink lifestyle trainer
  { id: 'pulse-rs-trainer', image: 'product-2', name: 'Pulse RS Trainer', price: 329.96, category: 'women', studio: true, desc: 'Chunky layered trainer in blush and peach with a cushioned running-inspired sole.' },
  // black knit runner
  { id: 'shadow-knit-runner', image: 'product-3', name: 'Shadow Knit Runner', price: 169.99, category: 'men', studio: true, desc: 'Breathable one-piece knit upper in deep black with a springy foam midsole.' },
  // red high-top
  { id: 'ember-high-retro', image: 'product-4', name: 'Ember High Retro', price: 219.96, category: 'men', studio: true, desc: 'Tonal red high-top in tumbled leather with embossed panels and a grippy rubber outsole.' },
  // colorful pair
  { id: 'prism-layer-runner', image: 'product-5', name: 'Prism Layer Runner', price: 249.96, category: 'women', studio: true, desc: 'Mixed-material runner with teal, coral and plum accents on a cream base.' },
  // neon kids trainer
  { id: 'volt-junior-trainer', image: 'product-6', name: 'Volt Junior Trainer', price: 129.99, category: 'kids', studio: false, desc: 'Lightweight volt trainer with a stable wide base for running, jumping and playground days.' },
  // burgundy skate shoe
  { id: 'canvas-skate-low', image: 'product-7', name: 'Canvas Skate Low', price: 89.99, category: 'women', studio: false, desc: 'Burgundy canvas skate shoe with a white side stripe and vulcanized waffle sole.' },
  // red canvas high-top for kids
  { id: 'classic-canvas-high', image: 'product-8', name: 'Classic Canvas High', price: 74.99, category: 'kids', studio: false, desc: 'Cherry red canvas high-top with metal eyelets and a cushioned insole for small feet.' },
  // basketball shoe
  { id: 'court-vision-mid', image: 'product-9', name: 'Court Vision Mid', price: 139.99, category: 'men', studio: false, desc: 'Mid-cut court shoe in charcoal with a wraparound strap for locked-in support.' },
  // olive suede runner
  { id: 'heritage-247-olive', image: 'product-10', name: 'Heritage 247 Olive', price: 119.99, category: 'men', studio: false, desc: 'Olive suede and mesh runner with a sock-like fit and soft rubber outsole.' },
  // wheat workwear sneaker
  { id: 'workwear-low-wheat', image: 'product-11', name: 'Workwear Low Wheat', price: 159.99, category: 'women', studio: false, desc: 'Wheat canvas low-top with a contrast navy collar and durable stitched toe.' },
  // red running shoe
  { id: 'flyline-free-red', image: 'product-12', name: 'Flyline Free Red', price: 129.99, category: 'women', studio: false, desc: 'Flexible red knit runner that moves with your foot, made for summer miles.' },
]

// quick lookup of a product by its id
export const productById = Object.fromEntries(products.map((p) => [p.id, p]))

// products shown in the "Newly Dropped" grid
export const newlyDropped = products.slice(0, 6)
// products shown in the "Summer Collections" grid
export const summer = products.slice(6)

// slides for the hero carousel
export const heroSlides = [
  // first slide
  { image: 'hero-1', alt: 'Person sitting on a ledge wearing black, white and orange low-top sneakers' },
  // second slide
  { image: 'hero-2', alt: 'Close-up of white running sneakers on a city street' },
  // third slide
  { image: 'hero-3', alt: 'Orange and white sneakers worn on a curb' },
]

// footer link columns; each link opens a matching info page or filters products
export const footerLinks = {
  // these filter the product grid
  Categories: [
    { label: 'Women', filter: 'women' },
    { label: 'Men', filter: 'men' },
    { label: 'Kids', filter: 'kids' },
    { label: 'Accessories', href: '#collections' },
    { label: 'Collections', href: '#summer' },
    { label: 'Brands', href: '#featured' },
  ],
  // these open policy pages
  Legal: [
    { label: 'Privacy Policy', page: 'privacy' },
    { label: 'Terms and Conditions', page: 'terms' },
    { label: 'Refund Policy', page: 'refund' },
  ],
  // these open help pages
  Help: [
    { label: 'How To Order', page: 'how-to-order' },
    { label: 'Track Order', account: true },
    { label: 'Returns & Exchanges', page: 'returns' },
    { label: 'About Us', page: 'about' },
    { label: 'FAQ', page: 'faq' },
    { label: 'Contact Us', page: 'contact' },
  ],
}

// text for each info page opened from the footer
export const infoPages = {
  // privacy page
  privacy: {
    title: 'Privacy Policy',
    body: [
      'Your bag, wishlist and order history are saved only in this browser. We do not send them to a server.',
      'Details you enter at checkout are used only to show your order confirmation and are stored on this device.',
      'We do not use tracking cookies, third-party analytics or advertising pixels.',
      'You can clear everything at any time by clearing this site’s data in your browser settings.',
    ],
  },
  // terms page
  terms: {
    title: 'Terms and Conditions',
    body: [
      'All prices are shown in US dollars and include applicable taxes.',
      'Product colors may look slightly different depending on your screen.',
      'We reserve the right to cancel an order if an item is out of stock, with a full refund.',
      'Every pair we sell is authentic and inspected before it ships.',
    ],
  },
  // refunds page
  refund: {
    title: 'Refund Policy',
    body: [
      'Unworn shoes in their original box can be returned within 30 days of delivery.',
      'Refunds go back to the original payment method within 5 to 7 business days after we receive the return.',
      'Shipping fees are refunded only if the item arrived damaged or was not what you ordered.',
    ],
  },
  // ordering help
  'how-to-order': {
    title: 'How To Order',
    body: [
      '1. Tap "Add to Cart" on any pair, or "Buy Now" to go straight to checkout.',
      '2. Open your bag from the cart icon to change sizes, quantities or remove items.',
      '3. Press Checkout, fill in your delivery details and place the order.',
      '4. Your order number appears right away and is saved under the account icon.',
    ],
  },
  // returns help
  returns: {
    title: 'Returns & Exchanges',
    body: [
      'Need a different size? Exchanges are free within 30 days.',
      'Contact us with your order number and we will send a prepaid return label.',
      'Once we receive the original pair we ship the new size within 2 business days.',
    ],
  },
  // about page
  about: {
    title: 'About Us',
    body: [
      'Conwerse started as a small sneaker swap between friends and grew into a store for people who care about what is on their feet.',
      'We buy and sell only authentic pairs, each one checked by hand before it reaches you.',
      'Every collection is picked to work with real outfits on real days, not just on a shelf.',
    ],
  },
  // frequently asked questions
  faq: {
    title: 'FAQ',
    body: [
      'Are your sneakers authentic? Yes. Every pair is inspected before shipping.',
      'How long does delivery take? 3 to 5 business days for most addresses.',
      `Is shipping free? Orders of $${FREE_SHIPPING_FROM} or more ship free. Smaller orders cost $${SHIPPING_FEE}.`,
      'How do I pay? We currently accept cash on delivery.',
    ],
  },
  // contact page
  contact: {
    title: 'Contact Us',
    body: [
      'Email: hello@conwerse.store',
      'Phone: +1 (555) 014-2290, Monday to Friday, 9am to 6pm.',
      'Studio: 214 Market Street, Brooklyn, NY 11201.',
    ],
  },
}
