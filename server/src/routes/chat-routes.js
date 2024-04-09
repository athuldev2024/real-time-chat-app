import { Router } from "express";
import { checkIfUserExists } from "@middleware/user-middleware";
import { authorize } from "@middleware/auth-middleware";
import {
  getAllUsers,
  sendMessage,
  fetchMessages,
} from "@controllers/chat-controllers";
import { query, param, checkSchema } from "express-validator";
import { chatValidationSchema } from "@utils/validate-schema";
const router = Router();

router.all(authorize);

router.get(
  "/getAllUsers",
  [query("username", "Invalid username").isString().notEmpty().optional(false)],
  checkIfUserExists,
  getAllUsers
);

router.post("/sendmessage", checkSchema(chatValidationSchema), sendMessage);

router.get(
  "/fetchmessages/:myid/:hisid",
  [
    param("myid", "Invalid my identifier").isInt().notEmpty().optional(false),
    param("hisid", "Invalid others identifier")
      .isInt()
      .notEmpty()
      .optional(false),
  ],
  fetchMessages
);

export default router;
