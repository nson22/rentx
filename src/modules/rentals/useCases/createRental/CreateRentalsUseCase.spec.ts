import { v4 as uuidv4 } from "uuid";

import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppErrors";

import { CreateRentalsUseCase } from "./CreateRentalsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalsUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Create car rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    createRentalUseCase = new CreateRentalsUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able create a new car rental", async () => {
    const user = await usersRepositoryInMemory.create({
      name: "User name",
      email: "user Email",
      password: "1234",
    });

    const car = await carsRepositoryInMemory.create({
      id: uuidv4(),
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "1234",
      fine_amount: 100,
      brand: "Car brand",
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: user.id,
      expected_return_date: dayjsDateProvider.addHours(24),
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there another open rental for the same user", async () => {
    const user = await usersRepositoryInMemory.create({
      name: "User name",
      email: "user Email",
      password: "1234",
    });

    const car = await carsRepositoryInMemory.create({
      id: uuidv4(),
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "1234",
      fine_amount: 100,
      brand: "Car brand",
    });

    expect(async () => {
      await createRentalUseCase.execute({
        car_id: car.id,
        user_id: user.id,
        expected_return_date: dayjsDateProvider.addHours(24),
      });

      await createRentalUseCase.execute({
        car_id: car.id,
        user_id: user.id,
        expected_return_date: dayjsDateProvider.addHours(24),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there another open rental for the same car", async () => {
    const user = await usersRepositoryInMemory.create({
      name: "User name",
      email: "user Email",
      password: "1234",
    });

    const user_two = await usersRepositoryInMemory.create({
      name: "User name two",
      email: "user Email two",
      password: "1234",
    });

    const car = await carsRepositoryInMemory.create({
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "1234",
      fine_amount: 100,
      brand: "Car brand",
    });

    expect(async () => {
      const rental = await createRentalUseCase.execute({
        car_id: car.id,
        user_id: user.id,
        expected_return_date: dayjsDateProvider.addHours(24),
      });

      await createRentalUseCase.execute({
        car_id: car.id,
        user_id: user_two.id,
        expected_return_date: dayjsDateProvider.addHours(24),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    const user = await usersRepositoryInMemory.create({
      name: "User name",
      email: "user Email",
      password: "1234",
    });

    const car = await carsRepositoryInMemory.create({
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "1234",
      fine_amount: 100,
      brand: "Car brand",
    });

    expect(async () => {
      await createRentalUseCase.execute({
        car_id: car.id,
        user_id: user.id,
        expected_return_date: dayjsDateProvider.dateNow(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
