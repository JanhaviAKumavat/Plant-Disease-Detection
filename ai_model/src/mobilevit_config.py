import torch

from config import (
    DATASET_DIR,
    CHECKPOINT_DIR,
    RESULTS_DIR,
    RANDOM_SEED,
    NUM_CLASSES
)

# MobileViT configuration

MODEL_NAME = "mobilevit_xxs.cvnets_in1k"

IMAGE_SIZE = 256
BATCH_SIZE = 2
NUM_WORKERS = 0

EPOCHS = 3

# EPOCHS = 5

LEARNING_RATE = 0.0001
WEIGHT_DECAY = 0.0001

DEVICE = torch.device("cpu")

# CPU optimization
torch.set_num_threads(2)

# Reproducibility
torch.manual_seed(RANDOM_SEED)

print("\n========== MOBILEVIT TRAINING CONFIGURATION ==========")

print("Model:", MODEL_NAME)
print("Classes:", NUM_CLASSES)
print("Image size:", IMAGE_SIZE)
print("Batch size:", BATCH_SIZE)
print("Epochs:", EPOCHS)
print("Learning rate:", LEARNING_RATE)
print("Weight decay:", WEIGHT_DECAY)
print("Device:", DEVICE)
print("CPU threads:", torch.get_num_threads())

print("\nMobileViT configuration created successfully!")
