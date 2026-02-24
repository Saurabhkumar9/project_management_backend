import dotenv from "dotenv";


dotenv.config();

if (!process.env.JWT_ACCESS_SECRET) {
  throw new Error("JWT_ACCESS_SECRET missing");
}

if (!process.env.JWT_REFRESH_SECRET) {
  throw new Error("JWT_REFRESH_SECRET missing");
}

export const ENV = {
  PORT: process.env.PORT || "4000",
  ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  ACCESS_EXPIRE: process.env.ACCESS_TOKEN_EXPIRE || "15m",
  REFRESH_EXPIRE: process.env.REFRESH_TOKEN_EXPIRE || "7d",
};