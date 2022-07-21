import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../errors/AppErrors";

@injectable()
class CreateUserUserCase {

	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) { }

	async execute({
		name,
		email,
		password,
		driver_license
	}: ICreateUsersDTO): Promise<void> {
		const userEmailExists = await this.usersRepository.findByEmail(email);

		if (userEmailExists) {
			throw new AppError("User already exists.");
		}

		const passwordHash = await hash(password, 8);

		await this.usersRepository.create({
			name,
			email,
			password: passwordHash,
			driver_license
		})
	};
}

export { CreateUserUserCase }
