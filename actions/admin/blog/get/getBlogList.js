"use server"

import { db } from "@/lib/db";

export const getBlogList = async () => {
    try {
        const blogs = await db.blog.findMany()
       
        return blogs;
    } catch (error) {
        console.log("GET_BLOG_LIST_ERROR", error);
        return error;
    }
}