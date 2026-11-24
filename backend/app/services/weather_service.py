
import asyncio
import json
from datetime import datetime
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from fastapi import HTTPException


WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast"

WEATHER_CODES = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snowfall",
    73: "Moderate snowfall",
    75: "Heavy snowfall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
}


def get_weather_condition(code):
    """Convert an Open-Meteo weather code into readable text."""
    if code is None:
        return "Unknown"

    return WEATHER_CODES.get(int(code), "Unknown")


def fetch_weather_data(latitude, longitude):
    """Fetch weather information from Open-Meteo."""

    params = {
        "latitude": latitude,
        "longitude": longitude,

        "current": (
            "temperature_2m,"
            "relative_humidity_2m,"
            "apparent_temperature,"
            "precipitation,"
            "rain,"
            "weather_code,"
            "wind_speed_10m"
        ),

        "hourly": (
            "temperature_2m,"
            "relative_humidity_2m,"
            "precipitation_probability,"
            "precipitation,"
            "rain,"
            "weather_code,"
            "wind_speed_10m,"
            "et0_fao_evapotranspiration"
        ),

        "daily": (
            "weather_code,"
            "temperature_2m_max,"
            "temperature_2m_min,"
            "precipitation_sum,"
            "precipitation_probability_max,"
            "wind_speed_10m_max,"
            "et0_fao_evapotranspiration_sum"
        ),

        "forecast_days": 7,
        "timezone": "auto",
        "temperature_unit": "celsius",
        "wind_speed_unit": "kmh",
        "precipitation_unit": "mm",
    }

    url = f"{WEATHER_API_URL}?{urlencode(params)}"

    request = Request(
        url,
        headers={"User-Agent": "PlantCare-Weather/1.0"}
    )

    try:
        with urlopen(request, timeout=20) as response:
            return json.loads(response.read().decode("utf-8"))

    except HTTPError as error:
        raise HTTPException(
            status_code=502,
            detail=f"Weather provider returned an error: {error.code}"
        )

    except URLError:
        raise HTTPException(
            status_code=503,
            detail="Unable to connect to the weather service. Check your internet connection."
        )

    except (TimeoutError, json.JSONDecodeError):
        raise HTTPException(
            status_code=502,
            detail="Weather service timed out or returned invalid data."
        )


def build_plant_care_advisory(current, hourly, daily):
    """Generate simple weather-based plant-care suggestions."""

    tips = []
    disease_alerts = []
    prevention_tips = []

    temperature = current.get("temperature")
    humidity = current.get("humidity")
    rainfall = current.get("rainfall", 0)
    wind_speed = current.get("wind_speed", 0)

    max_rain_probability = max(
        [
            item.get("rain_probability") or 0
            for item in hourly
        ],
        default=0
    )

    # Temperature-based recommendations
    if temperature is not None:
        if temperature >= 35:
            tips.append({
                "category": "Temperature",
                "level": "high",
                "message": (
                    "High temperature detected. Monitor plants for heat stress "
                    "and provide shade where appropriate."
                )
            })

        elif temperature <= 10:
            tips.append({
                "category": "Temperature",
                "level": "moderate",
                "message": (
                    "Low temperature detected. Protect sensitive plants "
                    "from cold conditions."
                )
            })

        else:
            tips.append({
                "category": "Temperature",
                "level": "normal",
                "message": "Temperature is within a moderate range."
            })

    # Humidity-based recommendations
    if humidity is not None:
        if humidity >= 85:
            tips.append({
                "category": "Humidity",
                "level": "high",
                "message": (
                    "High humidity may increase fungal disease pressure. "
                    "Improve airflow around plants and avoid unnecessary leaf wetting."
                )
            })

        elif humidity <= 35:
            tips.append({
                "category": "Humidity",
                "level": "moderate",
                "message": (
                    "Low humidity may increase moisture stress. "
                    "Check soil moisture before watering."
                )
            })

    # Rainfall and irrigation recommendations
    if rainfall is not None and rainfall > 2:
        tips.append({
            "category": "Irrigation",
            "level": "moderate",
            "message": (
                "Rainfall has been recorded. Check soil moisture before "
                "irrigating to avoid overwatering."
            )
        })

    elif max_rain_probability >= 60:
        tips.append({
            "category": "Rain Forecast",
            "level": "moderate",
            "message": (
                "Rain is possible in the coming hours. "
                "Check the forecast before scheduling irrigation."
            )
        })

    else:
        tips.append({
            "category": "Irrigation",
            "level": "normal",
            "message": (
                "No significant upcoming rainfall signal was detected. "
                "Check actual soil moisture before irrigation."
            )
        })

    if wind_speed is not None and wind_speed >= 30:
        tips.append({
            "category": "Wind",
            "level": "moderate",
            "message": (
                "Strong winds are possible. Support delicate plants "
                "and protect young crops where needed."
            )
        })

    # General disease-weather advisory
    if humidity is not None and humidity >= 85:
        disease_alerts.append({
            "condition": "High humidity",
            "risk_level": "elevated",
            "message": (
                "High humidity can favor some fungal diseases. "
                "Inspect leaves for spots, mildew, and unusual growth."
            )
        })

        prevention_tips.append(
            "Maintain adequate spacing and airflow between plants."
        )

        prevention_tips.append(
            "Avoid overhead watering when possible."
        )

    if rainfall is not None and rainfall >= 5:
        disease_alerts.append({
            "condition": "Wet weather",
            "risk_level": "elevated",
            "message": (
                "Recent rainfall can increase leaf wetness and "
                "may favor certain plant diseases."
            )
        })

        prevention_tips.append(
            "Monitor lower leaves for water-related disease symptoms."
        )

    if temperature is not None and 20 <= temperature <= 30:
        if humidity is not None and humidity >= 75:
            disease_alerts.append({
                "condition": "Warm and humid weather",
                "risk_level": "moderate",
                "message": (
                    "Warm and humid conditions may favor certain fungal "
                    "and bacterial diseases."
                )
            })

            prevention_tips.append(
                "Inspect crops regularly for early disease symptoms."
            )

    if not disease_alerts:
        disease_alerts.append({
            "condition": "Current weather",
            "risk_level": "low",
            "message": (
                "No major weather-related disease warning was detected "
                "using the current general thresholds."
            )
        })

    if not prevention_tips:
        prevention_tips.append(
            "Continue regular crop inspection and follow good field hygiene."
        )

    return {
        "plant_care_tips": tips,
        "disease_alerts": disease_alerts,
        "prevention_tips": list(dict.fromkeys(prevention_tips)),
        "irrigation_guidance": {
            "rainfall_mm": rainfall,
            "upcoming_rain_probability": max_rain_probability,
            "message": (
                "Use local soil moisture and crop requirements to decide "
                "irrigation. Weather data alone cannot determine exact "
                "irrigation needs."
            )
        },
        "et0_guidance": (
            "ET₀ is provided in the hourly and daily forecast when "
            "available. It estimates reference evapotranspiration, "
            "not the exact water requirement of an individual crop."
        )
    }


async def get_weather(latitude, longitude):
    """
    Return current weather, 24-hour forecast, 7-day forecast,
    plant-care recommendations, and disease-weather advisory.
    """

    if not -90 <= latitude <= 90:
        raise HTTPException(
            status_code=400,
            detail="Latitude must be between -90 and 90."
        )

    if not -180 <= longitude <= 180:
        raise HTTPException(
            status_code=400,
            detail="Longitude must be between -180 and 180."
        )

    weather_data = await asyncio.to_thread(
        fetch_weather_data,
        latitude,
        longitude
    )

    current_data = weather_data.get("current", {})
    hourly_data = weather_data.get("hourly", {})
    daily_data = weather_data.get("daily", {})

    # Current weather
    current = {
        "time": current_data.get("time"),
        "temperature": current_data.get("temperature_2m"),
        "feels_like": current_data.get("apparent_temperature"),
        "humidity": current_data.get("relative_humidity_2m"),
        "rainfall": current_data.get("precipitation"),
        "rain": current_data.get("rain"),
        "weather_code": current_data.get("weather_code"),
        "condition": get_weather_condition(
            current_data.get("weather_code")
        ),
        "wind_speed": current_data.get("wind_speed_10m"),
    }

    # Hourly forecast
    hourly_forecast = []

    hourly_times = hourly_data.get("time", [])

    current_time = current_data.get("time")

    for index, time_value in enumerate(hourly_times):

        if current_time and time_value < current_time:
            continue

        if len(hourly_forecast) >= 24:
            break

        weather_code = hourly_data.get(
            "weather_code", []
        )[index]

        hourly_forecast.append({
            "time": time_value,

            "temperature": hourly_data.get(
                "temperature_2m", []
            )[index],

            "humidity": hourly_data.get(
                "relative_humidity_2m", []
            )[index],

            "rain_probability": hourly_data.get(
                "precipitation_probability", []
            )[index],

            "rainfall": hourly_data.get(
                "precipitation", []
            )[index],

            "rain": hourly_data.get(
                "rain", []
            )[index],

            "wind_speed": hourly_data.get(
                "wind_speed_10m", []
            )[index],

            "et0": hourly_data.get(
                "et0_fao_evapotranspiration", []
            )[index],

            "weather_code": weather_code,

            "condition": get_weather_condition(weather_code),
        })

    # Daily forecast
    daily_forecast = []

    daily_times = daily_data.get("time", [])

    for index, date_value in enumerate(daily_times):

        weather_code = daily_data.get(
            "weather_code", []
        )[index]

        daily_forecast.append({
            "date": date_value,

            "min_temperature": daily_data.get(
                "temperature_2m_min", []
            )[index],

            "max_temperature": daily_data.get(
                "temperature_2m_max", []
            )[index],

            "rain_probability": daily_data.get(
                "precipitation_probability_max", []
            )[index],

            "rainfall": daily_data.get(
                "precipitation_sum", []
            )[index],

            "max_wind_speed": daily_data.get(
                "wind_speed_10m_max", []
            )[index],

            "et0": daily_data.get(
                "et0_fao_evapotranspiration_sum", []
            )[index],

            "weather_code": weather_code,

            "condition": get_weather_condition(weather_code),
        })

    advisory = build_plant_care_advisory(
        current,
        hourly_forecast,
        daily_forecast
    )

    return {
        "success": True,

        "location": {
            "latitude": weather_data.get("latitude", latitude),
            "longitude": weather_data.get("longitude", longitude),
            "timezone": weather_data.get("timezone", "auto"),
            "name": "Selected location"
        },

        "current": current,

        "hourly": hourly_forecast,

        "daily": daily_forecast,

        "advisory": advisory,

        "units": {
            "temperature": "°C",
            "humidity": "%",
            "rainfall": "mm",
            "wind_speed": "km/h",
            "et0": "mm"
        }
    }
