const Order = require("./order.model");
const User = require("../auth/auth.model");

const createOrder = async (userId, data) => {
  const source = data.source?.trim();
  const destination = data.destination?.trim();
  const weight = Number(data.weight);
  const price = Number(data.price);

  if (!source || !destination || Number.isNaN(weight) || Number.isNaN(price)) {
    throw new Error("Invalid order payload");
  }
  if (weight <= 0 || price < 0) {
    throw new Error("Weight/price is invalid");
  }

  return Order.create({
    customer: userId,
    source,
    destination,
    weight,
    price,
    status: "pending",
    timeline: [
      {
        status: "pending",
        note: "Order placed by customer",
        changedBy: userId,
        role: "customer",
      },
    ],
  });
};

const getMyOrders = async (userId) => {
  return Order.find({ customer: userId }).sort({ createdAt: -1 });
};

const getMyOrderStatus = async (userId, orderId) => {
  const order = await Order.findOne({ _id: orderId, customer: userId });
  if (!order) throw new Error("Order not found");
  return { orderId: order._id, status: order.status, updatedAt: order.updatedAt };
};

const getMyOrderTrack = async (userId, orderId) => {
  const order = await Order.findOne({ _id: orderId, customer: userId });
  if (!order) throw new Error("Order not found");
  return order.timeline.sort((a, b) => new Date(b.at) - new Date(a.at));
};

const getAllOrders = async () => {
  return Order.find()
    .populate("customer", "username email role")
    .populate("driver", "username email role")
    .sort({ createdAt: -1 });
};

const approveOrder = async (orderId, adminId) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error("Order not found");
  if (order.status !== "pending") throw new Error("Only pending order can be approved");

  order.status = "approved";
  order.timeline.push({
    status: "approved",
    note: "Approved by admin",
    changedBy: adminId,
    role: "admin",
  });
  await order.save();
  return order;
};

const assignDriver = async (orderId, driverId, adminId) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error("Order not found");
  if (!["approved", "assigned"].includes(order.status)) {
    throw new Error("Order must be approved before assigning driver");
  }

  const driver = await User.findById(driverId);
  if (!driver || driver.role !== "driver") throw new Error("Invalid driver");

  order.driver = driverId;
  order.status = "assigned";
  order.timeline.push({
    status: "assigned",
    note: "Driver assigned by admin",
    changedBy: adminId,
    role: "admin",
  });
  await order.save();
  return order;
};

const getDriverOrders = async (driverId) => {
  return Order.find({ driver: driverId }).sort({ createdAt: -1 });
};

const markOutForDelivery = async (orderId, driverId) => {
  const order = await Order.findOne({ _id: orderId, driver: driverId });
  if (!order) throw new Error("Order not found for this driver");
  if (order.status !== "assigned") throw new Error("Order must be assigned first");

  order.status = "out_for_delivery";
  order.timeline.push({
    status: "out_for_delivery",
    note: "Out for delivery",
    changedBy: driverId,
    role: "driver",
  });
  await order.save();
  return order;
};

const markDelivered = async (orderId, driverId) => {
  const order = await Order.findOne({ _id: orderId, driver: driverId });
  if (!order) throw new Error("Order not found for this driver");
  if (order.status !== "out_for_delivery") {
    throw new Error("Order must be out for delivery first");
  }

  order.status = "delivered";
  order.timeline.push({
    status: "delivered",
    note: "Delivered successfully",
    changedBy: driverId,
    role: "driver",
  });
  await order.save();
  return order;
};

module.exports = {
  createOrder,
  getMyOrders,
  getMyOrderStatus,
  getMyOrderTrack,
  getAllOrders,
  approveOrder,
  assignDriver,
  getDriverOrders,
  markOutForDelivery,
  markDelivered,
};
