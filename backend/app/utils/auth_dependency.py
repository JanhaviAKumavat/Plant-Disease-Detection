import jwt

from bson import ObjectId
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.config.security import decode_access_token
from app.database.mongodb import get_database


bearer_scheme = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)
) -> dict:

    token = credentials.credentials

    unauthorized = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired authentication token.",
        headers={"WWW-Authenticate": "Bearer"}
    )

    try:
        payload = decode_access_token(token)

        user_id = payload.get("sub")

        if not user_id or not ObjectId.is_valid(user_id):
            raise unauthorized

    except (jwt.InvalidTokenError, TypeError, ValueError):
        raise unauthorized

    database = get_database()

    user = await database["users"].find_one(
        {"_id": ObjectId(user_id)}
    )

    if not user:
        raise unauthorized

    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "created_at": user["created_at"]
    }
