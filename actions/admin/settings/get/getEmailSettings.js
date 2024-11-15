"use server";

import { db } from "@/lib/db";

export const getEmailSettings = async () => {
    try {
        const settings = await db.emailSettings.findFirst({
            where: {
                id: 1
            }
        })

        if (!settings) {
            // if settings not found, create new settings
            await db.emailSettings.create({
                data: {}
            })
        }
        return settings;
    } catch (error) {
        console.log("GET_EMAIL_SETTINGS_ERROR =>", error)
        return [];
    }
}