# Rahul Agarwal — portfolio site

A static site with no build step. Open `index.html` through any static host (GitHub Pages, Netlify, Vercel) or run `python3 -m http.server` in this folder.

## Editing content

- **Works, carousel lines, settings** (resume link, carousel autoplay and reading speed, contact colour): `content.js`.
- **Intro, artist statement, contact details**: `index.html`. The statement's first paragraph appears twice (the section preview and the full statement page), so edit both.
- **Portrait**: `assets/photo_2026-03-10_22-39-06.jpg.png`, set in the `<img>` inside `.portrait` in `index.html`. Its crop is `object-position` on `.portrait img` in `styles.css`.
- **Resume**: `assets/Writing_Resume.pdf`. To use a different file or a link, change `resumeUrl` in `content.js`.

The full statement opens at `#artist-statement`, so you can link to it directly.
