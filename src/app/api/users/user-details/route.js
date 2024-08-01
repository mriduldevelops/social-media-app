import User from "@/app/models/users";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connect()

// export async function POST(request){
//     try{

//         const {username} = await request.json()

//         console.log(username)
//         const currentUser = await User.findOne({username})
//          return NextResponse.json({
//             message: "got user info successfully",
//             currentUser
//          },{status: 200}) 

//     }
//     catch(error){
//         return NextResponse.json({
//             message: error.message,
//         },{status: 500})
//     }
// }

export async function GET(request){
    try{

        const { searchParams } = new URL(request.url);
        const queyParam = {
            username: searchParams.get('username')
        }

        const {username} = queyParam;
        
        console.log(username)
        const currentUser = await User.findOne({username})
         return NextResponse.json({
            message: "got user info successfully",
            currentUser
         },{status: 200}) 

    }
    catch(error){
        return NextResponse.json({
            message: error.message,
        },{status: 500})
    }
}