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
import { checkSchema, query, param } from "express-validator";
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
    query("username").isString().notEmpty().optional(false),
    query("password").isString().notEmpty().optional(false),
  ],
  checkIfUserExists,
  loginUser
);

router.all("/authenticate/:code", authenticate);
router.all(["/update/:mobile", "/delete/:mobile"], authorize);

router.patch(
  "/update/:mobile",
  [
    checkSchema(patchUserValidationSchema),
    param("mobile").isString().optional(false).isLength({
      min: 9,
      max: 10,
    }),
  ],
  checkIfUserExists,
  updateUser
);

router.delete(
  "/delete/:mobile",
  [
    param("mobile").isString().optional(false).isLength({
      min: 9,
      max: 10,
    }),
  ],
  checkIfUserExists,
  deleteUser
);

router.get(
  "/getuser",
  [query("username").isString().notEmpty().optional(false)],
  getUser
);

export default router;
