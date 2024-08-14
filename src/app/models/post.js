// import mongoose from "mongoose";

// const postSchema = new mongoose.Schema({
//   postText: {
//     type: String,
//   },
//   imageURL: {
//     type: String,
//   },
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
//   createdAt: { type: Date, default: Date.now },
//   email: {
//     type: String,
//   },
// });

// const Post = mongoose.models.posts || mongoose.model("posts", postSchema);

// export default Post;

import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  postText: {
    type: String,
    require: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
  imageURL: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    },
  ],
});

const POST = mongoose.models.posts || mongoose.model("posts", postSchema);

export default POST;
