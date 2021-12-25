const lightbox = document.querySelector(".lightbox");
const backdrop = document.querySelector(".lightbox__backdrop");
const closeBtn = document.querySelector(".lightbox__closeBtn");
const imageRow = document.querySelector(".lightbox__fullImagesRow");
const thumbnailContainer = document.querySelector(".lightbox__thumbnails");
const ctrlLeft = document.querySelector(".ctrl-left");
const ctrlRight = document.querySelector(".ctrl-right");
let activeImageIndex = 0;
export function lightboxMain(images) {
    appendFullImagesToRow();
    appendThumbnails();
    ctrlLeft.addEventListener("click", () => {
        if (activeImageIndex - 1 >= 0)
            activeImageIndex--;
        moveSlider(activeImageIndex);
        setActiveImageIndex(activeImageIndex);
        setActiveThumbnail();
    });
    ctrlRight.addEventListener("click", () => {
        if (activeImageIndex + 1 <= images.length - 1)
            activeImageIndex++;
        moveSlider(activeImageIndex);
        setActiveImageIndex(activeImageIndex);
        setActiveThumbnail();
    });
    // Add full images to slider
    function appendFullImagesToRow() {
        images.map((image, id) => {
            const img = document.createElement("img");
            img.src = `./images/${image.fullImage}`;
            img.alt = `Product full image ${id}`;
            imageRow.appendChild(img);
        });
    }
    // Add thumbnails to slider
    function appendThumbnails() {
        images.map((image, id) => {
            const button = document.createElement("button");
            button.classList.add("lightbox__thumbnailBtn");
            if (id === activeImageIndex)
                button.classList.add("lightbox-activeThumbnail");
            const img = document.createElement("img");
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
    function closeLightbox() {
        lightbox.classList.remove("lightbox-active");
    }
    backdrop.addEventListener("click", closeLightbox);
    closeBtn.addEventListener("click", closeLightbox);
}
function setActiveThumbnail() {
    const thumbnails = thumbnailContainer.querySelectorAll(".lightbox__thumbnailBtn");
    thumbnails.forEach((thumbnail, id) => {
        if (thumbnail.classList.contains("lightbox-activeThumbnail")) {
            thumbnail.classList.remove("lightbox-activeThumbnail");
        }
        if (id === activeImageIndex) {
            thumbnail.classList.add("lightbox-activeThumbnail");
        }
    });
}
function moveSlider(index) {
    imageRow.style.transform = `translateX(-${100 * index}%)`;
}
function setActiveImageIndex(index) {
    activeImageIndex = index;
}
export function openLightbox(index) {
    lightbox.classList.add("lightbox-active");
    moveSlider(index);
    setActiveImageIndex(index);
    setActiveThumbnail();
}
