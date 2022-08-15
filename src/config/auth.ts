import "dotenv/config";

export default {
  secretToken: process.env.SECRET_TOKEN,
  expiresIn: process.env.EXPIRES_IN,
  refreshToken: process.env.REFRESH_TOKEN,
  refreshTokenExpireIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
};
