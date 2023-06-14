const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const prisma = require("../configs/prisma");
require("dotenv").config();

const auth = asyncHandler((req, res, next) => {
  let token;
  token = req.headers.authorization.split(" ").pop();
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }

  try {
    const data = jwt.verify(token, process.env.JWT_KEY);
    const isUser = prisma.user.findUnique({
      where: {
        id: data.id,
      },
    });
    if (!isUser) {
      res.status(401);
      throw new Error("Not Authorized, no user");
    }

    req.user = isUser;
  } catch (err) {
    res.status(401);
    throw new Error(err);
  }

  next();
});

const authJWT = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ").pop();
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      console.log(decoded);
      const isUser = prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });
      if (!isUser) {
        res.status(401);
        throw new Error("Not Authorized");
      }

      req.user = isUser;
    } catch (err) {
      res.status(401);
      throw new Error(err);
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized!");
  }
  return next();
});

const adminOnly = (req, res, next) => {
  const isAdmin = req.user;
  if (isAdmin.role !== "admin") {
    res.status(401);
    throw new Error("Not Authorized, Not Admin");
  }
  next();
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

module.exports = { authJWT, generateToken, adminOnly };