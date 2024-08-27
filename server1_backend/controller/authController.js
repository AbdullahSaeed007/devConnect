const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsycError = require("../middlewares/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");
const { validationResult } = require("express-validator");

exports.registerUser = catchAsycError(async (req, res, next) => {
  //const { name, email, password } = req.body;
  try {
    // Upload the avatar to Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    console.log(result);
    const { name, email, password } = req.body;
    // Create the user with the avatar information
    const publicId = result.public_id;
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    await user.save();

    // const user = await User.create(req.body);
    // name,
    //   email,
    //   password,
    //   avatar: {
    //     public_id: "Avatars/profile2_s06hd6",
    //     url: "https://res.cloudinary.com/dofw1gtdq/image/upload/v1704882191/shopit/user/Avatars/profile2_s06hd6.jpg",
    //   },
    // const token = user.getJwtToken();
    // res.status(201).json({
    //   success: true,
    //   token,
    // });
    sendToken(user, 200, res);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while saving the user",
      error: error.message,
      stack: error.stack,
    });
  }
});

//loginuser
exports.loginUser = catchAsycError(async (req, res, next) => {
  const { email, password } = req.body;
  //checking the enterend email and pass
  if (!email || !password) {
    return next(new ErrorHandler("please enter email and password", 401));
  }
  //finding user in database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("invalid email or password", 401));
  }
  //checking password

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("invalid email or password", 401));
  }
  // const token = user.getJwtToken();
  // res.status(200).json({
  //   success: true,
  //   token,
  // });
  sendToken(user, 200, res);
});
exports.sendEmailValidationToken = catchAsycError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  // Generate token
  const token = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // Set token and expiration
  user.emailValidationToken = hashedToken;
  user.emailValidationTokenExpire = Date.now() + 30 * 60 * 1000; // 30 minutes

  await user.save({ validateBeforeSave: false });

  // Email part
  const validationUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/validate-email/${token}`;
  const message = `Your email validation token is as follows:\n\n ${validationUrl} \n\nIf you did not request this email, then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "DevConnect Email Validation",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    user.emailValidationToken = undefined;
    user.emailValidationTokenExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});
exports.validateEmailToken = catchAsycError(async (req, res, next) => {
  const token = req.params.token;

  // Hash token
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // Find user by token and ensure token has not expired
  const user = await User.findOne({
    emailValidationToken: hashedToken,
    emailValidationTokenExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Invalid or expired email validation token", 400)
    );
  }

  // Token is valid, proceed with your logic
  user.emailValidationToken = undefined;
  user.emailValidationTokenExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Email validated successfully",
  });
});
//forgot  password
exports.forgotPassword = catchAsycError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("user not found with this email", 404));
  }
  //get reset token

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  //email part
  //reset password url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;
  const message = `your password reset token is as follow:\n\n ${resetUrl} \n\nIf you have not requested this email, then ignore it.`;
  //now send this token via email

  try {
    await sendEmail({
      email: user.email,
      subject: "DevConnect Password Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});
exports.resetPassword = catchAsycError(async (req, res, next) => {
  //has url token then check into the db
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(
        "password reset token is invalid or has been expired",
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("password doesnot match", 400));
  }
  //setup new pass
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});
//get currently logged in users
exports.getUserProfile = catchAsycError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//update/ change password
exports.updatePassword = catchAsycError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  //check previous user password
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler("old password is incorrect", 400));
  }
  user.password = req.body.password;
  await user.save();
  sendToken(user, 200, res);
});

//update user profile
exports.updateProfile = catchAsycError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender,
    country: req.body.country,
    state: req.body.state,
    city: req.body.city,
    userInterests: req.body.userInterests,
    degrees: req.body.degrees,
    user_type: req.body.role,
    recentJob: req.body.title,
    lookingForJob: req.body.status,
    userSkills: req.body.skills,
  };
  console.log(req.body);

  //update avatar todo
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});

//cookies are sent from server in the http request
//http cookie is not accessed on the FE using any js code
//we dont use local storage to stora the cookies thats why we use http cookie to make it more secure

//logout
exports.logout = catchAsycError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "logout",
  });
});

//admin routes

//get all users
exports.allUsers = catchAsycError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//get specific users
exports.getUserDetails = catchAsycError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`user doesnot exist with id: ${req.params.id}`)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//get specific user by keyword
exports.searchUser = catchAsycError(async (req, res, next) => {
  const apiFeatures = new APIFeatures(User.find(), req.query).searchUser();
  const users = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: users.lenght,
    users,
  });
});

//only admins can acccess this
exports.updateUser = catchAsycError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.params.role,
  };

  //update avatar todo
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});

//del admin
exports.deleteUser = catchAsycError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`user doesnot exist with id: ${req.params.id}`)
    );
  }
  //remove avatar from clodinary todo
  await user.deleteOne();
  res.status(200).json({
    success: true,
  });
});

exports.followUser = catchAsycError(async (req, res, next) => {
  const userToFollow = await User.findById(req.params.id);
  const currentUser = await User.findById(req.user.id);

  if (!userToFollow) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (userToFollow._id.equals(currentUser._id)) {
    return next(new ErrorHandler("You cannot follow yourself", 400));
  }
  if (currentUser.following.includes(userToFollow._id)) {
    return next(new ErrorHandler("You already follow this user", 400));
  }

  userToFollow.followers.push(currentUser._id);
  currentUser.following.push(userToFollow._id);

  await userToFollow.save();
  await currentUser.save();

  res.status(200).json({
    success: true,
    message: "Successfully followed the user",
  });
});

// Unfollow a user
exports.unfollowUser = catchAsycError(async (req, res, next) => {
  const userToUnfollow = await User.findById(req.params.id);
  const currentUser = await User.findById(req.user.id);

  if (!userToUnfollow) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (!currentUser.following.includes(userToUnfollow._id)) {
    return next(new ErrorHandler("You do not follow this user", 400));
  }

  userToUnfollow.followers = userToUnfollow.followers.filter(
    (followerId) => !followerId.equals(currentUser._id)
  );
  currentUser.following = currentUser.following.filter(
    (followingId) => !followingId.equals(userToUnfollow._id)
  );

  await userToUnfollow.save();
  await currentUser.save();

  res.status(200).json({
    success: true,
    message: "Successfully unfollowed the user",
  });
});
