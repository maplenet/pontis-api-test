import axios from "axios";
import https from "https";
import { config } from "../config/env";

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

class ApiService {
  static async login(customerId: string, password: string) {
    try {
      const response = await axiosInstance.post(
        config.external.loginUrl,
        null,
        {
          params: {
            j_username: customerId,
            j_password: password,
          },
        }
      );

      const cookies = response.headers["set-cookie"];
      const sessionCookie = cookies
        ? cookies.find((cookie) => cookie.startsWith("JSESSIONID="))
        : undefined;

      return sessionCookie;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Login failed: ${error.message}`);
      } else {
        throw new Error("Login failed: Unknown error");
      }
    }
  }

  static async executeRequest(
    method: string,
    endpoint: string,
    data = {},
    cookies = ""
  ) {
    try {
      const response = await axiosInstance({
        method,
        url: `${config.external.apiBaseUrl}${endpoint}`,
        data,
        headers: {
          "Content-Type": "application/json",
          Cookie: cookies,
        },
      });

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`API request failed: ${error.message}`);
      } else {
        throw new Error("API request failed: Unknown error");
      }
    }
  }
}

export default ApiService;
