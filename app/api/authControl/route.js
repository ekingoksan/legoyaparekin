"use server"

import { verifyJwtToken } from "@/lib/jwt";
import { db } from "@/lib/db"
import { NextResponse } from "next/server";


export async function POST(req, res) {
  try {    
    const body = await req.json();
    const userToken = body.userToken;

    if(!userToken){
      return NextResponse.json({
        isAdmin: false
      });
    }


    const tokenDecode = await verifyJwtToken(userToken.value);

    if(!tokenDecode){
      return NextResponse.json({
        isAdmin: false
      })
    }

    const user_id = tokenDecode.id;

    const user = await db.users.findFirst({
      where: {
        id: user_id
      }
    });


    if(user){
      return NextResponse.json({
        isAdmin: true
      });
    }

    return NextResponse.json({
      isAdmin: false
    });
    
  } catch (error) {
    console.error("AUTH_ERROR =>",error);
    return NextResponse.json({
      isAdmin: false
    });
  }
}