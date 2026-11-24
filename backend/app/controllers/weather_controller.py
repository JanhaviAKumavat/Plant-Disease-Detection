
from fastapi import HTTPException, Query

from app.services.weather_service import get_weather


async def get_weather_data(
    latitude: float = Query(..., ge=-90, le=90),
    longitude: float = Query(..., ge=-180, le=180),
):
    try:
        return await get_weather(latitude, longitude)

    except HTTPException:
        raise

    except ConnectionError as error:
        raise HTTPException(
            status_code=503,
            detail=str(error),
        ) from error

    except ValueError as error:
        raise HTTPException(
            status_code=502,
            detail=str(error),
        ) from error

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail="Unable to fetch weather information.",
        ) from error
