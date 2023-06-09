const prisma = require("../configs/prisma");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { generateToken } = require("../middlewares/auth");
const bcrypt = require("bcrypt");

const getAllUser = asyncHandler(async (req, res) => {
  const isError = validationResult(req);
  if (!isError.isEmpty()) {
    res.status(400);
    throw {
      type: "Validation Error",
      message: isError.errors[0].msg,
      stack: isError.errors,
    };
  }

  try {
    const allUser = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
      },
    });
    res.status(200).json({ data: allUser });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

const CreateUser = asyncHandler(async (req, res) => {
  const { name, username, password, role, email } = req.body;

  const isError = validationResult(req);
  if (!isError.isEmpty()) {
    res.status(400);
    throw {
      type: "Validation Error",
      message: isError.errors[0].msg,
      stack: isError.errors,
    };
  }

  try {
    const isEmailExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    const isUsernameExist = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (isEmailExist) {
      res.status(400);
      throw new Error("Email already exist");
    } else if (isUsernameExist) {
      res.status(400);
      throw new Error("Username already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const createNewUser = await prisma.user.create({
      data: {
        name,
        username,
        password: hashedPassword,
        role,
        email,
      },
      select: {
        name: true,
        username: true,
        email: true,
      },
    });
    res.status(201).json({ data: createNewUser });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const isError = validationResult(req);
  if (!isError.isEmpty()) {
    res.status(400);
    throw {
      type: "Validation Error",
      message: isError.errors[0].msg,
      stack: isError.errors,
    };
  }

  try {
    const isUserExist = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (!isUserExist) {
      res.status(400);
      throw new Error("Username not found");
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserExist.password
    );
    if (!isPasswordMatch) {
      res.status(400);
      throw new Error("Password wrong!!");
    }
    const token = generateToken(isUserExist.id);

    res.status(200).json({
      message: "Login Success!",
      data: {
        token,
      },
    });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// const updateUser = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const { name, username, email } = req.body;

//   const isError = validationResult(req);
//   if (!isError.isEmpty()) {
//     res.status(400);
//     throw {
//       type: "Validation Error",
//       message: isError.errors[0].msg,
//       stack: isError.errors,
//     };
//   }

//   try {
//     const findUser = await prisma.user.findUnique({
//       where: id,
//     });
//     if (!findUser) {
//       res.status(404);
//       throw new Error("Data tidak ditemukan");
//     }

//     const updatedUser = await prisma.user.update({
//       where: {
//         id: id,
//       },
//       data: {
//         name,
//         username,
//         password,
//         email,
//       },
//     });
//     res.status(200).json({
//       data: updatedUser,
//     });
//   } catch (err) {
//     if (!res.status) res.status(500);
//     throw new Error(err);
//   }
// });

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const isError = validationResult(req);
  if (!isError.isEmpty()) {
    res.status(400);
    throw {
      type: "Validation Error",
      message: isError.errors[0].msg,
      stack: isError.errors,
    };
  }

  try {
    const findUser = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!findUser) {
      res.status(404);
      throw new Error("Data tidak ditemukan");
    }

    const deleteUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json({ message: "Data berhasil dihapus!" });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});
module.exports = { CreateUser, getAllUser, loginUser, deleteUser };
