const multer = require("multer");
const path = require("path");
const formattedDate = require("../other/formattedDate");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.body);
    cb(
      null,
      path.join(__dirname, `/../../../public/img/products/${req.body.tier}/`)
    );
  },
  filename: (req, file, cb) => {
    const multerFileName = `${formattedDate}-${file.originalname}`;

    cb(null, multerFileName);
  },
});
const uploadFile = multer({ storage });

const upload = uploadFile.single("img");

module.exports = upload;
