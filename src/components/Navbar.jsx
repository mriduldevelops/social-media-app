"use client"
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { LogIn } from "lucide-react"

function Navbar() {

    const {user} = useUser()
    
  return (
    <div className="px-12 py-3 shadow-md flex items-center justify-between">
      
        <h4 className="font-bold text-zinc-800 text-xl">
          Social <span className="text-blue-500">POST</span>
        </h4>
        
        {user?<UserButton/>:<Link href="/sign-up">
        <Button className=" bg-blue-500 flex items-center gap-2 hover:bg-blue-600"><LogIn size={16}/>Sign Up</Button>
        </Link>}
        
      
    </div>
  );
}

export default Navbar;
