"use server";

import { db } from "@/lib/db";
import { existsSync } from "fs";
import { writeFile, unlink } from "fs/promises";
import path from "path";


export const editImage = async (data) => {
    try {
        const image = data.get("image");
        let reviewImage = null;

        const reviewImageData = await db.customerReviewsImages.findFirst({
            where: {
                id: 1
            }
        });

        if (image != "null") {
            const blogImgSize = image.size / 1024 / 1024;
            if (blogImgSize > 2) {
                return {
                    message: "Blog resmi 2MB'dan büyük olamaz.",
                    status: 400
                }
            }

            const blogImgBuffer = Buffer.from(await image.arrayBuffer());
            const blogImgExt = path.extname(image.name);
            const blogImgNameRandom = `legoyapar_${Math.random().toString(36).substring(2, 15)}.${blogImgExt}`;
            reviewImage = blogImgNameRandom.replaceAll(" ", "_");
            reviewImage = reviewImage.replaceAll("..", ".");
            await writeFile(
                path.join(process.cwd(), "public/images/site/" + reviewImage),
                blogImgBuffer
            )

            await db.customerReviewsImages.update({
                where: {
                    id: 1
                },
                data: {
                    image: reviewImage
                }
            })

            // // delete old image
            if(existsSync(`public/images/site/${reviewImageData?.image}`)){
                unlink(`public/images/site/${reviewImageData?.image}`);
            }
        }

        return {
            status: 200,
            message: "Resim başarıyla güncellendi."
        }
    } catch (error) {
        console.log("EDIT_REVIEW_IMAGE_ERROR =>", error)
        return {
            message: "Bir hata oluştu. Lütfen tekrar deneyin.",
            status: 500
        }
    }
}