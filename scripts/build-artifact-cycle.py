#!/usr/bin/env python3
"""Build the slow crossfading digital-artifact GIF used by the web deck."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


FRAMES = (
    ("01-legal-contract.png", "LEGAL CONTRACT", "CLAUSES · AUTHORITY · COMPLIANCE"),
    (
        "02-clinical-assessment.png",
        "CLINICAL ASSESSMENT",
        "EVIDENCE · SAFETY · PRIVACY",
    ),
    (
        "03-scientific-analysis.png",
        "SCIENTIFIC ANALYSIS",
        "DATA · STATISTICS · REPRODUCIBILITY",
    ),
    (
        "04-consultant-report.png",
        "CONSULTANT REPORT",
        "FACTS · LOGIC · USEFULNESS",
    ),
    (
        "05-presentation-style-guide.png",
        "PRESENTATION + STYLE GUIDE",
        "AUDIENCE · ACCESSIBILITY · CLARITY",
    ),
    (
        "06-software-data-pipeline.png",
        "SOFTWARE + DATA PIPELINE",
        "TESTS · SECURITY · PORTABILITY",
    ),
)

SIZE = (1200, 675)
HOLD_MS = 2200
TRANSITION_STEPS = 5
TRANSITION_MS = 140


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


def labeled_frame(path: Path, title: str, criteria: str) -> Image.Image:
    frame = ImageOps.fit(Image.open(path).convert("RGB"), SIZE, Image.Resampling.LANCZOS)
    overlay = Image.new("RGBA", SIZE, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    draw.rounded_rectangle((38, 38, 720, 153), radius=18, fill=(13, 43, 69, 230))
    draw.text((68, 54), title, font=font(34, bold=True), fill=(247, 240, 227, 255))
    draw.text((68, 105), criteria, font=font(21), fill=(227, 165, 26, 255))
    return Image.alpha_composite(frame.convert("RGBA"), overlay).convert("RGB")


def palette_frame(frame: Image.Image) -> Image.Image:
    return frame.quantize(
        colors=160,
        method=Image.Quantize.MEDIANCUT,
        dither=Image.Dither.FLOYDSTEINBERG,
    )


def build(input_dir: Path, output: Path) -> None:
    keyframes = [
        labeled_frame(input_dir / filename, title, criteria)
        for filename, title, criteria in FRAMES
    ]
    animation: list[Image.Image] = []
    durations: list[int] = []

    for index, current in enumerate(keyframes):
        following = keyframes[(index + 1) % len(keyframes)]
        animation.append(palette_frame(current))
        durations.append(HOLD_MS)
        for step in range(1, TRANSITION_STEPS + 1):
            ratio = step / (TRANSITION_STEPS + 1)
            animation.append(palette_frame(Image.blend(current, following, ratio)))
            durations.append(TRANSITION_MS)

    output.parent.mkdir(parents=True, exist_ok=True)
    animation[0].save(
        output,
        save_all=True,
        append_images=animation[1:],
        duration=durations,
        loop=0,
        disposal=2,
        optimize=True,
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("input_dir", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    build(args.input_dir, args.output)


if __name__ == "__main__":
    main()
