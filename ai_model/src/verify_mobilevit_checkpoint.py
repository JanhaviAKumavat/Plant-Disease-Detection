import torch

from config import NUM_CLASSES, CLASS_TO_IDX, CHECKPOINT_DIR

checkpoint_path = CHECKPOINT_DIR / "mobilevit_xxs_best.pth"

print("\n========== CHECKPOINT VERIFICATION ==========")

checkpoint = torch.load(
    checkpoint_path,
    map_location="cpu",
    weights_only=False
)

print("Checkpoint exists:", checkpoint_path.exists())
print("Model name:", checkpoint["model_name"])
print("Epoch:", checkpoint["epoch"])
print("Number of classes:", checkpoint["num_classes"])
print("Validation accuracy:", round(
    checkpoint["validation_accuracy"], 2
), "%")

print("Saved class mappings:", len(checkpoint["class_to_idx"]))
print("Expected class mappings:", len(CLASS_TO_IDX))

print(
    "Class mapping matches:",
    checkpoint["class_to_idx"] == CLASS_TO_IDX
)

print(
    "Model weights available:",
    "model_state_dict" in checkpoint
)

print("\nCheckpoint verification completed!")
