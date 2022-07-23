import { inject, injectable } from "tsyringe"
import { AppError } from "@shared/errors/AppErrors";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

interface IRequest {
	name: string;
	description: string;
}

@injectable()
class CreateSpecificationUseCase {
	constructor(
		@inject("SpecificationsRepository")
		private specificationsRepository: ISpecificationsRepository

	) { }

	async execute({ name, description }: IRequest): Promise<void> {
		const specificationExists = await this.specificationsRepository.findByName(name);

		if (specificationExists) {
			throw new AppError("Specification already exists in database");

		}
		this.specificationsRepository.create({
			name,
			description
		});
	}
}

export { CreateSpecificationUseCase }