import { Router } from "express";
import path from "path";
import CartManager from "../managers/CartManager.js";
import ProductManager from "../managers/ProductManager.js";

const router = Router();

const cartManager = new CartManager(path.resolve("src/data/carts.json"));
const productManager = new ProductManager(path.resolve("src/data/products.json"));

router.post("/", async (req, res) => {
  try {
    const cart = await cartManager.createCart();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ error: "Internal error", detail: err.message });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.cid);
    if (!cart) return res.status(404).json({ error: "Cart not found" });
    res.json(cart.products);
  } catch (err) {
    res.status(500).json({ error: "Internal error", detail: err.message });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const prod = await productManager.getProductById(req.params.pid);
    if (!prod) return res.status(404).json({ error: "Product not found" });

    const cart = await cartManager.addProductToCart(req.params.cid, req.params.pid);
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Internal error", detail: err.message });
  }
});

export default router;
