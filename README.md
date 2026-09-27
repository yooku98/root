# ROOT — portfolio site

Static HTML/CSS portfolio, structured by collection. No build step —
open `index.html` directly in a browser, or serve the folder with any
static host (Netlify, GitHub Pages, S3, etc.).

## Structure

```
index.html                  Homepage: split hero + collections grid
collections/olesie.html     Olesie collection: design grid (photo, write-up, price)
css/style.css               All styling and theme tokens (colors/fonts at the top)
js/slideshow.js             Click-to-open photo viewer for design cards + the Lookbook
images/olesie/              Web-sized photos (WebP, 600w + 1200w each)
  cover-*.webp              Original Pixieset cover shot — used as the homepage hero photo
  banner-*.webp             Homepage Olesie collection-card photo
  hero-*.webp               Not currently referenced (was the old full-bleed hero); safe to delete or repurpose
  design-01..06-*.webp      The first 6 design cards' main photos; each also pulls 1-6
                            extra angles from gallery/highlights/ (see below). Designs
                            07-21 use gallery/highlights/ photos directly, no dedicated
                            cover file.
  gallery/highlights|new/   115 shoot photos total: 81 are grouped into the 21 design
                            cards' slideshows (13 as extra angles for designs 1-6, 68
                            as the sole source for designs 7-21), the other 34 (mostly
                            behind-the-scenes rack shots, plus the whole gallery/new/
                            folder) fill the Lookbook grid
images/brand/               Logo assets derived from the brand-mark JPEG (transparent
                            wordmark + full logo PNGs, favicon, apple-touch icon, 1200x630 share image)
```

## Filling in real content

Everything wrapped in `[placeholder]` needs replacing:

- **Homepage hero** (`index.html`) — the one-paragraph ROOT statement next
  to the cover photo.
- **Homepage collection card** — the one-line tagline and "starting from"
  price teaser under the Olesie card.
- **Collection intro** (`collections/olesie.html`) — what ties the Olesie
  designs together, season/year.
- **Per-design block** — repeated 21x in `collections/olesie.html` as
  `<article class="design-card">`. Each has a photo, a name, a write-up paragraph,
  a price, and up to two tags (e.g. fabric or category). Copy/paste the
  block to add more designs, delete blocks you don't need.
- **Design photos are a slideshow** — every `<img>` inside a `.design-photo`
  div is one angle of that design; clicking the photo opens a full-screen
  viewer cycling through all of them (arrow keys / on-screen arrows, Esc to
  close). To add another angle, add another `<img ... hidden>` inside the
  same `.design-photo` div (see `js/slideshow.js` — it reads every `<img>`
  in the block, the `hidden` attribute just keeps the extra ones out of the
  card's own layout). A "N photos" badge appears automatically once a
  design has more than one image; single-photo designs still open in the
  viewer, just without arrows.
- **Footer** — the short brand blurb, email (currently a placeholder
  `mailto:` link — replace the address), Instagram handle, and studio note,
  in both pages. Each design card has an "Inquire" link to the footer
  (`#contact`); once you have a real email, the footer's `mailto:` link
  covers it.
- **"21 designs"** in the collection intro is hardcoded; update it if you
  add or remove cards.
- **Some designs group several distinct pieces from the same shoot day**
  (e.g. a "two-piece set" card) rather than one exact SKU — check the
  write-up against the actual product before publishing pricing.

## Photos

The Olesie photos were exported from the Pixieset download zip: originals
(2400-2880 px wide, ~1.3 MB each) resized to 600 px and 1200 px WebP. Keep
the originals outside this folder.

To swap a card's photo, export two sizes with the same name pattern and keep
the `srcset`, `width`/`height`, and a descriptive `alt` on the `<img>`. To
change which look a card shows, point its `src`/`srcset` at another file (for
example one from `images/olesie/gallery/`). The `alt` text on each card
describes the current photo; update it if you swap.

The homepage collection-card banner has empty `alt` on purpose (decorative;
the card's name/tagline carry the meaning); the hero photo has a real `alt`
since it's the only image on the page. The Lookbook images have generic
numbered `alt` text; replace it with real descriptions if you can. The first
design card is styled as the featured piece (`design-card--featured`); move
that class to another card to feature a different one.

## Brand assets

The files in `images/brand/` were derived from a compressed 1280 px JPEG of
the logo (colors: caramel `#985f28`, chocolate `#4f3013`), so edges are a
little soft at large sizes. If you get the original vector (SVG/AI/PDF) or a
transparent PNG, swap it in: keep the filenames, or update the header's
`<img>` tag and the favicon links in each page's `<head>`. The footer uses a
plain text "ROOT" wordmark (`.footer-logo`) instead of the image, since the
logo's caramel tone doesn't show up against the footer's dark background —
swap that for an `<img>` too if you get a light/reversed logo variant.

The Open Graph share tags (`og:image`, `og:url`, `twitter:card`) are left
commented out in each page's `<head>` because crawlers require absolute
URLs. Once you know the domain, replace `YOUR-DOMAIN` and uncomment them.

## Adding a new collection

1. Duplicate `collections/olesie.html` to `collections/<slug>.html` and
   update its content.
2. Add a new `images/<slug>/` folder for its photos.
3. In `index.html`, add a new `<a class="collection-card" href="collections/<slug>.html">`
   block inside `.collections-grid` (copy the Olesie one as a template).
4. Add the page to both pages' nav if you want direct links beyond the
   Collections grid.

## Removing the draft banner

Once real content is in, delete the `<div class="build-notice">…</div>`
block from the top of each HTML page, and remove the
`<meta name="robots" content="noindex">` tag from each page's `<head>`
so search engines can index the site.
