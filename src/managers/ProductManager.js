import { Product } from "../models/Product.model.js";

export default class ProductManager {
  constructor() {}

  async getProducts({ limit = 10, page = 1, sort, query } = {}) {
    const filters = {};

    if (query) {
      if (query === "true" || query === "false") {
        filters.status = query === "true";
      } else {
        filters.category = query;
      }
    }

    let mongoQuery = Product.find(filters);

    if (sort === "asc") {
      mongoQuery = mongoQuery.sort({ price: 1 });
    } else if (sort === "desc") {
      mongoQuery = mongoQuery.sort({ price: -1 });
    }

    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    const totalDocs = await Product.countDocuments(filters);
    const totalPages = Math.ceil(totalDocs / limitNum) || 1;

    const products = await mongoQuery.skip(skip).limit(limitNum).lean();

    return {
      status: "success",
      payload: products,
      totalPages,
      prevPage: pageNum > 1 ? pageNum - 1 : null,
      nextPage: pageNum < totalPages ? pageNum + 1 : null,
      page: pageNum,
      hasPrevPage: pageNum > 1,
      hasNextPage: pageNum < totalPages,
      prevLink:
        pageNum > 1
          ? `?page=${pageNum - 1}&limit=${limitNum}${sort ? `&sort=${sort}` : ""}${query ? `&query=${query}` : ""}`
          : null,
      nextLink:
        pageNum < totalPages
          ? `?page=${pageNum + 1}&limit=${limitNum}${sort ? `&sort=${sort}` : ""}${query ? `&query=${query}` : ""}`
          : null,
    };
  }

  async getAllProductsRaw() {
    return await Product.find().lean();
  }

  async getProductById(id) {
    return await Product.findById(id).lean();
  }

  async addProduct(productData) {
    const required = [
      "title",
      "description",
      "code",
      "price",
      "status",
      "stock",
      "category",
      "thumbnails",
    ];

    for (const field of required) {
      if (productData[field] === undefined) {
        throw new Error(`Missing field: ${field}`);
      }
    }

    if (!Array.isArray(productData.thumbnails)) {
      throw new Error("thumbnails must be an array of strings");
    }

    const codeExists = await Product.findOne({ code: productData.code });
    if (codeExists) {
      throw new Error("code must be unique");
    }

    const newProduct = await Product.create({
      title: productData.title,
      description: productData.description,
      code: productData.code,
      price: Number(productData.price),
      status:
        productData.status === "false" ? false : Boolean(productData.status),
      stock: Number(productData.stock),
      category: productData.category,
      thumbnails: productData.thumbnails,
    });

    return newProduct;
  }

  async updateProduct(id, updates) {
    const { _id, id: ignoredId, ...safeUpdates } = updates;

    if (safeUpdates.price !== undefined) {
      safeUpdates.price = Number(safeUpdates.price);
    }

    if (safeUpdates.stock !== undefined) {
      safeUpdates.stock = Number(safeUpdates.stock);
    }

    if (safeUpdates.status !== undefined) {
      safeUpdates.status =
        safeUpdates.status === "false" ? false : Boolean(safeUpdates.status);
    }

    const updated = await Product.findByIdAndUpdate(id, safeUpdates, {
      new: true,
      runValidators: true,
    }).lean();

    return updated;
  }

  async deleteProduct(id) {
    const deleted = await Product.findByIdAndDelete(id);
    return !!deleted;
  }
  async pingProducts() {
    return await Product.find().limit(1).lean();
  }
}
