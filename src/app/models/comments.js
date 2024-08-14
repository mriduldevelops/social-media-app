import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
    require: true,
  },
  commentText: {
    type: String,
    require: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment =
  mongoose.models.comments || mongoose.model("comments", commentSchema);

export default Comment;
