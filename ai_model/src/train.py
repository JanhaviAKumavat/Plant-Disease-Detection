import csv
import random
from pathlib import Path
from collections import defaultdict

import torch
import torch.nn as nn
from torch.optim import Adam
from torch.utils.data import DataLoader, Subset

from config import (
    DATASET_DIR,
    MODEL_DIR,
    CHECKPOINT_DIR,
    RESULTS_DIR,
    BATCH_SIZE,
    EPOCHS,
    LEARNING_RATE,
    WEIGHT_DECAY,
    DEVICE,
    RANDOM_SEED,
    NUM_WORKERS
)

from dataset_loader import (
    PlantDocDataset,
    train_transform,
    test_transform
)

from model import build_mobilenet_model


def create_stratified_split(records, validation_ratio=0.20):

    class_indices = defaultdict(list)

    for index, record in enumerate(records):
        class_indices[record["class"]].append(index)

    rng = random.Random(RANDOM_SEED)

    train_indices = []
    validation_indices = []

    for class_name, indices in class_indices.items():

        rng.shuffle(indices)

        validation_count = max(
            1,
            round(len(indices) * validation_ratio)
        )

        validation_count = min(
            validation_count,
            len(indices) - 1
        )

        validation_indices.extend(indices[:validation_count])
        train_indices.extend(indices[validation_count:])

    rng.shuffle(train_indices)
    rng.shuffle(validation_indices)

    return train_indices, validation_indices


def calculate_accuracy(predictions, labels):

    predicted_classes = torch.argmax(predictions, dim=1)

    correct = (predicted_classes == labels).sum().item()

    return correct


def train_one_epoch(model, loader, criterion, optimizer):

    model.train()

    # Feature extractor remains frozen.
    # Keep its BatchNorm statistics fixed as well.
    model.features.eval()

    total_loss = 0.0
    total_correct = 0
    total_samples = 0

    for batch_index, (images, labels) in enumerate(loader):

        images = images.to(DEVICE)
        labels = labels.to(DEVICE)

        optimizer.zero_grad(set_to_none=True)

        outputs = model(images)

        loss = criterion(outputs, labels)

        loss.backward()

        optimizer.step()

        batch_size = labels.size(0)

        total_loss += loss.item() * batch_size

        total_correct += calculate_accuracy(
            outputs.detach(),
            labels
        )

        total_samples += batch_size

        if (batch_index + 1) % 100 == 0:
            print(
                f"Training batch "
                f"{batch_index + 1}/{len(loader)}"
            )

    average_loss = total_loss / total_samples
    accuracy = 100.0 * total_correct / total_samples

    return average_loss, accuracy


def validate(model, loader, criterion):

    model.eval()

    total_loss = 0.0
    total_correct = 0
    total_samples = 0

    with torch.inference_mode():

        for images, labels in loader:

            images = images.to(DEVICE)
            labels = labels.to(DEVICE)

            outputs = model(images)

            loss = criterion(outputs, labels)

            batch_size = labels.size(0)

            total_loss += loss.item() * batch_size

            total_correct += calculate_accuracy(
                outputs,
                labels
            )

            total_samples += batch_size

    average_loss = total_loss / total_samples
    accuracy = 100.0 * total_correct / total_samples

    return average_loss, accuracy


def main():

    print("\n========== PLANTDOC TRAINING ==========")

    torch.manual_seed(RANDOM_SEED)

    manifest = DATASET_DIR / "train_manifest.csv"

    train_dataset = PlantDocDataset(
        manifest,
        transform=train_transform
    )

    validation_dataset = PlantDocDataset(
        manifest,
        transform=test_transform
    )

    train_indices, validation_indices = create_stratified_split(
        train_dataset.records
    )

    train_subset = Subset(train_dataset, train_indices)

    validation_subset = Subset(
        validation_dataset,
        validation_indices
    )

    train_loader = DataLoader(
        train_subset,
        batch_size=BATCH_SIZE,
        shuffle=True,
        num_workers=NUM_WORKERS,
        pin_memory=False
    )

    validation_loader = DataLoader(
        validation_subset,
        batch_size=BATCH_SIZE,
        shuffle=False,
        num_workers=NUM_WORKERS,
        pin_memory=False
    )

    print("Training images:", len(train_subset))
    print("Validation images:", len(validation_subset))
    print("Final test images: 227 (reserved)")
    print("Device:", DEVICE)

    model = build_mobilenet_model()
    model = model.to(DEVICE)

    criterion = nn.CrossEntropyLoss()

    optimizer = Adam(
        filter(
            lambda parameter: parameter.requires_grad,
            model.parameters()
        ),
        lr=LEARNING_RATE,
        weight_decay=WEIGHT_DECAY
    )

    best_validation_accuracy = -1.0

    history_file = RESULTS_DIR / "mobilenet_training_history.csv"

    history = []

    for epoch in range(EPOCHS):

        print(f"\n========== EPOCH {epoch + 1}/{EPOCHS} ==========")

        train_loss, train_accuracy = train_one_epoch(
            model,
            train_loader,
            criterion,
            optimizer
        )

        val_loss, val_accuracy = validate(
            model,
            validation_loader,
            criterion
        )

        print("\nTraining Loss:", round(train_loss, 4))
        print("Training Accuracy:", round(train_accuracy, 2), "%")

        print("Validation Loss:", round(val_loss, 4))
        print("Validation Accuracy:", round(val_accuracy, 2), "%")

        history.append({
            "epoch": epoch + 1,
            "train_loss": train_loss,
            "train_accuracy": train_accuracy,
            "validation_loss": val_loss,
            "validation_accuracy": val_accuracy
        })

        if val_accuracy > best_validation_accuracy:

            best_validation_accuracy = val_accuracy

            checkpoint_path = (
                CHECKPOINT_DIR / "mobilenetv3_best.pth"
            )

            torch.save({
                "epoch": epoch + 1,
                "model_state_dict": model.state_dict(),
                "optimizer_state_dict": optimizer.state_dict(),
                "validation_accuracy": val_accuracy,
                "class_to_idx": __import__("json").load(
                    open(DATASET_DIR / "classes.json", encoding="utf-8")
                )
            }, checkpoint_path)

            print("Best checkpoint saved:", checkpoint_path)

    with history_file.open(
        "w",
        newline="",
        encoding="utf-8"
    ) as file:

        writer = csv.DictWriter(
            file,
            fieldnames=history[0].keys()
        )

        writer.writeheader()
        writer.writerows(history)

    print("\n========== TRAINING COMPLETED ==========")

    print(
        "Best validation accuracy:",
        round(best_validation_accuracy, 2),
        "%"
    )

    print("Checkpoint:", CHECKPOINT_DIR / "mobilenetv3_best.pth")
    print("History:", history_file)


if __name__ == "__main__":
    main()
