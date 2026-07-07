import { Router } from "express";
import { UserModel } from "../models/User.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find().lean();

    res.json({
      status: "success",
      payload: users,
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);

    res.status(500).json({
      status: "error",
      message: "Error al obtener usuarios",
      error: error.message,
    });
  }
});

export default router;
