import express from "express";
import lineController from "../controllers/line.controller.js";

const router = express.Router();

router.post("/create", lineController.createLine);

export default router;