from datetime import datetime, timezone

from bson import ObjectId
from pymongo.errors import DuplicateKeyError

from app.config.security import (
    hash_password,
    verify_password,
    create_access_token
)
from app.database.mongodb import get_database
from app.schemas.auth_schema import (
    RegisterRequest,
    LoginRequest
)


async def register_user(user_data: RegisterRequest) -> dict:

    database = get_database()
    users = database["users"]

    # Ensure email addresses are unique
    await users.create_index("email", unique=True)

    email = str(user_data.email).lower().strip()

    # Check for an existing account
    existing_user = await users.find_one({"email": email})

    if existing_user:
        raise ValueError("An account with this email already exists.")

    # Prepare user document
    user_document = {
        "name": user_data.name,
        "email": email,
        "password": hash_password(user_data.password),
        "created_at": datetime.now(timezone.utc)
    }

    try:
        result = await users.insert_one(user_document)

    except DuplicateKeyError:
        raise ValueError("An account with this email already exists.")

    user_id = str(result.inserted_id)

    # Generate access token
    access_token = create_access_token(user_id)

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "name": user_data.name,
            "email": email,
            "created_at": user_document["created_at"]
        }
    }


async def authenticate_user(login_data: LoginRequest) -> dict:

    database = get_database()
    users = database["users"]

    email = str(login_data.email).lower().strip()

    user = await users.find_one({"email": email})

    if not user:
        raise ValueError("Invalid email or password.")

    if not verify_password(
        login_data.password,
        user["password"]
    ):
        raise ValueError("Invalid email or password.")

    user_id = str(user["_id"])

    access_token = create_access_token(user_id)

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "name": user["name"],
            "email": user["email"],
            "created_at": user["created_at"]
        }
    }
