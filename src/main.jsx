// StrictMode warns about unsafe patterns while developing
import { StrictMode } from 'react'
// createRoot attaches React to the page
import { createRoot } from 'react-dom/client'
// self-hosted heading font (all axes: weight, optical size, softness)
import '@fontsource-variable/fraunces/full.css'
// self-hosted body font
import '@fontsource-variable/figtree'
// global styles and Tailwind
import './index.css'
// shared shop state (cart, wishlist, orders, panels)
import { StoreProvider } from './store.jsx'
// the page itself
import App from './App.jsx'

// find the empty div in index.html and render the app into it
createRoot(document.getElementById('root')).render(
  // extra checks in development only
  <StrictMode>
    {/* every component below can read the shop state */}
    <StoreProvider>
      {/* the full landing page */}
      <App />
    </StoreProvider>
  </StrictMode>,
)
