# from bson import ObjectId
# from fastapi import APIRouter, Depends, HTTPException

# from app.database.mongodb import get_database
# from app.utils.auth_dependency import get_current_user


# router = APIRouter()


# @router.get("/history")
# async def get_prediction_history(
#     current_user: dict = Depends(get_current_user)
# ):
#     try:
#         database = get_database()

#         history_collection = database["prediction_history"]

#         cursor = history_collection.find(
#             {"user_id": ObjectId(current_user["id"])}
#         ).sort("created_at", -1)

#         history_records = []

#         async for record in cursor:
#             history_records.append({
#                 "id": str(record["_id"]),
#                 "prediction": record["prediction"],
#                 "created_at": record["created_at"]
#             })

#         return {
#             "success": True,
#             "message": "Prediction history retrieved successfully.",
#             "total": len(history_records),
#             "data": history_records
#         }

#     except Exception as error:
#         print("Prediction history error:", str(error))

#         raise HTTPException(
#             status_code=500,
#             detail="Unable to retrieve prediction history."
#         )


# @router.get("/history/{prediction_id}")
# async def get_prediction_details(
#     prediction_id: str,
#     current_user: dict = Depends(get_current_user)
# ):
#     if not ObjectId.is_valid(prediction_id):
#         raise HTTPException(
#             status_code=400,
#             detail="Invalid prediction ID."
#         )

#     try:
#         database = get_database()

#         history_collection = database["prediction_history"]

#         record = await history_collection.find_one({
#             "_id": ObjectId(prediction_id),
#             "user_id": ObjectId(current_user["id"])
#         })

#         if not record:
#             raise HTTPException(
#                 status_code=404,
#                 detail="Prediction record not found."
#             )

#         return {
#             "success": True,
#             "message": "Prediction details retrieved successfully.",
#             "data": {
#                 "id": str(record["_id"]),
#                 "prediction": record["prediction"],
#                 "created_at": record["created_at"]
#             }
#         }

#     except HTTPException:
#         raise

#     except Exception as error:
#         print("Prediction details error:", str(error))

#         raise HTTPException(
#             status_code=500,
#             detail="Unable to retrieve prediction details."
#         )


# @router.delete("/history/{prediction_id}")
# async def delete_prediction_history(
#     prediction_id: str,
#     current_user: dict = Depends(get_current_user)
# ):
#     if not ObjectId.is_valid(prediction_id):
#         raise HTTPException(
#             status_code=400,
#             detail="Invalid prediction ID."
#         )

#     try:
#         database = get_database()

#         history_collection = database["prediction_history"]

#         result = await history_collection.delete_one({
#             "_id": ObjectId(prediction_id),
#             "user_id": ObjectId(current_user["id"])
#         })

#         if result.deleted_count == 0:
#             raise HTTPException(
#                 status_code=404,
#                 detail="Prediction record not found."
#             )

#         return {
#             "success": True,
#             "message": "Prediction history deleted successfully.",
#             "prediction_id": prediction_id
#         }

#     except HTTPException:
#         raise

#     except Exception as error:
#         print("Delete prediction history error:", str(error))

#         raise HTTPException(
#             status_code=500,
#             detail="Unable to
#  delete prediction history."
#         )






from pathlib import Path

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException

from app.database.mongodb import get_database
from app.utils.auth_dependency import get_current_user

router = APIRouter()

PROJECT_ROOT = Path(__file__).resolve().parents[3]

HISTORY_IMAGE_DIR = (
    PROJECT_ROOT
    / "backend"
    / "generated"
    / "history_images"
)

def serialize_history_record(record):
    return {
        "id": str(record["_id"]),
        "prediction": record.get("prediction", {}),
        "image_url": record.get("image_url"),
        "created_at": record.get("created_at")
    }

@router.get("/history")
async def get_prediction_history(
    current_user: dict = Depends(get_current_user)
):
    try:
        database = get_database()

        history_collection = database["prediction_history"]

        cursor = history_collection.find(
            {"user_id": ObjectId(current_user["id"])}
        ).sort("created_at", -1)

        history_records = []

        async for record in cursor:
            history_records.append(
                serialize_history_record(record)
            )

        return {
            "success": True,
            "message": "Prediction history retrieved successfully.",
            "total": len(history_records),
            "data": history_records
        }

    except Exception as error:
        print("Prediction history error:", str(error))

        raise HTTPException(
            status_code=500,
            detail="Unable to retrieve prediction history."
        )

@router.get("/history/{prediction_id}")
async def get_prediction_details(
    prediction_id: str,
    current_user: dict = Depends(get_current_user)
):
    if not ObjectId.is_valid(prediction_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid prediction ID."
        )

    try:
        database = get_database()

        history_collection = database["prediction_history"]

        record = await history_collection.find_one({
            "_id": ObjectId(prediction_id),
            "user_id": ObjectId(current_user["id"])
        })

        if not record:
            raise HTTPException(
                status_code=404,
                detail="Prediction record not found."
            )

        return {
            "success": True,
            "message": "Prediction details retrieved successfully.",
            "data": serialize_history_record(record)
        }

    except HTTPException:
        raise

    except Exception as error:
        print("Prediction details error:", str(error))

        raise HTTPException(
            status_code=500,
            detail="Unable to retrieve prediction details."
        )

@router.delete("/history/{prediction_id}")
async def delete_prediction_history(
    prediction_id: str,
    current_user: dict = Depends(get_current_user)
):
    if not ObjectId.is_valid(prediction_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid prediction ID."
        )

    try:
        database = get_database()

        history_collection = database["prediction_history"]

        record = await history_collection.find_one({
            "_id": ObjectId(prediction_id),
            "user_id": ObjectId(current_user["id"])
        })

        if not record:
            raise HTTPException(
                status_code=404,
                detail="Prediction record not found."
            )

        result = await history_collection.delete_one({
            "_id": ObjectId(prediction_id),
            "user_id": ObjectId(current_user["id"])
        })

        if result.deleted_count == 0:
            raise HTTPException(
                status_code=404,
                detail="Prediction record not found."
            )

        image_filename = record.get("image_filename")

        if image_filename:
            image_path = HISTORY_IMAGE_DIR / image_filename

            if image_path.exists():
                image_path.unlink()

        return {
            "success": True,
            "message": "Prediction history deleted successfully.",
            "prediction_id": prediction_id
        }

    except HTTPException:
        raise

    except Exception as error:
        print("Delete prediction history error:", str(error))

        raise HTTPException(
            status_code=500,
            detail="Unable to delete prediction history."
        )