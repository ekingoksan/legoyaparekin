
"use server";

import { client } from "@/lib/client";


export const getSocialMedia = async () => {

   
    const data = await client.socialMedia.findFirst({});

    if(!data) {
        return {
            message: 'Sosyal Medya bulunamadı',
            status: 200,
            data: null
        }
    }

    return {
        message: 'sosyla medya bulundu',
        status: 200,
        data: data
    }
}