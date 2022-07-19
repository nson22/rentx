import { SpecificationRepository } from "../../repositories/implementations/SpecificationsRespository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";


const specificataionsRepositoty = SpecificationRepository.getInstance()
const createSpecificationUseCase = new CreateSpecificationUseCase(specificataionsRepositoty);
const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase);

export {createSpecificationController}