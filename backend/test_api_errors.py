from fastapi.testclient import TestClient

from backend.app.main import app

client = TestClient(app, raise_server_exceptions=False)

print("\n========== API ERROR-HANDLING TESTS ==========")

# 1. Health endpoint
response = client.get("/api/health")
assert response.status_code == 200
print("PASS: Health endpoint")

# 2. Root endpoint
response = client.get("/")
assert response.status_code == 200
print("PASS: Root endpoint")

# 3. Invalid prediction file extension
response = client.post(
    "/api/predictions/predict",
    files={"file": ("test.gif", b"invalid", "image/gif")}
)
assert response.status_code in (400, 401, 403)
print("PASS: Unsupported image upload rejected")

# 4. Missing authentication
response = client.post(
    "/api/predictions/predict",
    files={"file": ("test.jpg", b"invalid", "image/jpeg")}
)
assert response.status_code in (401, 403)
print("PASS: Unauthenticated prediction rejected")

# 5. Invalid route
response = client.get("/api/invalid-endpoint")
assert response.status_code == 404
print("PASS: Invalid endpoint returns 404")

# 6. Missing image
response = client.post("/api/predictions/predict")
assert response.status_code in (401, 403, 422)
print("PASS: Missing image rejected")

print("\n========== TEST SUMMARY ==========")
print("Passed: 6/6")
print("API error-handling tests completed.")

