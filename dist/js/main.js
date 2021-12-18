var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { insertProductDetails } from "./insertProductDetails.js";
import { insertImageSlider } from "./insertImageSlider.js";
import { navFunctionality } from "./nav.js";
import { amountCounter } from "./amountCounter.js";
import { cartMain } from "./cart.js";
// fetching data about the product
function getProduct() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("data.json");
        return yield response.json();
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let { company, name, description, price, discount, images, } = yield getProduct();
        navFunctionality();
        cartMain();
        insertImageSlider(name, images);
        insertProductDetails({ company, name, description, price, discount, images });
        amountCounter();
    });
}
main();
