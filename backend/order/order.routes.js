const express = require("express");
const router = express.Router();

const ctrl = require("./order.controller");
const { authMiddleware, authorize } = require("../middleware/middleware");

router.post("/create-order", authMiddleware, authorize("customer"), ctrl.createsOrder);
router.get("/my-orders", authMiddleware, authorize("customer"), ctrl.getsMyOrders);

// Admin routes (keep before dynamic /:id routes)
router.get("/admin/all", authMiddleware, authorize("admin"), ctrl.getAllOrders);
router.get("/admin/search", authMiddleware, authorize("admin"), ctrl.getAdminOrdersByDestination);
router.get(
  "/admin/suggested-drivers",
  authMiddleware,
  authorize("admin"),
  ctrl.getSuggestedDriversByDestination
);
router.patch("/admin/:id/approve", authMiddleware, authorize("admin"), ctrl.approveOrder);
router.patch("/admin/:id/assign-driver", authMiddleware, authorize("admin"), ctrl.assignDriver);

// Driver routes
router.get("/driver/my-assigned", authMiddleware, authorize("driver"), ctrl.getDriverOrders);
router.patch(
  "/driver/:id/out-for-delivery",
  authMiddleware,
  authorize("driver"),
  ctrl.markOutForDelivery
);
router.patch("/driver/:id/delivered", authMiddleware, authorize("driver"), ctrl.markDelivered);

// Customer dynamic routes (keep at end to avoid path conflicts)
router.get("/:id/status", authMiddleware, authorize("customer"), ctrl.getMyOrderStatus);
router.get("/:id/track", authMiddleware, authorize("customer"), ctrl.getMyOrderTrack);

module.exports = router;
