"use server"
import { db } from "@/lib/db"
import { verifyJwtToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export const isAdminControl = async (req) => {
    try {
        const userCookie = cookies().get("user");
        if(!userCookie){
            console.log("Burada")
            return false;
        }

        console.log("userCookie ==> ", userCookie);
        const verifiedToken = await verifyJwtToken(userCookie);

        console.log("verifiedToken ==> ", verifiedToken);

        if(!verifiedToken){
            return false;
        }

        const user = await db.users.findFirst({
            where: {
                id: verifiedToken.id
            }
        });
    
        if(!user){
            return false;
        }
    
        return true;
    } catch (error) {
        console.error("isAdmin_ERROR =>",error);
        return false;
    }
    }