import json
from pathlib import Path

import torch


# Project directories
PROJECT_ROOT = Path(__file__).resolve().parents[2]

DATASET_DIR = (
    PROJECT_ROOT
    / "ai_model"
    / "datasets"
    / "PlantDoc"
    / "cleaned"
)

MODEL_DIR = PROJECT_ROOT / "ai_model" / "trained_models"
CHECKPOINT_DIR = PROJECT_ROOT / "ai_model" / "checkpoints"
RESULTS_DIR = PROJECT_ROOT / "ai_model" / "results"


# Dataset configuration
IMAGE_SIZE = 224
BATCH_SIZE = 4
NUM_WORKERS = 0

with (DATASET_DIR / "classes.json").open(
    "r", encoding="utf-8"
) as file:
    CLASS_TO_IDX = json.load(file)

NUM_CLASSES = len(CLASS_TO_IDX)


# Training configuration
EPOCHS = 5
LEARNING_RATE = 0.001
WEIGHT_DECAY = 0.0001

DEVICE = torch.device("cpu")

# Limit CPU threads for the first experiment
torch.set_num_threads(2)


# Reproducibility
RANDOM_SEED = 42

torch.manual_seed(RANDOM_SEED)


# Create output directories
for directory in [MODEL_DIR, CHECKPOINT_DIR, RESULTS_DIR]:
    directory.mkdir(parents=True, exist_ok=True)


if __name__ == "__main__":

    print("\n========== TRAINING CONFIGURATION ==========")

    print("Dataset: PlantDoc")
    print("Number of classes:", NUM_CLASSES)
    print("Image size:", IMAGE_SIZE)
    print("Batch size:", BATCH_SIZE)
    print("Workers:", NUM_WORKERS)

    print("\n========== TRAINING SETTINGS ==========")

    print("Epochs:", EPOCHS)
    print("Learning rate:", LEARNING_RATE)
    print("Weight decay:", WEIGHT_DECAY)
    print("Device:", DEVICE)
    print("CPU threads:", torch.get_num_threads())

    print("\n========== OUTPUT DIRECTORIES ==========")

    print("Models:", MODEL_DIR)
    print("Checkpoints:", CHECKPOINT_DIR)
    print("Results:", RESULTS_DIR)

    print("\nTraining configuration created successfully!")
