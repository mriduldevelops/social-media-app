// "use client";
// import { SquarePen, Image, Video, SendHorizontal } from "lucide-react";
// import React, { useState } from "react";
// import { Button } from "./ui/button";
// import { useUser } from "@clerk/nextjs";
// import axios from "axios";
// function CreatePost({ currentUser, onPostCreated }) {
//   // console.log(currentUser?._id)

//   const [post, setPost] = useState({
//     postText: "",
//     createdBy: currentUser ? currentUser._id : "",
//     imageURL: "",
//   });

//   // console.log(post.createdBy)
//   const addPost = async () => {
//     try {
//       if (post.createdBy) {
//         const response = await axios.post("/api/users/posts", post);

//         console.log("posted successfully", response.data);
//         onPostCreated();
//         console.log(post)
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//     setPost({
//       createdBy: currentUser ? currentUser._id : "",
//       postText: "",
//       imageURL: "",
//     });
//   };

//   return (
//     <div className="w-full bg-gray-100 p-4 rounded-lg space-y-4 shadow-lg">
//       <h3 className="flex gap-2 items-center font-bold text-xl text-zinc-800">
//         Create a Post <SquarePen strokeWidth={3} size={20} />
//       </h3>
//       <textarea
//         className="p-3 outline-none w-full rounded-md text-sm tracking-wide font-medium text-zinc-600"
//         cols="30"
//         rows="5"
//         placeholder="Write a Post..."
//         onChange={(e) => setPost({ ...post, postText: e.target.value })}
//         value={post.postText}
//       ></textarea>
//       <div className="flex justify-between">
//         <div className="flex gap-4">
//           <Button
//             variant="ghost"
//             className="flex items-center gap-2 font-semibold"
//           >
//             <Image color="#3B82F6" size={20} />
//             Photo
//           </Button>
//           <Button
//             variant="ghost"
//             className="flex items-center gap-2 font-semibold"
//           >
//             <Video color="#3B82F6" size={20} />
//             Video
//           </Button>
//         </div>
//         <Button
//           onClick={()=>addPost()}
//           className="bg-blue-500 flex items-center gap-2 font-semibold tracking-wider hover:bg-blue-600"
//         >
//           Publish
//           <SendHorizontal
//             size={20}
//             disabled={currentUser && post.postText}
//           />{" "}
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default CreatePost;


"use client";
import { SquarePen, Image, Video, SendHorizontal } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import axios from "axios";

function CreatePost({ currentUser, onPostCreated }) {
  const [post, setPost] = useState({
    postText: "",
    createdBy: currentUser ? currentUser._id : "",
    imageURL: "",
  });

  useEffect(() => {
    if (currentUser) {
      setPost((prevPost) => ({ ...prevPost, createdBy: currentUser._id }));
    }
  }, [currentUser]);

  const addPost = async () => {
    try {
      if (post.createdBy) {
        const response = await axios.post("/api/users/posts", post);
        console.log("posted successfully", response.data);
        onPostCreated();
      }
    } catch (error) {
      console.log(error.message);
    }
    setPost({
      createdBy: currentUser ? currentUser._id : "",
      postText: "",
      imageURL: "",
    });
  };

  return (
    <div className="w-full bg-gray-100 p-4 rounded-lg space-y-4 shadow-lg">
      <h3 className="flex gap-2 items-center font-bold text-xl text-zinc-800">
        Create a Post <SquarePen strokeWidth={3} size={20} />
      </h3>
      <textarea
        className="p-3 outline-none w-full rounded-md text-sm tracking-wide font-medium text-zinc-600"
        cols="30"
        rows="5"
        placeholder="Write a Post..."
        onChange={(e) => setPost({ ...post, postText: e.target.value })}
        value={post.postText}
      ></textarea>
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="flex items-center gap-2 font-semibold"
          >
            <Image color="#3B82F6" size={20} />
            Photo
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-2 font-semibold"
          >
            <Video color="#3B82F6" size={20} />
            Video
          </Button>
        </div>
        <Button
          onClick={addPost}
          className="bg-blue-500 flex items-center gap-2 font-semibold tracking-wider hover:bg-blue-600"
          disabled={!currentUser || !post.postText} // Disable button if no user or no text
        >
          Publish
          <SendHorizontal size={20} />
        </Button>
      </div>
    </div>
  );
}

export default CreatePost;
