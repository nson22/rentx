import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListSpecificationsUseCase } from "@modules/cars/useCases/listSpecifications/ListSpecificationsUseCase";

class ListSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listSpecificationsUseCase = container.resolve(
      ListSpecificationsUseCase
    );

    try {
      const all = await listSpecificationsUseCase.execute();

      return response.status(200).json(all);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { ListSpecificationsController };
