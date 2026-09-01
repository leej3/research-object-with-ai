# Talk content

This table is the editorial source of truth.
Each numbered row becomes one slide, in order.
It contains only what is said, the words shown, the image shown, and human notes.
`deck.js` determines how the words and image are presented.

The **Words** and **Spoken** columns contain plain text only.
Use a single hyphen (`-`) as the sentinel for an intentionally empty cell; the site converts it to an empty value.
This keeps all five columns aligned in Markdown editors.

| Slide | Spoken | Words | Image | Notes |
| --- | --- | --- | --- | --- |
| 1 | This talk explores the digital artifacts of science and how AI enters the picture. I don't necessarily mean using AI to manage... I sort of mean how do we cope with AI. So I'd like to restate this as a knowledge working saying... | WHAT DID WE JUST MAKE? Managing research objects with AI John Lee · New York AI Toastmasters | - | Opening paragraph from `docs/my-script.md`. |
| 2 | - | WHAT HAVE YOU DONE? | - | Script direction: show this text. |
| 3 | I work at Dartmouth College, at the Center for Open Neuroscience. We care about open science. Open science is a movement to make the fruits of research available to all: publications, data, physical samples, software, and models, transparent and accessible to all levels of society. Important ideas associated with this are reuse and quality | WE CARE ABOUT OPEN SCIENCE. | assets/con-logo.png | Merges the former slides 3 and 4. Use a larger CON logo beside the expanded text. |
| 4 | Our team have established a set of principles to organize such research objects. | STAMPED; SELF-CONTAINED: Everything essential can be retrieved.; TRACKED: State, provenance, and changes are recorded.; ACTIONABLE: Procedures can be carried out again.; MODULAR: Parts can be examined or replaced independently.; PORTABLE: Properties survive a change of environment.; EPHEMERAL: Procedures work from a clean, disposable environment.; DISTRIBUTABLE: Others can obtain the same usable state. | assets/stamped-logo.svg | Full STAMPED overview. All principles are equally opaque. |
| 5 | I am talking about it because I think it is a useful way of thinking about any sort of digital artifact. Because of the prevalence of AI I think we should be thinking very carefully about establishing systematic ways to create, assess, and think about such artifacts. | WHAT HAVE YOU DONE? | - | Script direction: show this callback while speaking the paragraph. |
| 6 | So I'll come back to the research, but I am assuming you are all knowledge workers—dealers in digital artifacts. I will anchor to that. We create, assess, share, and sell digital artifacts. | - | assets/digital-artifact-dealer.png | Script direction: use the dealer image. |
| 7 | So many different types of artifacts. Outputs that AI can help us create. | - | assets/digital-artifact-quality-cycle-final.png | Show the existing overview of artifact types. |
| 8 | They are objects that people may need to examine, apply, preserve, adapt, combine, or learn from. | EXAMINE APPLY PRESERVE ADAPT COMBINE LEARN | - | Use the verbs from the spoken line. |
| 9 | This might be used for a long time, | A LONG TIME | - | Hold the duration contrast. |
| 10 | Or just once and briefly. | ONCE. BRIEFLY. | - | Script suggests a flame image, but no flame asset is present. |
| 11 | Some critical | CRITICAL | - | Rapid contrast. |
| 12 | Some trivial | TRIVIAL | - | Rapid contrast. |
| 13 | Some are obviously designed for broad reuse | DESIGNED FOR BROAD REUSE | - | Reuse contrast. |
| 14 | Others are invaluable for reuse outside of their original intent | REUSED BEYOND THEIR ORIGINAL INTENT | - | Reuse contrast. |
| 15 | I think we can say about the reuse of digital objects is that you can't possibly conceive the breadth of possibilities for their reuse. | REUSE IS UNPREDICTABLE | - | Dense spoken beat with sparse audience text. |
| 16 | STAMPED: self-contained, distributable, portable, modular, and actionable really matter for reuse. | STAMPED; SELF-CONTAINED: Everything essential can be retrieved.; TRACKED: State, provenance, and changes are recorded.; ACTIONABLE: Procedures can be carried out again.; MODULAR: Parts can be examined or replaced independently.; PORTABLE: Properties survive a change of environment.; EPHEMERAL: Procedures work from a clean, disposable environment.; DISTRIBUTABLE: Others can obtain the same usable state. | assets/stamped-logo.svg | Reuse-focused STAMPED overview. Self-contained, actionable, modular, portable, and distributable remain opaque; tracked and ephemeral are faded. |
| 17 | - | - | - | Authoring placeholder: possibly add an example or a stream of possibilities and suggestions here. |
| 18 | How do we know we have good stuff? | - | assets/digital-artifact-dealer.png | Return to the dealer image. |
| 19 | How do we assess quality? | QUALITY | - | Introduce the quality sequence. |
| 20 | Quality belongs to the artifact itself: is it correct, complete, useful, and fit for purpose? | QUALITY; What is true of the artifact itself: correct, complete, useful, and fit for purpose. | - | Define quality. |
| 21 | Confidence is what we believe about its quality. Confidence can be high or low—and it can be wrong. | CONFIDENCE; What we believe about quality. Confidence can be right—or wrong. | - | Distinguish belief from quality. |
| 22 | Calibration is the relationship we want: high confidence when quality is high, and low confidence when quality is low. | CALIBRATION; Confidence should rise and fall with actual quality. | - | Define calibrated confidence. |
| 23 | Assurance is the evidence that gives us grounds for justified confidence: sources, calculations, tests, reviews, and intermediate work. | ASSURANCE; Evidence that provides grounds for justified confidence. | - | Define assurance. |
| 24 | Before we move on, here is the relationship: quality produces evidence; assurance and assessability govern how that evidence supports confidence; calibration compares confidence with actual quality. | ARTIFACT QUALITY::How good is the work?; EVIDENCE / PROVENANCE::sources · tests · calculations · reviews; ASSURANCE::Grounds for justified confidence; ASSESSABILITY::How easily can evidence be used?; EVALUATOR CONFIDENCE::How strongly do I believe the work is good?; EVALUATOR FACTORS::expertise · priors · biases; CALIBRATION::QUALITY ↔ CONFIDENCE | - | Relationship recap before the assessability definition. |
| 25 | Assessability is about effort: how readily can someone use that evidence to determine the quality of the work? | ASSESSABILITY; How readily someone can use the evidence to judge quality. | - | Define assessability. |
| 26 | Aspects of STAMPED help us here. Self-contained keeps evidence with the artifact. Tracked exposes history. Actionable lets us rerun procedures. Modular lets us inspect parts separately. | STAMPED; SELF-CONTAINED: Everything essential can be retrieved.; TRACKED: State, provenance, and changes are recorded.; ACTIONABLE: Procedures can be carried out again.; MODULAR: Parts can be examined or replaced independently.; PORTABLE: Properties survive a change of environment.; EPHEMERAL: Procedures work from a clean, disposable environment.; DISTRIBUTABLE: Others can obtain the same usable state. | assets/stamped-logo.svg | Assessment-focused STAMPED overview. Self-contained, tracked, actionable, and modular remain opaque; portable, ephemeral, and distributable are faded. |
| 27 | Science is especially motivated because a paper is often only the visible surface of months of work: data, code, methods, environments, and decisions may be scattered across people and systems. | SCIENCE HAS THIS PROBLEM TOO | assets/research-islands.png | Explain why science is especially motivated. |
| 28 | So if you are a knowledge worker | - | assets/digital-artifact-dealer.png | Use the dealer image. |
| 29 | Or you're just trying to figure out what happened | WHAT HAVE YOU DONE? | - | Show this callback. |
| 30 | ...you could consider... | YOU COULD CONSIDER… | - | Pause before the final proposal. |
| 31 | - | https://stamped-principles.org; https://github.com/leej3/research-object-with-ai | assets/stamped-logo.svg | Closing links. |
