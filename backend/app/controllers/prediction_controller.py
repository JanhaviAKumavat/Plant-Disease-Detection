# from fastapi import APIRouter, File, HTTPException, UploadFile, Depends

# from backend.app.services.image_validation import validate_image
# from backend.app.services.prediction_service import predict_plant_disease
# from backend.app.services.disease_information_service import get_disease_information
# from backend.app.services.prediction_history_service import save_prediction_history
# from backend.app.services.explainability_service import generate_explanation
# from backend.app.utils.auth_dependency import get_current_user


# router = APIRouter()


# @router.post("/predict")
# async def predict_disease(
#     file: UploadFile = File(...),
#     current_user: dict = Depends(get_current_user)
# ):
#     image = await validate_image(file)

#     try:
#         result = predict_plant_disease(image)
#         disease_information = get_disease_information(result['predicted_disease'])

#         history = await save_prediction_history(
#             user_id=current_user["id"],
#             prediction_result=result
#         )

#         return {
#             "success": True,
#             "message": "Plant disease prediction completed and saved successfully.",
#             "data": result,
#             "disease_information": disease_information,
#             "history": history
#         }

#     except FileNotFoundError as error:
#         raise HTTPException(status_code=500, detail=str(error))

#     except Exception as error:
#         print("Prediction error:", str(error))
#         raise HTTPException(
#             status_code=500,
#             detail="Unable to predict plant disease. Please try again."
#         )

#     finally:
#         await file.close()


# @router.post("/explain")
# async def explain_disease(
#     file: UploadFile = File(...),
#     current_user: dict = Depends(get_current_user)
# ):
#     image = await validate_image(file)

#     try:
#         # Generate disease prediction
#         prediction = predict_plant_disease(image)
#         disease_information = get_disease_information(prediction['predicted_disease'])

#         # Generate Integrated Gradients heatmap
#         explanation = generate_explanation(image)

#         # Save prediction in logged-in user's history
#         history = await save_prediction_history(
#             user_id=current_user["id"],
#             prediction_result=prediction
#         )

#         return {
#             "success": True,
#             "message": "Plant disease prediction and explanation generated successfully.",
#             "data": prediction,
#             "disease_information": disease_information,
#             "explanation": {
#                 "method": explanation["method"],
#                 "predicted_disease": explanation["predicted_disease"],
#                 "class_index": explanation["class_index"],
#                 "n_steps": explanation["n_steps"],
#                 "heatmap_filename": explanation["heatmap_filename"],
#                 "heatmap_url": (
#                     f"/generated/heatmaps/"
#                     f"{explanation['heatmap_filename']}"
#                 ),
#                 "image_width": explanation["image_width"],
#                 "image_height": explanation["image_height"]
#             },
#             "history": history
#         }

#     except FileNotFoundError as error:
#         raise HTTPException(status_code=500, detail=str(error))

#     except Exception as error:
#         print("Explainability error:", str(error))
#         raise HTTPException(
#             status_code=500,
#             detail="Unable to generate plant disease explanation. Please try again."
#         )

#     finally:
#         await file.close()







# from fastapi import APIRouter, File, HTTPException, UploadFile, Depends

# from backend.app.services.image_validation import validate_image
# from backend.app.services.prediction_service import predict_plant_disease
# from backend.app.services.disease_information_service import get_disease_information
# from backend.app.services.prediction_history_service import save_prediction_history
# from backend.app.services.explainability_service import generate_explanation
# from backend.app.utils.auth_dependency import get_current_user


# router = APIRouter()


# # --------------------------------------------------
# # 1. IMAGE UPLOAD PREDICTION
# # --------------------------------------------------

# @router.post("/predict")
# async def predict_disease(
#     file: UploadFile = File(...),
#     current_user: dict = Depends(get_current_user)
# ):
#     try:
#         image = await validate_image(file)

#         result = predict_plant_disease(image)

#         disease_information = get_disease_information(
#             result["predicted_disease"]
#         )

#         history = await save_prediction_history(
#             user_id=current_user["id"],
#             prediction_result=result
#         )

#         return {
#             "success": True,
#             "message": "Plant disease prediction completed and saved successfully.",
#             "data": result,
#             "disease_information": disease_information,
#             "history": history
#         }

#     except FileNotFoundError as error:
#         raise HTTPException(status_code=500, detail=str(error))

#     except HTTPException:
#         raise

#     except Exception as error:
#         print("Prediction error:", str(error))
#         raise HTTPException(
#             status_code=500,
#             detail="Unable to predict plant disease. Please try again."
#         )

#     finally:
#         await file.close()


# # --------------------------------------------------
# # 2. LIVE CAMERA FRAME PREDICTION
# # --------------------------------------------------

# @router.post("/live-predict")
# async def live_predict_disease(
#     file: UploadFile = File(...),
#     current_user: dict = Depends(get_current_user)
# ):
#     try:
#         # Validate the camera frame using existing validation.
#         image = await validate_image(file)

#         # Use the SAME trained MobileNetV3 model.
#         result = predict_plant_disease(image)

#         # Use the SAME disease information service.
#         disease_information = get_disease_information(
#             result["predicted_disease"]
#         )

#         # Do not save every camera frame in prediction history.
#         return {
#             "success": True,
#             "message": "Live plant disease prediction completed successfully.",
#             "data": result,
#             "disease_information": disease_information
#         }

#     except FileNotFoundError as error:
#         raise HTTPException(status_code=500, detail=str(error))

#     except HTTPException:
#         raise

#     except Exception as error:
#         print("Live prediction error:", str(error))
#         raise HTTPException(
#             status_code=500,
#             detail="Unable to analyze live camera frame. Please try again."
#         )

#     finally:
#         await file.close()


# # --------------------------------------------------
# # 3. PREDICTION WITH INTEGRATED GRADIENTS EXPLANATION
# # --------------------------------------------------

# @router.post("/explain")
# async def explain_disease(
#     file: UploadFile = File(...),
#     current_user: dict = Depends(get_current_user)
# ):
#     try:
#         image = await validate_image(file)

#         # Generate disease prediction using the same model.
#         prediction = predict_plant_disease(image)

#         disease_information = get_disease_information(
#             prediction["predicted_disease"]
#         )

#         # Generate Integrated Gradients heatmap.
#         explanation = generate_explanation(image)

#         # Save completed prediction in user history.
#         history = await save_prediction_history(
#             user_id=current_user["id"],
#             prediction_result=prediction
#         )

#         return {
#             "success": True,
#             "message": "Plant disease prediction and explanation generated successfully.",
#             "data": prediction,
#             "disease_information": disease_information,
#             "explanation": {
#                 "method": explanation["method"],
#                 "predicted_disease": explanation["predicted_disease"],
#                 "class_index": explanation["class_index"],
#                 "n_steps": explanation["n_steps"],
#                 "heatmap_filename": explanation["heatmap_filename"],
#                 "heatmap_url": (
#                     f"/generated/heatmaps/"
#                     f"{explanation['heatmap_filename']}"
#                 ),
#                 "image_width": explanation["image_width"],
#                 "image_height": explanation["image_height"]
#             },
#             "history": history
#         }

#     except FileNotFoundError as error:
#         raise HTTPException(status_code=500, detail=str(error))

#     except HTTPException:
#         raise

#     except Exception as error:
#         print("Explainability error:", str(error))
#         raise HTTPException(
#             status_code=500,
#             detail="Unable to generate plant disease explanation. Please try again."
#         )

#     finally:
#         await file.close()





from fastapi import APIRouter, File, HTTPException, UploadFile, Depends

from backend.app.services.image_validation import validate_image
from backend.app.services.prediction_service import predict_plant_disease
from backend.app.services.disease_information_service import get_disease_information
from backend.app.services.prediction_history_service import save_prediction_history
from backend.app.services.explainability_service import generate_explanation
from backend.app.utils.auth_dependency import get_current_user

router = APIRouter()

# --------------------------------------------------
# 1. IMAGE UPLOAD PREDICTION
# --------------------------------------------------

@router.post("/predict")
async def predict_disease(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    try:
        image = await validate_image(file)

        result = predict_plant_disease(image)

        disease_information = get_disease_information(
            result["predicted_disease"]
        )

        history = await save_prediction_history(
            user_id=current_user["id"],
            prediction_result=result,
            image=image
        )

        return {
            "success": True,
            "message": "Plant disease prediction completed and saved successfully.",
            "data": result,
            "disease_information": disease_information,
            "history": history
        }

    except FileNotFoundError as error:
        raise HTTPException(status_code=500, detail=str(error))

    except HTTPException:
        raise

    except Exception as error:
        print("Prediction error:", str(error))

        raise HTTPException(
            status_code=500,
            detail="Unable to predict plant disease. Please try again."
        )

    finally:
        await file.close()

# --------------------------------------------------
# 2. LIVE CAMERA FRAME PREDICTION
# --------------------------------------------------

@router.post("/live-predict")
async def live_predict_disease(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    try:
        image = await validate_image(file)

        result = predict_plant_disease(image)

        disease_information = get_disease_information(
            result["predicted_disease"]
        )

        # Camera frames are not saved in prediction history.
        return {
            "success": True,
            "message": "Live plant disease prediction completed successfully.",
            "data": result,
            "disease_information": disease_information
        }

    except FileNotFoundError as error:
        raise HTTPException(status_code=500, detail=str(error))

    except HTTPException:
        raise

    except Exception as error:
        print("Live prediction error:", str(error))

        raise HTTPException(
            status_code=500,
            detail="Unable to analyze live camera frame. Please try again."
        )

    finally:
        await file.close()

# --------------------------------------------------
# 3. PREDICTION WITH INTEGRATED GRADIENTS
# --------------------------------------------------

@router.post("/explain")
async def explain_disease(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    try:
        image = await validate_image(file)

        prediction = predict_plant_disease(image)

        disease_information = get_disease_information(
            prediction["predicted_disease"]
        )

        explanation = generate_explanation(image)

        history = await save_prediction_history(
            user_id=current_user["id"],
            prediction_result=prediction,
            image=image
        )

        return {
            "success": True,
            "message": "Plant disease prediction and explanation generated successfully.",
            "data": prediction,
            "disease_information": disease_information,
            "explanation": {
                "method": explanation["method"],
                "predicted_disease": explanation["predicted_disease"],
                "class_index": explanation["class_index"],
                "n_steps": explanation["n_steps"],
                "heatmap_filename": explanation["heatmap_filename"],
                "heatmap_url": (
                    f"/generated/heatmaps/"
                    f"{explanation['heatmap_filename']}"
                ),
                "image_width": explanation["image_width"],
                "image_height": explanation["image_height"]
            },
            "history": history
        }

    except FileNotFoundError as error:
        raise HTTPException(status_code=500, detail=str(error))

    except HTTPException:
        raise

    except Exception as error:
        print("Explainability error:", str(error))

        raise HTTPException(
            status_code=500,
            detail="Unable to generate plant disease explanation. Please try again."
        )

    finally:
        await file.close()