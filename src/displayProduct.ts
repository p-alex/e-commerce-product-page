// fetching product
async function getProduct() {
  const response = await fetch("data.json");
  const json = await response.json();
  return json;
}

// adding images to images grid container
interface imagesInterface {
  id: number;
  fullImage: string;
  thumbnail: string;
}
function appendImagesContainer(name: string, images: imagesInterface[]): void {
  const grid = document.querySelector(
    ".product__imagesGridContainer"
  ) as Element;
  // Appending full image
  const fullImage = document.createElement("img") as HTMLImageElement;
  fullImage.width = 450;
  fullImage.height = 450;
  fullImage.src = `images/${images[0].fullImage}`;

  fullImage.classList.add("product__fullImage");
  grid.appendChild(fullImage);
  // Appending the thumbnails
  function appendThumbnails() {
    images.forEach((image, id) => {
      const thumbnailBtn = document.createElement(
        "button"
      ) as HTMLButtonElement;
      thumbnailBtn.setAttribute("aria-label", `${name} thumbnail ${id}`);
      thumbnailBtn.classList.add("product__thumbnailBtn");
      const thumbnail = document.createElement("img") as HTMLImageElement;
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

  appendThumbnails();

  function displayNewFullImage(id): void {
    const thumbnailBtns = document.querySelectorAll(".product__thumbnailBtn");
    fullImage.src = `../dist/images/${images[id].fullImage}`;
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

// adding details to details container
interface productDetailsInterface {
  name: string;
  company: string;
  description: string;
  price: number;
  discount: number;
  images: imagesInterface[];
}
function appendDetailsContainer(details: productDetailsInterface): void {
  const companyParagraph = document.querySelector(
    ".product__company"
  ) as HTMLParagraphElement;
  companyParagraph.innerText = details.company;

  const nameHeading = document.querySelector(
    ".product__name"
  ) as HTMLHeadingElement;
  nameHeading.innerText = details.name;

  const descriptionParagraph = document.querySelector(
    ".product__description"
  ) as HTMLParagraphElement;
  descriptionParagraph.innerText = details.description;

  const priceParagraph = document.querySelector(
    ".product__price"
  ) as HTMLParagraphElement;

  if (details.discount > 0) {
    // Calculating discount
    priceParagraph.innerText = `$${
      details.price - (details.discount / 100) * details.price
    }`;
    const discount = document.querySelector(
      ".product__discount"
    ) as HTMLParagraphElement;
    discount.innerText = `${details.discount}%`;
    const oldPrice = document.querySelector(
      ".product__oldPrice"
    ) as HTMLParagraphElement;
    oldPrice.innerText = `$${details.price}`;
  } else {
    priceParagraph.innerText = `$${details.price}`;
  }
}

async function displayProduct() {
  const productData: productDetailsInterface = await getProduct();
  if (productData) {
    appendImagesContainer(productData.name, productData.images);
    appendDetailsContainer(productData);
  }
}

displayProduct();
