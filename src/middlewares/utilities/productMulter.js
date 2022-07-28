const multer = require("multer");
const path = require("path");
const formattedDate = require("../other/formattedDate");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, `/../../../public/img/products/`));
  },
  filename: (req, file, cb) => {
    const multerFileName = `${req.body.tier}/${formattedDate}-${file.originalname}`;

    cb(null, multerFileName);
  },
});
const uploadFile = multer({ storage });

const upload = uploadFile.single("img");

module.exports = upload;
