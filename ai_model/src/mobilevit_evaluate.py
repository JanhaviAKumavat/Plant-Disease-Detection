import csv
import json

import torch
from torch.utils.data import DataLoader
from torchvision import transforms

from config import DATASET_DIR, CHECKPOINT_DIR, RESULTS_DIR, CLASS_TO_IDX
from dataset_loader import PlantDocDataset
from mobilevit_config import DEVICE, BATCH_SIZE, NUM_WORKERS, IMAGE_SIZE
from mobilevit_model import (
    build_mobilevit_model,
    NORMALIZE_MEAN,
    NORMALIZE_STD
)


def main():

    print("\n========== MOBILEVIT TEST EVALUATION ==========")

    checkpoint_path = CHECKPOINT_DIR / "mobilevit_xxs_best.pth"
    test_manifest = DATASET_DIR / "test_manifest.csv"

    if not checkpoint_path.exists():
        raise FileNotFoundError(checkpoint_path)

    test_transform = transforms.Compose([
        transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
        transforms.ToTensor(),
        transforms.Normalize(NORMALIZE_MEAN, NORMALIZE_STD)
    ])

    dataset = PlantDocDataset(
        test_manifest,
        transform=test_transform
    )

    loader = DataLoader(
        dataset,
        batch_size=BATCH_SIZE,
        shuffle=False,
        num_workers=NUM_WORKERS,
        pin_memory=False
    )

    model = build_mobilevit_model().to(DEVICE)

    checkpoint = torch.load(
        checkpoint_path,
        map_location=DEVICE,
        weights_only=False
    )

    if checkpoint["class_to_idx"] != CLASS_TO_IDX:
        raise ValueError("Checkpoint class mapping mismatch!")

    model.load_state_dict(checkpoint["model_state_dict"])
    model.eval()

    classes = sorted(CLASS_TO_IDX, key=lambda x: CLASS_TO_IDX[x])
    num_classes = len(classes)

    confusion = [
        [0 for _ in range(num_classes)]
        for _ in range(num_classes)
    ]

    total_correct = 0
    total_samples = 0

    print("Checkpoint epoch:", checkpoint["epoch"])
    print("Validation accuracy:", checkpoint["validation_accuracy"])
    print("Test images:", len(dataset))
    print("Classes:", num_classes)

    with torch.inference_mode():

        for batch_index, (images, labels) in enumerate(loader):

            images = images.to(DEVICE)
            labels = labels.to(DEVICE)

            outputs = model(images)
            predictions = outputs.argmax(dim=1)

            for actual, predicted in zip(
                labels.tolist(), predictions.tolist()
            ):
                confusion[actual][predicted] += 1

                if actual == predicted:
                    total_correct += 1

            total_samples += labels.size(0)

            if (batch_index + 1) % 20 == 0:
                print(
                    f"Evaluated batches: {batch_index + 1}/{len(loader)}"
                )

    accuracy = total_correct / total_samples if total_samples else 0

    report = []

    for index, class_name in enumerate(classes):

        tp = confusion[index][index]
        support = sum(confusion[index])
        predicted_count = sum(
            confusion[row][index] for row in range(num_classes)
        )

        precision = tp / predicted_count if predicted_count else 0
        recall = tp / support if support else 0

        f1 = (
            2 * precision * recall / (precision + recall)
            if precision + recall else 0
        )

        report.append({
            "class": class_name,
            "precision": precision,
            "recall": recall,
            "f1_score": f1,
            "support": support
        })

    macro_precision = sum(x["precision"] for x in report) / num_classes
    macro_recall = sum(x["recall"] for x in report) / num_classes
    macro_f1 = sum(x["f1_score"] for x in report) / num_classes

    weighted_f1 = (
        sum(x["f1_score"] * x["support"] for x in report) / total_samples
        if total_samples else 0
    )

    RESULTS_DIR.mkdir(parents=True, exist_ok=True)

    with (RESULTS_DIR / "mobilevit_classification_report.csv").open(
        "w", newline="", encoding="utf-8"
    ) as file:

        writer = csv.DictWriter(file, fieldnames=report[0].keys())
        writer.writeheader()
        writer.writerows(report)

    with (RESULTS_DIR / "mobilevit_confusion_matrix.csv").open(
        "w", newline="", encoding="utf-8"
    ) as file:

        writer = csv.writer(file)
        writer.writerow(["Actual/Predicted"] + classes)

        for class_name, row in zip(classes, confusion):
            writer.writerow([class_name] + row)

    metrics = {
        "model": "MobileViT XXS",
        "checkpoint_epoch": checkpoint["epoch"],
        "validation_accuracy": checkpoint["validation_accuracy"],
        "test_images": total_samples,
        "correct_predictions": total_correct,
        "incorrect_predictions": total_samples - total_correct,
        "test_accuracy": accuracy,
        "macro_precision": macro_precision,
        "macro_recall": macro_recall,
        "macro_f1": macro_f1,
        "weighted_f1": weighted_f1
    }

    with (RESULTS_DIR / "mobilevit_test_metrics.json").open(
        "w", encoding="utf-8"
    ) as file:
        json.dump(metrics, file, indent=4)

    print("\n========== MOBILEVIT TEST RESULTS ==========")
    print(f"Correct predictions: {total_correct}/{total_samples}")
    print(f"Test accuracy: {accuracy * 100:.2f}%")
    print(f"Macro precision: {macro_precision:.4f}")
    print(f"Macro recall: {macro_recall:.4f}")
    print(f"Macro F1: {macro_f1:.4f}")
    print(f"Weighted F1: {weighted_f1:.4f}")

    print("\nEvaluation files saved successfully!")


if __name__ == "__main__":
    torch.set_num_threads(2)
    main()
