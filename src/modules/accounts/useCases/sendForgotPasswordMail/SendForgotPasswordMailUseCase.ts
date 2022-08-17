import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppErrors";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,

    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider,

    @inject("EtherealMailProvider")
    private etherealMailProvider: IMailProvider
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    const hoursToExpire = 3;

    if (!user) {
      throw new AppError("User does not exists");
    }
    const token = uuidv4();

    const templateEmailPath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "ForgotPassword.hbs"
    );

    const params = {
      name: user.name,
      link: `${process.env.FORGOT_EMAIL_URL}${token}`,
    };

    const expiresDate = this.dayjsDateProvider.addHours(hoursToExpire);

    await this.userTokensRepository.create({
      refreshToken: token,
      userId: user.id,
      expiresDate,
    });

    this.etherealMailProvider.sendEmail(
      email,
      "Recupeção de senha",
      params,
      templateEmailPath
    );
  }
}

export { SendForgotPasswordMailUseCase };
