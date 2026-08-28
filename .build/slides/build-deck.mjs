import fs from "node:fs/promises";
import path from "node:path";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const ROOT = "/Users/johnlee/Documents/toastmasters/research-object-with-ai";
const BUILD = path.join(ROOT, ".build/slides");
const SITE_SLIDES = path.join(ROOT, "site/slides");
const DIST = path.join(ROOT, "dist");

const W = 1280;
const H = 720;

const C = {
  cream: "#F7F0E3",
  paper: "#FFF9EF",
  navy: "#0D2B45",
  teal: "#177F82",
  coral: "#EF6755",
  mustard: "#E3A51A",
  sky: "#88AADD",
  ink: "#17212B",
  white: "#FFFFFF",
  muted: "#655F57",
};

const FONT = "Arial";
const FONT_HEAVY = "Arial Black";

const SOURCES = {
  concept: `${ROOT}/docs/talk-concept.md`,
  finiteHuman:
    "/Users/johnlee/Documents/ChatGPT/wsdg-ai-collaboration/talk-concepts/07-the-finite-human-and-the-tireless-producer.md",
  community:
    "/Users/johnlee/Documents/ChatGPT/wsdg-ai-collaboration/talk-concepts/05-human-collaboration-and-community.md",
  stampedPaper: "https://stamped-principles.github.io/stamped-paper/",
  stampedHome: "https://stamped-principles.org/",
  con: "https://centerforopenneuroscience.org/",
  fair: "https://www.go-fair.org/fair-principles/",
  hardt: "https://www.youtube.com/watch?v=RrpajcAgR1E",
  generated:
    "OpenAI image generation; project prompts recorded in .build/slides/source-notes.txt",
};

async function writeBlob(filePath, blob) {
  await fs.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
}

function note(body, sources = []) {
  if (!sources.length) return body;
  return `${body}\n\n[Sources]\n${sources.map((s) => `- ${s}`).join("\n")}\n[/Sources]`;
}

function setNotes(slide, body, sources = []) {
  slide.speakerNotes.textFrame.setText(note(body, sources));
  slide.speakerNotes.setVisible(true);
}

function addText(slide, text, opts = {}) {
  const {
    left = 72,
    top = 72,
    width = 1136,
    height = 560,
    size = 72,
    color = C.navy,
    bold = true,
    align = "left",
    valign = "middle",
    font = bold ? FONT_HEAVY : FONT,
    rotation = 0,
    name,
    insets = { top: 4, right: 4, bottom: 4, left: 4 },
  } = opts;
  const shape = slide.shapes.add({
    geometry: "textbox",
    name,
    position: { left, top, width, height, rotation },
    fill: "none",
    line: { style: "solid", fill: "none", width: 0 },
  });
  shape.text = text;
  shape.text.style = {
    fontSize: size,
    bold,
    color,
    alignment: align,
    verticalAlignment: valign,
    autoFit: "shrinkText",
    wrap: "square",
    insets,
    typeface: font,
  };
  return shape;
}

function addRect(slide, opts = {}) {
  return slide.shapes.add({
    geometry: opts.geometry ?? "rect",
    position: {
      left: opts.left ?? 0,
      top: opts.top ?? 0,
      width: opts.width ?? W,
      height: opts.height ?? H,
      rotation: opts.rotation ?? 0,
    },
    fill: opts.fill ?? C.navy,
    line: { style: "solid", fill: opts.line ?? "none", width: opts.lineWidth ?? 0 },
    borderRadius: opts.borderRadius,
  });
}

function baseSlide(presentation, bg = C.cream) {
  const slide = presentation.slides.add();
  slide.background.fill = bg;
  return slide;
}

function wordSlide(presentation, text, opts = {}) {
  const slide = baseSlide(presentation, opts.bg ?? C.cream);
  if (opts.kicker) {
    addText(slide, opts.kicker.toUpperCase(), {
      left: 74,
      top: 42,
      width: 1132,
      height: 42,
      size: 22,
      color: opts.kickerColor ?? C.coral,
      bold: true,
      valign: "top",
    });
  }
  addText(slide, text, {
    left: opts.left ?? 72,
    top: opts.top ?? 104,
    width: opts.width ?? 1136,
    height: opts.height ?? 520,
    size: opts.size ?? 92,
    color: opts.color ?? C.navy,
    bold: opts.bold ?? true,
    align: opts.align ?? "center",
    valign: opts.valign ?? "middle",
    rotation: opts.rotation ?? 0,
    font: opts.font,
  });
  if (opts.bottom) {
    addText(slide, opts.bottom, {
      left: 90,
      top: 642,
      width: 1100,
      height: 36,
      size: 20,
      color: opts.bottomColor ?? C.muted,
      bold: false,
      align: "center",
    });
  }
  setNotes(slide, opts.notes ?? text, opts.sources ?? []);
  return slide;
}

async function imageSlide(presentation, imagePath, opts = {}) {
  const slide = baseSlide(presentation, opts.bg ?? C.cream);
  const bytes = await fs.readFile(imagePath);
  slide.images.add({
    blob: bytes,
    contentType: "image/png",
    alt: opts.alt ?? "Illustration",
    fit: opts.fit ?? "cover",
    position: opts.position ?? { left: 0, top: 0, width: W, height: H },
  });
  if (opts.banner) {
    const bannerHeight = opts.bannerHeight ?? 132;
    addRect(slide, {
      left: 0,
      top: opts.bannerTop ?? H - bannerHeight,
      width: W,
      height: bannerHeight,
      fill: opts.bannerFill ?? C.cream,
    });
    addText(slide, opts.banner, {
      left: 58,
      top: (opts.bannerTop ?? H - bannerHeight) + 8,
      width: 1164,
      height: bannerHeight - 16,
      size: opts.bannerSize ?? 58,
      color: opts.bannerColor ?? C.navy,
      align: opts.bannerAlign ?? "center",
    });
  }
  setNotes(slide, opts.notes ?? opts.banner ?? "", opts.sources ?? []);
  return slide;
}

function filenameSlide(presentation) {
  const slide = baseSlide(presentation, C.navy);
  const items = [
    ["FINAL", 30, 70, 390, 110, 92, C.cream, -5],
    ["FINAL-2", 630, 74, 500, 110, 86, C.mustard, 4],
    ["final", 125, 268, 340, 100, 78, C.sky, 8],
    ["FINAL-real", 470, 250, 680, 130, 96, C.coral, -3],
    ["USE-THIS", 80, 468, 620, 132, 104, C.white, 2],
    ["v7", 850, 472, 260, 120, 96, C.teal, -7],
  ];
  for (const [text, left, top, width, height, size, color, rotation] of items) {
    addText(slide, text, { left, top, width, height, size, color, rotation, align: "center" });
  }
  setNotes(
    slide,
    "You know this archive. FINAL, FINAL-2, final-real, use-this, version seven. AI did not invent version confusion; it can simply produce candidates much faster.",
    [SOURCES.concept],
  );
  return slide;
}

function threeVerbSlide(presentation) {
  const slide = baseSlide(presentation, C.paper);
  addText(slide, "understand", { left: 70, top: 82, width: 650, height: 126, size: 88, color: C.teal });
  addText(slide, "judge", { left: 545, top: 258, width: 560, height: 128, size: 104, color: C.coral, rotation: -3 });
  addText(slide, "remember", { left: 122, top: 450, width: 890, height: 144, size: 100, color: C.navy, rotation: 2 });
  addText(slide, "AI can produce faster than I can…", { left: 74, top: 26, width: 1132, height: 50, size: 26, color: C.muted, bold: false });
  setNotes(
    slide,
    "AI can produce faster than I can understand, judge, or remember. That is the basic asymmetry: a finite human collaborating with an effectively tireless producer.",
    [SOURCES.finiteHuman],
  );
  return slide;
}

function researchObjectDefinitionSlide(presentation) {
  const slide = baseSlide(presentation, C.paper);
  addText(slide, "A research object", { left: 72, top: 62, width: 1136, height: 96, size: 62, color: C.coral, align: "center" });
  addText(slide, "data + code + metadata", { left: 100, top: 190, width: 1080, height: 126, size: 80, color: C.navy, align: "center" });
  addText(slide, "that together represent the research as a complete unit", { left: 176, top: 354, width: 928, height: 146, size: 43, color: C.teal, align: "center", bold: false });
  addText(slide, "Formal enough to be precise. Simple enough to picture as a suitcase.", { left: 160, top: 594, width: 960, height: 50, size: 23, color: C.muted, align: "center", bold: false });
  setNotes(
    slide,
    "The technical term is a research object: a collection of data, code, and metadata that together represent the research as a complete unit. I am giving you the formal definition, but I do not expect you to memorize it. Picture a suitcase containing everything needed to understand the trip.",
    [SOURCES.stampedPaper],
  );
  return slide;
}

function streamSlide(presentation) {
  const slide = baseSlide(presentation, C.navy);
  const labels = [
    ["folders", 75, 86, C.sky, -4],
    ["repositories", 415, 108, C.cream, 3],
    ["versioning", 135, 272, C.mustard, 2],
    ["standards", 686, 292, C.coral, -5],
    ["workflows", 350, 488, C.teal, 1],
  ];
  for (const [text, left, top, color, rotation] of labels) {
    addText(slide, text, { left, top, width: 520, height: 110, size: 64, color, rotation, align: "center" });
  }
  setNotes(
    slide,
    "Over decades, communities developed folders and conventions, repositories, version control, standards, and executable workflows. Different approaches emphasized different parts of the problem.",
    [SOURCES.stampedPaper, SOURCES.fair],
  );
  return slide;
}

async function conIdentitySlide(presentation, conLogoPath) {
  const slide = baseSlide(presentation, C.paper);
  const bytes = await fs.readFile(conLogoPath);
  slide.images.add({
    blob: bytes,
    contentType: "image/png",
    alt: "Center for Open Neuroscience logo",
    fit: "contain",
    position: { left: 212, top: 80, width: 856, height: 285 },
  });
  addText(slide, "This is my team.", { left: 122, top: 440, width: 1036, height: 130, size: 78, color: C.navy, align: "center" });
  setNotes(
    slide,
    "This is where my team enters the story: the Center for Open Neuroscience. We have been working on the older version of this problem—community infrastructure for open and reproducible research—since long before today's AI boom.",
    [SOURCES.con, "CON logo: https://centerforopenneuroscience.org/theme/img/logos/logo_blue_big_with_margins.png"],
  );
  return slide;
}

function conPrinciplesSlide(presentation) {
  const slide = baseSlide(presentation, C.cream);
  const lines = [
    ["OPEN", 80, 62, 312, 112, 86, C.coral, -3],
    ["REUSE", 442, 60, 390, 112, 82, C.navy, 2],
    ["SHARE", 822, 64, 370, 112, 80, C.teal, -2],
    ["TEST", 124, 264, 330, 112, 86, C.mustard, 3],
    ["SIMPLIFY", 468, 258, 610, 120, 80, C.coral, -1],
    ["COMMUNITY", 210, 470, 860, 130, 88, C.navy, 1],
  ];
  for (const [text, left, top, width, height, size, color, rotation] of lines) {
    addText(slide, text, { left, top, width, height, size, color, rotation, align: "center" });
  }
  setNotes(
    slide,
    "CON's homepage names open source, reuse and integration, dissemination, quality assurance, convenience, and community. In verbs: open, reuse, share, test, simplify, and build community.",
    [SOURCES.con],
  );
  return slide;
}

function aiVerbsSlide(presentation) {
  const slide = baseSlide(presentation, C.paper);
  addText(slide, "DOCUMENT", { left: 55, top: 70, width: 540, height: 112, size: 70, color: C.navy, rotation: -2 });
  addText(slide, "INTEGRATE", { left: 635, top: 84, width: 570, height: 112, size: 67, color: C.teal, rotation: 3 });
  addText(slide, "TEST", { left: 130, top: 306, width: 400, height: 132, size: 106, color: C.coral, rotation: 4 });
  addText(slide, "SHARE", { left: 600, top: 326, width: 540, height: 132, size: 98, color: C.mustard, rotation: -4 });
  addText(slide, "AI helps a small team…", { left: 76, top: 574, width: 1128, height: 62, size: 34, color: C.muted, bold: false, align: "center" });
  setNotes(
    slide,
    "AI helps a small team document, integrate, test, and share tools faster. That is a genuine opportunity for community infrastructure—as long as speed remains connected to judgment and maintenance.",
    [SOURCES.concept, SOURCES.community],
  );
  return slide;
}

async function stampedRevealSlide(presentation, stampedLogoPath) {
  const slide = baseSlide(presentation, C.paper);
  const svg = await fs.readFile(stampedLogoPath, "utf8");
  slide.images.add({
    svg,
    alt: "STAMPED wordmark",
    fit: "contain",
    position: { left: 140, top: 120, width: 1000, height: 250 },
  });
  addText(slide, "Seven spectra. One shared vocabulary.", { left: 124, top: 440, width: 1032, height: 100, size: 48, color: C.navy, align: "center" });
  setNotes(
    slide,
    "We call this vocabulary STAMPED. These are seven spectra, not a pass-fail certification. A project can improve incrementally from where it is today.",
    [SOURCES.stampedPaper, "STAMPED wordmark: https://github.com/stamped-principles/stamped-branding"],
  );
  return slide;
}

function principleSlide(presentation, principle) {
  const slide = baseSlide(presentation, principle.bg ?? C.paper);
  addText(slide, principle.letter, {
    left: 42,
    top: 16,
    width: 270,
    height: 270,
    size: 190,
    color: principle.accent,
    align: "center",
    rotation: -6,
  });
  addText(slide, principle.name.toUpperCase(), {
    left: 300,
    top: 54,
    width: 900,
    height: 86,
    size: 48,
    color: C.navy,
    valign: "top",
  });
  addText(slide, principle.tagline, {
    left: 308,
    top: 136,
    width: 860,
    height: 80,
    size: 35,
    color: principle.accent,
    bold: true,
  });
  addText(slide, principle.question, {
    left: 106,
    top: 248,
    width: 1068,
    height: 230,
    size: principle.questionSize ?? 58,
    color: C.ink,
    align: "center",
  });
  addRect(slide, { left: 0, top: 568, width: W, height: 152, fill: C.navy });
  addText(slide, principle.definition, {
    left: 72,
    top: 584,
    width: 1136,
    height: 110,
    size: principle.definitionSize ?? 23,
    color: C.cream,
    bold: false,
    align: "center",
  });
  setNotes(
    slide,
    principle.notes,
    [SOURCES.stampedPaper],
  );
  return slide;
}

function familiarObjectsSlide(presentation) {
  const slide = baseSlide(presentation, C.navy);
  const rows = [
    ["a study", 70, 48, C.cream],
    ["a report", 620, 50, C.sky],
    ["a spreadsheet", 120, 210, C.mustard],
    ["a slide deck", 668, 236, C.coral],
    ["a plan", 382, 442, C.teal],
  ];
  for (const [text, left, top, color] of rows) {
    addText(slide, text, { left, top, width: 520, height: 110, size: 63, color, align: "center", rotation: (left % 3) - 1 });
  }
  addText(slide, "Research object—or simply durable digital work.", { left: 152, top: 620, width: 976, height: 42, size: 24, color: C.cream, bold: false, align: "center" });
  setNotes(
    slide,
    "STAMPED began with research objects, but the questions travel well. A study, a report, a spreadsheet, a slide deck, a plan—any digital object meant to outlive its current session can benefit.",
    [SOURCES.concept],
  );
  return slide;
}

async function build() {
  await fs.mkdir(BUILD, { recursive: true });
  await fs.mkdir(SITE_SLIDES, { recursive: true });
  await fs.mkdir(DIST, { recursive: true });

  const assets = {
    producer: path.join(ROOT, "assets/generated/tireless-producer.png"),
    islands: path.join(ROOT, "assets/generated/research-islands.png"),
    suitcase: path.join(ROOT, "assets/generated/research-suitcase.png"),
    relay: path.join(ROOT, "assets/generated/handoff-relay.png"),
    conLogo: path.join(ROOT, "assets/con-logo.png"),
    stampedLogo: path.join(ROOT, "assets/stamped-logo.svg"),
  };

  const presentation = Presentation.create({ slideSize: { width: W, height: H } });

  // 1 — 12: floundering knowledge worker
  {
    const slide = baseSlide(presentation, C.paper);
    addText(slide, "WHAT DID WE\nJUST MAKE?", { left: 74, top: 92, width: 1132, height: 310, size: 100, color: C.navy, align: "center" });
    addText(slide, "Research objects with AI", { left: 170, top: 430, width: 940, height: 76, size: 42, color: C.coral, align: "center" });
    addText(slide, "John A. Lee  ·  New York AI Toastmasters", { left: 210, top: 582, width: 860, height: 44, size: 22, color: C.muted, align: "center", bold: false });
    setNotes(slide, "I want to begin with a question I increasingly ask after a productive session with AI: what did we just make?", [SOURCES.concept, SOURCES.hardt]);
  }
  wordSlide(presentation, "I had a\nproductive day.", {
    size: 100,
    notes: "Perhaps you know this feeling. You ask AI for a little help, and by lunchtime you have a report, a plan, a prototype, and several excellent new directions.",
    sources: [SOURCES.concept],
  });
  await imageSlide(presentation, assets.producer, {
    banner: "Very productive.",
    bannerFill: C.coral,
    bannerColor: C.white,
    notes: "Extremely productive. The machine is cheerful. The documents are polished. The pile is now taller than I am.",
    sources: [SOURCES.generated, SOURCES.finiteHuman],
    alt: "A cheerful AI machine produces a mountain of documents beside a finite human worker",
  });
  wordSlide(presentation, "The next morning…", {
    size: 96,
    color: C.muted,
    notes: "Then comes the next morning. The coffee is fresh. My memory of yesterday's branching conversation is not.",
  });
  wordSlide(presentation, "What did we decide?", { size: 102, color: C.coral, notes: "What did we actually decide?" });
  wordSlide(presentation, "Which version\nis real?", { size: 100, notes: "Which version is real?" });
  filenameSlide(presentation);
  wordSlide(presentation, "Where is the\nuseful bit?", { size: 104, color: C.teal, notes: "Where, in forty screens of fluent conversation, is the useful bit?" });
  wordSlide(presentation, "Could anyone else\ncontinue?", { size: 92, color: C.mustard, notes: "Could a colleague continue this work without a guided tour of my browser history?" });
  {
    const slide = baseSlide(presentation, C.white);
    addRect(slide, { left: 126, top: 88, width: 1028, height: 500, fill: C.paper, line: C.sky, lineWidth: 3, borderRadius: "rounded-3xl" });
    addText(slide, "NEW CHAT", { left: 168, top: 130, width: 340, height: 60, size: 34, color: C.coral, valign: "top" });
    addText(slide, "How can I help you today?", { left: 180, top: 250, width: 920, height: 140, size: 64, color: C.navy, align: "center" });
    addText(slide, "It has forgotten yesterday with impressive confidence.", { left: 220, top: 470, width: 840, height: 52, size: 25, color: C.muted, align: "center", bold: false });
    setNotes(slide, "And a new session greets me with perfect innocence: how can I help you today? The chat feels like a collaborator, but its continuity is a product feature—not a durable project record.", [SOURCES.finiteHuman]);
  }
  wordSlide(presentation, "Ah.", { size: 220, color: C.coral, notes: "Ah." });
  threeVerbSlide(presentation);

  // 13 — 30: science has seen this movie
  wordSlide(presentation, "This feels new.", { size: 108, color: C.teal, notes: "This emotional experience feels new." });
  wordSlide(presentation, "It isn't.", { size: 170, color: C.coral, notes: "But the organizational problem is not new at all." });
  await imageSlide(presentation, assets.islands, {
    banner: "Science has seen this movie.",
    bannerFill: C.navy,
    bannerColor: C.cream,
    notes: "Researchers have long worked across islands: data on a server, code in a repository, methods in a notebook, a key setting in somebody's head, and cables that almost connect the whole thing.",
    sources: [SOURCES.generated, SOURCES.stampedPaper],
    alt: "A fragmented neuroscience project spread across disconnected islands",
  });
  wordSlide(presentation, "Data: here.", { size: 130, color: C.teal, align: "left", left: 110, notes: "The data may be here, perhaps on a shared drive or controlled-access archive." });
  wordSlide(presentation, "Code: there.", { size: 130, color: C.navy, align: "right", left: 70, notes: "The code is there, perhaps in a repository that points to a different version of the data." });
  wordSlide(presentation, "Methods:\nsomewhere.", { size: 120, color: C.mustard, rotation: -2, notes: "The methods are somewhere: a paper, a wiki, or a lab notebook under a coffee cup." });
  wordSlide(presentation, "Key setting:\nin somebody's head.", { size: 92, color: C.coral, notes: "And the setting that makes it all work may live only in one person's head." });
  wordSlide(presentation, "The paper is only\nthe visible tip.", { size: 96, bottom: "Below it: data · code · metadata · environment · decisions", notes: "A paper is the visible tip. Under it sits the data, code, metadata, environment, and decisions that produced the result.", sources: [SOURCES.stampedPaper] });
  wordSlide(presentation, "RESEARCH\nOBJECT", { size: 152, color: C.coral, bottom: "A name for the whole digital body of work", notes: "We use a name for that whole digital body of work: a research object.", sources: [SOURCES.stampedPaper] });
  researchObjectDefinitionSlide(presentation);
  wordSlide(presentation, "We've spent decades\non this.", { size: 92, color: C.navy, notes: "Scientific communities have spent decades developing ways to make these objects understandable, reproducible, and reusable.", sources: [SOURCES.stampedPaper] });
  streamSlide(presentation);
  wordSlide(presentation, "FAIR", { size: 220, color: C.teal, bottom: "Findable · Accessible · Interoperable · Reusable", notes: "FAIR asks that research objects be Findable, Accessible, Interoperable, and Reusable. STAMPED will complement that perspective rather than replace it.", sources: [SOURCES.fair, SOURCES.stampedPaper] });
  wordSlide(presentation, "Different routes.", { size: 116, color: C.muted, notes: "These efforts take different routes and operate at different layers." });
  wordSlide(presentation, "Same hope:", { size: 136, color: C.coral, notes: "But they share a hope." });
  {
    const slide = baseSlide(presentation, C.paper);
    addText(slide, "UNDERSTAND IT.", { left: 70, top: 78, width: 1140, height: 120, size: 78, color: C.navy, align: "center" });
    addText(slide, "RERUN IT.", { left: 70, top: 278, width: 1140, height: 120, size: 92, color: C.teal, align: "center" });
    addText(slide, "BUILD ON IT.", { left: 70, top: 486, width: 1140, height: 120, size: 84, color: C.coral, align: "center" });
    setNotes(slide, "Understand it. Rerun it. Build on it.", [SOURCES.stampedPaper]);
  }

  // 31 — 35: CON
  await conIdentitySlide(presentation, assets.conLogo);
  wordSlide(presentation, "Open software, platforms, data, and methods", { size: 72, color: C.navy, bottom: "for neuroscience—and beyond", notes: "CON provides open software frameworks, platforms, data, and methodologies for neuroscience and beyond.", sources: [SOURCES.con] });
  conPrinciplesSlide(presentation);
  wordSlide(presentation, "Open only matters\nif people can use it.", { size: 92, color: C.teal, notes: "Openness is not merely putting files online. It becomes valuable when a community can obtain, understand, trust, and reuse what has been shared.", sources: [SOURCES.con] });
  wordSlide(presentation, "“Reproducible bogus\nresults are useless!”", { bg: C.coral, color: C.white, size: 82, bottom: "— Center for Open Neuroscience", bottomColor: C.white, notes: "And CON puts an important brake on the celebration: reproducible bogus results are useless. Reproducibility makes work inspectable; it does not make a weak method correct.", sources: [SOURCES.con] });

  // 36 — 46: AI accelerates both sides
  wordSlide(presentation, "Then AI arrived.", { size: 120, color: C.navy, notes: "Then AI arrived—not into an empty field, but into this ongoing community project." });
  wordSlide(presentation, "BUILD\nFASTER", { bg: C.teal, color: C.white, size: 170, notes: "For a small team, AI can lower the cost of building tools, documentation, integrations, and tests." });
  aiVerbsSlide(presentation);
  wordSlide(presentation, "Also…", { size: 190, color: C.muted, notes: "Also…" });
  wordSlide(presentation, "manufacture\nconfusion faster", { bg: C.coral, color: C.white, size: 104, rotation: -2, notes: "AI can manufacture confusion faster too: more artifacts, more branches, more hidden assumptions, and more output than colleagues can evaluate.", sources: [SOURCES.community] });
  wordSlide(presentation, "The machine\nkeeps expanding.", { size: 110, color: C.mustard, notes: "The machine keeps expanding the work. It does not become tired, bored, or emotionally saturated.", sources: [SOURCES.finiteHuman] });
  wordSlide(presentation, "The human\nis still finite.", { size: 118, color: C.coral, notes: "The human is still finite. We must decide what matters, notice drift, and periodically recover enough understanding to choose the next coherent step.", sources: [SOURCES.finiteHuman] });
  wordSlide(presentation, "NOT MORE OUTPUT", { bg: C.navy, color: C.cream, size: 114, notes: "The answer cannot simply be more output." });
  wordSlide(presentation, "BETTER OBJECTS", { bg: C.cream, color: C.teal, size: 132, notes: "We need better objects: durable homes for intent, evidence, history, and instructions." });
  await imageSlide(presentation, assets.suitcase, {
    fit: "cover",
    banner: "A durable home. A visible trail. A usable handoff.",
    bannerFill: C.cream,
    bannerColor: C.navy,
    bannerSize: 42,
    notes: "A good research object gives work a durable home, a visible trail, and a usable handoff. Think of it as packing the project so the next traveler can make sense of it.",
    sources: [SOURCES.generated, SOURCES.stampedPaper],
    alt: "An open suitcase containing data, code, methods, provenance, and a clean computing environment",
  });
  await stampedRevealSlide(presentation, assets.stampedLogo);

  // 47 — 53: STAMPED questions
  const principles = [
    {
      letter: "S",
      name: "Self-containment",
      tagline: "No scavenger hunt.",
      question: "Can I retrieve everything essential from one place?",
      definition: "A research object is a complete retrieval unit; it can be obtained and understood in its intended scope without needing to reference external resources.",
      accent: C.coral,
      definitionSize: 20,
      notes: "Self-containment asks whether everything essential is reachable from one boundary. That does not require physically copying private or enormous data into one folder; explicit, retrievable references can count. The key is no undocumented scavenger hunt.",
    },
    {
      letter: "T",
      name: "Tracking",
      tagline: "Leave footprints.",
      question: "Can I trace what became what?",
      definition: "The state and provenance of all components is recorded.",
      accent: C.teal,
      notes: "Tracking asks whether we can trace what became what: versions, contributors, inputs, outputs, and consequential changes. With AI, the model, prompt, decisions, and resulting changes become part of that record—but saving every transcript is not automatically useful provenance.",
    },
    {
      letter: "A",
      name: "Actionability",
      tagline: "Recipe, not ingredients.",
      question: "Can a person—or a machine—make it happen again?",
      definition: "A research object contains machine-actionable information to carry out procedures to obtain or reproduce content.",
      accent: C.mustard,
      definitionSize: 21,
      notes: "Actionability asks for a recipe, not merely a pile of ingredients. Can a person—or increasingly an AI agent—follow the instructions and make the important result happen again?",
    },
    {
      letter: "M",
      name: "Modularity",
      tagline: "Pieces, not pudding.",
      question: "Can I replace one part without unraveling the rest?",
      definition: "All modules are independent and composable.",
      accent: C.coral,
      notes: "Modularity means pieces, not pudding. A dataset, method, environment, or analysis step should have a boundary clear enough that it can be understood, updated, or exchanged without unraveling everything else.",
    },
    {
      letter: "P",
      name: "Portability",
      tagline: "Survive the trip.",
      question: "Does it still work after it moves?",
      definition: "A research object can move to different environments while retaining its STAMPED properties.",
      accent: C.teal,
      notes: "Portability asks whether the project survives the trip—from my laptop to yours, from one cloud to another, or from today's system to tomorrow's. Hidden assumptions about the original machine are baggage we forgot to declare.",
    },
    {
      letter: "E",
      name: "Ephemerality",
      tagline: "No ghosts in the machine.",
      question: "Can it work from a clean start—without yesterday's leftovers?",
      definition: "Procedural execution is performed within a throwaway environment.",
      accent: C.mustard,
      questionSize: 50,
      notes: "Ephemerality has the least everyday name and perhaps the best test: can it work from a clean start, without yesterday's leftovers? The execution environment is disposable; the specification and evidence are durable. A clean room exposes the ghosts hiding in a lovingly accumulated laptop.",
    },
    {
      letter: "D",
      name: "Distributability",
      tagline: "Same package, new hands.",
      question: "Can someone else obtain the same state I had?",
      definition: "All modules and procedures are shareable externally in a persistent state.",
      accent: C.coral,
      notes: "Distributability asks whether somebody else can obtain the same state I had. It does not mean every object must be public: healthcare data can remain controlled. It means the permitted recipient can obtain a persistent, well-identified state rather than an approximation.",
    },
  ];
  for (const principle of principles) principleSlide(presentation, principle);

  // 54 — 58: generalize and close
  familiarObjectsSlide(presentation);
  wordSlide(presentation, "The next collaborator\nmay be AI.", { size: 92, color: C.teal, notes: "The next collaborator may be an AI system. A well-organized project gives it a boundary, a history, instructions, and evidence instead of asking it to reconstruct the world from a chat." });
  await imageSlide(presentation, assets.relay, {
    banner: "Make the handoff work.",
    bannerFill: C.navy,
    bannerColor: C.cream,
    notes: "The goal is not to make the AI the owner of the work. It is to make the handoff work among people, machines, and communities while responsibility remains visible.",
    sources: [SOURCES.generated, SOURCES.community, SOURCES.stampedPaper],
    alt: "A human researcher, an AI collaborator, and another human pass a research-object suitcase in a relay",
  });
  wordSlide(presentation, "The next collaborator\nmay be you.", { size: 96, color: C.coral, notes: "And the next collaborator may simply be you, three months from now, wondering what on earth you and the machine were thinking." });
  {
    const slide = baseSlide(presentation, C.paper);
    addText(slide, "BUILD THE MEMORY\nINTO THE WORK.", { left: 74, top: 106, width: 1132, height: 300, size: 102, color: C.navy, align: "center" });
    addText(slide, "STAMPED", { left: 348, top: 450, width: 584, height: 100, size: 70, color: C.coral, align: "center", rotation: -3 });
    addText(slide, "stamped-principles.org", { left: 280, top: 606, width: 720, height: 44, size: 24, color: C.teal, align: "center", bold: false });
    setNotes(slide, "AI did not create the problem, and STAMPED does not solve scientific judgment. But if we build the memory into the work, we give future people and future machines a much better chance of understanding, rerunning, improving, and sharing what we made.", [SOURCES.stampedHome, SOURCES.stampedPaper]);
  }

  const slideTexts = [];
  for (const [index, slide] of presentation.slides.items.entries()) {
    const stem = `slide-${String(index + 1).padStart(2, "0")}`;
    const png = await presentation.export({ slide, format: "png", scale: 1 });
    await writeBlob(path.join(SITE_SLIDES, `${stem}.png`), png);
    const layout = await slide.export({ format: "layout" });
    await fs.writeFile(path.join(BUILD, `${stem}.layout.json`), await layout.text());
    const inspected = await presentation.inspect({
      target: { id: slide.id },
      kind: "textbox,shape,image,notes",
      maxChars: 12000,
    });
    slideTexts.push({ index: index + 1, id: slide.id, inspection: inspected.ndjson });
  }

  const montage = await presentation.export({ format: "webp", montage: true, scale: 0.5 });
  await writeBlob(path.join(BUILD, "deck-montage.webp"), montage);
  await fs.writeFile(path.join(BUILD, "deck-inspection.json"), JSON.stringify(slideTexts, null, 2));

  const pptx = await PresentationFile.exportPptx(presentation);
  await pptx.save(path.join(DIST, "research-objects-with-ai.pptx"));

  console.log(`Built ${presentation.slides.items.length} slides.`);
  console.log(path.join(DIST, "research-objects-with-ai.pptx"));
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
