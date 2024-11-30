"use server";

import { db } from "@/lib/db";

export const addReview = async (data) => {
    try {
        const name_surname = data.get("name_surname");
        const job_title = data.get("job_title");
        const description = data.get("description");
        const res = await db.customerReviews.create({
            data: {
                name_surname,
                job_title,
                description
            }
        });

        return {
            status: 200,
            message: "Yorum başarıyla eklendi",
        };
    } catch (error) {
        console.log("ADD REVIEW ERROR: ", error.message);
        return {
            status: 400,
            message: "Yorum eklenirken bir hata oluştu",
        };
    }
};