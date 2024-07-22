"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, {useEffect} from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

function page() {

  const {user} = useUser()
  const router = useRouter()
  useEffect(()=>{
    user && router.push('/home')
  },[])
  return (
    <div className="flex justify-center flex-col items-center gap-5 h-[100vh]">
      <h1 className='text-4xl font-bold text-zinc-800'>Welcome to Social Post!!!</h1>
      <Link href="/home">
      <Button className="">Get Started</Button>
      </Link>
    </div>
  )
}

export default page