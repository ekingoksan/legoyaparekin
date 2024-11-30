"use server";

import { db } from "@/lib/db";

export const deleteReview = async (id) => {
    try {
        const res = await db.customerReviews.delete({
            where: {
                id,
            }
        });
    
        return {
            status: 200,
            message: "Yorum başarıyla silindi",
        };
    } catch (error) {
        console.log("DELETE REVIEW ERROR: ", error.message);
        return {
            status: 400,
            message: "Yorum silinirken bir hata oluştu",
        };
    }
}