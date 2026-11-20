import asyncio
from datetime import datetime, timedelta, timezone
from unittest.mock import AsyncMock, patch

import jwt
from fastapi.testclient import TestClient

from backend.app.main import app
from backend.app.config.security import SECRET_KEY, ALGORITHM


client = TestClient(app, raise_server_exceptions=False)

TEST_USER_ID = "507f1f77bcf86cd799439011"

def make_token(expiry):
    return jwt.encode(
        {
            "sub": TEST_USER_ID,
            "exp": expiry,
            "iat": datetime.now(timezone.utc)
        },
        SECRET_KEY,
        algorithm=ALGORITHM
    )


print("\n========== AUTHENTICATION TESTS ==========")

# 1. Missing token
response = client.get("/api/auth/me")
print("PASS: Missing JWT rejected" if response.status_code in (401, 403)
      else f"FAIL: Missing JWT returned {response.status_code}")

# 2. Invalid token
response = client.get(
    "/api/auth/me",
    headers={"Authorization": "Bearer invalid.token.value"}
)
print("PASS: Invalid JWT rejected" if response.status_code == 401
      else f"FAIL: Invalid JWT returned {response.status_code}")

# 3. Expired token
expired_token = make_token(
    datetime.now(timezone.utc) - timedelta(minutes=5)
)
response = client.get(
    "/api/auth/me",
    headers={"Authorization": f"Bearer {expired_token}"}
)
print("PASS: Expired JWT rejected" if response.status_code == 401
      else f"FAIL: Expired JWT returned {response.status_code}")

# 4. Malformed registration data
response = client.post(
    "/api/auth/register",
    json={
        "name": "A",
        "email": "invalid-email",
        "password": "123"
    }
)
print("PASS: Invalid registration data rejected"
      if response.status_code == 422
      else f"FAIL: Invalid registration returned {response.status_code}")

# 5. Invalid login data
response = client.post(
    "/api/auth/login",
    json={
        "email": "invalid-email",
        "password": "123"
    }
)
print("PASS: Invalid login data rejected"
      if response.status_code == 422
      else f"FAIL: Invalid login returned {response.status_code}")

# 6. Valid JWT but user does not exist
fake_database = {
    "users": AsyncMock()
}
fake_database["users"].find_one = AsyncMock(return_value=None)

valid_token = make_token(
    datetime.now(timezone.utc) + timedelta(minutes=30)
)

with patch(
    "backend.app.utils.auth_dependency.get_database",
    return_value=fake_database
):
    response = client.get(
        "/api/auth/me",
        headers={"Authorization": f"Bearer {valid_token}"}
    )

print("PASS: JWT for nonexistent user rejected"
      if response.status_code == 401
      else f"FAIL: Nonexistent user returned {response.status_code}")

print("\nAuthentication edge-case tests completed.")
