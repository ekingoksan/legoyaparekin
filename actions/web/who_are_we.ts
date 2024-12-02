"use server";

import { client } from "@/lib/client";


export const getWhoAreWe = async () => {

   
    const data = await client.whoWeAre.findFirst({});

    if(!data) {
        return {
            message: 'Biz kimiz bulunamadı',
            status: 200,
            data: null
        }
    }

    return {
        message: 'biz kimiz bulundu',
        status: 200,
        data: data
    }
}