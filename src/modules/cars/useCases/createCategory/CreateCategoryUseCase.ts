import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string,
    description: string
}

class CreateCategoryUseCase {

    constructor(private categoriesRespository: ICategoriesRepository) { }

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryExists = await this.categoriesRespository.findByName(name);

        if (categoryExists) {
            throw new Error("Category already exist in database.");
        }

        this.categoriesRespository.create({ name, description });
    }
}

export { CreateCategoryUseCase }