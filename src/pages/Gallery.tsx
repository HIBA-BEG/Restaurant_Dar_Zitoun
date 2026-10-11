import { useCallback, useEffect, useRef, useState } from 'react'
import { galleryImages } from '../data/gallery'
import { credits } from '../data/credits'
import { PageHero } from '../components/ui'
import { usePageMeta } from '../hooks'

export default function Gallery() {
  usePageMeta('Gallery | Dar Zitoun, Rabat', 'Photos of Moroccan tajines, couscous, pastries and the riad atmosphere at Dar Zitoun. Demo project.')
  const [index, setIndex] = useState<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)

  const close = useCallback(() => {
    setIndex(null)
    lastFocus.current?.focus()
  }, [])
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + galleryImages.length) % galleryImages.length)), [])

  useEffect(() => {
    if (index === null) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [index, close, step])

  const current = index !== null ? galleryImages[index] : null

  return (
    <>
      <PageHero eyebrow="Gallery" title="Colour, spice and light" subtitle="A glimpse of the table, the riad and the Morocco that inspires us." />
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {galleryImages.map((img, i) => (
            <button key={img.src} type="button" onClick={(e) => { lastFocus.current = e.currentTarget; setIndex(i) }}
              className="focus-ring group relative mb-4 block w-full overflow-hidden border-4 border-gold/60 bg-sand" aria-label={`Open photo: ${img.alt}`}>
              <img src={img.src} alt={img.alt} loading="lazy" className={`w-full object-cover transition duration-500 group-hover:scale-105 ${img.tall ? 'aspect-[4/5]' : 'aspect-[4/3]'}`} />
              <span className="absolute inset-0 bg-brick/0 transition group-hover:bg-brick/20" aria-hidden="true" />
            </button>
          ))}
        </div>

        <div id="credits" className="mt-20 border-t border-gold/40 pt-10">
          <h2 className="font-display text-2xl font-bold">Photo credits</h2>
          <p className="mt-2 max-w-3xl text-sm text-espresso/70">Images are from Wikimedia Commons under Creative Commons licences. Thanks to the photographers. This is a demo website; the restaurant is fictional.</p>
          <ul className="mt-5 grid gap-x-8 gap-y-1.5 text-xs text-espresso/70 md:grid-cols-2">
            {credits.map((c) => (
              <li key={c.file}><a className="underline hover:text-clay" href={c.url} target="_blank" rel="noreferrer">{c.title}</a> by {c.author} ({c.license})</li>
            ))}
          </ul>
        </div>
      </section>

      {current && (
        <div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/95 p-4" onClick={close}>
          <button ref={closeRef} type="button" onClick={close} aria-label="Close" className="focus-ring absolute right-4 top-4 rounded-full bg-cream/10 p-3 text-cream hover:bg-cream/20">
            <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"><path d="M5 5l14 14M19 5L5 19" /></svg>
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); step(-1) }} aria-label="Previous photo" className="focus-ring absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-cream/10 p-3 text-2xl text-cream hover:bg-cream/20">‹</button>
          <button type="button" onClick={(e) => { e.stopPropagation(); step(1) }} aria-label="Next photo" className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-cream/10 p-3 text-2xl text-cream hover:bg-cream/20">›</button>
          <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={current.src} alt={current.alt} className="max-h-[80vh] w-auto max-w-full border-4 border-gold/70 object-contain" />
            <figcaption className="mt-3 text-center text-sm text-sand/80">{current.alt}</figcaption>
          </figure>
        </div>
      )}
    </>
  )
}
