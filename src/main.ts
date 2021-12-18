import { insertProductDetails } from "./insertProductDetails.js";
import { insertImageSlider } from "./insertImageSlider.js";
import { navFunctionality } from "./nav.js";
import { amountCounter } from "./amountCounter.js";
import { cartMain } from "./cart.js";
//interfaces
import { detailsInterface } from "./interfaces/index";

// fetching data about the product
async function getProduct() {
  const response = await fetch("data.json");
  return await response.json();
}

async function main() {
  let {
    company,
    name,
    description,
    price,
    discount,
    images,
  }: detailsInterface = await getProduct();

  navFunctionality();
  cartMain();
  insertImageSlider(name, images);
  insertProductDetails({ company, name, description, price, discount, images });
  amountCounter();
}

main();
