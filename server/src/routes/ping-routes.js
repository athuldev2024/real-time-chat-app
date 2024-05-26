import { Router } from "express";
import { sendMessage, fetchmessages } from "@controllers/ping-controllers";
import { checkSchema, query } from "express-validator";
import { pingValidationSchema } from "@utils/validate-schema";
import { checkIfValidationErrors } from "@middleware/error-middleware";
const router = Router();

router.post("/sendmessage", checkSchema(pingValidationSchema), sendMessage);

router.get(
  "/fetchmessages",
  [query("sender", "Invalid sender").isString().notEmpty().optional(false)],
  [query("receiver", "Invalid receiver").isString().notEmpty().optional(false)],
  checkIfValidationErrors,
  fetchmessages
);

export default router;
