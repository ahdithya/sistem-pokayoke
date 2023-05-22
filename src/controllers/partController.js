const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const prisma = require("../configs/prisma");
// const { v4: uuidv4 } = require("uuid");

const getAllPart = asyncHandler(async (req, res) => {
  try {
    const allPart = await prisma.parts.findMany();
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
    const findOnePart = await prisma.parts.findUnique({
      where: {
        id,
      },
    });
    if (!findOnePart) {
      res.status(404);
      throw new Error("Data tidak ditemukan");
    }
    res.status(200).json(findOnePart);
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

const createOnePart = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

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
    const createNewPart = await prisma.parts.create({
      data: {
        name,
        description,
      },
    });
    res.status(200).json({ data: createNewPart });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

const updateOnePart = asyncHandler(async (req, res) => {
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
    const updatePart = await prisma.parts.update({
      where: {
        id,
      },
      data: req.body,
    });

    if (!updatePart) {
      res.status(404);
      throw new Error("Data tidak ditemukan");
    }

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
    const deletePart = await prisma.parts.delete({
      where: {
        id,
      },
    });

    if (!deletePart) {
      res.status(404);
      throw new Error("Data tidak ditemukan");
    }
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
