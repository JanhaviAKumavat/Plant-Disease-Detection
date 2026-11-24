# from contextlib import asynccontextmanager
# from pathlib import Path

# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.staticfiles import StaticFiles

# from app.routes.prediction_routes import router as prediction_router
# from app.routes.auth_routes import router as auth_router
# from app.database.mongodb import (
#     connect_to_mongodb,
#     close_mongodb_connection
# )


# # Heatmap storage directory
# PROJECT_ROOT = Path(__file__).resolve().parents[2]

# HEATMAP_DIR = (
#     PROJECT_ROOT
#     / "backend"
#     / "generated"
#     / "heatmaps"
# )

# HEATMAP_DIR.mkdir(parents=True, exist_ok=True)


# @asynccontextmanager
# async def lifespan(app: FastAPI):

#     await connect_to_mongodb()

#     yield

#     await close_mongodb_connection()


# app = FastAPI(
#     title="Plant Disease Detection API",
#     description="AI-powered plant disease detection and diagnosis using MobileNetV3.",
#     version="1.0.0",
#     lifespan=lifespan
# )


# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:5173",
#         "http://127.0.0.1:5173"
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"]
# )


# # Serve generated explainability heatmaps
# app.mount(
#     "/generated/heatmaps",
#     StaticFiles(directory=str(HEATMAP_DIR)),
#     name="heatmaps"
# )


# app.include_router(prediction_router)
# app.include_router(auth_router)


# @app.get("/")
# async def home():
#     return {
#         "success": True,
#         "message": "Plant Disease Detection API is running!"
#     }


# @app.get("/api/health")
# async def health_check():
#     return {
#         "success": True,
#         "status": "healthy",
#         "service": "Plant Disease Detection API"
#     }






# from contextlib import asynccontextmanager
# from pathlib import Path

# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.staticfiles import StaticFiles

# from app.routes.prediction_routes import router as prediction_router
# from app.routes.auth_routes import router as auth_router
# from app.database.mongodb import (
#     connect_to_mongodb,
#     close_mongodb_connection
# )

# PROJECT_ROOT = Path(__file__).resolve().parents[2]

# # Heatmap storage
# HEATMAP_DIR = (
#     PROJECT_ROOT
#     / "backend"
#     / "generated"
#     / "heatmaps"
# )

# HEATMAP_DIR.mkdir(parents=True, exist_ok=True)

# # Original prediction history images
# HISTORY_IMAGE_DIR = (
#     PROJECT_ROOT
#     / "backend"
#     / "generated"
#     / "history_images"
# )

# HISTORY_IMAGE_DIR.mkdir(parents=True, exist_ok=True)

# @asynccontextmanager
# async def lifespan(app: FastAPI):

#     await connect_to_mongodb()

#     yield

#     await close_mongodb_connection()

# app = FastAPI(
#     title="Plant Disease Detection API",
#     description="AI-powered plant disease detection and diagnosis using MobileNetV3.",
#     version="1.0.0",
#     lifespan=lifespan
# )

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:5173",
#         "http://127.0.0.1:5173"
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"]
# )

# # Serve explainability heatmaps
# app.mount(
#     "/generated/heatmaps",
#     StaticFiles(directory=str(HEATMAP_DIR)),
#     name="heatmaps"
# )

# # Serve original prediction history images
# app.mount(
#     "/generated/history-images",
#     StaticFiles(directory=str(HISTORY_IMAGE_DIR)),
#     name="history-images"
# )

# app.include_router(prediction_router)
# app.include_router(auth_router)

# @app.get("/")
# async def home():
#     return {
#         "success": True,
#         "message": "Plant Disease Detection API is running!"
#     }

# @app.get("/api/health")
# async def health_check():
#     return {
#         "success": True,
#         "status": "healthy",
#         "service": "Plant Disease Detection API"
#     }




# 23 nov new changes for weather forcasting


from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routes.prediction_routes import (
    router as prediction_router,
)
from app.routes.auth_routes import (
    router as auth_router,
)
from app.routes.weather_routes import (
    router as weather_router,
)
from app.database.mongodb import (
    connect_to_mongodb,
    close_mongodb_connection,
)


PROJECT_ROOT = Path(__file__).resolve().parents[2]

# Heatmap storage
HEATMAP_DIR = (
    PROJECT_ROOT
    / "backend"
    / "generated"
    / "heatmaps"
)

HEATMAP_DIR.mkdir(parents=True, exist_ok=True)

# Original prediction history images
HISTORY_IMAGE_DIR = (
    PROJECT_ROOT
    / "backend"
    / "generated"
    / "history_images"
)

HISTORY_IMAGE_DIR.mkdir(parents=True, exist_ok=True)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongodb()

    yield

    await close_mongodb_connection()


app = FastAPI(
    title="Plant Disease Detection API",
    description=(
        "AI-powered plant disease detection and diagnosis "
        "using MobileNetV3, with weather-based plant care advisories."
    ),
    version="1.0.0",
    lifespan=lifespan,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Serve explainability heatmaps
app.mount(
    "/generated/heatmaps",
    StaticFiles(directory=str(HEATMAP_DIR)),
    name="heatmaps",
)

# Serve original prediction history images
app.mount(
    "/generated/history-images",
    StaticFiles(directory=str(HISTORY_IMAGE_DIR)),
    name="history-images",
)


# Application routes
app.include_router(prediction_router)
app.include_router(auth_router)
app.include_router(weather_router)


@app.get("/")
async def home():
    return {
        "success": True,
        "message": "Plant Disease Detection API is running!",
    }


@app.get("/api/health")
async def health_check():
    return {
        "success": True,
        "status": "healthy",
        "service": "Plant Disease Detection API",
    }