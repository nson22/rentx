import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

let specificationsRepository: ISpecificationsRepository;
let listSpecificationsUseCase: ListSpecificationsUseCase;

describe("List specifications", () => {
  beforeEach(() => {
    specificationsRepository = new SpecificationsRepositoryInMemory();
    listSpecificationsUseCase = new ListSpecificationsUseCase(
      specificationsRepository
    );
  });

  it("should be able to list all empty specifications", async () => {
    const specifications = await listSpecificationsUseCase.execute();
    expect(specifications.length).toEqual(0);
  });

  it("should be able to list all specifications", async () => {
    await specificationsRepository.create({
      name: "Specification name",
      description: "Specification description",
    });

    const specifications = await listSpecificationsUseCase.execute();
    expect(specifications.length).toEqual(1);
    expect(specifications[0]).toHaveProperty("name");
    expect(specifications[0]).toHaveProperty("description");
  });
});
