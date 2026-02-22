const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./auth.model");
const { JWT_SECRET } = require("../../config/env");

const generateToken = (email) => {
  return jwt.sign({ email }, JWT_SECRET, {
    expiresIn: "7d",
  });
};

exports.registerUserService = async ({ fullName, companyName, email, password }) => {
  // DB Read query
  // returns the user document (without password) if found, otherwise null
  const existing = await User.findOne({ email });
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
    email,
    password: hashedPassword,
  });

  const token = generateToken(user.email);

  return { 
    user: {
      fullName: user.fullName,
      companyName: user.companyName,
      email: user.email,
      role: user.role
    }, 
    token
  };
};

exports.loginUserService = async ({ email, password }) => {
  // DB Read query
  // returns the user document (with password) if found, otherwise null
  const user = await User.findOne({ email }).select("+password");

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

  const token = generateToken(user.email);

  return { 
    user: {
      fullName: user.fullName,
      companyName: user.companyName,
      email: user.email,
      role: user.role
    }, 
    token
  };
};
