
import { ENV } from "../config/env";
import { User } from "../modules/auth/user.entity";
import jwt, { SignOptions, Secret } from "jsonwebtoken";

const accessSecret: Secret = ENV.ACCESS_SECRET;
const refreshSecret: Secret = ENV.REFRESH_SECRET;
export const generateAccessToken = (user: User) => {
  const options: SignOptions = {
    expiresIn: ENV.ACCESS_EXPIRE as SignOptions["expiresIn"],
  };

  return jwt.sign(
    { id: user.id, email: user.email },
    accessSecret,
    options
  );
};

export const generateRefreshToken = (user: User) => {
  const options: SignOptions = {
    expiresIn: ENV.REFRESH_EXPIRE as SignOptions["expiresIn"],
  };

  return jwt.sign(
    { id: user.id },
    refreshSecret,
    options
  );
};