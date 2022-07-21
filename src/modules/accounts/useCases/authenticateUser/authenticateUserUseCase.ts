import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppErrors";
import { IAuthenticateUserDTO } from "../../dtos/IAuthenticateUserDTO";
import { ITokenDTO } from "../../dtos/ITokenDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";


@injectable()
class AuthenticateUserUseCase {

	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) { }

	async execute({ email, password }: IAuthenticateUserDTO): Promise<ITokenDTO> {
		const user = await this.usersRepository.findByEmail(email)

		if (!user) {
			throw new AppError("Email or password incorrect.");
		}

		const isValidUser = compare(password, user.password);

		if (!isValidUser) {
			throw new AppError("Email or password incorrect.");;
		}

		const token = sign({}, "4e325a659675d10353727d6211db0cf8", {
			subject: user.id,
			expiresIn: "1d"
		});

		return {
			user: {
				name: user.name,
				email: user.email
			}, token
		};
	}
}

export { AuthenticateUserUseCase }