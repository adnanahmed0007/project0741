import express from "express";
import C1 from "../controllers/C1.js";
const router = express.Router();
router.post("/process-names", C1);
export default router;