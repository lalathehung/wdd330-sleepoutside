import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

function initializeProductList() {
  const dataSource = new ProductData("tents");
  const element = document.querySelector(".product-list");
  if (!element) {
    return;
  }
  const productList = new ProductList("tents", dataSource, element);
  productList.init();
}

initializeProductList();