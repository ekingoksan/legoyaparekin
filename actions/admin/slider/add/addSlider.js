'use server'

import { db } from "@/lib/db";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";
export const addSlider = async (data) => {

    const title = data.get('title');
    const image = data.get('image');
    const description = data.get('description');
    const link = data.get('link');
    let imageName = null;

    if(image != 'undefined' && image != "null") {
        const imageSize = image.size / 1024 / 1024;
        if (imageSize > 2) {
            return {
                message: "image dosyası 2MB'dan büyük olamaz.",
                status: 400
            };
        }
        const imageBuffer = Buffer.from(await image.arrayBuffer());
        // image extension
        const imageExt = path.extname(image.name);
        // random image name
        const imageNameRandom = `legoyapar_${Math.random().toString(36).substring(2,15)}${imageExt}`;
        imageName = imageNameRandom.replaceAll(" ","_");
        await writeFile(
            path.join(process.cwd(),"public/images/site/"+imageName),
            imageBuffer
        )
    }
    

    const result = await db.sliders.create({
        data: {
            title: title,
            image: imageName,
            description: description,
            link: link
        }
    })

    revalidatePath('/')

    if(result) {
        return {
            status: 200,
            message: "Yaptığımız işler başarıyla eklendi.",
         
        }
    }else{
        return {
            status: 200,
            message: "Yaptığımız işler başarıyla hata oluştu.",
        }
    }

    return null
}