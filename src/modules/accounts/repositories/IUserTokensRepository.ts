import { ICreateUserTokensDTO } from "../dtos/ICreateUserTokensDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUserTokensRepository {
  create({
    userId,
    refreshToken,
    expiresDate,
  }: ICreateUserTokensDTO): Promise<UserTokens>;
}

export { IUserTokensRepository };
