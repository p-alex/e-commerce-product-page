var hamburger = document.querySelector(".nav__hamburger");
var navContainer = document.querySelector(".nav__links");
var closeBtn = document.querySelector(".nav__close");
hamburger.addEventListener("click", function () {
    navContainer.classList.add("nav-active");
});
closeBtn.addEventListener("click", function () {
    navContainer.classList.remove("nav-active");
});
