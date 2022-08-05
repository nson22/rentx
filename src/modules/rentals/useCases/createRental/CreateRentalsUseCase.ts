import { inject, injectable } from "tsyringe";

import { IRentalDTO } from "@modules/rentals/infra/dtos/IRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppErrors";

@injectable()
class CreateRentalsUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalRepository: IRentalsRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRentalDTO): Promise<Rental> {
    const minimumRentHours = 24;

    const carUnavailable = await this.rentalRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError("Current car choice is unavailable.");
    }

    const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError("There is in progress rental for selected user.");
    }

    const compare = this.dateProvider.compareInHours(
      this.dateProvider.dateNow(),
      expected_return_date
    );

    console.log(compare);

    if (compare < minimumRentHours) {
      throw new AppError("Invalid return rent time");
    }

    const rental = await this.rentalRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalsUseCase };
