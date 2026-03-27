# MendAI Labs — Website

Company website for [MendAI Labs](https://mendailabs.com), a Montreal-based AI startup automating advanced spectrometry instruments to enable a new generation of precision diagnostics.

## Structure

```
mendai-website/
├── index.html                          ← Main site
├── publications.html                   ← Publications page
├── mendai_data_excellence_section.html ← Data Philosophy page
├── README.md
└── assets/
    ├── css/
    │   ├── style.css        ← shared styles (nav, layout, components)
    │   └── animations.css   ← scroll/entrance animations
    ├── js/
    │   ├── main.js          ← nav scroll behaviour, shared JS
    │   └── publications.js  ← renders publications from JSON
    ├── data/
    │   ├── publications-data.js  ← edit this to add/update publications
    │   └── publications.json     ← reference copy (not loaded by the site)
    ├── images/
    │   ├── logo.png
    │   ├── paul.jpg · guillaume.jpg
    │   ├── prism.png · helix.png · genesis.png
    │   ├── jc.png · alb.png · al.jpeg · su2.jpg
    │   ├── mila.png · ivado.png · centech.png
    │   ├── su.png · udm.png · x.png · aphp.png
    │   └── bg.png
    └── mendai_camera_analogy_section.html  ← standalone prototype (integrated into Data Philosophy)
```

## Stack

Static HTML/CSS/JS — no framework, no build step required.

## Pages

- **`index.html`** — Main site: Mission · Data Philosophy teaser · Solution (PRISM / HELIX / GENESIS cycle diagram) · Team · Milestones · Contact
- **`publications.html`** — Publications list, dynamically rendered from `assets/data/publications-data.js`
- **`mendai_data_excellence_section.html`** — Data Philosophy: Our Vision · The Challenge · Camera analogy (interactive canvas) · Our Solution (Helix features) · The MendAI Advantage

All three pages share the same nav, colour scheme (Inter · `#2563EB` blue · white background) and `assets/css/style.css`.

## Adding a publication

Edit `assets/data/publications-data.js` only — no HTML or JS changes needed.

Each entry follows this schema:

```json
{
  "journal": "Nature",
  "journalStyle": "blue",
  "year": 2026,
  "title": "Publication title",
  "titleNote": null,
  "authors": "First Author, **Guillaume Bachelot**, Last Author",
  "meta": [
    { "text": "Vol(No):pages",  "type": "badge" },
    { "text": "PMID XXXXXXXX", "type": "badge" },
    { "text": "Open Access",   "type": "oa" },
    { "text": "↗ DOI", "type": "link", "href": "https://doi.org/..." }
  ]
}
```

**Fields:**

| Field | Values |
|---|---|
| `journalStyle` | `"blue"` (journals) · `"orange"` (arXiv, conferences) |
| `titleNote` | `null` or a string shown in italics: `"Review"`, `"Clinical Trial"`, `"Article in French"`, … |
| `authors` | Plain string — wrap a name in `**double stars**` to bold it |
| `meta[].type` | `"badge"` (grey) · `"oa"` (green) · `"pre"` (brown, preprints) · `"link"` (clickable) |

## Live

Hosted via GitHub Pages: `https://guillaumebachelot.github.io/MendAI/`

## Contact

hello@mendailabs.com
