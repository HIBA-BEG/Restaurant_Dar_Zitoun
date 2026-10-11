import type { ReactNode } from 'react'

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.4em] ${light ? 'text-gold-light' : 'text-clay'}`}>
      <Star /> {children} <Star />
    </p>
  )
}

export function Star({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="shrink-0" fill="currentColor">
      <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
    </svg>
  )
}

export function SectionTitle({ eyebrow, title, light = false, children }: { eyebrow: string; title: string; light?: boolean; children?: ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2 className={`mt-4 font-display text-4xl font-bold leading-tight md:text-5xl ${light ? 'text-cream' : 'text-espresso'}`}>{title}</h2>
      {children && <p className={`mt-4 text-lg leading-relaxed ${light ? 'text-sand/80' : 'text-espresso/75'}`}>{children}</p>}
    </div>
  )
}

export function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <section className="relative overflow-hidden bg-brick py-20 text-center text-cream md:py-28">
      <div className="zellige-gold absolute inset-0 opacity-20" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-brick/30 via-transparent to-espresso/50" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-5">
        <Eyebrow light>{eyebrow}</Eyebrow>
        <h1 className="mt-5 font-display text-5xl font-bold md:text-6xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-sand/85">{subtitle}</p>
      </div>
    </section>
  )
}

/** Image framed in a Moroccan arch */
export function ArchImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-t-[999px] border-[6px] border-gold/70 bg-sand p-1.5 shadow-xl ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="h-full w-full rounded-t-[999px] object-cover" />
    </div>
  )
}

export function Field({ id, label, error, children, hint }: { id: string; label: string; error?: string; children: ReactNode; hint?: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold uppercase tracking-wider text-espresso/80">{label}</label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-espresso/60">{hint}</p>}
      {error && <p id={`${id}-error`} role="alert" className="mt-1 text-sm font-semibold text-red-700">{error}</p>}
    </div>
  )
}

export const inputCls = (error?: string) =>
  `w-full rounded-sm border-2 bg-white px-4 py-3 text-espresso outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/25 ${error ? 'border-red-600' : 'border-sand'}`
