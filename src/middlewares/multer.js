const multer = require("multer");
// const fs = require("fs");

const uploadFile = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${__dirname}/../../public/files`);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
    },
  }),
  fileFilter: (req, res, cb) => {
    if (
      file.mimetype === "text/csv" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      cb(null, true);
    } else {
      cb(new Error("File type not supported."), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File deleted");
    }
  });
};

module.exports = { uploadFile };
