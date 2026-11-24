from fastapi import APIRouter

from app.controllers.weather_controller import (
    get_weather_data,
)

router = APIRouter(
    prefix="/api/weather",
    tags=["Weather"],
)

router.add_api_route(
    "",
    get_weather_data,
    methods=["GET"],
)