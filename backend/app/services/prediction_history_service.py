from datetime import datetime, timezone

from bson import ObjectId

from backend.app.database.mongodb import get_database


async def save_prediction_history(
    user_id: str,
    prediction_result: dict
) -> dict:

    database = get_database()

    history_collection = database["prediction_history"]

    history_document = {
        "user_id": ObjectId(user_id),
        "prediction": prediction_result,
        "created_at": datetime.now(timezone.utc)
    }

    result = await history_collection.insert_one(
        history_document
    )

    return {
        "id": str(result.inserted_id),
        "prediction": prediction_result,
        "created_at": history_document["created_at"]
    }
