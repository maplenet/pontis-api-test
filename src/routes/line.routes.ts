import express from "express";
import lineController from "../controllers/line.controller";

const router = express.Router();

router.post("/create", lineController.createLine);
router.get("/getCustomer/:idLine", lineController.getLine);
router.delete("/delete/:idLine", lineController.deleteLine);
router.put("/:username", lineController.updateLine);

export default router;
