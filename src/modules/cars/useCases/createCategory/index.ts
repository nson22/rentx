import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export default (): CreateCategoryController => {

    const categoriesRespository = new CategoriesRepository();
    const createCategoryUseCase = new CreateCategoryUseCase(categoriesRespository);
    const createCategoryController = new CreateCategoryController(createCategoryUseCase);

    return createCategoryController;

}