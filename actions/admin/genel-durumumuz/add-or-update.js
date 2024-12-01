"use server";

import { db } from "@/lib/db";

export const genel_durum_add_or_update = async (data) => {
    try {
        const completed_projects =Number( data.get('completed_projects'));
        const satisfied_customers = Number(data.get('satisfied_customers'));
        const years_of_experience = Number(data.get('years_of_experience'));
        const customer_retention = Number(data.get('customer_retention'));


        const exists = await db.generalStatus.findMany({});

        if(exists.length === 0){
            await db.generalStatus.create({
                data:{
                    completed_projects,
                    satisfied_customers,
                    years_of_experience,
                    customer_retention
                }
            })

            return {
                status: 200,
                message: "Başarıyla Eklendi"
            }
        }


        await db.generalStatus.update({
            where:{
                id: exists[0].id
            },
            data:{
                completed_projects,
                satisfied_customers,
                years_of_experience,
                customer_retention
            }
        })

        return {
            status: 200,
            message: "Başarıyla Güncellendi"
        }
    } catch (error) {
        console.log("", error);
        return {
            status: 400,
            message: "Güncellenirken bir hata oluştu"
        }
    }
}