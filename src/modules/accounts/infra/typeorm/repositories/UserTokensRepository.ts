import { getRepository, Repository } from "typeorm";

import { ICreateUserTokensDTO } from "@modules/accounts/dtos/ICreateUserTokensDTO";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";

import { UserTokens } from "../entities/UserTokens";

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

  async findByUserIdAndRefreshToken(
    userId: string,
    token: string
  ): Promise<UserTokens> {
    const usersToken = await this.userTokensRepository.findOne({
      user_id: userId,
      refresh_token: token,
    });

    return usersToken;
  }

  async deleteById(userId: string): Promise<void> {
    await this.userTokensRepository.delete(userId);
  }

  async findByRefreshToken(refreshToken: string): Promise<UserTokens> {
    const userToken = await this.userTokensRepository.findOne(refreshToken);
    return userToken;
  }
}

export { UserTokensRepository };
