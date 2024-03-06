const multer = require("multer");
require("dotenv").config();

// Cấu hình Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log("req multer >>>>>", req);
        return cb(null, "./src/public/logoTeams");
    },
    filename: function (req, file, cb) {
        // console.log("file multer >>>>", file);
        return cb(null, `${Date.now()}_${file.originalname}`);
    },
});

export const upload = multer({
    storage: storage,
    limits: { fileSize: process.env.MAX_SIZE },
});

// upload avatar

const storageAvatar = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log("req multer >>>>>", req);
        return cb(null, "./src/public/avatarPlayers");
    },
    filename: function (req, file, cb) {
        // console.log("file multer >>>>", file);
        return cb(null, `${Date.now()}_${file.originalname}`);
    },
});

export const uploadAvatar = multer({
    storage: storageAvatar,
    limits: { fileSize: process.env.MAX_SIZE },
});

// upload match

const storageMatch = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log("req multer >>>>>", req);
        return cb(null, "./src/public/matchs");
    },
    filename: function (req, file, cb) {
        // console.log("file multer >>>>", file);
        return cb(null, `${Date.now()}_${file.originalname}`);
    },
});

export const uploadMatch = multer({
    storage: storageMatch,
    limits: { fileSize: process.env.MAX_SIZE_MATCH },
});
