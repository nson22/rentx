import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUserCase } from "@modules/accounts/useCases/createUser/createUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, driver_license } = request.body;
    const createUserUseCase = container.resolve(CreateUserUserCase);

    createUserUseCase.execute({ name, email, password, driver_license });

    return response.status(201).send();
  }
}

export { CreateUserController };
