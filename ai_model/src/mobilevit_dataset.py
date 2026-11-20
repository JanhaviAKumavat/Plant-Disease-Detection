import torch
from torch.utils.data import DataLoader
from torchvision import transforms

from config import DATASET_DIR, NUM_WORKERS
from mobilevit_config import BATCH_SIZE, IMAGE_SIZE
from dataset_loader import PlantDocDataset
from mobilevit_model import NORMALIZE_MEAN, NORMALIZE_STD


mobilevit_train_transform = transforms.Compose([
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
    transforms.RandomHorizontalFlip(p=0.5),
    transforms.RandomRotation(degrees=10),
    transforms.ColorJitter(
        brightness=0.1,
        contrast=0.1
    ),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=NORMALIZE_MEAN,
        std=NORMALIZE_STD
    )
])


mobilevit_validation_transform = transforms.Compose([
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=NORMALIZE_MEAN,
        std=NORMALIZE_STD
    )
])


def create_mobilevit_dataloaders():

    train_dataset = PlantDocDataset(
        manifest_file=DATASET_DIR / "mobilevit_train_manifest.csv",
        transform=mobilevit_train_transform
    )

    validation_dataset = PlantDocDataset(
        manifest_file=DATASET_DIR / "mobilevit_validation_manifest.csv",
        transform=mobilevit_validation_transform
    )

    train_loader = DataLoader(
        train_dataset,
        batch_size=BATCH_SIZE,
        shuffle=True,
        num_workers=NUM_WORKERS,
        pin_memory=False
    )

    validation_loader = DataLoader(
        validation_dataset,
        batch_size=BATCH_SIZE,
        shuffle=False,
        num_workers=NUM_WORKERS,
        pin_memory=False
    )

    return train_loader, validation_loader


if __name__ == "__main__":

    print("\n========== MOBILEVIT DATALOADER VERIFICATION ==========")

    torch.set_num_threads(2)

    train_loader, validation_loader = create_mobilevit_dataloaders()

    print("\nDataset sizes:")
    print("Training images:", len(train_loader.dataset))
    print("Validation images:", len(validation_loader.dataset))

    images, labels = next(iter(train_loader))

    print("\nTraining batch:")
    print("Image shape:", tuple(images.shape))
    print("Label shape:", tuple(labels.shape))

    val_images, val_labels = next(iter(validation_loader))

    print("\nValidation batch:")
    print("Image shape:", tuple(val_images.shape))
    print("Label shape:", tuple(val_labels.shape))

    print("\nFinal test dataset is not loaded.")

    print("\nMobileViT DataLoader verification successful!")
