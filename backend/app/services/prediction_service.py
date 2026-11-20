from pathlib import Path
import json

import torch
from PIL import Image
from torchvision import transforms
from captum.attr import IntegratedGradients

from ai_model.src.model import build_mobilenet_model


# Project paths
PROJECT_ROOT = Path(__file__).resolve().parents[3]

CHECKPOINT_PATH = (
    PROJECT_ROOT
    / "ai_model"
    / "checkpoints"
    / "mobilenetv3_best.pth"
)

CLASSES_PATH = (
    PROJECT_ROOT
    / "ai_model"
    / "datasets"
    / "PlantDoc"
    / "cleaned"
    / "classes.json"
)

DEVICE = torch.device("cpu")

IMAGE_SIZE = 224

# Must match MobileNetV3 training preprocessing
IMAGE_TRANSFORM = transforms.Compose([
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=(0.485, 0.456, 0.406),
        std=(0.229, 0.224, 0.225)
    )
])


class PlantDiseasePredictor:

    def __init__(self):

        self.model = None
        self.classes = None
        self.class_to_idx = None

    def load_model(self):

        if self.model is not None:
            return

        print("\nLoading MobileNetV3 Small prediction model...")

        if not CHECKPOINT_PATH.exists():
            raise FileNotFoundError(
                f"Model checkpoint not found: {CHECKPOINT_PATH}"
            )

        if not CLASSES_PATH.exists():
            raise FileNotFoundError(
                f"Class mapping not found: {CLASSES_PATH}"
            )

        with CLASSES_PATH.open("r", encoding="utf-8") as file:
            self.class_to_idx = json.load(file)

        self.classes = sorted(
            self.class_to_idx,
            key=lambda name: int(self.class_to_idx[name])
        )

        self.model = build_mobilenet_model()

        checkpoint = torch.load(
            CHECKPOINT_PATH,
            map_location=DEVICE,
            weights_only=False
        )

        if checkpoint.get("class_to_idx") != self.class_to_idx:
            raise ValueError(
                "Checkpoint class mapping does not match dataset!"
            )

        self.model.load_state_dict(
            checkpoint["model_state_dict"]
        )

        self.model.to(DEVICE)
        self.model.eval()

        print("MobileNetV3 Small loaded successfully!")
        print("Checkpoint epoch:", checkpoint["epoch"])
        print("Validation accuracy:", checkpoint["validation_accuracy"])
        print("Number of classes:", len(self.classes))

    def predict(self, image: Image.Image):

        self.load_model()

        image = image.convert("RGB")

        image_tensor = IMAGE_TRANSFORM(image)
        image_tensor = image_tensor.unsqueeze(0).to(DEVICE)

        with torch.inference_mode():

            outputs = self.model(image_tensor)

            probabilities = torch.softmax(outputs, dim=1)[0]

            top_count = min(3, len(self.classes))

            top_probabilities, top_indices = torch.topk(
                probabilities,
                k=top_count
            )

        predictions = []

        for probability, index in zip(
            top_probabilities.tolist(),
            top_indices.tolist()
        ):

            predictions.append({
                "disease": self.classes[index],
                "confidence": round(probability * 100, 2)
            })

        return {
            "predicted_disease": predictions[0]["disease"],
            "confidence": predictions[0]["confidence"],
            "top_predictions": predictions,
            "model": "MobileNetV3 Small"
        }

    def explain(self, image: Image.Image, n_steps: int = 16):

        self.load_model()

        image = image.convert("RGB")

        image_tensor = IMAGE_TRANSFORM(image)
        image_tensor = image_tensor.unsqueeze(0).to(DEVICE)

        image_tensor.requires_grad_()

        # Determine the predicted class
        with torch.no_grad():
            outputs = self.model(image_tensor.detach())
            predicted_index = int(torch.argmax(outputs, dim=1).item())

        # Integrated Gradients requires gradient computation.
        # Do not use torch.no_grad() or torch.inference_mode() here.
        integrated_gradients = IntegratedGradients(self.model)

        attributions = integrated_gradients.attribute(
            image_tensor,
            target=predicted_index,
            n_steps=n_steps
        )

        # Convert channel-wise attribution into a 2D heatmap.
        attribution_map = attributions.detach().squeeze(0).abs().mean(dim=0)

        # Normalize values between 0 and 1.
        minimum = attribution_map.min()
        maximum = attribution_map.max()

        attribution_map = (
            (attribution_map - minimum) /
            (maximum - minimum + 1e-8)
        )

        return {
            "predicted_disease": self.classes[predicted_index],
            "class_index": predicted_index,
            "attributions": attribution_map.cpu().numpy(),
            "image_size": IMAGE_SIZE,
            "method": "Integrated Gradients",
            "n_steps": n_steps
        }


# Shared predictor instance
predictor = PlantDiseasePredictor()


def predict_plant_disease(image: Image.Image):

    return predictor.predict(image)


def explain_plant_disease(image: Image.Image, n_steps: int = 16):

    return predictor.explain(image, n_steps)
