import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./button";

function UserCard({userInfo}) {
    const {username, fullname, imageURL} = userInfo
  return (
    <div className="border-b px-2 py-4 space-y-2">
        <div className="flex items-center gap-2">

      <Avatar>
        <AvatarImage src={imageURL} />
        <AvatarFallback>SP</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-semibold text-zinc-700">{fullname}</p>
        <span className="text-xs font-semibold text-zinc-500 tracking-wider">{username}</span>
      </div>
        </div>
      <Button className="w-full bg-blue-500 hover:bg-blue-600">Connect</Button>
    </div>
  );
}

export default UserCard;
