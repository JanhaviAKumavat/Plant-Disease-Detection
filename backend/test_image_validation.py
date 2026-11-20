import asyncio
from io import BytesIO

from fastapi import HTTPException, UploadFile
from PIL import Image

from backend.app.services.image_validation import validate_image, MAX_FILE_SIZE


def create_upload(filename, content):
    return UploadFile(
        filename=filename,
        file=BytesIO(content)
    )


def create_jpeg():
    buffer = BytesIO()
    Image.new("RGB", (100, 100), color="green").save(
        buffer, format="JPEG"
    )
    return buffer.getvalue()


async def run_tests():
    passed = 0

    async def check(name, upload, expected_status=None):
        nonlocal passed

        try:
            result = await validate_image(upload)

            if expected_status is None:
                assert result.mode == "RGB"
                assert result.size == (100, 100)
                print(f"PASS: {name}")
                passed += 1
            else:
                print(f"FAIL: {name} - Expected HTTP {expected_status}")
        except HTTPException as error:
            if error.status_code == expected_status:
                print(f"PASS: {name} - HTTP {error.status_code}")
                passed += 1
            else:
                print(
                    f"FAIL: {name} - Expected {expected_status}, "
                    f"received {error.status_code}"
                )

    jpeg_data = create_jpeg()

    await check(
        "Valid JPEG image",
        create_upload("test.jpg", jpeg_data)
    )

    await check(
        "Unsupported extension",
        create_upload("test.gif", jpeg_data),
        400
    )

    await check(
        "Empty image",
        create_upload("empty.jpg", b""),
        400
    )

    await check(
        "Corrupted image",
        create_upload("corrupted.jpg", b"not a valid image"),
        400
    )

    await check(
        "File larger than 5 MB",
        create_upload("large.jpg", b"x" * (MAX_FILE_SIZE + 1)),
        413
    )

    await check(
        "Image extension and content mismatch",
        create_upload("wrong.png", jpeg_data),
        400
    )

    print(f"\n========== TEST SUMMARY ==========")
    print(f"Passed: {passed}/6")
    print("Image validation tests completed.")


if __name__ == "__main__":
    asyncio.run(run_tests())
