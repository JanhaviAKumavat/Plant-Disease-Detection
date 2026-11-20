from pathlib import Path
from collections import defaultdict
from PIL import Image
import hashlib
import csv

# ==========================================
# CONFIGURATION
# ==========================================

DATASET = Path(
    "ai_model/datasets/PlantDoc/raw/PlantDoc-Dataset-master"
)

OUTPUT_DIR = Path("ai_model/datasets/PlantDoc/cleaned")

VALID_EXTENSIONS = {
    ".jpg", ".jpeg", ".png", ".bmp", ".webp", ".mpo"
}

# ==========================================
# SCAN AND HASH IMAGES
# ==========================================

hash_groups = defaultdict(list)

print("\nScanning PlantDoc images...")

for split in ["train", "test"]:

    split_path = DATASET / split

    if not split_path.exists():
        raise FileNotFoundError(f"Missing dataset split: {split_path}")

    for image_path in split_path.rglob("*"):

        if not image_path.is_file():
            continue

        if image_path.suffix.lower() not in VALID_EXTENSIONS:
            continue

        try:
            with Image.open(image_path) as img:
                rgb = img.convert("RGB")
                image_hash = hashlib.sha256(
                    rgb.tobytes()
                ).hexdigest()

            record = {
                "split": split,
                "class": image_path.parent.name,
                "filename": image_path.name,
                "path": str(image_path.resolve()),
                "hash": image_hash
            }

            hash_groups[image_hash].append(record)

        except Exception as error:
            print("Could not process:", image_path, error)

# ==========================================
# CLASSIFY IMAGES
# ==========================================

accepted = []
quarantined = []

cross_split_groups = 0
same_split_groups = 0
label_conflict_groups = 0

for image_hash, records in hash_groups.items():

    if len(records) == 1:
        accepted.append({
            **records[0],
            "reason": "UNIQUE_IMAGE"
        })
        continue

    splits = {record["split"] for record in records}
    classes = {record["class"] for record in records}

    # Different labels for identical image
    if len(classes) > 1:

        label_conflict_groups += 1

        if len(splits) > 1:
            cross_split_groups += 1
        else:
            same_split_groups += 1

        for record in records:
            quarantined.append({
                **record,
                "reason": "LABEL_CONFLICT"
            })

        continue

    # Same label, image occurs across train and test
    if len(splits) > 1:

        cross_split_groups += 1

        # Keep test copy to avoid train/test leakage
        for record in records:

            if record["split"] == "test":
                accepted.append({
                    **record,
                    "reason": "KEEP_TEST_COPY"
                })
            else:
                quarantined.append({
                    **record,
                    "reason": "TRAIN_TEST_DUPLICATE"
                })

        continue

    # Same label, duplicate inside the same split
    same_split_groups += 1

    # Prefer test if available; otherwise keep first train copy
    preferred = next(
        (r for r in records if r["split"] == "test"),
        records[0]
    )

    accepted.append({
        **preferred,
        "reason": "KEEP_ONE_COPY"
    })

    for record in records:

        if record["path"] != preferred["path"]:
            quarantined.append({
                **record,
                "reason": "SAME_SPLIT_DUPLICATE"
            })

# ==========================================
# SAVE MANIFEST FILES
# ==========================================

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

def save_csv(filename, rows):

    output_path = OUTPUT_DIR / filename

    fieldnames = [
        "split",
        "class",
        "filename",
        "path",
        "hash",
        "reason"
    ]

    with output_path.open(
        "w",
        newline="",
        encoding="utf-8-sig"
    ) as file:

        writer = csv.DictWriter(
            file,
            fieldnames=fieldnames
        )

        writer.writeheader()
        writer.writerows(rows)

    return output_path

accepted_file = save_csv(
    "accepted_images.csv",
    accepted
)

quarantined_file = save_csv(
    "quarantined_images.csv",
    quarantined
)

# ==========================================
# SAVE SUMMARY
# ==========================================

summary_file = OUTPUT_DIR / "cleaning_summary.txt"

with summary_file.open("w", encoding="utf-8") as file:

    file.write("PLANTDOC DATASET CLEANING SUMMARY\n")
    file.write("=" * 40 + "\n")
    file.write(f"Total unique image hashes: {len(hash_groups)}\n")
    file.write(f"Accepted image records: {len(accepted)}\n")
    file.write(f"Quarantined image records: {len(quarantined)}\n")
    file.write(f"Cross-split duplicate groups: {cross_split_groups}\n")
    file.write(f"Same-split duplicate groups: {same_split_groups}\n")
    file.write(f"Label conflict groups: {label_conflict_groups}\n")

# ==========================================
# DISPLAY RESULTS
# ==========================================

print("\n========== DATASET CLEANING SUMMARY ==========")

print("Unique image hashes:", len(hash_groups))
print("Accepted image records:", len(accepted))
print("Quarantined image records:", len(quarantined))

print("\nDuplicate groups:")
print("Cross-split groups:", cross_split_groups)
print("Same-split groups:", same_split_groups)
print("Label conflict groups:", label_conflict_groups)

print("\n========== GENERATED FILES ==========")
print("Accepted:", accepted_file)
print("Quarantined:", quarantined_file)
print("Summary:", summary_file)

print("\nOriginal PlantDoc images were NOT modified.")
print("Manifest generation completed successfully!")

