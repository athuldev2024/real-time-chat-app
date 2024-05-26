import { Router } from "express";
import { errorHandler } from "@middleware/error-middleware";
import statusCodes from "@constants/status-codes";
import usersRouter from "./user-routes";
import uploadRouter from "./upload-routes";
import pingRouter from "./ping-routes";

const router = Router();

router.use("/api/users", usersRouter);
router.use("/api/uploads", uploadRouter);
router.use("/api/pings", pingRouter);

router.use((req, res) => {
  return res
    .status(statusCodes.NOT_FOUND)
    .json({ message: "Route not found." });
});

router.use(errorHandler);

export default router;
