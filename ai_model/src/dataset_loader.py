import csv
import json
from pathlib import Path

import torch
from PIL import Image
from torch.utils.data import Dataset, DataLoader
from torchvision import transforms


PROJECT_ROOT = Path(__file__).resolve().parents[2]

DATASET_DIR = (
    PROJECT_ROOT
    / "ai_model"
    / "datasets"
    / "PlantDoc"
    / "cleaned"
)

IMAGE_SIZE = 224
BATCH_SIZE = 8
NUM_WORKERS = 0


class PlantDocDataset(Dataset):

    def __init__(self, manifest_file, transform=None):

        self.manifest_file = Path(manifest_file)
        self.transform = transform

        if not self.manifest_file.exists():
            raise FileNotFoundError(
                f"Manifest not found: {self.manifest_file}"
            )

        with self.manifest_file.open(
            "r",
            encoding="utf-8-sig",
            newline=""
        ) as file:

            self.records = list(csv.DictReader(file))

        if not self.records:
            raise ValueError(
                f"No records found in {self.manifest_file}"
            )

    def __len__(self):
        return len(self.records)

    def __getitem__(self, index):

        record = self.records[index]

        image_path = Path(record["path"])

        if not image_path.is_absolute():
            image_path = PROJECT_ROOT / image_path

        if not image_path.exists():
            raise FileNotFoundError(
                f"Image not found: {image_path}"
            )

        image = Image.open(image_path).convert("RGB")

        label = int(record["class_index"])

        if self.transform:
            image = self.transform(image)

        return image, label


# Training transformations
train_transform = transforms.Compose([

    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),

    transforms.RandomHorizontalFlip(p=0.5),

    transforms.RandomRotation(degrees=10),

    transforms.ColorJitter(
        brightness=0.1,
        contrast=0.1
    ),

    transforms.ToTensor(),

    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])


# Testing transformations
test_transform = transforms.Compose([

    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),

    transforms.ToTensor(),

    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])


def create_dataloaders():

    train_manifest = DATASET_DIR / "train_manifest.csv"
    test_manifest = DATASET_DIR / "test_manifest.csv"

    train_dataset = PlantDocDataset(
        train_manifest,
        transform=train_transform
    )

    test_dataset = PlantDocDataset(
        test_manifest,
        transform=test_transform
    )

    train_loader = DataLoader(
        train_dataset,
        batch_size=BATCH_SIZE,
        shuffle=True,
        num_workers=NUM_WORKERS,
        pin_memory=False
    )

    test_loader = DataLoader(
        test_dataset,
        batch_size=BATCH_SIZE,
        shuffle=False,
        num_workers=NUM_WORKERS,
        pin_memory=False
    )

    return train_loader, test_loader


if __name__ == "__main__":

    print("\n========== PLANTDOC DATASET LOADER ==========")

    classes_file = DATASET_DIR / "classes.json"

    with classes_file.open("r", encoding="utf-8") as file:
        class_to_idx = json.load(file)

    train_loader, test_loader = create_dataloaders()

    print("Number of classes:", len(class_to_idx))
    print("Training images:", len(train_loader.dataset))
    print("Testing images:", len(test_loader.dataset))

    images, labels = next(iter(train_loader))

    print("\n========== FIRST TRAINING BATCH ==========")

    print("Image batch shape:", images.shape)
    print("Label batch shape:", labels.shape)
    print("Image data type:", images.dtype)
    print("Label data type:", labels.dtype)

    print("\nFirst 8 labels:")

    print(labels.tolist())

    print("\nDevice: CPU")
    print("Dataset loader working successfully!")
