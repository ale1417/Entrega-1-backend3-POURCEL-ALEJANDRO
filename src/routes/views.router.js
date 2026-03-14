import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const productManager = req.app.get("productManager");
    const products = await productManager.getProducts();
    res.render("home", { title: "Home", products });
  } catch (error) {
    res.status(500).send("Error al renderizar la vista home");
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    const productManager = req.app.get("productManager");
    const products = await productManager.getProducts();
    res.render("realTimeProducts", { title: "Real Time Products", products });
  } catch (error) {
    res.status(500).send("Error al renderizar la vista realtimeproducts");
  }
});

export default router;
