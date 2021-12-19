const cartPreview = document.querySelector(".nav__cartPreview");
const productList = document.querySelector(".nav__cartProductsList");
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
        console.log("ghere");
        //remove noProduct message
        (_a = productList === null || productList === void 0 ? void 0 : productList.querySelector(".nav__cartNoProductsMessage")) === null || _a === void 0 ? void 0 : _a.remove();
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
export function addProductToCart(product) {
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
function removeProductFromCart(event) {
    event.currentTarget.parentNode.remove();
    checkIfCartIsEmpty();
    howManyProductsInCart();
    calculateTotalPriceToPay();
}
export function toggleCart() {
    const cartPreview = document.querySelector(".nav__cartPreview");
    if (cartPreview.classList.contains("cart-active")) {
        cartPreview.classList.remove("cart-active");
        return;
    }
    cartPreview.classList.add("cart-active");
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
    return total;
}
function calculateTotalPriceToPay() {
    const totalPriceToPayParagraph = document.querySelector(".nav__cartTotalPriceToPay");
    const products = document.querySelectorAll(".nav__cartProduct");
    let total = 0;
    products.forEach((product) => {
        const price = product.querySelector(".nav__cartProductPrice");
        const amount = product.querySelector(".nav__cartProductAmount");
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
