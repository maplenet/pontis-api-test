import sessionService from "../services/session.service";

import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = req.body.customerId || req.params.customerId;

    // if (!customerId) {
    //   throw new Error("Customer ID es requerido");
    // }

    const sessionCookie = sessionService.getSession();

    if (!sessionCookie) {
      throw new Error("Sesión no encontrada. Debe hacer login primero");
    }

    req.headers.cookie = sessionCookie;
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export default authMiddleware;
