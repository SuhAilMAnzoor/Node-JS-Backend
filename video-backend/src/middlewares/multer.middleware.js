import multer from "multer";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
    // TODO: minor changes when you complete your project
    }
})

const upload = multer({ storage: storage })