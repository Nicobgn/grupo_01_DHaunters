const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      path.join(__dirname, "/../../public/images/products/", req.body.tier, "/")
    );
  },
  filename: (req, file, cb) => {
    const multerFileName = `${formattedDate}-${file.originalname}`;

    cb(null, multerFileName);
  },
});
const uploadFile = multer({ storage });

module.exports = uploadFile;
