const Conversation = require("../models/conversation.model.js");
const Message = require("../models/message.model.js");
const { getReceiverSocketId, io } = require("../socket/socket.js");
const catchAsyncError = require("../middlewares/catchAsyncError");

exports.sendMessage = catchAsyncError(async (req, res) => {
  const { message } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    message,
  });

  conversation.messages.push(newMessage._id);

  await Promise.all([conversation.save(), newMessage.save()]);

  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }

  res.status(201).json(newMessage);
});

exports.getMessages = catchAsyncError(async (req, res) => {
  const { id: userToChatId } = req.params;
  const senderId = req.user._id;

  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, userToChatId] },
  }).populate("messages");

  if (!conversation) {
    return res.status(200).json([]);
  }

  const messages = conversation.messages;

  res.status(200).json(messages);
});
