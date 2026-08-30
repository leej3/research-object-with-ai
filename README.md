# Research objects with AI

Playful rapid-fire slides for a 10–15 minute New York AI Toastmasters educational talk about AI collaboration, open science, the Center for Open Neuroscience, and the STAMPED principles.

View the public, unauthenticated deck at [research-object-with-ai.pages.dev](https://research-object-with-ai.pages.dev/).

## View locally

Serve the static `site/` directory with any local web server.
The deck supports arrow keys, space, touch swipes, URL hashes, and fullscreen mode (`F`).

The editable PowerPoint is built at `dist/research-objects-with-ai.pptx` and is also included as a download in the published site.

## Licensing

This project follows the [REUSE specification](https://reuse.software/) for machine-readable copyright and licensing information.

- Creative content, including slides, prose, and original generated illustrations, is © 2025–2026 John Lee and licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- Code and machine-readable site/build configuration are © 2025–2026 John Lee and licensed under the [MIT License](https://spdx.org/licenses/MIT.html).
- The supplied Center for Open Neuroscience and STAMPED marks are excluded from those grants.
  Their sources and exception are recorded in `LICENSES/LicenseRef-External-Marks.txt`; no trademark permission is granted.

Full license texts and path-level annotations are in `LICENSES/` and `REUSE.toml`.
Verify the project with `reuse lint` (also run by pre-commit).

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
