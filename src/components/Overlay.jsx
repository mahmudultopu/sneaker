// React helpers
import { useEffect, useRef } from 'react'
// close button icon
import { CloseIcon } from './Icons'

// selector for everything a keyboard user can tab to
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

// shared shell for pop-ups and side drawers:
// locks page scroll, closes on Esc, keeps keyboard focus inside, restores focus on close
export default function Overlay({ open, onClose, label, variant = 'modal', children }) {
  // the panel element
  const panel = useRef(null)
  // latest close function, kept in a ref so re-renders do not reset focus
  const closeRef = useRef(onClose)
  // always point at the newest close function
  closeRef.current = onClose

  // run only when the overlay opens or closes
  useEffect(() => {
    // nothing to do while closed
    if (!open) return
    // remember what had focus so we can return to it
    const previous = document.activeElement
    // stop the page behind from scrolling
    document.body.style.overflow = 'hidden'
    // move focus into the panel
    const first = panel.current?.querySelector(FOCUSABLE)
    // focus the first field or button
    first?.focus()

    // keyboard handling while open
    const onKey = (e) => {
      // Esc closes
      if (e.key === 'Escape') closeRef.current()
      // only Tab needs trapping
      if (e.key !== 'Tab' || !panel.current) return
      // everything focusable inside the panel
      const items = [...panel.current.querySelectorAll(FOCUSABLE)]
      // nothing to trap
      if (!items.length) return
      // first and last items
      const [firstEl, lastEl] = [items[0], items[items.length - 1]]
      // Shift+Tab on the first item wraps to the last
      if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus() }
      // Tab on the last item wraps to the first
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus() }
    }
    // listen for keys
    document.addEventListener('keydown', onKey)

    // clean up when closing
    return () => {
      // stop listening
      document.removeEventListener('keydown', onKey)
      // let the page scroll again
      document.body.style.overflow = ''
      // put focus back where it was
      previous?.focus?.()
    }
  }, [open])

  // render nothing while closed
  if (!open) return null

  // drawer slides in from the right; modal sits in the center
  const isDrawer = variant === 'drawer'

  return (
    // full-screen layer above everything
    <div className="fixed inset-0 z-[60] animate-[fade-in_.2s_ease]">
      {/* dark backdrop; clicking it closes */}
      <div className="absolute inset-0 bg-[#140e08]/60 backdrop-blur-[2px]" onClick={onClose} />
      {/* the panel itself */}
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={
          isDrawer
            // right-side drawer, full height, max 440px wide
            ? 'absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-white shadow-2xl'
            // centered card, scrolls if taller than the screen
            : 'absolute left-1/2 top-1/2 max-h-[90vh] w-[calc(100%-32px)] max-w-[560px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8'
        }
      >
        {/* close button in the top-right corner */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full text-brown-dark transition hover:bg-beige"
        >
          {/* X icon */}
          <CloseIcon className="h-5 w-5" />
        </button>
        {/* panel content */}
        {children}
      </div>
    </div>
  )
}
