import { getLocalStorage } from "./utils.mjs";

export function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productList = document.querySelector(".product-list");
  if (!productList) {
    return;
  }
  if (cartItems.length === 0 || !Array.isArray(cartItems)) {
    productList.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }
  const htmlItems = cartItems
    .filter(item => item && item.Id && item.Name && item.Image && item.FinalPrice)
    .map(item => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const imageSrc = item.Image.startsWith("../images")
    ? item.Image.replace("../images", "/images")
    : item.Image;
  const newItem = `<li class="cart-card divider">
    <a href="/product_pages/?product=${item.Id}" class="cart-card__image">
      <img src="${imageSrc}" alt="${item.Name}" />
    </a>
    <a href="/product_pages/?product=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors && item.Colors[0]?.ColorName || "Unknown"}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">  $${item.FinalPrice}</p>
  </li>`;
  return newItem;
}

document.addEventListener("DOMContentLoaded", () => {
  renderCartContents();
});