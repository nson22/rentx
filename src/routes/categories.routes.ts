import { Router, Request, Response } from 'express';

import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoryController } from '../modules/cars/useCases/listCategories';

const categoriesRouter = Router();

categoriesRouter.post('/', (resquest: Request, response: Response) => {
    return createCategoryController.handle(resquest, response);
});

categoriesRouter.get('/', (request: Request, response: Response) => {
    return listCategoryController.handle(request, response);
})

export { categoriesRouter };
