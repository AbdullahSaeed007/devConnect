const jobPost = require("../models/job");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/user");
// create new job posts /api/v1/product/new

exports.newJobs = catchAsyncError(async (req, res) => {
  req.body.user_id = req.user.id;
  const job = await jobPost.create(req.body);
  res.status(201).json({
    success: true,
    job,
  });
});

exports.getJobs = catchAsyncError(async (req, res, next) => {
  const jobs = await jobPost.find();
  res.status(200).json({
    success: true,
    count: jobs.length,
    jobs,
  });
});

//get single product by the id => api/v1/job/:id

exports.getSingleJob = catchAsyncError(async (req, res, next) => {
  const job = await jobPost.findById(req.params.id);
  if (!job) {
    return next(new ErrorHandler("job post not found", 404));
  }

  res.status(200).json({
    success: true,
    job,
  });
});

//update the job => api/v1/admin/job/:id

exports.updateJob = catchAsyncError(async (req, res, next) => {
  let updateJob = await jobPost.findById(req.params.id);
  if (!updateJob) {
    return next(new ErrorHandler("job post not found", 404));
  }
  updateJob = await jobPost.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    updateJob,
  });
});

//delete the job => api/v1/admin/job/:id

exports.deleteJob = catchAsyncError(async (req, res, next) => {
  let deleteJob = await jobPost.findById(req.params.id);
  if (!deleteJob) {
    return next(new ErrorHandler("job post not found", 404));
  }

  deleteJob = await jobPost.deleteOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    message: "job post has been deleted",
  });
});

exports.getPostComments = catchAsyncError(async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const job = await jobPost.findById(jobId);
    if (!job) {
      return next(new ErrorHandler("job not found", 404));
    }
    const comments = job.comments;
    res.status(200).json({ success: true, comments });
  } catch (error) {
    next(error);
  }
});

//job comment
exports.jobComment = catchAsyncError(async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const { text } = req.body;

    // Retrieve the ID of the currently logged-in user
    const user_id = req.user.id;

    // Find the job job by ID
    const job = await jobPost.findById(jobId);
    if (!job) {
      return next(new ErrorHandler("job not found", 404));
    }

    // Create the new comment object
    const newComment = {
      text,
      user_id,
      timeStamp: new Date(), // Optionally, you can add a timestamp for the comment
    };

    // Push the new comment to the job job's comments array
    job.comments.push(newComment);

    // Save the updated job job
    await job.save();

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
    const { jobId, commentId } = req.params;

    // Find the job job by ID
    const job = await jobPost.findById(jobId);
    if (!job) {
      return next(new ErrorHandler("job not found", 404));
    }

    // Find the index of the comment by ID
    const commentIndex = job.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );
    if (commentIndex === -1) {
      return next(new ErrorHandler("Comment not found", 404));
    }

    // Remove the comment from the job job's comments array
    job.comments.splice(commentIndex, 1);

    // Save the updated job job
    await job.save();

    // Send a success response
    res
      .status(200)
      .json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
});
//from here

exports.updateComment = catchAsyncError(async (req, res, next) => {
  try {
    const { jobId, commentId } = req.params;
    const { text } = req.body;

    // Find the job  by ID
    const job = await jobPost.findById(jobId);
    if (!job) {
      return next(new ErrorHandler("job not found", 404));
    }

    // Find the comment by ID
    const comment = job.comments.id(commentId);
    if (!comment) {
      return next(new ErrorHandler("Comment not found", 404));
    }

    // Update the text of the comment
    comment.text = text;

    // Save the updated job job
    await job.save();

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

exports.likejob = catchAsyncError(async (req, res, next) => {
  try {
    const { jobId } = req.params;

    // Find the job job by ID
    const job = await jobPost.findById(jobId);
    if (!job) {
      return next(new ErrorHandler("job post not found", 404));
    }

    // Remove user ID from likes if previously disliked
    const likeIndex = job.dislikes.indexOf(req.user.id);
    if (likeIndex !== -1) {
      job.dislikes.splice(likeIndex, 1);
    }
    // Check if user already liked the comment
    const checkLike = job.likes.indexOf(req.user.id);
    if (checkLike !== -1) {
      // If user already liked the comment, remove the like
      job.likes.splice(checkLike, 1);
      // Save the updated job job
      await job.save();
      return res
        .status(200)
        .json({ success: true, message: "job like removed successfully" });
    }

    // Ensure likes is an array before using includes
    if (!Array.isArray(job.likes)) {
      job.likes = []; // Initialize as an empty array if not already
    }

    // Update the comment likes
    job.likes.push(req.user.id);

    // Save the updated job job
    await job.save();

    // Send a success response
    res.status(200).json({ success: true, message: "job Liked successfully" });
  } catch (error) {
    next(error);
  }
});

exports.dislikejob = catchAsyncError(async (req, res, next) => {
  try {
    const { jobId } = req.params;

    // Find the job job by ID
    const job = await jobPost.findById(jobId);
    if (!job) {
      return next(new ErrorHandler("job post not found", 404));
    }

    // Remove user ID from dislikes if previously liked
    const dislikeIndex = job.likes.indexOf(req.user.id);
    if (dislikeIndex !== -1) {
      job.likes.splice(dislikeIndex, 1);
    }

    // Check if user already disliked the comment
    const checkDisike = job.dislikes.indexOf(req.user.id);
    if (checkDisike !== -1) {
      // If user already liked the comment, remove the like
      job.dislikes.splice(checkDisike, 1);
      // Save the updated job job
      await job.save();
      return res.status(200).json({
        success: true,
        message: "job dislike removed successfully",
      });
    }

    // Ensure likes is an array before using includes
    if (!Array.isArray(job.dislikes)) {
      job.dislikes = []; // Initialize as an empty array if not already
    }

    // Update the comment likes
    job.dislikes.push(req.user.id);
    // Save the updated job job
    await job.save();

    // Send a success response
    res.status(200).json({ success: true, message: "job disliked" });
  } catch (error) {
    next(error);
  }
});

exports.likeComment = catchAsyncError(async (req, res, next) => {
  try {
    const { jobId, commentId } = req.params;

    // Find the job job by ID
    const job = await jobPost.findById(jobId);
    if (!job) {
      return next(new ErrorHandler("job post not found", 404));
    }

    // Find the comment by ID
    const comment = job.comments.id(commentId);
    if (!comment) {
      return next(new ErrorHandler("Comment not found", 404));
    }
    // Remove user ID from likes if previously disliked
    const likeIndex = comment.dislikes.indexOf(req.user.id);
    if (likeIndex !== -1) {
      comment.dislikes.splice(likeIndex, 1);
    }
    // Check if user already liked the comment
    const checkLike = comment.likes.indexOf(req.user.id);
    if (checkLike !== -1) {
      // If user already liked the comment, remove the like
      comment.likes.splice(checkLike, 1);
      // Save the updated job job
      await job.save();
      return res
        .status(200)
        .json({ success: true, message: "Comment like removed successfully" });
    }

    // Ensure likes is an array before using includes
    if (!Array.isArray(comment.likes)) {
      comment.likes = []; // Initialize as an empty array if not already
    }

    // Update the comment likes
    comment.likes.push(req.user.id);

    // Save the updated job job
    await job.save();

    // Send a success response
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
    const { jobId, commentId } = req.params;

    // Find the job job by ID
    const job = await jobPost.findById(jobId);
    if (!job) {
      return next(new ErrorHandler("job post not found", 404));
    }

    // Find the comment by ID
    const comment = job.comments.id(commentId);
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
      // Save the updated job job
      await job.save();
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
    // Save the updated job job
    await job.save();

    // Send a success response
    res.status(200).json({ success: true, message: "Comment unliked" });
  } catch (error) {
    next(error);
  }
});

exports.replyComment = catchAsyncError(async (req, res, next) => {
  try {
    const { jobId, commentId } = req.params;
    const { text } = req.body;

    // Retrieve the ID of the currently logged-in user
    const user_id = req.user.id;
    // Find the job job by ID
    const job = await jobPost.findById(jobId);
    if (!job) {
      return next(new ErrorHandler("job post not found", 404));
    }
    //find comment by ID
    const commentfind = job.comments.id(commentId);
    if (!commentfind) {
      return next(new ErrorHandler("comment not found", 404));
    }

    // Create the new comment object
    const newReply = {
      text,
      user_id,
      timeStamp: new Date(), // Optionally, you can add a timestamp for the comment
    };

    // Push the new comment to the job job's comments array
    commentfind.replies.push(newReply);

    // Save the updated job job
    await job.save();

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
    const { jobId, commentId, replyId } = req.params;

    // Find the job job by ID
    const job = await jobPost.findById(jobId);
    if (!job) {
      return next(new ErrorHandler("job post not found", 404));
    }
    const commentfind = job.comments.id(commentId);
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

    // Remove the comment from the job job's comments array
    commentfind.replies.splice(replyIndex, 1);

    // Save the updated job job
    await job.save();

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
    const { jobId, commentId, replyId } = req.params;
    const { text } = req.body;

    // Find the job job by ID
    const job = await jobPost.findById(jobId);
    if (!job) {
      return next(new ErrorHandler("job post not found", 404));
    }
    const commentfind = job.comments.id(commentId);
    if (!commentfind) {
      return next(new ErrorHandler("comment not found", 404));
    }
    const replyfind = commentfind.replies.id(replyId);
    if (!replyfind) {
      return next(new ErrorHandler("reply not found", 404));
    }

    // Update the text of the comment
    replyfind.text = text;

    // Save the updated job job
    await job.save();

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
    const { jobId, commentId } = req.params;
    const job = await jobPost.findById(jobId);
    if (!job) {
      return next(new ErrorHandler("job post not found", 404));
    }
    const commentfind = job.comments.id(commentId);
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
    const { jobId, commentId, replyId } = req.params;

    // Find the job job by ID
    const job = await jobPost.findById(jobId);
    if (!job) {
      return next(new ErrorHandler("job post not found", 404));
    }
    const commentfind = job.comments.id(commentId);
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
      // Save the updated job job
      await job.save();
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

    // Save the updated job job
    await job.save();

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
    const { jobId, commentId, replyId } = req.params;

    // Find the job job by ID
    const job = await jobPost.findById(jobId);
    if (!job) {
      return next(new ErrorHandler("job post not found", 404));
    }
    const commentfind = job.comments.id(commentId);
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
      // Save the updated job job
      await job.save();
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
    // Save the updated job job
    await job.save();

    // Send a success response
    res.status(200).json({ success: true, message: "reply unliked" });
  } catch (error) {
    next(error);
  }
});

exports.getUserLikesAndComments = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Find job posts where the user has liked
    const likedJobPosts = await jobPost.find({ likes: userId });

    // Find job posts where the user has commented
    const commentedJobPosts = await jobPost.find({
      $or: [
        { "comments.user_id": userId }, // Check if user ID exists in comments array
        { "comments.replies.user_id": userId }, // Check if user ID exists in replies array
      ],
    });

    // Merge liked and commented job posts
    const userInteractions = likedJobPosts.concat(commentedJobPosts);

    res.status(200).json({
      success: true,
      userInteractions,
    });
  } catch (error) {
    next(error);
  }
};

exports.sharePost = catchAsyncError(async (req, res, next) => {
  try {
    const { postId, recipientId } = req.params; // Get the post ID and recipient ID from the URL
    const userId = req.user.id; // Get the ID of the user sharing the post

    // Find the question post
    const post = await jobPost.findById(postId);
    if (!post) {
      return next(new ErrorHandler("Job post not found", 404));
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
    const sharedPosts = await jobPost
      .find({ "shares.user_id": userId })
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
