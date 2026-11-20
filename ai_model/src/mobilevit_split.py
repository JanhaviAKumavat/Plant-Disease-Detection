import csv
import random
from collections import defaultdict
from pathlib import Path

from config import DATASET_DIR, RANDOM_SEED


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


def main():

    manifest_path = DATASET_DIR / "train_manifest.csv"

    with manifest_path.open(
        "r",
        newline="",
        encoding="utf-8"
    ) as file:
        records = list(csv.DictReader(file))

    train_indices, validation_indices = create_stratified_split(records)

    train_output = DATASET_DIR / "mobilevit_train_manifest.csv"
    validation_output = DATASET_DIR / "mobilevit_validation_manifest.csv"

    fieldnames = records[0].keys()

    with train_output.open("w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(records[i] for i in train_indices)

    with validation_output.open("w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(records[i] for i in validation_indices)

    print("\n========== MOBILEVIT STRATIFIED SPLIT ==========")
    print("Total training-manifest images:", len(records))
    print("Training images:", len(train_indices))
    print("Validation images:", len(validation_indices))
    print("Final test images: 227 (reserved)")
    print("\nTraining manifest:", train_output)
    print("Validation manifest:", validation_output)
    print("\nSplit created successfully!")


if __name__ == "__main__":
    main()
