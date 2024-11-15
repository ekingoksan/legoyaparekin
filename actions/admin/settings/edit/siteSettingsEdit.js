"use server";
import path from "path";
import { unlink, writeFile } from "fs/promises";
import { db } from "@/lib/db";
import { existsSync } from "fs";

export const siteSettingsEdit = async (data) => {
    try {
        const logo = data.get('logo');
        const favicon = data.get('favicon');
        const address = data.get('address');
        const phone = data.get('phone');
        const email = data.get('email');
        const google_map = data.get('google_map');
        const whatsapp = data.get('whatsapp');
        const whatsapp_live = data.get('whatsapp_live');
        const maintenance_mode = data.get('maintenance_mode');
        const maintenance_text = data.get('maintenance_text');
        let logoName = null;
        let faviconName = null;
        let convertWhatsappLive = 0;
        let convertMaintenanceMode = 0;

        if(whatsapp_live != "false" && whatsapp_live != 0){
            convertWhatsappLive = 1
        }

        if(maintenance_mode != "false" && maintenance_mode != 0){
            convertMaintenanceMode = 1
        }

        const settings = await db.siteSettings.findFirst({
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
                }
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

        if(favicon != "null"){
            const faviconSize = favicon.size / 1024 / 1024;
            if (faviconSize > 1) {
                return {
                    message: "Favicon dosyası 1MB'dan büyük olamaz.",
                    status: 400
                }
            }
            const faviconBuffer = Buffer.from(await favicon.arrayBuffer());
            // favicon extension
            const faviconExt = path.extname(favicon.name);

            // random favicon name
            const faviconNameRandom = `legoyapar_${Math.random().toString(36).substring(2,15)}${faviconExt}`;
            faviconName = faviconNameRandom.replaceAll(" ","_");
            await writeFile(
                path.join(process.cwd(),"public/images/site/"+faviconName),
                faviconBuffer
            )

            // delete old image
            if(existsSync(`public/images/site/${settings.favicon}`)){
                await unlink(`public/images/site/${settings.favicon}`);
            }
        }else{
            faviconName = settings.favicon
        }

        await db.siteSettings.update({
            where: {
                id: 1
            },
            data: {
                logo: logoName,
                favicon: faviconName,
                address: address,
                phone: phone,
                email: email,
                google_map: google_map,
                whatsapp: whatsapp,
                whatsapp_live: parseInt(convertWhatsappLive),
                maintenance_mode: parseInt(convertMaintenanceMode),
                maintenance_text: maintenance_text
            }
        })
        return {
            message: "Site ayarları başarıyla güncellendi.",
            status: 200
        }
    } catch (error) {
        console.log("SITE_SETTINGS_ERROR", error);
        return {
            message: "Bir hata oluştu. Lütfen tekrar deneyin.",
            status: 500
        }
    }
}