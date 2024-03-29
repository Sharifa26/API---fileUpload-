const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;


let Strorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/resources/static/assets/uploads/");
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, file.originalname);
    },
});

let Uploadfile = multer({
    Strorage: Strorage,
    limits: { fileSize: maxSize },
}).single("file");


let fileUploadMiddleware = util.promisify(Uploadfile);
module.exports = fileUploadMiddleware;