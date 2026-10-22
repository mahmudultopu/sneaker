const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export const LogoMark = ({ className = 'h-8 w-8' }) => (
  <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
    <path
      d="M23.5 6.4A14 14 0 1 1 9.2 11"
      fill="none"
      stroke="currentColor"
      strokeWidth="7"
      strokeLinecap="butt"
    />
    <rect x="9" y="1.5" width="8" height="8" rx="1.5" transform="rotate(-28 13 5.5)" fill="currentColor" />
  </svg>
)

export const SearchIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
)

export const UserIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
  </svg>
)

export const HeartIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 20s-7.5-4.6-9-9.3C2 7.4 4.2 4.5 7.4 4.5c2 0 3.6 1.1 4.6 2.6 1-1.5 2.6-2.6 4.6-2.6 3.2 0 5.4 2.9 4.4 6.2C19.5 15.4 12 20 12 20Z" />
  </svg>
)

export const CartIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M2.5 3.5h2.6l2.3 11.2a1.5 1.5 0 0 0 1.5 1.2h8.7a1.5 1.5 0 0 0 1.5-1.1l1.7-6.8H6.2" />
    <circle cx="9.5" cy="20" r="1.2" />
    <circle cx="17.5" cy="20" r="1.2" />
  </svg>
)

export const ChevronLeft = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={2.2} {...p}>
    <path d="m14.5 6-6 6 6 6" />
  </svg>
)

export const ChevronRight = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={2.2} {...p}>
    <path d="m9.5 6 6 6-6 6" />
  </svg>
)

export const ArrowUpRight = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={1.8} {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)

export const MailIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
  </svg>
)

export const MenuIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={2} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const CloseIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={2} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const SwooshMark = (p) => (
  <svg viewBox="0 0 64 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M63 2.5 18.5 21.3c-3.7 1.6-6.8 2.3-9.2 2.3-2.8 0-4.8-1-6-2.9C1.6 18.2 2.4 14.4 5.6 9.9 3.9 13.1 3.7 15.6 5 17.3c.9 1.1 2.4 1.7 4.3 1.7 1.6 0 3.4-.4 5.5-1.1L63 2.5Z" />
  </svg>
)
