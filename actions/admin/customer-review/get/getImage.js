"use server";
import { db } from "@/lib/db";

export const GetImage = async (id) => {
    try {
        const image = await db.customerReviewsImages.findFirst({
            where: {
                id: 1
            }
        });

        if(!image){
            const data = await db.customerReviewsImages.create()

            return data
        }

        return image

    }catch(e){
        console.log("GET_IMAGE_ERROR",e)
    }
}