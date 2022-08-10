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
}

export { IAuthenticateUserDTO, ITokenDTO };
