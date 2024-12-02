
"use server";

import { client } from "@/lib/client";


export const getCustomerReviews = async () => {

   
    const data = await client.customerReviews.findMany({});

    if(!data) {
        return {
            message: 'Müşteri yorumları bulunamadı',
            status: 200,
            data: null
        }
    }

    return {
        message: 'Müşteri yorumları bulundu',
        status: 200,
        data: data
    }
}