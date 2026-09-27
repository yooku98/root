# ROOT — portfolio site

Static HTML/CSS portfolio, structured by collection. No build step —
open `index.html` directly in a browser, or serve the folder with any
static host (Netlify, GitHub Pages, S3, etc.).

## Structure

```
index.html                  Homepage: intro + collections grid
collections/olesie.html     Olesie collection: design grid (photo, write-up, price)
css/style.css               All styling and theme tokens (colors/fonts at the top)
images/olesie/              Web-sized photos (WebP, 600w + 1200w each)
  hero-*.webp               Homepage hero photo
  banner-*.webp             Homepage Olesie collection banner
  cover-*.webp              Original Pixieset cover shot (currently unused; handy as a share-preview image)
  design-01..06-*.webp      The six design cards on the collection page
  gallery/highlights|new/   Remaining shoot photos, shown in the Lookbook on the collection page
images/brand/               Logo assets derived from the brand-mark JPEG (transparent
                            wordmark + full logo PNGs, favicon, apple-touch icon, 1200x630 share image)
```

## Filling in real content

Everything wrapped in `[placeholder]` needs replacing:

- **Homepage intro** (`index.html`) — the one-paragraph ROOT statement.
- **Collection intro** (`collections/olesie.html`) — what ties the Olesie
  designs together, season/year.
- **Per-design block** — repeated 6x in `collections/olesie.html` as
  `<article class="design-card">`. Each has a photo, a name, a write-up paragraph,
  a price, and up to two tags (e.g. fabric or category). Copy/paste the
  block to add more designs, delete blocks you don't need.
- **Footer contact info** — email and Instagram handle, in both pages. Each
  design card has an "Inquire" link to the footer (`#contact`); once you have
  an email address, change it to a `mailto:` link (and link the footer email
  the same way) so visitors can enquire about a piece.
- **"6 designs"** in the collection intro is hardcoded; update it if you
  add or remove cards.

## Photos

The Olesie photos were exported from the Pixieset download zip: originals
(2400-2880 px wide, ~1.3 MB each) resized to 600 px and 1200 px WebP. Keep
the originals outside this folder.

To swap a card's photo, export two sizes with the same name pattern and keep
the `srcset`, `width`/`height`, and a descriptive `alt` on the `<img>`. To
change which look a card shows, point its `src`/`srcset` at another file (for
example one from `images/olesie/gallery/`). The `alt` text on each card
describes the current photo; update it if you swap.

The homepage hero and banner have empty `alt` on purpose (decorative; the
title and card label carry the meaning). The Lookbook images have generic
numbered `alt` text; replace it with real descriptions if you can. The first
design card is styled as the featured piece (`design-card--featured`); move
that class to another card to feature a different one.

## Brand assets

The files in `images/brand/` were derived from a compressed 1280 px JPEG of
the logo (colors: caramel `#985f28`, chocolate `#4f3013`), so edges are a
little soft at large sizes. If you get the original vector (SVG/AI/PDF) or a
transparent PNG, swap it in: keep the filenames, or update the `<img>` tags
(header wordmark, homepage brand band) and the favicon links in each page's
`<head>`.

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
