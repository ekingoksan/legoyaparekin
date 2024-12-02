
"use server";

import { client } from "@/lib/client";


export const getFooterSettings = async () => {

   
    const data = await client.footerSettings.findFirst({});

    if(!data) {
        return {
            message: 'ayarlar bulunamadı',
            status: 200,
            data: null
        }
    }

    return {
        message: 'ayarlar bulundu',
        status: 200,
        data: data
    }
}