import { Router } from "express";
import {
  generateMockUsers,
  generateMockPets,
} from "../mocks/mocking.module.js";
import { UserModel } from "../models/User.model.js";
import { PetModel } from "../models/Pet.model.js";

const router = Router();

/**
 * GET /api/mocks/mockingpets
 * Genera mascotas mockeadas sin insertarlas en la base de datos.
 */
router.get("/mockingpets", (req, res) => {
  const pets = generateMockPets(50);

  res.json({
    status: "success",
    payload: pets,
  });
});

/**
 * GET /api/mocks/mockingusers
 * Genera 50 usuarios mockeados sin insertarlos en la base de datos.
 */
router.get("/mockingusers", (req, res) => {
  const users = generateMockUsers(50);

  res.json({
    status: "success",
    payload: users,
  });
});

/**
 * POST /api/mocks/generateData
 * Recibe por body:
 * {
 *   "users": 10,
 *   "pets": 20
 * }
 *
 * Genera e inserta usuarios y mascotas en MongoDB.
 */
router.post("/generateData", async (req, res) => {
  try {
    const { users, pets } = req.body;

    const usersQuantity = Number(users);
    const petsQuantity = Number(pets);

    if (
      Number.isNaN(usersQuantity) ||
      Number.isNaN(petsQuantity) ||
      usersQuantity < 0 ||
      petsQuantity < 0
    ) {
      return res.status(400).json({
        status: "error",
        message:
          "Los campos users y pets deben ser números válidos mayores o iguales a 0",
      });
    }

    const mockUsers = generateMockUsers(usersQuantity);
    const mockPets = generateMockPets(petsQuantity);

    const insertedUsers = await UserModel.insertMany(mockUsers);
    const insertedPets = await PetModel.insertMany(mockPets);

    res.status(201).json({
      status: "success",
      message: "Datos generados e insertados correctamente",
      payload: {
        users: insertedUsers.length,
        pets: insertedPets.length,
      },
    });
  } catch (error) {
    console.error("Error en generateData:", error);

    res.status(500).json({
      status: "error",
      message: "Error al generar e insertar datos",
      error: error.message,
    });
  }
});

export default router;
