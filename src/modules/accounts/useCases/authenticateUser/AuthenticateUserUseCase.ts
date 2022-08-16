import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppErrors";

import auth from "../../../../config/auth";
import { IAuthenticateUserDTO, ITokenDTO } from "./IAuthenticateUserDTO";

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository
  ) {}

  async execute({ email, password }: IAuthenticateUserDTO): Promise<ITokenDTO> {
    const user = await this.usersRepository.findByEmail(email);
    const days = new DayjsDateProvider();

    if (!user) {
      throw new AppError("Email or password incorrect.");
    }

    const passwordMatch = compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect.");
    }

    const refreshToken = sign({ email }, auth.secret_refresh_token, {
      subject: user.id,
      expiresIn: auth.expires_in_refresh_token,
    });

    await this.userTokensRepository.create({
      userId: user.id,
      refreshToken,
      expiresDate: days.addDays(30),
    });

    const token = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token,
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refreshToken,
    };
  }
}

export { AuthenticateUserUseCase };
