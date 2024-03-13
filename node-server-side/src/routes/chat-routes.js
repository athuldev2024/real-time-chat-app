import { Router } from "express";
import { checkIfUserExists } from "@middleware/user-middleware";
import { authorize } from "@middleware/auth-middleware";
import { getAllUsers } from "@controllers/chat-controllers";
import { query } from "express-validator";

const router = Router();

router.all(authorize);

router.get(
  "/getAllUsers",
  [query("username", "Invalid username").isString().notEmpty().optional(false)],
  checkIfUserExists,
  getAllUsers
);

export default router;
