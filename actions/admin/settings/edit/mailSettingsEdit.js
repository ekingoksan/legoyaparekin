"use server";

import { db } from "@/lib/db";

export const mailSettingsEdit = async (data) => {
    try {
        const host = data.get("host");
        const port = parseInt(data.get("port"));
        const secure = parseInt(data.get("secure"));
        const user = data.get("user");
        const pass = data.get("pass");
        const is_using = data.get("is_using");

        let isUsing = 0;
        if(is_using != "false" && is_using != 0){
            isUsing = 1
        }


        await db.emailSettings.update({
            where:{
                id:1
            },
            data:{
                host,
                port,
                secure,
                user,
                pass,
                is_using: isUsing
            }
        })

        return {
            status: 200,
            message: "E-posta ayarları güncellendi"
        }
    } catch (error) {
        console.log("EMAIL_SETTINGS_ERROR", error);
        return {
            status: 400,
            message: "E-posta ayarları güncellenirken bir hata oluştu"
        }
    }
}