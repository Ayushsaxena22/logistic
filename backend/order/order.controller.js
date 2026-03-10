const orderService = require("./order.service");

const createsOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.user.userId, req.body);
    res.status(201).json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getsMyOrders = async (req, res) => {
  try {
    const orders = await orderService.getMyOrders(req.user.userId);
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getMyOrderStatus = async (req, res) => {
  try {
    const data = await orderService.getMyOrderStatus(req.user.userId, req.params.id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

const getMyOrderTrack = async (req, res) => {
  try {
    const data = await orderService.getMyOrderTrack(req.user.userId, req.params.id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getAdminOrdersByDestination = async (req, res) => {
  try {
    const orders = await orderService.getAdminOrdersByDestination(req.query.destination);
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getSuggestedDriversByDestination = async (req, res) => {
  try {
    const drivers = await orderService.getSuggestedDriversByDestination(req.query.destination);
    res.json({ success: true, data: drivers });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const approveOrder = async (req, res) => {
  try {
    const order = await orderService.approveOrder(req.params.id, req.user.userId);
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const assignDriver = async (req, res) => {
  try {
    const order = await orderService.assignDriver(
      req.params.id,
      req.body.driverId,
      req.user.userId
    );
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getDriverOrders = async (req, res) => {
  try {
    const orders = await orderService.getDriverOrders(req.user.userId);
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const markOutForDelivery = async (req, res) => {
  try {
    const order = await orderService.markOutForDelivery(req.params.id, req.user.userId);
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const markDelivered = async (req, res) => {
  try {
    const order = await orderService.markDelivered(req.params.id, req.user.userId);
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  createsOrder,
  getsMyOrders,
  getMyOrderStatus,
  getMyOrderTrack,
  getAllOrders,
  getAdminOrdersByDestination,
  getSuggestedDriversByDestination,
  approveOrder,
  assignDriver,
  getDriverOrders,
  markOutForDelivery,
  markDelivered,
};
