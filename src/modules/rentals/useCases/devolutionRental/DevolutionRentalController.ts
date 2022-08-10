import { Request, Response } from "express";
import { container } from "tsyringe";

import { DevolutionRentalsUseCase } from "./DevolutionRentalsUseCase";

class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { id } = request.params;

    const devolutionRentalsUseCase = container.resolve(
      DevolutionRentalsUseCase
    );

    const rental = await devolutionRentalsUseCase.execute({
      id,
      user_id,
    });

    return response.status(200).json(rental);
  }
}

export { DevolutionRentalController };
