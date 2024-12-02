
"use server";

import { client } from "@/lib/client";


export const getHowItWorksSkills = async () => {

   
    const data = await client.howItWorksSteps.findMany({});

    if(!data) {
        return {
            message: 'Nasl çalışıyoruz adımları bulunamadı',
            status: 200,
            data: null
        }
    }

    return {
        message: 'nasıl çalışıyoruz adımları bulundu',
        status: 200,
        data: data
    }
}