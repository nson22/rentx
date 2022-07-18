import { Router, Request, Response } from 'express';
import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { CreateCategoryService } from '../services/CreateCategoryService';

const categoriesRouter = Router();
const categoriesRespository = new CategoriesRepository();


categoriesRouter.post('/', (resquest: Request, response: Response) => {
    const { name, description } = resquest.body;

    const createCategoryService = new CreateCategoryService(categoriesRespository);
    createCategoryService.execute({name, description});

    return response.status(201).send();

});

categoriesRouter.get('/', (request: Request, response: Response) => {
    const all = categoriesRespository.list()
    return response.status(200).json(all)
})

export { categoriesRouter };
