import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/listAvailableCarsController";
import { Router } from "express";
import { ensureAdmin } from "../middleware/ensureAdmin";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const carsRoutes = Router();

let createCarController = new CreateCarController()
let listAvaialableCarsController = new ListAvailableCarsController()

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle)
carsRoutes.get("/available", listAvaialableCarsController.handle)

export { carsRoutes }

