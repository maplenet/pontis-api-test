import sessionService from "../services/session.service.js";

const authMiddleware = (req, res, next) => {
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
    res.status(401).json({ error: error.message });
  }
};

export default authMiddleware;
