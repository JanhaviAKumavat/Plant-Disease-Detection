# from datetime import datetime, timezone

# from bson import ObjectId

# from backend.app.database.mongodb import get_database


# async def save_prediction_history(
#     user_id: str,
#     prediction_result: dict
# ) -> dict:

#     database = get_database()

#     history_collection = database["prediction_history"]

#     history_document = {
#         "user_id": ObjectId(user_id),
#         "prediction": prediction_result,
#         "created_at": datetime.now(timezone.utc)
#     }

#     result = await history_collection.insert_one(
#         history_document
#     )

#     return {
#         "id": str(result.inserted_id),
#         "prediction": prediction_result,
#         "created_at": history_document["created_at"]
#     }



from datetime import datetime, timezone
from pathlib import Path
from uuid import uuid4

from bson import ObjectId
from PIL import Image

from backend.app.database.mongodb import get_database


PROJECT_ROOT = Path(__file__).resolve().parents[3]

HISTORY_IMAGE_DIR = (
    PROJECT_ROOT
    / "backend"
    / "generated"
    / "history_images"
)

HISTORY_IMAGE_DIR.mkdir(parents=True, exist_ok=True)


async def save_prediction_history(
    user_id: str,
    prediction_result: dict,
    image: Image.Image = None
) -> dict:

    database = get_database()
    history_collection = database["prediction_history"]

    image_filename = None
    image_url = None

    if image is not None:
        image_filename = f"{uuid4().hex}.jpg"
        image_path = HISTORY_IMAGE_DIR / image_filename

        image.convert("RGB").save(
            image_path,
            format="JPEG",
            quality=88,
            optimize=True
        )

        image_url = f"/generated/history-images/{image_filename}"

    history_document = {
        "user_id": ObjectId(user_id),
        "prediction": prediction_result,
        "image_filename": image_filename,
        "image_url": image_url,
        "created_at": datetime.now(timezone.utc)
    }

    try:
        result = await history_collection.insert_one(
            history_document
        )

    except Exception:
        if image_filename:
            image_path = HISTORY_IMAGE_DIR / image_filename

            if image_path.exists():
                image_path.unlink()

        raise

    return {
        "id": str(result.inserted_id),
        "prediction": prediction_result,
        "image_url": image_url,
        "created_at": history_document["created_at"]
    }