const socket = io();

const productsContainer = document.getElementById("productsContainer");
const createProductForm = document.getElementById("createProductForm");
const deleteProductForm = document.getElementById("deleteProductForm");
const messageBox = document.getElementById("message");

function showMessage(text, ok = true) {
  messageBox.textContent = text;
  messageBox.className = ok ? "message success" : "message error";
  setTimeout(() => {
    messageBox.textContent = "";
    messageBox.className = "message";
  }, 2500);
}

function renderProducts(products) {
  if (!products.length) {
    productsContainer.innerHTML = "<p>No hay productos cargados todavía.</p>";
    return;
  }

  productsContainer.innerHTML = products.map((product) => `
    <article class="card">
      <h4>${product.title}</h4>
      <p><strong>ID:</strong> ${product.id}</p>
      <p><strong>Descripción:</strong> ${product.description}</p>
      <p><strong>Código:</strong> ${product.code}</p>
      <p><strong>Precio:</strong> $${product.price}</p>
      <p><strong>Stock:</strong> ${product.stock}</p>
      <p><strong>Categoría:</strong> ${product.category}</p>
      <p><strong>Status:</strong> ${product.status}</p>
    </article>
  `).join("");
}

socket.on("productsUpdated", (products) => {
  renderProducts(products);
});

socket.on("operationResult", (result) => {
  showMessage(result.message, result.success);
});

createProductForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(createProductForm);

  const product = {
    title: formData.get("title"),
    description: formData.get("description"),
    code: formData.get("code"),
    price: Number(formData.get("price")),
    status: formData.get("status") === "true",
    stock: Number(formData.get("stock")),
    category: formData.get("category"),
    thumbnails: formData.get("thumbnails")
      ? formData.get("thumbnails").split(",").map(item => item.trim()).filter(Boolean)
      : []
  };

  socket.emit("createProduct", product);
  createProductForm.reset();
});

deleteProductForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(deleteProductForm);
  const pid = formData.get("pid");

  socket.emit("deleteProduct", pid);
  deleteProductForm.reset();
});
