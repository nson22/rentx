interface ICreateUserTokensDTO {
  userId: string;
  refreshToken: string;
  expiresDate: Date;
}

export { ICreateUserTokensDTO };
