"use server";

import { db } from "@/lib/db";
import { slug } from "@/lib/slug";
import { existsSync, unlink } from "fs";
import { writeFile } from "fs/promises";
import path from "path";


export const editPortfolio = async (data) => {
    try {
        const id = data.get("id");
        const title = data.get("title");
        let portfolio_slug = slug(title);
        const images = data.getAll("images");
        const description = data.get("description");


        if (images && images.length > 0) {
            for (const image of images) {
                if (image.size / 1024 / 1024 > 2) {
                    return {
                        message: `${image.name} dosyası 2MB'dan büyük olamaz.`,
                        status: 400
                    };
                }

                const blogImgBuffer = Buffer.from(await image.arrayBuffer());
                const blogImgExt = path.extname(image.name);
                const blogImgNameRandom = `legoyapar_${Math.random().toString(36).substring(2, 15)}${blogImgExt}`;
                const blogImageName = blogImgNameRandom.replaceAll(" ", "_").replaceAll("..", ".");
                const savePath = path.join(process.cwd(), "public/images/portfolio/", blogImageName);

                await writeFile(savePath, blogImgBuffer); // Yeni resmi kaydet

                await db.portfolioImages.create({
                    data: {
                        portfolio_id: parseInt(id),
                        image: blogImageName
                    }
                })
            }
        }
        
        const slugExists = await db.blog.findFirst({
            where: {
                slug: portfolio_slug,
                NOT: {
                    id: parseInt(id)
                }
            }
        })

        if (slugExists) {
            portfolio_slug = `${portfolio_slug}-${Math.floor(Math.random() * 1000000)}`;
        }

        const editPortfolio = await db.portfolio.update({
            where: {
                id: parseInt(id)
            },
            data: {
                title: title,
                description: description,
                slug: portfolio_slug
            }
        })
       
        return {
            status: 200,
            message: "Yaptığımız işler başarıyla güncellendi."
        }
    } catch (error) {
        console.log("EDIT_PORTFOLIO_ERROR =>", error)
        return {
            message: "Bir hata oluştu. Lütfen tekrar deneyin.",
            status: 500
        }
    }
}