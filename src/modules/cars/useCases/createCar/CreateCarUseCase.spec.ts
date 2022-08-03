import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppErrors";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC1234",
      fine_amount: 100,
      brand: "Brand",
      category_id: "Category ID",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a new car with an existing license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Name car",
        description: "Description car",
        daily_rate: 100,
        license_plate: "ABC1234",
        fine_amount: 100,
        brand: "Brand",
        category_id: "Category ID",
      });

      await createCarUseCase.execute({
        name: "Name car",
        description: "Description car",
        daily_rate: 100,
        license_plate: "ABC1234",
        fine_amount: 100,
        brand: "Brand",
        category_id: "Category ID",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a new car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car available",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC1234",
      fine_amount: 100,
      brand: "Brand",
      category_id: "Category ID",
    });

    expect(car.available).toBe(true);
  });
});
