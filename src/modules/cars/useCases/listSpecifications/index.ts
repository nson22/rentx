import { SpecificationRepository } from "../../repositories/implementations/SpecificationsRespository";
import { ListCategoriesController } from "../listCategories/ListCategoriesController";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

const listSpecificationRepository = SpecificationRepository.getInstance();
const listSpecificationUseCase = new ListSpecificationUseCase(listSpecificationRepository);
const listSpecificationController = new ListCategoriesController(listSpecificationUseCase);

export { listSpecificationController }