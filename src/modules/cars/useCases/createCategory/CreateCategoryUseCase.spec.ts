import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRespositoryInMemory";
import { AppError } from "@shared/errors/AppErrors";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRespositoryInMemory: CategoriesRepositoryInMemory;

describe("Create new category", () => {
  beforeAll(() => {
    categoriesRespositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRespositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category test",
      description: "Category description test",
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoriesRespositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with an existing name", async () => {
    expect(async () => {
      const category = {
        name: "Category test",
        description: "Category description test",
      };
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
