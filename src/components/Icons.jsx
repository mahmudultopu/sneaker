// shared settings for every outline icon
const base = {
  // no fill, only lines
  fill: 'none',
  // lines take the current text color
  stroke: 'currentColor',
  // line thickness
  strokeWidth: 1.7,
  // rounded line ends
  strokeLinecap: 'round',
  // rounded corners
  strokeLinejoin: 'round',
  // decorative: screen readers use the button label instead
  'aria-hidden': true,
}

// Conwerse logo: an open ring with a small notch block
export const LogoMark = ({ className = 'h-8 w-8' }) => (
  // 40x40 drawing area
  <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
    {/* thick open ring */}
    <path d="M23.5 6.4A14 14 0 1 1 9.2 11" fill="none" stroke="currentColor" strokeWidth="7" />
    {/* tilted notch block at the top */}
    <rect x="9" y="1.5" width="8" height="8" rx="1.5" transform="rotate(-28 13 5.5)" fill="currentColor" />
  </svg>
)

// magnifying glass
export const SearchIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    {/* lens */}
    <circle cx="11" cy="11" r="7" />
    {/* handle */}
    <path d="m20 20-3.5-3.5" />
  </svg>
)

// person outline
export const UserIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    {/* head */}
    <circle cx="12" cy="8" r="4" />
    {/* shoulders */}
    <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
  </svg>
)

// heart, filled when `filled` is true
export const HeartIcon = ({ filled, ...p }) => (
  <svg viewBox="0 0 24 24" {...base} fill={filled ? 'currentColor' : 'none'} {...p}>
    {/* heart shape */}
    <path d="M12 20s-7.5-4.6-9-9.3C2 7.4 4.2 4.5 7.4 4.5c2 0 3.6 1.1 4.6 2.6 1-1.5 2.6-2.6 4.6-2.6 3.2 0 5.4 2.9 4.4 6.2C19.5 15.4 12 20 12 20Z" />
  </svg>
)

// shopping cart
export const CartIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    {/* basket and handle */}
    <path d="M2.5 3.5h2.6l2.3 11.2a1.5 1.5 0 0 0 1.5 1.2h8.7a1.5 1.5 0 0 0 1.5-1.1l1.7-6.8H6.2" />
    {/* left wheel */}
    <circle cx="9.5" cy="20" r="1.2" />
    {/* right wheel */}
    <circle cx="17.5" cy="20" r="1.2" />
  </svg>
)

// arrow pointing left
export const ChevronLeft = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={2.2} {...p}>
    {/* arrow head */}
    <path d="m14.5 6-6 6 6 6" />
  </svg>
)

// arrow pointing right
export const ChevronRight = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={2.2} {...p}>
    {/* arrow head */}
    <path d="m9.5 6 6 6-6 6" />
  </svg>
)

// diagonal arrow used on "Explore Shop"
export const ArrowUpRight = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={1.8} {...p}>
    {/* arrow line and head */}
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)

// envelope used in the newsletter field
export const MailIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    {/* envelope body */}
    <rect x="3" y="5" width="18" height="14" rx="2" />
    {/* envelope flap */}
    <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
  </svg>
)

// three lines: opens the mobile menu
export const MenuIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={2} {...p}>
    {/* three bars */}
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

// X: closes panels and pop-ups
export const CloseIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={2} {...p}>
    {/* two crossing lines */}
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

// plus sign for quantity
export const PlusIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={2} {...p}>
    {/* cross */}
    <path d="M12 5v14M5 12h14" />
  </svg>
)

// minus sign for quantity
export const MinusIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={2} {...p}>
    {/* bar */}
    <path d="M5 12h14" />
  </svg>
)

// check mark for success states
export const CheckIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={2.2} {...p}>
    {/* tick */}
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
)

// shield used for trust badges
export const ShieldIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    {/* shield outline */}
    <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V6L12 3Z" />
    {/* tick inside */}
    <path d="m9 12 2 2 4-4" />
  </svg>
)

// delivery truck for shipping badge
export const TruckIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    {/* cargo box and cab */}
    <path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3v3h-7" />
    {/* back wheel */}
    <circle cx="6.5" cy="17.5" r="1.7" />
    {/* front wheel */}
    <circle cx="17" cy="17.5" r="1.7" />
  </svg>
)

// circular arrows for returns badge
export const ReturnIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    {/* curved arrow */}
    <path d="M4 12a8 8 0 1 0 2.4-5.7L4 8.5" />
    {/* arrow head */}
    <path d="M4 4v4.5h4.5" />
  </svg>
)
