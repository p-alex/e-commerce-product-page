import { toggleCart } from "./cart.js";

function navFunctionality() {
  const hamburger = document.querySelector(
    ".nav__mobileHamburgerBtn"
  ) as HTMLButtonElement;

  const mobileNavContainer = document.querySelector(
    ".nav__mobileLinks"
  ) as HTMLUListElement;

  const mobileCloseBtn = document.querySelector(
    ".nav__mobileLinksCloseBtn"
  ) as HTMLButtonElement;

  const mobileBackdrop = document.querySelector(
    ".nav__mobileBackdrop"
  ) as HTMLDivElement;

  const cartBtn = document.querySelector(
    ".nav__cartToggle"
  ) as HTMLButtonElement;

  cartBtn.addEventListener("click", toggleCart);

  // TOGGLE MOBILE NAV LINKS
  hamburger.addEventListener("click", (): void => {
    mobileNavContainer.style.display = "block";
    mobileCloseBtn.focus();
    mobileNavContainer.classList.add("mobileNav-active");
    mobileBackdrop.classList.add("mobileNav-active");
  });

  mobileCloseBtn.addEventListener("click", closeMobileNav);
  mobileBackdrop.addEventListener("click", closeMobileNav);

  function closeMobileNav(): void {
    hamburger.focus();
    mobileNavContainer.classList.remove("mobileNav-active");
    mobileBackdrop.classList.remove("mobileNav-active");
    setTimeout(() => {
      mobileNavContainer.style.display = "none";
    }, 300);
  }

  // FOCUS TRAP
  const topTrap = document.querySelector(
    ".nav__mobileLinksTopFocusTrap"
  ) as HTMLDivElement;

  const bottomTrap = document.querySelector(
    ".nav__mobileLinksBottomFocusTrap"
  ) as HTMLDivElement;

  const lastFocusableElement = document.querySelector(
    ".nav__lastFocusableElement"
  ) as HTMLAnchorElement;

  topTrap.addEventListener("focus", () => redirectFocus("bottom"));
  bottomTrap.addEventListener("focus", () => redirectFocus("top"));

  function redirectFocus(position: "top" | "bottom"): void {
    if (mobileNavContainer.classList.contains("mobileNav-active")) {
      if (position === "top") {
        mobileCloseBtn.focus();
        return;
      }
      lastFocusableElement.focus();
    } else {
      if (position === "top") {
        hamburger.focus();
      } else {
        cartBtn.focus();
      }
    }
  }
}

export { navFunctionality };
