import { Router } from "express";
import { authenticateRoutes } from "@shared/infra/http/routes/authenticate.routes";
import { usersRouters } from "@shared/infra/http/routes/users.routes";
import { categoriesRouters } from "@shared/infra/http/routes/categories.routes";
import { specificationsRoutes } from "@shared/infra/http/routes/specification.routes";

const router = Router();

router.use(authenticateRoutes);
router.use("/users", usersRouters);
router.use("/categories", categoriesRouters);
router.use("/specifications", specificationsRoutes);

export { router }