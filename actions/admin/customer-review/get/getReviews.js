"use server"
import { db } from "@/lib/db";

export const GetReviews = async () => {
    try {
        const reviews = await db.customerReviews.findMany();
        return reviews

    }catch(e){
        console.log("GET_REVIEWS_ERROR",e)
    }
}