# Research objects with AI

Playful rapid-fire slides for a 10–15 minute New York AI Toastmasters educational talk about AI-assisted knowledge artifacts, open science, the Center for Open Neuroscience, and the STAMPED principles.

The last published version is available without authentication at [research-object-with-ai.pages.dev](https://research-object-with-ai.pages.dev/).

## View locally

Serve the static `site/` directory with any local web server.
The deck supports arrow keys, space, touch swipes, URL hashes, fullscreen mode (`F`), and presenter notes (`N`).
The site also includes a readable, printable transcript and storyboard.

## Edit the talk

Edit `site/content.md`.
Each table row is one slide, in order:

- **Spoken** is what the speaker says.
- **Words** contains only words shown to the audience.
- **Image** contains only the image path, when the slide uses one.
- **Notes** contains intent, pacing, section, and other human guidance.

`site/deck.js` contains the corresponding presentation treatment in the same order: layout, hierarchy, color, scale, positioning, and image treatment.
The content table contains no HTML or line-break instructions; those divisions are also stored in `site/deck.js`.
Both the slide view and transcript load the Markdown table directly, so there is no second copy of the talk content to keep synchronized.

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
- `docs/core.md` — core argument and narrative guardrails
- `docs/lessig-method.md` — presentation method reference
- `docs/sources.md` — research, visual sources, and asset provenance
- `site/content.md` — editable table containing the speech, screen content, and human notes; this is the editorial source of truth
- `site/deck.js` — layouts, colors, and other presentation treatment
- `site/app.js` and `site/styles.css` — public unauthenticated web presenter
- `site/transcript.html` — accessible transcript and storyboard view
- `site/assets/` — supplied marks and original generated illustrations

## Publishing

The `site/` directory is a static public site.
It contains no authentication, server-side code, analytics, or data collection.
It can be deployed directly to Cloudflare Pages:

```bash
npx wrangler pages deploy site --project-name=research-object-with-ai
```
