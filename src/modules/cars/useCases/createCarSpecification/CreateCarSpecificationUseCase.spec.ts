import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsResositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsResositoryInMemory";
import { AppError } from "@shared/errors/AppErrors";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsResositoryInMemory;

describe("Create car specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsResositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should be able to add a new specification for a car.", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "Car license plate",
      fine_amount: 100,
      brand: "Car brand",
      category_id: "Category id for a car",
    });

    const specification_id = ["Car specification one", "Car specification two"];

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specification_id,
    });

    expect(car).toHaveProperty("id");
  });

  it("should be able to add a new specification for a car does not exists.", async () => {
    expect(async () => {
      const car_id = "Does not exist";
      const specification_id = ["Does not exist"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specification_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification for a car.", async () => {
    const specification = await specificationsRepositoryInMemory.create({
      name: "Specification car",
      description: "Description for a specification car",
    });

    const car = await carsRepositoryInMemory.create({
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "Car license plate",
      fine_amount: 100,
      brand: "Car brand",
      category_id: "Category id for a car",
    });

    const specification_id = [specification.id];

    const carSpecifications = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specification_id,
    });

    expect(carSpecifications.specifications.length).toBeGreaterThan(0);
    expect(carSpecifications).toHaveProperty("specifications");
  });
});
