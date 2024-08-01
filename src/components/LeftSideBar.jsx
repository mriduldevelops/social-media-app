"use client";
import {
  Bell,
  Handshake,
  LayoutGrid,
  LogOut,
  MessageSquareText,
  LogIn,
} from "lucide-react";
import { Button } from "./ui/button";
// import { SignOutButton, SignInButton } from "@clerk/nextjs";

import { useClerk } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";


function LeftSideBar() {
  const { user } = useUser();
  const { signOut } = useClerk()
  return (
    <div className="hidden lg:flex flex-col mx-2 my-6 gap-4">
      <Button
        variant="ghost"
        className="flex items-center gap-2 w-full justify-start"
      >
        {" "}
        <LayoutGrid color="#3B82F6" size={16} /> All Posts
      </Button>
      <Button
        variant="ghost"
        className="flex items-center gap-2 w-full justify-start"
      >
        {" "}
        <Handshake color="#3B82F6" size={16} />
        Connection's Posts
      </Button>
      <Button
        variant="ghost"
        className="flex items-center gap-2 w-full justify-start"
      >
        {" "}
        <MessageSquareText color="#3B82F6" size={16} />
        Messages
      </Button>
      <Button
        variant="ghost"
        className="flex items-center gap-2 w-full justify-start"
      >
        {" "}
        <Bell color="#3B82F6" size={16} />
        Notifications
      </Button>
      {user ? (
        <Button
        onClick={() => signOut({ redirectUrl: '/' })}
          variant="ghost"
          className="flex items-center gap-2 w-full justify-start"
        >
          {" "}
          <LogOut color="#3B82F6" size={16} />
          Sign Out
        </Button>
      ) : (
        <Link href={"/sign-in"}>
        <Button
          variant="ghost"
          className="flex items-center gap-2 w-full justify-start"
          >
          {" "}
          <LogIn color="#3B82F6" size={16} />
          Sign In
        </Button>
          </Link>
      )}
    </div>
  );
}

export default LeftSideBar;
