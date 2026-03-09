// backend/auth/auth.routes.js
const userController = require("./auth.controller.js");
const express = require("express");
const router = express.Router();
const { authMiddleware, authorize } = require("../middleware/middleware");

router.post("/signup", userController.signUser);
router.post("/login", userController.logUser);
router.post("/forgot-password", userController.forgotPasswordUser);
router.post("/verify-otp", userController.verifyOtpUser);
router.post("/reset-password", userController.resetPasswordUser);
router.get("/drivers", authMiddleware, authorize("admin"), userController.getDrivers);

module.exports = router;
