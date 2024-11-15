"use server"

import { db } from "@/lib/db";

export const getSeoSettings = async () => {
    try {
        const settings = await db.seoSettings.findFirst({
            where:{
                id: 1
            }
        })

        if (!settings){
            // if settings not found, create new settings
            await db.seoSettings.create({
                data:{}
            })
        }
        return settings;
    } catch (error) {
        console.log("GET_SEO_SETTINGS_ERROR", error);
        return error;
    }
}