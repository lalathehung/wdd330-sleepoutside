function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `/public/json/${this.category}.json`; 
  }

  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => {
        console.log("Fetched Data:", data); // Check json data
        return data;
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        return [];
      });
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => String(item.Id) === String(id));
  }
}