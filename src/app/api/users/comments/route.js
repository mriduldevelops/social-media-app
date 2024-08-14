import Post from "@/app/models/post";
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Comment from "@/app/models/comments";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { commentText, post, createdBy, createdAt } = reqBody;

    //   const { searchParams } = new URL(request.url);
    //     const queyParam = {
    //         postId: searchParams.get('post')
    //     }
    //     const {postId} = queyParam;
    const currentPost = await Post.findById(post);

    // Create a new comment
    const newComment = new Comment({ commentText, post, createdBy, createdAt });
    const savedComment = await newComment.save();

    // Add the new comment ID to the post's comments array
    currentPost.comments.push(savedComment._id);

    // Save the updated post
    const updatedPost = await currentPost.save();

    console.log(updatedPost);
    return NextResponse.json({
      message: "commented successfully",
      status: 200,
      savedComment,
      updatedPost
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
}
