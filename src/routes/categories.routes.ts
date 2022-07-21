import { Router, Request, Response } from 'express';
import multer from 'multer';
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import { ListCategoriesController } from '../modules/cars/useCases/listCategories/ListCategoriesController';
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/ImportCategoryController';



const categoriesRouters = Router();

const upload = multer({
    dest: "./tmp"
})

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRouters.post('/', createCategoryController.handle);

categoriesRouters.get('/', listCategoriesController.handle);

categoriesRouters.post("/import", upload.single("file"), importCategoryController.handle);


export { categoriesRouters };
