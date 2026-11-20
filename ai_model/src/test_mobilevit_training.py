import torch
import torch.nn as nn
from torch.optim import AdamW

from mobilevit_config import (
    DEVICE,
    LEARNING_RATE,
    WEIGHT_DECAY,
    NUM_CLASSES
)

from mobilevit_model import build_mobilevit_model
from mobilevit_finetuning import configure_finetuning
from mobilevit_dataset import create_mobilevit_dataloaders

print("\n========== MOBILEVIT CPU TRAINING TEST ==========")

torch.set_num_threads(2)

train_loader, _ = create_mobilevit_dataloaders()

model = build_mobilevit_model(
    num_classes=NUM_CLASSES,
    pretrained=True
)

model = configure_finetuning(model).to(DEVICE)

# Keep frozen layers in evaluation mode
model.train()
model.stem.eval()

for index in range(3):
    model.stages[index].eval()

criterion = nn.CrossEntropyLoss()

optimizer = AdamW(
    filter(lambda p: p.requires_grad, model.parameters()),
    lr=LEARNING_RATE,
    weight_decay=WEIGHT_DECAY
)

images, labels = next(iter(train_loader))

images = images.to(DEVICE)
labels = labels.to(DEVICE)

print("Input shape:", tuple(images.shape))

optimizer.zero_grad(set_to_none=True)

outputs = model(images)

print("Output shape:", tuple(outputs.shape))

loss = criterion(outputs, labels)

print("Loss:", round(loss.item(), 4))

loss.backward()

print("Backward propagation: Successful")

optimizer.step()

print("Optimizer step: Successful")

print("\nMobileViT single-batch CPU test completed successfully!")
