import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import customerController from "../controllers/customer.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/create", customerController.createCustomer);
router.post("/getCustomer", customerController.getCustomer);
router.put("/:customerId", customerController.updateCustomer);
router.post("/delete", customerController.deleteCustomer);

export default router;