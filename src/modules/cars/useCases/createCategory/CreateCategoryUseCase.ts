import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppErrors";

import { ICreateCategoryDTO } from "../../dtos/ICreateCategoryDTO";

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRespository: ICategoriesRepository
  ) {}

  async execute({ name, description }: ICreateCategoryDTO): Promise<void> {
    const categoryExists = await this.categoriesRespository.findByName(name);

    if (categoryExists) {
      throw new AppError("Category already exist in database.");
    }

    this.categoriesRespository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
