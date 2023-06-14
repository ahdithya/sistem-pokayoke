const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const prisma = require("../configs/prisma");
// const { v4: uuidv4 } = require("uuid");

const getAllPart = asyncHandler(async (req, res) => {
  try {
    const allPart = await prisma.part.findMany({
      select: {
        id: true,
        part_no: true,
        part_name: true,
      },
    });
    res.status(200).json({ data: allPart });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

const getOnePart = asyncHandler(async (req, res) => {
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
    const findOnePart = await prisma.part.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!findOnePart) {
      res.status(404);
      throw new Error("Data tidak ditemukan");
    }
    res.status(200).json({ data: findOnePart });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

const createOnePart = asyncHandler(async (req, res) => {
  const { part_no, part_name } = req.body;

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
    const createNewPart = await prisma.part.create({
      data: {
        part_no,
        part_name,
      },
    });
    res.status(201).json({ data: createNewPart });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

const updateOnePart = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { part_name, part_no } = req.body;

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
    const findOnePart = await prisma.part.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!findOnePart) {
      res.status(404);
      throw new Error("Data tidak ditemukan");
    }

    const updatePart = await prisma.part.update({
      where: {
        id: parseInt(id),
      },
      data: {
        part_no,
        part_name,
      },
    });

    res.status(200).json({ data: updatePart });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

const deleteOnePart = asyncHandler(async (req, res) => {
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
    const findOnePart = await prisma.part.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!findOnePart) {
      res.status(404);
      throw new Error("Data tidak ditemukan");
    }
    const deletePart = await prisma.part.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({ message: "Data berhasil dihapus!" });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

module.exports = {
  getAllPart,
  getOnePart,
  createOnePart,
  updateOnePart,
  deleteOnePart,
};
