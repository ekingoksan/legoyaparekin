"use server";

import { db } from "@/lib/db";
import { slug } from "@/lib/slug";
import { writeFile } from "fs/promises";
import path from "path";

export const addPortfolio = async (data) => {
    try {
        // Form verilerini al
        const title = data.get("title");
        const images = data.getAll("images"); // Tüm dosyaları çek
        const description = data.get("description");


        // Başlık için slug oluştur
        let portfolio_slug = slug(title);

        // Aynı slug var mı kontrol et
        const slugExists = await db.portfolio.findFirst({
            where: { slug: portfolio_slug },
        });

        // Eğer slug mevcutsa rastgele bir sayı ekle
        if (slugExists) {
            portfolio_slug = `${portfolio_slug}-${Math.floor(Math.random() * 1000000)}`;
        }

        // Portfolio kaydını oluştur
        const newPortfolio = await db.portfolio.create({
            data: {
                title,
                description,
                slug: portfolio_slug,
            },
        });

        const portfolioId = newPortfolio.id;

        // Resimleri işle
        if (images && images.length > 0) {
            for (const image of images) {
                // Tür kontrolü
                if (!(image instanceof File || image instanceof Blob)) {
                    return {
                        message: `${image.name || "Bilinmeyen dosya"} geçerli bir resim formatında değil.`,
                        status: 400,
                    };
                }
        
                // Dosya boyutunu kontrol et
                if (image.size / 1024 / 1024 > 2) {
                    return {
                        message: `${image.name} dosyası 2MB'dan büyük olamaz.`,
                        status: 400,
                    };
                }
        
                try {
                    // Resmi okuyup kaydet
                    const imageBuffer = Buffer.from(await image.arrayBuffer());
                    const imageExtension = path.extname(image.name);
                    const randomName = `portfolio_${Math.random().toString(36).substring(2, 15)}${imageExtension}`;
                    const imageName = randomName.replaceAll(" ", "_").replaceAll("..", ".");
                    const savePath = path.join(process.cwd(), "public/images/portfolio/", imageName);
        
                    // Resmi diske yaz
                    await writeFile(savePath, imageBuffer);
        
                    // Veritabanına kayıt ekle
                    await db.portfolioImages.create({
                        data: {
                            portfolio_id: portfolioId,
                            image: imageName,
                        },
                    });
                } catch (error) {
                    // Hata durumunda dosya adıyla mesaj döndür
                    return {
                        message: `${image.name} dosyası kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.`,
                        status: 500,
                    };
                }
            }
        }
        
        

        return {
            status: 200,
            message: "Yaptığımız işler başarıyla eklendi.",
        };
    } catch (error) {
        console.error("ADD_PORTFOLIO_ERROR =>", error);
        return {
            message: "Bir hata oluştu. Lütfen tekrar deneyin.",
            status: 500,
        };
    }
};
