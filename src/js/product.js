import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
let productId = getParam("product");

if (!productId) {
  const addToCartBtn = document.getElementById("addToCart");
  productId = addToCartBtn?.dataset.id;
}
console.log("Product ID:", productId); // Check product id

if (!productId) {
  console.error("Error: No product ID found");
  document.querySelector("main")?.insertAdjacentHTML("afterbegin", "<p>Product ID missing.</p>");
  return;
}

const product = new ProductDetails(productId, dataSource);
product.init();