// backend/auth/auth.controller.js
const userService = require("./auth.service.js");
const User = require("./auth.model.js");

const signUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({
      success: true,
      message: "user sign up successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "user has fail to signup successfully",
      error: error.message,
    });
  }
};

const logUser = async (req, res) => {
  try {
    const user = await userService.goUser(req.body);
    res.status(200).json({
      success: true,
      message: "user login up successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "user has fail to login successfully",
      error: error.message,
    });
  }
};

const getDrivers = async (req, res) => {
  try {
    const drivers = await User.find({ role: "driver" })
      .select("_id username email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: drivers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to fetch drivers",
      error: error.message,
    });
  }
};

const forgotPasswordUser = async (req, res) => {
  try {
    const data = await userService.forgotPassword(req.body.email);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const verifyOtpUser = async (req, res) => {
  try {
    const data = await userService.verifyOtp(req.body.email, req.body.otp);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const resetPasswordUser = async (req, res) => {
  try {
    const data = await userService.resetPasswordWithOtp(
      req.body.email,
      req.body.otp,
      req.body.newPassword
    );
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  signUser,
  logUser,
  getDrivers,
  forgotPasswordUser,
  verifyOtpUser,
  resetPasswordUser,
};
