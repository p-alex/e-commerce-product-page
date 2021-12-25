import { resetCounter } from "./amountCounter.js";
import { cartBtn } from "./nav.js";
const cartPreview = document.querySelector(".nav__cartPreview");
const productList = document.querySelector(".nav__cartProductsList");
// if cart is empty, then add no products message and remove
// total price and cart checkout btn.
export function checkIfCartIsEmpty() {
    var _a;
    const products = document.querySelectorAll(".nav__cartProduct");
    if (products.length === 0) {
        const noProductsMessage = document.createElement("p");
        const totalPriceToPay = document === null || document === void 0 ? void 0 : document.querySelector(".nav__cartTotalPriceToPay");
        const cartCheckoutBtn = document === null || document === void 0 ? void 0 : document.querySelector(".nav__cartCheckoutBtn");
        noProductsMessage.classList.add("nav__cartNoProductsMessage");
        noProductsMessage.innerText = "Your cart is empty";
        productList.appendChild(noProductsMessage);
        totalPriceToPay === null || totalPriceToPay === void 0 ? void 0 : totalPriceToPay.remove();
        cartCheckoutBtn === null || cartCheckoutBtn === void 0 ? void 0 : cartCheckoutBtn.remove();
    }
    else {
        //remove noProduct message
        (_a = productList === null || productList === void 0 ? void 0 : productList.querySelector(".nav__cartNoProductsMessage")) === null || _a === void 0 ? void 0 : _a.remove();
        const isCheckoutBtn = document.querySelector(".nav__cartCheckoutBtn");
        if (!isCheckoutBtn) {
            //adding total price to pay
            const totalPriceToPay = document.createElement("p");
            totalPriceToPay.classList.add("nav__cartTotalPriceToPay");
            //adding checkout btn
            const checkoutBtn = document.createElement("button");
            checkoutBtn.classList.add("nav__cartCheckoutBtn");
            checkoutBtn.innerText = "Checkout";
            checkoutBtn.addEventListener("click", handleCheckout);
            cartPreview.appendChild(totalPriceToPay);
            cartPreview.appendChild(checkoutBtn);
        }
    }
}
export function addProductToCart(product) {
    const { imageURL, name, price, amount, discount } = product;
    let discountPrice = (price * discount) / 100;
    productList.innerHTML += `
  <li class="nav__cartProduct">
  <img
    src="${imageURL}"
    alt=""
    width="60"
    height="60"
    class="nav__cartProductImage"
  />
  <div class="nav__cartProductNameAndPrice">
    <p
      class="nav__cartProductName"
      title=${name}
    >
    ${name}
    </p>
    <div class="nav__cartProductPriceContainer">
      <span class="nav__cartProductPrice">$${discount ? discountPrice : price}</span> x
      <span class="nav__cartProductAmount">${amount}</span>
      <span class="nav__cartProductTotalPrice">$${discount ? discountPrice * amount : price * amount}</span>
    </div>
  </div>
  <button class="nav__cartProductDeleteBtn">
    <img src="./images/icon-delete.svg" />
  </button>
</li>
  `;
    //Apply event listener to delete btn
    productList.querySelectorAll(".nav__cartProductDeleteBtn").forEach((btn) => {
        btn.addEventListener("click", removeProductFromCart);
    });
    checkIfCartIsEmpty();
    howManyProductsInCart();
    calculateTotalPriceToPay();
    resetCounter();
}
function removeProductFromCart(event) {
    event.currentTarget.parentNode.remove();
    checkIfCartIsEmpty();
    howManyProductsInCart();
    calculateTotalPriceToPay();
}
export function toggleCart() {
    if (cartPreview.classList.contains("cart-active")) {
        cartPreview.classList.remove("cart-active");
        return;
    }
    cartPreview.classList.add("cart-active");
}
function toggleCartOff() {
    cartPreview.classList.remove("cart-active");
}
export function howManyProductsInCart() {
    const products = productList.querySelectorAll(".nav__cartProduct");
    const displayNumberOnCartIcon = document.querySelector(".numberOfProductsInCart");
    let total = 0;
    products.forEach((product) => {
        const amount = product.querySelector(".nav__cartProductAmount");
        total += parseInt(amount.innerText);
    });
    displayNumberOnCartIcon.innerText = total.toString();
    cartBtn.setAttribute("aria-label", `toggle shopping cart with ${total} products`);
    return total;
}
function calculateTotalPriceToPay() {
    const totalPriceToPayParagraph = document === null || document === void 0 ? void 0 : document.querySelector(".nav__cartTotalPriceToPay");
    if (totalPriceToPayParagraph) {
        const products = document.querySelectorAll(".nav__cartProduct");
        let total = 0;
        products.forEach((product) => {
            const price = product.querySelector(".nav__cartProductPrice");
            const amount = product.querySelector(".nav__cartProductAmount");
            let priceValue = parseInt(price.innerText.slice(1, price.innerText.length));
            let amountValue = parseInt(amount.innerText);
            total += priceValue * amountValue;
        });
        totalPriceToPayParagraph.innerText = `Total: $${total}`;
    }
}
function removeAllProductsFromCart() {
    productList.innerHTML = "";
    checkIfCartIsEmpty();
    howManyProductsInCart();
}
function handleCheckout() {
    removeAllProductsFromCart();
}
document.addEventListener("click", (event) => toggleCartOffWhenClickOutside(event));
function toggleCartOffWhenClickOutside(event) {
    if (!event.target.closest(".nav__cartPreview") &&
        !event.target.closest(".nav__cartToggle") &&
        !event.target.closest(".nav__cartCheckoutBtn") &&
        !event.target.closest(".nav__cartProductDeleteBtn")) {
        toggleCartOff();
    }
}
