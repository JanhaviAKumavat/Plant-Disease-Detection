from pathlib import Path
from PIL import Image

from backend.app.services.explainability_service import generate_explanation


PROJECT_ROOT = Path(__file__).resolve().parents[1]

IMAGE_PATH = (
    PROJECT_ROOT
    / "ai_model"
    / "datasets"
    / "PlantDoc"
    / "raw"
    / "PlantDoc-Dataset-master"
    / "test"
    / "Apple leaf"
    / "20180511_090912-14gtw8a-e1526047952754.jpg"
)


print("\n========== EXPLAINABILITY TEST ==========")

if not IMAGE_PATH.exists():
    raise FileNotFoundError(f"Test image not found: {IMAGE_PATH}")

image = Image.open(IMAGE_PATH).convert("RGB")

print("Input image:", IMAGE_PATH.name)
print("Original image size:", image.size)
print("\nGenerating Integrated Gradients heatmap...")

result = generate_explanation(image)

print("\n========== EXPLANATION RESULT ==========")
print("Predicted disease:", result["predicted_disease"])
print("Class index:", result["class_index"])
print("Method:", result["method"])
print("Steps:", result["n_steps"])
print("Heatmap filename:", result["heatmap_filename"])
print("Heatmap path:", result["heatmap_path"])
print("Image dimensions:", result["image_width"], "x", result["image_height"])

print("\nExplainability test completed successfully!")
