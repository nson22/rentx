import {Request, Response} from "express";
import { ListSpecificationUseCase } from "../listSpecifications/ListSpecificationUseCase";

class ListCategoriesController {
    constructor(private listSpecificationUseCase: ListSpecificationUseCase){ }

    handle(request: Request, response: Response): Response{
        const all = this.listSpecificationUseCase.execute();

        return response.status(200).json(all);
    }

}

export { ListCategoriesController }