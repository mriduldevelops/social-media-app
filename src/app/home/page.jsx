"use client";
import LeftSideBar from "@/components/LeftSideBar";
import Navbar from "@/components/Navbar";
import RightSideBar from "@/components/RightSideBar";
import { Button } from "@/components/ui/button";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUser();

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

  const getAllUsers = async ()=>{
    try {
      const response = await axios.get("/api/users/user");
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  // useEffect(() => {
  //   user && addUser();
  // }, [user]);

  return (
    <div>
      <Navbar/>
      <div className="grid grid-cols-6 h-[92vh]">
        <LeftSideBar/>
        <div className="col-span-4 border"></div>
        <RightSideBar/>
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
