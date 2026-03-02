const userService = require("./auth.service.js");

const signUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({
      success: true,
      message: "user sign up successfully",
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "user has fail to signup successfully",
      error: error.message
    });
  }
};

const logUser = async (req, res) => {
  try {
    const user = await userService.goUser(req.body);
    res.status(200).json({
      success: true,
      message: "user login up successfully",
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "user has fail to login successfully",
      error: error.message
    });
  }
};

module.exports = { signUser, logUser };
