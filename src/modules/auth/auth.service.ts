import { AppDataSource } from "../../config/data-source";
import { User } from "./user.entity";
import { hashPassword, comparePassword } from "../../utils/hashPassword";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateTokens";

const userRepo = AppDataSource.getRepository(User);

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const existing = await userRepo.findOne({ where: { email } });
  if (existing) throw new Error("User already exists");

  const hashed = await hashPassword(password);

  const user = userRepo.create({ name, email, password: hashed });
  return await userRepo.save(user);
};

export const loginUser = async (email: string, password: string) => {
  const user = await userRepo.findOne({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const valid = await comparePassword(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await userRepo.save(user);

  return { accessToken, refreshToken };
};