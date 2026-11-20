from pathlib import Path
from collections import defaultdict
from PIL import Image
import hashlib

DATASET = Path("ai_model/datasets/PlantDoc/raw/PlantDoc-Dataset-master")

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
                image_hash = hashlib.md5(img.convert("RGB").tobytes()).hexdigest()

            hash_groups[image_hash].append((split, image_path))

        except Exception as error:
            print("Could not process:", image_path, error)

duplicates = {
    image_hash: paths
    for image_hash, paths in hash_groups.items()
    if len(paths) > 1
}

cross_split = []

for paths in duplicates.values():
    splits = {split for split, _ in paths}

    if "train" in splits and "test" in splits:
        cross_split.append(paths)

print("\n========== DUPLICATE AUDIT ==========")
print("Unique image hashes:", len(hash_groups))
print("Duplicate groups:", len(duplicates))
print("Duplicates across train and test:", len(cross_split))

if cross_split:
    print("\n========== CROSS-SPLIT DUPLICATES ==========")

    for group in cross_split:
        print("\nDuplicate group:")

        for split, path in group:
            print(f"{split}: {path}")
