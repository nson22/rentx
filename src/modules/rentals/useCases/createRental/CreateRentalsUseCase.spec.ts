import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppErrors";

import { CreateRentalsUseCase } from "./CreateRentalsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalsUseCase;

describe("Create car rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();

    createRentalUseCase = new CreateRentalsUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able create a new car rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car id",
      description: "car description",
      brand: "car brand",
      daily_rate: 100,
      fine_amount: 50,
      license_plate: "ABC",
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "user_id",
      expected_return_date: dayjsDateProvider.addHours(24),
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there another open rental for the same user", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "car_id",
      user_id: "same_user_id",
      expected_return_date: dayjsDateProvider.addHours(24),
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "car_id_two",
        user_id: "same_user_id",
        expected_return_date: dayjsDateProvider.addHours(24),
      })
    ).rejects.toEqual(
      new AppError("There is a progress rental for selected user.")
    );
  });

  it("should not be able to create a new rental if there another open rental for the same car", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "car_id",
      user_id: "user_id_diff",
      expected_return_date: dayjsDateProvider.addHours(24),
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "car_id",
        user_id: "user_id",
        expected_return_date: dayjsDateProvider.addHours(24),
      })
    ).rejects.toEqual(new AppError("Current car choice is unavailable."));
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: "car_id",
        user_id: "user_id",
        expected_return_date: dayjsDateProvider.dateNow(),
      })
    ).rejects.toEqual(new AppError("Invalid return rent time"));
  });
});
