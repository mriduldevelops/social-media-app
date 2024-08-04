import Post from "@/app/models/post";
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function PUT(request){
    try {
        const reqBody = await request.json();
        const { userId, isLiked } = reqBody;
        const { searchParams } = new URL(request.url);
        const queyParam = {
            post: searchParams.get('post')
        }
        const {post} = queyParam;

        console.log(userId, isLiked)
        
      const currentPost = await Post.findById(post).populate('createdBy');
      if (isLiked){
        currentPost.likes.pop(userId)
      }  else{
        currentPost.likes.push(userId)
      }
      const response = await currentPost.save()

      return NextResponse.json({
          success: true,
          response, 
      });
  } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
  }