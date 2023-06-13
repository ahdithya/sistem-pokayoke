const prisma = require("../configs/prisma");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const fs = require("fs");
const csv = require("csv-parser");
const { connect } = require("http2");

const createWorkOrder = asyncHandler(async (req, res) => {
  const { unique, id_pos, id_part } = req.body;
  const user = req.user;

  const isError = validationResult(req);
  if (!isError.isEmpty()) {
    res.status(400);
    throw {
      name: "Validation Error",
      message: isError.errors[0].msg,
      stack: isError.errors,
    };
  }

  try {
    const createWorkOrder = await prisma.workOrder.create({
      data: {
        unique,
        pos: {
          connect: { id: id_pos },
        },
        part: {
          connect: { id: id_part },
        },
        user: {
          connect: { id: user.id },
        },
      },
    });
    res.status(200).json({ data: createWorkOrder });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

const uploadOrder = asyncHandler(async (req, res) => {
  const file = req.files;

  const isError = validationResult(req);
  if (!isError.isEmpty()) {
    res.status(400);
    throw {
      name: "Validation Error",
      message: isError.errors[0].msg,
      stack: isError.errors,
    };
  }

  if (file.mimetype === "text/csv") {
    const parsing = [];
    fs.createReadStream(file.path)
      .pipe(csv())
      .on("data", (row) => parsing.push(row))
      .on("end", () =>
        asyncHandler(async (req, res) => {
          console.log(parsing);

          try {
            const createdData = await prisma.file_upload.create({
              data: {
                file_name: file.originalname,
                file_mime: file.mimetype,
                file_original: file.originalname,
                file_path: file.path,
                file_extension: file.originalname.split(".").pop(),
                type: "csv", // Tipe file yang sesuai dengan kebutuhan Anda
                data: JSON.stringify(parsing), // Mengubah array hasil parsing menjadi string JSON
              },
            });
            console.log("Data created:", createdData);
            res.status(200).json({
              message: "File uploaded and data created successfully.",
            });
          } catch (error) {
            console.error("Error creating data:", error);
            res.status(500).json({ message: "Error creating data from file." });
          }
        })
      );
  } else {
    res.status(400);
    throw new Error("Invalid file format. Only CSV files are supported.");
  }
});

module.exports = { uploadOrder, createWorkOrder };
