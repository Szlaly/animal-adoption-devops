import request from 'supertest';
import app from '../app';
import { Request, Response, NextFunction } from 'express';
import logger from '../logger';


// Mock all animal controller methods
jest.mock("../controllers/animal.controller", () => ({
  getAllAnimals: jest.fn((req, res) => res.status(200).json([])),
  getAnimalById: jest.fn((req, res) => res.status(200).json({})),
  createAnimal: jest.fn((req, res) => res.status(201).json({ created: true })),
  updateAnimal: jest.fn((req, res) => res.status(200).json({ updated: true })),
  deleteAnimal: jest.fn((req, res) => res.status(200).json({ deleted: true })),
  addUpdateToAnimal: jest.fn((req, res) => res.status(200).json({ updated: true }))
}));

// Mock authenticate + admin
jest.mock("../middleware/auth.middleware", () => ({
  authenticate: (req:Request, res:Response, next:NextFunction) => {
    req.user = { id: "123", role: "admin" };
    next();
  },
  requireAdmin: (req:Request, res:Response, next:NextFunction) => next()
}));

// Mock user controller
jest.mock("../controllers/user.controller", () => ({
  getFavorites: (req:Request, res:Response) => res.status(200).json([]),
  addFavorite: (req:Request, res:Response) => res.status(200).json({ ok: true }),
  removeFavorite: (req:Request, res:Response) => res.status(200).json({ removed: true }),
  deleteMe: (req:Request, res:Response) => res.status(200).json({ deleted: true })
}));

describe("User API", () => {
  it("GET /api/users/favorites should return 200", async () => {
    const response = await request(app).get("/api/users/favorites");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
afterAll(() => {
  logger.close();  
});
