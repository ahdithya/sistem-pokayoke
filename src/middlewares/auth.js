const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const prisma = require("../configs/prisma");
require("dotenv").config();

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
      const isUser = await prisma.user.findUnique({
        where: {
          id: String(decoded.id),
        },
      });
      if (!isUser) {
        res.status(401);
        throw new Error("Not Authorized");
      }

      res.locals.user = isUser;
      console.log(res.locals.user);
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
  const isAdmin = res.locals.user;
  if (isAdmin.role !== "admin") {
    res.status(401);
    throw new Error("Not Authorized, Not Admin");
  }
  next();
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { authJWT, generateToken, adminOnly };
