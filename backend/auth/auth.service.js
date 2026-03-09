const User = require("./auth.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const ALLOWED_ROLES = ["customer", "driver", "admin"];

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtpEmail = async (to, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Your Password Reset OTP",
    html: `
      <h2>Password Reset OTP</h2>
      <p>Your OTP is: <b>${otp}</b></p>
      <p>This OTP will expire in 10 minutes.</p>
    `,
  });
};

const createUser = async (data) => {
  const username = data.username?.trim();
  const email = data.email?.trim().toLowerCase();
  const password = data.password;
  const role = (data.role || "customer").toLowerCase();

  if (!username || !email || !password) throw new Error("All fields are required");
  if (!ALLOWED_ROLES.includes(role)) throw new Error("Invalid role");
  if (!validator.isEmail(email)) throw new Error("Email must be valid");
  if (!validator.isStrongPassword(password)) throw new Error("Password should be strong");

  const alreadyUser = await User.findOne({ email });
  if (alreadyUser) throw new Error("User already exists");

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

  if (!email || !password) throw new Error("All fields are required");

  const user = await User.findOne({ email });
  if (!user) throw new Error("User does not exist");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Password is incorrect");

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


const forgotPassword = async (email) => {
  const cleanEmail = email?.trim().toLowerCase();
  if (!cleanEmail) throw new Error("Email is required");

  const user = await User.findOne({ email: cleanEmail });
  if (!user) throw new Error("User not found");

  const otp = String(Math.floor(100000 + Math.random() * 900000));
  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

  user.resetOtp = hashedOtp;
  user.resetOtpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min
  await user.save();

  await sendOtpEmail(cleanEmail, otp);

  return {
    message: "OTP sent to your email",
  };
};


const verifyOtp = async (email, otp) => {
  const cleanEmail = email?.trim().toLowerCase();
  if (!cleanEmail || !otp) throw new Error("Email and OTP are required");

  const user = await User.findOne({ email: cleanEmail });
  if (!user) throw new Error("User not found");

  const hashedOtp = crypto.createHash("sha256").update(String(otp)).digest("hex");

  if (!user.resetOtp || !user.resetOtpExpires) throw new Error("OTP not requested");
  if (user.resetOtpExpires < new Date()) throw new Error("OTP expired");
  if (user.resetOtp !== hashedOtp) throw new Error("Invalid OTP");

  return { message: "OTP verified successfully" };
};

const resetPasswordWithOtp = async (email, otp, newPassword) => {
  const cleanEmail = email?.trim().toLowerCase();
  if (!cleanEmail || !otp || !newPassword) {
    throw new Error("Email, OTP and newPassword are required");
  }

  if (!validator.isStrongPassword(newPassword)) {
    throw new Error("Password should be strong");
  }

  const user = await User.findOne({ email: cleanEmail });
  if (!user) throw new Error("User not found");

  const hashedOtp = crypto.createHash("sha256").update(String(otp)).digest("hex");

  if (!user.resetOtp || !user.resetOtpExpires) throw new Error("OTP not requested");
  if (user.resetOtpExpires < new Date()) throw new Error("OTP expired");
  if (user.resetOtp !== hashedOtp) throw new Error("Invalid OTP");

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetOtp = null;
  user.resetOtpExpires = null;
  await user.save();

  return { message: "Password reset successful" };
};

module.exports = {
  createUser,
  goUser,
  forgotPassword,
  verifyOtp,
  resetPasswordWithOtp,
};
