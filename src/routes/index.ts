import { Router } from 'express';
import { categoriesRouters } from './categories.routes';
import { specificationsRoutes } from './specification.routes';
import { usersRouters } from './users.routes';
import { authenticateRoutes } from "./authenticate.routes";

const router = Router();

router.use("/categories", categoriesRouters);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRouters);
router.use(authenticateRoutes);

export { router }