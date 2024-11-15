"use server";

import { db } from "@/lib/db";
import { existsSync } from "fs";
import { unlink } from "fs/promises";

export const deletePortfolioImage= async (imageName) => {
    try {

        // delete old image
        if(imageName && existsSync(`public/images/portfolio/${imageName}`)){
            await unlink(`public/images/portfolio/${imageName}`);
        }

        // delete images
        await db.portfolioImages.deleteMany({
            where: {
                image: imageName
            }
        })
           

        return {
            status: 200,
            message: "Medya başarıyla silindi."
        }

    } catch (error) {
        console.log("DELETE_PORTFOLIO_IMAGE_ERROR =>", error)
        return {
            status: 400,
            message: "Medya silinirken bir hata oluştu."
        }
    }
}