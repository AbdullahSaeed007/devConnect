const express = require("express");
const router = express.Router();
const QuestionPost = require("../models/question");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const APIFeatures = require("../utils/apiFeatures");
const Notification = require("../models/notification");

// Validation middleware for creating a new question post
// const validateQuestionPost = [
//   body("title").trim().isLength({ min: 1 }).withMessage("Title is required"),
//   body("description")
//     .trim()
//     .isLength({ min: 1 })
//     .withMessage("Description is required"),
//   body("relatedSkills")
//     .isArray()
//     .withMessage("Related skills must be an array"),
//   body("questionImage")
//     .optional()
//     .isURL()
//     .withMessage("Invalid URL format for question image"),
//   body("user_id").isMongoId().withMessage("Invalid user ID"),
// ];

// POST endpoint for creating a new question post
exports.questionPost = catchAsyncError(async (req, res) => {
  req.body.user_id = req.user.id;
  const question = await QuestionPost.create(req.body);
  res.status(201).json({
    success: true,
    question,
  });
  //   } catch (error) {
  //     // Handle database or other errors
  //     console.error(error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
});
exports.searchQuestion = catchAsyncError(async (req, res, next) => {
  const apiFeatures = new APIFeatures(
    QuestionPost.find(),
    req.query
  ).searchQuestion();
  const questions = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: questions.lenght,
    questions,
  });
});

exports.getQuestions = catchAsyncError(async (req, res) => {
  const questions = await QuestionPost.find();
  //pagination, search,filter
  if (questions) {
    res.status(200).json({
      success: true,
      message: "hello",
      count: questions.lenght,
      questions,
    });
  }
});
//we need id to update

exports.updateQuestion = catchAsyncError(async (req, res, next) => {
  let questions = await QuestionPost.findById(req.params.id);
  if (!questions) {
    return next(new ErrorHandler("Question not found", 404));
  }
  questions = await QuestionPost.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    sucess: true,
    questions,
  });
});

exports.deleteQuestion = async (req, res) => {
  const question = await QuestionPost.findById(req.params.id);
  if (!question) {
    res.status(404).json({
      success: false,
      message: "Question not found",
    });
  }
  //del images too how
  await question.deleteOne(); //think of await
  res.status(200).json({
    sucess: true,
    message: "question deleted",
  });
};

//get comment section
exports.questionComments = catchAsyncError(async (req, res, next) => {
  try {
    const { postId } = req.params;
    const question = await QuestionPost.findById(postId);
    if (!question) {
      return next(new ErrorHandler("Question post not found", 404));
    }
    const comments = question.comments;
    res.status(200).json({ success: true, comments });
  } catch (error) {
    next(error);
  }
});

//post comment
exports.postComment = catchAsyncError(async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;

    // Retrieve the ID of the currently logged-in user
    const user_id = req.user.id;

    // Find the question post by ID
    const question = await QuestionPost.findById(postId);
    if (!question) {
      return next(new ErrorHandler("Question post not found", 404));
    }

    // Create the new comment object
    const newComment = {
      text,
      user_id,
      timeStamp: new Date(), // Optionally, you can add a timestamp for the comment
    };

    // Push the new comment to the question post's comments array
    question.comments.push(newComment);

    // Save the updated question post
    await question.save();

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Comment posted successfully",
      comment: newComment,
    });
  } catch (error) {
    next(error);
  }
});

exports.deleteComment = catchAsyncError(async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;

    // Find the question post by ID
    const question = await QuestionPost.findById(postId);
    if (!question) {
      return next(new ErrorHandler("Question post not found", 404));
    }

    // Find the index of the comment by ID
    const commentIndex = question.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );
    if (commentIndex === -1) {
      return next(new ErrorHandler("Comment not found", 404));
    }

    // Remove the comment from the question post's comments array
    question.comments.splice(commentIndex, 1);

    // Save the updated question post
    await question.save();

    // Send a success response
    res
      .status(200)
      .json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
});

exports.updateComment = catchAsyncError(async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;
    const { text } = req.body;

    // Find the question post by ID
    const question = await QuestionPost.findById(postId);
    if (!question) {
      return next(new ErrorHandler("Question post not found", 404));
    }

    // Find the comment by ID
    const comment = question.comments.id(commentId);
    if (!comment) {
      return next(new ErrorHandler("Comment not found", 404));
    }

    // Update the text of the comment
    comment.text = text;

    // Save the updated question post
    await question.save();

    // Send a success response
    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    next(error);
  }
});

exports.likePost = catchAsyncError(async (req, res, next) => {
  try {
    const { postId } = req.params;

    // Find the question post by ID
    const question = await QuestionPost.findById(postId);
    if (!question) {
      return next(new ErrorHandler("Question post not found", 404));
    }

    // Remove user ID from likes if previously disliked
    const likeIndex = question.dislikes.indexOf(req.user.id);
    if (likeIndex !== -1) {
      question.dislikes.splice(likeIndex, 1);
    }
    // Check if user already liked the comment
    const checkLike = question.likes.indexOf(req.user.id);
    if (checkLike !== -1) {
      // If user already liked the comment, remove the like
      question.likes.splice(checkLike, 1);
      // Save the updated question post
      await question.save();
      return res
        .status(200)
        .json({ success: true, message: "Post like removed successfully" });
    }

    // Ensure likes is an array before using includes
    if (!Array.isArray(question.likes)) {
      question.likes = []; // Initialize as an empty array if not already
    }

    // Update the comment likes
    question.likes.push(req.user.id);

    // Save the updated question post
    await question.save();
    //notification test
    const notification = new Notification({
      recipient: question.user_id, // Ensure correct reference
      sender: req.user.id,
      type: "like",
      postType: "questionPost",
      postId: question._id,
    });
    await notification.save();
    // Send a success response
    res.status(200).json({ success: true, message: "Post Liked successfully" });
  } catch (error) {
    next(error);
  }
});

exports.dislikePost = catchAsyncError(async (req, res, next) => {
  try {
    const { postId } = req.params;

    // Find the question post by ID
    const question = await QuestionPost.findById(postId);
    if (!question) {
      return next(new ErrorHandler("Question post not found", 404));
    }

    // Remove user ID from dislikes if previously liked
    const dislikeIndex = question.likes.indexOf(req.user.id);
    if (dislikeIndex !== -1) {
      question.likes.splice(dislikeIndex, 1);
    }

    // Check if user already disliked the comment
    const checkDisike = question.dislikes.indexOf(req.user.id);
    if (checkDisike !== -1) {
      // If user already liked the comment, remove the like
      question.dislikes.splice(checkDisike, 1);
      // Save the updated question post
      await question.save();
      return res.status(200).json({
        success: true,
        message: "Post dislike removed successfully",
      });
    }

    // Ensure likes is an array before using includes
    if (!Array.isArray(question.dislikes)) {
      question.dislikes = []; // Initialize as an empty array if not already
    }

    // Update the comment likes
    question.dislikes.push(req.user.id);
    // Save the updated question post
    await question.save();
    //notification
    const notification = new Notification({
      recipient: question.user_id, // Ensure correct reference
      sender: req.user.id,
      type: "dislike",
      postType: "questionPost",
      postId: question._id,
    });
    await notification.save();
    // Send a success response
    res.status(200).json({ success: true, message: "Post disliked" });
  } catch (error) {
    next(error);
  }
});

exports.likeComment = catchAsyncError(async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;

    const question = await QuestionPost.findById(postId);
    if (!question) {
      return next(new ErrorHandler("Question post not found", 404));
    }

    const comment = question.comments.id(commentId);
    if (!comment) {
      return next(new ErrorHandler("Comment not found", 404));
    }

    // Remove dislike if it exists
    const likeIndex = comment.dislikes.indexOf(req.user.id);
    if (likeIndex !== -1) {
      comment.dislikes.splice(likeIndex, 1);
    }

    // Check if the user already liked the comment
    const checkLike = comment.likes.indexOf(req.user.id);
    if (checkLike !== -1) {
      comment.likes.splice(checkLike, 1);
      await question.save();
      return res
        .status(200)
        .json({ success: true, message: "Comment like removed successfully" });
    }

    // Ensure the likes array exists
    if (!Array.isArray(comment.likes)) {
      comment.likes = [];
    }

    // Add the like
    comment.likes.push(req.user.id);
    await question.save();

    res
      .status(200)
      .json({ success: true, message: "Comment liked successfully" });
  } catch (error) {
    next(error);
  }
});

// Dislike a comment (improved)
exports.dislikeComment = catchAsyncError(async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;

    // Find the question post by ID
    const question = await QuestionPost.findById(postId);
    if (!question) {
      return next(new ErrorHandler("Question post not found", 404));
    }

    // Find the comment by ID
    const comment = question.comments.id(commentId);
    if (!comment) {
      return next(new ErrorHandler("Comment not found", 404));
    }

    // Remove user ID from dislikes if previously liked
    const dislikeIndex = comment.likes.indexOf(req.user.id);
    if (dislikeIndex !== -1) {
      comment.likes.splice(dislikeIndex, 1);
    }

    // Check if user already disliked the comment
    const checkDisike = comment.dislikes.indexOf(req.user.id);
    if (checkDisike !== -1) {
      // If user already liked the comment, remove the like
      comment.dislikes.splice(checkDisike, 1);
      // Save the updated question post
      await question.save();
      return res.status(200).json({
        success: true,
        message: "Comment dislike removed successfully",
      });
    }

    // Ensure likes is an array before using includes
    if (!Array.isArray(comment.dislikes)) {
      comment.dislikes = []; // Initialize as an empty array if not already
    }

    // Update the comment likes
    comment.dislikes.push(req.user.id);
    // Save the updated question post
    await question.save();

    // Send a success response
    res.status(200).json({ success: true, message: "Comment unliked" });
  } catch (error) {
    next(error);
  }
});

exports.replyComment = catchAsyncError(async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;
    const { text } = req.body;

    // Retrieve the ID of the currently logged-in user
    const user_id = req.user.id;
    // Find the question post by ID
    const question = await QuestionPost.findById(postId);
    if (!question) {
      return next(new ErrorHandler("Question post not found", 404));
    }
    //find comment by ID
    const commentfind = question.comments.id(commentId);
    if (!commentfind) {
      return next(new ErrorHandler("comment not found", 404));
    }

    // Create the new comment object
    const newReply = {
      text,
      user_id,
      timeStamp: new Date(), // Optionally, you can add a timestamp for the comment
    };

    // Push the new comment to the question post's comments array
    commentfind.replies.push(newReply);

    // Save the updated question post
    await question.save();

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Reply posted successfully",
      reply: newReply,
    });
  } catch (error) {
    next(error);
  }
});

exports.deleteReply = catchAsyncError(async (req, res, next) => {
  try {
    const { postId, commentId, replyId } = req.params;

    // Find the question post by ID
    const question = await QuestionPost.findById(postId);
    if (!question) {
      return next(new ErrorHandler("Question post not found", 404));
    }
    const commentfind = question.comments.id(commentId);
    if (!commentfind) {
      return next(new ErrorHandler("comment not found", 404));
    }
    const replyfind = commentfind.replies.id(replyId);
    if (!replyfind) {
      return next(new ErrorHandler("reply not found", 404));
    }

    // Find the index of the comment by ID
    const replyIndex = commentfind.replies.findIndex(
      (reply) => reply._id.toString() === replyId
    );
    if (replyIndex === -1) {
      return next(new ErrorHandler("reply not found", 404));
    }

    // Remove the comment from the question post's comments array
    commentfind.replies.splice(replyIndex, 1);

    // Save the updated question post
    await question.save();

    // Send a success response
    res
      .status(200)
      .json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
});

exports.updateReply = catchAsyncError(async (req, res, next) => {
  try {
    const { postId, commentId, replyId } = req.params;
    const { text } = req.body;

    // Find the question post by ID
    const question = await QuestionPost.findById(postId);
    if (!question) {
      return next(new ErrorHandler("Question post not found", 404));
    }
    const commentfind = question.comments.id(commentId);
    if (!commentfind) {
      return next(new ErrorHandler("comment not found", 404));
    }
    const replyfind = commentfind.replies.id(replyId);
    if (!replyfind) {
      return next(new ErrorHandler("reply not found", 404));
    }

    // Update the text of the comment
    replyfind.text = text;

    // Save the updated question post
    await question.save();

    // Send a success response
    res.status(200).json({
      success: true,
      message: "reply updated successfully",
      replyfind,
    });
  } catch (error) {
    next(error);
  }
});

exports.getReplies = catchAsyncError(async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;
    const question = await QuestionPost.findById(postId);
    if (!question) {
      return next(new ErrorHandler("Question post not found", 404));
    }
    const commentfind = question.comments.id(commentId);
    if (!commentfind) {
      return next(new ErrorHandler("comment not found", 404));
    }
    const reply = commentfind.replies;
    res.status(200).json({ success: true, reply });
  } catch (error) {
    next(error);
  }
});

exports.likeReply = catchAsyncError(async (req, res, next) => {
  try {
    const { postId, commentId, replyId } = req.params;

    // Find the question post by ID
    const question = await QuestionPost.findById(postId);
    if (!question) {
      return next(new ErrorHandler("Question post not found", 404));
    }
    const commentfind = question.comments.id(commentId);
    if (!commentfind) {
      return next(new ErrorHandler("comment not found", 404));
    }
    const replyfind = commentfind.replies.id(replyId);
    if (!replyfind) {
      return next(new ErrorHandler("reply not found", 404));
    }
    // Remove user ID from likes if previously disliked
    const dislikeIndex = replyfind.dislikes.indexOf(req.user.id);
    if (dislikeIndex !== -1) {
      replyfind.dislikes.splice(dislikeIndex, 1);
    }
    // Check if user already liked the comment
    const checkLike = replyfind.likes.indexOf(req.user.id);
    if (checkLike !== -1) {
      // If user already liked the comment, remove the like
      replyfind.likes.splice(checkLike, 1);
      // Save the updated question post
      await question.save();
      return res
        .status(200)
        .json({ success: true, message: "reply like removed successfully" });
    }

    // Ensure likes is an array before using includes
    if (!Array.isArray(replyfind.likes)) {
      replyfind.likes = []; // Initialize as an empty array if not already
    }

    // Update the comment likes
    replyfind.likes.push(req.user.id);

    // Save the updated question post
    await question.save();

    // Send a success response
    res
      .status(200)
      .json({ success: true, message: "reply liked successfully" });
  } catch (error) {
    next(error);
  }
});

exports.dislikeReply = catchAsyncError(async (req, res, next) => {
  try {
    const { postId, commentId, replyId } = req.params;

    // Find the question post by ID
    const question = await QuestionPost.findById(postId);
    if (!question) {
      return next(new ErrorHandler("Question post not found", 404));
    }
    const commentfind = question.comments.id(commentId);
    if (!commentfind) {
      return next(new ErrorHandler("comment not found", 404));
    }
    const replyfind = commentfind.replies.id(replyId);
    if (!replyfind) {
      return next(new ErrorHandler("reply not found", 404));
    }

    // Remove user ID from dislikes if previously liked
    const dislikeIndex = replyfind.likes.indexOf(req.user.id);
    if (dislikeIndex !== -1) {
      replyfind.likes.splice(dislikeIndex, 1);
    }

    // Check if user already disliked the comment
    const checkDisike = replyfind.dislikes.indexOf(req.user.id);
    if (checkDisike !== -1) {
      // If user already liked the comment, remove the like
      replyfind.dislikes.splice(checkDisike, 1);
      // Save the updated question post
      await question.save();
      return res.status(200).json({
        success: true,
        message: "reply dislike removed successfully",
      });
    }

    // Ensure likes is an array before using includes
    if (!Array.isArray(replyfind.dislikes)) {
      replyfind.dislikes = []; // Initialize as an empty array if not already
    }

    // Update the comment likes
    replyfind.dislikes.push(req.user.id);
    // Save the updated question post
    await question.save();

    // Send a success response
    res.status(200).json({ success: true, message: "reply unliked" });
  } catch (error) {
    next(error);
  }
});

exports.getTopContributors = catchAsyncError(async (req, res, next) => {
  try {
    const { field } = req.params; // Extract the field from URL parameters

    // Find all question posts related to the specified field
    const questions = await QuestionPost.find({ relatedSkills: field });

    if (!questions || questions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No questions found for the specified field",
      });
    }

    const userLikesMap = {};

    // Iterate through all comments in the related question posts
    questions.forEach((question) => {
      question.comments.forEach((comment) => {
        const userId = comment.user_id.toString();
        if (!userLikesMap[userId]) {
          userLikesMap[userId] = 0;
        }
        userLikesMap[userId] += comment.likes.length;
      });
    });

    // Convert the map to an array and sort by the number of likes
    const sortedContributors = Object.entries(userLikesMap)
      .sort((a, b) => b[1] - a[1])
      .map((entry) => ({ user_id: entry[0], likes: entry[1] }));

    res.status(200).json({
      success: true,
      contributors: sortedContributors,
    });
  } catch (error) {
    next(error);
  }
});

exports.sharePost = catchAsyncError(async (req, res, next) => {
  try {
    const { postId, recipientId } = req.params; // Get the post ID and recipient ID from the URL
    const userId = req.user.id; // Get the ID of the user sharing the post

    // Find the question post
    const post = await QuestionPost.findById(postId);
    if (!post) {
      return next(new ErrorHandler("Question post not found", 404));
    }

    // Check if the recipient is a follower or following the user
    const user = await User.findById(userId);
    const recipient = await User.findById(recipientId);
    if (!user || !recipient) {
      return next(new ErrorHandler("User not found", 404));
    }

    const isFollower = user.followers.includes(recipientId);
    const isFollowing = user.following.includes(recipientId);

    if (!isFollower && !isFollowing) {
      return next(
        new ErrorHandler(
          "You can only share posts with your followers or followings",
          400
        )
      );
    }

    // Add the share information to the post
    post.shares.push({ user_id: recipientId });
    await post.save();

    res.status(200).json({
      success: true,
      message: "Post shared successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
});
exports.getSharedPosts = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Find posts that have been shared with this user
    const sharedPosts = await QuestionPost.find({ "shares.user_id": userId })
      .populate("user_id", "name")
      .populate("shares.user_id", "name");

    res.status(200).json({
      success: true,
      sharedPosts,
    });
  } catch (error) {
    next(error);
  }
});
