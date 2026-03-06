const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./auth.model");
const { JWT_SECRET } = require("../../config/env");

const generateToken = (companyEmail) => {
  return jwt.sign({ companyEmail }, JWT_SECRET, {
    expiresIn: "7d",
  });
};

exports.registerUserService = async ({ fullName, companyName, companyEmail, password }) => {
  // DB Read query
  // returns the user document (without password: see model file) if found, otherwise null
  const existing = await User.findOne({ companyEmail });
  if (existing) {
    const err = new Error("User already exists");
    err.statusCode = 400;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // DB Create query
  // returns the saved user document with the hashed password
  const user = await User.create({
    fullName,
    companyName,
    companyEmail,
    password: hashedPassword,
  });

  const token = generateToken(user.companyEmail); // JWT token string

  return { 
    user: {
      fullName: user.fullName,
      companyName: user.companyName,
      companyEmail: user.companyEmail,
      role: user.role
    }, 
    token
  };
};

exports.loginUserService = async ({ companyEmail, password }) => {
  // DB Read query
  // returns the user document (with password) if found, otherwise null
  const user = await User.findOne({ companyEmail }).select("+password");

  if (!user) {
    const err = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const err = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  const token = generateToken(user.companyEmail); // JWT token string

  return { 
    user: {
      fullName: user.fullName,
      companyName: user.companyName,
      companyEmail: user.companyEmail,
      role: user.role
    }, 
    token
  };
};
