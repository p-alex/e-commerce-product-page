import { addProductToCart } from "./cart.js";
import { currentAmount } from "./amountCounter.js";
export function insertProductDetails(details) {
    const { company, name, discount, price, description, images } = details;
    const companyParagraph = document.querySelector(".product__company");
    companyParagraph.innerText = company;
    const nameHeading = document.querySelector(".product__name");
    nameHeading.innerText = name;
    const descriptionParagraph = document.querySelector(".product__description");
    descriptionParagraph.innerText = description;
    calculateDiscount(price, discount);
    const addToCartBtn = document.querySelector(".product__checkoutBtn");
    addToCartBtn.addEventListener("click", () => addProductToCart({
        imageURL: `images/${images[0].thumbnail}`,
        name,
        price,
        amount: currentAmount(),
    }));
}
function calculateDiscount(currentPrice, discount) {
    // Calculating discount if there is one
    const priceParagraph = document.querySelector(".product__price");
    let priceAfterDiscount;
    if (discount > 0) {
        priceAfterDiscount = currentPrice - (discount / 100) * currentPrice;
        priceParagraph.innerText = `$${priceAfterDiscount}`;
        const discountParagraph = document.querySelector(".product__discount");
        discountParagraph.innerText = `${discount}%`;
        const oldPrice = document.querySelector(".product__oldPrice");
        oldPrice.innerText = `$${currentPrice}`;
    }
    else {
        priceParagraph.innerText = `$${currentPrice}`;
    }
    return priceAfterDiscount;
}
