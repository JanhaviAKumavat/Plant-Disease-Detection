from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app, raise_server_exceptions=False)

response = client.post("/api/predictions/predict")

print("\n========== MISSING IMAGE TEST ==========")
print("Status code:", response.status_code)
print("Response body:", response.text)
print("Expected: 422 - Missing required file")
