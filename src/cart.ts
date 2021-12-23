import { resetCounter } from "./amountCounter.js";

const cartPreview = document.querySelector(
  ".nav__cartPreview"
) as HTMLDivElement;

const productList = document.querySelector(
  ".nav__cartProductsList"
) as HTMLUListElement;

const productDiscount = document.querySelector(
  ".product__discount"
) as HTMLParagraphElement;

// if cart is empty, then add no products message and remove
// total price and cart checkout btn.
export function checkIfCartIsEmpty(): void {
  const products: NodeList = document.querySelectorAll(".nav__cartProduct");
  if (products.length === 0) {
    const noProductsMessage = document.createElement(
      "p"
    ) as HTMLParagraphElement;

    const totalPriceToPay = document?.querySelector(
      ".nav__cartTotalPriceToPay"
    ) as HTMLParagraphElement;

    const cartCheckoutBtn = document?.querySelector(
      ".nav__cartCheckoutBtn"
    ) as HTMLButtonElement;

    noProductsMessage.classList.add("nav__cartNoProductsMessage");
    noProductsMessage.innerText = "Your cart is empty";
    productList.appendChild(noProductsMessage);

    totalPriceToPay?.remove();
    cartCheckoutBtn?.remove();
  } else {
    //remove noProduct message
    productList?.querySelector(".nav__cartNoProductsMessage")?.remove();

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

export interface cartProduct {
  imageURL: string;
  name: string;
  price: number;
  discount: number;
  amount: number;
}

export function addProductToCart(product: cartProduct): void {
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
      <span class="nav__cartProductPrice">$${
        discount ? discountPrice : price
      }</span> x
      <span class="nav__cartProductAmount">${amount}</span>
      <span class="nav__cartProductTotalPrice">$${
        discount ? discountPrice * amount : price * amount
      }</span>
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

function removeProductFromCart(event): void {
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

export function howManyProductsInCart(): number {
  const products = productList.querySelectorAll(
    ".nav__cartProduct"
  ) as NodeList;

  const displayNumberOnCartIcon = document.querySelector(
    ".numberOfProductsInCart"
  ) as HTMLDivElement;

  let total: number = 0;

  products.forEach((product: Element) => {
    const amount = product.querySelector(
      ".nav__cartProductAmount"
    ) as HTMLSpanElement;
    total += parseInt(amount.innerText);
  });

  displayNumberOnCartIcon.innerText = total.toString();

  return total;
}

function calculateTotalPriceToPay(): void {
  const totalPriceToPayParagraph = document?.querySelector(
    ".nav__cartTotalPriceToPay"
  ) as HTMLParagraphElement;
  if (totalPriceToPayParagraph) {
    const products: NodeList = document.querySelectorAll(".nav__cartProduct");
    let total = 0;
    products.forEach((product: Element) => {
      const price = product.querySelector(
        ".nav__cartProductPrice"
      ) as HTMLSpanElement;
      const amount = product.querySelector(
        ".nav__cartProductAmount"
      ) as HTMLSpanElement;
      let priceValue = parseInt(
        price.innerText.slice(1, price.innerText.length)
      );
      let amountValue = parseInt(amount.innerText);
      let discountValue = parseInt(productDiscount.innerText);
      total += priceValue * amountValue;
    });
    totalPriceToPayParagraph.innerText = `Total: $${total}`;
  }
}

function removeAllProductsFromCart(): void {
  productList.innerHTML = "";
  checkIfCartIsEmpty();
  howManyProductsInCart();
}

function handleCheckout(): void {
  removeAllProductsFromCart();
}

document.addEventListener("click", (event) =>
  toggleCartOffWhenClickOutside(event)
);

function toggleCartOffWhenClickOutside(event) {
  if (
    !event.target.closest(".nav__cartPreview") &&
    !event.target.closest(".nav__cartToggle") &&
    !event.target.closest(".nav__cartCheckoutBtn") &&
    !event.target.closest(".nav__cartProductDeleteBtn")
  ) {
    toggleCartOff();
  }
}
