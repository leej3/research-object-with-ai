# Research objects with AI

Playful rapid-fire slides for a 10–15 minute New York AI Toastmasters educational talk about AI collaboration, open science, the Center for Open Neuroscience, and the STAMPED principles.

View the public, unauthenticated deck at [research-object-with-ai.pages.dev](https://research-object-with-ai.pages.dev/).

## View locally

Serve the static `site/` directory with any local web server.
The deck supports arrow keys, space, touch swipes, URL hashes, and fullscreen mode (`F`).

The editable PowerPoint is built at `dist/research-objects-with-ai.pptx` and is also included as a download in the published site.

## Source material

- `docs/talk-concept.md` — narrative and design brief
- `.build/slides/build-deck.mjs` — PowerPoint and slide-image builder
- `assets/` — official marks and original generated illustrations
- `site/` — public unauthenticated web presenter

## Publishing

The `site/` directory is a static public site.
It contains no authentication, server-side code, analytics, or data collection.
It can be deployed directly to Cloudflare Pages:

```bash
npx wrangler pages deploy site --project-name=research-object-with-ai
```
