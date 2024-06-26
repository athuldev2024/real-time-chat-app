import { Router } from "express";
import {
  loginUser,
  registerUser,
  deleteUser,
  updateUser,
  getAllUsersExceptMe,
} from "@controllers/user-controllers";
import {
  createUserValidationSchema,
  patchUserValidationSchema,
} from "@utils/validate-schema";
import { checkSchema, query, param, check } from "express-validator";
import { checkIfValidationErrors } from "@middleware/error-middleware";

const router = Router();

router.post(
  "/register",
  checkSchema(createUserValidationSchema),
  checkIfValidationErrors,
  registerUser
);

router.get(
  "/login",
  [
    query("mobile", "Invalid mobile").isString().notEmpty().optional(false),
    query("password", "Invalid password").isString().notEmpty().optional(false),
  ],
  checkIfValidationErrors,
  loginUser
);

router.delete(
  "/delete/:identifier",
  [
    param("identifier", "Invalid identifier")
      .isInt()
      .notEmpty()
      .optional(false),
  ],
  checkIfValidationErrors,
  deleteUser
);

router.patch(
  "/update/:identifier",
  [
    param("identifier", "Invalid identifier")
      .isInt()
      .notEmpty()
      .optional(false),
  ],
  checkSchema(patchUserValidationSchema),
  checkIfValidationErrors,
  updateUser
);

router.get(
  "/allusersexpectme/:identifier",
  [
    check("identifier", "Invalid identifier")
      .isInt()
      .notEmpty()
      .optional(false),
  ],
  checkIfValidationErrors,
  getAllUsersExceptMe
);

export default router;
