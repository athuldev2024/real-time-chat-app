import { Router } from "express";
import multer from "multer";
import fs from "fs";

const router = Router();

const PATH =
  "C:/Users/athul/Desktop/main-project/mrbookshare/node-server-side/public";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/uploadprofile", upload.single("file"), (req, res) => {
  return res.status(200).json({
    message: "File uploaded",
  });
});

router.get("/retrieve", (req, res, next) => {
  try {
    const { filename } = req.query;
    const filePath = `${PATH}/${filename}`;

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "No file found",
      });
    }

    return res.status(200).sendFile(filePath);
  } catch (error) {
    next(error);
  }
});

export default router;
