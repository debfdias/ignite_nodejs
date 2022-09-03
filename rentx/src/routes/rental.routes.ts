
import { Router } from "express";

import { ensureAuth } from "../middlewares/ensureAuth";
import { CreateRentalController } from "../modules/rentals/useCases/CreateRental/CreateRentalController";
import { DevolutionRentalController } from "../modules/rentals/useCases/DevolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "../modules/rentals/useCases/ListRentalsByUser/ListRentalsByUserController";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post("/", ensureAuth, createRentalController.handle)
rentalRoutes.post("/devolution/:id", ensureAuth, devolutionRentalController.handle)
rentalRoutes.get("/user", ensureAuth, listRentalsByUserController.handle)

export { rentalRoutes }