const multer = require("multer");
const path = require("path")

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/img/avatars')
    },
    filename: function (req, file, cb) {
        let filename = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, filename);
    }

})

const uploadFile = multer({storage});

const multerMiddleware = uploadFile.single('image');

module.exports = multerMiddleware