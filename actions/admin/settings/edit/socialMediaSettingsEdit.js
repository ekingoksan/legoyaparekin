"use server";

import { db } from "@/lib/db";

export const socialMediaSettingsEdit = async (data) => {
    try {
        const facebook = data.get('facebook');
        const instagram = data.get('instagram');
        const twitter = data.get('twitter');
        const linkedin = data.get('linkedin');
        const youtube = data.get('youtube');
        const pinterest = data.get('pinterest');
        const tiktok = data.get('tiktok');

        await db.socialMedia.update({
            where:{
                id:1
            },
            data:{
                facebook,
                instagram,
                twitter,
                linkedin,
                youtube,
                pinterest,
                tiktok
            }
        })

        return {
            status: 200,
            message: "Sosyla medya ayarları güncellendi"
        }
    } catch (error) {
        console.log("SOCIAL_MEDIA_SETTINGS_ERROR", error);
        return {
            status: 400,
            message: "Sosyal medya ayarları güncellenirken bir hata oluştu"
        }
    }
}