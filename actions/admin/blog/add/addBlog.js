"use server";

import { db } from "@/lib/db";
import { slug } from "@/lib/slug";
import { writeFile } from "fs/promises";
import path from "path";


export const addBlog = async (data) => {
    try {
        const title = data.get("title");
        let blog_slug = slug(title);
        const image = data.get("image");
        const description = data.get("description");
        let blogImage = null;


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
            blogImage = blogImgNameRandom.replaceAll(" ", "_");
            blogImage = blogImage.replaceAll("..", ".");
            await writeFile(
                path.join(process.cwd(), "public/images/blog/" + blogImage),
                blogImgBuffer
            )
        }

        const slugExists = await db.blog.findFirst({
            where: {
                slug: blog_slug
            }
        })

        if (slugExists) {
            blog_slug = `${blog_slug}-${Math.floor(Math.random() * 1000000)}`;
        }

        const newBlog = await db.blog.create({
            data: {
                title: title,
                description: description,
                image: blogImage,
                slug: blog_slug
            }
        })
       
        return {
            status: 200,
            message: "Blog başarıyla eklendi."
        }
    } catch (error) {
        console.log("ADD_BLOG_ERROR =>", error)
        return {
            message: "Bir hata oluştu. Lütfen tekrar deneyin.",
            status: 500
        }
    }
}