'use server'
import { db } from "@/lib/db";


export const deleteSlider = async (id) => {

    if(!id) {
      return []
    }

   const result =  await db.sliders.delete({
        where: {
            id: id
        }
    })


    if(result) {
        return {
            status: 200,
            message: "Başarıyla Silindi",
         
        }
    }else{
        return {
            status: 500,
            message: "Silme İşlemi Başarısız",
        }
    }
}