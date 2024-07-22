import User from "@/app/models/users";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connect()

export async function POST(request){
    try{

        const reqBody = await request.json()
        const {username, fullname, email, imageURL} = reqBody
        // console.log(reqBody)

        const user = await User.findOne({username})
        if (user){
            return NextResponse.json({
                error: "user already exist with this username"
            },{status: 400})
        }

        const newUser = new User({
            username, 
            fullname, 
            email, 
            imageURL
        })
        const savedUser = await newUser.save()
        console.log(savedUser)
        return NextResponse.json({
            message: "User registered successfully",
            succes: true,
            savedUser
        })
    }
    catch(error){
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function GET() {
    try {
        const users = await User.find();
        return NextResponse.json({
            success: true,
            users
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}