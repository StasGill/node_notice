import express from "express";
import { getScore, sendScore } from "../controllers/irregular.js";

const router = express.Router();

router.get("/", getScore);
router.post("/", sendScore);

export default router;
