#!/usr/bin/env python3
"""Build the monochrome two-second digital-artifact carousel used by the deck."""

from __future__ import annotations

import argparse
import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ARTIFACTS = (
    ("LEGAL CONTRACT", "legal"),
    ("CLINICAL ASSESSMENT", "clinical"),
    ("SCIENTIFIC REPORT", "science"),
    ("CONSULTANT REPORT", "consulting"),
    ("PRESENTATION", "presentation"),
    ("SOFTWARE PIPELINE", "pipeline"),
)

SIZE = (1200, 675)
FRAMES_PER_ITEM = 20
HOLD_FRAMES = 16
FRAME_MS = 100
WHITE = (255, 255, 255, 255)
PAPER = (252, 252, 250, 255)
BLACK = (20, 20, 20, 255)
GRAY = (118, 118, 118, 255)
LIGHT_GRAY = (218, 218, 215, 255)


def font(size: int, *, bold: bool = False) -> ImageFont.FreeTypeFont:
    candidates = (
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
        if bold
        else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
        if bold
        else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    )
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    raise FileNotFoundError("No supported presentation font was found")


def line(draw: ImageDraw.ImageDraw, points: list[tuple[int, int]], *, width: int = 9) -> None:
    draw.line(points, fill=BLACK, width=width, joint="curve")


def text_line(draw: ImageDraw.ImageDraw, x: int, y: int, length: int, *, width: int = 5) -> None:
    draw.rounded_rectangle((x, y, x + length, y + width), radius=width // 2, fill=GRAY)


def document(draw: ImageDraw.ImageDraw, *, x0: int = 74, y0: int = 26, x1: int = 226, y1: int = 238) -> None:
    draw.rectangle((x0, y0, x1, y1), fill=PAPER, outline=BLACK, width=7)


def icon_legal(draw: ImageDraw.ImageDraw) -> None:
    document(draw)
    draw.text((98, 48), "CONTRACT", font=font(20, bold=True), fill=BLACK)
    for y, length in ((83, 105), (100, 112), (117, 96), (146, 109), (163, 103)):
        text_line(draw, 93, y, length, width=4)
    line(draw, [(94, 207), (116, 191), (136, 208), (183, 187)], width=5)
    text_line(draw, 91, 218, 105, width=3)


def icon_clinical(draw: ImageDraw.ImageDraw) -> None:
    document(draw)
    draw.text((91, 44), "ASSESSMENT", font=font(16, bold=True), fill=BLACK)
    text_line(draw, 93, 73, 103, width=4)
    for y in (101, 126, 151):
        draw.rectangle((94, y, 108, y + 14), outline=BLACK, width=3)
        draw.line((97, y + 7, 102, y + 12, 111, y + 1), fill=BLACK, width=3)
        text_line(draw, 120, y + 5, 78, width=4)
    draw.ellipse((125, 181, 143, 199), outline=BLACK, width=4)
    line(draw, [(134, 199), (134, 224), (119, 238)], width=4)
    line(draw, [(134, 224), (149, 238)], width=4)
    line(draw, [(134, 207), (116, 217)], width=4)
    line(draw, [(134, 207), (152, 217)], width=4)


def icon_science(draw: ImageDraw.ImageDraw) -> None:
    document(draw, x0=65, y0=18, x1=235, y1=246)
    draw.text((92, 35), "RESEARCH", font=font(18, bold=True), fill=BLACK)
    text_line(draw, 87, 65, 126, width=4)
    draw.text((86, 80), "ABSTRACT", font=font(10, bold=True), fill=BLACK)
    for y, length in ((98, 128), (110, 119), (122, 126)):
        text_line(draw, 86, y, length, width=3)
    draw.line((91, 204, 91, 145, 211, 145), fill=BLACK, width=3)
    line(draw, [(96, 194), (124, 177), (148, 184), (177, 157), (207, 165)], width=4)
    draw.text((86, 214), "REFERENCES", font=font(9, bold=True), fill=BLACK)
    text_line(draw, 145, 219, 68, width=3)


def icon_consulting(draw: ImageDraw.ImageDraw) -> None:
    document(draw)
    draw.rectangle((74, 26, 226, 76), fill=BLACK)
    draw.text((91, 43), "REPORT", font=font(19, bold=True), fill=WHITE)
    draw.text((94, 96), "FINDINGS", font=font(13, bold=True), fill=BLACK)
    for y, length in ((120, 108), (134, 96), (148, 104)):
        text_line(draw, 94, y, length, width=3)
    draw.rectangle((95, 183, 114, 218), fill=GRAY)
    draw.rectangle((124, 169, 143, 218), fill=BLACK)
    draw.rectangle((153, 190, 172, 218), fill=GRAY)
    draw.rectangle((182, 157, 201, 218), fill=BLACK)


def icon_presentation(draw: ImageDraw.ImageDraw) -> None:
    draw.rectangle((43, 40, 257, 198), fill=PAPER, outline=BLACK, width=8)
    draw.rectangle((62, 59, 238, 179), outline=GRAY, width=3)
    draw.text((79, 73), "PRESENTATION", font=font(17, bold=True), fill=BLACK)
    for y, length in ((110, 82), (130, 68), (150, 91)):
        draw.ellipse((78, y, 84, y + 6), fill=BLACK)
        text_line(draw, 93, y + 1, length, width=4)
    line(draw, [(150, 198), (150, 231)], width=7)
    line(draw, [(106, 232), (194, 232)], width=7)


def icon_pipeline(draw: ImageDraw.ImageDraw) -> None:
    for x, label in ((36, "DATA"), (119, "CODE"), (202, "RESULT")):
        draw.rectangle((x, 102, x + 62, 174), fill=PAPER, outline=BLACK, width=6)
        label_font = font(10, bold=True)
        bounds = draw.textbbox((0, 0), label, font=label_font)
        draw.text((x + (62 - bounds[2]) / 2, 130), label, font=label_font, fill=BLACK)
    for x in (101, 184):
        line(draw, [(x, 138), (x + 14, 138)], width=5)
        draw.polygon(((x + 18, 138), (x + 8, 130), (x + 8, 146)), fill=BLACK)
    draw.text((83, 201), "AUTOMATED PIPELINE", font=font(14, bold=True), fill=BLACK)


ICON_DRAWERS = {
    "legal": icon_legal,
    "clinical": icon_clinical,
    "science": icon_science,
    "consulting": icon_consulting,
    "presentation": icon_presentation,
    "pipeline": icon_pipeline,
}


def icon_card(kind: str) -> Image.Image:
    card = Image.new("RGBA", (320, 360), (0, 0, 0, 0))
    draw = ImageDraw.Draw(card)
    draw.rounded_rectangle((24, 27, 306, 340), radius=25, fill=(0, 0, 0, 28))
    draw.rounded_rectangle((12, 15, 294, 328), radius=25, fill=WHITE, outline=BLACK, width=6)
    icon_layer = Image.new("RGBA", (300, 270), (0, 0, 0, 0))
    ICON_DRAWERS[kind](ImageDraw.Draw(icon_layer))
    card.alpha_composite(icon_layer, (6, 30))
    return card


def ease(value: float) -> float:
    return 0.5 - 0.5 * math.cos(math.pi * value)


def faded(image: Image.Image, opacity: float) -> Image.Image:
    result = image.copy()
    alpha = result.getchannel("A").point(lambda value: round(value * opacity))
    result.putalpha(alpha)
    return result


def render(position: float, cards: list[Image.Image]) -> Image.Image:
    frame = Image.new("RGBA", SIZE, WHITE)
    draw = ImageDraw.Draw(frame)
    draw.line((120, 302, 1080, 302), fill=LIGHT_GRAY, width=4)

    count = len(cards)
    for index, card in enumerate(cards):
        distance = ((index - position + count / 2) % count) - count / 2
        if abs(distance) > 1.75:
            continue
        x = 600 + distance * 370
        magnitude = min(abs(distance), 1.0)
        scale = 1.0 - 0.38 * magnitude
        opacity = 1.0 - 0.58 * magnitude
        resized = card.resize(
            (round(card.width * scale), round(card.height * scale)),
            Image.Resampling.LANCZOS,
        )
        resized = faded(resized, opacity)
        frame.alpha_composite(resized, (round(x - resized.width / 2), round(285 - resized.height / 2)))

    centered = round(position) % count
    label = ARTIFACTS[centered][0]
    label_font = font(42, bold=True)
    bounds = draw.textbbox((0, 0), label, font=label_font)
    label_width = bounds[2] - bounds[0]
    draw.text(((SIZE[0] - label_width) / 2, 530), label, font=label_font, fill=BLACK)

    dot_y = 625
    for index in range(count):
        radius = 8 if index == centered else 5
        color = BLACK if index == centered else (135, 135, 135, 255)
        x = 525 + index * 30
        draw.ellipse((x - radius, dot_y - radius, x + radius, dot_y + radius), fill=color)

    return frame.convert("RGB")


def palette_frame(frame: Image.Image) -> Image.Image:
    return frame.quantize(
        colors=128,
        method=Image.Quantize.MEDIANCUT,
        dither=Image.Dither.FLOYDSTEINBERG,
    )


def build(output: Path) -> None:
    cards = [icon_card(kind) for _, kind in ARTIFACTS]
    animation: list[Image.Image] = []
    for segment in range(len(ARTIFACTS)):
        for step in range(FRAMES_PER_ITEM):
            if step < HOLD_FRAMES:
                position = float(segment)
            else:
                transition = (step - HOLD_FRAMES + 1) / (FRAMES_PER_ITEM - HOLD_FRAMES)
                position = segment + ease(transition)
            animation.append(palette_frame(render(position, cards)))

    output.parent.mkdir(parents=True, exist_ok=True)
    animation[0].save(
        output,
        save_all=True,
        append_images=animation[1:],
        duration=FRAME_MS,
        loop=0,
        disposal=2,
        optimize=True,
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    build(args.output)


if __name__ == "__main__":
    main()
