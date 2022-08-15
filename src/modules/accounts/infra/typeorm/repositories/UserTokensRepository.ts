import { inject, injectable } from "tsyringe";
import { getRepository, Repository } from "typeorm";

import { ICreateUserTokensDTO } from "@modules/accounts/dtos/ICreateUserTokensDTO";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";

import { UserTokens } from "../entities/UserTokens";

@injectable()
class UserTokensRepository implements IUserTokensRepository {
  private userTokensRepository: Repository<UserTokens>;

  constructor() {
    this.userTokensRepository = getRepository(UserTokens);
  }

  async create({
    userId,
    refreshToken,
    expiresDate,
  }: ICreateUserTokensDTO): Promise<UserTokens> {
    const userTokens = this.userTokensRepository.create({
      user_id: userId,
      refresh_token: refreshToken,
      expires_date: expiresDate,
    });

    await this.userTokensRepository.save(userTokens);

    return userTokens;
  }
}

export { UserTokensRepository };
