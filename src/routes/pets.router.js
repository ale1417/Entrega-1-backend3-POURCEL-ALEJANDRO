import { Router } from "express";
import { PetModel } from "../models/Pet.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const pets = await PetModel.find().lean();

    res.json({
      status: "success",
      payload: pets,
    });
  } catch (error) {
    console.error("Error al obtener mascotas:", error);

    res.status(500).json({
      status: "error",
      message: "Error al obtener mascotas",
      error: error.message,
    });
  }
});

export default router;
