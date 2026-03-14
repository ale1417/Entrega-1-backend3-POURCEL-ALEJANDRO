import { Router } from "express";
import path from "path";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const manager = new ProductManager(path.resolve("src/data/products.json"));

router.get("/", async (req, res) => {
  try {
    const products = await manager.getProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Internal error", detail: err.message });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const product = await manager.getProductById(req.params.pid);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Internal error", detail: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const created = await manager.addProduct(req.body);

    const io = req.app.get("io");
    const updatedProducts = await manager.getProducts();
    io.emit("productsUpdated", updatedProducts);

    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: "Bad request", detail: err.message });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const updated = await manager.updateProduct(req.params.pid, req.body);
    if (!updated) return res.status(404).json({ error: "Product not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Bad request", detail: err.message });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const ok = await manager.deleteProduct(req.params.pid);
    if (!ok) return res.status(404).json({ error: "Product not found" });

    const io = req.app.get("io");
    const updatedProducts = await manager.getProducts();
    io.emit("productsUpdated", updatedProducts);

    res.json({ status: "deleted" });
  } catch (err) {
    res.status(500).json({ error: "Internal error", detail: err.message });
  }
});

export default router;
