from io import BytesIO
import warnings

from fastapi import HTTPException, UploadFile
from PIL import Image, UnidentifiedImageError


MAX_FILE_SIZE = 5 * 1024 * 1024

ALLOWED_FORMATS = {
    ".jpg": "JPEG",
    ".jpeg": "JPEG",
    ".png": "PNG",
    ".webp": "WEBP"
}


async def validate_image(file: UploadFile) -> Image.Image:

    filename = (file.filename or "").lower()
    extension = "." + filename.rsplit(".", 1)[-1] if "." in filename else ""

    if extension not in ALLOWED_FORMATS:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, JPEG, PNG, and WEBP images are allowed."
        )

    image_bytes = await file.read(MAX_FILE_SIZE + 1)

    if not image_bytes:
        raise HTTPException(
            status_code=400,
            detail="Uploaded image is empty."
        )

    if len(image_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="Image size must not exceed 5 MB."
        )

    try:
        with warnings.catch_warnings():
            warnings.simplefilter("error", Image.DecompressionBombWarning)

            image = Image.open(BytesIO(image_bytes))

            if image.format != ALLOWED_FORMATS[extension]:
                raise HTTPException(
                    status_code=400,
                    detail="Image content does not match its file extension."
                )

            image.verify()

            image = Image.open(BytesIO(image_bytes))
            image.load()

            return image.convert("RGB")

    except HTTPException:
        raise

    except (
        UnidentifiedImageError,
        Image.DecompressionBombError,
        Image.DecompressionBombWarning,
        OSError,
        ValueError,
        SyntaxError
    ):
        raise HTTPException(
            status_code=400,
            detail="Invalid, corrupted, or unsafe image file."
        )
