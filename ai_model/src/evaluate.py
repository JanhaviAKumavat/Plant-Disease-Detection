import csv
import json

import torch
from torch.utils.data import DataLoader

from config import (
    DATASET_DIR,
    CHECKPOINT_DIR,
    RESULTS_DIR,
    DEVICE,
    BATCH_SIZE,
    NUM_WORKERS
)

from dataset_loader import PlantDocDataset, test_transform
from model import build_mobilenet_model


def main():

    print("\n========== MOBILENET TEST EVALUATION ==========")

    test_manifest = DATASET_DIR / "test_manifest.csv"
    checkpoint_path = CHECKPOINT_DIR / "mobilenetv3_best.pth"

    if not checkpoint_path.exists():
        raise FileNotFoundError(checkpoint_path)

    with (DATASET_DIR / "classes.json").open(
        "r", encoding="utf-8"
    ) as file:
        class_to_idx = json.load(file)

    classes = sorted(
        class_to_idx,
        key=lambda name: int(class_to_idx[name])
    )

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

    model = build_mobilenet_model().to(DEVICE)

    checkpoint = torch.load(
        checkpoint_path,
        map_location=DEVICE
    )

    model.load_state_dict(checkpoint["model_state_dict"])
    model.eval()

    print("Loaded checkpoint from epoch:", checkpoint["epoch"])
    print("Checkpoint validation accuracy:",
          round(checkpoint["validation_accuracy"], 2), "%")
    print("Test images:", len(dataset))
    print("Classes:", len(classes))

    num_classes = len(classes)

    confusion = [
        [0 for _ in range(num_classes)]
        for _ in range(num_classes)
    ]

    total_correct = 0
    total_samples = 0

    with torch.inference_mode():

        for batch_index, (images, labels) in enumerate(loader):

            images = images.to(DEVICE)
            labels = labels.to(DEVICE)

            outputs = model(images)
            predictions = outputs.argmax(dim=1)

            for actual, predicted in zip(
                labels.tolist(),
                predictions.tolist()
            ):
                confusion[actual][predicted] += 1

                if actual == predicted:
                    total_correct += 1

            total_samples += labels.size(0)

            print(
                f"Evaluated batch "
                f"{batch_index + 1}/{len(loader)}"
            )

    accuracy = total_correct / total_samples

    report = []
    precision_values = []
    recall_values = []
    f1_values = []
    support_values = []

    for index, class_name in enumerate(classes):

        tp = confusion[index][index]

        fp = sum(
            confusion[row][index]
            for row in range(num_classes)
        ) - tp

        fn = sum(confusion[index]) - tp

        support = sum(confusion[index])

        precision = tp / (tp + fp) if tp + fp else 0.0
        recall = tp / (tp + fn) if tp + fn else 0.0

        f1 = (
            2 * precision * recall / (precision + recall)
            if precision + recall
            else 0.0
        )

        report.append({
            "class": class_name,
            "precision": precision,
            "recall": recall,
            "f1_score": f1,
            "support": support
        })

        precision_values.append(precision)
        recall_values.append(recall)
        f1_values.append(f1)
        support_values.append(support)

    macro_precision = sum(precision_values) / num_classes
    macro_recall = sum(recall_values) / num_classes
    macro_f1 = sum(f1_values) / num_classes

    weighted_f1 = sum(
        f1 * support
        for f1, support in zip(f1_values, support_values)
    ) / total_samples

    print("\n========== TEST RESULTS ==========")

    print("Total test images:", total_samples)
    print("Correct predictions:", total_correct)
    print("Incorrect predictions:", total_samples - total_correct)

    print("Test accuracy:", round(accuracy * 100, 2), "%")
    print("Macro precision:", round(macro_precision, 4))
    print("Macro recall:", round(macro_recall, 4))
    print("Macro F1-score:", round(macro_f1, 4))
    print("Weighted F1-score:", round(weighted_f1, 4))

    print("\n========== PER-CLASS RESULTS ==========")

    for item in report:
        print(
            f"{item['class']}: "
            f"Precision={item['precision']:.3f}, "
            f"Recall={item['recall']:.3f}, "
            f"F1={item['f1_score']:.3f}, "
            f"Support={item['support']}"
        )

    report_file = RESULTS_DIR / "mobilenet_classification_report.csv"

    with report_file.open(
        "w", newline="", encoding="utf-8-sig"
    ) as file:

        writer = csv.DictWriter(
            file,
            fieldnames=[
                "class",
                "precision",
                "recall",
                "f1_score",
                "support"
            ]
        )

        writer.writeheader()
        writer.writerows(report)

    confusion_file = RESULTS_DIR / "mobilenet_confusion_matrix.csv"

    with confusion_file.open(
        "w", newline="", encoding="utf-8-sig"
    ) as file:

        writer = csv.writer(file)
        writer.writerow(["Actual / Predicted"] + classes)

        for class_name, row in zip(classes, confusion):
            writer.writerow([class_name] + row)

    metrics = {
        "model": "MobileNetV3 Small",
        "checkpoint_epoch": checkpoint["epoch"],
        "validation_accuracy": checkpoint["validation_accuracy"],
        "test_images": total_samples,
        "test_accuracy": accuracy,
        "macro_precision": macro_precision,
        "macro_recall": macro_recall,
        "macro_f1": macro_f1,
        "weighted_f1": weighted_f1
    }

    metrics_file = RESULTS_DIR / "mobilenet_test_metrics.json"

    with metrics_file.open("w", encoding="utf-8") as file:
        json.dump(metrics, file, indent=4)

    print("\n========== GENERATED REPORTS ==========")
    print("Classification report:", report_file)
    print("Confusion matrix:", confusion_file)
    print("Test metrics:", metrics_file)

    print("\nTest evaluation completed successfully!")


if __name__ == "__main__":
    main()
