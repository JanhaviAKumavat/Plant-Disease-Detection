import torch
import timm

from config import NUM_CLASSES


# MobileViT XXS configuration
MODEL_NAME = "mobilevit_xxs.cvnets_in1k"
MODEL_INPUT_SIZE = 256

# Values verified from the pretrained model configuration
NORMALIZE_MEAN = (0.0, 0.0, 0.0)
NORMALIZE_STD = (1.0, 1.0, 1.0)


def build_mobilevit_model(
    num_classes=NUM_CLASSES,
    pretrained=True
):
    """
    Build MobileViT XXS with an optional pretrained ImageNet backbone.

    Args:
        num_classes: Number of PlantDoc disease classes.
        pretrained: Load pretrained ImageNet-1K weights.

    Returns:
        MobileViT XXS classification model.
    """

    model = timm.create_model(
        MODEL_NAME,
        pretrained=pretrained
    )

    # Replace the original ImageNet classifier
    model.reset_classifier(num_classes=num_classes)

    return model


def count_parameters(model):
    total = sum(
        parameter.numel()
        for parameter in model.parameters()
    )

    trainable = sum(
        parameter.numel()
        for parameter in model.parameters()
        if parameter.requires_grad
    )

    return total, trainable


if __name__ == "__main__":

    print("\n========== MOBILEVIT XXS MODEL ==========")

    torch.set_num_threads(2)

    device = torch.device("cpu")

    print("Device:", device)
    print("Model:", MODEL_NAME)
    print("Input size:", MODEL_INPUT_SIZE)
    print("PlantDoc classes:", NUM_CLASSES)

    print("\nLoading pretrained MobileViT XXS...")

    model = build_mobilevit_model(
        num_classes=NUM_CLASSES,
        pretrained=True
    )

    model = model.to(device)
    model.eval()

    total, trainable = count_parameters(model)

    print("\nModel loaded successfully!")

    print("Total parameters:", f"{total:,}")
    print("Trainable parameters:", f"{trainable:,}")
    print("Classifier:", model.get_classifier())

    print("\nTesting model output...")

    dummy_input = torch.randn(
        1,
        3,
        MODEL_INPUT_SIZE,
        MODEL_INPUT_SIZE
    ).to(device)

    with torch.inference_mode():
        output = model(dummy_input)

    print("Input shape:", tuple(dummy_input.shape))
    print("Output shape:", tuple(output.shape))
    print("Output finite:", torch.isfinite(output).all().item())

    assert output.shape == (1, NUM_CLASSES)
    assert torch.isfinite(output).all()

    print("\nMobileViT XXS model verification successful!")
