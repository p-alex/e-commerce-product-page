var hamburger = document.querySelector(".nav__hamburger");
var navContainer = document.querySelector(".nav__links");
var closeBtn = document.querySelector(".nav__close");
var mobileBackdrop = document.querySelector(".nav__links__mobile__backdrop");
hamburger.addEventListener("click", function () {
    navContainer.classList.add("nav-active");
    mobileBackdrop.classList.add("nav-active");
});
function closeMobileNav() {
    navContainer.classList.remove("nav-active");
    mobileBackdrop.classList.remove("nav-active");
}
closeBtn.addEventListener("click", function () { return closeMobileNav(); });
mobileBackdrop.addEventListener("click", function () { return closeMobileNav(); });
