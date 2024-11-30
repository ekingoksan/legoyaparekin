"use server";

import { db } from "@/lib/db";

export const editReview = async (data) => {
    try {
        const id = data.get("id");
        const name_surname = data.get("name_surname");
        const job_title = data.get("job_title");
        const description = data.get("description");

        const res = await db.customerReviews.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name_surname,
                job_title,
                description
            }
        });

        return {
            status: 200,
            message: "Yorum başarıyla güncellendi",
        };
    } catch (error) {
        console.log("EDIT REVIEW ERROR: ", error.message);
        return {
            status: 400,
            message: "Yorum güncellenirken bir hata oluştu",
        };
    }
};