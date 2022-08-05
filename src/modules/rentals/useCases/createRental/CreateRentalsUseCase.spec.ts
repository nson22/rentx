import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppErrors";

import { CreateRentalsUseCase } from "./CreateRentalsUseCase";

let rentalRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalsUseCase;
let dayjsDateProvider: DayjsDateProvider;

describe("Create car rental", () => {
  beforeEach(() => {
    rentalRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalsUseCase(
      rentalRepositoryInMemory,
      dayjsDateProvider
    );
  });

  it("should be able create a new car rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "Car id",
      user_id: "User id",
      expected_return_date: dayjsDateProvider.addHours(24),
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there another open rental for the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "Car id",
        user_id: "User id",
        expected_return_date: dayjsDateProvider.addHours(24),
      });

      await createRentalUseCase.execute({
        car_id: "Car id",
        user_id: "User id",
        expected_return_date: dayjsDateProvider.addHours(24),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there another open rental for the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "Car id",
        user_id: "User id",
        expected_return_date: dayjsDateProvider.addHours(24),
      });

      await createRentalUseCase.execute({
        car_id: "Car id",
        user_id: "User id two",
        expected_return_date: dayjsDateProvider.addHours(24),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "Car id",
        user_id: "User id",
        expected_return_date: dayjsDateProvider.dateNow(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
