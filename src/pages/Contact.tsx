import { useState } from 'react'
import type { FormEvent } from 'react'
import { Field, PageHero, inputCls } from '../components/ui'
import { usePageMeta } from '../hooks'
import { restaurant } from '../data/restaurant'
import { emailRe } from '../lib/validation'

export default function Contact() {
  usePageMeta('Contact | Dar Zitoun, Rabat', 'Find Dar Zitoun in the Kasbah of Rabat: address, phone, opening hours and a contact form. Demo project.')
  const [v, setV] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Partial<typeof v>>({})
  const [sent, setSent] = useState(false)

  const validate = (x: typeof v) => {
    const e: Partial<typeof v> = {}
    if (x.name.trim().length < 2) e.name = 'Please enter your name.'
    if (!emailRe.test(x.email.trim())) e.email = 'Please enter a valid email address.'
    if (x.message.trim().length < 10) e.message = 'Your message should be at least 10 characters.'
    return e
  }
  const change = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...v, [k]: e.target.value }
    setV(next)
    if (errors[k]) setErrors((p) => ({ ...p, [k]: validate(next)[k] }))
  }
  const submit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(v)
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) { document.getElementById(first)?.focus(); return }
    setSent(true)
  }
  const p = (k: keyof typeof v) => ({ id: k, value: v[k], onChange: change(k), className: inputCls(errors[k]), 'aria-invalid': errors[k] ? true : undefined, 'aria-describedby': errors[k] ? `${k}-error` : undefined })

  return (
    <>
      <PageHero eyebrow="Contact" title="Find us in the Kasbah" subtitle="Down a blue-and-white lane, behind the green door with the brass knocker." />
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-2">
        <div>
          <div className="relative aspect-[4/3] overflow-hidden border-4 border-gold/60 bg-sand">
            <div className="zellige-dark absolute inset-0 opacity-10" aria-hidden="true" />
            <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" role="img" aria-label="Stylised map showing Dar Zitoun near the Kasbah of the Udayas, Rabat">
              <rect width="400" height="300" fill="#f2e4cc" />
              <path d="M0 210 Q120 180 220 220 T400 190 L400 300 L0 300Z" fill="#9cc3cb" />
              <g stroke="#fbf5ea" strokeWidth="10" fill="none" strokeLinecap="round">
                <path d="M30 40 L170 70 L210 150 L330 170" /><path d="M170 70 L260 30 L370 60" /><path d="M210 150 L190 200" /><path d="M60 140 L210 150" />
              </g>
              <g transform="translate(205 118)">
                <path d="M0 0 C-22 -26 -22 -52 0 -52 C22 -52 22 -26 0 0Z" fill="#8a3a1c" /><circle cx="0" cy="-36" r="8" fill="#e3c374" />
              </g>
              <text x="222" y="86" fontFamily="Playfair Display, serif" fontSize="16" fill="#2a1810" fontWeight="700">Dar Zitoun</text>
              <text x="40" y="262" fontFamily="sans-serif" fontSize="11" fill="#1e5a6e">Bou Regreg river</text>
            </svg>
          </div>
          <p className="mt-2 text-xs text-espresso/50">Illustrative map. Demo address, not a real location.</p>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-bold">Address</h2>
              <address className="mt-2 not-italic leading-relaxed text-espresso/80">
                {restaurant.address.map((l) => <span key={l} className="block">{l}</span>)}
                <a className="mt-2 block font-semibold text-clay hover:underline" href={`tel:${restaurant.phone.replace(/\s/g, '')}`}>{restaurant.phone}</a>
                <a className="block font-semibold text-clay hover:underline" href={`mailto:${restaurant.email}`}>{restaurant.email}</a>
              </address>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold">Hours</h2>
              <ul className="mt-2 space-y-2 text-espresso/80">
                {restaurant.hours.map((h) => <li key={h.days}><span className="block font-semibold">{h.days}</span>{h.time}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <div className="border border-gold/50 bg-white p-6 shadow-lg sm:p-10">
          {sent ? (
            <div role="status" className="py-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-zellige text-3xl text-cream" aria-hidden="true">✓</div>
              <h2 className="mt-5 font-display text-3xl font-bold">Message received</h2>
              <p className="mt-3 text-espresso/80">Shukran {v.name.split(' ')[0]}, we will reply to {v.email} soon. (Demo form: nothing was actually sent.)</p>
              <button type="button" onClick={() => { setSent(false); setV({ name: '', email: '', message: '' }) }} className="focus-ring mt-6 rounded-sm border-2 border-brick px-6 py-3 text-sm font-bold uppercase tracking-widest text-brick hover:bg-brick hover:text-cream">Send another</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-6" aria-label="Contact form">
              <h2 className="font-display text-3xl font-bold">Send us a message</h2>
              <Field id="name" label="Name" error={errors.name}><input type="text" autoComplete="name" {...p('name')} /></Field>
              <Field id="email" label="Email" error={errors.email}><input type="email" autoComplete="email" {...p('email')} /></Field>
              <Field id="message" label="Message" error={errors.message}><textarea rows={6} {...p('message')} /></Field>
              <button type="submit" className="focus-ring w-full rounded-sm bg-brick px-8 py-4 text-sm font-bold uppercase tracking-widest text-cream hover:bg-clay">Send message</button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
