#!/usr/bin/env python3
"""Build the minimal one-second digital-artifact carousel used by the deck."""

from __future__ import annotations

import argparse
import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ARTIFACTS = (
    ("LEGAL CONTRACT", "legal"),
    ("CLINICAL ASSESSMENT", "clinical"),
    ("SCIENTIFIC ANALYSIS", "science"),
    ("CONSULTANT REPORT", "consulting"),
    ("PRESENTATION", "presentation"),
    ("SOFTWARE PIPELINE", "pipeline"),
)

SIZE = (1200, 675)
FRAMES_PER_ITEM = 10
FRAME_MS = 100
CREAM = (247, 240, 227, 255)
PAPER = (255, 249, 239, 255)
NAVY = (13, 43, 69, 255)
TEAL = (23, 127, 130, 255)
CORAL = (239, 103, 85, 255)
MUSTARD = (227, 165, 26, 255)
MUTED = (101, 95, 87, 255)


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
    draw.line(points, fill=NAVY, width=width, joint="curve")


def icon_legal(draw: ImageDraw.ImageDraw) -> None:
    draw.rounded_rectangle((76, 38, 222, 230), radius=10, fill=PAPER, outline=NAVY, width=9)
    draw.polygon(((176, 38), (222, 84), (176, 84)), fill=MUSTARD, outline=NAVY)
    for y, length in ((112, 92), (142, 104), (172, 72)):
        draw.rounded_rectangle((98, y, 98 + length, y + 9), radius=4, fill=TEAL)
    line(draw, [(104, 211), (126, 195), (145, 211), (188, 193)], width=7)


def icon_clinical(draw: ImageDraw.ImageDraw) -> None:
    draw.rounded_rectangle((70, 52, 230, 230), radius=16, fill=PAPER, outline=NAVY, width=9)
    draw.rounded_rectangle((112, 30, 188, 72), radius=12, fill=MUSTARD, outline=NAVY, width=8)
    draw.rounded_rectangle((132, 101, 168, 181), radius=6, fill=CORAL)
    draw.rounded_rectangle((110, 123, 190, 159), radius=6, fill=CORAL)


def icon_science(draw: ImageDraw.ImageDraw) -> None:
    line(draw, [(116, 48), (184, 48)], width=9)
    line(draw, [(132, 48), (132, 105), (78, 208), (222, 208), (168, 105), (168, 48)], width=9)
    draw.polygon(((96, 178), (204, 178), (222, 208), (78, 208)), fill=TEAL)
    for x, y, color in ((112, 154, MUSTARD), (152, 184, CORAL), (181, 151, MUSTARD)):
        draw.ellipse((x - 9, y - 9, x + 9, y + 9), fill=color)


def icon_consulting(draw: ImageDraw.ImageDraw) -> None:
    draw.rounded_rectangle((64, 42, 236, 228), radius=13, fill=PAPER, outline=NAVY, width=9)
    for y, length in ((82, 112), (111, 82), (140, 98)):
        draw.rounded_rectangle((88, y, 88 + length, y + 9), radius=4, fill=TEAL)
    line(draw, [(91, 201), (129, 174), (161, 188), (210, 145)], width=10)
    draw.polygon(((210, 145), (183, 145), (210, 119)), fill=CORAL)


def icon_presentation(draw: ImageDraw.ImageDraw) -> None:
    draw.rounded_rectangle((48, 50, 252, 190), radius=12, fill=PAPER, outline=NAVY, width=9)
    draw.rectangle((76, 90, 105, 160), fill=TEAL)
    draw.rectangle((119, 116, 148, 160), fill=MUSTARD)
    draw.rectangle((162, 76, 191, 160), fill=CORAL)
    line(draw, [(150, 190), (150, 224)], width=9)
    line(draw, [(108, 225), (192, 225)], width=9)


def icon_pipeline(draw: ImageDraw.ImageDraw) -> None:
    line(draw, [(65, 142), (235, 142)], width=10)
    colors = (TEAL, CORAL, MUSTARD)
    for index, x in enumerate((55, 120, 185)):
        draw.rounded_rectangle((x, 102, x + 60, 182), radius=12, fill=colors[index], outline=NAVY, width=8)
        draw.ellipse((x + 22, 132, x + 38, 148), fill=PAPER)


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
    draw.rounded_rectangle((25, 28, 305, 338), radius=38, fill=(13, 43, 69, 35))
    draw.rounded_rectangle((12, 15, 292, 325), radius=38, fill=PAPER, outline=NAVY, width=7)
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
    frame = Image.new("RGBA", SIZE, CREAM)
    draw = ImageDraw.Draw(frame)
    draw.ellipse((-130, 440, 380, 820), fill=(23, 127, 130, 28))
    draw.ellipse((820, -170, 1330, 210), fill=(227, 165, 26, 30))
    draw.line((120, 302, 1080, 302), fill=(13, 43, 69, 45), width=5)

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
    draw.text(((SIZE[0] - label_width) / 2, 530), label, font=label_font, fill=NAVY)

    dot_y = 625
    for index in range(count):
        radius = 8 if index == centered else 5
        color = CORAL if index == centered else (13, 43, 69, 90)
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
            local = step / FRAMES_PER_ITEM
            animation.append(palette_frame(render(segment + ease(local), cards)))

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
