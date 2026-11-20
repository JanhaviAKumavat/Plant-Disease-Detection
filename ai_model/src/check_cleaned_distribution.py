from pathlib import Path
from collections import Counter
import csv

MANIFEST = Path(
    "ai_model/datasets/PlantDoc/cleaned/accepted_images.csv"
)

OUTPUT = Path(
    "ai_model/datasets/PlantDoc/cleaned/class_distribution.csv"
)

with MANIFEST.open("r", encoding="utf-8-sig", newline="") as file:
    records = list(csv.DictReader(file))

train_counts = Counter()
test_counts = Counter()

for record in records:
    if record["split"] == "train":
        train_counts[record["class"]] += 1
    elif record["split"] == "test":
        test_counts[record["class"]] += 1

all_classes = sorted(set(train_counts) | set(test_counts))

rows = []

for class_name in all_classes:
    train_count = train_counts[class_name]
    test_count = test_counts[class_name]

    rows.append({
        "class": class_name,
        "train_images": train_count,
        "test_images": test_count,
        "total_images": train_count + test_count,
        "status": (
            "MISSING_TRAIN" if train_count == 0
            else "MISSING_TEST" if test_count == 0
            else "OK"
        )
    })

OUTPUT.parent.mkdir(parents=True, exist_ok=True)

with OUTPUT.open("w", encoding="utf-8-sig", newline="") as file:
    writer = csv.DictWriter(
        file,
        fieldnames=[
            "class",
            "train_images",
            "test_images",
            "total_images",
            "status"
        ]
    )
    writer.writeheader()
    writer.writerows(rows)

print("\n========== CLEANED CLASS DISTRIBUTION ==========")

print("Total classes:", len(all_classes))
print("Training images:", sum(train_counts.values()))
print("Testing images:", sum(test_counts.values()))

print("\n{:<42} {:>8} {:>8} {:>8}  {}".format(
    "CLASS", "TRAIN", "TEST", "TOTAL", "STATUS"
))

for row in rows:
    print("{:<42} {:>8} {:>8} {:>8}  {}".format(
        row["class"][:42],
        row["train_images"],
        row["test_images"],
        row["total_images"],
        row["status"]
    ))

print("\nClasses missing from training:", sum(
    1 for row in rows if row["train_images"] == 0
))

print("Classes missing from testing:", sum(
    1 for row in rows if row["test_images"] == 0
))

print("\nReport saved to:", OUTPUT)
