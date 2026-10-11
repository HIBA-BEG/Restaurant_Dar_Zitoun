import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Field, PageHero, inputCls } from '../components/ui'
import { usePageMeta } from '../hooks'
import { dinnerSlots, lunchSlots, restaurant } from '../data/restaurant'
import { emailRe, formatDate, phoneRe, todayISO } from '../lib/validation'

interface Values { name: string; email: string; phone: string; date: string; time: string; guests: string; occasion: string; notes: string }
type Errors = Partial<Record<keyof Values, string>>
const empty: Values = { name: '', email: '', phone: '', date: '', time: '', guests: '2', occasion: '', notes: '' }

function validate(v: Values): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.'
  if (!emailRe.test(v.email.trim())) e.email = 'Please enter a valid email address.'
  if (!phoneRe.test(v.phone.trim())) e.phone = 'Please enter a valid phone number, e.g. +212 6 12 34 56 78.'
  if (!v.date) e.date = 'Choose a date.'
  else if (v.date < todayISO()) e.date = 'The date cannot be in the past.'
  else if (new Date(v.date + 'T12:00:00').getDay() === 1) e.date = 'We are closed on Mondays. Please pick another day.'
  if (!v.time) e.time = 'Choose a time.'
  const g = Number(v.guests)
  if (!Number.isInteger(g) || g < 1 || g > 12) e.guests = 'We take 1 to 12 guests online. Call us for larger groups.'
  return e
}

export default function Reservation() {
  usePageMeta('Reserve a Table | Dar Zitoun, Rabat', 'Book a table at Dar Zitoun for lunch or dinner. Demo reservation form, front-end only.')
  const [values, setValues] = useState<Values>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [done, setDone] = useState<Values | null>(null)

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...values, [k]: e.target.value }
    setValues(next)
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: validate(next)[k] }))
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) { document.getElementById(first)?.focus(); return }
    setDone(values)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const props = (k: keyof Values) => ({ id: k, 'aria-invalid': errors[k] ? true : undefined, 'aria-describedby': errors[k] ? `${k}-error` : undefined, className: inputCls(errors[k]), value: values[k], onChange: set(k) })

  return (
    <>
      <PageHero eyebrow="Reservation" title="Reserve your table" subtitle="Lunch or dinner, Tuesday to Sunday. We hold your table for 15 minutes." />
      <section className="mx-auto max-w-6xl px-5 py-16">
        {done ? (
          <div role="status" className="mx-auto max-w-2xl border-4 border-gold/70 bg-white p-10 text-center shadow-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-zellige text-3xl text-cream" aria-hidden="true">✓</div>
            <h2 className="mt-5 font-display text-4xl font-bold">Shukran, {done.name.split(' ')[0]}!</h2>
            <p className="mt-3 text-lg text-espresso/80">Your request is received. We will confirm by email at <strong>{done.email}</strong> within a few hours.</p>
            <dl className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-y-3 border-t border-gold/40 pt-6 text-left">
              <dt className="font-bold uppercase tracking-wider text-clay">Date</dt><dd>{formatDate(done.date)}</dd>
              <dt className="font-bold uppercase tracking-wider text-clay">Time</dt><dd>{done.time}</dd>
              <dt className="font-bold uppercase tracking-wider text-clay">Guests</dt><dd>{done.guests}</dd>
              {done.occasion && <><dt className="font-bold uppercase tracking-wider text-clay">Occasion</dt><dd>{done.occasion}</dd></>}
            </dl>
            <p className="mt-6 text-xs text-espresso/50">Demo form: nothing was sent, no data is stored.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button type="button" onClick={() => { setDone(null); setValues(empty) }} className="focus-ring rounded-sm border-2 border-brick px-6 py-3 text-sm font-bold uppercase tracking-widest text-brick hover:bg-brick hover:text-cream">New reservation</button>
              <Link to="/menu" className="focus-ring rounded-sm bg-brick px-6 py-3 text-sm font-bold uppercase tracking-widest text-cream hover:bg-clay">Browse the menu</Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
            <form onSubmit={submit} noValidate className="space-y-6 border border-gold/50 bg-white p-6 shadow-lg sm:p-10" aria-label="Reservation form">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field id="name" label="Full name" error={errors.name}><input type="text" autoComplete="name" {...props('name')} /></Field>
                <Field id="email" label="Email" error={errors.email}><input type="email" autoComplete="email" {...props('email')} /></Field>
                <Field id="phone" label="Phone" error={errors.phone}><input type="tel" autoComplete="tel" {...props('phone')} /></Field>
                <Field id="guests" label="Guests" error={errors.guests}><input type="number" min={1} max={12} {...props('guests')} /></Field>
                <Field id="date" label="Date" error={errors.date} hint="Closed on Mondays."><input type="date" min={todayISO()} {...props('date')} /></Field>
                <Field id="time" label="Time" error={errors.time}>
                  <select {...props('time')}>
                    <option value="">Select a time</option>
                    <optgroup label="Lunch">{lunchSlots.map((t) => <option key={t}>{t}</option>)}</optgroup>
                    <optgroup label="Dinner">{dinnerSlots.map((t) => <option key={t}>{t}</option>)}</optgroup>
                  </select>
                </Field>
              </div>
              <Field id="occasion" label="Occasion (optional)">
                <select {...props('occasion')}>
                  <option value="">None in particular</option>
                  <option>Birthday</option><option>Anniversary</option><option>Business lunch</option><option>Family gathering</option>
                </select>
              </Field>
              <Field id="notes" label="Allergies or special requests (optional)">
                <textarea rows={4} {...props('notes')} />
              </Field>
              <button type="submit" className="focus-ring w-full rounded-sm bg-brick px-8 py-4 text-sm font-bold uppercase tracking-widest text-cream transition hover:bg-clay">Request reservation</button>
              <p className="text-center text-xs text-espresso/50">Demo form: front-end only, nothing is sent.</p>
            </form>
            <aside className="space-y-6">
              <div className="relative overflow-hidden bg-brick p-8 text-cream">
                <div className="zellige-gold absolute inset-0 opacity-15" aria-hidden="true" />
                <div className="relative">
                  <h2 className="font-display text-2xl font-bold text-gold-light">Opening hours</h2>
                  <ul className="mt-4 space-y-3 text-sm">
                    {restaurant.hours.map((h) => <li key={h.days}><span className="block font-bold">{h.days}</span><span className="text-sand/85">{h.time}</span></li>)}
                  </ul>
                </div>
              </div>
              <div className="border border-gold/50 bg-sand p-8 text-sm leading-relaxed text-espresso/80">
                <h2 className="font-display text-2xl font-bold text-espresso">Good to know</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  <li>Groups of 13 or more: call us on {restaurant.phone}.</li>
                  <li>Vegetarian, vegan and gluten-free dishes available.</li>
                  <li>Friday is couscous day. Book early!</li>
                </ul>
              </div>
            </aside>
          </div>
        )}
      </section>
    </>
  )
}
