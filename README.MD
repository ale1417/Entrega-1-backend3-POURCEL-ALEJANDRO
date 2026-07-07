# 🚀 Proyecto Backend - Entrega N°1 Backend III

## 🧑‍💻 Autor

**Alejandro Pourcel**

---

## 📌 Descripción del Proyecto

Este proyecto corresponde a la **Entrega N°1 de Programación Backend III - Coderhouse**.

El trabajo se realizó sobre el proyecto ecommerce desarrollado y aprobado en Backend II, manteniendo la arquitectura ya implementada con **DAO**, **Repository Pattern**, **DTO**, autenticación con **JWT**, autorización por roles, recuperación de contraseña y lógica de compra con tickets.

En esta nueva entrega se incorporó un sistema de **mocking** para generar usuarios y mascotas de prueba, permitiendo tanto visualizar datos simulados como insertarlos directamente en MongoDB.

---

## 🎯 Objetivo de la Entrega

La consigna solicita:

- Crear un router llamado `mocks.router.js`.
- Montar ese router bajo la ruta base `/api/mocks`.
- Mover el endpoint `/mockingpets` dentro del router de mocks.
- Crear un módulo de mocking para generar usuarios.
- Generar usuarios según un parámetro numérico.
- Los usuarios generados deben tener:
  - contraseña `coder123` encriptada,
  - role variable entre `user` y `admin`,
  - campo `pets` como array vacío.

- Crear un endpoint `GET /api/mocks/mockingusers`.
- Generar 50 usuarios mock con formato similar al de MongoDB.
- Crear un endpoint `POST /api/mocks/generateData`.
- Recibir por body la cantidad de usuarios y mascotas a generar.
- Insertar esos datos en MongoDB.
- Comprobar los registros insertados mediante servicios `GET` de users y pets.

---

## 🛠️ Tecnologías Utilizadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Mongoose Paginate
- Passport
- Passport JWT
- JSON Web Token
- Bcrypt
- Nodemailer
- Cookie Parser
- Dotenv
- Express Handlebars
- Socket.io
- @faker-js/faker

---

## 📁 Estructura del Proyecto

```bash
src/
│
├── app.js
├── utils.js
│
├── config/
│   ├── mailer.config.js
│   └── passport.config.js
│
├── dao/
│   ├── Cart.dao.js
│   ├── Product.dao.js
│   ├── Ticket.dao.js
│   └── User.dao.js
│
├── dto/
│   └── UserCurrent.dto.js
│
├── managers/
│   ├── CartManager.js
│   └── ProductManager.js
│
├── middlewares/
│   └── authorization.middleware.js
│
├── mocks/
│   └── mocking.module.js
│
├── models/
│   ├── Cart.model.js
│   ├── Pet.model.js
│   ├── Product.model.js
│   ├── Ticket.model.js
│   └── User.model.js
│
├── repositories/
│   ├── Cart.repository.js
│   ├── Product.repository.js
│   ├── Ticket.repository.js
│   └── User.repository.js
│
├── routes/
│   ├── carts.router.js
│   ├── mocks.router.js
│   ├── pets.router.js
│   ├── products.router.js
│   ├── sessions.router.js
│   ├── users.router.js
│   └── views.router.js
│
├── public/
│   ├── css/
│   └── js/
│
└── views/
    ├── layouts/
    ├── cartDetail.handlebars
    ├── home.handlebars
    ├── productDetail.handlebars
    ├── products.handlebars
    └── realTimeProducts.handlebars
```

---

## 🧱 Arquitectura Aplicada

El proyecto mantiene una arquitectura organizada por capas:

- **Models:** esquemas de MongoDB.
- **DAO:** acceso directo a la base de datos.
- **Repositories:** capa intermedia entre la lógica de negocio y la persistencia.
- **Managers:** lógica principal de productos y carritos.
- **DTO:** control de datos expuestos al cliente.
- **Middlewares:** autorización por roles.
- **Mocks:** generación de datos simulados.
- **Routes:** definición de endpoints.
- **Config:** configuración de Passport y Nodemailer.

---

## 📦 Patrón Repository

Se implementó el patrón Repository para desacoplar la lógica de negocio del acceso directo a MongoDB.

Repositories implementados:

- `ProductRepository`
- `CartRepository`
- `UserRepository`
- `TicketRepository`

DAOs implementados:

- `ProductDAO`
- `CartDAO`
- `UserDAO`
- `TicketDAO`

---

## 🧪 Sistema de Mocking

Para esta entrega se creó un módulo de mocking utilizando `@faker-js/faker`.

Archivo:

```bash
src/mocks/mocking.module.js
```

Este módulo permite generar:

- Usuarios mockeados.
- Mascotas mockeadas.

---

## 👤 Mocking de Usuarios

Los usuarios generados tienen el siguiente formato:

```js
{
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  password: String,
  role: "user" | "admin",
  pets: []
}
```

Características principales:

- La contraseña base es `coder123`.
- La contraseña se guarda encriptada utilizando `bcrypt`.
- El role puede variar entre `user` y `admin`.
- El campo `pets` se genera como array vacío.
- Los datos se generan con formato similar al que devuelve MongoDB.

---

## 🐾 Mocking de Mascotas

Las mascotas generadas tienen el siguiente formato:

```js
{
  name: String,
  specie: String,
  birthDate: Date,
  adopted: Boolean,
  owner: null
}
```

---

## 🐶 Modelo Pet

Se agregó el modelo `Pet` para poder insertar mascotas en MongoDB.

Archivo:

```bash
src/models/Pet.model.js
```

Campos principales:

```js
name;
specie;
birthDate;
adopted;
owner;
```

---

## 👤 Actualización del Modelo User

Se actualizó el modelo `User` agregando el campo `pets`.

```js
pets: {
  type: Array,
  default: [],
}
```

De esta manera, los usuarios mockeados cumplen con la consigna de tener el campo `pets` como array vacío.

---

## 🔀 Router de Mocks

Se creó el router:

```bash
src/routes/mocks.router.js
```

Y se montó bajo la ruta base:

```http
/api/mocks
```

---

## 📌 Endpoints de Mocking

### Generar mascotas mockeadas

```http
GET /api/mocks/mockingpets
```

Este endpoint genera mascotas de prueba y las devuelve como respuesta sin insertarlas en la base de datos.

Respuesta esperada:

```json
{
  "status": "success",
  "payload": [
    {
      "name": "Archie",
      "specie": "dog",
      "birthDate": "2019-11-07T19:53:15.102Z",
      "adopted": false,
      "owner": null
    }
  ]
}
```

---

### Generar usuarios mockeados

```http
GET /api/mocks/mockingusers
```

Este endpoint genera 50 usuarios de prueba y los devuelve como respuesta sin insertarlos en la base de datos.

Respuesta esperada:

```json
{
  "status": "success",
  "payload": [
    {
      "first_name": "Carl",
      "last_name": "Altenwerth",
      "email": "usuario@test.com",
      "age": 45,
      "password": "$2b$10$...",
      "role": "admin",
      "pets": []
    }
  ]
}
```

---

### Generar e insertar datos en MongoDB

```http
POST /api/mocks/generateData
```

Este endpoint recibe por body la cantidad de usuarios y mascotas a generar e insertar en MongoDB.

Body de ejemplo:

```json
{
  "users": 5,
  "pets": 5
}
```

Respuesta esperada:

```json
{
  "status": "success",
  "message": "Datos generados e insertados correctamente",
  "payload": {
    "users": 5,
    "pets": 5
  }
}
```

---

## 👥 Servicio GET de Users

Para comprobar los usuarios insertados en MongoDB se agregó el endpoint:

```http
GET /api/users
```

Este endpoint devuelve los usuarios existentes en la base de datos.

Respuesta esperada:

```json
{
  "status": "success",
  "payload": [
    {
      "_id": "id_del_usuario",
      "first_name": "Alejandro",
      "last_name": "Pourcel",
      "email": "usuario@test.com",
      "age": 22,
      "password": "$2b$10$...",
      "role": "admin",
      "pets": []
    }
  ]
}
```

---

## 🐾 Servicio GET de Pets

Para comprobar las mascotas insertadas en MongoDB se agregó el endpoint:

```http
GET /api/pets
```

Este endpoint devuelve las mascotas existentes en la base de datos.

Respuesta esperada:

```json
{
  "status": "success",
  "payload": [
    {
      "_id": "id_de_la_mascota",
      "name": "Archie",
      "specie": "dog",
      "birthDate": "2019-11-07T19:53:15.102Z",
      "adopted": false,
      "owner": null
    }
  ]
}
```

---

## 🔐 Autenticación y Sesiones

El proyecto conserva la autenticación implementada con **JWT** y **Passport JWT**.

Al iniciar sesión, el servidor genera un token JWT y lo guarda en una cookie llamada:

```txt
jwtCookieToken
```

La estrategia `current` valida al usuario autenticado mediante Passport.

---

## 📄 DTO en Current

La ruta:

```http
GET /api/sessions/current
```

devuelve un DTO para evitar exponer información sensible.

Respuesta esperada:

```json
{
  "status": "success",
  "payload": {
    "name": "Alejandro Pourcel",
    "email": "usuario@email.com",
    "age": 22,
    "role": "user",
    "cart": "cartId"
  }
}
```

No se expone la contraseña ni datos internos innecesarios.

---

## 🛡️ Autorización por Roles

Se implementó un middleware de autorización que limita el acceso según el rol del usuario.

### Rol admin

Puede:

- Crear productos.
- Actualizar productos.
- Eliminar productos.

### Rol user

Puede:

- Agregar productos a su carrito.
- Realizar compras.

---

## 🔑 Recuperación de Contraseña

El proyecto conserva el sistema de recuperación de contraseña con **Nodemailer**.

Flujo:

1. El usuario solicita recuperación de contraseña.
2. El servidor genera un token JWT temporal.
3. Se envía un correo con un enlace de recuperación.
4. El enlace expira luego de 1 hora.
5. El usuario puede establecer una nueva contraseña.
6. El sistema impide reutilizar la contraseña anterior.

Endpoints utilizados:

```http
POST /api/sessions/forgot-password
POST /api/sessions/reset-password/:token
```

---

## 🎟️ Sistema de Tickets

Se conserva el modelo `Ticket` con los siguientes campos:

```js
code;
purchase_datetime;
amount;
purchaser;
```

El ticket se genera al finalizar una compra correctamente.

---

## 🛒 Lógica de Compra

Endpoint:

```http
POST /api/carts/:cid/purchase
```

Funcionamiento:

- Recorre los productos del carrito.
- Verifica stock disponible.
- Compra solo los productos con stock suficiente.
- Descuenta stock automáticamente.
- Genera un ticket con el monto total.
- Mantiene en el carrito los productos que no pudieron comprarse.

---

## 📦 Productos

El sistema permite consultar productos con paginación, filtros y ordenamiento.

### Endpoints

```http
GET    /api/products
GET    /api/products/:pid
POST   /api/products
PUT    /api/products/:pid
DELETE /api/products/:pid
```

### Query Params

```txt
limit
page
sort=asc | desc
query
```

Ejemplo:

```http
GET /api/products?limit=10&page=1&sort=asc&query=cerveza
```

---

## 🛒 Carritos

### Endpoints

```http
POST   /api/carts
GET    /api/carts/:cid
POST   /api/carts/:cid/product/:pid
PUT    /api/carts/:cid
PUT    /api/carts/:cid/products/:pid
DELETE /api/carts/:cid/products/:pid
DELETE /api/carts/:cid
POST   /api/carts/:cid/purchase
```

El carrito utiliza `populate` para mostrar la información completa de los productos asociados.

---

## 🔐 Sessions

### Endpoints

```http
POST /api/sessions/register
POST /api/sessions/login
GET  /api/sessions/current
POST /api/sessions/forgot-password
POST /api/sessions/reset-password/:token
```

---

## 🧪 Mocks

### Endpoints

```http
GET  /api/mocks/mockingusers
GET  /api/mocks/mockingpets
POST /api/mocks/generateData
```

---

## 👥 Users

### Endpoints

```http
GET /api/users
```

---

## 🐾 Pets

### Endpoints

```http
GET /api/pets
```

---

## 🖥️ Vistas

El proyecto conserva vistas con Handlebars:

```http
GET /
GET /realtimeproducts
GET /products
GET /products/:pid
GET /carts/:cid
```

Incluye:

- listado de productos,
- vista en tiempo real,
- detalle de producto,
- detalle de carrito,
- botón para agregar producto al carrito.

---

## ⚡ WebSockets

Se utiliza Socket.io para actualizar productos en tiempo real.

Funcionalidades:

- Crear productos desde la vista realtime.
- Eliminar productos desde la vista realtime.
- Actualizar automáticamente el listado en pantalla.

---

## ⚙️ Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto con la siguiente estructura:

```env
MONGO_URL=tu_uri_de_mongodb_atlas
JWT_SECRET=tu_clave_secreta_jwt
GMAIL_USER=tu_correo_gmail
GMAIL_PASS=tu_contraseña_de_aplicacion_gmail
FRONT_URL=http://localhost:8080
```

---

## 🚀 Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear el archivo `.env` con las variables indicadas anteriormente.

### 4. Ejecutar el servidor

```bash
npm run dev
```

Servidor disponible en:

```txt
http://localhost:8080
```

---

## 🧪 Pruebas Realizadas en Postman

Se probaron correctamente los siguientes endpoints:

```http
GET  /api/mocks/mockingusers
GET  /api/mocks/mockingpets
POST /api/mocks/generateData
GET  /api/users
GET  /api/pets
```

También se verificó que:

- Los usuarios mockeados se generan correctamente.
- Las contraseñas se guardan encriptadas.
- La contraseña base utilizada es `coder123`.
- Los roles varían entre `user` y `admin`.
- El campo `pets` se genera como array vacío.
- Las mascotas mockeadas se generan correctamente.
- Los usuarios se insertan correctamente en MongoDB.
- Las mascotas se insertan correctamente en MongoDB.
- Los datos insertados pueden consultarse mediante los servicios GET correspondientes.

---

## ✅ Funcionalidades Implementadas

### Backend II

- CRUD de productos.
- CRUD de carritos.
- MongoDB Atlas.
- Mongoose.
- Paginación de productos.
- Filtros y ordenamiento.
- Autenticación con JWT.
- Passport JWT.
- DTO para `/current`.
- Bcrypt para contraseñas.
- Roles `admin` y `user`.
- Middleware de autorización.
- DAO.
- Repository Pattern.
- Recuperación de contraseña por email.
- Token de recuperación con expiración de 1 hora.
- Validación para no reutilizar la contraseña anterior.
- Modelo Ticket.
- Endpoint de compra.
- Verificación de stock.
- Descuento automático de stock.
- Compra parcial.
- WebSockets.
- Vistas con Handlebars.

### Backend III - Entrega N°1

- Router `mocks.router.js`.
- Ruta base `/api/mocks`.
- Endpoint `/mockingpets`.
- Endpoint `/mockingusers`.
- Módulo de mocking.
- Generación de usuarios mockeados.
- Generación de mascotas mockeadas.
- Contraseña `coder123` encriptada.
- Roles aleatorios entre `user` y `admin`.
- Campo `pets` como array vacío.
- Endpoint `/generateData`.
- Inserción masiva de usuarios en MongoDB.
- Inserción masiva de mascotas en MongoDB.
- Servicio `GET /api/users`.
- Servicio `GET /api/pets`.

---

## 🎯 Conclusión

Este proyecto integra los conceptos trabajados en Backend II y suma la primera entrega de Backend III, incorporando generación de datos mockeados, inserción masiva en base de datos y servicios de comprobación para usuarios y mascotas.

Se mantiene una arquitectura organizada y escalable, utilizando DAO, Repository Pattern, DTO, autenticación con JWT, autorización por roles y conexión con MongoDB Atlas.

---

## 🙌 Autor

**Alejandro Pourcel**

Programación Backend III
Coderhouse
