import dotenv from "dotenv";
dotenv.config();

export const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  external: {
    baseUrl: process.env.EXTERNAL_BASE_URL,
    apiBaseUrl: process.env.EXTERNAL_API_BASE_URL,
    loginUrl: process.env.EXTERNAL_LOGIN_URL
  }
};