import axios from "axios";
import https from "https";
import { config } from "../config/env";

const axiosInstance = axios.create({
  baseURL: config.ott.baseUrl,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

class LineService {
  static async executeRequest(method: string, action: string, params = {}) {
    try {
      const response = await axiosInstance({
        method,
        params: {
          ...params,
          api_key: config.ott.apiKey,
          action,
        },
      });

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`API request failed: ${error.message}`);
      } else {
        throw new Error("API request failed");
      }
    }
  }
}

export default LineService;
