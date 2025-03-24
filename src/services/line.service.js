import axios from "axios";
import https from "https";
import { config } from "../config/env.js";

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

class LineService {
  static async executeRequest(method, action, params = {}) {
    try {
      const response = await axiosInstance({
        method,
        url: `${config.ott.baseUrl}`,
        params: {
          ...params,
          api_key: config.ott.apiKey,
          action: action,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(`API request failed: ${error.message}`);
    }
  }
}

export default LineService;