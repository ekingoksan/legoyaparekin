"use server";

import { db } from "@/lib/db";
import { existsSync } from "fs";
import { unlink } from "fs/promises";

export const deleteSubscribers= async (id) => {
    try {
        const Subscribers = await db.Subscribers.findFirst({
            where: {
                id: parseInt(id)
            }
        })

        const deleteSubscribers = await db.Subscribers.delete({
            where: {
                id: parseInt(id)
            }
        })

   
        return {
            status: 200,
            message: "Başarıyla silindi."
        }

    } catch (error) {
        console.log("DELETE_Subscribers_ERROR =>", error)
        return {
            status: 400,
            message: "Bilinirken bir hata oluştu."
        }
    }
}