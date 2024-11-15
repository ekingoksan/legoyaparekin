"use server";

import { db } from "@/lib/db";

export const seoSettingsEdit = async (data) => {
    try {
        const siteTitle = data.get('site_title');
        const keywords = data.get('keywords');
        const description = data.get('description');
        const page_title = data.get('page_title');

        let pageTitle = 0;

        if(page_title != "false" && page_title != 0){
            pageTitle = 1
        }

        await db.seoSettings.update({
            where:{
                id:1
            },
            data:{
                site_title: siteTitle,
                keywords: keywords,
                description: description,
                page_title: pageTitle
            }
        })

        return {
            status: 200,
            message: "SEO ayarları güncellendi"
        }
    } catch (error) {
        console.log("SOCIAL_MEDIA_SETTINGS_ERROR", error);
        return {
            status: 400,
            message: "SEO ayarları güncellenirken bir hata oluştu"
        }
    }
}