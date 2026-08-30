import { loadContent } from "./content.js";

const deck = await loadContent();

const sheet = document.querySelector("#contact-sheet");
const status = document.querySelector("#status");
let loaded = 0;

deck.forEach((slide, index) => {
  const figure = document.createElement("figure");
  const frame = document.createElement("iframe");
  const caption = document.createElement("figcaption");

  frame.src = `index.html#${index + 1}`;
  frame.title = `Slide ${index + 1}`;
  frame.loading = "eager";
  frame.addEventListener("load", () => {
    loaded += 1;
    status.textContent = `${loaded} / ${deck.length} screens loaded`;
    if (loaded === deck.length) document.body.dataset.ready = "true";
  });

  caption.textContent = `Slide ${index + 1}`;
  figure.append(frame, caption);
  sheet.append(figure);
});
