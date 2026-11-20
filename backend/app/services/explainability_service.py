from pathlib import Path
import uuid

import numpy as np
from PIL import Image, ImageFilter
import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt

from backend.app.services.prediction_service import explain_plant_disease


PROJECT_ROOT = Path(__file__).resolve().parents[3]
HEATMAP_DIR = PROJECT_ROOT / "backend" / "generated" / "heatmaps"


def generate_explanation(image: Image.Image):
    HEATMAP_DIR.mkdir(parents=True, exist_ok=True)

    # Generate Integrated Gradients attribution using the existing model.
    explanation = explain_plant_disease(image)

    attribution_map = np.asarray(
        explanation["attributions"],
        dtype=np.float32
    )

    attribution_map = np.nan_to_num(
        attribution_map,
        nan=0.0,
        posinf=0.0,
        neginf=0.0
    )

    # Focus on stronger attribution regions to reduce weak background noise.
    lower = np.percentile(attribution_map, 65)
    upper = np.percentile(attribution_map, 99.5)

    if upper <= lower + 1e-8:
        normalized = np.zeros_like(attribution_map)
    else:
        normalized = np.clip(
            (attribution_map - lower) / (upper - lower),
            0.0,
            1.0
        )

    # Make the strongest attribution regions more prominent.
    normalized = np.power(normalized, 1.25)

    # Resize attribution map to the original image dimensions.
    original_image = image.convert("RGB")

    attribution_image = Image.fromarray(
        np.uint8(normalized * 255),
        mode="L"
    )

    attribution_image = attribution_image.resize(
        original_image.size,
        Image.Resampling.BICUBIC
    )

    # Smooth isolated noisy regions without removing larger patterns.
    blur_radius = max(
        1.0,
        min(original_image.size) * 0.003
    )

    attribution_image = attribution_image.filter(
        ImageFilter.GaussianBlur(radius=blur_radius)
    )

    attribution_array = (
        np.asarray(attribution_image, dtype=np.float32) / 255.0
    )

    # Suppress weak attribution values.
    threshold = 0.18

    strength = np.clip(
        (attribution_array - threshold) / (1.0 - threshold),
        0.0,
        1.0
    )

    # Use a smoother heatmap palette.
    colored_heatmap = plt.get_cmap("inferno")(strength)
    heatmap_rgb = np.uint8(colored_heatmap[..., :3] * 255)

    # Keep the original leaf visible beneath highlighted regions.
    alpha = np.power(strength, 1.15) * 165
    alpha[strength <= 0] = 0

    heatmap_rgba = np.dstack([
        heatmap_rgb,
        np.uint8(alpha)
    ])

    heatmap_image = Image.fromarray(
        heatmap_rgba,
        mode="RGBA"
    )

    overlay_image = Image.alpha_composite(
        original_image.convert("RGBA"),
        heatmap_image
    ).convert("RGB")

    filename = f"explanation_{uuid.uuid4().hex}.png"
    output_path = HEATMAP_DIR / filename

    overlay_image.save(output_path, format="PNG", optimize=True)

    return {
        "predicted_disease": explanation["predicted_disease"],
        "class_index": explanation["class_index"],
        "method": explanation["method"],
        "n_steps": explanation["n_steps"],
        "heatmap_filename": filename,
        "heatmap_path": str(output_path),
        "image_width": original_image.width,
        "image_height": original_image.height
    }
