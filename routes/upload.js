const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path');
const isAuth = require('../middlewares/isAuth');
const router = express.Router();

//IMAGE UPLOADS

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

const certificatesFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(null, false)
    }
}

const certificatesStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const reqPath = path.join(__dirname, '..', 'images', 'certificates')
        if (!fs.existsSync(reqPath)) {
            fs.mkdirSync(reqPath, { recursive: true })
        }
        cb(null, reqPath)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})


const profileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const reqPath = path.join(__dirname, '..', 'images', 'profile')
        if (!fs.existsSync(reqPath)) {
            fs.mkdirSync(reqPath, { recursive: true })
        }
        cb(null, reqPath)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})



const donationsStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const reqPath = path.join(__dirname, '..', 'images', 'donations')
        if (!fs.existsSync(reqPath)) {
            fs.mkdirSync(reqPath, { recursive: true })
        }
        cb(null, reqPath)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})


const postsStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const reqPath = path.join(__dirname, '..', 'images', 'posts')
        if (!fs.existsSync(reqPath)) {
            fs.mkdirSync(reqPath, { recursive: true })
        }
        cb(null, reqPath)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})


const uploadCertificates = multer({
    storage: certificatesStorage,
    limits: {
        fieldSize: 3000000
    },
    fileFilter: certificatesFilter
})


const uploadProfile = multer({
    storage: profileStorage,
    limits: {
        fieldSize: 3000000
    },
    fileFilter: imageFilter
})

const uploadPosts = multer({
    storage: postsStorage,
    limits: {
        fieldSize: 3000000
    },
    fileFilter: imageFilter
})

const uploadDonations = multer({
    storage: donationsStorage,
    limits: {
        fieldSize: 3000000
    },
    fileFilter: imageFilter
})

router.post('/certificates', uploadCertificates.single('file'),
    (req, res) => {
        res.json({
            "location": `/images/certificates/${req.file.filename}`, "originalName": req.file.originalname
        })
    }
)

router.post('/profile-', [isAuth, uploadProfile.single('file')],
    async (req, res) => {
        //Update the User Model, create an avatar etc.
        //Get  userid from isAuth
        res.json("profile pic updated")
    }

)

router.post('/donations', uploadDonations.single('file'),
    (req, res) => {
        res.json({
            "location": `/images/donations/${req.file.filename}`, "originalName": req.file.originalname
        })
    }

)

router.post('/posts', uploadPosts.single('file'),
    (req, res) => {
        res.json({
            "location": `/images/posts/${req.file.filename}`, "originalName": req.file.originalname
        })
    }

)

module.exports = router;
