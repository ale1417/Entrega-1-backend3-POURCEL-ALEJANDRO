import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import path from "path";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./managers/ProductManager.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const PORT = 8080;

const productManager = new ProductManager(path.resolve("src/data/products.json"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve("src/views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("src/public")));

app.set("io", io);
app.set("productManager", productManager);

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

io.on("connection", async (socket) => {
  const products = await productManager.getProducts();
  socket.emit("productsUpdated", products);

  socket.on("createProduct", async (productData) => {
    try {
      await productManager.addProduct(productData);
      const updatedProducts = await productManager.getProducts();
      io.emit("productsUpdated", updatedProducts);
      socket.emit("operationResult", {
        success: true,
        message: "Producto creado correctamente"
      });
    } catch (error) {
      socket.emit("operationResult", {
        success: false,
        message: error.message
      });
    }
  });

  socket.on("deleteProduct", async (pid) => {
    try {
      const deleted = await productManager.deleteProduct(pid);
      if (!deleted) {
        socket.emit("operationResult", {
          success: false,
          message: "Product not found"
        });
        return;
      }

      const updatedProducts = await productManager.getProducts();
      io.emit("productsUpdated", updatedProducts);
      socket.emit("operationResult", {
        success: true,
        message: "Producto eliminado correctamente"
      });
    } catch (error) {
      socket.emit("operationResult", {
        success: false,
        message: error.message
      });
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
