import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./listCategoriesUseCase";

const categoriesRespository = CategoriesRepository.getInstance();
const listCategoryUseCase = new ListCategoriesUseCase(categoriesRespository);
const listCategoryController = new ListCategoriesController(listCategoryUseCase);

export { listCategoryController }