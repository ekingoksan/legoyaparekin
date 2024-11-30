"use server"

import { db } from "@/lib/db";

export const getContactMessage= async () => {
    try {
        const messages = await db.contactMessage.findMany({
            orderBy: {
                id: "desc"
            }
        })
       
        return messages;
    } catch (error) {
        console.log("GET_CONTACT_MESSAGE_ERROR", error);
        return error;
    }
}