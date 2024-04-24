import { Router } from "express";
import multer from "multer";
import path from "path";
import {
  userUploadSingleFile,
  previewSingleFile,
} from "@controllers/upload-controllers";
import { checkIfValidationErrors } from "@middleware/error-middleware";
import { param } from "express-validator";

const router = Router();

const PATH = path.join(__dirname, "..", "..", "public");

console.log("DIRECTORY: ", PATH);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/uploadsingle/:identifier",
  [
    param("identifier", "Invalid identifier")
      .isInt()
      .notEmpty()
      .optional(false),
  ],
  checkIfValidationErrors,
  upload.single("file"),
  userUploadSingleFile
);

router.get("/previewsingle/:identifier", [
  param("identifier", "Invalid identifier").isInt().notEmpty().optional(false),
  checkIfValidationErrors,
  previewSingleFile,
]);

export default router;
