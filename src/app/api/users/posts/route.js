import Post from "@/app/models/post";
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { postText, imageURL, createdBy, createdAt } = reqBody;

    const newPost = new Post({ postText, imageURL, createdBy, createdAt });

    const savedPost = await newPost.save();

    console.log(savedPost);
    return NextResponse.json({
        message: "posted successfully",
        status: 200,
        savedPost,
      });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
}


export async function GET(){
  try {
    const posts = await Post.find().populate('createdBy').sort({createdAt: -1});
    return NextResponse.json({
        success: true,
        posts
    });
} catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
}
}

