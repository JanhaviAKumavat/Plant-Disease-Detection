from fastapi import APIRouter, HTTPException, status, Depends

from backend.app.schemas.auth_schema import (
    RegisterRequest,
    LoginRequest
)

from backend.app.services.auth_service import (
    register_user,
    authenticate_user
)

from backend.app.utils.auth_dependency import get_current_user

router = APIRouter()


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(data: RegisterRequest):

    try:
        result = await register_user(data)

        return {
            "success": True,
            "message": "User registered successfully.",
            "data": result
        }

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(error)
        )

    except Exception as error:
        print("Registration error:", str(error))

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to register user. Please try again."
        )


@router.post("/login")
async def login(data: LoginRequest):

    try:
        result = await authenticate_user(data)

        return {
            "success": True,
            "message": "Login successful.",
            "data": result
        }

    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )

    except Exception as error:
        print("Login error:", str(error))

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to login. Please try again."
        )


@router.get("/me")
async def get_my_profile(
    current_user: dict = Depends(get_current_user)
):
    return {
        "success": True,
        "message": "User profile retrieved successfully.",
        "data": current_user
    }