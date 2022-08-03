import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppErrors";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to add a new specification for a car.", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC1234",
      fine_amount: 100,
      brand: "Brand",
      category_id: "Category ID",
    });

    const specifications_id = [
      "Car specification one",
      "Car specification two",
    ];

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(car).toHaveProperty("id");
  });

  it("should be able to add a new specification for a car does not exists.", async () => {
    expect(async () => {
      const car_id = "Does not exist";
      const specifications_id = ["Does not exist"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
