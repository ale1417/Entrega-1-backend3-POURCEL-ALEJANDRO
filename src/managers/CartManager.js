import { promises as fs } from "fs";
import path from "path";

export default class CartManager {
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

  #generateId(carts) {
    const maxId = carts.reduce((max, c) => {
      const n = Number(c.id);
      return Number.isNaN(n) ? max : Math.max(max, n);
    }, 0);
    return String(maxId + 1);
  }

  async createCart() {
    const carts = await this.#readFile();
    const newCart = { id: this.#generateId(carts), products: [] };
    carts.push(newCart);
    await this.#writeFile(carts);
    return newCart;
  }

  async getCartById(cid) {
    const carts = await this.#readFile();
    return carts.find((c) => String(c.id) === String(cid)) || null;
  }

  async addProductToCart(cid, pid) {
    const carts = await this.#readFile();
    const cartIndex = carts.findIndex((c) => String(c.id) === String(cid));
    if (cartIndex === -1) {
      return null;
    }

    const cart = carts[cartIndex];
    const prodIndex = cart.products.findIndex((p) => String(p.product) === String(pid));

    if (prodIndex === -1) {
      cart.products.push({ product: String(pid), quantity: 1 });
    } else {
      cart.products[prodIndex].quantity += 1;
    }

    carts[cartIndex] = cart;
    await this.#writeFile(carts);
    return cart;
  }
}
