
"use server";

import { client } from "@/lib/client";


export const getSeoSettings = async () => {

   
    const data = await client.seoSettings.findFirst({});

    if(!data) {
        return {
            message: 'seo bulunamadı',
            status: 200,
            data: null
        }
    }

    return {
        message: 'seo bulundu',
        status: 200,
        data: data
    }
}