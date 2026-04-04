import { Cart } from "../models/Cart.model.js";
import { Product } from "../models/Product.model.js";

export default class CartManager {
  constructor() {}

  async createCart() {
    const newCart = await Cart.create({ products: [] });
    return newCart;
  }

  async getCartById(cid) {
    return await Cart.findById(cid).populate("products.product").lean();
  }

  async addProductToCart(cid, pid) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;

    const productExists = await Product.findById(pid);
    if (!productExists) return false;

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === pid,
    );

    if (productIndex === -1) {
      cart.products.push({ product: pid, quantity: 1 });
    } else {
      cart.products[productIndex].quantity += 1;
    }

    await cart.save();
    return await Cart.findById(cid).populate("products.product").lean();
  }

  async deleteProductFromCart(cid, pid) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;

    const initialLength = cart.products.length;

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== pid,
    );

    if (cart.products.length === initialLength) {
      return false;
    }

    await cart.save();
    return await Cart.findById(cid).populate("products.product").lean();
  }

  async updateCart(cid, products) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;

    for (const item of products) {
      const productExists = await Product.findById(item.product);
      if (!productExists) {
        throw new Error(`Product not found: ${item.product}`);
      }
    }

    cart.products = products.map((item) => ({
      product: item.product,
      quantity: Number(item.quantity),
    }));

    await cart.save();
    return await Cart.findById(cid).populate("products.product").lean();
  }

  async updateProductQuantity(cid, pid, quantity) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === pid,
    );

    if (productIndex === -1) return false;

    cart.products[productIndex].quantity = Number(quantity);

    await cart.save();
    return await Cart.findById(cid).populate("products.product").lean();
  }

  async clearCart(cid) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;

    cart.products = [];
    await cart.save();

    return await Cart.findById(cid).populate("products.product").lean();
  }
}
