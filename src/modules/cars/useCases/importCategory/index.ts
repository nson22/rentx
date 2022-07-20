import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

// TODO
const categoriesRespository = null;
const importCategoryUseCase = new ImportCategoryUseCase(categoriesRespository)
const importCategoryController = new ImportCategoryController(importCategoryUseCase);

export { importCategoryController }
