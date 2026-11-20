import torch
from mobilevit_model import build_mobilevit_model

torch.set_num_threads(2)

model = build_mobilevit_model(
    num_classes=27,
    pretrained=False
)

print("\n========== MOBILEVIT STAGE DETAILS ==========")

for index, stage in enumerate(model.stages):

    total = sum(p.numel() for p in stage.parameters())

    print(f"\nStage {index}")
    print("Type:", stage.__class__.__name__)
    print("Parameters:", f"{total:,}")

    for name, module in stage.named_children():
        params = sum(p.numel() for p in module.parameters())
        print(f"  {name}: {module.__class__.__name__} ({params:,} parameters)")

print("\nStage inspection completed!")
