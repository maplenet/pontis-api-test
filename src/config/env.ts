import dotenv from "dotenv";
dotenv.config();

export const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  external: {
    baseUrl: process.env.EXTERNAL_BASE_URL || "http://localhost:3000",
    apiBaseUrl: process.env.EXTERNAL_API_BASE_URL,
    loginUrl: process.env.EXTERNAL_LOGIN_URL || "http://localhost:3000/login",
  },
  ott: {
    baseUrl: process.env.OTT_BASE_URL,
    apiKey: process.env.OTT_API_KEY,
  },
};
