var hamburger = document.querySelector(".mobileNav__hamburger");
var navContainer = document.querySelector(".mobileNav__links");
var closeBtn = document.querySelector(".mobileNav__close");
var mobileBackdrop = document.querySelector(".mobileNav__backdrop");
var cartBtn = document.querySelector(".mobileNav__cart");
// TOGGLE MOBILE NAV
hamburger.addEventListener("click", function () {
    navContainer.style.display = "block";
    closeBtn.focus();
    navContainer.classList.add("mobileNav-active");
    mobileBackdrop.classList.add("mobileNav-active");
});
function closeMobileNav() {
    hamburger.focus();
    navContainer.classList.remove("mobileNav-active");
    mobileBackdrop.classList.remove("mobileNav-active");
    setTimeout(function () {
        navContainer.style.display = "none";
    }, 300);
}
closeBtn.addEventListener("click", function () { return closeMobileNav(); });
mobileBackdrop.addEventListener("click", function () { return closeMobileNav(); });
// FOCUS TRAP
var lastFocusableElement = document.querySelector(".mobileNav __lastFocusableElement");
function redirectFocus(position) {
    if (navContainer.classList.contains("mobileNav-active")) {
        if (position === "top") {
            closeBtn.focus();
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
