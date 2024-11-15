"use server";

import { db } from "@/lib/db";
import { existsSync } from "fs";
import { unlink } from "fs/promises";

export const deleteBlog= async (id) => {
    try {
        const blog = await db.blog.findFirst({
            where: {
                id: parseInt(id)
            }
        })

        const deleteBlog = await db.blog.delete({
            where: {
                id: parseInt(id)
            }
        })

        if(deleteBlog){
            // delete old image
            if(blog.image && existsSync(`public/images/blog/${blog.image}`)){
                await unlink(`public/images/blog/${blog.image}`);
            }
           
        }else{
            return {
                status: 400,
                message: "Blog silinirken bir hata oluştu."
            }
        }

        return {
            status: 200,
            message: "Blog başarıyla silindi."
        }

    } catch (error) {
        console.log("DELETE_BLOG_ERROR =>", error)
        return {
            status: 400,
            message: "Blog silinirken bir hata oluştu."
        }
    }
}