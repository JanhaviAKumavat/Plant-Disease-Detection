import torch
from mobilevit_model import build_mobilevit_model

torch.set_num_threads(2)

model = build_mobilevit_model(
    num_classes=27,
    pretrained=False
)

print("\n========== MOBILEVIT XXS ARCHITECTURE ==========")

for name, module in model.named_children():

    total = sum(p.numel() for p in module.parameters())
    trainable = sum(
        p.numel() for p in module.parameters()
        if p.requires_grad
    )

    print(f"\nModule: {name}")
    print("Type:", module.__class__.__name__)
    print("Total parameters:", f"{total:,}")
    print("Trainable parameters:", f"{trainable:,}")

total_params = sum(p.numel() for p in model.parameters())

print("\n========== MODEL SUMMARY ==========")
print("Total parameters:", f"{total_params:,}")
print("Classifier:", model.get_classifier())

print("\nArchitecture inspection completed!")
