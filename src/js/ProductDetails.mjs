import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { renderCartContents } from "./cart.js";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    console.log(`Initializing ProductDetails for ID: ${this.productId}`);
    this.product = await this.dataSource.findProductById(this.productId);
    console.log("Product Details:", this.product);
    if (!this.product) {
      console.error("Error: Product not found for ID:", this.productId);
      document.querySelector("main")?.insertAdjacentHTML("afterbegin", "<p>Product not found.</p>");
      return;
    }
    this.renderProductDetails();
    const addToCartBtn = document.getElementById("addToCart");
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", this.addProductToCart.bind(this));
      console.log("Add to Cart button event listener added");
    } else {
      console.error("Error: #addToCart button not found");
    }
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    console.log("Before adding to cart:", cartItems);
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    console.log("After adding to cart:", cartItems);
    renderCartContents();
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  const h2 = document.querySelector(".product-detail h2.divider");
  const h3 = document.querySelector(".product-detail h3");
  const productImage = document.querySelector(".product-detail img.divider");
  const productPrice = document.querySelector(".product-card__price");
  const productColor = document.querySelector(".product__color");
  const productDesc = document.querySelector(".product__description");
  const addToCartBtn = document.getElementById("addToCart");

  if (h2) h2.textContent = product.NameWithoutBrand;
  if (h3) h3.textContent = product.Brand.Name;
  if (productImage) {
    const imageSrc = product.Image.startsWith('../images') 
      ? product.Image.replace('../images', '/images') 
      : product.Image;
    productImage.src = imageSrc;
    productImage.alt = product.NameWithoutBrand;
  }
  if (productPrice) productPrice.textContent = `$${product.FinalPrice}`;
  if (productColor) productColor.textContent = product.Colors[0].ColorName;
  if (productDesc) productDesc.innerHTML = product.DescriptionHtmlSimple;
  if (addToCartBtn && product.Id) addToCartBtn.dataset.id = product.Id;

  [h2, h3, productImage, productPrice, productColor, productDesc, addToCartBtn].forEach((el, index) => {
    if (!el) console.error(`Error: Element at index ${index} not found`);
  });
}