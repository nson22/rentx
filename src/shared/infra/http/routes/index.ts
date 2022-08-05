import { Router } from "express";

import { authenticateRoutes } from "@shared/infra/http/routes/authenticate.routes";
import { carsRoutes } from "@shared/infra/http/routes/cars.routes";
import { categoriesRouters } from "@shared/infra/http/routes/categories.routes";
import { rentalRoutes } from "@shared/infra/http/routes/rental.routes";
import { specificationsRoutes } from "@shared/infra/http/routes/specification.routes";
import { usersRouters } from "@shared/infra/http/routes/users.routes";

const router = Router();

router.use(authenticateRoutes);
router.use("/rentals", rentalRoutes);
router.use("/users", usersRouters);
router.use("/cars", carsRoutes);
router.use("/categories", categoriesRouters);
router.use("/specifications", specificationsRoutes);

export { router };
