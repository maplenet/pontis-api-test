import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import customerController from "../controllers/customer.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", customerController.createCustomer);
router.get("/:customerId", customerController.getCustomer);
router.put("/:customerId", customerController.updateCustomer);

export default router;