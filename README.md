# Rahul Agarwal — portfolio site

A static site with no build step. Open `index.html` through any static host (GitHub Pages, Netlify, Vercel) or run `python3 -m http.server` in this folder.

## Editing content

- **Works, carousel lines, settings** (resume link, carousel autoplay and reading speed, contact colour): `content.js`.
- **Intro, artist statement, contact details**: `index.html`. The statement's first paragraph appears twice (the section preview and the full statement page), so edit both.
- **Portrait**: `assets/photo_2026-03-10_22-39-06.jpg.png`, set in the `<img>` inside `.portrait` in `index.html`. Its crop is `object-position` on `.portrait img` in `styles.css`.
- **Resume**: put `resume.pdf` in this folder, or set `resumeUrl` in `content.js` to a link.

The full statement opens at `#artist-statement`, so you can link to it directly.
