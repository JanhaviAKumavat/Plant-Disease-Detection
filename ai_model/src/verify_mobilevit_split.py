import csv
from collections import Counter
from config import DATASET_DIR

files = {
    "Training": DATASET_DIR / "mobilevit_train_manifest.csv",
    "Validation": DATASET_DIR / "mobilevit_validation_manifest.csv"
}

for name, path in files.items():

    with path.open("r", encoding="utf-8") as file:
        records = list(csv.DictReader(file))

    counts = Counter(record["class"] for record in records)

    print(f"\n========== {name.upper()} CLASS DISTRIBUTION ==========")
    print("Total classes:", len(counts))
    print("Total images:", sum(counts.values()))

    for class_name, count in sorted(counts.items()):
        print(f"{class_name}: {count}")

    assert len(counts) == 27, f"{name} does not contain all 27 classes!"

print("\nBoth splits contain all 27 classes!")
