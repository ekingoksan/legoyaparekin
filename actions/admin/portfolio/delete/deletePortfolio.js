"use server";

import { db } from "@/lib/db";
import { existsSync } from "fs";
import { unlink } from "fs/promises";

export const deletePortfolio= async (id) => {
    try {
        const portfolio = await db.portfolio.findFirst({
            where: {
                id: parseInt(id)
            }
        })

        const deletePortfolio = await db.portfolio.delete({
            where: {
                id: parseInt(id)
            }
        })


        if(deletePortfolio){
            const images = await db.portfolioImages.findMany({
                where: {
                    portfolio_id: parseInt(id)
                }
            })

            images.map(async (item) => {
                // delete old image
                if(item.image && existsSync(`public/images/portfolio/${item.image}`)){
                    await unlink(`public/images/portfolio/${item.image}`);
                }
            })

            // delete images
            await db.portfolioImages.deleteMany({
                where: {
                    portfolio_id: parseInt(id)
                }
            })
           
        }else{
            return {
                status: 400,
                message: "Yaptığımız işler silinirken bir hata oluştu."
            }
        }

        return {
            status: 200,
            message: "Yaptığımız işler başarıyla silindi."
        }

    } catch (error) {
        console.log("DELETE_PORTFOLIO_ERROR =>", error)
        return {
            status: 400,
            message: "Yaptığımız işler silinirken bir hata oluştu."
        }
    }
}