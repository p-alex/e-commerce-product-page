import { openLightbox } from "./lightbox.js";
openLightbox;
let currentSliderIndex = 0;
export let currentFocusableFullImageBtn;
export function insertImageSlider(name, images) {
    const fullImagesRow = document.querySelector(".product__fullImagesRow");
    const thumbnailsContainer = document.querySelector(".product__thumbnails");
    const sliderCtrls = document.querySelectorAll(".product__sliderCtrl");
    appendFullImages();
    appendThumbnails();
    // Appending full images
    function appendFullImages() {
        images.forEach((image, index) => {
            const button = document.createElement("button");
            button.setAttribute("aria-label", `${name} full image ${index + 1}`);
            button.classList.add("product__fullImageBtn");
            if (currentSliderIndex === index)
                button.setAttribute("tabindex", "0");
            if (currentSliderIndex !== index)
                button.setAttribute("tabIndex", "-1");
            const fullImage = document.createElement("img");
            fullImage.src = `images/${image.fullImage}`;
            fullImage.classList.add("product__fullImage");
            fullImage.alt = `Product full image ${index}`;
            button.appendChild(fullImage);
            button.addEventListener("click", () => openLightbox(index));
            fullImagesRow.appendChild(button);
        });
    }
    // Appending the thumbnails
    function appendThumbnails() {
        images.forEach((image, id) => {
            //Creating thumbnail button
            const thumbnailBtn = document.createElement("button");
            thumbnailBtn.setAttribute("aria-label", `${name} thumbnail ${id}`);
            thumbnailBtn.classList.add("product__thumbnailBtn");
            //Adding thumbnail image to the thumbnail button
            const thumbnail = document.createElement("img");
            thumbnail.src = `images/${image.thumbnail}`;
            thumbnail.alt = `Product thumbnail ${id}`;
            if (id === 0) {
                thumbnailBtn.classList.add("active-thumbnail");
            }
            thumbnailBtn.addEventListener("click", () => {
                moveSlider(id);
                setCurrentActiveThumbnail(id);
                makeCurrentFullImageBtnFocusable(id);
            });
            thumbnailBtn.appendChild(thumbnail);
            thumbnailsContainer.appendChild(thumbnailBtn);
        });
    }
    // applying event listeners to slider ctrls
    // to increment or decrement currentSliderIndex
    sliderCtrls.forEach((ctrl) => {
        ctrl.addEventListener("click", () => {
            if (ctrl.classList.contains("ctrl-left")) {
                if (currentSliderIndex - 1 >= 0) {
                    moveSlider(currentSliderIndex - 1);
                    setCurrentActiveThumbnail(currentSliderIndex);
                    makeCurrentFullImageBtnFocusable(currentSliderIndex);
                }
            }
            else {
                if (currentSliderIndex + 1 <= images.length - 1) {
                    moveSlider(currentSliderIndex + 1);
                    setCurrentActiveThumbnail(currentSliderIndex);
                    makeCurrentFullImageBtnFocusable(currentSliderIndex);
                }
            }
        });
    });
    function moveSlider(index) {
        fullImagesRow.style.transform = `translateX(-${100 * index}%)`;
        currentSliderIndex = index;
    }
    function makeCurrentFullImageBtnFocusable(id) {
        const fulImages = document.querySelectorAll(".product__fullImageBtn");
        fulImages.forEach((fullImage, index) => {
            if (index !== id) {
                fullImage.setAttribute("tabIndex", "-1");
            }
            if (index === id) {
                fullImage.setAttribute("tabIndex", "0");
                currentFocusableFullImageBtn = fullImage;
            }
        });
    }
    function setCurrentActiveThumbnail(id) {
        const thumbnails = document.querySelectorAll(".product__thumbnailBtn");
        thumbnails.forEach((thumbnail, index) => {
            if (thumbnail.classList.contains("active-thumbnail")) {
                thumbnail.classList.remove("active-thumbnail");
            }
            if (id === index) {
                thumbnail.classList.add("active-thumbnail");
            }
        });
    }
}
