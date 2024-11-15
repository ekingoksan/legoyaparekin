'use server'

import { existsSync, unlink } from "fs";
import { db } from "@/lib/db";
import { writeFile } from "fs/promises";
import path from "path";
export const editSlider = async (data,id) => {
    const title = data.get('title');
    const image = data.get('image');
    const description = data.get('description');
    const link = data.get('link');
   

    console.log(data,'daasdadasd')

    const sliders = await db.sliders.findFirst({
        where: {
            id: parseInt(id)
        },
        
    })

    console.log(sliders,'sliders')

    let imageName = sliders.image;


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

        if(sliders.image){
            if(existsSync(`public/images/site/${sliders.image}`)){
                unlink(`public/images/site/${sliders.image}`, (err) => {
                    if (err) {
                      console.error('Dosya silinemedi:', err);
                      return;
                    }
                    console.log('Dosya başarıyla silindi');
                  });
            }
        }
    }
    

    const result = await db.sliders.update({
        where: {
            id: parseInt(id)
        },
        data: {
            title: title,
            image: imageName,
            description: description,
            link: link
        }
    })

    if(result) {
        return {
            status: 200,
            message: "Yaptığımız işler başarıyla güncellendi.",
         
        }
    }else{
        return {
            status: 200,
            message: "Yaptığımız işler başarıyla hata oluştu.",
        }
    }
}