import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";
import { ensureAdmin } from "../middleware/ensureAdmin";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const carsRoutes = Router();

let createCarController = new CreateCarController()

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle)

export { carsRoutes }

