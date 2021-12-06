const hamburger = document.querySelector(
  ".nav__hamburger"
) as HTMLButtonElement;
const navContainer = document.querySelector(".nav__links") as HTMLUListElement;
const closeBtn = document.querySelector(".nav__close") as HTMLButtonElement;

hamburger.addEventListener("click", (): void => {
  navContainer.classList.add("nav-active");
});

closeBtn.addEventListener("click", (): void => {
  navContainer.classList.remove("nav-active");
});
