import ApiService from "../services/api.service";
import sessionService from "../services/session.service";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  try {
    const { customer_id, password } = req.body;
    const sessionCookie = await ApiService.login(customer_id, password);

    sessionService.createSession(customer_id, sessionCookie);

    res.status(200).json({
      message: "Login exitoso",
      customer_id,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
