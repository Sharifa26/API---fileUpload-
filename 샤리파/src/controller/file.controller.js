const fs = require('fs');
const Uploadfile = require("../middleware/upload");




const upload = (async (req, res) => {
    try {
        await Uploadfile(req, res);
        if (req.file == undefined) {
            return res.status(400).send({ message: "please upload a file!!!" });
        }
        res.status(200).send({
            message: "Upload the file Successfully:" + req.file.originalname,
        });
    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 2MB!!!",
            });
        }
        res.status(500).send({
            message: `could not upload the file : ${req.file.originalname}.${err}`,
        });
    }
});


const getFile = (req, res) => {
    const directoryPath = __dirname + "/resources/static/assets/uploads/";

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files!!!",
            });
        }

        let fileInfos = [];

        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: baseUrl + file,
            });
        });

        res.status(200).send(fileInfos);
    });
};

const download = (req, res) => {
    const filename = req.params.name;
    const directoryPath = __dirname + "/resources/static/assets/uploads/";

    res.download(directoryPath + filename, filename, (err) => {
        if (err) {
            res.status(500).send({
                message: "could not Download the file." + err,
            });
        }
    });
};

module.exports = {upload,download,getFile,};
