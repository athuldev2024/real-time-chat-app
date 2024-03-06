import { Router } from "express";
import loggerHandler from "@middleware/logger-middleware";
import errorHandler, { noPageFound } from "@middleware/error-middleware";
import statusCodes from "@constants/status-codes";
import usersRouter from "./user-routes";
import uploadRouter from "./upload-routes";

const router = Router();

router.use(loggerHandler);

router.use("/api/users", usersRouter);
router.use("/api/uploads", uploadRouter);

router.use((req, res) => {
  return res.status(statusCodes.NOT_FOUND).json({ message: "Not Found." });
});

router.use(errorHandler);

export default router;
