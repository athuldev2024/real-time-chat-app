import { Router } from "express";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      "C:/Users/athul/Desktop/main-project/mrbookshare/node-server-side/src/uploads"
    );
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/uploadprofile", upload.single("file"), (req, res) => {
  console.log(req.body);
  console.log(req.file);

  res.status(200).json({
    message: "File uploaded",
  });
});

export default router;
