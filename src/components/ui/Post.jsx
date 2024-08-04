// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import moment from "moment";
// import axios from "axios";
// import { useUser } from "@clerk/nextjs";
// import { useDispatch, useSelector } from "react-redux";

// function Post({ post }) {
//   const { user } = useUser();

//   const dispatch = useDispatch();

//   const userInfo = useSelector((state) => state.user.userInfo);
//   const status = useSelector((state) => state.user.status);
//   const isUserLiked = (postLikes) => {
//     return postLikes.find((item) => item === userInfo?.currentUser._id);
//   };

//   const [isLiked, setIsLiked] = useState(isUserLiked(post.likes));
//   const [likeCount, setLikeCount] = useState(post.likes.length);

//   useEffect(() => {
//     if (status === "idle" && user) {
//       dispatch(fetchUser(user?.username));
//     }
//   }, [status, dispatch]);

//   async function onLiked(postId) {
//     try {
//       const response = await axios.put(`/api/users/likes/?post=${postId}`, {
//         userId: userInfo?.currentUser._id,
//         isLiked,
//       });
//       // console.log("liked successfully", response.data);
//       setIsLiked(!isLiked);
//       setLikeCount(isLiked ? likeCount - 1 : likeCount + 1); // Update like count
//     } catch (error) {
//       console.log(error.message);
//     }
//   }

//   return (
//     <div className="p-3 rounded-md border">
//       <div className="flex gap-4 items-center">
//         <Image
//           src={post.createdBy?.imageURL}
//           alt="image-of-author"
//           width={30}
//           height={30}
//           className="rounded-full w-10 h-10"
//         />
//         <div>
//           <h6 className="text-sm font-bold text-zinc-800">
//             {post.createdBy?.fullname}
//           </h6>
//           <span className="text-xs font-semibold text-zinc-500">
//             {moment(post.createdAt).format("DD MMM | hh:mm a")}
//           </span>
//         </div>
//       </div>
//       <div className="my-4 bg-gray-100 rounded-md p-3">
//         <p className="text-zinc-800 font-semibold text-sm">{post.postText}</p>
//       </div>
//       <div className="grid grid-cols-3">
//         <div className="flex gap-1">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill={isLiked ? "#ef4444" : "white"}
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className={`size-6 ${isLiked ? "text-red-500" : ""}`}
//             onClick={() => onLiked(post._id)}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
//             />
//           </svg>
//           <span>{likeCount} Likes</span> {/* Update the like count */}
//         </div>
//         <div className="flex gap-1">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="size-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
//             />
//           </svg>

//           <span>44 Comments</span>
//         </div>
//         {/* <div className="flex gap-2">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="currentColor"
//             className="size-6"
//           >
//             <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
//           </svg>
//           <span>Send</span>
//         </div> */}
//       </div>
//     </div>
//   );
// }

// export default Post;


import React, { useState, useEffect } from "react";
import Image from "next/image";
import moment from "moment";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useDispatch, useSelector } from "react-redux";

function Post({ post }) {
  const { user } = useUser();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const status = useSelector((state) => state.user.status);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes.length);

  useEffect(() => {
    if (status === "idle" && user) {
      dispatch(fetchUser(user?.username));
    }
  }, [status, user, dispatch]);

  useEffect(() => {
    setIsLiked(post.likes.includes(userInfo?.currentUser._id));
  }, [post.likes, userInfo]);

  const handleLike = async (postId) => {
    try {
      const reponse = await axios.put(`/api/users/likes/?post=${postId}`, {
        userId: userInfo?.currentUser._id,
        isLiked,
      });
      console.log(reponse.data)
      setIsLiked((prevIsLiked) => !prevIsLiked);
      setLikeCount((prevLikeCount) => (isLiked ? prevLikeCount - 1 : prevLikeCount + 1));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-3 rounded-md border">
      <div className="flex gap-4 items-center">
        <Image
          src={post.createdBy?.imageURL}
          alt="image-of-author"
          width={30}
          height={30}
          className="rounded-full w-10 h-10"
        />
        <div>
          <h6 className="text-sm font-bold text-zinc-800">
            {post.createdBy?.fullname}
          </h6>
          <span className="text-xs font-semibold text-zinc-500">
            {moment(post.createdAt).format("DD MMM | hh:mm a")}
          </span>
        </div>
      </div>
      <div className="my-4 bg-gray-100 rounded-md p-3">
        <p className="text-zinc-800 font-semibold text-sm">{post.postText}</p>
      </div>
      <div className="grid grid-cols-3">
        <div className="flex gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isLiked ? "#ef4444" : "white"}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`size-6 cursor-pointer ${isLiked ? "text-red-500" : ""}`}
            onClick={() => handleLike(post._id)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          <span>{likeCount} Likes</span>
        </div>
        <div className="flex gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
            />
          </svg>
          <span>44 Comments</span>
        </div>
        
      </div>
    </div>
  );
}

export default Post;
