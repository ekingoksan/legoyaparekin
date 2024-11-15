

'use server';
import { db } from "@/lib/db";


export const getSlider = async () => {

    const sliders = await db.sliders.findMany({ })
    return sliders

}