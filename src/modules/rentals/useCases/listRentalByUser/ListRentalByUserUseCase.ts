import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

@injectable()
class ListRentalByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalRepository: IRentalsRepository
  ) {}

  async execute(user_id: string): Promise<Rental[]> {
    const rentalByUser = await this.rentalRepository.findByUser(user_id);

    return rentalByUser;
  }
}

export { ListRentalByUserUseCase };
