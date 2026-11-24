from fastapi import APIRouter

from app.controllers.auth_controller import router as auth_controller


router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)

router.include_router(auth_controller)
