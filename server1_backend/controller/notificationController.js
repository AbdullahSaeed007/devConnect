const Notification = require("../models/notification");
const catchAsyncError = require("../middlewares/catchAsyncError");
exports.getNotifications = catchAsyncError(async (req, res, next) => {
  const notifications = await Notification.find({ recipient: req.user.id })
    .sort({ createdAt: -1 })
    .populate("sender", "name")
    .populate("postId");

  res.status(200).json({
    success: true,
    notifications,
  });
});
