"use client";
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "@/redux/postSlice";
import Post from "./ui/Post";
function PostList({ postUpdate }) {
  const [posts, setPosts] = useState([])

    const getAllPosts = async () => {
      try {
        const response = await axios.get("/api/users/posts");
        setPosts(response.data.posts);
      } catch (error) {
        console.log(error.message);
      }
    };

    useEffect(() => {
      getAllPosts();
    }, [postUpdate]);


  // console.log(posts);

  return <div className="space-y-4 pt-4">
    {
      posts && posts.map((post, index)=>(

        <Post post={post} key={index}/>
      ))
    }
  </div>;
}

export default PostList;
