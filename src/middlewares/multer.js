const multer = require("multer");
const fs = require("fs");
const csv = require("csv-parser");

const uploadFile = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${__dirname}/../../public/files`);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "text/csv") {
      cb(null, true);
    } else {
      cb(new Error("File type not supported."), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

const parseCSV = async (file) => {
  try {
    const parsing = await new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(file.path)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", (error) => reject(error));
    });
    console.log(parsing);
    return parsing;
  } catch (err) {
    throw new Error("Error parsing CSV file");
  }
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File deleted");
    }
  });
};

module.exports = { uploadFile, parseCSV, deleteFile };
