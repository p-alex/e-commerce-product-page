// Cart toggles
var cartToggle = document.querySelector(".nav__cart");
var mobileCartToggle = document.querySelector(".mobileNav__cart");
// Nav cart preview divs for desktop and mobile nav
var navCartPreview = document.querySelector(".nav__cartPreview");
var mobileNavCartPreview = document.querySelector(".mobileNav__cartPreview");
// Adding html to desktop and mobile nav
navCartPreview.innerHTML = "\n    <p class=\"nav__cartPreviewTitle\">Cart</p>\n    <ul class=\"nav__cartPreviewList\"></ul>\n";
mobileNavCartPreview.innerHTML = "\n    <p class=\"mobileNav__cartPreviewTitle\">Cart</p>\n    <ul class=\"mobileNav__cartPreviewList\"></ul>\n";
// Cart lists for desktop and mobile cart previews
var navCartList = document.querySelector(".nav__cartPreviewList");
var mobileNavCartList = document.querySelector(".mobileNav__cartPreviewList");
function toggleCart(options) {
    var element = options.element, type = options.type;
    if (element.classList.contains(type + "-cart-preview-active")) {
        element.classList.remove(type + "-cart-preview-active");
        return;
    }
    element.classList.add(type + "-cart-preview-active");
}
cartToggle.addEventListener("click", function () {
    return toggleCart({ element: navCartPreview, type: "desktop" });
});
mobileCartToggle.addEventListener("click", function () {
    return toggleCart({ element: mobileNavCartPreview, type: "mobile" });
});
function checkForProducts(options) {
    var element = options.element, type = options.type;
    var totalProductsInCart = navCartList.querySelectorAll(".nav__cart__preview__list__product").length;
    var noProductsMessage;
    if (totalProductsInCart === 0) {
        appendNoProductsPragraph(element, type);
    }
    else {
        navCartList.removeChild(noProductsMessage);
        mobileNavCartList.removeChild(noProductsMessage);
    }
    function appendNoProductsPragraph(element, type) {
        noProductsMessage = document.createElement("p");
        noProductsMessage.innerText = "No products in cart";
        noProductsMessage.classList.add(type + "__cartPreviewNoProducts");
        element.appendChild(noProductsMessage);
    }
}
checkForProducts({ element: navCartList, type: "nav" });
checkForProducts({ element: mobileNavCartList, type: "mobileNav" });
function addProductToCart() { }
function removeProductFromCart() { }
