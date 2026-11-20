import csv
import torch
import torch.nn as nn

from torch.optim import AdamW

from config import (
    CHECKPOINT_DIR,
    RESULTS_DIR,
    RANDOM_SEED,
    CLASS_TO_IDX
)

from mobilevit_config import (
    DEVICE,
    EPOCHS,
    LEARNING_RATE,
    WEIGHT_DECAY,
    NUM_CLASSES,
    MODEL_NAME
)

from mobilevit_model import build_mobilevit_model
from mobilevit_finetuning import configure_finetuning
from mobilevit_dataset import create_mobilevit_dataloaders


def calculate_accuracy(outputs, labels):
    predictions = torch.argmax(outputs, dim=1)
    return (predictions == labels).sum().item()


def train_one_epoch(model, loader, criterion, optimizer):

    model.train()

    model.stem.eval()

    for index in range(3):
        model.stages[index].eval()

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
        total_correct += calculate_accuracy(outputs.detach(), labels)
        total_samples += batch_size

        if (batch_index + 1) % 100 == 0:
            print(
                f"Training batch {batch_index + 1}/{len(loader)}"
            )

    return (
        total_loss / total_samples,
        100.0 * total_correct / total_samples
    )


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
            total_correct += calculate_accuracy(outputs, labels)
            total_samples += batch_size

    return (
        total_loss / total_samples,
        100.0 * total_correct / total_samples
    )


def main():

    print("\n========== MOBILEVIT TRAINING ==========")

    torch.manual_seed(RANDOM_SEED)

    train_loader, validation_loader = create_mobilevit_dataloaders()

    checkpoint_path = CHECKPOINT_DIR / "mobilevit_xxs_best.pth"
    history_path = RESULTS_DIR / "mobilevit_training_history.csv"

    model = build_mobilevit_model(
        num_classes=NUM_CLASSES,
        pretrained=True
    )

    model = configure_finetuning(model)
    model = model.to(DEVICE)

    criterion = nn.CrossEntropyLoss()

    optimizer = AdamW(
        filter(
            lambda parameter: parameter.requires_grad,
            model.parameters()
        ),
        lr=LEARNING_RATE,
        weight_decay=WEIGHT_DECAY
    )

    start_epoch = 0
    best_validation_accuracy = -1.0
    history = []

    # Resume from the existing checkpoint.
    if checkpoint_path.exists():

        checkpoint = torch.load(
            checkpoint_path,
            map_location=DEVICE,
            weights_only=False
        )

        if checkpoint.get("class_to_idx") != CLASS_TO_IDX:
            raise ValueError("Checkpoint class mapping does not match dataset.")

        model.load_state_dict(checkpoint["model_state_dict"])
        optimizer.load_state_dict(checkpoint["optimizer_state_dict"])

        start_epoch = checkpoint["epoch"]
        best_validation_accuracy = checkpoint["validation_accuracy"]

        print("\nCheckpoint loaded successfully!")
        print("Resuming after epoch:", start_epoch)

        if history_path.exists():

            with history_path.open(
                "r", newline="", encoding="utf-8"
            ) as file:
                history = list(csv.DictReader(file))

    print("\nTraining images:", len(train_loader.dataset))
    print("Validation images:", len(validation_loader.dataset))
    print("Device:", DEVICE)
    print("Starting epoch:", start_epoch + 1)
    print("Total epochs:", EPOCHS)

    if start_epoch >= EPOCHS:
        print("\nTraining already completed for the configured epochs.")
        return

    for epoch in range(start_epoch, EPOCHS):

        print(f"\n========== EPOCH {epoch + 1}/{EPOCHS} ==========")

        train_loss, train_accuracy = train_one_epoch(
            model,
            train_loader,
            criterion,
            optimizer
        )

        validation_loss, validation_accuracy = validate(
            model,
            validation_loader,
            criterion
        )

        print("\nTraining Loss:", round(train_loss, 4))
        print("Training Accuracy:", round(train_accuracy, 2), "%")
        print("Validation Loss:", round(validation_loss, 4))
        print("Validation Accuracy:", round(validation_accuracy, 2), "%")

        history.append({
            "epoch": epoch + 1,
            "train_loss": train_loss,
            "train_accuracy": train_accuracy,
            "validation_loss": validation_loss,
            "validation_accuracy": validation_accuracy
        })

        if validation_accuracy > best_validation_accuracy:

            best_validation_accuracy = validation_accuracy

            torch.save({
                "epoch": epoch + 1,
                "model_name": MODEL_NAME,
                "num_classes": NUM_CLASSES,
                "class_to_idx": CLASS_TO_IDX,
                "model_state_dict": model.state_dict(),
                "optimizer_state_dict": optimizer.state_dict(),
                "validation_accuracy": validation_accuracy
            }, checkpoint_path)

            print("\nBest MobileViT checkpoint saved!")

        with history_path.open(
            "w", newline="", encoding="utf-8"
        ) as file:

            writer = csv.DictWriter(
                file,
                fieldnames=[
                    "epoch",
                    "train_loss",
                    "train_accuracy",
                    "validation_loss",
                    "validation_accuracy"
                ]
            )

            writer.writeheader()
            writer.writerows(history)

    print("\n========== MOBILEVIT TRAINING COMPLETED ==========")
    print("Best validation accuracy:", round(best_validation_accuracy, 2), "%")
    print("Checkpoint:", checkpoint_path)
    print("Training history:", history_path)


if __name__ == "__main__":
    torch.set_num_threads(2)
    main()
