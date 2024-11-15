"use server"

import { db } from "@/lib/db";

export const getSiteSettings = async () => {
    try {
        const settings = await db.siteSettings.findFirst({
            where:{
                id: 1
            }
        })

        if (!settings){
            // if settings not found, create new settings
            await db.siteSettings.create({
                data:{}
            })
        }
        return settings;
    } catch (error) {
        console.log("GET_SITE_SETTINGS_ERROR", error);
        return error;
    }
}