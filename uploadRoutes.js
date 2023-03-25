import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

const __dirname = path.resolve();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname + "/public/images/products/"));
  },
  filename: (req, file, cb) => {
    // console.log(file, req)
    cb(
      null, file.originalname
    );
  },
});


function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.array("product"), (req, res) => {
  try {
    if (req.files.length === 1) {
      res.send(`/${req.file.path}`);
    } else if (req.files.length > 1) {
      res.status(201).json({
        data: null,
        success: true,
        message: ""
      })
    }
  } catch(err) {
    res.status(400).json({
      data: null,
      success: false,
      message: ""
    })
  }
});

export default router;
