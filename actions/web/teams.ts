"use server";

import { client } from "@/lib/client";


export const getTeams = async () => {

   
    const data = await client.myTeam.findMany({});

    if(!data) {
        return {
            message: 'data bulunamadı',
            status: 200,
            data: null
        }
    }

    return {
        message: 'data bulundu',
        status: 200,
        data: data
    }

    


}