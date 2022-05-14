import express from "express";
import {
  addList,
  deleteList,
  getList,
  updateList,
} from "../controllers/list.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, addList);
router.get("/", auth, getList);
router.patch("/", auth, updateList);
router.delete("/:id", auth, deleteList);

export default router;
