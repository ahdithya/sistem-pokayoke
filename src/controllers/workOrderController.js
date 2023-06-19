const prisma = require("../configs/prisma");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { parseCSV, deleteFile } = require("../middlewares/multer");

const getAllWorkOrder = asyncHandler(async (req, res) => {
  try {
    const getAllWorkOrder = await prisma.workOrder.findMany({
      // select: {
      //   id: true,
      //   unique: true,
      //   pos: {
      //     select: {
      //       pos: true,
      //     },
      //   },
      //   part: {
      //     select: {
      //       part_no: true,
      //       part_name: true,
      //     },
      //   },
      //   user: {
      //     select: {
      //       name: true,
      //     },
      //   },
      // },
    });
    res.status(200).json({ data: getAllWorkOrder });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

const getOneWorkOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

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
    const findOneWorkOrder = await prisma.workOrder.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        unique: true,
        pos: {
          select: {
            pos: true,
          },
        },
        part: {
          select: {
            part_no: true,
            part_name: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
        fileUpload: {
          select: {
            data: true,
          },
        },
      },
    });

    if (!findOneWorkOrder) {
      res.status(404);
      throw new Error("Data tidak ditemukan");
    }

    res.status(200).json({ data: findOneWorkOrder });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

const createWorkOrder = asyncHandler(async (req, res) => {
  const { unique, id_pos, id_part } = req.body;
  const file = req.file;
  const user = res.locals.user;

  const isError = validationResult(req);
  if (!isError.isEmpty()) {
    res.status(400);
    throw {
      name: "Validation Error",
      message: isError.errors[0].msg,
      stack: isError.errors,
    };
  }

  if (file.mimetype !== "text/csv") {
    res.status(400);
    throw new Error("File must be CSV");
  }

  try {
    const createWorkOrder = await prisma.$transaction(async () => {
      const parsing = await parseCSV(file);
      const uploadFile = await prisma.fileUpload.create({
        data: {
          id_user: user.id,
          file_name: file.originalname,
          file_mime: file.mimetype,
          file_original: file.originalname,
          file_path: file.path,
          file_extension: file.originalname.split(".").pop(),
          type: "csv",
          data: parsing,
        },
      });

      const dataWorkOrder = await prisma.workOrder.create({
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
          fileUpload: {
            connect: { id: uploadFile.id },
          },
        },
        select: {
          id: true,
          unique: true,
          // pos: {
          //   select: {
          //     pos: true,
          //   },
          // },
          // part: {
          //   select: {
          //     part_no: true,
          //     part_name: true,
          //   },
          // },
          // user: {
          //   select: {
          //     name: true,
          //   },
          // },
          fileUpload: {
            select: {
              data: true,
            },
          },
        },
      });
      return dataWorkOrder;
    });

    res.status(200).json({ data: createWorkOrder });
  } catch (err) {
    deleteFile(file.path);
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

const deleteOneWorkOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
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
    const deleteWorkOrder = await prisma.workOrder.delete({
      where: {
        id: id,
      },
      include: {
        fileUpload: true,
      },
    });

    if (!deleteWorkOrder) {
      res.status(404);
      throw new Error("Data tidak ditemukan");
    }
    if (deleteWorkOrder.fileUpload) {
      await prisma.fileUpload.delete({
        where: {
          id: deleteWorkOrder.fileUpload.id,
        },
      });
      deleteFile(deleteWorkOrder.fileUpload.file_path);
    }

    res.status(200).json({ message: "Data berhasil dihapus!" });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});
module.exports = {
  // uploadOrder,
  createWorkOrder,
  getAllWorkOrder,
  getOneWorkOrder,
  deleteOneWorkOrder,
};
