import torch
from mobilevit_model import build_mobilevit_model
from mobilevit_config import DEVICE, NUM_CLASSES


def configure_finetuning(model):

    # Freeze the stem
    for parameter in model.stem.parameters():
        parameter.requires_grad = False

    # Freeze early stages: 0, 1, 2
    for index in range(3):
        for parameter in model.stages[index].parameters():
            parameter.requires_grad = False

    # Stages 3 and 4 remain trainable.
    # Final convolution and classification head remain trainable.

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

    frozen = total - trainable

    return total, trainable, frozen


def main():

    print("\n========== MOBILEVIT FINE-TUNING SETUP ==========")

    model = build_mobilevit_model(
        num_classes=NUM_CLASSES,
        pretrained=True
    )

    model = configure_finetuning(model)
    model = model.to(DEVICE)

    total, trainable, frozen = count_parameters(model)

    print("\nLayer configuration:")

    for name, module in model.named_children():

        params = list(module.parameters())

        if not params:
            status = "No parameters"
        elif all(not p.requires_grad for p in params):
            status = "FROZEN"
        elif all(p.requires_grad for p in params):
            status = "TRAINABLE"
        else:
            status = "PARTIALLY TRAINABLE"

        print(f"{name}: {status}")

    print("\n========== PARAMETER SUMMARY ==========")
    print("Total parameters:", f"{total:,}")
    print("Trainable parameters:", f"{trainable:,}")
    print("Frozen parameters:", f"{frozen:,}")

    print("\nFine-tuning configuration created successfully!")


if __name__ == "__main__":
    torch.set_num_threads(2)
    main()
