"use server"

import { db } from "@/lib/db";

export const getPortfolioList = async () => {
    try {
        const portfolio = await db.portfolio.findMany()

        // Asenkron işlemleri beklemek için Promise.all kullanıyoruz
        await Promise.all(portfolio.map(async (item) => {
            const images = await db.portfolioImages.findMany({
                where: {
                    portfolio_id: item.id
                }
            });
            item.images = images;  // Resimleri item'a ekliyoruz
        }));

        return portfolio;
    } catch (error) {
        console.log("GET_PORTFOLIO_LIST_ERROR", error);
        return error;
    }
}
