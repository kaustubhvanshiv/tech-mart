# Tech Mart Shop

A modern, responsive landing page for a gadget store built with plain HTML and CSS.

## What Was Upgraded

- Fixed stylesheet linking (`index.html` now uses `styles.css`)
- Redesigned layout with a cleaner structure:
  - sticky-style glass header
  - hero section with call-to-actions and metrics
  - product grid with richer product cards
  - footer section
- Improved visual design:
  - custom color system with CSS variables
  - expressive typography (`Sora` and `Space Grotesk`)
  - gradient + radial background effects
  - hover interactions and entry animations
- Improved responsiveness:
  - desktop, tablet, and mobile breakpoints
  - product grid adapts from 4 -> 2 -> 1 columns

## Project Structure

- `index.html` - page markup
- `styles.css` - complete styling and responsive behavior

## Run Locally

This project is static, so you can open `index.html` directly in your browser.

Optional local server:

```bash
python3 -m http.server 5500
```

Then open: `http://localhost:5500`

## GitHub Remote

This workspace is connected to:

- `origin`: `https://github.com/kaustubhvanshiv/tech-mart.git`

If needed, push updates with:

```bash
git add .
git commit -m "Upgrade Tech Mart UI and README"
git push origin main
```
