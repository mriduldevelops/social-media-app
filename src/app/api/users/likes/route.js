import Post from "@/app/models/post";
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function PUT(request){
    try {
        const { searchParams } = new URL(request.url);
        const queyParam = {
            post: searchParams.get('post')
        }
        const {post} = queyParam;
        
      const respnose = await Post.findById(post).populate('createdBy');
      return NextResponse.json({
          success: true,
          respnose
      });
  } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
  }