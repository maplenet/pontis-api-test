import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import customerController from "../controllers/customer.controller";

const router = express.Router();

router.use(authMiddleware);

router.post("/create", customerController.createCustomer);
router.get("/getCustomer/:customerId", customerController.getCustomer);
router.get("/getCustomers", customerController.getCustomers);
router.put("/:customerId", customerController.updateCustomer);
router.post("/delete", customerController.deleteCustomer);
router.put("/changePassword", customerController.changePassword);
router.delete("/deleteServices/:customerId", customerController.deleteServices);

export default router;
