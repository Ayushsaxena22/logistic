const express = require("express");
const router = express.Router();

const ctrl = require("./order.controller");
const { authMiddleware, authorize } = require("../middleware/middleware");


router.post("/create-order", authMiddleware, authorize("customer"), ctrl.createsOrder);
router.get("/my-orders", authMiddleware, authorize("customer"), ctrl.getsMyOrders);
router.get("/:id/status", authMiddleware, authorize("customer"), ctrl.getMyOrderStatus);
router.get("/:id/track", authMiddleware, authorize("customer"), ctrl.getMyOrderTrack);
router.get("/admin/all", authMiddleware, authorize("admin"), ctrl.getAllOrders);
router.patch("/admin/:id/approve", authMiddleware, authorize("admin"), ctrl.approveOrder);
router.patch("/admin/:id/assign-driver", authMiddleware, authorize("admin"), ctrl.assignDriver);
router.get("/driver/my-assigned", authMiddleware, authorize("driver"), ctrl.getDriverOrders);
router.patch("/driver/:id/out-for-delivery", authMiddleware, authorize("driver"), ctrl.markOutForDelivery);
router.patch("/driver/:id/delivered", authMiddleware, authorize("driver"), ctrl.markDelivered);

module.exports = router;
