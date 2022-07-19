import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string,
    description: string
}

class CreateCategoryUseCase {

    constructor(private categoriesRespository: ICategoriesRepository) { }

    execute({ name, description }: IRequest): void {
        const categoryExists = this.categoriesRespository.findByName(name);

        if (categoryExists) {
            throw new Error("Category already exist in database.");
        }

        this.categoriesRespository.create({ name, description });
    }
}

export { CreateCategoryUseCase }