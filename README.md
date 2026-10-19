# Devlin Christmas Party 🎄

A static countdown site for the Devlin Christmas Party, built with React + Vite.

## Tune the party details

Edit [`src/partyConfig.js`](src/partyConfig.js) — set the date/time, location, title, and tagline.

## Develop locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Build for deployment

```bash
npm run build
```

This outputs a fully static site to the `dist/` folder. Upload the **contents of `dist/`** to your web host (any static host works: Netlify, Vercel, GitHub Pages, cPanel, S3, etc.).

To preview the production build locally:

```bash
npm run preview
```

### Deploying under a subfolder

If your site lives at `https://example.com/party/` instead of the root, set `base: '/party/'` in [`vite.config.js`](vite.config.js) before building. The default `./` works for most root and relative-path hosts.
