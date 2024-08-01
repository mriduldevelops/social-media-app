"use client";
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "@/redux/postSlice";
import Post from "./ui/Post";
function PostList() {
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
    }, []);

//   const dispatch = useDispatch();

//   const posts = useSelector((state) => state.posts.posts);
//   const status = useSelector((state) => state.posts.status);

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchPosts());
//     }
//   }, [status, dispatch]);

  console.log(posts);

  return <div className="space-y-4 pt-4">
    {
      posts && posts.map((post, index)=>(

        <Post post={post} key={index}/>
      ))
    }
  </div>;
}

export default PostList;
