'use server'

import { db } from "@/lib/db";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";
export const addTeam = async (data) => {

    const name_surname = data.get('name_surname');
    const job_title = data.get('job_title');
    const description = data.get('description');
    const instagram = data.get('instagram');
    const twitter = data.get('twitter');
    const linkedin = data.get('linkedin');
    const image = data.get('image');

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
    

    const result = await db.myTeam.create({
        data: {
            name_surname,
            job_title,
            description,
            instagram,
            twitter,
            linkedin,
            image: imageName
        }
    })

    revalidatePath('/')

    if(result) {
        return {
            status: 200,
            message: "İşlem başarıyla gerçekleşti.",
         
        }
    }else{
        return {
            status: 200,
            message: "İşlem başarısız oldu.",
        }
    }

}