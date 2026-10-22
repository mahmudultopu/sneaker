# sneaker

Conwerse is a responsive sneaker store landing page built with React, Vite and Tailwind CSS.

Live site: https://sneaker-gold.vercel.app

## Features

- Hero carousel with swipe, keyboard controls and pause on hover
- Product grid with category filters (Men, Women, Kids) and size picker
- Bag drawer with quantities, free-shipping progress and totals
- Wishlist, product search and checkout with form validation (cash on delivery)
- Order history and policy/help pages
- Bag, wishlist and orders are saved in the browser (localStorage)

## Security

- All images and fonts are self-hosted, so the page loads nothing from other domains
- Strict security headers in `vercel.json`: Content-Security-Policy, X-Frame-Options, HSTS, nosniff, Referrer-Policy, Permissions-Policy
- Every form input is length-limited and validated; saved data is checked before use
- No card details are collected

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Structure

- `src/data.js`: products, prices, slides, footer links and info page text
- `src/store.jsx`: shared state for bag, wishlist, orders and pop-ups
- `src/storage.js`: safe localStorage helpers
- `src/index.css`: color and font tokens
- `src/components/`: page sections, drawer and pop-ups
