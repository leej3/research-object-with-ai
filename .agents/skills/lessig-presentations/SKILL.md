---
name: lessig-presentations
description: Plan, develop, refine, or review source-controlled Lawrence Lessig-style presentations with tightly synchronized speech and slides. Use for Lessig-style narrative planning and for editing this project's web deck; do not route ordinary minimal slide decks here solely because they use sparse design.
---

# Lessig Presentations

Create a coherent spoken argument whose visual sequence acts as synchronized rhetoric.
Each screen should perform one clear job at the moment when that job matters.
Use the planning guidance for the talk's argument and sequence; use the deck-development guidance when implementing or editing the presentation.

## Planning

### Method essentials

The Lessig method is an observed presentation style, not a formal standard or a fixed-timing format.
It uses many simple screens in close synchronization with a rehearsed speech.
The speech carries the argument; each screen carries the present rhetorical beat; a sequence creates movement, contrast, accumulation, and recall.

Do not imitate only the visible surface.
“One word per slide” and “rapid-fire slides” are possible techniques, not the purpose.
The purpose is precise control of attention.
A slide may contain a word, image, number, quotation, document detail, diagram, or blank field, provided it performs one clear job at the moment when that job matters.

The method is not PechaKucha, a teleprompter, a ban on evidence, or constant speed.
Effective talks accelerate, pause, repeat, and stop.
They leave complex evidence visible long enough to inspect and can abandon the screen entirely when attention should return to the speaker.

Before substantive planning or review, inspect any project brief, talk concept, audience description, or existing storyboard relevant to the request.
Preserve the user's chosen subject, delivery format, and publication boundaries.

### Planning workflow

1. Establish the audience, duration, central tension, intended change in understanding, and final portable thought.
2. Write or refine the spoken through-line before styling slides.
3. Divide the speech into meaningful beats.
   Do not create a slide for every clause mechanically.
4. Assign each beat a visual function such as identify, emphasize, compare, prove, foreshadow, summarize, amuse, pause, or recall.
5. Storyboard sequences rather than designing isolated slides.
   Give each sequence a setup, development, and resolution.
6. Use words, images, quotations, diagrams, callbacks, and blank screens only when they perform a specific rhetorical job.
7. Vary tempo.
   Fast runs can create energy or comic escalation; slower screens support evidence, unfamiliar terms, reflection, and rest.
8. Make playfulness serve recognition and argument.
   Literal metaphors, repetition with variation, and visual reversals are especially useful.
9. Keep technical precision available without forcing the audience to memorize it.
   Definitions and sources may occupy a consistent secondary region or companion notes.
10. Rehearse the speech with the actual transitions and revise words, images, and timing together.

A useful text storyboard records the slide number, spoken beat, screen content, and rhetorical purpose:

```text
12 | VOICE: This feels new.
   | SCREEN: THIS FEELS NEW.
   | PURPOSE: establish the audience's intuition

13 | VOICE: It isn't.
   | SCREEN: IT ISN'T.
   | PURPOSE: turn the argument
```

### Planning quality

- Give every screen one dominant job and an immediately legible focal point.
- Treat speech as the argument and slides as the present moment.
- Synchronize transitions with changes in spoken meaning, not a fixed timer.
- Avoid dense bullet slides, decorative stock imagery, and effects without semantic purpose.
- Use recurring visual motifs consistently so callbacks reduce cognitive load.
- Hold evidence, charts, quotations, definitions, and unfamiliar names long enough to inspect.
- Use large text, strong contrast, non-color-only distinctions, and meaningful descriptions or spoken equivalents for important visuals.
- Provide accessible notes, a transcript, or another durable companion when the live deck would not stand alone.
- Include sources and respect licensing for externally obtained material.
- Do not publish, deploy, or send the presentation unless the user requests it.

## Deck development

### Format authority

Read `deck-format.yaml` at the project root before presentation authoring.
It is the durable, version-controlled format decision for the project.

When `mode` is `web-source`:

- Treat the HTML/CSS/JavaScript deck as both the presentation artifact and the source of truth.
- Do not invoke a PowerPoint/PPTX presentation skill, Artifact Tool, office converter, or PPTX template workflow.
- Do not create, restore, or maintain a `.pptx` deliverable.
- Keep audience copy, speech, notes, visual intent, layout configuration, code, styles, and assets reviewable in repository diffs.

PowerPoint is an available override, not an automatic fallback.
If the user asks for PowerPoint while the recorded mode is `web-source`, explain that this changes the project's presentation format and ask whether to switch unless the user has already explicitly requested that project-wide switch.
On confirmation, set `mode` to `powerpoint`, record the decision in `deck-format.yaml`, and use the applicable PowerPoint workflow.
Adhere to the recorded mode for later project tasks without asking again or silently reverting it.
Apply the same rule to an explicit switch back to `web-source`.

If the policy file is missing, inspect the repository for an established deck implementation.
Ask for a format decision only when both web and PowerPoint are plausible sources of truth; otherwise preserve the established format and record it in a new policy file.

### Development workflow

1. Inspect the editorial source, slide configuration, renderer, styles, relevant assets, and current version-control status.
   Preserve unrelated and user-authored changes.
2. Make the smallest source edits that satisfy the request.
   In a positional content/configuration model, keep rows and layout entries aligned.
   When a Markdown table is the editorial source, use its documented sentinel for intentionally empty cells and normalize that sentinel in the loader.
   Do not leave leading cells syntactically empty when Markdown renderers could shift later values into the wrong displayed columns.
   If the table carries explicit sequence numbers, renumber them atomically after structural edits and validate that they remain consecutive.
3. When adding, removing, reordering, or separating beats, update the editorial source and matching layout configuration together.
   Move existing content rather than duplicating it unless repetition is intentional.
4. Reuse existing media when only the sequence changes.
   Generate or source an asset only when the visual itself must change.
   Store project-bound assets in the repository and provide meaningful alt text.
5. Keep spoken text, visible words, notes, timing, section markers, and recovery points synchronized with the revised sequence.

Keep spoken notes, visual intent, sources, and timing cues in text where they can be reviewed in a diff.
Rendered output may accompany the source when it helps delivery or verification.

### Development verification

For a localized edit, verify the affected slides and their immediate neighbors instead of rebuilding or reviewing the entire deck unless the change is global.

- Check structural invariants such as matching content/configuration counts and valid asset paths.
- Serve the existing site locally and render changed slides at presentation size.
- After changing JavaScript, CSS, or content modules, use a cache-busted URL or a genuinely fresh origin before judging the result.
  Do not mistake stale browser modules for a source defect.
- Confirm images loaded, empty optional elements are absent, text is not clipped, transitions advance in order, and the console has no errors or warnings caused by the change.
- For a global revision, render the complete talk and inspect every screen.
- Perform an aloud timing pass or create suitable notes.
  Identify recovery points where a sequence can shorten without breaking the argument.
- When reviewing, distinguish argument problems from synchronization or visual execution problems.
  Do not recommend faster slides as a remedy for weak reasoning.
- Report the source files and assets changed.
  Do not generate a PPTX as a QA artifact while the project is in `web-source` mode.
