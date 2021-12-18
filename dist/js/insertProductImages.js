export function imageSlider(name, images) {
    const grid = document.querySelector(".product__imagesGridContainer");
    // Appending full image
    const fullImage = document.createElement("img");
    fullImage.width = 450;
    fullImage.height = 450;
    fullImage.src = `images/${images[0].fullImage}`;
    fullImage.classList.add("product__fullImage");
    grid.appendChild(fullImage);
    appendThumbnails();
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
            thumbnail.width = 90;
            thumbnail.height = 90;
            thumbnail.classList.add("product__thumbnail");
            if (id === 0) {
                thumbnailBtn.classList.add("active-thumbnail");
            }
            thumbnailBtn.addEventListener("click", () => displayNewFullImage(id));
            thumbnailBtn.appendChild(thumbnail);
            grid.appendChild(thumbnailBtn);
        });
    }
    function displayNewFullImage(id) {
        const thumbnailBtns = document.querySelectorAll(".product__thumbnailBtn");
        fullImage.src = `images/${images[id].fullImage}`;
        thumbnailBtns.forEach((btn, index) => {
            if (btn.classList.contains("active-thumbnail")) {
                btn.classList.remove("active-thumbnail");
            }
            if (index === id) {
                btn.classList.add("active-thumbnail");
            }
        });
    }
}
