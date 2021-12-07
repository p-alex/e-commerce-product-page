const hamburger = document.querySelector(
  ".mobileNav__hamburger"
) as HTMLButtonElement;
const navContainer = document.querySelector(
  ".mobileNav__links"
) as HTMLUListElement;
const closeBtn = document.querySelector(
  ".mobileNav__close"
) as HTMLButtonElement;
const mobileBackdrop = document.querySelector(
  ".mobileNav__backdrop"
) as HTMLDivElement;
const cartBtn = document.querySelector(".mobileNav__cart") as HTMLButtonElement;

hamburger.addEventListener("click", (): void => {
  closeBtn.focus();
  navContainer.style.display = "block";
  navContainer.classList.add("mobileNav-active");
  mobileBackdrop.classList.add("mobileNav-active");
});

function closeMobileNav(): void {
  hamburger.focus();
  navContainer.classList.remove("mobileNav-active");
  mobileBackdrop.classList.remove("mobileNav-active");
  setTimeout(() => {
    navContainer.style.display = "none";
  }, 300);
}

closeBtn.addEventListener("click", (): void => closeMobileNav());

mobileBackdrop.addEventListener("click", (): void => closeMobileNav());

// FOCUS TRAP
const lastFocusableElement = document.querySelector(
  ".mobileNav__links__lastFocusableElement"
) as HTMLAnchorElement;
function redirectFocus(position: "top" | "bottom"): void {
  if (navContainer.classList.contains("mobileNav-active")) {
    if (position === "top") {
      closeBtn.focus();
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
