import { Router, Request, Response } from 'express';
import { categoriesRouter } from './categories.routes';
import { specificationsRoutes } from './specification.routes';

const router = Router();

router.use('/categories', categoriesRouter)
router.use('/specifications', specificationsRoutes)

export { router }