import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { categories, formatMAD } from '../data/menu'
import type { CategoryId } from '../data/menu'
import { ArchImage, PageHero } from '../components/ui'
import { usePageMeta } from '../hooks'

export default function Menu() {
  usePageMeta('Menu | Dar Zitoun, Moroccan Restaurant in Rabat', 'Starters, tajines, couscous and desserts at Dar Zitoun, with prices in MAD. Vegetarian options available.')
  const [active, setActive] = useState<CategoryId>('starters')
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const category = categories.find((c) => c.id === active)!

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next = index
    if (e.key === 'ArrowRight') next = (index + 1) % categories.length
    else if (e.key === 'ArrowLeft') next = (index - 1 + categories.length) % categories.length
    else return
    e.preventDefault()
    const id = categories[next].id
    setActive(id)
    tabRefs.current[id]?.focus()
  }

  return (
    <>
      <PageHero eyebrow="Our menu" title="Taste of the house" subtitle="Cooked to order with seasonal produce. Prices in Moroccan dirhams, service included." />
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div role="tablist" aria-label="Menu categories" className="mx-auto flex max-w-2xl flex-wrap justify-center gap-2 border-b-2 border-gold/40 pb-0 sm:flex-nowrap">
          {categories.map((c, i) => (
            <button key={c.id} ref={(el) => { tabRefs.current[c.id] = el }} role="tab" id={`tab-${c.id}`} aria-selected={active === c.id} aria-controls={`panel-${c.id}`} tabIndex={active === c.id ? 0 : -1}
              onClick={() => setActive(c.id)} onKeyDown={(e) => onKeyDown(e, i)}
              className={`focus-ring -mb-0.5 flex-1 border-b-4 px-4 py-4 font-display text-xl font-bold transition ${active === c.id ? 'border-clay text-clay' : 'border-transparent text-espresso/60 hover:text-espresso'}`}>
              {c.label}
            </button>
          ))}
        </div>

        <div role="tabpanel" id={`panel-${category.id}`} aria-labelledby={`tab-${category.id}`} className="mt-14 grid gap-14 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="font-display text-2xl italic leading-snug text-brick">{category.intro}</p>
            <ul className="mt-10 space-y-8">
              {category.items.map((item) => (
                <li key={item.name}>
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-display text-2xl font-bold">{item.name}</h3>
                    {item.signature && <span className="rounded-full bg-gold/25 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-brick">Signature</span>}
                    {item.vegetarian && <span className="rounded-full bg-zellige/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-zellige">Vegetarian</span>}
                    <span className="menu-leader" aria-hidden="true" />
                    <span className="whitespace-nowrap text-lg font-bold text-clay">{formatMAD(item.price)}</span>
                  </div>
                  <p className="mt-1 max-w-xl text-espresso/75">{item.description}{item.arabic && <span lang="ar" dir="rtl" className="ml-2 font-display text-gold"> {item.arabic}</span>}</p>
                </li>
              ))}
            </ul>
          </div>
          <aside className="order-first lg:order-last">
            <ArchImage src={category.image} alt={category.alt} className="mx-auto aspect-[3/4] w-full max-w-xs lg:sticky lg:top-28" />
          </aside>
        </div>

        <div className="mt-20 border-2 border-gold/50 bg-sand p-8 text-center">
          <p className="font-display text-2xl font-bold">Allergies or dietary needs?</p>
          <p className="mx-auto mt-2 max-w-xl text-espresso/75">Tell us when you book and the kitchen will adapt. Most starters and tajines can be made gluten-free or vegan.</p>
          <Link to="/reservation" className="focus-ring mt-6 inline-block rounded-sm bg-brick px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-cream hover:bg-clay">Book a table</Link>
        </div>
      </section>
    </>
  )
}
