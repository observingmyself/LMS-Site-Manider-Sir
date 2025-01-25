import multer from "multer";
import path from "path"
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public', 'temp'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    let spliting = file.originalname.split(".", 2)
    let fileName = spliting[0] + "-" + uniqueSuffix + "." + spliting[1];
    cb(null, fileName)
  }
})

export const upload = multer({ storage: storage })
