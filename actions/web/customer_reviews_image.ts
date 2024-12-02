
"use server";

import { client } from "@/lib/client";


export const getCustomerReviewsImage = async () => {

   
    const data = await client.customerReviewsImages.findFirst({});

    if(!data) {
        return {
            message: 'Resim bulunamadı',
            status: 200,
            data: null
        }
    }

    return {
        message: 'Resim bulundu',
        status: 200,
        data: data
    }
}