var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require("fs");
const fileData = require('../model/file');


multer({ dest: './src/uploads/' });
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage });

router.use(express.static('./src/uploads'));
router.post('/file-upload', upload.any(), (req, res, next) => {
    console.log(req.params, 'Body');
    console.log(req.files, 'files');
    res.send("img upload");
    res.end();
});

router.post('/uploadphoto', upload.single('picture'), (req, res) => {
    console.log(req.params, 'Body');
    console.log(req.file, 'files');
    
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    const fileData1 = new fileData({
        contentType: req.file.mimetype,
        image: new Buffer.from(encode_image, 'base64')
    });

    fileData1.save()
        .then(item => {
            res.send("file saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
})


module.exports = router;
