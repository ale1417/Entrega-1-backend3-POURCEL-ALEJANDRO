import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const productManager = req.app.get("productManager");
    const products = await productManager.getAllProductsRaw();

    res.render("home", {
      title: "Home",
      products,
    });
  } catch (error) {
    console.error("ERROR EN / :", error);
    res.status(500).send("Error al renderizar la vista home");
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    const productManager = req.app.get("productManager");
    const products = [];

    res.render("realTimeProducts", {
      title: "Real Time Products",
      products,
    });
  } catch (error) {
    console.error("ERROR EN /realtimeproducts :", error);
    res.status(500).send("Error al renderizar la vista realtimeproducts");
  }
});

router.get("/products", async (req, res) => {
  try {
    const productManager = req.app.get("productManager");
    const result = await productManager.getProducts(req.query);

    res.render("products", {
      title: "Productos",
      payload: result.payload,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.prevLink ? `/products${result.prevLink}` : null,
      nextLink: result.nextLink ? `/products${result.nextLink}` : null,
    });
  } catch (error) {
    console.error("ERROR EN /products :", error);
    res.status(500).send("Error al renderizar la vista products");
  }
});

router.get("/products/:pid", async (req, res) => {
  try {
    const productManager = req.app.get("productManager");
    const product = await productManager.getProductById(req.params.pid);

    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }

    res.render("productDetail", {
      title: "Detalle del producto",
      product,
    });
  } catch (error) {
    console.error("ERROR EN /products/:pid :", error);
    res.status(500).send("Error al renderizar el detalle del producto");
  }
});

router.get("/carts/:cid", async (req, res) => {
  try {
    const cartManager = req.app.get("cartManager");
    const cart = await cartManager.getCartById(req.params.cid);

    if (!cart) {
      return res.status(404).send("Carrito no encontrado");
    }

    res.render("cartDetail", {
      title: "Detalle del carrito",
      cart,
    });
  } catch (error) {
    console.error("ERROR EN /carts/:cid :", error);
    res.status(500).send("Error al renderizar el carrito");
  }
});

export default router;
