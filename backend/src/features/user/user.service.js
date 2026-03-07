const bcrypt = require("bcrypt");

const User = require("../auth/auth.model");

exports.createUserService = async ({ fullName, companyName, companyEmail, password }) => {
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
  await User.create({
    fullName,
    companyName,
    companyEmail,
    password: hashedPassword,
  });
};
