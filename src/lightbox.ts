import { imagesInterface } from "./interfaces/index";
const lightbox = document.querySelector(".lightbox") as HTMLDivElement;

const backdrop = document.querySelector(
  ".lightbox__backdrop"
) as HTMLDivElement;

const closeBtn = document.querySelector(
  ".lightbox__closeBtn"
) as HTMLButtonElement;

const imageRow = document.querySelector(
  ".lightbox__fullImagesRow"
) as HTMLDivElement;

const thumbnailContainer = document.querySelector(
  ".lightbox__thumbnails"
) as HTMLDivElement;

const ctrlLeft = document.querySelector(".ctrl-left") as HTMLButtonElement;

const ctrlRight = document.querySelector(".ctrl-right") as HTMLButtonElement;

let activeImageIndex: number = 0;

export function lightboxMain(images: imagesInterface[]): void {
  appendFullImagesToRow();
  appendThumbnails();

  ctrlLeft.addEventListener("click", () => {
    if (activeImageIndex - 1 >= 0) activeImageIndex--;
    moveSlider(activeImageIndex);
    setActiveImageIndex(activeImageIndex);
    setActiveThumbnail();
  });

  ctrlRight.addEventListener("click", () => {
    if (activeImageIndex + 1 <= images.length - 1) activeImageIndex++;
    moveSlider(activeImageIndex);
    setActiveImageIndex(activeImageIndex);
    setActiveThumbnail();
  });

  // Add full images to slider
  function appendFullImagesToRow(): void {
    images.map((image: imagesInterface, id: number) => {
      const img = document.createElement("img") as HTMLImageElement;
      img.src = `./images/${image.fullImage}`;
      img.alt = `Product full image ${id}`;
      imageRow.appendChild(img);
    });
  }

  // Add thumbnails to slider
  function appendThumbnails(): void {
    images.map((image: imagesInterface, id: number) => {
      const button = document.createElement("button") as HTMLButtonElement;
      button.classList.add("lightbox__thumbnailBtn");
      if (id === activeImageIndex)
        button.classList.add("lightbox-activeThumbnail");
      const img = document.createElement("img") as HTMLImageElement;
      img.src = `./images/${image.thumbnail}`;
      img.alt = `Product thumbnail ${id}`;
      button.appendChild(img);
      button.addEventListener("click", () => {
        moveSlider(id);
        setActiveImageIndex(id);
        setActiveThumbnail();
      });
      thumbnailContainer.appendChild(button);
    });
  }

  function closeLightbox(): void {
    lightbox.classList.remove("lightbox-active");
  }

  backdrop.addEventListener("click", closeLightbox);
  closeBtn.addEventListener("click", closeLightbox);
}

function setActiveThumbnail() {
  const thumbnails = thumbnailContainer.querySelectorAll(
    ".lightbox__thumbnailBtn"
  );
  thumbnails.forEach((thumbnail, id) => {
    if (thumbnail.classList.contains("lightbox-activeThumbnail")) {
      thumbnail.classList.remove("lightbox-activeThumbnail");
    }
    if (id === activeImageIndex) {
      thumbnail.classList.add("lightbox-activeThumbnail");
    }
  });
}
function moveSlider(index): void {
  imageRow.style.transform = `translateX(-${100 * index}%)`;
}
function setActiveImageIndex(index: number): void {
  activeImageIndex = index;
}
export function openLightbox(index): void {
  lightbox.classList.add("lightbox-active");
  moveSlider(index);
  setActiveImageIndex(index);
  setActiveThumbnail();
}
