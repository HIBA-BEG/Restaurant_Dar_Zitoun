# Dar Zitoun · Moroccan restaurant showcase website

A front-end-only restaurant website for **Dar Zitoun**, a Moroccan restaurant in Rabat. Warm terracotta and gold palette, zellige-inspired patterns, arch-framed photography and a serif display typeface.

> **DEMO CONTENT.** Dar Zitoun is a **fictional** restaurant created for a portfolio. The address, phone number, email, opening hours, people, history, testimonials and prices (MAD) are invented placeholders. Forms are front-end only: nothing is sent or stored.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: hero, intro, signature dishes, mint-tea band, testimonials, CTA |
| `/menu` | Menu with accessible tabs (Starters, Tajines, Couscous, Desserts), prices in MAD, vegetarian and signature badges |
| `/our-story` | Our Story: philosophy, timeline, values |
| `/gallery` | Photo gallery with keyboard-friendly lightbox and photo credits |
| `/reservation` | Reservation form with validation and a success summary |
| `/contact` | Address, hours, illustrative map, contact form with validation |

## Stack

- Vite + React 19 + TypeScript (strict)
- Tailwind CSS v4 (`@tailwindcss/vite`)
- React Router v7
- Fonts via `@fontsource`: Playfair Display and Nunito Sans (self-hosted)
- No backend, no API calls, no analytics

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check (tsc -b) + production build into dist/
npm run preview   # serve the production build locally
```

## Deployment (Vercel)

`vercel.json` contains a single-page-app rewrite so deep links such as `/menu` work after a refresh. Import the repo in Vercel (framework preset: Vite, build command `npm run build`, output directory `dist`), or run `vercel --prod`.

## Images and credits

All photos are stored locally in `public/images` (no hotlinking), resized and compressed to under 200 KB each. They come from **Wikimedia Commons** under Creative Commons licences (CC BY, CC BY-SA, CC0). Author, title, licence and source links are listed in `src/data/credits.ts` and shown on the Gallery page (`/gallery#credits`). Keep the credits if you reuse the photos. Replace the photos with the client's own for a real project.

## Accessibility and SEO

Semantic landmarks, skip link, labelled form fields with inline error messages, ARIA tabs, focus styles, `prefers-reduced-motion` support, alt text on every image, per-page `<title>` and meta description, Open Graph tags, SVG favicon and `robots.txt`.
