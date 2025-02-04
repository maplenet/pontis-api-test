import axios from "axios";
import https from "https";
import { config } from "../config/env.js";

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

class ApiService {
  static async login(customerId, password) {
    try {
      console.log("customerId", config.external.loginUrl);
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

      const sessionCookie = response.headers["set-cookie"].find((cookie) =>
        cookie.startsWith("JSESSIONID=")
      );

      return sessionCookie;
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  }

  static async executeRequest(method, endpoint, data = {}, cookies = "") {
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
      throw new Error(`API request failed: ${error.message}`);
    }
  }
}

export default ApiService;
