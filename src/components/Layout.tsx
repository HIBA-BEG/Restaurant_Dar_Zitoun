import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { restaurant } from '../data/restaurant'

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/our-story', label: 'Our Story' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/reservation', label: 'Reservation' },
  { to: '/contact', label: 'Contact' },
]

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="focus-ring flex items-center gap-3" aria-label="Dar Zitoun, home">
      <svg width="38" height="38" viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="14" fill="#8A3A1C" />
        <g fill="none" stroke="#E3C374" strokeWidth="3">
          <rect x="18" y="18" width="28" height="28" />
          <rect x="18" y="18" width="28" height="28" transform="rotate(45 32 32)" />
        </g>
        <circle cx="32" cy="32" r="4" fill="#E3C374" />
      </svg>
      <span className="leading-none">
        <span className={`block font-display text-2xl font-bold tracking-wide ${light ? 'text-gold-light' : 'text-brick'}`}>Dar Zitoun</span>
        <span className={`block pt-1 text-[10px] uppercase tracking-[0.35em] ${light ? 'text-sand/70' : 'text-espresso/60'}`}>Rabat · دار الزيتون</span>
      </span>
    </Link>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function Layout() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-brick focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
      <div className="tile-strip" aria-hidden="true" />
      <header className="sticky top-0 z-40 border-b border-gold/30 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {links.slice(0, 5).map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'}
                className={({ isActive }) => `focus-ring rounded px-3 py-2 text-sm font-semibold uppercase tracking-widest transition-colors ${isActive ? 'text-clay' : 'text-espresso hover:text-clay'}`}>
                {l.label}
              </NavLink>
            ))}
            <Link to="/reservation" className="focus-ring ml-3 rounded-sm bg-brick px-5 py-2.5 text-sm font-bold uppercase tracking-widest text-cream transition hover:bg-clay">Book a table</Link>
            <NavLink to="/contact" className={({ isActive }) => `focus-ring ml-1 rounded px-3 py-2 text-sm font-semibold uppercase tracking-widest ${isActive ? 'text-clay' : 'hover:text-clay'}`}>Contact</NavLink>
          </nav>
          <button type="button" className="focus-ring rounded p-2 lg:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
        {open && (
          <nav id="mobile-nav" className="border-t border-gold/30 bg-cream lg:hidden" aria-label="Mobile">
            <ul className="mx-auto max-w-7xl px-5 py-3">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} end={l.to === '/'} className={({ isActive }) => `block border-b border-gold/20 py-3 font-display text-xl ${isActive ? 'text-clay' : ''}`}>{l.label}</NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      <main id="main" className="flex-1"><Outlet /></main>

      <footer className="relative overflow-hidden bg-espresso text-sand">
        <div className="tile-strip" aria-hidden="true" />
        <div className="zellige-gold pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo light />
            <p className="mt-5 text-sm leading-relaxed text-sand/75">{restaurant.tagline}. Family recipes, clay pots and mint tea inside a restored riad.</p>
          </div>
          <div>
            <h3 className="font-display text-lg text-gold-light">Visit</h3>
            <address className="mt-3 text-sm not-italic leading-relaxed text-sand/80">
              {restaurant.address.map((l) => <span key={l} className="block">{l}</span>)}
              <a href={`tel:${restaurant.phone.replace(/\s/g, '')}`} className="mt-2 block hover:text-gold-light">{restaurant.phone}</a>
              <a href={`mailto:${restaurant.email}`} className="block hover:text-gold-light">{restaurant.email}</a>
            </address>
          </div>
          <div>
            <h3 className="font-display text-lg text-gold-light">Opening hours</h3>
            <ul className="mt-3 space-y-2 text-sm text-sand/80">
              {restaurant.hours.map((h) => <li key={h.days}><span className="block font-semibold text-sand">{h.days}</span>{h.time}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-lg text-gold-light">Explore</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {links.map((l) => <li key={l.to}><Link to={l.to} className="text-sand/80 hover:text-gold-light">{l.label}</Link></li>)}
            </ul>
          </div>
        </div>
        <div className="relative border-t border-gold/20 px-5 py-5 text-center text-xs text-sand/60">
          © {new Date().getFullYear()} Dar Zitoun. Demo website: the restaurant, address, phone and prices are fictional. <Link to="/gallery#credits" className="underline hover:text-gold-light">Photo credits</Link>
        </div>
      </footer>
    </div>
  )
}
