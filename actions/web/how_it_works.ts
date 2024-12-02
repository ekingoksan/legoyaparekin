
"use server";

import { client } from "@/lib/client";


export const getHowItWorks = async () => {

   
    const data = await client.howItWorks.findFirst({});

    if(!data) {
        return {
            message: 'Nasl çalışıyoruz bulunamadı',
            status: 200,
            data: null
        }
    }

    return {
        message: 'nasıl çalışıyoruz bulundu',
        status: 200,
        data: data
    }
}