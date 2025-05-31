import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
let productId = getParam("product");
if (!productId) {
  const addToCartBtn = document.getElementById("addToCart");
  productId = addToCartBtn?.dataset.id;
  if (productId === "989CG") {
    console.warn("Warning: data-id='989CG' is incorrect for Talus 4-Person, using '985RF' instead");
    productId = "985RF"; 
  }
}
console.log("Product ID:", productId);

if (!productId) {
  console.error("Error: No product ID found");
  document.querySelector("main")?.insertAdjacentHTML("afterbegin", "<p>Product ID missing. Please select a valid product.</p>");
  return;
}

const product = new ProductDetails(productId, dataSource);
product.init();