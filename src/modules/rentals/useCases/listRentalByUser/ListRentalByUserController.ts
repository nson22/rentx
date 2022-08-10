import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRentalByUserUseCase } from "./ListRentalByUserUseCase";

class ListRentalByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listRentalUserUseCase = container.resolve(ListRentalByUserUseCase);
    const { id } = request.user;

    const rentals = await listRentalUserUseCase.execute(id);

    return response.status(200).json(rentals);
  }
}

export { ListRentalByUserController };
