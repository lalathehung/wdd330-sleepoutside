import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const imageSrc = product.Image.startsWith('../images') 
    ? product.Image.replace('../images', '/images') 
    : product.Image;
  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${imageSrc}" alt="${product.Name}">
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
    console.log("Product List:", list);
    this.renderList(list);
  }

  renderList(list) {
    if (!this.listElement) {
      console.error("Error: listElement not found");
      return;
    }
    console.log("Rendering product list");
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}