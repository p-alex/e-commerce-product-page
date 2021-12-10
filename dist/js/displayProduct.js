var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// fetching product
function getProduct() {
    return __awaiter(this, void 0, void 0, function () {
        var response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("../dist/data.json")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    return [2 /*return*/, json];
            }
        });
    });
}
function appendImagesContainer(name, images) {
    var grid = document.querySelector(".product__imagesGridContainer");
    // Appending full image
    var fullImage = document.createElement("img");
    fullImage.width = 450;
    fullImage.height = 450;
    fullImage.src = "../dist/images/" + images[0].fullImage;
    fullImage.classList.add("product__fullImage");
    grid.appendChild(fullImage);
    // Appending the thumbnails
    function appendThumbnails() {
        images.forEach(function (image, id) {
            var thumbnailBtn = document.createElement("button");
            thumbnailBtn.setAttribute("aria-label", name + " thumbnail " + id);
            thumbnailBtn.classList.add("product__thumbnailBtn");
            var thumbnail = document.createElement("img");
            thumbnail.src = "../dist/images/" + image.thumbnail;
            thumbnail.width = 90;
            thumbnail.height = 90;
            thumbnail.classList.add("product__thumbnail");
            if (id === 0) {
                thumbnailBtn.classList.add("active-thumbnail");
            }
            thumbnailBtn.addEventListener("click", function () { return displayNewFullImage(id); });
            thumbnailBtn.appendChild(thumbnail);
            grid.appendChild(thumbnailBtn);
        });
    }
    appendThumbnails();
    function displayNewFullImage(id) {
        var thumbnailBtns = document.querySelectorAll(".product__thumbnailBtn");
        fullImage.src = "../dist/images/" + images[id].fullImage;
        thumbnailBtns.forEach(function (btn, index) {
            if (btn.classList.contains("active-thumbnail")) {
                btn.classList.remove("active-thumbnail");
            }
            if (index === id) {
                btn.classList.add("active-thumbnail");
            }
        });
    }
}
function appendDetailsContainer(details) {
    var companyParagraph = document.querySelector(".product__company");
    companyParagraph.innerText = details.company;
    var nameHeading = document.querySelector(".product__name");
    nameHeading.innerText = details.name;
    var descriptionParagraph = document.querySelector(".product__description");
    descriptionParagraph.innerText = details.description;
    var priceParagraph = document.querySelector(".product__price");
    if (details.discount > 0) {
        // Calculating discount
        priceParagraph.innerText = "$" + (details.price - (details.discount / 100) * details.price);
        var discount = document.querySelector(".product__discount");
        discount.innerText = details.discount + "%";
        var oldPrice = document.querySelector(".product__oldPrice");
        oldPrice.innerText = "$" + details.price;
    }
    else {
        priceParagraph.innerText = "$" + details.price;
    }
}
function displayProduct() {
    return __awaiter(this, void 0, void 0, function () {
        var productData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getProduct()];
                case 1:
                    productData = _a.sent();
                    if (productData) {
                        appendImagesContainer(productData.name, productData.images);
                        appendDetailsContainer(productData);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
displayProduct();
