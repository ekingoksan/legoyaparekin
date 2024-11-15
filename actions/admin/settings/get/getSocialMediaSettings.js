"use server"

import { db } from "@/lib/db";

export const getSocialMediaSettings = async () => {
    try {
        const settings = await db.socialMedia.findFirst({
            where:{
                id: 1
            }
        })

        if (!settings){
            // if settings not found, create new settings
            await db.socialMedia.create({
                data:{}
            })
        }
        return settings;
    } catch (error) {
        console.log("GET_SOCIAL_MEDIA_SETTINGS_ERROR", error);
        return error;
    }
}