// Cart toggles
const cartToggle = document.querySelector(".nav__cart") as HTMLButtonElement;
const mobileCartToggle = document.querySelector(
  ".mobileNav__cart"
) as HTMLButtonElement;

// Nav cart preview divs for desktop and mobile nav
const navCartPreview = document.querySelector(
  ".nav__cart__preview"
) as HTMLDivElement;

const mobileNavCartPreview = document.querySelector(
  ".mobileNav__cart__preview"
) as HTMLDivElement;

// Adding html to desktop and mobile nav
navCartPreview.innerHTML = `
    <p class="nav__cart__preview__title">Cart</p>
    <ul class="nav__cart__preview__list"></ul>
`;
mobileNavCartPreview.innerHTML = `
    <p class="mobileNav__cart__preview__title">Cart</p>
    <ul class="mobileNav__cart__preview__list"></ul>
`;

// Cart lists for desktop and mobile cart previews
const navCartList = document.querySelector(
  ".nav__cart__preview__list"
) as HTMLUListElement;
const mobileNavCartList = document.querySelector(
  ".mobileNav__cart__preview__list"
) as HTMLUListElement;

//Toggle cart preview for desktop and mobile
interface toggleCartOptions {
  element: HTMLDivElement;
  type: "desktop" | "mobile";
}
function toggleCart(options: toggleCartOptions): void {
  const { element, type } = options;
  if (element.classList.contains(`${type}-cart-preview-active`)) {
    element.classList.remove(`${type}-cart-preview-active`);
    return;
  }
  element.classList.add(`${type}-cart-preview-active`);
}
cartToggle.addEventListener("click", () =>
  toggleCart({ element: navCartPreview, type: "desktop" })
);
mobileCartToggle.addEventListener("click", () =>
  toggleCart({ element: mobileNavCartPreview, type: "mobile" })
);

//Checking if there are any products in the cart
interface checkForProductsInterface {
  element: HTMLUListElement;
  type: "nav" | "mobileNav";
}
function checkForProducts(options: checkForProductsInterface): void {
  const { element, type } = options;
  let totalProductsInCart = navCartList.querySelectorAll(
    ".nav__cart__preview__list__product"
  ).length;
  let noProductsMessage: HTMLParagraphElement;
  if (totalProductsInCart === 0) {
    appendNoProductsPragraph(element, type);
  } else {
    navCartList.removeChild(noProductsMessage);
    mobileNavCartList.removeChild(noProductsMessage);
  }
  function appendNoProductsPragraph(element: HTMLUListElement, type: string) {
    noProductsMessage = document.createElement("p") as HTMLParagraphElement;
    noProductsMessage.innerText = "No products in cart";
    noProductsMessage.classList.add(`${type}__cart__preview__noProducts`);
    element.appendChild(noProductsMessage);
  }
}

checkForProducts({ element: navCartList, type: "nav" });
checkForProducts({ element: mobileNavCartList, type: "mobileNav" });

function addProductToCart(): void {}
function removeProductFromCart(): void {}
