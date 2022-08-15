interface IAuthenticateUserDTO {
  email: string;
  password: string;
}

interface ITokenDTO {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refreshToken: string;
}

export { IAuthenticateUserDTO, ITokenDTO };
