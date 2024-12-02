
"use server";

import { client } from "@/lib/client";


export const getGeneralStatus = async () => {

   
    const data = await client.generalStatus.findFirst({});

    if(!data) {
        return {
            message: 'Genel Durum bulunamadı',
            status: 200,
            data: null
        }
    }

    return {
        message: 'Genel Durum bulundu',
        status: 200,
        data: data
    }
}