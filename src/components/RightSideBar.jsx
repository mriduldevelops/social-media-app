"use client"
import React, { useEffect, useState } from 'react'
import UserCard from './ui/UserCard'
import axios from 'axios';

function RightSideBar() {

  const [allUsers, setAllUsers]=useState([])

  const getAllUsers = async ()=>{
    try {
      const response = await axios.get("/api/users/user");
      setAllUsers(response.data.users);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(()=>{
    getAllUsers()
  },[])

  return (
    <div className='h-[92vh] overflow-scroll no-scrollbar hidden md:block md:col-span-2 lg:col-span-1'>
      <div className='border-b-2 p-2'>
      <h6 className='text-sm font-bold'>All Users</h6>
      </div>
      {
        allUsers&& allUsers.map((user, index)=>(
      <UserCard key={index} userInfo={user}/>
        ))
      }
    </div>
  )
}

export default RightSideBar