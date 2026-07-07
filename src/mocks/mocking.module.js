import { faker } from "@faker-js/faker";
import { createHash } from "../utils.js";

export const generateMockUsers = (quantity = 50) => {
  const users = [];

  for (let i = 0; i < quantity; i++) {
    users.push({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      age: faker.number.int({ min: 18, max: 80 }),
      password: createHash("coder123"),
      role: faker.helpers.arrayElement(["user", "admin"]),
      pets: [],
    });
  }

  return users;
};

export const generateMockPets = (quantity = 50) => {
  const pets = [];

  for (let i = 0; i < quantity; i++) {
    pets.push({
      name: faker.animal.petName(),
      specie: faker.helpers.arrayElement(["dog", "cat", "rabbit", "bird"]),
      birthDate: faker.date.birthdate({ min: 1, max: 15, mode: "age" }),
      adopted: false,
      owner: null,
    });
  }

  return pets;
};
