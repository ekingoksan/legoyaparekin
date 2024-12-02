"use server";

import { client } from "@/lib/client";


export const getOurSkills = async () => {

   
    const data = await client.ourSkills.findMany({});

    if(!data) {
        return {
            message: 'Yeteneklerimiz bulunamadı',
            status: 200,
            data: null
        }
    }

    return {
        message: 'yeteneklerimiz bulundu',
        status: 200,
        data: data
    }
}