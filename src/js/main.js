import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
if (!element) {
  console.error("Error: .product-list element not found in main page");
} else {
  console.log("Product list element found, initializing ProductList");
  const productList = new ProductList("tents", dataSource, element);
  productList.init();
}