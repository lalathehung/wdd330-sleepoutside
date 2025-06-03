import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

function initializeProductDetails() {
  const dataSource = new ProductData("tents");
  let productId = getParam("product");
  if (!productId) {
    const addToCartBtn = document.getElementById("addToCart");
    productId = addToCartBtn?.dataset.id;
    if (productId === "989CG") {
      productId = "985RF";
    }
  }

  if (!productId) {
    document.querySelector("main")?.insertAdjacentHTML("afterbegin", "<p>Product ID missing. Please select a valid product.</p>");
    return;
  }

  const product = new ProductDetails(productId, dataSource);
  product.init();
}

initializeProductDetails();