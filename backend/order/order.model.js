const mongoose = require("mongoose");

const timelineSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["pending", "approved", "assigned", "out_for_delivery", "delivered"],
      required: true,
    },
    note: { type: String, default: "" },
    changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, enum: ["customer", "admin", "driver"], required: true },
    at: { type: Date, default: Date.now },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    source: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    weight: { type: Number, required: true, min: 0.1 },
    price: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "approved", "assigned", "out_for_delivery", "delivered"],
      default: "pending",
    },
    timeline: { type: [timelineSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
