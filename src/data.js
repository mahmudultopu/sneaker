export const img = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`

export const heroSlides = [
  { id: '1556906781-9a412961c28c', alt: 'Person wearing black, white and orange low-top sneakers' },
  { id: '1460353581641-37baddab0fa2', alt: 'Close-up of white running sneakers on a city street' },
  { id: '1514989940723-e8e51635b782', alt: 'Orange and white sneakers worn on a curb' },
]

const products = [
  {
    id: '1600185365778-7875a359b924',
    price: 229.96,
    name: 'Gazelle Indoor Shoes',
    desc: 'Classic indoor-ready Gazelle with premium suede upper, earthy tones, and signature contrast stripes.',
  },
  {
    id: '1608667508764-33cf0726b13a',
    price: 329.96,
    name: 'Gazelle Indoor Shoes',
    desc: 'Sleek Gazelle Indoor in muted green with crisp black/white accents and gum outsole.',
  },
  {
    id: '1491553895911-0055eca6402d',
    price: 169.99,
    name: 'Zoom Vomero',
    desc: 'Bold Zoom Vomero 5 runner with eye-catching colorway, breathable mesh upper, and dual Zoom Air cushioning.',
  },
  {
    id: '1575537302964-96cd47c06b1b',
    price: 219.96,
    name: 'Gazelle Indoor Shoes',
    desc: 'Classic indoor-ready Gazelle with premium suede upper, crisp contrast stripes, and timeless retro appeal.',
  },
  {
    id: '1560769629-975ec94e6a86',
    price: 249.96,
    name: 'Gazelle Indoor Shoes',
    desc: 'Sleek Gazelle Indoor in subtle muted tones with crisp black/white accents and gum outsole.',
  },
  {
    id: '1600185365483-26d7a4cc7519',
    price: 169.99,
    name: 'Zoom Vomero',
    desc: 'Bold Zoom Vomero runner featuring breathable mesh upper, eye-catching navy/blue colorway.',
  },
]

export const newlyDropped = products
export const summer = [products[2], products[5], products[0], products[4], products[3], products[1]]

export const footerLinks = {
  Categories: ['Women', 'Men', 'Kids', 'Accessories', 'Collections', 'Brands'],
  Legal: ['Privacy Policy', 'Term and Condition', 'Refund Policy'],
  Help: ['How To Order', 'Track Order', 'Return & Exchanges', 'About Us', 'FAQ', 'Contact Us'],
}
