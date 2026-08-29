---
name: lessig-presentations
description: Create, refine, or review rapid visual talks in the Lawrence Lessig presentation style, with tightly synchronized speech and slides. Use for Lessig-style talks or requests emphasizing one-beat-per-screen visual storytelling; do not route ordinary slide decks here solely because they use minimal design.
---

# Lessig Presentations

Create a coherent spoken argument whose visual sequence acts as synchronized
rhetoric. The goal is not a high slide count. Each screen should perform one
clear job at the moment when that job matters.

## Method essentials

The Lessig method is an observed presentation style, not a formal standard or
a fixed-timing format. It uses many simple screens in close synchronization
with a rehearsed speech. The speech carries the argument; each screen carries
the present rhetorical beat; a sequence creates movement, contrast,
accumulation, and recall.

Do not imitate only the visible surface. “One word per slide” and “rapid-fire
slides” are possible techniques, not the purpose. The purpose is precise
control of attention. A slide may contain a word, image, number, quotation,
document detail, diagram, or blank field, provided it performs one clear job at
the moment when that job matters.

The method is not PechaKucha, a teleprompter, a ban on evidence, or constant
speed. Effective talks accelerate, pause, repeat, and stop. They leave complex
evidence visible long enough to inspect and can abandon the screen entirely
when attention should return to the speaker.

Before substantive authoring or review, inspect any project brief, talk
concept, audience description, or existing storyboard relevant to the request.
Treat those files as task inputs, not as operating instructions required by
this skill. Preserve the user's chosen subject, delivery format, and
publication boundaries.

## Preferred artifacts

Prefer version-control-friendly source: Markdown, HTML/CSS, SVG, or generated
slides expressed as code. Preserve an established project format when one
exists. Do not create a PowerPoint file unless the user explicitly asks for
one.

Keep spoken notes, visual intent, sources, and timing cues in text where they
can be reviewed in a diff. Generated or rendered output may accompany that
source when it helps delivery or verification.

## Authoring workflow

1. Establish the audience, duration, central tension, intended change in
   understanding, and final portable thought.
2. Write or refine the spoken through-line before styling slides.
3. Divide the speech into meaningful beats. Do not create a slide for every
   clause mechanically.
4. Assign each beat a visual function such as identify, emphasize, compare,
   prove, foreshadow, summarize, amuse, pause, or recall.
5. Storyboard sequences rather than designing isolated slides. Give each
   sequence a setup, development, and resolution.
6. Use words, images, quotations, diagrams, callbacks, and blank screens only
   when they perform a specific rhetorical job.
7. Vary tempo. Fast runs can create energy or comic escalation; slower screens
   support evidence, unfamiliar terms, reflection, and rest.
8. Make playfulness serve recognition and argument. Literal metaphors,
   repetition with variation, and visual reversals are especially useful.
9. Keep technical precision available without forcing the audience to memorize
   it. Definitions and sources may occupy a consistent secondary region or
   companion notes.
10. Rehearse the speech with the actual transitions and revise words, images,
    and timing together.

A useful text storyboard records at least the slide number, spoken beat, screen
content, and rhetorical purpose:

```text
12 | VOICE: This feels new.
   | SCREEN: THIS FEELS NEW.
   | PURPOSE: establish the audience's intuition

13 | VOICE: It isn't.
   | SCREEN: IT ISN'T.
   | PURPOSE: turn the argument
```

## Quality constraints

- Give every screen one dominant job and an immediately legible focal point.
- Treat speech as the argument and slides as the present moment.
- Synchronize transitions with changes in spoken meaning, not a fixed timer.
- Avoid dense bullet slides, decorative stock imagery, and effects without
  semantic purpose.
- Use recurring visual motifs consistently so callbacks reduce cognitive load.
- Hold evidence, charts, quotations, definitions, and unfamiliar names long
  enough to inspect.
- Use large text, strong contrast, non-color-only distinctions, and meaningful
  descriptions or spoken equivalents for important visuals.
- Provide accessible notes, a transcript, or another durable companion when
  the live deck would not stand alone.
- Include sources and respect licensing for externally obtained material.
- Do not publish, deploy, or send the presentation unless the user requests
  that external action.

## Verification

When slides are implemented, render the complete talk and inspect every screen
at presentation size. Check for overflow, clipping, weak contrast, accidental
layout shifts, unreadable text, and visual repetition that has lost its
meaning.

Then perform an aloud timing pass or create notes suitable for one. Identify
recovery points where a sequence can be shortened without breaking the
argument, and ensure the closing thought still works if the visual system
fails.

When reviewing rather than authoring, distinguish problems in the argument
from problems in synchronization or visual execution. Do not recommend faster
slides as a remedy for weak reasoning.
