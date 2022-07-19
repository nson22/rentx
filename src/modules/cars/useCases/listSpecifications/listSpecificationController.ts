import { Request, Response } from "express";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

class ListSpecificationController{
    constructor(private listSpecificationsUseCase: ListSpecificationUseCase){}

    handle(request: Request, response: Response): Response{
        const all = this.listSpecificationsUseCase.execute()

        return response.status(200).json(all);
    }
}

export { ListSpecificationController }