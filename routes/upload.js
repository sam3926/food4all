const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const router = express.Router();

//IMAGE UPLOADS

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const reqPath = path.join(__dirname, '..', 'images')
        if (!fs.existsSync(reqPath)) {
            fs.mkdirSync(reqPath, { recursive: true })
        }
        cb(null, reqPath)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const imageFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const uploadImage = multer({
    storage: imageStorage,
    limits: {
        fieldSize: 3000000
    },
    fileFilter: imageFilter
})

//All Image Uploads. Can put multiple routes if needed
router.post('/', uploadImage.single('file'),
    (req, res) => {
        res.json({
            "location": `http://localhost:8000/images/${req.file.filename}`, "originalName": req.file.originalname
        })
    }
)

module.exports = router;
