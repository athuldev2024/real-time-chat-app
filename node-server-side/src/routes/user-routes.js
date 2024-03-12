import { Router } from "express";
import { checkIfUserExists } from "@middleware/user-middleware";
import { authenticate, authorize } from "@middleware/auth-middleware";
import {
  loginUser,
  registerUser,
  deleteUser,
  updateUser,
  getUser,
} from "@controllers/user-controllers";
import { checkSchema, query, param, check } from "express-validator";
import {
  createUserValidationSchema,
  patchUserValidationSchema,
} from "@utils/validate-schema";

const router = Router();

router.post(
  "/register",
  checkSchema(createUserValidationSchema),
  checkIfUserExists,
  registerUser
);

router.get(
  "/login",
  [
    query("username", "Invalid username").isString().notEmpty().optional(false),
    query("password", "Invalid password").isString().notEmpty().optional(false),
  ],
  checkIfUserExists,
  loginUser
);

router.all("/authenticate/:code/:id", authenticate);
router.all(["/update/:id", "/delete/:id", "/getuser"], authorize);

router.patch(
  "/update/:id",
  [param("id", "Invalid ID").isInt().notEmpty().optional(false)],
  checkSchema(patchUserValidationSchema),
  checkIfUserExists,
  updateUser
);

router.delete(
  "/delete/:id",
  [param("id", "Invalid ID").isInt().notEmpty().optional(false)],
  checkIfUserExists,
  deleteUser
);

router.get(
  "/getuser",
  [check("id", "Invalid ID").isInt().notEmpty().optional(false).exists()],
  checkIfUserExists,
  getUser
);

export default router;
