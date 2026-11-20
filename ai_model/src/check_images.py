from pathlib import Path
from PIL import Image

DATASET = Path("ai_model/datasets/PlantDoc/raw/PlantDoc-Dataset-master")

VALID_EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".webp", ".mpo"}

valid_count = 0
corrupted = []

for split in ["train", "test"]:
    split_path = DATASET / split

    for image_path in split_path.rglob("*"):
        if not image_path.is_file():
            continue

        if image_path.suffix.lower() not in VALID_EXTENSIONS:
            continue

        try:
            with Image.open(image_path) as img:
                img.verify()
            valid_count += 1

        except Exception as error:
            corrupted.append((str(image_path), str(error)))

print("\n========== IMAGE VALIDATION ==========")
print("Valid images:", valid_count)
print("Corrupted images:", len(corrupted))

if corrupted:
    print("\n========== CORRUPTED FILES ==========")
    for path, error in corrupted:
        print(path)
        print("Error:", error)
