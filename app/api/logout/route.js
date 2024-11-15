"use server"
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req,res){
    try {
        cookies().delete("user");

        return NextResponse.json({
            success: true,
            status: 200
        });

    } catch (error) {
        console.log("Error on login", error);
        return NextResponse.error({
            success: false,
            status: 500
        });
    }
}