import { Router } from "express";
// import { uploadProfile } from "@controllers/upload-controllers";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// router.post("/uploadprofile", upload.single("file"), uploadProfile);

router.post("/uploadprofile", upload.single("file"), (req, res) => {
  console.log(req.body);
  console.log(req.file);

  res.status(200).json({
    message: "File uploaded",
  });
});

export default router;
