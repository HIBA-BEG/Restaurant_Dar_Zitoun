import { Link } from 'react-router-dom'
import { ArchImage, PageHero, SectionTitle } from '../components/ui'
import { usePageMeta } from '../hooks'

const timeline = [
  { year: '1962', title: 'A family house', text: 'Hajj Idriss and Lalla Zineb Benkirane move into a small riad on Derb El Zitoun, planting an olive tree in the courtyard.' },
  { year: '1989', title: 'Sunday lunches', text: 'Neighbours start dropping in on Sundays. Zineb’s tajines become the talk of the Kasbah and the dining room fills week after week.' },
  { year: '2008', title: 'Second generation', text: 'Their granddaughter Nadia trains in Fès and Lyon, then returns to cook beside her grandmother and write the recipes down.' },
  { year: '2023', title: 'Dar Zitoun opens', text: 'After two years of restoration by local artisans, the riad welcomes its first guests as a restaurant. The olive tree is still there.' },
]

const values = [
  { title: 'Patient cooking', text: 'Tajines simmer for hours, bread is baked at dawn, and nothing is rushed.' },
  { title: 'Local produce', text: 'Vegetables from the Salé market, fish from the port and spices from the medina.' },
  { title: 'Made by hand', text: 'Zellige by Fès craftsmen, lanterns from Marrakech, couscous rolled in our kitchen.' },
]

export default function Story() {
  usePageMeta('Our Story | Dar Zitoun, Rabat', 'The story of Dar Zitoun, a family riad in the Kasbah of Rabat turned into a Moroccan restaurant. Demo project.')
  return (
    <>
      <PageHero eyebrow="Our story" title="From family house to your table" subtitle="Three generations, one olive tree and a lot of tea." />

      <section className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 md:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl font-bold leading-tight">Cooking the way grandmother did</h2>
          <p className="mt-6 text-lg leading-relaxed text-espresso/80">Dar Zitoun began as a family kitchen and still feels like one. Our recipes come from handwritten notebooks, measured in glasses of oil and handfuls of spice rather than grams.</p>
          <p className="mt-4 text-lg leading-relaxed text-espresso/80">We keep the menu short, change it with the seasons, and cook everything to order. If a dish isn’t at its best, it isn’t on the table.</p>
          <blockquote className="mt-8 border-l-4 border-gold pl-6 font-display text-2xl italic leading-snug text-brick">“A tajine is ready when the house smells like a feast.”<footer className="mt-2 text-sm not-italic font-bold uppercase tracking-widest text-clay">Lalla Zineb</footer></blockquote>
        </div>
        <ArchImage src="/images/artisan-lamp.jpg" alt="An artisan cutting traditional patterns into a metal lantern" className="mx-auto aspect-[4/5] w-full max-w-md" />
      </section>

      <section className="relative overflow-hidden bg-espresso py-24 text-cream">
        <div className="zellige-gold absolute inset-0 opacity-[0.07]" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-5">
          <SectionTitle eyebrow="Timeline" title="A house with a history" light />
          <ol className="relative mt-16 space-y-12 border-l-2 border-gold/50 pl-8">
            {timeline.map((t) => (
              <li key={t.year} className="relative">
                <span className="absolute -left-[41px] top-1.5 h-4 w-4 rotate-45 border-2 border-gold bg-espresso" aria-hidden="true" />
                <p className="font-display text-4xl font-bold text-gold-light">{t.year}</p>
                <h3 className="mt-1 font-display text-2xl font-bold">{t.title}</h3>
                <p className="mt-2 max-w-xl text-sand/80">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24">
        <SectionTitle eyebrow="What we care about" title="Three promises" />
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {values.map((v, i) => (
            <div key={v.title} className="border border-gold/50 bg-white p-8 text-center">
              <p className="font-display text-5xl font-bold text-gold">0{i + 1}</p>
              <h3 className="mt-3 font-display text-2xl font-bold">{v.title}</h3>
              <p className="mt-2 text-espresso/75">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <img src="/images/spices.jpg" alt="Colourful pyramids of spices at a souk stall" loading="lazy" className="h-72 w-full object-cover md:h-full" />
        <div className="bg-sand p-12 md:p-20">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Come and meet the family</h2>
          <p className="mt-4 max-w-md text-lg text-espresso/80">Nadia and Lalla Zineb are in the kitchen every service. Say hello, and ask for the off-menu dish of the day.</p>
          <Link to="/reservation" className="focus-ring mt-8 inline-block rounded-sm bg-brick px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-cream hover:bg-clay">Reserve a table</Link>
        </div>
      </section>
    </>
  )
}
