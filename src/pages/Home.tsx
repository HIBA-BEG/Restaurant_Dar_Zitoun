import { Link } from 'react-router-dom'
import { ArchImage, SectionTitle, Star } from '../components/ui'
import { usePageMeta } from '../hooks'
import { restaurant } from '../data/restaurant'

const signature = [
  { name: 'Chicken, preserved lemon & olives', price: '135 MAD', img: '/images/tagine-chicken.jpg', alt: 'Chicken tajine with golden saffron sauce and olives', text: 'Saffron, violet olives and lemons we preserve ourselves each winter.' },
  { name: 'Couscous Royal', price: '175 MAD', img: '/images/couscous-royal.jpg', alt: 'Couscous topped with vegetables and chickpeas', text: 'Hand-rolled semolina steamed three times, seven vegetables, lamb and merguez.' },
  { name: 'Pastilla au poulet', price: '85 MAD', img: '/images/pastilla.jpg', alt: 'A chicken pastilla dusted with icing sugar and cinnamon', text: 'Crisp warqa pastry, almonds and cinnamon, sweet and savoury at once.' },
]

const reviews = [
  { quote: 'The lamb with prunes tasted like Sunday at my grandmother’s. We stayed three hours.', who: 'Salma, Agdal' },
  { quote: 'Candlelight in the courtyard, perfect mint tea and a very kind team. Book ahead.', who: 'Thomas, visiting from Lyon' },
  { quote: 'Finally a restaurant in Rabat where the couscous is steamed properly.', who: 'Youssef, Souissi' },
]

export default function Home() {
  usePageMeta('Dar Zitoun | Moroccan Restaurant in Rabat', 'Tajines, couscous and pastries in a restored riad in the Kasbah of Rabat. Reserve a table at Dar Zitoun. Demo project.')
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[78vh] items-center overflow-hidden bg-espresso">
        <img src="/images/hero-lanterns.jpg" alt="Hanging brass lanterns glowing warmly in a Moroccan souk" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-espresso/90 via-espresso/55 to-transparent" aria-hidden="true" />
        <div className="mx-auto w-full max-w-7xl px-5 py-24">
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.4em] text-gold-light"><Star /> Marhba · مرحبا</p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-bold leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
            A Moroccan table in the <em className="font-medium text-gold-light">heart of Rabat</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-sand/90">
            Clay-pot tajines, hand-rolled couscous and mint tea poured from a height, inside a lantern-lit riad beside the Kasbah.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link to="/reservation" className="focus-ring rounded-sm bg-gold px-8 py-4 text-sm font-bold uppercase tracking-widest text-espresso transition hover:bg-gold-light">Reserve a table</Link>
            <Link to="/menu" className="focus-ring rounded-sm border-2 border-gold-light px-8 py-4 text-sm font-bold uppercase tracking-widest text-gold-light transition hover:bg-gold-light hover:text-espresso">See the menu</Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="relative overflow-hidden py-24">
        <div className="zellige-dark absolute inset-0 opacity-[0.04]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-2">
          <ArchImage src="/images/riad.jpg" alt="Arched gallery around the courtyard of a Moroccan riad" className="mx-auto aspect-[3/4] w-full max-w-md" />
          <div>
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.4em] text-clay"><Star /> Welcome to Dar Zitoun</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">A house of olives, spice and slow cooking</h2>
            <p className="mt-6 text-lg leading-relaxed text-espresso/80">“Dar” means house, and “zitoun” means olive. Our riad was once a family home, and the kitchen still follows the family’s way: small pots, patient fires and generous plates.</p>
            <p className="mt-4 text-lg leading-relaxed text-espresso/80">Everything is cooked each morning with produce from the Salé market and spices from the medina. Come hungry, stay for tea.</p>
            <Link to="/our-story" className="focus-ring mt-8 inline-flex items-center gap-2 border-b-2 border-gold pb-1 font-bold uppercase tracking-widest text-brick hover:text-clay">Read our story <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      {/* Signature dishes */}
      <section className="bg-sand py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle eyebrow="From our kitchen" title="Three dishes we are known for">Ask anyone in the Kasbah. These are the plates our guests come back for.</SectionTitle>
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {signature.map((d) => (
              <article key={d.name} className="text-center">
                <ArchImage src={d.img} alt={d.alt} className="mx-auto aspect-[4/5] w-full max-w-xs" />
                <h3 className="mt-6 font-display text-2xl font-bold">{d.name}</h3>
                <p className="mt-1 font-bold text-clay">{d.price}</p>
                <p className="mx-auto mt-2 max-w-xs text-espresso/75">{d.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link to="/menu" className="focus-ring inline-block rounded-sm bg-brick px-8 py-4 text-sm font-bold uppercase tracking-widest text-cream transition hover:bg-clay">Full menu</Link>
          </div>
        </div>
      </section>

      {/* Tea band */}
      <section className="relative isolate overflow-hidden bg-brick text-cream">
        <div className="zellige-gold absolute inset-0 -z-10 opacity-15" aria-hidden="true" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2">
          <div>
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.4em] text-gold-light"><Star /> The ritual</p>
            <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">Mint tea, poured three times</h2>
            <p className="mt-5 text-lg leading-relaxed text-sand/85">The first glass is gentle as life, the second strong as love, the third bitter as death. Every table at Dar Zitoun finishes with a silver pot of fresh mint tea, on us.</p>
          </div>
          <img src="/images/mint-tea.jpg" alt="Silver teapot, tea glasses and sweets on a tray" loading="lazy" className="aspect-[4/3] w-full rounded-sm border-4 border-gold/70 object-cover shadow-2xl" />
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle eyebrow="Kind words" title="Around our table" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.who} className="relative border border-gold/50 bg-white p-8">
                <span className="absolute -top-5 left-6 font-display text-6xl leading-none text-gold" aria-hidden="true">“</span>
                <blockquote className="font-display text-xl italic leading-snug">{r.quote}</blockquote>
                <figcaption className="mt-5 text-sm font-bold uppercase tracking-widest text-clay">{r.who}</figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-espresso/50">Demo testimonials written for this showcase project.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-espresso py-20 text-center text-cream">
        <div className="zellige-gold absolute inset-0 opacity-[0.08]" aria-hidden="true" />
        <div className="relative mx-auto max-w-2xl px-5">
          <h2 className="font-display text-4xl font-bold md:text-5xl">Your table is waiting</h2>
          <p className="mt-4 text-lg text-sand/80">Open Tuesday to Sunday. {restaurant.address[0]}, {restaurant.address[1]}.</p>
          <Link to="/reservation" className="focus-ring mt-8 inline-block rounded-sm bg-gold px-10 py-4 text-sm font-bold uppercase tracking-widest text-espresso transition hover:bg-gold-light">Reserve now</Link>
        </div>
      </section>
    </>
  )
}
