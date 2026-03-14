import { promises as fs } from "fs";
import path from "path";

export default class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  async #ensureFile() {
    try {
      await fs.access(this.path);
    } catch {
      await fs.mkdir(path.dirname(this.path), { recursive: true });
      await fs.writeFile(this.path, "[]", "utf-8");
    }
  }

  async #readFile() {
    await this.#ensureFile();
    const data = await fs.readFile(this.path, "utf-8");
    return JSON.parse(data || "[]");
  }

  async #writeFile(data) {
    await this.#ensureFile();
    await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8");
  }

  #generateId(products) {
    const maxId = products.reduce((max, p) => {
      const n = Number(p.id);
      return Number.isNaN(n) ? max : Math.max(max, n);
    }, 0);
    return String(maxId + 1);
  }

  async getProducts() {
    return await this.#readFile();
  }

  async getProductById(id) {
    const products = await this.#readFile();
    return products.find((p) => String(p.id) === String(id)) || null;
  }

  async addProduct(productData) {
    const required = [
      "title",
      "description",
      "code",
      "price",
      "status",
      "stock",
      "category",
      "thumbnails"
    ];

    for (const field of required) {
      if (productData[field] === undefined) {
        throw new Error(`Missing field: ${field}`);
      }
    }

    if (!Array.isArray(productData.thumbnails)) {
      throw new Error("thumbnails must be an array of strings");
    }

    const products = await this.#readFile();
    const codeExists = products.some((p) => p.code === productData.code);
    if (codeExists) {
      throw new Error("code must be unique");
    }

    const newProduct = {
      id: this.#generateId(products),
      title: productData.title,
      description: productData.description,
      code: productData.code,
      price: Number(productData.price),
      status: productData.status === "false" ? false : Boolean(productData.status),
      stock: Number(productData.stock),
      category: productData.category,
      thumbnails: productData.thumbnails
    };

    products.push(newProduct);
    await this.#writeFile(products);
    return newProduct;
  }

  async updateProduct(id, updates) {
    const products = await this.#readFile();
    const index = products.findIndex((p) => String(p.id) === String(id));
    if (index === -1) {
      return null;
    }

    const { id: _ignored, ...safeUpdates } = updates;
    const updated = { ...products[index], ...safeUpdates };

    if (safeUpdates.price !== undefined) updated.price = Number(safeUpdates.price);
    if (safeUpdates.stock !== undefined) updated.stock = Number(safeUpdates.stock);
    if (safeUpdates.status !== undefined) {
      updated.status = safeUpdates.status === "false" ? false : Boolean(safeUpdates.status);
    }

    products[index] = updated;
    await this.#writeFile(products);
    return updated;
  }

  async deleteProduct(id) {
    const products = await this.#readFile();
    const index = products.findIndex((p) => String(p.id) === String(id));
    if (index === -1) {
      return false;
    }

    products.splice(index, 1);
    await this.#writeFile(products);
    return true;
  }
}
