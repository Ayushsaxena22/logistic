const User = require("./auth.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const ALLOWED_ROLES = ["customer", "driver", "admin"];

const createUser = async (data) => {
  const username = data.username?.trim();
  const email = data.email?.trim().toLowerCase();
  const password = data.password;
  const role = (data.role || "customer").toLowerCase();

  if (!username || !email || !password) {
    throw new Error("All fields are required");
  }

  if (!ALLOWED_ROLES.includes(role)) {
    throw new Error("Invalid role");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email must be valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password should be strong");
  }

  const alreadyUser = await User.findOne({ email });
  if (alreadyUser) {
    throw new Error("User already exists");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashPassword,
    role,
  });

  return {
    userId: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
};

const goUser = async (data) => {
  const email = data.email?.trim().toLowerCase();
  const password = data.password;

  if (!email || !password) {
    throw new Error("All fields are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User does not exist");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Password is incorrect");
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    token,
    userId: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
};

module.exports = { createUser, goUser };
