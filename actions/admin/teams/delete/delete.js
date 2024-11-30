'use server'
import { db } from "@/lib/db";


export const deleteTeamMember = async (id) => {

    if(!id) {
      return []
    }

   const result =  await db.myTeam.delete({
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