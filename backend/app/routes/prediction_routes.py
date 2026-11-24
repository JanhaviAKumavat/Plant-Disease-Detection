from fastapi import APIRouter

from app.controllers.prediction_controller import router as prediction_controller
from app.controllers.prediction_history_controller import router as history_controller


router = APIRouter(
    prefix="/api/predictions",
    tags=["Plant Disease Prediction"]
)

router.include_router(prediction_controller)
router.include_router(history_controller)
