// shared shop state
import { useStore } from '../store'
// tick icon
import { CheckIcon } from './Icons'

// small notifications in the bottom corner
export default function Toasts() {
  // current notifications
  const { toasts } = useStore()

  return (
    // screen readers announce new messages politely
    <div aria-live="polite" className="pointer-events-none fixed bottom-5 left-1/2 z-[70] flex w-[calc(100%-32px)] max-w-sm -translate-x-1/2 flex-col gap-2 sm:left-auto sm:right-6 sm:translate-x-0">
      {/* one card per message */}
      {toasts.map((t) => (
        // dark rounded card that slides up
        <div key={t.id} className="flex animate-[toast-in_.3s_ease] items-center gap-3 rounded-xl bg-brown-footer px-4 py-3 text-sm text-cream shadow-xl">
          {/* round tick badge */}
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cream text-brown-dark">
            {/* tick */}
            <CheckIcon className="h-3.5 w-3.5" />
          </span>
          {/* message text */}
          {t.message}
        </div>
      ))}
    </div>
  )
}
