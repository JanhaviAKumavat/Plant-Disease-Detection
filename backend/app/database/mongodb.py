from pathlib import Path

from dotenv import load_dotenv
from pymongo import AsyncMongoClient
import os


BACKEND_DIR = Path(__file__).resolve().parents[2]
load_dotenv(BACKEND_DIR / ".env")

MONGO_URL = os.getenv("MONGO_URL", "mongodb://127.0.0.1:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "plant_disease_detection")

client = None
database = None


async def connect_to_mongodb():
    global client, database

    client = AsyncMongoClient(MONGO_URL)

    await client.admin.command("ping")

    database = client[DATABASE_NAME]

    print("MongoDB connected successfully!")
    print("Database:", DATABASE_NAME)


async def close_mongodb_connection():
    global client, database

    if client is not None:
        await client.close()
        client = None
        database = None

        print("MongoDB connection closed.")


def get_database():
    if database is None:
        raise RuntimeError("MongoDB is not connected.")

    return database
