const slideCount = 56;

const descriptions = [
  "What Did We Just Make? Research objects with AI.",
  "I had a productive day.",
  "A cheerful AI produces a mountain of polished documents beside a finite human.",
  "The next morning.",
  "What did we decide?",
  "Which version is real?",
  "A jumble of filenames including FINAL, FINAL-2, FINAL-real, USE-THIS, and v7.",
  "Where is the useful bit?",
  "Could anyone else continue?",
  "A new AI chat asks: How can I help you today?",
  "Ah.",
  "AI can produce faster than I can understand, judge, or remember.",
  "This feels new.",
  "It isn't.",
  "Science has seen this movie: research materials sit on disconnected islands.",
  "Data: here.",
  "Code: there.",
  "Methods: somewhere.",
  "Key setting: in somebody's head.",
  "The paper is only the visible tip.",
  "Research object.",
  "A research object is data, code, and metadata that together represent research as a complete unit.",
  "We've spent decades on this.",
  "Folders, repositories, versioning, standards, and workflows.",
  "FAIR: Findable, Accessible, Interoperable, Reusable.",
  "Different routes.",
  "Same hope.",
  "Understand it. Rerun it. Build on it.",
  "Center for Open Neuroscience: This is my team.",
  "Open software, platforms, data, and methods for neuroscience and beyond.",
  "Open, reuse, share, test, simplify, community.",
  "Open only matters if people can use it.",
  "Reproducible bogus results are useless.",
  "Then AI arrived.",
  "Build faster.",
  "AI helps a small team document, integrate, test, and share.",
  "Also.",
  "Manufacture confusion faster.",
  "The machine keeps expanding.",
  "The human is still finite.",
  "Not more output.",
  "Better objects.",
  "A research object as a suitcase: a durable home, visible trail, and usable handoff.",
  "STAMPED: Seven spectra. One shared vocabulary.",
  "Self-containment: Can I retrieve everything essential from one place?",
  "Tracking: Can I trace what became what?",
  "Actionability: Can a person—or a machine—make it happen again?",
  "Modularity: Can I replace one part without unraveling the rest?",
  "Portability: Does it still work after it moves?",
  "Ephemerality: Can it work from a clean start without yesterday's leftovers?",
  "Distributability: Can someone else obtain the same state I had?",
  "A study, report, spreadsheet, slide deck, or plan can be durable digital work.",
  "The next collaborator may be AI.",
  "A researcher, AI, and colleague pass a research object in a relay.",
  "The next collaborator may be you.",
  "Build the memory into the work. STAMPED.",
];

const image = document.querySelector("#slide");
const description = document.querySelector("#slide-description");
const counter = document.querySelector("#counter");
const progress = document.querySelector("#progress span");
const hint = document.querySelector("#hint");

let index = readHash();
let touchStartX = null;

function readHash() {
  const value = Number.parseInt(window.location.hash.slice(1), 10);
  if (!Number.isFinite(value)) return 0;
  return Math.min(slideCount - 1, Math.max(0, value - 1));
}

function slidePath(slideIndex) {
  return `slides/slide-${String(slideIndex + 1).padStart(2, "0")}.png`;
}

function preload(slideIndex) {
  if (slideIndex < 0 || slideIndex >= slideCount) return;
  const nextImage = new Image();
  nextImage.src = slidePath(slideIndex);
}

function render({ updateHash = true } = {}) {
  image.src = slidePath(index);
  image.alt = descriptions[index] || `Slide ${index + 1}`;
  description.textContent = image.alt;
  counter.textContent = `${index + 1} / ${slideCount}`;
  progress.style.width = `${((index + 1) / slideCount) * 100}%`;
  document.title = `${index + 1}/${slideCount} — What Did We Just Make?`;
  if (updateHash) history.replaceState(null, "", `#${index + 1}`);
  preload(index + 1);
  preload(index - 1);
}

function goTo(nextIndex) {
  index = Math.min(slideCount - 1, Math.max(0, nextIndex));
  render();
  hint.classList.add("hidden");
}

function next() {
  goTo(index + 1);
}

function previous() {
  goTo(index - 1);
}

async function toggleFullscreen() {
  if (document.fullscreenElement) {
    await document.exitFullscreen();
  } else {
    await document.documentElement.requestFullscreen();
  }
}

document.querySelector("#next").addEventListener("click", next);
document.querySelector("#previous").addEventListener("click", previous);
document.querySelector("#next-zone").addEventListener("click", next);
document.querySelector("#previous-zone").addEventListener("click", previous);
document.querySelector("#fullscreen").addEventListener("click", toggleFullscreen);

document.addEventListener("keydown", (event) => {
  if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(event.key)) {
    event.preventDefault();
    next();
  } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)) {
    event.preventDefault();
    previous();
  } else if (event.key === "Home") {
    event.preventDefault();
    goTo(0);
  } else if (event.key === "End") {
    event.preventDefault();
    goTo(slideCount - 1);
  } else if (event.key.toLowerCase() === "f") {
    event.preventDefault();
    toggleFullscreen();
  }
});

document.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0]?.screenX ?? null;
}, { passive: true });

document.addEventListener("touchend", (event) => {
  if (touchStartX === null) return;
  const distance = (event.changedTouches[0]?.screenX ?? touchStartX) - touchStartX;
  touchStartX = null;
  if (distance > 45) previous();
  if (distance < -45) next();
}, { passive: true });

window.addEventListener("hashchange", () => {
  index = readHash();
  render({ updateHash: false });
});

setTimeout(() => hint.classList.add("hidden"), 5000);
render();
