import { Router } from "express";
import {
  loginUser,
  registerUser,
  deleteUser,
  updateUser,
  getUser,
} from "@controllers/user-controllers";
import {
  createUserValidationSchema,
  patchUserValidationSchema,
} from "@utils/validate-schema";
import { checkSchema, query, param, check } from "express-validator";

const router = Router();

router.post("/register", checkSchema(createUserValidationSchema), registerUser);
router.get(
  "/login",
  [
    query("mobile", "Invalid mobile").isString().notEmpty().optional(false),
    query("password", "Invalid password").isString().notEmpty().optional(false),
  ],
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
  updateUser
);
router.get(
  "/getuser",
  [
    check("identifier", "Invalid identifier")
      .isInt()
      .notEmpty()
      .optional(false)
      .exists(),
  ],
  getUser
);

export default router;
