import { Router } from "express";
import loggerHandler from "@middleware/logger-middleware";
import errorHandler, { noPageFound } from "@middleware/error-middleware";
import statusCodes from "@constants/status-codes";
import usersRouter from "./user-routes";

const router = Router();

router.use(loggerHandler);

router.use("/api/users", usersRouter);

router.use((req, res) => {
  return res.status(statusCodes.NOT_FOUND).json({ message: "Not Found." });
});

router.use(errorHandler);

export default router;
