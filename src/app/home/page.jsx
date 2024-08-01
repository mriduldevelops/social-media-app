"use client";
import CreatePost from "@/components/CreatePost";
import LeftSideBar from "@/components/LeftSideBar";
import Navbar from "@/components/Navbar";
import PostList from "@/components/PostList";
import RightSideBar from "@/components/RightSideBar";
import { Button } from "@/components/ui/button";
import { fetchUser } from "@/redux/userSlice";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const { user } = useUser();
  const [username, setUsername] = useState("")
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
    user && addUser() &&  setUsername(user.username);
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
          {user && <CreatePost currentUser={userInfo?.currentUser} />
          }
          <PostList/>
        </div>
        <RightSideBar />
      </div>
      {/* <p>{user && user.primaryEmailAddress.emailAddress}</p>
      <p>{user && user.username}</p>
      <p>{user && user.fullName}</p>
      <p>{user && user.imageUrl}</p>
      {/* <p>{user&&user.createdAt.getFullYear}</p> */}
      {/* <Link href="/sign-up">
      <Button>New Account</Button>
      </Link>
      <SignOutButton/>
      <Button onClick={getAllUsers}>Get Users</Button>  */}
    </div>
  );
}
