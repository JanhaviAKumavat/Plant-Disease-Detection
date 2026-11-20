import json
from pathlib import Path

import torch
import torch.nn as nn
from torchvision.models import (
    mobilenet_v3_small,
    MobileNet_V3_Small_Weights
)


PROJECT_ROOT = Path(__file__).resolve().parents[2]

DATASET_DIR = (
    PROJECT_ROOT
    / "ai_model"
    / "datasets"
    / "PlantDoc"
    / "cleaned"
)

NUM_CLASSES = 27


def build_mobilenet_model():

    classes_file = DATASET_DIR / "classes.json"

    with classes_file.open("r", encoding="utf-8") as file:
        class_to_idx = json.load(file)

    num_classes = len(class_to_idx)

    print("Loading pretrained MobileNetV3 Small...")

    model = mobilenet_v3_small(
        weights=MobileNet_V3_Small_Weights.DEFAULT
    )

    # Freeze feature extraction layers
    for parameter in model.features.parameters():
        parameter.requires_grad = False

    # Freeze existing classifier layers
    for parameter in model.classifier.parameters():
        parameter.requires_grad = False

    # Replace final classification layer
    input_features = model.classifier[-1].in_features

    model.classifier[-1] = nn.Linear(
        input_features,
        num_classes
    )

    return model


if __name__ == "__main__":

    print("\n========== MOBILENETV3 SMALL ==========")

    device = torch.device("cpu")

    model = build_mobilenet_model()
    model = model.to(device)

    total_parameters = sum(
        parameter.numel()
        for parameter in model.parameters()
    )

    trainable_parameters = sum(
        parameter.numel()
        for parameter in model.parameters()
        if parameter.requires_grad
    )

    frozen_parameters = total_parameters - trainable_parameters

    print("\nModel loaded successfully!")

    print("Architecture: MobileNetV3 Small")
    print("Number of output classes:", NUM_CLASSES)
    print("Device:", device)

    print("\n========== MODEL PARAMETERS ==========")

    print("Total parameters:", f"{total_parameters:,}")
    print("Trainable parameters:", f"{trainable_parameters:,}")
    print("Frozen parameters:", f"{frozen_parameters:,}")

    print("\nFinal classification layer:")
    print(model.classifier[-1])

    print("\nModel preparation completed successfully!")
