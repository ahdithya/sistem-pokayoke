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
      fs.createReadStream(file.path, "utf-8")
        .pipe(csv({ separator: "," }))
        .on("data", (data) => {
          // Ubah format tanggal menjadi YYYY-MM-DD HH:mm:ss
          const dateTime = data["Date & Time"];
          const [date, time] = dateTime.split(" - ");
          const [day, month, year] = date.split("/");
          const [hours, minutes] = time.split(":")[0].split(".");
          const formattedDate = `20${year}-${month}-${day} ${hours}:${minutes}:00`;

          // Tambahkan properti baru dengan format tanggal yang telah diubah
          const parsedData = {
            ...data,
            dataTime: formattedDate,
          };

          results.push(parsedData);
        })
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
