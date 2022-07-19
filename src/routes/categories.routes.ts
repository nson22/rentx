import { Router, Request, Response } from 'express';
import multer from 'multer';

import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { importCategoryController } from '../modules/cars/useCases/importCategory';
import { listCategoryController } from '../modules/cars/useCases/listCategories';

const categoriesRouter = Router();

const upload = multer({
    dest: "./tmp"
})

categoriesRouter.post('/', (resquest, response) => {
    return createCategoryController.handle(resquest, response);
});

categoriesRouter.get('/', (request, response) => {
    return listCategoryController.handle(request, response);
})

categoriesRouter.post("/import", upload.single("file"), (request, response) => {
    return importCategoryController.handle(request, response);
})


export { categoriesRouter };
