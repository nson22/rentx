import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from "@modules/cars/useCases/listCategories/ListCategoriesUseCase";

class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

    try {
      const all = await listCategoriesUseCase.execute();

      return response.status(200).json(all);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { ListCategoriesController };
