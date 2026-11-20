from datetime import datetime, timezone
from unittest.mock import AsyncMock, Mock, patch

from bson import ObjectId
from fastapi.testclient import TestClient

from backend.app.main import app
from backend.app.utils.auth_dependency import get_current_user


USER_ID = str(ObjectId())
OTHER_USER_ID = str(ObjectId())
PREDICTION_ID = ObjectId()

CURRENT_USER = {
    "id": USER_ID,
    "name": "Test User",
    "email": "test@example.com",
    "created_at": datetime.now(timezone.utc)
}

RECORD = {
    "_id": PREDICTION_ID,
    "user_id": ObjectId(USER_ID),
    "prediction": {
        "predicted_disease": "Apple rust leaf",
        "confidence": 85.5
    },
    "created_at": datetime.now(timezone.utc)
}


class FakeCursor:
    def sort(self, field, direction):
        assert field == "created_at"
        assert direction == -1
        return self

    def __aiter__(self):
        self.records = iter([RECORD])
        return self

    async def __anext__(self):
        try:
            return next(self.records)
        except StopIteration:
            raise StopAsyncIteration


app.dependency_overrides[get_current_user] = lambda: CURRENT_USER

client = TestClient(app, raise_server_exceptions=False)

collection = Mock()
fake_database = {"prediction_history": collection}

try:
    print("\n========== PREDICTION HISTORY TESTS ==========")

    # 1. Retrieve own history
    collection.find.return_value = FakeCursor()

    with patch(
        "backend.app.controllers.prediction_history_controller.get_database",
        return_value=fake_database
    ):
        response = client.get("/api/predictions/history")

    assert response.status_code == 200, response.text
    assert response.json()["total"] == 1
    assert response.json()["data"][0]["id"] == str(PREDICTION_ID)

    query = collection.find.call_args.args[0]
    assert query["user_id"] == ObjectId(USER_ID)
    print("PASS: Own prediction history retrieved")

    # 2. Invalid prediction ID
    response = client.get("/api/predictions/history/invalid-id")

    assert response.status_code == 400
    print("PASS: Invalid prediction ID rejected")

    # 3. Retrieve own prediction details
    collection.find_one = AsyncMock(return_value=RECORD)

    with patch(
        "backend.app.controllers.prediction_history_controller.get_database",
        return_value=fake_database
    ):
        response = client.get(
            f"/api/predictions/history/{PREDICTION_ID}"
        )

    assert response.status_code == 200
    assert response.json()["data"]["id"] == str(PREDICTION_ID)

    query = collection.find_one.call_args.args[0]
    assert query["user_id"] == ObjectId(USER_ID)
    print("PASS: Own prediction details retrieved")

    # 4. Other user's record must not be accessible
    collection.find_one = AsyncMock(return_value=None)

    with patch(
        "backend.app.controllers.prediction_history_controller.get_database",
        return_value=fake_database
    ):
        response = client.get(
            f"/api/predictions/history/{PREDICTION_ID}"
        )

    assert response.status_code == 404
    print("PASS: Other user's prediction details blocked")

    # 5. Other user's record must not be deletable
    collection.delete_one = AsyncMock(
        return_value=Mock(deleted_count=0)
    )

    with patch(
        "backend.app.controllers.prediction_history_controller.get_database",
        return_value=fake_database
    ):
        response = client.delete(
            f"/api/predictions/history/{PREDICTION_ID}"
        )

    assert response.status_code == 404

    query = collection.delete_one.call_args.args[0]
    assert query["user_id"] == ObjectId(USER_ID)
    print("PASS: Other user's prediction deletion blocked")

    # 6. Delete own prediction
    collection.delete_one = AsyncMock(
        return_value=Mock(deleted_count=1)
    )

    with patch(
        "backend.app.controllers.prediction_history_controller.get_database",
        return_value=fake_database
    ):
        response = client.delete(
            f"/api/predictions/history/{PREDICTION_ID}"
        )

    assert response.status_code == 200
    print("PASS: Own prediction deletion successful")

    # 7. Invalid deletion ID
    response = client.delete("/api/predictions/history/invalid-id")

    assert response.status_code == 400
    print("PASS: Invalid deletion ID rejected")

    print("\n========== TEST SUMMARY ==========")
    print("Passed: 7/7")
    print("Prediction history tests completed.")

finally:
    app.dependency_overrides.clear()
