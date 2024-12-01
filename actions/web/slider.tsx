"use server";

import { client } from "@/lib/client";


export const getSlider = async () => {

   
    const slider = await client.sliders.findMany({});

    if(!slider) {
        return {
            message: 'Slider bulunamadı',
            status: 200,
            data: null
        }
    }

    return {
        message: 'Slider bulundu',
        status: 200,
        data: slider
    }

    


}