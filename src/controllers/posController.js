const prisma = require("../configs/prisma");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");

const getAllPos = asyncHandler(async (req, res) => {
  try {
    const allPos = await prisma.pos.findMany();
    res.status(200).json({ data: allPos });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

const getOnePos = asyncHandler(async (req, res) => {
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
    const findOnePos = await prisma.pos.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!findOnePos) {
      res.status(404);
      throw new Error("Data tidak ditemukan");
    }
    res.status(200).json({ data: findOnePos });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

const createOnePos = asyncHandler(async (req, res) => {
  const { pos, description } = req.body;

  // const isError = validationResult(req);
  // if (!isError.isEmpty()) {
  //   res.status(400);
  //   throw {
  //     name: "Validation Error",
  //     message: isError.errors[0].msg,
  //     stack: isError.errors,
  //   };
  // }

  try {
    const createNewPos = await prisma.pos.create({
      data: {
        pos,
        description,
      },
    });
    res.status(201).json({ data: createNewPos });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

const updateOnePos = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { pos, description } = req.body;

  const isError = validationResult(req);
  if (!isError.isEmpty()) {
    res.status(400);
    throw {
      name: "Validation Error",
      message: isError.errors[0].msg,
      stack: isError.errors,
    };
  }
  const findOnePos = await prisma.pos.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!findOnePos) {
    res.status(404);
    throw new Error("Data tidak ditemukan");
  }

  try {
    const updateOnePos = await prisma.pos.update({
      where: {
        id: parseInt(id),
      },
      data: {
        pos,
        description,
      },
    });

    res.status(200).json({ data: updateOnePos });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

const deleteOnePos = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const findOnePos = await prisma.pos.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!findOnePos) {
    res.status(404);
    throw new Error("Data tidak ditemukan");
  }

  try {
    const deleteOnePos = await prisma.pos.delete({
      where: {
        id: parseInt(id),
      },
    });
    if (!deleteOnePos) {
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
  getAllPos,
  getOnePos,
  createOnePos,
  updateOnePos,
  deleteOnePos,
};
