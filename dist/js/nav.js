import { toggleCart } from "./cart.js";
export const cartBtn = document.querySelector(".nav__cartToggle");
function navFunctionality() {
    const hamburger = document.querySelector(".nav__mobileHamburgerBtn");
    const mobileNavContainer = document.querySelector(".nav__mobileLinks");
    const mobileCloseBtn = document.querySelector(".nav__mobileLinksCloseBtn");
    const mobileBackdrop = document.querySelector(".nav__mobileBackdrop");
    cartBtn.addEventListener("click", toggleCart);
    // TOGGLE MOBILE NAV LINKS
    hamburger.addEventListener("click", () => {
        mobileCloseBtn.focus();
        mobileNavContainer.classList.add("mobileNav-active");
        mobileBackdrop.classList.add("mobileNav-active");
    });
    mobileCloseBtn.addEventListener("click", closeMobileNav);
    mobileBackdrop.addEventListener("click", closeMobileNav);
    function closeMobileNav() {
        hamburger.focus();
        mobileNavContainer.classList.remove("mobileNav-active");
        mobileBackdrop.classList.remove("mobileNav-active");
    }
    // FOCUS TRAP
    const topTrap = document.querySelector(".nav__mobileLinksTopFocusTrap");
    const bottomTrap = document.querySelector(".nav__mobileLinksBottomFocusTrap");
    const lastFocusableElement = document.querySelector(".nav__lastFocusableElement");
    topTrap.addEventListener("focus", () => redirectFocus("bottom"));
    bottomTrap.addEventListener("focus", () => redirectFocus("top"));
    function redirectFocus(position) {
        if (mobileNavContainer.classList.contains("mobileNav-active")) {
            if (position === "top") {
                mobileCloseBtn.focus();
                return;
            }
            lastFocusableElement.focus();
        }
        else {
            if (position === "top") {
                hamburger.focus();
            }
            else {
                cartBtn.focus();
            }
        }
    }
}
export { navFunctionality };
