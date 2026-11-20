from pathlib import Path
import csv
import json
from collections import Counter

BASE_DIR = Path("ai_model/datasets/PlantDoc/cleaned")

INPUT_FILE = BASE_DIR / "accepted_images.csv"

EXCLUDED_CLASSES = {
    "Tomato two spotted spider mites leaf"
}

with INPUT_FILE.open(
    "r",
    encoding="utf-8-sig",
    newline=""
) as file:
    records = list(csv.DictReader(file))

# Exclude classes that cannot be evaluated
final_records = [
    record for record in records
    if record["class"] not in EXCLUDED_CLASSES
]

# Create deterministic class mapping
classes = sorted({
    record["class"] for record in final_records
})

class_to_idx = {
    class_name: index
    for index, class_name in enumerate(classes)
}

train_records = []
test_records = []

for record in final_records:

    record["class_index"] = class_to_idx[record["class"]]

    if record["split"] == "train":
        train_records.append(record)

    elif record["split"] == "test":
        test_records.append(record)

# Validate every class has both train and test images
train_counts = Counter(r["class"] for r in train_records)
test_counts = Counter(r["class"] for r in test_records)

missing_train = [
    name for name in classes if train_counts[name] == 0
]

missing_test = [
    name for name in classes if test_counts[name] == 0
]

if missing_train or missing_test:
    raise ValueError(
        f"Missing training classes: {missing_train}; "
        f"Missing testing classes: {missing_test}"
    )

BASE_DIR.mkdir(parents=True, exist_ok=True)

def save_manifest(filename, data):

    output = BASE_DIR / filename

    fieldnames = [
        "split",
        "class",
        "class_index",
        "filename",
        "path",
        "hash",
        "reason"
    ]

    with output.open(
        "w",
        encoding="utf-8-sig",
        newline=""
    ) as file:

        writer = csv.DictWriter(
            file,
            fieldnames=fieldnames
        )

        writer.writeheader()
        writer.writerows(data)

    return output

train_file = save_manifest(
    "train_manifest.csv",
    train_records
)

test_file = save_manifest(
    "test_manifest.csv",
    test_records
)

# Save class mapping
mapping_file = BASE_DIR / "classes.json"

with mapping_file.open("w", encoding="utf-8") as file:
    json.dump(class_to_idx, file, indent=4)

# Save final summary
summary = {
    "dataset": "PlantDoc",
    "number_of_classes": len(classes),
    "training_images": len(train_records),
    "testing_images": len(test_records),
    "total_images": len(final_records),
    "excluded_classes": sorted(EXCLUDED_CLASSES),
    "class_to_idx": class_to_idx
}

summary_file = BASE_DIR / "final_dataset_summary.json"

with summary_file.open("w", encoding="utf-8") as file:
    json.dump(summary, file, indent=4)

print("\n========== FINAL DATASET ==========")
print("Number of classes:", len(classes))
print("Training images:", len(train_records))
print("Testing images:", len(test_records))
print("Total images:", len(final_records))

print("\nExcluded classes:", sorted(EXCLUDED_CLASSES))

print("\n========== CLASS DISTRIBUTION ==========")

for name in classes:
    print(
        f"{name}: "
        f"Train={train_counts[name]}, "
        f"Test={test_counts[name]}"
    )

print("\n========== GENERATED FILES ==========")
print("Training:", train_file)
print("Testing:", test_file)
print("Class mapping:", mapping_file)
print("Summary:", summary_file)

print("\nAll 27 classes have training and testing images.")
print("Original dataset files were NOT modified.")

