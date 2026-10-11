import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks'

export default function NotFound() {
  usePageMeta('Page not found | Dar Zitoun', 'This page could not be found.')
  return (
    <section className="mx-auto max-w-xl px-5 py-32 text-center">
      <p className="font-display text-8xl font-bold text-gold">404</p>
      <h1 className="mt-4 font-display text-4xl font-bold">This lane leads nowhere</h1>
      <p className="mt-3 text-espresso/75">The page you are looking for does not exist. Let us take you back to the table.</p>
      <Link to="/" className="focus-ring mt-8 inline-block rounded-sm bg-brick px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-cream hover:bg-clay">Back home</Link>
    </section>
  )
}
