const cartPreview = document.querySelector(
  ".nav__cartPreview"
) as HTMLDivElement;

const productList = document.querySelector(
  ".nav__cartProductsList"
) as HTMLUListElement;

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
    console.log("ghere");
    //remove noProduct message
    productList?.querySelector(".nav__cartNoProductsMessage")?.remove();

    const isCheckoutBtn = document.querySelector(".nav__cartCheckoutBtn");
    console.log("ghere");
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
  amount: number;
}

export function addProductToCart(product: cartProduct): void {
  const { imageURL, name, price, amount } = product;

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
      <span class="nav__cartProductPrice">$${price}</span> x
      <span class="nav__cartProductAmount">${amount}</span>
      <span class="nav__cartProductTotalPrice">$${price * amount}</span>
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
}

function removeProductFromCart(event): void {
  event.currentTarget.parentNode.remove();

  checkIfCartIsEmpty();
  howManyProductsInCart();
  calculateTotalPriceToPay();
}

export function toggleCart() {
  const cartPreview = document.querySelector(
    ".nav__cartPreview"
  ) as HTMLDivElement;

  if (cartPreview.classList.contains("cart-active")) {
    cartPreview.classList.remove("cart-active");
    return;
  }

  cartPreview.classList.add("cart-active");
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
  const totalPriceToPayParagraph = document.querySelector(
    ".nav__cartTotalPriceToPay"
  ) as HTMLParagraphElement;
  const products: NodeList = document.querySelectorAll(".nav__cartProduct");
  let total = 0;
  products.forEach((product: Element) => {
    const price = product.querySelector(
      ".nav__cartProductPrice"
    ) as HTMLSpanElement;
    const amount = product.querySelector(
      ".nav__cartProductAmount"
    ) as HTMLSpanElement;
    total +=
      parseInt(price.innerText.slice(1, price.innerText.length)) *
      parseInt(amount.innerText);
  });
  totalPriceToPayParagraph.innerText = `Total: $${total}`;
}

function removeAllProductsFromCart() {
  productList.innerHTML = "";
}

function handleCheckout() {
  removeAllProductsFromCart();
  checkIfCartIsEmpty();
  howManyProductsInCart();
  calculateTotalPriceToPay();
}
