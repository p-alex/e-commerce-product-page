const productList = document.querySelector(".nav__cartProductsList");
export function cartMain() {
    checkIfCartIsEmpty();
}
function checkIfCartIsEmpty() {
    var _a;
    const products = document.querySelectorAll(".nav__cartProduct");
    if (products.length === 0) {
        const noProductsMessage = document.createElement("p");
        noProductsMessage.classList.add("nav__cartNoProductsMessage");
        noProductsMessage.innerText = "Your cart is empty";
        productList.appendChild(noProductsMessage);
    }
    else {
        (_a = productList === null || productList === void 0 ? void 0 : productList.querySelector(".nav__cartNoProductsMessage")) === null || _a === void 0 ? void 0 : _a.remove();
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
    <p class="nav__cartProductPrice">
      <span class="nav__cartProductPrice">$${price}</span> x
      <span class="nav__cartProductAmount">${amount}</span>
      <span class="nav__cartProductTotalPrice">$${price * amount}</span>
    </p>
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
}
function removeProductFromCart(event) {
    event.currentTarget.parentNode.remove();
    checkIfCartIsEmpty();
    howManyProductsInCart();
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
