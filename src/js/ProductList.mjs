import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Image.replace('../images', '/public/images')}" alt="${product.Name}">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    console.log("Product List:", list); // Check product list
    this.renderList(list);
  }

  renderList(list) {
    if (!this.listElement) {
      console.error("Error: listElement not found");
      return;
    }
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}