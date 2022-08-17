import { ICreateUserTokensDTO } from "../dtos/ICreateUserTokensDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUserTokensRepository {
  create({
    userId,
    refreshToken,
    expiresDate,
  }: ICreateUserTokensDTO): Promise<UserTokens>;

  findByUserIdAndRefreshToken(
    userId: string,
    token: string
  ): Promise<UserTokens>;

  deleteById(userId: string): Promise<void>;

  findByRefreshToken(refreshToken: string): Promise<UserTokens>;
}

export { IUserTokensRepository };
