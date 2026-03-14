# 🚀 Programación Backend I - Entrega 2

**Alumno:** Alejandro Pourcel

Proyecto desarrollado para la **Entrega 2 del curso Programación Backend I (Coderhouse)**.

Este proyecto implementa una **API de productos y carritos** usando **Node.js y Express**, con persistencia en archivos JSON.
Además, incorpora **Handlebars como motor de plantillas** y **Socket.IO** para actualizar productos **en tiempo real** desde el navegador.

---

# 📦 Tecnologías utilizadas

- **Node.js**
- **Express**
- **Express Handlebars**
- **Socket.IO**
- **FileSystem (fs)** para persistencia en JSON
- **HTML / CSS**
- **JavaScript**

---

# 📁 Estructura del proyecto

```
src/
 ├ data
 │   ├ products.json
 │   └ carts.json
 │
 ├ managers
 │   ├ ProductManager.js
 │   └ CartManager.js
 │
 ├ routes
 │   ├ products.router.js
 │   ├ carts.router.js
 │   └ views.router.js
 │
 ├ public
 │   ├ css
 │   │   └ styles.css
 │   └ js
 │       └ realtime.js
 │
 ├ views
 │   ├ layouts
 │   │   └ main.handlebars
 │   │
 │   ├ home.handlebars
 │   └ realTimeProducts.handlebars
 │
 └ app.js

package.json
README.md
.gitignore
```

---

# ⚙️ Instalación

1️⃣ Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/TU_REPO.git
```

2️⃣ Entrar en la carpeta del proyecto

```bash
cd TU_REPO
```

3️⃣ Instalar dependencias

```bash
npm install
```

---

# ▶️ Ejecución del proyecto

Para iniciar el servidor:

```bash
npm run dev
```

El servidor se ejecutará en:

```
http://localhost:8080
```

---

# 🌐 Vistas del proyecto

## Home

```
GET /
```

Muestra el listado de productos renderizados con **Handlebars**.

---

## Productos en tiempo real

```
GET /realtimeproducts
```

Permite:

- Crear productos desde un formulario
- Eliminar productos por ID
- Ver actualizaciones **en tiempo real con WebSocket**

Si abrís **dos pestañas**, los cambios se reflejan automáticamente.

---

# 📡 API REST

## Productos

### Obtener todos los productos

```
GET /api/products
```

---

### Obtener producto por ID

```
GET /api/products/:pid
```

---

### Crear producto

```
POST /api/products
```

Ejemplo de body:

```json
{
  "title": "Cerveza",
  "description": "Alcohol",
  "code": "quilmes-1",
  "price": 2500,
  "status": true,
  "stock": 15,
  "category": "cerveza",
  "thumbnails": ["img/quilmes.png"]
}
```

---

### Actualizar producto

```
PUT /api/products/:pid
```

---

### Eliminar producto

```
DELETE /api/products/:pid
```

---

# 🛒 API de Carritos

### Crear carrito

```
POST /api/carts
```

---

### Obtener carrito por ID

```
GET /api/carts/:cid
```

---

### Agregar producto a carrito

```
POST /api/carts/:cid/product/:pid
```

---

# ⚡ WebSocket (Socket.IO)

El sistema utiliza **Socket.IO** para mantener actualizada la vista de productos.

Eventos utilizados:

| Evento            | Descripción                         |
| ----------------- | ----------------------------------- |
| `createProduct`   | Crear producto desde el formulario  |
| `deleteProduct`   | Eliminar producto                   |
| `productsUpdated` | Actualiza el listado en tiempo real |

---

# 🧪 Cómo probar el sistema

1️⃣ Iniciar el servidor

```
npm run dev
```

2️⃣ Abrir en el navegador

```
http://localhost:8080/realtimeproducts
```

3️⃣ Abrir **dos pestañas**

4️⃣ Crear o eliminar un producto

✔ Ambas pestañas se actualizarán automáticamente.

---

# 👨‍💻 Autor

**Alejandro Pourcel**

Proyecto realizado para **Coderhouse - Programación Backend I**
