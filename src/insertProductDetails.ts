// adding details to details container
import { detailsInterface } from "./interfaces/index.js";
import { addProductToCart } from "./cart.js";
import { currentAmount } from "./amountCounter.js";
export function insertProductDetails(details: detailsInterface): void {
  const { company, name, discount, price, description, images } = details;
  const companyParagraph = document.querySelector(
    ".product__company"
  ) as HTMLParagraphElement;
  companyParagraph.innerText = company;

  const nameHeading = document.querySelector(
    ".product__name"
  ) as HTMLHeadingElement;
  nameHeading.innerText = name;

  const descriptionParagraph = document.querySelector(
    ".product__description"
  ) as HTMLParagraphElement;
  descriptionParagraph.innerText = description;

  calculateDiscount(price, discount);

  const addToCartBtn = document.querySelector(
    ".product__checkoutBtn"
  ) as HTMLButtonElement;

  addToCartBtn.addEventListener("click", () =>
    addProductToCart({
      imageURL: `images/${images[0].thumbnail}`,
      name,
      price,
      amount: currentAmount(),
    })
  );
}

function calculateDiscount(currentPrice: number, discount: number) {
  // Calculating discount if there is one
  const priceParagraph = document.querySelector(
    ".product__price"
  ) as HTMLParagraphElement;
  let priceAfterDiscount;
  if (discount > 0) {
    priceAfterDiscount = currentPrice - (discount / 100) * currentPrice;
    priceParagraph.innerText = `$${priceAfterDiscount}`;
    const discountParagraph = document.querySelector(
      ".product__discount"
    ) as HTMLParagraphElement;
    discountParagraph.innerText = `${discount}%`;
    const oldPrice = document.querySelector(
      ".product__oldPrice"
    ) as HTMLParagraphElement;
    oldPrice.innerText = `$${currentPrice}`;
  } else {
    priceParagraph.innerText = `$${currentPrice}`;
  }
  return priceAfterDiscount;
}
