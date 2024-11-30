"use server"
import { db } from "@/lib/db";

export const ReadMessage = async (id) => {
    try {
        const message = await db.contactMessage.update({
            where: {
                id: id
            },
            data: {
                is_read: 1
            }
        })

    }catch(e){
        console.log("MESSAGE_ISREAD_ERROR",e)
    }
}
