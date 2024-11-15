"use server";
import { db } from "@/lib/db";
import path from "path";
import { unlink, writeFile } from "fs/promises";
import { existsSync } from "fs";

export const footerSettingsEdit = async (data) => {
    try {
        const logo = data.get('logo');
        const footer_text = data.get('footer_text');

        let logoName = null;

        const settings = await db.footerSettings.findFirst({
            where: {
                id:1
            }
        })

        if(logo != "null"){
            const logoSize = logo.size / 1024 / 1024;
            if (logoSize > 2) {
                return {
                    message: "Logo dosyası 2MB'dan büyük olamaz.",
                    status: 400
                };
                
            }
            const logoBuffer = Buffer.from(await logo.arrayBuffer());
            // logo extension
            const logoExt = path.extname(logo.name);
            // random logo name
            const logoNameRandom = `legoyapar_${Math.random().toString(36).substring(2,15)}${logoExt}`;
            logoName = logoNameRandom.replaceAll(" ","_");
            await writeFile(
                path.join(process.cwd(),"public/images/site/"+logoName),
                logoBuffer
            )

            // delete old image
            if(existsSync(`public/images/site/${settings.logo}`)){
                await unlink(`public/images/site/${settings.logo}`);
            }
        }else{
            logoName = settings.logo
        }

        await db.footerSettings.update({
            where: {
                id: 1
            },
            data: {
                logo: logoName,
                footer_text: footer_text,
            }
        })
        return {
            message: "Footer ayarları başarıyla güncellendi.",
            status: 200
        }
    } catch (error) {
        console.log("FOOTER_SETTINGS_ERROR", error);
        return {
            message: "Bir hata oluştu. Lütfen tekrar deneyin.",
            status: 500
        }
    }
}