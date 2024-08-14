"use client";
import CreatePost from "@/components/CreatePost";
import LeftSideBar from "@/components/LeftSideBar";
import Navbar from "@/components/Navbar";
import PostList from "@/components/PostList";
import RightSideBar from "@/components/RightSideBar";
import { fetchUser } from "@/redux/userSlice";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const { user } = useUser();
  const [username, setUsername] = useState("");
  const [postUpdate, setPostUpdate] = useState(false);
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user.userInfo);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  // if (status === "loading") {
  //   console.log("loading....");
  // } else if (status === "failed") {
  //   console.log(error);
  // } else {
  //   console.log(userInfo?.currentUser);
  // }

  // console.log(postUpdate);
  const addUser = async () => {
    try {
      const userInfo = {
        username: user.username,
        fullname: user.fullName,
        email: user.primaryEmailAddress.emailAddress,
        imageURL: user.imageUrl,
      };
      const response = await axios.post("/api/users/user", userInfo);
      console.log("signup success", response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    user && addUser() && setUsername(user.username);
  }, [user]);

  useEffect(() => {
    if (status === "idle" && user) {
      dispatch(fetchUser(username));
    }
  }, [status, dispatch, username]);

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-6 h-[92vh] ">
        <LeftSideBar />
        <div className="col-span-6 md:col-span-4 border-2 px-4 py-6 h-[96vh]  lg:h-[92vh] overflow-y-scroll no-scrollbar">
          {user && userInfo?.currentUser && (
            <CreatePost
              currentUser={userInfo.currentUser}
              onPostCreated={() => setPostUpdate(!postUpdate)}
            />
          )}
          <PostList postUpdate={postUpdate} />
        </div>
        <RightSideBar />
      </div>
    </div>
  );
}
