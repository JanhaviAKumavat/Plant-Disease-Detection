from pathlib import Path
from collections import defaultdict
from PIL import Image
import hashlib
import csv

DATASET = Path("ai_model/datasets/PlantDoc/raw/PlantDoc-Dataset-master")
OUTPUT = Path("ai_model/datasets/PlantDoc/duplicate_report.csv")

VALID_EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".webp", ".mpo"}

hash_groups = defaultdict(list)

for split in ["train", "test"]:
    split_path = DATASET / split

    for image_path in split_path.rglob("*"):
        if not image_path.is_file():
            continue

        if image_path.suffix.lower() not in VALID_EXTENSIONS:
            continue

        try:
            with Image.open(image_path) as img:
                rgb = img.convert("RGB")
                image_hash = hashlib.md5(rgb.tobytes()).hexdigest()
                dimensions = str(rgb.size)

            hash_groups[image_hash].append({
                "split": split,
                "class": image_path.parent.name,
                "filename": image_path.name,
                "path": str(image_path),
                "dimensions": dimensions
            })

        except Exception as error:
            print("Could not process:", image_path, error)

duplicate_groups = [
    (image_hash, records)
    for image_hash, records in hash_groups.items()
    if len(records) > 1
]

rows = []

for group_number, (image_hash, records) in enumerate(duplicate_groups, start=1):
    splits = {record["split"] for record in records}
    classes = {record["class"] for record in records}

    if len(splits) > 1:
        duplicate_type = "CROSS_SPLIT"
    else:
        duplicate_type = "SAME_SPLIT"

    label_status = "LABEL_CONFLICT" if len(classes) > 1 else "SAME_LABEL"

    for record in records:
        rows.append({
            "group": group_number,
            "duplicate_type": duplicate_type,
            "label_status": label_status,
            "hash": image_hash,
            **record
        })

OUTPUT.parent.mkdir(parents=True, exist_ok=True)

with OUTPUT.open("w", newline="", encoding="utf-8-sig") as file:
    writer = csv.DictWriter(file, fieldnames=rows[0].keys())
    writer.writeheader()
    writer.writerows(rows)

print("\n========== DETAILED DUPLICATE REPORT ==========")
print("Duplicate groups:", len(duplicate_groups))
print("Cross-split groups:", sum(
    1 for _, records in duplicate_groups
    if len({r["split"] for r in records}) > 1
))
print("Same-split groups:", sum(
    1 for _, records in duplicate_groups
    if len({r["split"] for r in records}) == 1
))
print("Groups with label conflicts:", sum(
    1 for _, records in duplicate_groups
    if len({r["class"] for r in records}) > 1
))
print("Report saved to:", OUTPUT)

for group_number, (_, records) in enumerate(duplicate_groups, start=1):
    print(f"\nGroup {group_number}:")

    for record in records:
        print(
            f"  {record['split']} | "
            f"{record['class']} | "
            f"{record['filename']}"
        )

