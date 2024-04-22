import { Router } from "express";
import errorHandler from "@middleware/error-middleware";
import statusCodes from "@constants/status-codes";
import usersRouter from "./user-routes";

const router = Router();

router.use("/api/users", usersRouter);

router.use((req, res) => {
  return res
    .status(statusCodes.NOT_FOUND)
    .json({ message: "Route not found." });
});

router.use(errorHandler);

export default router;
