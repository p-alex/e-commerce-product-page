const hamburger = document.querySelector(
  ".nav__hamburger"
) as HTMLButtonElement;
const navContainer = document.querySelector(".nav__links") as HTMLUListElement;
const closeBtn = document.querySelector(".nav__close") as HTMLButtonElement;
const mobileBackdrop = document.querySelector(
  ".nav__links__mobile__backdrop"
) as HTMLDivElement;

hamburger.addEventListener("click", (): void => {
  navContainer.classList.add("nav-active");
  mobileBackdrop.classList.add("nav-active");
});

function closeMobileNav(): void {
  navContainer.classList.remove("nav-active");
  mobileBackdrop.classList.remove("nav-active");
}

closeBtn.addEventListener("click", (): void => closeMobileNav());

mobileBackdrop.addEventListener("click", (): void => closeMobileNav());
