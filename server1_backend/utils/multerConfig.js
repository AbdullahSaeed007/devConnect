// multerConfig.js

const multer = require("multer");
const path = require("path");

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the absolute path to the avatars folder
    cb(
      null,
      "C:\\Users\\jannie\\Desktop\\fyp\\Dev_practice\\Dev_connect\\backend\\backend\\images\\avatars"
    );
  },
  filename: function (req, file, cb) {
    // Generate unique file name
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize multer
const upload = multer({ storage });

module.exports = upload;
