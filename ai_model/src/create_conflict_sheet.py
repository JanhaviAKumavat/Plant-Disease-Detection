from pathlib import Path
from collections import defaultdict
from PIL import Image, ImageDraw, ImageFont
import hashlib
import textwrap

DATASET = Path("ai_model/datasets/PlantDoc/raw/PlantDoc-Dataset-master")
OUTPUT = Path("ai_model/datasets/PlantDoc/label_conflict_contact_sheet.jpg")

VALID_EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".webp", ".mpo"}

groups = defaultdict(list)

for split in ["train", "test"]:
    for path in (DATASET / split).rglob("*"):
        if not path.is_file() or path.suffix.lower() not in VALID_EXTENSIONS:
            continue

        try:
            with Image.open(path) as img:
                rgb = img.convert("RGB")
                image_hash = hashlib.md5(rgb.tobytes()).hexdigest()
                preview = rgb.copy()

            groups[image_hash].append({
                "split": split,
                "class": path.parent.name,
                "filename": path.name,
                "image": preview
            })

        except Exception as error:
            print("Skipped:", path, error)

conflicts = [
    records for records in groups.values()
    if len({r["class"] for r in records}) > 1
]

if not conflicts:
    print("No label conflicts found.")
    raise SystemExit

columns = 3
cell_width = 380
cell_height = 260
rows = (len(conflicts) + columns - 1) // columns

sheet = Image.new(
    "RGB",
    (columns * cell_width, rows * cell_height),
    "white"
)

draw = ImageDraw.Draw(sheet)
font = ImageFont.load_default()

for index, records in enumerate(conflicts):
    x = (index % columns) * cell_width
    y = (index // columns) * cell_height

    image = records[0]["image"]
    image.thumbnail((350, 155))

    image_x = x + (cell_width - image.width) // 2
    sheet.paste(image, (image_x, y + 5))

    draw.text((x + 10, y + 165), f"CONFLICT GROUP {index + 1}", fill="red", font=font)

    text_y = y + 185

    for record in records:
        label = f"{record['split']} | {record['class']}"
        for line in textwrap.wrap(label, width=55):
            draw.text((x + 10, text_y), line, fill="black", font=font)
            text_y += 14

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
sheet.save(OUTPUT, quality=95)

print("\n========== CONTACT SHEET ==========")
print("Conflicting groups:", len(conflicts))
print("Saved to:", OUTPUT)
