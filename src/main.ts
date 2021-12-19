import { insertProductDetails } from "./insertProductDetails.js";
import { insertImageSlider } from "./insertImageSlider.js";
import { navFunctionality } from "./nav.js";
import { amountCounter } from "./amountCounter.js";
//interfaces
import { detailsInterface } from "./interfaces/index";
import { checkIfCartIsEmpty } from "./cart.js";

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
  checkIfCartIsEmpty();
  insertImageSlider(name, images);
  insertProductDetails({ company, name, description, price, discount, images });
  amountCounter();
}

main();
