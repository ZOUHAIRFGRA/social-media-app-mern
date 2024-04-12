const Post = require("../models/postModel");
const User = require("../models/userModel");
const catchAsync = require("../middlewares/catchAsync");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");

// Create New Post
exports.newPost = catchAsync(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.post, {
    folder: "instagram/posts",
  });

  const postData = {
    caption: req.body.caption,
    image: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
    postedBy: req.user._id,
  };

  const post = await Post.create(postData);

  const user = await User.findById(req.user._id);
  user.posts.push(post._id);
  await user.save();

  res.status(201).json({
    success: true,
    post,
  });
});
