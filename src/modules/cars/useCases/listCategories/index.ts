import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

// TODO
const categoriesRespository = null;
const listCategoryUseCase = new ListCategoriesUseCase(categoriesRespository);
const listCategoryController = new ListCategoriesController(listCategoryUseCase);

export { listCategoryController }