# 🚀 Proyecto Final - Programación Backend I

## 🧑‍💻 Autor: Alejandro Pourcel

---

## 📌 Descripción del Proyecto

Este proyecto consiste en el desarrollo de un servidor backend completo utilizando **Node.js, Express y MongoDB**, donde se implementa una API RESTful para la gestión de **productos y carritos de compra**.

Se incluyen funcionalidades avanzadas como:

- Persistencia en MongoDB Atlas
- Paginación, filtros y ordenamiento de productos
- Manejo completo de carritos con referencias a productos
- Renderizado de vistas dinámicas con Handlebars
- Actualización en tiempo real mediante WebSockets

---

## 🛠️ Tecnologías utilizadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Handlebars
- Socket.io
- JavaScript (ES Modules)

---

## 📁 Estructura del Proyecto

```
src/
│
├── managers/        → Lógica de negocio (ProductManager, CartManager)
├── models/          → Modelos de MongoDB (Product, Cart)
├── routes/          → Rutas API y vistas
├── views/           → Vistas con Handlebars
├── public/          → Archivos estáticos (CSS)
├── app.js           → Configuración principal del servidor
```

---

## ⚙️ Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/ale1417/Programaci-n-Backend-I---Entrega-2.git
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
MONGO_URL=mongodb+srv://alepourcel:German1744_@ale.u4bwbud.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=ale
```

---

### 4. Ejecutar el servidor

```bash
npm run dev
```

Servidor disponible en:

```
http://localhost:8080
```

---

## 📦 Endpoints principales

### 🟢 Productos

| Método | Endpoint             | Descripción                     |
| ------ | -------------------- | ------------------------------- |
| GET    | `/api/products`      | Listar productos con paginación |
| GET    | `/api/products/:pid` | Obtener producto por ID         |
| POST   | `/api/products`      | Crear producto                  |
| PUT    | `/api/products/:pid` | Actualizar producto             |
| DELETE | `/api/products/:pid` | Eliminar producto               |

### 🔎 Query params disponibles

- `limit`
- `page`
- `sort=asc | desc`
- `query` (categoría o disponibilidad)

---

### 🟢 Carritos

| Método | Endpoint                        | Descripción                    |
| ------ | ------------------------------- | ------------------------------ |
| POST   | `/api/carts`                    | Crear carrito                  |
| GET    | `/api/carts/:cid`               | Obtener carrito (con populate) |
| POST   | `/api/carts/:cid/product/:pid`  | Agregar producto               |
| PUT    | `/api/carts/:cid`               | Reemplazar productos           |
| PUT    | `/api/carts/:cid/products/:pid` | Actualizar cantidad            |
| DELETE | `/api/carts/:cid/products/:pid` | Eliminar producto              |
| DELETE | `/api/carts/:cid`               | Vaciar carrito                 |

---

## 🖥️ Vistas

- `/` → Home
- `/realtimeproducts` → Productos en tiempo real (WebSockets)
- `/products` → Listado con paginación
- `/products/:pid` → Detalle de producto
- `/carts/:cid` → Detalle de carrito

---

## ⚡ Funcionalidades destacadas

### 📊 Paginación y filtros

Los productos pueden ser consultados con:

- paginación
- ordenamiento por precio
- filtrado por categoría o disponibilidad

---

### 🛒 Gestión de carritos

- Asociación de productos mediante referencias (`ObjectId`)
- Uso de `populate` para mostrar datos completos
- Manejo de cantidades

---

### 🔄 Tiempo real

Mediante Socket.io:

- Creación de productos en vivo
- Eliminación de productos en vivo
- Actualización automática de la vista

---

### ➕ Interacción desde la UI

- Botón para agregar productos al carrito
- Navegación entre vistas dinámicas

---

## 🧠 Consideraciones

- Los IDs utilizados corresponden a MongoDB (`_id`)
- La persistencia se realiza exclusivamente en MongoDB Atlas
- No se incluyen archivos sensibles como `.env` en el repositorio
- Se respeta la separación de responsabilidades (MVC)

---

## ✅ Estado del proyecto

✔ CRUD completo de productos
✔ CRUD completo de carritos
✔ Paginación y filtros
✔ Populate implementado
✔ WebSockets funcionando
✔ Vistas dinámicas operativas

---

## 🎯 Conclusión

Este proyecto representa una implementación completa de un backend profesional, aplicando buenas prácticas, arquitectura modular y conexión a base de datos NoSQL.

---

## 🙌 Autor

Alejandro Pourcel
Alumno de Coderhouse - Programación Backend I
