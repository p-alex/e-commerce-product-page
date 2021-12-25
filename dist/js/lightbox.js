import { currentFocusableFullImageBtn } from "./insertImageSlider.js";
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
    applyFocusTrap();
    ctrlLeft.addEventListener("click", () => {
        //if (activeImageIndex - 1 >= 0) activeImageIndex--;
        activeImageIndex--;
        if (activeImageIndex < 0) {
            activeImageIndex = images.length - 1;
        }
        moveSlider(activeImageIndex);
        setActiveImageIndex(activeImageIndex);
        setActiveThumbnail();
    });
    ctrlRight.addEventListener("click", () => {
        //if (activeImageIndex + 1 <= images.length - 1) activeImageIndex++;
        activeImageIndex++;
        if (activeImageIndex > images.length - 1) {
            activeImageIndex = 0;
        }
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
            img.setAttribute("aria-role", "");
            imageRow.appendChild(img);
        });
    }
    // Add thumbnails to slider
    function appendThumbnails() {
        images.map((image, id) => {
            const button = document.createElement("button");
            button.setAttribute("aria-label", `Lightbox product thumbnail ${id + 1}`);
            button.classList.add("lightbox__thumbnailBtn");
            if (id === activeImageIndex)
                button.classList.add("lightbox-activeThumbnail");
            if (id === images.length - 1)
                button.classList.add("lightbox__lastFocusableElement");
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
        currentFocusableFullImageBtn.focus();
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
    closeBtn.focus();
    moveSlider(index);
    setActiveImageIndex(index);
    setActiveThumbnail();
}
// FOCUS TRAP
function applyFocusTrap() {
    const topFocusTrap = lightbox.querySelector(".lightbox__topFocusTrap");
    const bottomFocusTrap = lightbox.querySelector(".lightbox__bottomFocusTrap");
    const lastFocusableElement = lightbox.querySelector(".lightbox__lastFocusableElement");
    topFocusTrap.addEventListener("focus", () => lastFocusableElement.focus());
    bottomFocusTrap.addEventListener("focus", () => closeBtn.focus());
}
