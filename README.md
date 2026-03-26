# MendAI Labs — Website

Company website for [MendAI Labs](https://mendailabs.com), a Montreal-based AI startup automating advanced spectrometry instruments to enable a new generation of precision diagnostics.

## Structure

```
mendai-website/
├── index.html
├── publications.html
├── README.md
└── assets/
    ├── css/
    │   ├── style.css
    │   └── animations.css
    ├── js/
    │   ├── main.js
    │   └── publications.js
    ├── data/
    │   ├── publications-data.js   ← edit this to add/update publications
    │   └── publications.json      ← reference copy (not loaded by the site)
    └── images/
        ├── logo.png
        ├── paul.jpg
        ├── guillaume.jpg
        ├── prism.png
        ├── helix.png
        ├── genesis.png
        ├── mila.png
        ├── ivado.png
        ├── centech.png
        ├── aphp.png
        ├── su.png
        ├── udm.png
        └── x.png
```

## Stack

Static HTML/CSS/JS — no framework, no build step required.

## Pages

- **`index.html`** — Main one-page site (Mission, Solution, Team, Milestones, Contact)
- **`publications.html`** — Publications list, dynamically rendered from `assets/data/publications.json`

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
| `authors` | Plain string — wrap the main author's name in `**double stars**` to bold it |
| `meta[].type` | `"badge"` (grey) · `"oa"` (green) · `"pre"` (brown, preprints) · `"link"` (clickable) |

## Live

Hosted via GitHub Pages: `https://guillaumebachelot.github.io/MendAI/`

## Contact

hello@mendailabs.com
