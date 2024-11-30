"use server";

import { db } from "@/lib/db";

export const deleteMessage= async (id) => {
    try {
        
        const deleteMessage = await db.contactMessage.delete({
            where: {
                id: parseInt(id)
            }
        })       

        return {
            status: 200,
            message: "Mesaj başarıyla silindi."
        }

    } catch (error) {
        console.log("DELETE_MESSAGE_ERROR =>", error)
        return {
            status: 400,
            message: "Mesaj silinirken bir hata oluştu."
        }
    }
}